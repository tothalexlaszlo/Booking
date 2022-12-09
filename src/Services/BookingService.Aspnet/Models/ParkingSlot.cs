namespace BookingService.Aspnet.Models;

internal class ParkingSlot
{
    public ParkingSlot(string name) => Name = name;

    public int Id { get; set; }
    public string Name { get; set; }
}
