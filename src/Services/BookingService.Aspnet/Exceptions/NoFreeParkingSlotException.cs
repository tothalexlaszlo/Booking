namespace BookingService.Aspnet.Exceptions;

internal class NoFreeParkingSlotException : ApplicationException
{
    public NoFreeParkingSlotException(string? message = null) : base(message)
    {
    }
}