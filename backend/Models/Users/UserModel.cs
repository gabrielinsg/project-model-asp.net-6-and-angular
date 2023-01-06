using Backend.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models.Users
{
    public class UserModel
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public bool Active { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public User GetUser()
        {
            return new User
            {
                Id = Id,
                FirstName = FirstName,
                LastName = LastName,
                Username = Username,
                Role = Role,
                Active = Active,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(Password)
            };
        }
    }
}
