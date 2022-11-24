using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Models;

namespace BookingService.Aspnet.Services;

public class ParkingSlotService
{
    private readonly IRepository<ParkingSlot> _parkingSlotRepository;

    public ParkingSlotService(IRepository<ParkingSlot> parkingSlotRepository)
    {
        _parkingSlotRepository = parkingSlotRepository ?? throw new ArgumentNullException(nameof(parkingSlotRepository));
    }

    public async Task<string?> GetParkingSlotNameById(int parkingSlotId)
    {
        var parkingSlot = await _parkingSlotRepository.FindByIdAsync(parkingSlotId);

        return parkingSlot?.Name;
    }
}
