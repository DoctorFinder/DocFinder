using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.ServiceResponse
{
    public  class DoctorToReturnResponse
    {
        public DoctorToReturnDTO doctor { get; set; }

        public List<LanguageDTO> languages { get; set; }

        public List<SpecialitiesDTO> specialities { get; set; }

        public string responseMessage { get; set; }
    }
}
