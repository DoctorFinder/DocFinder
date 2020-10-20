using System;
using System.ComponentModel.DataAnnotations;

namespace DocFinder.Domain
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; }

        [MaxLength(30)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [MaxLength(20)]
        public string Gender { get; set; }


        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [MaxLength(30)]
        public string Education { get; set; }

        [Required]
        [MaxLength(30)]
        public int YearsInPractice { get; set; }

        [Required]
        [MaxLength(30)]
        public string Degree { get; set; }


        [MaxLength(30)]
        public string License { get; set; }

        [MaxLength(30)]
        public string NpiNumber { get; set; }

        [Required]
        public bool NpiDisclosure { get; set; }

        public byte[] UserImage { get; set; }

    }
}
