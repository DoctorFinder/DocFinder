using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorSpecialityService
    {
        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialities> doctorSpecialities);
    }
}
