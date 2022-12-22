using BookingService.Aspnet.Models;
using Google.Protobuf.WellKnownTypes;
using Grpc.BookingService;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;

namespace BookingService.Aspnet.Services;

internal sealed class GrpcBookingService : Grpc.BookingService.GrpcBookingService.GrpcBookingServiceBase
{
    private readonly BookingService _bookingService;

    public GrpcBookingService(ILogger<GrpcBookingService> logger, BookingService bookingService)
    {
        _bookingService = bookingService ?? throw new ArgumentNullException(nameof(bookingService));
    }

    public override async Task<BookingsByUserReply> GetActiveBookingsByUser(BookingsByUserRequest request, ServerCallContext context)
    {
        var activeBookingsForUser = await _bookingService.GetActiveBookingsByUserAsync(request.UserId);
        var reply = CreateBookingsByUserReply(activeBookingsForUser);

        return reply;
    }

    private static BookingsByUserReply CreateBookingsByUserReply(List<Booking> activeBookingsForUser)
    {
        var reply = new BookingsByUserReply();

        foreach (var activeBooking in activeBookingsForUser)
        {
            var bookingReply = new BookingsByUserReply.Types.BookingByUser
            {
                ParkingSlotName = activeBooking.ParkingSlot.Name,
                StartDate = Timestamp.FromDateTime(activeBooking.StartDate),
                EndDate = Timestamp.FromDateTime(activeBooking.EndDate),
                BookingId = activeBooking.Id
            };

            reply.BookingsByUser.Add(bookingReply);
        }

        return reply;
    }

    public override async Task<BookingReply> BookParkingSlot(BookingRequest request, ServerCallContext context)
    {
        var booking = await _bookingService.BookParkingSlotAsync(request.UserId, request.StartDate.ToDateTime(), request.EndDate.ToDateTime());
        var reply = new BookingReply()
        {
            BookingId = booking.Id,
            ParkingSlotName = booking.ParkingSlot.Name
        };
        return reply;
    }

    public override Task<CancelBookingReply> CancelBooking(CancelBookingRequest request, ServerCallContext context)
    {
        _bookingService.CancelBooking(request.BookingId);
        return Task.FromResult(new CancelBookingReply() { Success = true });
    }
}