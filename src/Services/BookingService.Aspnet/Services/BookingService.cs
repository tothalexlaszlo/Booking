using BookingService.Aspnet.Exceptions;
using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Models;

namespace BookingService.Aspnet.Services;

internal sealed class BookingService
{
    private readonly TimeSpan _maximumAllowedBookingPeriod = TimeSpan.FromHours(12);
    private readonly IRepository<Booking> _bookingRepository;
    private readonly IRepository<ParkingSlot> _parkingSlotRepository;
    private readonly string[] _relationProperties = new string[] { nameof(ParkingSlot) };

    public BookingService(IRepository<Booking> bookingRepository, IRepository<ParkingSlot> parkingSlotRepository)
    {
        _bookingRepository = bookingRepository ?? throw new ArgumentNullException(nameof(bookingRepository));
        _parkingSlotRepository = parkingSlotRepository ?? throw new ArgumentNullException(nameof(parkingSlotRepository));
    }

    public async Task<List<Booking>> GetActiveBookingsByUserAsync(string userId) =>
        await _bookingRepository.FindAllByAsync(booking => booking.UserId == userId && booking.EndDate > DateTime.UtcNow, includeProperties: _relationProperties);

    public async Task<Booking> BookParkingSlotAsync(string userId, DateTime startDate, DateTime endDate)
    {
        if (startDate + TimeSpan.FromHours(1) > endDate || endDate - startDate > _maximumAllowedBookingPeriod)
        {
            throw new InvalidBookingIntervalException("Requested booking interval is invalid");
        }

        var parkingSlots = await _parkingSlotRepository.GetAllAsync();
        var bookingsForGivenTimePeriod = await _bookingRepository.FindAllByAsync(
            AreThereBookingsAtGivenPeriod(startDate, endDate), includeProperties: _relationProperties);

        var currentlyBookedParkingSlots = bookingsForGivenTimePeriod.DistinctBy(booking => booking.ParkingSlot.Id).Select(booking => booking.ParkingSlot.Id);
        var freeSlots = parkingSlots.ExceptBy(currentlyBookedParkingSlots, slot => slot.Id);

        var spotToBook = freeSlots.FirstOrDefault();

        if (spotToBook is null)
        {
            throw new NoFreeParkingSlotException("Ran out of free parking spots!");
        }

        var booking = new Booking(userId, spotToBook, startDate, endDate);

        _bookingRepository.Add(booking);
        _bookingRepository.SaveChanges();

        return booking;
    }

    public void CancelBooking(int bookingId)
    {
        _bookingRepository.Delete(bookingId);
        _bookingRepository.SaveChanges();
    }

    private static System.Linq.Expressions.Expression<Func<Booking, bool>> AreThereBookingsAtGivenPeriod(DateTime startDate, DateTime endDate)
    {
        return booking => (startDate <= booking.StartDate && endDate <= booking.EndDate && endDate >= booking.StartDate)
                                || (startDate <= booking.StartDate && endDate >= booking.EndDate)
                                || (startDate >= booking.StartDate && endDate <= booking.EndDate)
                                || (startDate >= booking.StartDate && endDate >= booking.EndDate && startDate <= booking.EndDate);
    }
}