using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.ParkingSlotService;

namespace BookingService.Aspnet.Services;

internal sealed class GrpcParkingSlotService : Grpc.ParkingSlotService.GrpcParkingSlotService.GrpcParkingSlotServiceBase
{
    private readonly ParkingSlotService _parkingSlotService;

    public GrpcParkingSlotService(ParkingSlotService parkingSlotService) => _parkingSlotService = parkingSlotService;

    public override async Task<GetParkingSlotsReply> GetParkingSlots(Empty request, ServerCallContext context)
    {
        var parkingSlots = await _parkingSlotService.GetParkingSlotsAsync();
        var parkingSlotsReply = CreateGetParkingSlotsReply(parkingSlots); 

        return parkingSlotsReply;
    }

    private static GetParkingSlotsReply CreateGetParkingSlotsReply(List<Models.ParkingSlot> parkingSlots)
    {
        var getParkingSlotsReply = new GetParkingSlotsReply();

        foreach (var parkingSlot in parkingSlots)
        {
            getParkingSlotsReply.ParkingSlots.Add(CreateGrpcParkingSlotMessage(parkingSlot));
        }

        return getParkingSlotsReply;
    }

    private static Grpc.ParkingSlotService.ParkingSlot CreateGrpcParkingSlotMessage(Models.ParkingSlot parkingSlot)
    {
        return new Grpc.ParkingSlotService.ParkingSlot()
        {
            ParkingSlotId = parkingSlot.Id,
            ParkingSlotName = parkingSlot.Name
        };
    }

    public override Task<CreateParkingSlotReply> CreateParkingSlot(CreateParkingSlotRequest request, ServerCallContext context)
    {
        var newParkingSlot = _parkingSlotService.CreateParkingSlot(request.ParkingSlotName);
        var grpcParkingSlotMessage = CreateGrpcParkingSlotMessage(newParkingSlot);
        return Task.FromResult(new CreateParkingSlotReply() { ParkingSlot = grpcParkingSlotMessage });

    }

    public override Task<UpateParkingSlotReply> UpdateParkingSlot(UpdateParkingSlotRequest request, ServerCallContext context)
    {

        var updatedParkingSlot = new Models.ParkingSlot(request.ParkingSlotId, request.ParkingSlotName);
        _parkingSlotService.UpdateParkingSlot(updatedParkingSlot);

        return Task.FromResult(new UpateParkingSlotReply() { Success = true });
    }

    public override Task<DeleteParkingSlotByIdReply> DeleteParkingSlot(DeleteParkingSlotByIdRequest request, ServerCallContext context)
    {
        _parkingSlotService.DeleteParkingSlot(request.ParkingSlotId);
        return Task.FromResult(new DeleteParkingSlotByIdReply() { Success = true });
    }
}
