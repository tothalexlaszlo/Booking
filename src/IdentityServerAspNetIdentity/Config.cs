using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace IdentityServerAspNetIdentity;
public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope(name: "booking_api", displayName: "Booking API")
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new[]
        {
            new ApiResource("booking_api", "\"booking_api\" #1") { Scopes = {"booking_api"} }
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client()
            {
                ClientId = "bookingClientId",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                //ClientSecrets =
                //{
                //    new Secret("secret".Sha256())
                //},
                AllowedScopes = { "booking_api" }
            },
            new Client()
            {
                ClientId = "web",
                //ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = { "http://localhost:4200/signin-callback" },
                PostLogoutRedirectUris = { "http://localhost:4200/signout-callback" },               
                AllowedCorsOrigins = { "http://localhost:4200" },
                AllowOfflineAccess = true,
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "booking_api"
                },
                RequireClientSecret = false
            },
            new Client
            {
                ClientId = "demo_api_swagger",
                ClientName = "Swagger UI for demo_api",
                ClientSecrets = {new Secret("secret".Sha256())}, // change me!
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                RequireClientSecret = false,
                RedirectUris = {"http://localhost/swagger/oauth2-redirect.html"},
                AllowedCorsOrigins = { "http://localhost", "https://localhost"},
                AllowedScopes = { "booking_api" }
            }
        };
}