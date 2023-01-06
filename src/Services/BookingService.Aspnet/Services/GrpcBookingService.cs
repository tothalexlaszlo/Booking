using BookingService.Aspnet.Exceptions;
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

    [Authorize]
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

    [Authorize]
    public override async Task<BookingReply> BookParkingSlot(BookingRequest request, ServerCallContext context)
    {
        var reply = new BookingReply();
        try
        {
            var booking = await _bookingService.BookParkingSlotAsync(request.UserId, request.StartDate.ToDateTime(), request.EndDate.ToDateTime());
            reply.BookingId = booking.Id;
            reply.ParkingSlotName = booking.ParkingSlot.Name;            
        }
        catch(InvalidBookingIntervalException ex)
        {
            context.Status = new Status(StatusCode.InvalidArgument, ex.Message);
        }
        catch(NoFreeParkingSlotException ex)
        {
            context.Status = new Status(StatusCode.AlreadyExists, ex.Message);
        }
        return reply;
    }

    [Authorize]
    public override Task<CancelBookingReply> CancelBooking(CancelBookingRequest request, ServerCallContext context)
    {
        _bookingService.CancelBooking(request.BookingId);
        return Task.FromResult(new CancelBookingReply() { Success = true });
    }
}