namespace BookingService.Aspnet.Models;

internal class Booking
{
    public Booking(string userId, ParkingSlot parkingSlot, DateTime startDate, DateTime endDate)
    {
        UserId = userId;
        ParkingSlot = parkingSlot;
        StartDate = startDate;
        EndDate = endDate;
    }

    // For EF
    private Booking()
    {
    }

    public int Id { get; set; }
    public string UserId { get; set; }
    public ParkingSlot ParkingSlot { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}