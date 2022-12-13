using Microsoft.AspNetCore.Identity;

namespace ProfileService.Aspnet.Models;

public class User : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public string? LicensePlate { get; set; }

    public User()
    {

    }

    public User(string fullName, string username)
    {
        FullName = fullName;
        UserName= username;
    }
}
