using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IDoctorSpecialityService
    {
        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialities> doctorSpecialities);

        public IEnumerable<Specialities> GetDoctorSpecialities(int doctorId);
    }
}
