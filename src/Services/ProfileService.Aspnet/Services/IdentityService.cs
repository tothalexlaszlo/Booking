using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ProfileService.Aspnet.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProfileService.Aspnet.Services;

internal sealed class IdentityService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public IdentityService(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
    }

    public async ValueTask<LoginResult> LoginAsync(Credentials credentials)
    {
        var user = await _userManager.FindByNameAsync(credentials.Username);
        var result = new LoginResult();
        result.ErrorMessage = "Invalid username or password!";

        if (user is null /*|| string.IsNullOrWhiteSpace(user.Email)*/ || string.IsNullOrWhiteSpace(user.UserName))
        {
            return result;
        }

        if (_signInManager.IsSignedIn(_signInManager.Context.User))
        {
            await _signInManager.SignOutAsync();
            result.ErrorMessage = "User is already signed in!";
            return result;
        }

        var check = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, false);

        if (!check.Succeeded)
        {
            return result;
        }

        var claims = new[]
        {
            //new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d6390614-b135-4d2a-a4e5-39e5fa45b26b"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken("ITHub","FIBS",claims,expires: DateTime.UtcNow.AddHours(8),signingCredentials: creds);

        result.Token = new JwtSecurityTokenHandler().WriteToken(token);
        result.Expiration = token.ValidTo;
        result.Success = true;
        result.ErrorMessage = null;

        return result;
    }

    public async ValueTask<bool> LogoutAsync(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user is null)
        {
            return false;
        }

        await _signInManager.SignOutAsync();

        return true;
    }

    public async ValueTask<RegistrationResult> RegisterAsync(RegistrationData registrationData)
    {
        var user = await _userManager.FindByNameAsync(registrationData.Username);

        if (user is not null)
        {
            return new RegistrationResult(UserCreationState.UsernameTaken);
        }

        var newUser = new User(registrationData.Username, registrationData.FullName)
        {
            LicensePlate = registrationData.LicensePlate
        };

        var result = await _userManager.CreateAsync(newUser, registrationData.Password);

        var regResult = new RegistrationResult();
        if (!result.Succeeded)
        {
            regResult.UserCreationState = UserCreationState.CreationFailed;
            regResult.Errors.AddRange(result.Errors.Select(x => x.Description));
            return regResult;
        }

        _ = await _userManager.AddToRoleAsync(newUser, "StandardUser");

        return regResult;
    }
}
