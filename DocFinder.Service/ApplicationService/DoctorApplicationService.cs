using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Domain.ServiceResponse;
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
            if (doctor is null)
            {
                return null;
            }
            var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        public  DoctorForCreationDTO  GetDoctorByMobileNumber(string mobileNumber)
        {
            var doctor = this._doctorService.GetDoctorByMobileNumber(mobileNumber);
            var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        public DoctorToReturnResponse RegisterDoctor(DoctorForCreationDTO doctorDTO)
        {
            var doctorToResponse = new DoctorToReturnResponse();

             var existngDoctor = GetDoctorByEmailandMobileNumber(doctorDTO.Email, doctorDTO.PhoneNumber);

            if (existngDoctor is null)
            {
                var doctor = Mapping.Mapper.Map<Doctor>(doctorDTO);
                var doctorLanguages = Mapping.Mapper.Map<IEnumerable<DoctorLanguages>>(doctorDTO.Languages);
                var doctorSpecialities = Mapping.Mapper.Map<IEnumerable<DoctorSpecialities>>(doctorDTO.Specialities);
                int doctorId = this._doctorService.RegisterDoctor(doctor);
                
                if (doctorId > 0)
                {
                    this._doctorSpecialityApplicationService.AddDoctorSpecialities(doctorDTO.Specialities, doctorId);
                    this._doctorLanguageApplicationService.AddDoctorLanguages(doctorDTO.Languages, doctorId);
                    var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
                    var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctorId).ToList();
                    var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctorId).ToList();
                    doctorToResponse.doctor = doctorToReturn;
                    doctorToResponse.languages = doctorLanguagesToReturn;
                    doctorToResponse.specialities = doctorSpecialitiesToReturn;
                    return doctorToResponse;
                }
               
            }
            else
            {
                if (existngDoctor.Email == doctorDTO.Email)
                {
                    doctorToResponse.responseMessage = "Please select a different email address. Email already exists";
                    return doctorToResponse;
                }
                else if (existngDoctor.PhoneNumber == existngDoctor.PhoneNumber)
                {
                    doctorToResponse.responseMessage = "Please select a different Phone Number. Phone Number already exists";
                    return doctorToResponse;
                }
            
            }
            return null;

        }

        public DoctorToReturnResponse GetDoctorDetails(DoctorForRetrieving doctor)
        {
            var doctorToResponse = new DoctorToReturnResponse();
            var doctorDetails = this._doctorService.GetDoctorByEmail(doctor.EmailAddress);

            if (doctorDetails is null || doctorDetails.Password != doctor.Password)
            {
                doctorToResponse.responseMessage = "Please check Email and Password provided";
                return doctorToResponse;
            }
            else
            {
             var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctorDetails);
             var doctorLanguagesToReturn =  this._doctorLanguageApplicationService.GetDoctorLanguages(doctorDetails.Id).ToList();
             var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctorDetails.Id).ToList();
             doctorToResponse.doctor = doctorToReturn;
                doctorToResponse.languages = doctorLanguagesToReturn;
                doctorToResponse.specialities = doctorSpecialitiesToReturn;
                return doctorToResponse;
            }      

        }
    }
}
