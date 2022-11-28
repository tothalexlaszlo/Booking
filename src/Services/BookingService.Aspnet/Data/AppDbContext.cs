using BookingService.Aspnet.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingService.Aspnet.Data;

internal class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }
    public virtual DbSet<ParkingSlot> ParkingSlots { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder.Entity<Booking>()
            .HasOne<ParkingSlot>().WithMany();

        _ = modelBuilder.Entity<ParkingSlot>()
            .HasMany<Booking>().WithOne().HasForeignKey(booking => booking.ParkingSlotId);
    }
}
