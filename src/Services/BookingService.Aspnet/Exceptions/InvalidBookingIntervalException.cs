namespace BookingService.Aspnet.Exceptions;

internal class InvalidBookingIntervalException : ApplicationException
{
    public InvalidBookingIntervalException(string? message = null) : base(message)
    {

    }
}
