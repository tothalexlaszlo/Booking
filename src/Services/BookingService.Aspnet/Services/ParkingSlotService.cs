using BookingService.Aspnet.Interfaces;
using BookingService.Aspnet.Models;

namespace BookingService.Aspnet.Services;

internal class ParkingSlotService
{
    private readonly IRepository<ParkingSlot> _parkingSlotRepository;

    public ParkingSlotService(IRepository<ParkingSlot> parkingSlotRepository)
    {
        _parkingSlotRepository = parkingSlotRepository ?? throw new ArgumentNullException(nameof(parkingSlotRepository));
    }

    public async Task<List<ParkingSlot>> GetParkingSlotsAsync() => await _parkingSlotRepository.GetAllAsync();

    public ParkingSlot CreateParkingSlot(string name)
    {
        var newParkingSlot = new ParkingSlot(name);
        _parkingSlotRepository.Add(newParkingSlot);
        _parkingSlotRepository.SaveChanges();

        return newParkingSlot;
    }

    public void DeleteParkingSlot(int parkingSlotId)
    {
        _parkingSlotRepository.Delete(parkingSlotId);
        _parkingSlotRepository.SaveChanges();
    }

    public void UpdateParkingSlot(ParkingSlot updatedParkingSlot)
    {
        _parkingSlotRepository.Update(updatedParkingSlot);
        _parkingSlotRepository.SaveChanges();

    }
}
