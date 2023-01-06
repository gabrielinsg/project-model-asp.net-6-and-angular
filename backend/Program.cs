using Microsoft.EntityFrameworkCore;
using Backend.Authorization;
using Backend.Data;
using Backend.Entities;
using Backend.Helpers;
using Backend.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// add services to DI container
{
    var services = builder.Services;
    var env = builder.Environment;

    var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
    builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<DataContext>(options =>
    {
        options.UseNpgsql(connectionString);
    });
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

    // configure strongly typed settings object
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    // configure DI for application services
    services.AddScoped<IJwtUtils, JwtUtils>();
    services.AddScoped<IUserService, UserService>();
}


var app = builder.Build();

// configure HTTP request pipeline
{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();
}

// create hardcoded test users in db on startup
{
    var testUsers = new List<User>
    {
        new User { Id = 1, FirstName = "Admin", LastName = "Admin", Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"), Active = true, Role = Role.ADMINISTRATOR },
    };

    using var scope = app.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dataContext.Users.AddRange(testUsers);
    if (dataContext.Users.ToList().Count == 0) dataContext.SaveChanges();
}

app.Run();
