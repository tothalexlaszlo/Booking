using BookingService.Aspnet.Data;
using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Logger
builder.Logging.ClearProviders().AddConsole();
#endregion

#region Services
builder.Services.AddGrpc();
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BookingDatabase")));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<BookingService.Aspnet.Services.BookingService>();
#endregion

var app = builder.Build();

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.MapGrpcService<GrpcBookingService>();

await using var scope = app.Services.CreateAsyncScope();
using var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
await dbContext.Database.MigrateAsync();   

app.Run();
