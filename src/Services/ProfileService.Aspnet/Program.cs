using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProfileService.Aspnet.Data;
using ProfileService.Aspnet.Models;
using ProfileService.Aspnet.Services;
using System;

var builder = WebApplication.CreateBuilder(args);
#region Services

builder.Services.AddGrpc();
builder.Services.AddScoped<IdentityService>();

builder.Services.AddDbContext<ProfileDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProfileDatabase")));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ProfileDbContext>();

#endregion

var app = builder.Build();

app.MapGrpcService<ProfileService.Aspnet.Services.ProfileService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

await using var scope = app.Services.CreateAsyncScope();
using var dbContext = scope.ServiceProvider.GetRequiredService<ProfileDbContext>();
await dbContext.Database.MigrateAsync();

app.Run();
