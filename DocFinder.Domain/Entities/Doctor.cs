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

        [Required]
        [MaxLength(30)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }


        [Required]
        public string Email { get; set; }

        [Required]
        [MaxLength(20)]
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


        [Required]
        [MaxLength(30)]
        public string Hospitals { get; set; }

        [Required]
        [MaxLength(30)]
        public string License { get; set; }

        [Required]
        [MaxLength(50)]
        public string Address1 { get; set; }

        [Required]
        [MaxLength(50)]
        public string Address2 { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string State { get; set; }

        [Required]
        [MaxLength(5)]
        public string Zipcode { get; set; }


        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }

    }
}
