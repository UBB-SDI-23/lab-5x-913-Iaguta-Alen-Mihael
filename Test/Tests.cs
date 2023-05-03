using Microsoft.EntityFrameworkCore;
using VSLab.Controllers;
using VSLab.Data;
using VSLab.Data.Non_Essential;

namespace Test
{
    [TestClass]
    public class Tests
    {
        [TestMethod]
        public async Task Filter_ReturnExpectedDataTest()
        {
            // Arrange
            var players = new List<tblChessPlayer>
            {
                new tblChessPlayer {ID = 1, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 1234, StartYear = 1999 },
                new tblChessPlayer {ID = 2, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 4124, StartYear = 1999 },
                new tblChessPlayer {ID = 3, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 5402, StartYear = 1999 }
            };

            var data = new List<tblChessChampion> {
            new tblChessChampion {ID = 1, ChessPlayer = players[0], ChessPlayerID = 1, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1500, Record = "12-43-12"},
            new tblChessChampion {ID = 2, ChessPlayer = players[0], ChessPlayerID = 1, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1800, Record = "12-43-12"},
            new tblChessChampion {ID = 3, ChessPlayer = players[2], ChessPlayerID = 3, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1650, Record = "12-43-12"},
            };

            var optionsBuilder = new DbContextOptionsBuilder<ChessDbContext>()
                .UseInMemoryDatabase(databaseName: "FirstTestDatabase")
                .Options;
            var mockContext = new ChessDbContext(optionsBuilder);
            var service = new ChessChampionsController(mockContext);

            foreach(var champ in data)
            {
                mockContext.tblChessChampions.Add(champ);
            }
            await mockContext.SaveChangesAsync();

            var goodData = new List<tblChessChampion> {
            new tblChessChampion {ID = 2, ChessPlayer = players[0], ChessPlayerID = 1, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1800, Record = "12-43-12"},
            new tblChessChampion {ID = 3, ChessPlayer = players[2], ChessPlayerID = 3, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1650, Record = "12-43-12"},
            }; 

            // Act
            var result = await service.GettblChessChampionByRating(1600);

            // Assert
            var tblChessChampions = result as tblChessChampion[] ?? result.ToArray();
            Assert.AreEqual(tblChessChampions.Count(), goodData.Count());
            Assert.AreEqual(tblChessChampions.ToList()[0].ID, goodData[0].ID);
            Assert.AreEqual(tblChessChampions.ToList()[1].ID, goodData[1].ID);
            Assert.IsTrue(tblChessChampions.ToList()[1].Current == goodData[1].Current && tblChessChampions.ToList()[1].Record == goodData[1].Record);
        }

        [TestMethod]
        public async Task CreateDtoChessPlayer_ReturnExpectedData()
        {
            // Arrange
            var players = new List<tblChessPlayer>
            {
                new tblChessPlayer {ID = 1, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 1234, StartYear = 1999 },
                new tblChessPlayer {ID = 2, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 4124, StartYear = 1999 },
                new tblChessPlayer {ID = 3, Country = "Romania", IsMaster = 1, Name = "Banzeus", Rating = 5402, StartYear = 1999 }
            };

            var data = new List<tblChessChampion> {
            new tblChessChampion {ID = 1, ChessPlayer = players[0], ChessPlayerID = 1, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1500, Record = "12-43-12"},
            new tblChessChampion {ID = 2, ChessPlayer = players[0], ChessPlayerID = 1, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1800, Record = "12-43-12"},
            new tblChessChampion {ID = 3, ChessPlayer = players[2], ChessPlayerID = 3, ConsecutiveYears = 12, Current = 0, LastTrophy = "None", MaxRating = 1650, Record = "12-43-12"},
            };

            var optionsBuilder = new DbContextOptionsBuilder<ChessDbContext>()
                .UseInMemoryDatabase(databaseName: "SecondTestDatabase")
                .Options;

            var mockContext = new ChessDbContext(optionsBuilder);
            var servicePlayers = new ChessPlayersController(mockContext);

            foreach (var player in players)
            {
                mockContext.tblChessPlayers.Add(player);
            }

            foreach (var champ in data)
            {
                mockContext.tblChessChampions.Add(champ);
            }

            await mockContext.SaveChangesAsync();



            var goodData = new List<dtoChessPlayerTrophies> {
                new dtoChessPlayerTrophies {Id = 1, Name = "Banzeus", Trophies = 2 },
                new dtoChessPlayerTrophies {Id = 3, Name = "Banzeus", Trophies = 1 }
               
            };

            // Act
            var pagedResult = await servicePlayers.GetPlayerTrophies();
            if (pagedResult.Value != null)
            {
                var result = pagedResult.Value.Data;

                // Assert
                if (result != null)
                {
                    var dtoChessPlayerTrophiesEnumerable = result as dtoChessPlayerTrophies[] ?? result.ToArray();
                    Assert.AreEqual(goodData.Count(), dtoChessPlayerTrophiesEnumerable.Count());
                    Assert.AreEqual(goodData[0].Id, dtoChessPlayerTrophiesEnumerable.ToList()[0].Id);
                    Assert.AreEqual(goodData[1].Id, dtoChessPlayerTrophiesEnumerable.ToList()[1].Id);
                    Assert.IsTrue(goodData[1].Trophies == dtoChessPlayerTrophiesEnumerable.ToList()[1].Trophies &&
                                  goodData[1].Name == dtoChessPlayerTrophiesEnumerable.ToList()[1].Name);
                }
            }
        }
    }
}