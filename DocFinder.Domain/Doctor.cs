using System;
using System.ComponentModel.DataAnnotations;

namespace DocFinder.Domain
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int PhoneNumber { get; set; }

        public string LicenseNumber { get; set; }

        public int  YearsOfExperience { get; set; }
    }
}
