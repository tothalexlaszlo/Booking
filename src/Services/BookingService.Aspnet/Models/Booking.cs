namespace BookingService.Aspnet.Models;

internal class Booking
{
    public Booking(int userId, ParkingSlot parkingSlot, DateTime startDate, DateTime endDate)
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
    public int UserId { get; set; }
    public ParkingSlot ParkingSlot { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}