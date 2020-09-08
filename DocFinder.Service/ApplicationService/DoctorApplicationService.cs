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
    public class DoctorApplicationService : IDoctorApplicationService
    {
        private IDoctorService _doctorService { get; set; } 

        private IDoctorLanguageApplicationService _doctorLanguageApplicationService { get; set; }

        private IDoctorSpecialityApplicationService _doctorSpecialityApplicationService { get; set; }
        public DoctorApplicationService(IDoctorService doctorService, IDoctorLanguageApplicationService doctorLanguageApplicationService, IDoctorSpecialityApplicationService doctorSpecialityApplicationService)
        { 
            this._doctorService = doctorService;
            this._doctorLanguageApplicationService = doctorLanguageApplicationService;
            this._doctorSpecialityApplicationService = doctorSpecialityApplicationService;
        }

       public  DoctorForCreationDTO GetDoctorByEmail(string email)
        {
            var doctor =  this._doctorService.GetDoctorByEmail(email);
            var doctorDTO =  Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        public  DoctorForCreationDTO  GetDoctorByEmailandMobileNumber(string email, string mobileNumber)
        {
            var doctor = this._doctorService.GetDoctorByEmailandMobileNumber(email, mobileNumber);
            var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        public  DoctorForCreationDTO  GetDoctorByMobileNumber(string mobileNumber)
        {
            var doctor = this._doctorService.GetDoctorByMobileNumber(mobileNumber);
            var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        public int  RegisterDoctor(DoctorForCreationDTO doctorDTO)
        {
            var doctor = Mapping.Mapper.Map<Doctor>(doctorDTO);
            var doctorLanguages = Mapping.Mapper.Map<IEnumerable<DoctorLanguages>>(doctorDTO.Languages);
            var doctorSpecialities = Mapping.Mapper.Map<IEnumerable<DoctorSpecialities>>(doctorDTO.Specialities);
            int doctorId = this._doctorService.RegisterDoctor(doctor);
            if (doctorId > 0)
            {
                this._doctorSpecialityApplicationService.AddDoctorSpecialities(doctorDTO.Specialities,doctorId);
                this._doctorLanguageApplicationService.AddDoctorLanguages(doctorDTO.Languages, doctorId);           
            }
            return 1;
        }
    }
}
