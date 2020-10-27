using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.DTO
{
    public class DoctorAddressesForCreation
    {
        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zipcode { get; set; }

        public string PhoneNumber { get; set; }

        public string WebAddress { get; set; }

        public Decimal? Latitude { get; set; }

        public Decimal? Longitude { get;set;}

        public HospitalTimingsForCreationDTO HospitalTimings { get; set; }

        public bool IsPaid { get; set; }

        public bool IsVerified { get; set; }
    }
}
