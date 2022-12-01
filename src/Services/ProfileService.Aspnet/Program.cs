using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProfileService.Aspnet.Data;
using ProfileService.Aspnet.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
#region Services

builder.Services.AddGrpc();
builder.Services.AddScoped<TokenService>();
builder.Services.AddAuthentication()
    .AddJwtBearer(config => config.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = "ITHub",
        ValidAudience = "FIBS",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d6390614-b135-4d2a-a4e5-39e5fa45b26b"))
    });

builder.Services.AddDbContext<ProfileDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProfileDatabase")));

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
