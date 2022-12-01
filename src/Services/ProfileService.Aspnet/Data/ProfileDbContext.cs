using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ProfileService.Aspnet.Data;

public class ProfileDbContext : IdentityDbContext<IdentityUser>
{
}
