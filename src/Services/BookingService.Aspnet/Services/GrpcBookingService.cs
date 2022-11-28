using BookingService.Aspnet.Models;
using Google.Protobuf.WellKnownTypes;
using Grpc.BookingService;
using Grpc.Core;

namespace BookingService.Aspnet.Services;

internal sealed class GrpcBookingService : Grpc.BookingService.GrpcBookingService.GrpcBookingServiceBase
{
    private readonly ILogger<GrpcBookingService> _logger;
    private readonly BookingService _bookingService;
    private readonly ParkingSlotService _parkingSlotService;

    public GrpcBookingService(ILogger<GrpcBookingService> logger, BookingService bookingService, ParkingSlotService parkingSlotService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _bookingService = bookingService ?? throw new ArgumentNullException(nameof(bookingService));
        _parkingSlotService = parkingSlotService ?? throw new ArgumentNullException(nameof(parkingSlotService));
    }

    public override async Task<BookingsByUserReply> GetActiveBookingsByUser(BookingsByUserRequest request, ServerCallContext context)
    {
        var activeBookingsForUser = await _bookingService.GetActiveBookingsByUserAsync(request.UserId);
        var reply = await CreateBookingsByUserReply(activeBookingsForUser);

        return reply;
    }

    private async Task<BookingsByUserReply> CreateBookingsByUserReply(List<Booking> activeBookingsForUser)
    {
        var reply = new BookingsByUserReply();

        foreach (var activeBooking in activeBookingsForUser)
        {
            var bookingReply = new BookingsByUserReply.Types.BookingByUser
            {
                ParkingSlotName = await _parkingSlotService.GetParkingSlotNameById(activeBooking.ParkingSlotId),
                StartDate = Timestamp.FromDateTime(activeBooking.StartDate),
                EndDate = Timestamp.FromDateTime(activeBooking.EndDate)
            };

            reply.BookingsByUser.Add(bookingReply);
        }

        return reply;
    }

    public override async Task<BookingReply> BookParkingSlot(BookingRequest request, ServerCallContext context)
    {
        var booking = await _bookingService.BookParkingSlotAsync(request.UserId, request.StartDate.ToDateTime(), request.EndDate.ToDateTime());
        var reply = await CreateBookingReply(booking);
        return reply;
    }

    private async Task<BookingReply> CreateBookingReply(Booking booking)
    {
        return new BookingReply()
        {
            BookingId = booking.Id,
            ParkingSlotName = await _parkingSlotService.GetParkingSlotNameById(booking.ParkingSlotId)
        };
    }

    public override Task<CancelBookingReply> CancelBooking(CancelBookingRequest request, ServerCallContext context)
    {
        _bookingService.CancelBooking(request.BookingId);
        return Task.FromResult(new CancelBookingReply() { Success = true });
    }
}
