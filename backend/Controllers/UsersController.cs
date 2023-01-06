

using Microsoft.AspNetCore.Mvc;
using Backend.Authorization;
using Backend.Entities;
using Backend.Models.Users;
using Backend.Services;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }

        [Authorize(Role.ADMINISTRATOR)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [Authorize(Role.ADMINISTRATOR)]
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(new AuthenticateResponse(user, ""));
        }

        [Authorize(Role.ADMINISTRATOR)]
        [HttpPost]
        public IActionResult Save(User user)
        {
            if (ModelState.IsValid)
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
                return Ok(_userService.Save(user));
            }

            return BadRequest(user);
        }

        [HttpGet]
        public IActionResult getRoles()
        {
            return Ok(Enum.GetValues(typeof(Role))
                .Cast<Role>()
                .Select(r => r.ToString()).ToList());
        }
    }
}
