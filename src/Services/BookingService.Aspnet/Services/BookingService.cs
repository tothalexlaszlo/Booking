using BookingService.Aspnet.Exceptions;
using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Models;

namespace BookingService.Aspnet.Services;

internal sealed class BookingService
{
    private readonly TimeSpan _maximumAllowedBookingPeriod = TimeSpan.FromHours(12);
    private readonly IRepository<Booking> _bookingRepository;
    private readonly IRepository<ParkingSlot> _parkingSlotRepository;

    public BookingService(IRepository<Booking> bookingRepository, IRepository<ParkingSlot> parkingSlotRepository)
    {
        _bookingRepository = bookingRepository ?? throw new ArgumentNullException(nameof(bookingRepository));
        _parkingSlotRepository = parkingSlotRepository ?? throw new ArgumentNullException(nameof(parkingSlotRepository));
    }

    public async Task<List<Booking>> GetActiveBookingsByUserAsync(int userId) =>
        await _bookingRepository.FindAllByAsync(booking => booking.UserId == userId && booking.EndDate > DateTime.UtcNow);

    public async Task<Booking> BookParkingSlotAsync(int userId, DateTime startDate, DateTime endDate)
    {
        if (startDate + TimeSpan.FromHours(1) > endDate || endDate - startDate > _maximumAllowedBookingPeriod)
        {
            throw new InvalidBookingIntervalException();
        }

        var parkingSlots = await _parkingSlotRepository.GetAllAsync();
        var bookingsForGivenTimePeriod = await _bookingRepository.FindAllByAsync(booking => IsThereABookingAtGivenPeriod(startDate, endDate, booking));

        var currentlyBookedParkingSlots = bookingsForGivenTimePeriod.DistinctBy(booking => booking.ParkingSlotId).Select(booking => booking.ParkingSlotId);
        var freeSlots = parkingSlots.ExceptBy(currentlyBookedParkingSlots, slot => slot.Id);

        var spotToBook = freeSlots.FirstOrDefault();

        if (spotToBook is null)
        {
            throw new NoFreeParkingSlotException();
        }

        var booking = new Booking()
        {
            ParkingSlotId = spotToBook.Id,
            UserId = userId,
            StartDate = startDate,
            EndDate= endDate
        };

        _bookingRepository.Add(booking);

        return booking;
    }

    public void CancelBooking(int bookingId) => _bookingRepository.Delete(bookingId);

    private static bool IsThereABookingAtGivenPeriod(in DateTime startDate, in DateTime endDate, in Booking booking)
    {
        return (startDate < booking.StartDate && endDate < booking.EndDate)
                || (startDate < booking.StartDate && endDate > booking.EndDate)
                || (startDate > booking.StartDate && endDate < booking.EndDate)
                || (startDate > booking.StartDate && endDate > booking.EndDate);
    }
}
