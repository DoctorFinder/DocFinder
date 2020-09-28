using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class DoctorSpecialityApplicationService : IDoctorSpecialityApplicationService
    {
        private IDoctorSpecialityService _doctorSpecialityService { get; set; }
        public DoctorSpecialityApplicationService(IDoctorSpecialityService doctorSpecialityService)
        {
            this._doctorSpecialityService = doctorSpecialityService;
        }
        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialitiesForCreation> doctorSpecialitiesDTO, int doctorId)
        {
            var doctorSpecialities = Mapping.Mapper.Map<IEnumerable<DoctorSpecialities>>(doctorSpecialitiesDTO);
            doctorSpecialities = doctorSpecialities.Select(docspl => { docspl.DoctorId = doctorId; return docspl; }).ToList();
            this._doctorSpecialityService.AddDoctorSpecialities(doctorSpecialities);            
        }

        public IEnumerable<DoctorSpecialitiesToReturnDTO> GetDoctorSpecialities(int doctorId)
        {
            var doctorSpecialities = this._doctorSpecialityService.GetDoctorSpecialities(doctorId);
            var doctorSpecialitiesToReturn = Mapping.Mapper.Map<IEnumerable<DoctorSpecialitiesToReturnDTO>>(doctorSpecialities);
            return doctorSpecialitiesToReturn;
        }
    }
}
