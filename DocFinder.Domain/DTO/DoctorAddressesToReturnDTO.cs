using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.DTO
{
    public class DoctorAddressesToReturnDTO
    {
        public int Id { get; set; }

        public int DoctorId { get; set; }
        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zipcode { get; set; }

        public string PhoneNumber { get; set; }

        public Double Latitude { get; set; }

        public Double Longitude { get; set; }

        public string distance { get; set; }
    }
}
