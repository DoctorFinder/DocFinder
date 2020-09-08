using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IDoctorLanguageService
    {
        public void AddDoctorLanguages(IEnumerable<DoctorLanguages> doctorLanguages);
    }
}
