using Microsoft.Extensions.Options;
using Backend.Authorization;
using Backend.Data;
using Backend.Entities;
using Backend.Helpers;
using Backend.Models.Users;
using BCrypt.Net;
using System.Net;

namespace Backend.Services;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<AuthenticateResponse> GetAll();
    User GetById(int id);
    AuthenticateResponse Save(User user);
}

public class UserService : IUserService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly AppSettings _appSettings;

    public UserService(
        DataContext context,
        IJwtUtils jwtUtils,
        IOptions<AppSettings> appSettings)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _appSettings = appSettings.Value;
    }


    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);
        // validate
        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            throw new UnauthorizedException("Username or password is incorrect");
        if (!user.Active) throw new ForbiddenException("Inactive User");

        // authentication successful so generate jwt token
        var jwtToken = _jwtUtils.GenerateJwtToken(user);

        return new AuthenticateResponse(user, jwtToken);
    }

    public IEnumerable<AuthenticateResponse> GetAll()
    {
        return _context.Users.Select(x => new AuthenticateResponse(x, "")).ToList();
    }

    public User GetById(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

    public AuthenticateResponse Save(User user)
    {
        if (user.Id == null)
        {
            if (_context.Users.FirstOrDefault(u => u.Username == user.Username) != null) throw new Exception("User already exists");
            _context.Users.AddRange(user);
        }
        else
        {
            user.PasswordHash = user.PasswordHash != null ? user.PasswordHash : _context.Users.Find(user.Id).PasswordHash;
            _context.Users.UpdateRange(user);
        }
        _context.SaveChanges();
        return new AuthenticateResponse(user, "");
    }
}
