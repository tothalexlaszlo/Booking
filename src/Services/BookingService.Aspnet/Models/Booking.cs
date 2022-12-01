using System.Diagnostics.CodeAnalysis;

namespace BookingService.Aspnet.Models;

internal class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public ParkingSlot ParkingSlot { get; set; }
    public int ParkingSlotId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
