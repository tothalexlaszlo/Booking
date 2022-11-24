using BookingService.Aspnet.Data;
using BookingService.Aspnet.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Logger
builder.Logging.ClearProviders().AddConsole();
#endregion

#region Services
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddGrpc();
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BookingDatabase")));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<BookingService.Aspnet.Services.BookingService>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}
_ = app.UseHttpsRedirection();

#region EndPoints
app.MapGet("/booking", async (int userId, BookingService.Aspnet.Services.BookingService bookingService) =>
{
    try
    {
        var result = await bookingService.GetActiveBookingsByUserAsync(userId);
        return TypedResults.Ok(result);
    }
    catch (Exception)
    {
        return Results.BadRequest();
    }
})
.WithName("GetBookingsForUser")
.WithOpenApi();

app.MapDelete("/booking/{bookingId}", (int bookingId, BookingService.Aspnet.Services.BookingService bookingService) =>
{
    try
    {
        bookingService.CancelBooking(bookingId);
        return Results.Ok(bookingId);
    }
    catch (Exception)
    {
        return Results.BadRequest(bookingId);
    }   
})
.WithName("CancelBookingById")
.WithOpenApi();

app.MapPost("/booking", async (int userId, DateTime startDate, DateTime endDate, BookingService.Aspnet.Services.BookingService bookingService) =>
{
    try
    {
        await bookingService.BookParkingSlotAsync(userId, startDate, endDate);
        return Results.Ok();
    }
    catch (Exception)
    {
        return Results.BadRequest();
    }
})
.WithName("BookParkingSlot")
.WithOpenApi();
#endregion

app.Run();
