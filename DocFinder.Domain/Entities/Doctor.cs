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

        [Required]
        public bool LicenseDisclosure { get; set; }

        [MaxLength(30)]
        public string EducationState { get; set; }

        [MaxLength(30)]
        public string EducationCity { get; set; }

        [MaxLength(30)]
        public string EducationCountry { get; set; }

        [Required]
        public DateTime YearOfGraduation  { get;set;}

        [MaxLength(30)]
        public string FellowshipFrom { get; set; }

        [MaxLength(30)]
        public string FellowshipCity { get; set; }
        
        [MaxLength(30)]
        public string FellowshipCountry { get; set; }
        
        [MaxLength(30)]
        public string FellowshipState { get; set; }

        [MaxLength(30)]
        public string ResidencyFrom { get; set; }

        [MaxLength(30)]
        public string ResidencyCity { get; set; }

        [MaxLength(30)]
        public string ResidencyCountry { get; set; }

        [MaxLength(30)]
        public string ResidencyState { get; set; }

        public byte[] UserImage { get; set; }

        public bool IsPaid { get; set; }

        public bool IsVerified { get; set; }

    }
}
