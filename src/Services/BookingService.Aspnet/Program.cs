using BookingService.Aspnet.Data;
using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

#region Logger
builder.Logging.ClearProviders().AddConsole();
#endregion

#region Services
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BookingDatabase")));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<BookingService.Aspnet.Services.BookingService>();

builder.Services.AddGrpc().AddJsonTranscoding();
builder.Services.AddGrpcSwagger();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "gRPC JSON transcoding example", Version = "v1" });

    var filePath = Path.Combine(AppContext.BaseDirectory, "BookingService.Aspnet.xml");
    c.IncludeXmlComments(filePath);
    c.IncludeGrpcXmlComments(filePath, includeControllerXmlComments: true);
});

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(config => config.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidIssuer = "ITHub",
//        ValidAudience = "FIBS",
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d6390614-b135-4d2a-a4e5-39e5fa45b26b"))
//    });
#endregion

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

//app.UseAuthentication();
//app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "gRPC JSON transcoding V1");
});

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.MapGrpcService<GrpcBookingService>();

await using var scope = app.Services.CreateAsyncScope();
using var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
await dbContext.Database.MigrateAsync();

app.Run();
