using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.ServiceResponse
{
    public class NearByDoctorsResponse
    {
        public DoctorToReturnDTO doctor { get; set; }

        public List<DoctorLanguagesToReturnDTO> languages { get; set; }

        public List<DoctorSpecialitiesToReturnDTO> specialities { get; set; }

        public DoctorAddressesToReturnDTO addresses { get; set; }

        public Double distance { get; set; }
        public string responseMessage { get; set; }
    }
}
