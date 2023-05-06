using Microsoft.EntityFrameworkCore;
using VSLab.Data;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("SDIChess")));
builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("Test")));
// builder.Services.AddDbContext<ChessDbContext>(opt => opt.UseInMemoryDatabase("Test"));

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
