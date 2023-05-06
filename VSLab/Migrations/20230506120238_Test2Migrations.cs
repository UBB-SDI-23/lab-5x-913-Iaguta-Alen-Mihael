using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSLab.Migrations
{
    /// <inheritdoc />
    public partial class Test2Migrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblUserProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUserProfiles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tblChessPlayers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    IsMaster = table.Column<int>(type: "int", nullable: false),
                    StartYear = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessPlayers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessPlayers_tblUserProfiles_UserID",
                        column: x => x.UserID,
                        principalTable: "tblUserProfiles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessTournaments",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumParticipants = table.Column<int>(type: "int", nullable: false),
                    Host = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrizeMoney = table.Column<int>(type: "int", nullable: false),
                    Trophy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessTournaments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessTournaments_tblUserProfiles_UserID",
                        column: x => x.UserID,
                        principalTable: "tblUserProfiles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessChampions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastTrophy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Record = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaxRating = table.Column<int>(type: "int", nullable: false),
                    ConsecutiveYears = table.Column<int>(type: "int", nullable: false),
                    Current = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChessPlayerID = table.Column<int>(type: "int", nullable: false)
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
                    ChessPlayerID = table.Column<int>(type: "int", nullable: false),
                    ChessTournamentID = table.Column<int>(type: "int", nullable: false),
                    DateSigned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationPlayed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                        onDelete: ReferentialAction.NoAction);
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
                name: "IX_tblChessPlayers_UserID",
                table: "tblChessPlayers",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessTournaments_UserID",
                table: "tblChessTournaments",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblChessChampions");

            migrationBuilder.DropTable(
                name: "tblChessParticipations");

            migrationBuilder.DropTable(
                name: "tblChessPlayers");

            migrationBuilder.DropTable(
                name: "tblChessTournaments");

            migrationBuilder.DropTable(
                name: "tblUserProfiles");
        }
    }
}
