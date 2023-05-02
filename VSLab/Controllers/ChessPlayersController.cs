using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mysqlx.Crud;
using System;
using VSLab.Data;
using VSLab.Data.Non_Essential;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChessPlayersController : ControllerBase
    {
        private readonly ChessDbContext _context;
        private readonly Validators _validator = new Validators();

        public ChessPlayersController(ChessDbContext context)
        {
            _context = context;
        }

        private static dtoChessPlayer ChessPlayerToDTO(tblChessPlayer player) =>
            new dtoChessPlayer
            {
                ID = player.ID,
                Name = player.Name,
                Country = player.Country,
                Rating = player.Rating,
                IsMaster = player.IsMaster,
                StartYear = player.StartYear,
                Description = player.Description
            };

        private static dtoChessParticipation ChessParticipationToDTO(tblChessParticipation participation) =>
            new dtoChessParticipation
            {
                ChessPlayerID = participation.ChessPlayerID,
                ChessTournamentID = participation.ChessTournamentID,
                DateSigned = participation.DateSigned,
                DurationPlayed = participation.DurationPlayed
            };

        private bool ChessPlayerExists(long id)
        {
            return (_context.tblChessPlayers?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private bool ChessParticipationExists(long playerid, long tournamentid)
        {
            return (_context.tblChessParticipations?.Any(e => e.ChessPlayerID == playerid && e.ChessTournamentID == tournamentid)).GetValueOrDefault();
        }

        public class PagedResult<T>
        {
            public IEnumerable<T>? Data { get; set; }
            public int TotalPages { get; set; }
        }

        // GET: api/ChessPlayers
        [HttpGet]
        public async Task<ActionResult<PagedResult<dtoChessPlayer>>> GettblChessPlayers([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            if (_context.tblChessPlayers == null)
            {
                return NotFound();
            }

            var totalItems = await _context.tblChessPlayers.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var players = await _context.tblChessPlayers
                .Select(x => ChessPlayerToDTO(x))
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var result = new PagedResult<dtoChessPlayer>
            {
                Data = players,
                TotalPages = totalPages
            };

            return result;
        }

        // GET: api/ChessPlayers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<tblChessPlayer>> GettblChessPlayerID(int id)
        {
            if (_context.tblChessChampions == null)
            {
                return NotFound();
            }

            var player = await _context.tblChessPlayers
                .Include(x => x.PlayerParticipations)
                .Include(x => x.ChessChampions)
                .Include(x => x.ChessTournaments)
                .FirstOrDefaultAsync(x => x.ID == id);

            if (player == null) 
            {
                return NotFound();
            }

            return Ok(player);
        }

        // PUT: api/ChessPlayers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttblChessPlayer(int id, dtoChessPlayer dtoChessPlayer)
        {
            if(id != dtoChessPlayer.ID)
            {
                return BadRequest();
            }

            var playerToUpdate = await _context.tblChessPlayers.FindAsync(id);

            if(playerToUpdate == null)
            {
                return NotFound();
            }

            playerToUpdate.Name = dtoChessPlayer.Name;
            playerToUpdate.Country = dtoChessPlayer.Country;
            playerToUpdate.Rating = dtoChessPlayer.Rating;
            playerToUpdate.IsMaster = dtoChessPlayer.IsMaster;
            playerToUpdate.StartYear = dtoChessPlayer.StartYear;
            playerToUpdate.Description = dtoChessPlayer.Description;

            if (!_validator.ValidatePlayer(playerToUpdate))
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException) when (!ChessPlayerExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/ChessPlayers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<tblChessPlayer>> PosttblChessPlayer(dtoChessPlayer dtoChessPlayer)
        {
            var player = new tblChessPlayer
            {
                Name = dtoChessPlayer.Name,
                Country = dtoChessPlayer.Country,
                Rating = dtoChessPlayer.Rating,
                IsMaster = dtoChessPlayer.IsMaster,
                StartYear = dtoChessPlayer.StartYear,
                Description = dtoChessPlayer.Description
            };

            if (!_validator.ValidatePlayer(player))
            {
                return BadRequest();
            }

            _context.tblChessPlayers.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GettblChessPlayerID), new { id = player.ID }, ChessPlayerToDTO(player));

        }

        // DELETE: api/ChessPlayers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletetblChessPlayer(int id)
        {
            if(_context.tblChessPlayers == null)
            {
                return NotFound();
            }

            var player = await _context.tblChessPlayers.FindAsync(id);
            if(player == null)
            {
                return NotFound();
            }

            _context.tblChessPlayers.Remove(player);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Trophies")]
        public async Task<ActionResult<PagedResult<dtoChessPlayerTrophies>>> GetPlayerTrophies([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var query = _context.tblChessChampions
                .Include(a => a.ChessPlayer)
                .GroupBy(a => a.ChessPlayer.ID)
                .Select(g => new dtoChessPlayerTrophies
                {
                    Id = g.Key,
                    Name = g.First().ChessPlayer.Name,
                    Trophies = g.Count(),
                })
                .OrderByDescending(x => x.Trophies);

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var pagedQuery = query
                .Skip((page - 1) * limit)
                .Take(limit);

            var result = new PagedResult<dtoChessPlayerTrophies>
            {
                Data = await pagedQuery.ToListAsync(),
                TotalPages = totalPages
            };

            return result;
        }

        

        [HttpGet("Ratings")]
        public async Task<ActionResult<PagedResult<dtoChessPlayerRatings>>> GetPlayerRatings([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var query = _context.tblChessChampions
                .Include(a => a.ChessPlayer)
                .GroupBy(a => a.ChessPlayer.ID)
                .Select(g => new dtoChessPlayerRatings
                {
                    Id = g.Key,
                    Name = g.First().ChessPlayer.Name,
                    Rating = g.Max(x => x.MaxRating),
                })
                .OrderByDescending(x => x.Rating);

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var pagedQuery = query
                .Skip((page - 1) * limit)
                .Take(limit);

            var result = new PagedResult<dtoChessPlayerRatings>
            {
                Data = await pagedQuery.ToListAsync(),
                TotalPages = totalPages
            };

            return result;
        }


        [HttpGet("participations")]
        public async Task<ActionResult<PagedResult<dtoChessParticipation>>> GettblChessParticipations([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            if (_context.tblChessParticipations == null)
            {
                return NotFound();
            }

            var totalItems = await _context.tblChessParticipations.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var participations = await _context.tblChessParticipations
                .Select(x => ChessParticipationToDTO(x))
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var result = new PagedResult<dtoChessParticipation>
            {
                Data = participations,
                TotalPages = totalPages
            };

            return result;

        }

        [HttpPost("{ChessTournamentID}/participation/{ChessPlayerID}")]
        public async Task<ActionResult<dtoChessParticipation>> PosttblChessParticipation(int ChessTournamentID, int ChessPlayerID, dtoChessParticipation dtoChessParticipation)
        {
            if(_context.tblChessPlayers == null)
            {
                return Problem("Entity set 'tblChessPlayers' is null.");
            }
            if (_context.tblChessTournaments == null)
            {
                return Problem("Entity set 'tblChessTournaments' is null.");
            }

            var player = await _context.tblChessPlayers.FindAsync(ChessPlayerID);
            var tournament = await _context.tblChessTournaments.FindAsync(ChessTournamentID);

            if (player == null)
            {
                return NotFound();
            }

            if (tournament == null)
            {
                return NotFound();
            }

            var participation = new tblChessParticipation
            {
                ChessPlayer = player,
                ChessTournament = tournament,
                DateSigned = dtoChessParticipation.DateSigned,
                DurationPlayed = dtoChessParticipation.DurationPlayed,
                Description = dtoChessParticipation.Description
            };


            _context.tblChessParticipations.Add(participation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PosttblChessParticipation), dtoChessParticipation);
        }

        [HttpPut("{ChessTournamentID}/participation/{ChessPlayerID}")]
        public async Task<IActionResult> PutttblChessParticipation(int ChessTournamentID, int ChessPlayerID, dtoChessParticipation dtoChessParticipation)
        {
            if (ChessTournamentID != dtoChessParticipation.ChessTournamentID)
            {
                return BadRequest();
            }

            if (ChessPlayerID != dtoChessParticipation.ChessPlayerID)
            {
                return BadRequest();
            }

            var participationToUpdate = await _context.tblChessParticipations.FindAsync(ChessTournamentID, ChessPlayerID);

            if (participationToUpdate == null)
            {
                return NotFound();
            }

            participationToUpdate.DateSigned = dtoChessParticipation.DateSigned;
            participationToUpdate.DurationPlayed = dtoChessParticipation.DurationPlayed;
            participationToUpdate.Description = dtoChessParticipation.Description;  

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ChessParticipationExists(ChessPlayerID, ChessTournamentID))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{ChessTournamentID}/participation/{ChessPlayerID}")]
        public async Task<IActionResult> DeletetblChessParticipation(int ChessTournamentID, int ChessPlayerID)
        {
            if (_context.tblChessParticipations == null)
            {
                return NotFound();
            }

            var participation = await _context.tblChessParticipations.FindAsync(ChessTournamentID, ChessPlayerID);
            if (participation == null)
            {
                return NotFound();
            }

            _context.tblChessParticipations.Remove(participation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        

    }
}
