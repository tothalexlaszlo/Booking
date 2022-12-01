using Grpc.Core;
using Grpc.ProfileService;
using ProfileService.Aspnet.Models;

namespace ProfileService.Aspnet.Services;

public class ProfileService : GrpcProfileService.GrpcProfileServiceBase
{
    public override Task<TokenReply> GetToken(TokenRequest request, ServerCallContext context)
    {
        var creds = new Credentials(request.Username, request.Password);


        var reply = new TokenReply();
        return Task.FromResult(reply);
    }
}
