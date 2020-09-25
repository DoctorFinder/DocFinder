﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DocFinder.Domain.DTO
{
   public class DoctorForCreationDTO
    {
    
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

        public ICollection<DoctorLanguagesForCreation> Languages { get; set; }

        public ICollection<DoctorSpecialitiesForCreation> Specialities { get; set; }


        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zipcode { get; set; }

        public string PhoneNumber { get; set; }
    }
}
