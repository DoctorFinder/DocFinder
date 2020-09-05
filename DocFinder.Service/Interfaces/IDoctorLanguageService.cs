using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorLanguageService
    {
        public void AddDoctorLanguages(IEnumerable<DoctorLanguages> doctorLanguages);
    }
}
