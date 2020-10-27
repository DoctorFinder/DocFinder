using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Domain.ServiceResponse;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using Microsoft.Extensions.Logging;
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
        private IDoctorAddressesApplicationService _doctorAddressesApplicationService { get; set; }
        private IPasswordHasherApplicationService _passwordHasherApplicationService { get; set; }
        private ILogger<DoctorApplicationService> _logger { get; set; }

        public DoctorApplicationService(IDoctorService doctorService, IDoctorLanguageApplicationService doctorLanguageApplicationService, IDoctorSpecialityApplicationService doctorSpecialityApplicationService , IDoctorAddressesApplicationService doctorAddressesApplicationService, IPasswordHasherApplicationService passwordHasherApplicationService, ILogger<DoctorApplicationService> logger)
        { 
            this._doctorService = doctorService;
            this._doctorLanguageApplicationService = doctorLanguageApplicationService;
            this._doctorSpecialityApplicationService = doctorSpecialityApplicationService;
            this._doctorAddressesApplicationService = doctorAddressesApplicationService;
            this._passwordHasherApplicationService = passwordHasherApplicationService;
            this._logger = logger;
        }

       public  DoctorForCreationDTO GetDoctorByEmail(string email)
        {
            var doctor =  this._doctorService.GetDoctorByEmail(email);
            var doctorDTO =  Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
            return doctorDTO;
        }

        //public  DoctorForCreationDTO  GetDoctorByEmailandMobileNumber(string email, string mobileNumber)
        //{
        //    var doctor = this._doctorService.GetDoctorByEmailandMobileNumber(email, mobileNumber);
        //    if (doctor is null)
        //    {
        //        return null;
        //    }
        //    var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
        //    return doctorDTO;
        //}

        //public  DoctorForCreationDTO  GetDoctorByMobileNumber(string mobileNumber)
        //{
        //    var doctor = this._doctorService.GetDoctorByMobileNumber(mobileNumber);
        //    var doctorDTO = Mapping.Mapper.Map<DoctorForCreationDTO>(doctor);
        //    return doctorDTO;
        //}

        public DoctorToReturnResponse RegisterDoctor(DoctorForCreationDTO doctorDTO)
        {
            try
            {
                var doctorToResponse = new DoctorToReturnResponse();

                var existngDoctor = GetDoctorByEmail(doctorDTO.Email);

                if (existngDoctor is null)
                {
                    var doctor = Mapping.Mapper.Map<Doctor>(doctorDTO);
                    doctor.Password = this._passwordHasherApplicationService.Hash(doctor.Password);
                    var doctorLanguages = Mapping.Mapper.Map<IEnumerable<DoctorLanguages>>(doctorDTO.Languages);
                    var doctorSpecialities = Mapping.Mapper.Map<IEnumerable<DoctorSpecialities>>(doctorDTO.Specialities);
                    var doctorAddresses = Mapping.Mapper.Map<IEnumerable<DoctorAddresses>>(doctorDTO.Addresses);
                    int doctorId = this._doctorService.RegisterDoctor(doctor);

                    if (doctorId > 0)
                    {
                        this._doctorSpecialityApplicationService.AddDoctorSpecialities(doctorDTO.Specialities, doctorId);
                        this._doctorLanguageApplicationService.AddDoctorLanguages(doctorDTO.Languages, doctorId);
                        this._doctorAddressesApplicationService.AddDoctorAddresses(doctorDTO.Addresses, doctorId);
                        var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
                        var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctorId).ToList();
                        var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctorId).ToList();
                        var doctorAddressesToReturn = this._doctorAddressesApplicationService.GetDoctorAddresses(doctorId).ToList();
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
                    //else if (existngDoctor.PhoneNumber == existngDoctor.PhoneNumber)
                    //{
                    //    doctorToResponse.responseMessage = "Please select a different Phone Number. Phone Number already exists";
                    //    return doctorToResponse;
                    //}

                }
                return null;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                return null;
            }
        }

        public DoctorToReturnResponse GetDoctorDetails(DoctorForRetrieving doctor)
        {
            var doctorToResponse = new DoctorToReturnResponse();
            var doctorDetails = this._doctorService.GetDoctorByEmail(doctor.EmailAddress);

            if (doctorDetails is null || !IsPasswordMatched(doctorDetails.Password, doctor.Password))
            {
                doctorToResponse.responseMessage = "Please check Email and Password provided";
                return doctorToResponse;
            }
            else
            {
             var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctorDetails);
             var doctorLanguagesToReturn =  this._doctorLanguageApplicationService.GetDoctorLanguages(doctorDetails.Id).ToList();
             var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctorDetails.Id).ToList();
             var doctorAddressesToReturn = this._doctorAddressesApplicationService.GetDoctorAddresses(doctorDetails.Id).ToList();
             doctorToResponse.doctor = doctorToReturn;
             doctorToResponse.languages = doctorLanguagesToReturn;
             doctorToResponse.specialities = doctorSpecialitiesToReturn;
             doctorToResponse.addresses = doctorAddressesToReturn;
             return doctorToResponse;
            }      
        }


        public DoctorToReturnResponse UpdateDoctorPaid(string emailAddress)
        {
            var doctor = this._doctorService.GetDoctorByEmail(emailAddress);
            doctor.IsPaid = true;
            this._doctorService.UpdateDoctor(doctor);
            var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
            var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctor.Id).ToList();
            var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctor.Id).ToList();
            var doctorAddressesToReturn = this._doctorAddressesApplicationService.GetDoctorAddresses(doctor.Id).ToList();
            var doctorToResponse = new DoctorToReturnResponse();
            doctorToResponse.doctor = doctorToReturn;
            doctorToResponse.languages = doctorLanguagesToReturn;
            doctorToResponse.specialities = doctorSpecialitiesToReturn;
            doctorToResponse.addresses = doctorAddressesToReturn;
            return doctorToResponse;
        }

        public DoctorToReturnResponse UpdateDoctorActivated(string emailAddress)
        {
            var doctor = this._doctorService.GetDoctorByEmail(emailAddress);
            doctor.IsVerified = !doctor.IsVerified;
            this._doctorService.UpdateDoctor(doctor);
            var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
            var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctor.Id).ToList();
            var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctor.Id).ToList();
            var doctorAddressesToReturn = this._doctorAddressesApplicationService.GetDoctorAddresses(doctor.Id).ToList();
            var doctorToResponse = new DoctorToReturnResponse();
            doctorToResponse.doctor = doctorToReturn;
            doctorToResponse.languages = doctorLanguagesToReturn;
            doctorToResponse.specialities = doctorSpecialitiesToReturn;
            doctorToResponse.addresses = doctorAddressesToReturn;
            return doctorToResponse;
        }

        public List<DoctorToReturnResponse> GetDoctors()
        {
         var doctors = this._doctorService.GetDoctors();

            List<DoctorToReturnResponse> doctorsList = new List<DoctorToReturnResponse>();
            foreach (var doctor in doctors)
            {
                var doctorToReturn = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
                var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctor.Id).ToList();
                var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctor.Id).ToList();
                var doctorAddressesToReturn = this._doctorAddressesApplicationService.GetDoctorAddresses(doctor.Id).ToList();
                var doctorToResponse = new DoctorToReturnResponse();
                doctorToResponse.doctor = doctorToReturn;
                doctorToResponse.languages = doctorLanguagesToReturn;
                doctorToResponse.specialities = doctorSpecialitiesToReturn;
                doctorToResponse.addresses = doctorAddressesToReturn;
                doctorsList.Add(doctorToResponse);
            }
            return doctorsList;
        }


        private bool IsPasswordMatched(string hash, string password)
        {
            var result = this._passwordHasherApplicationService.Check(hash, password);
            return result.Verified;
        }
    }
}
