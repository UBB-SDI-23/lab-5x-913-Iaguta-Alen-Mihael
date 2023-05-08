using System.Text;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("Jwt:Token").Value!))
    };
});

builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("SDIChess")));
builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("Test")));
// builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseInMemoryDatabase("Test"));

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
