using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ProfileService.Aspnet.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProfileService.Aspnet.Services;

internal sealed class TokenService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public TokenService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
    }

    public async ValueTask<TokenModel> GenerateTokenModelAsync(Credentials credentials)
    {
        var user = await _userManager.FindByNameAsync(credentials.Username);
        var result = new TokenModel();

        if (user is null)
        {
            return result;
        }

        var check = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, false);

        if (!check.Succeeded)
        {
            return result;
        }

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d6390614-b135-4d2a-a4e5-39e5fa45b26b"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken("ITHub","FIBS",claims,expires: DateTime.UtcNow.AddHours(8),signingCredentials: creds);

        result.Token = new JwtSecurityTokenHandler().WriteToken(token);
        result.Expiration = token.ValidTo;
        result.Success= true;

        return result;
    }
}
