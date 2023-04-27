using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace VSLab.Migrations
{
    /// <inheritdoc />
    public partial class MigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblChessPlayers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    IsMaster = table.Column<int>(type: "integer", nullable: false),
                    StartYear = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessPlayers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tblChessTournaments",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NumParticipants = table.Column<int>(type: "integer", nullable: false),
                    Host = table.Column<string>(type: "text", nullable: false),
                    PrizeMoney = table.Column<int>(type: "integer", nullable: false),
                    Trophy = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessTournaments", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tblChessChampions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LastTrophy = table.Column<string>(type: "text", nullable: false),
                    Record = table.Column<string>(type: "text", nullable: false),
                    MaxRating = table.Column<int>(type: "integer", nullable: false),
                    ConsecutiveYears = table.Column<int>(type: "integer", nullable: false),
                    Current = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ChessPlayerID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessChampions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessChampions_tblChessPlayers_ChessPlayerID",
                        column: x => x.ChessPlayerID,
                        principalTable: "tblChessPlayers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessParticipations",
                columns: table => new
                {
                    ChessPlayerID = table.Column<int>(type: "integer", nullable: false),
                    ChessTournamentID = table.Column<int>(type: "integer", nullable: false),
                    DateSigned = table.Column<string>(type: "text", nullable: true),
                    DurationPlayed = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessParticipations", x => new { x.ChessTournamentID, x.ChessPlayerID });
                    table.ForeignKey(
                        name: "FK_tblChessParticipations_tblChessPlayers_ChessPlayerID",
                        column: x => x.ChessPlayerID,
                        principalTable: "tblChessPlayers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblChessParticipations_tblChessTournaments_ChessTournamentID",
                        column: x => x.ChessTournamentID,
                        principalTable: "tblChessTournaments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessPlayertblChessTournament",
                columns: table => new
                {
                    ChessPlayersID = table.Column<int>(type: "integer", nullable: false),
                    ChessTournamentsID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessPlayertblChessTournament", x => new { x.ChessPlayersID, x.ChessTournamentsID });
                    table.ForeignKey(
                        name: "FK_tblChessPlayertblChessTournament_tblChessPlayers_ChessPlaye~",
                        column: x => x.ChessPlayersID,
                        principalTable: "tblChessPlayers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblChessPlayertblChessTournament_tblChessTournaments_ChessT~",
                        column: x => x.ChessTournamentsID,
                        principalTable: "tblChessTournaments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblChessChampions_ChessPlayerID",
                table: "tblChessChampions",
                column: "ChessPlayerID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessParticipations_ChessPlayerID",
                table: "tblChessParticipations",
                column: "ChessPlayerID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessPlayertblChessTournament_ChessTournamentsID",
                table: "tblChessPlayertblChessTournament",
                column: "ChessTournamentsID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblChessChampions");

            migrationBuilder.DropTable(
                name: "tblChessParticipations");

            migrationBuilder.DropTable(
                name: "tblChessPlayertblChessTournament");

            migrationBuilder.DropTable(
                name: "tblChessPlayers");

            migrationBuilder.DropTable(
                name: "tblChessTournaments");
        }
    }
}
