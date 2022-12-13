namespace ProfileService.Aspnet.Models;

internal readonly struct RegistrationData
{
    public RegistrationData(string username, string password, string licensePlate, string fullName)
    {
        Username = username;
        Password = password;
        LicensePlate = licensePlate;
        FullName = fullName;
    }

    public string Username { get; }

    public string Password { get; }

    public string LicensePlate { get; }

    public string FullName { get; }
}
