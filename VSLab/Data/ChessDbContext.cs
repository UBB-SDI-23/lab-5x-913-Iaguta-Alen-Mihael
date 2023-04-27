using Microsoft.EntityFrameworkCore;

namespace VSLab.Data
{
    public class ChessDbContext : DbContext
    {
        public ChessDbContext(DbContextOptions opt) : base(opt)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblChessChampion>()
                .HasOne<tblChessPlayer>(s => s.ChessPlayer)
                .WithMany(g => g.ChessChampions)
                .HasForeignKey(s => s.ChessPlayerID);

            modelBuilder.Entity<tblChessParticipation>()
                .HasKey(c => new { c.ChessTournamentID, c.ChessPlayerID });

            modelBuilder.Entity<tblChessParticipation>()
                .HasOne<tblChessPlayer>(s => s.ChessPlayer)
                .WithMany(g => g.PlayerParticipations)
                .HasForeignKey(s => s.ChessPlayerID);

            modelBuilder.Entity<tblChessParticipation>()
                .HasOne<tblChessTournament>(s => s.ChessTournament)
                .WithMany(g => g.TournamentParticipations)
                .HasForeignKey(s => s.ChessTournamentID);
        }

        public DbSet<tblChessParticipation> tblChessParticipations { get; set; } = default!;
        public DbSet<tblChessTournament> tblChessTournaments { get; set; } = default!;
        public virtual DbSet<tblChessPlayer> tblChessPlayers { get; set; } = default!;
        public virtual DbSet<tblChessChampion> tblChessChampions { get; set; } = default!;
    }
}
