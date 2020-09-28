using System;
using System.Collections.Generic;
using System.Text;
using DocFinder.Domain.DTO;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorSpecialityApplicationService
    {
        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialitiesForCreation> doctorSpecialitiesDTO,int doctorId);

        public IEnumerable<DoctorSpecialitiesToReturnDTO> GetDoctorSpecialities(int doctorId);

    }
}
