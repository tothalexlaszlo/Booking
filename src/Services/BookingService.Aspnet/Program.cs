using BookingService.Aspnet.Data;
using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Services;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

#region Logger
builder.Logging.ClearProviders().AddConsole();
#endregion

#region Services
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BookingDatabase")));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<BookingService.Aspnet.Services.BookingService>();
builder.Services.AddScoped<BookingService.Aspnet.Services.ParkingSlotService>();
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://localhost:5001";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddGrpc().AddJsonTranscoding();
builder.Services.AddGrpcSwagger();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "gRPC JSON transcoding example", Version = "v1" });

    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://localhost:5001/connect/authorize"),
                TokenUrl = new Uri("https://localhost:5001/connect/token"),
                Scopes = new Dictionary<string, string>
                {
                    {"booking_api", "Booking API"}
                }
            }
        }
    });

    c.OperationFilter<AuthorizeCheckOperationFilter>();

    var filePath = Path.Combine(AppContext.BaseDirectory, "BookingService.Aspnet.xml");
    c.IncludeXmlComments(filePath);
    c.IncludeGrpcXmlComments(filePath, includeControllerXmlComments: true);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
#endregion

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(MyAllowSpecificOrigins);
app.UseGrpcWeb();

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "gRPC JSON transcoding V1");
    c.OAuthClientId("demo_api_swagger");
    c.OAuthAppName("Booking API");
    c.OAuthClientSecret("secret");
    c.OAuthUsePkce();
});

app.MapGet("/test", [Authorize] () => "Hello");

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.MapGrpcService<GrpcBookingService>().EnableGrpcWeb();
app.MapGrpcService<GrpcParkingSlotService>().EnableGrpcWeb();

await using var scope = app.Services.CreateAsyncScope();
using var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
await dbContext.Database.MigrateAsync();

app.Run();
