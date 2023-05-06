﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VSLab.Data;

#nullable disable

namespace VSLab.Migrations
{
    [DbContext(typeof(ChessDbContext))]
    [Migration("20230505195854_Test2Migrations")]
    partial class Test2Migrations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("VSLab.Data.Security.userProfile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BirthDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("userProfiles");
                });

            modelBuilder.Entity("VSLab.Data.tblChessChampion", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("ChessPlayerID")
                        .HasColumnType("int");

                    b.Property<int>("ConsecutiveYears")
                        .HasColumnType("int");

                    b.Property<int>("Current")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastTrophy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxRating")
                        .HasColumnType("int");

                    b.Property<string>("Record")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ChessPlayerID");

                    b.HasIndex("UserID");

                    b.ToTable("tblChessChampions");
                });

            modelBuilder.Entity("VSLab.Data.tblChessParticipation", b =>
                {
                    b.Property<int>("ChessTournamentID")
                        .HasColumnType("int");

                    b.Property<int>("ChessPlayerID")
                        .HasColumnType("int");

                    b.Property<string>("DateSigned")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DurationPlayed")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ChessTournamentID", "ChessPlayerID");

                    b.HasIndex("ChessPlayerID");

                    b.HasIndex("UserID");

                    b.ToTable("tblChessParticipations");
                });

            modelBuilder.Entity("VSLab.Data.tblChessPlayer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IsMaster")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("StartYear")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("tblChessPlayers");
                });

            modelBuilder.Entity("VSLab.Data.tblChessTournament", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Host")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumParticipants")
                        .HasColumnType("int");

                    b.Property<int>("PrizeMoney")
                        .HasColumnType("int");

                    b.Property<string>("Trophy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("tblChessTournaments");
                });

            modelBuilder.Entity("tblChessPlayertblChessTournament", b =>
                {
                    b.Property<int>("ChessPlayersID")
                        .HasColumnType("int");

                    b.Property<int>("ChessTournamentsID")
                        .HasColumnType("int");

                    b.HasKey("ChessPlayersID", "ChessTournamentsID");

                    b.HasIndex("ChessTournamentsID");

                    b.ToTable("tblChessPlayertblChessTournament");
                });

            modelBuilder.Entity("VSLab.Data.tblChessChampion", b =>
                {
                    b.HasOne("VSLab.Data.tblChessPlayer", "ChessPlayer")
                        .WithMany("ChessChampions")
                        .HasForeignKey("ChessPlayerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VSLab.Data.Security.userProfile", "User")
                        .WithMany("ChessChampions")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChessPlayer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("VSLab.Data.tblChessParticipation", b =>
                {
                    b.HasOne("VSLab.Data.tblChessPlayer", "ChessPlayer")
                        .WithMany("PlayerParticipations")
                        .HasForeignKey("ChessPlayerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VSLab.Data.tblChessTournament", "ChessTournament")
                        .WithMany("TournamentParticipations")
                        .HasForeignKey("ChessTournamentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VSLab.Data.Security.userProfile", "User")
                        .WithMany("ChessParticipations")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChessPlayer");

                    b.Navigation("ChessTournament");

                    b.Navigation("User");
                });

            modelBuilder.Entity("VSLab.Data.tblChessPlayer", b =>
                {
                    b.HasOne("VSLab.Data.Security.userProfile", "User")
                        .WithMany("ChessPlayers")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("VSLab.Data.tblChessTournament", b =>
                {
                    b.HasOne("VSLab.Data.Security.userProfile", "User")
                        .WithMany("ChessTournaments")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("tblChessPlayertblChessTournament", b =>
                {
                    b.HasOne("VSLab.Data.tblChessPlayer", null)
                        .WithMany()
                        .HasForeignKey("ChessPlayersID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VSLab.Data.tblChessTournament", null)
                        .WithMany()
                        .HasForeignKey("ChessTournamentsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("VSLab.Data.Security.userProfile", b =>
                {
                    b.Navigation("ChessChampions");

                    b.Navigation("ChessParticipations");

                    b.Navigation("ChessPlayers");

                    b.Navigation("ChessTournaments");
                });

            modelBuilder.Entity("VSLab.Data.tblChessPlayer", b =>
                {
                    b.Navigation("ChessChampions");

                    b.Navigation("PlayerParticipations");
                });

            modelBuilder.Entity("VSLab.Data.tblChessTournament", b =>
                {
                    b.Navigation("TournamentParticipations");
                });
#pragma warning restore 612, 618
        }
    }
}
