using BookingService.Aspnet.Interfaces;
using System.Reflection.PortableExecutable;

namespace BookingService.Aspnet.Models;

public class ParkingSlot
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
