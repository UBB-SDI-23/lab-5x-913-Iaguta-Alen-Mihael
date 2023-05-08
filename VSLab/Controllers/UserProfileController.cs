using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using VSLab.Data;
using VSLab.Data.Security;


namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfilesController : ControllerBase
    {
        private readonly ChessDbContext _context;
        private IConfiguration _config;

        public UserProfilesController(ChessDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] dtoUserProfile model)
        {
            if (_context.tblUserProfiles.Any(x => x.Email == model.Email))
            {
                return BadRequest("Email already exists");
            }

            var user = new tblUserProfile
            {
                Email = model.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                UserName = model.UserName,
                Bio = model.Bio,
                BirthDate = model.BirthDate,
                PhoneNumber = model.PhoneNumber
            };

            _context.tblUserProfiles.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully!" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public Task<IActionResult> Login([FromBody] dtoUserProfile model)
        {
            var user = _context.tblUserProfiles.FirstOrDefault(u => u.Email == model.Email);

            if (user == null)
            {
                return Task.FromResult<IActionResult>(Unauthorized("Invalid email or password"));
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return Task.FromResult<IActionResult>(Unauthorized("Invalid email or password"));
            }

            var tokenString = GenerateJwtToken(user);

            return Task.FromResult<IActionResult>(Ok(new { token = tokenString }));
        }

        private string GenerateJwtToken(tblUserProfile user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("LOOOL"));
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    claims, 
                    authenticationType: JwtBearerDefaults.AuthenticationScheme),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
