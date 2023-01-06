using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class User
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "Fist Name is required")]
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        public Role Role { get; set; }
        public bool Active { get; set; }

        [Required(ErrorMessage = "Password is required")]

        public string PasswordHash { get; set; }
    }
}
