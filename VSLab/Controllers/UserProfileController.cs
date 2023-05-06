using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;
using VSLab.Data.Security;

namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly ChessDbContext _context;
        public UserProfileController(ChessDbContext context)
        {
            _context = context;
        }

        private static dtoUserProfile UserProfileToDTO(tblUserProfile user) =>
            new dtoUserProfile
            {
                ID = user.ID,
                Email = user.Email,
                Password = user.Password,
                UserName = user.UserName,
                Bio = user.Bio,
                BirthDate = user.BirthDate,
                PhoneNumber = user.PhoneNumber
            };

        private bool UserProfileExists(long id)
        {
            return (_context.tblUserProfiles.Any(e => e.ID == id));
        }
        public class PagedResult<T>
        {
            public IEnumerable<T>? Data { get; set; }
            public int TotalPages { get; set; }
        }

        // GET: api/UserProfiles
        [HttpGet]
        public async Task<ActionResult<PagedResult<dtoUserProfile>>> GettblUserProfiles([FromQuery] int page, [FromQuery] int limit = 5)
        {
            var totalItems = await _context.tblUserProfiles.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var users = await _context.tblUserProfiles
               .Select(x => UserProfileToDTO(x))
               .Skip((page - 1) * limit)
               .Take(limit)
               .ToListAsync();

            var result = new PagedResult<dtoUserProfile>
            {
                Data = users,
                TotalPages = totalPages
            };

            return result;
        }

        // GET: api/UserProfiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<tblUserProfile>> GettblUserProfilesID(int id)
        {
            var user = await _context.tblUserProfiles
                .Include(x => x.ChessPlayers)
                .Include(x => x.ChessTournaments)
                .FirstOrDefaultAsync(x => x.ID == id);

            if(user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/UserProfiles/5
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttblUserProfile(int id, dtoUserProfile dtoUserProfile)
        {
            var user = await _context.tblUserProfiles.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            user.Email = dtoUserProfile.Email;
            user.UserName = dtoUserProfile.UserName;
            user.Password = dtoUserProfile.Password;
            user.Bio = dtoUserProfile.Bio;
            user.BirthDate = dtoUserProfile.BirthDate;
            user.PhoneNumber = dtoUserProfile.PhoneNumber;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException) when (!UserProfileExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/userProfile
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<dtoUserProfile>> PosttblUserProfile(dtoUserProfile dtoUserProfile)
        {
            var user = new tblUserProfile
            {
                Email = dtoUserProfile.Email,
                UserName = dtoUserProfile.UserName,
                Password = dtoUserProfile.Password,
                Bio = dtoUserProfile.Bio,
                BirthDate = dtoUserProfile.BirthDate,
                PhoneNumber = dtoUserProfile.PhoneNumber
            };

            _context.tblUserProfiles.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GettblUserProfilesID), new { id = user.ID }, UserProfileToDTO(user));
        }

        // DELETE: api/UserProfile/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletetblUserProfile(int id)
        {
            var user = await _context.tblUserProfiles.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            _context.tblUserProfiles.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}
