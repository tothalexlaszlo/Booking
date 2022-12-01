namespace ProfileService.Aspnet.Models;

public sealed class TokenModel
{
    public string? Token { get; internal set; }

    public DateTime Expiration { get; internal set; }

    public bool Success { get; internal set; }
}
