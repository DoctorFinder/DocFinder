using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.DTO
{
    public class DoctorToReturnDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Education { get; set; }

        public int YearsInPractice { get; set; }

        public string Degree { get; set; }

        public string License { get; set; }

        public string NpiNumber { get; set; }

        public bool NpiDisclosure { get; set; }

        public bool LicenseDisclosure { get; set; }

        public string EducationState { get; set; }

        public string EducationCity { get; set; }

        public string EducationCountry { get; set; }

        public DateTime YearOfGraduation { get; set; }

        public string ClinicalInterests { get; set; }

        public string ResearchInterests { get; set; }

        public string FellowshipFrom { get; set; }

        public string FellowshipCity { get; set; }
        
        public string FellowshipCountry { get; set; }

        public string FellowshipState { get; set; }

        public string ResidencyFrom { get; set; }

        public string ResidencyCity { get; set; }

        public string ResidencyCountry { get; set; }

        public string ResidencyState { get; set; }

        public byte[] UserImage { get; set; }

        public bool IsPaid { get; set; }

        public bool IsVerified { get; set; }

    }
}
