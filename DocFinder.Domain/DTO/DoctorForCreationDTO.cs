using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DocFinder.Domain.DTO
{
   public class DoctorForCreationDTO
    {
        public int id { get; set; }
        public string FirstName { get; set; }
      
        public string MiddleName { get; set; }
      
        public string LastName { get; set; }
      
        public DateTime DateOfBirth { get; set; }
     
        public string Gender { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Education { get; set; }

        public string YearsInPractice { get; set; }

        public string Degree { get; set; }

        public string License { get; set; }

        public string NpiNumber { get; set; }

        public bool NpiDisclosure { get; set; }

        public bool LicenseDisclosure { get; set; }

        public string EducationState { get; set; }

        public string EducationCity { get; set; }

        public string EducationCountry { get; set; }

        public DateTime YearOfGraduation { get; set; }

        public string FellowhipFrom { get; set; }

        public string FellowhipCity { get; set; }

        public string FellowhipCountry { get; set; }

        public string FellowhipState { get; set; }

        public string ResidencyFrom { get; set; }

        public string ResidencyCity { get; set; }

        public string ResidencyCountry { get; set; }

        public string ResidencyState { get; set; }

        public ICollection<DoctorLanguagesForCreation> Languages { get; set; }

        public ICollection<DoctorSpecialitiesForCreation> Specialities { get; set; }

        public ICollection<DoctorAddressesForCreation> Addresses { get; set; }

        public byte[] UserImage { get; set; }
    }
}
