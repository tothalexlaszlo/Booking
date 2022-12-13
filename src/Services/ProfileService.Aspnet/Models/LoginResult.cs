namespace ProfileService.Aspnet.Models;

public sealed class LoginResult
{
    public bool Success { get; internal set; }

    public string? ErrorMessage { get; internal set; }

    public string? Token { get; internal set; }

    public DateTime Expiration { get; internal set; }
}
