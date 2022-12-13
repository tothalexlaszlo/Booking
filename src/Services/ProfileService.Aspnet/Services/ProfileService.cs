using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.ProfileService;
using ProfileService.Aspnet.Models;

namespace ProfileService.Aspnet.Services;

internal sealed class ProfileService : GrpcProfileService.GrpcProfileServiceBase
{
    private readonly IdentityService _identityService;

    public ProfileService(IdentityService tokenService)
    {
        _identityService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
    }

    public override async Task<LoginReply> Login(LoginRequest request, ServerCallContext context)
    {
        var creds = new Credentials(request.Username, request.Password);
        var loginResult = await _identityService.LoginAsync(creds);

        var reply = new LoginReply()
        {
            Success = loginResult.Success
        };

        if (!loginResult.Success)
        {
            reply.ErrorMessage = loginResult.ErrorMessage;
            return reply;
        }

        reply.Token = loginResult.Token;
        reply.Expiration = Timestamp.FromDateTime(loginResult.Expiration);
        return reply;
    }

    public override async Task<GeneralReply> Logout(LogoutRequest request, ServerCallContext context)
        => new GeneralReply() { Success = await _identityService.LogoutAsync(request.Username) };

    public override async Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
    {
        var registrationData = new RegistrationData(request.Username, request.Password, request.LicensePlate, request.FullName);
        var result = await _identityService.RegisterAsync(registrationData);

        var reply = new RegistrationReply()
        {
            Success = result.UserCreationState == UserCreationState.Success
        };

        foreach (var error in result.Errors)
        {
            reply.Errors.Add(error);
        }

        return reply;
    }
}
