using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Domain.ServiceResponse;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using Microsoft.Extensions.Logging;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;


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

        public void UpdateDoctorPassword(int doctorId, string updatedPassword)
        {
            var doctor = this._doctorService.GetDoctorById(doctorId);
            doctor.Password = updatedPassword;
            this._doctorService.UpdateDoctor(doctor);
            return; 
        }

        public List<DoctorToReturnResponse> GetNearestDoctorsBySpeciality(Double Latitude, Double Longitude,string speciality)
        {

            var doctors = GetDoctorsBySpecialityAndDistance(Latitude,Longitude, speciality);
            return doctors.ToList();
        }

        public IEnumerable<DoctorToReturnResponse> GetDoctorsBySpecialityAndDistance(Double Latitude, Double Longitude, string speciality)
        {
            var doctors = this._doctorService.GetDoctorsBySpeciality(speciality);
            List<DoctorToReturnResponse> doctorsList = new List<DoctorToReturnResponse>();
            List<DoctorAddressesToReturnDTO> doctorAddresses = new List<DoctorAddressesToReturnDTO>();
            foreach (var doctor in doctors) 
            {
                var doctorResponse = new DoctorToReturnResponse();
                var doctorAddress = this._doctorAddressesApplicationService.GetDoctorAddresses(doctor.Id).ToList();

                doctorResponse.doctor = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
                var addressList = new List<DoctorAddressesToReturnDTO>();
                foreach (var address in doctorAddress)
                {
                    address.distance = Math.Round(DistanceTo(address.Longitude, address.Latitude, Longitude, Latitude), 2).ToString();
                    addressList.Add(address);
                }

                if (addressList.Count > 0)
                {
                    var doctorLanguagesToReturn = this._doctorLanguageApplicationService.GetDoctorLanguages(doctor.Id).ToList();
                    var doctorSpecialitiesToReturn = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctor.Id).ToList();

                    doctorResponse.addresses = addressList;
                    doctorResponse.languages = doctorLanguagesToReturn;
                    doctorResponse.specialities = doctorSpecialitiesToReturn;
                    doctorsList.Add(doctorResponse);
                }
            }

            return doctorsList;
        }

        public List<NearByDoctorsResponse> GetNearByDoctorsForSpeciality(Double Latitude, Double Longitude, string speciality)
        {
            List<NearByDoctorsResponse> doctorsList = new List<NearByDoctorsResponse>();
            var doctorAddresses = this._doctorAddressesApplicationService.GetDoctorAddressesForSpeciality(speciality);

            foreach (var doctoraddress in doctorAddresses)
            {
             doctoraddress.distance = Math.Round(DistanceTo(doctoraddress.Longitude, doctoraddress.Latitude, Longitude, Latitude), 2).ToString();

             var nearestDoctor = new NearByDoctorsResponse();

             var doctor = this._doctorService.GetDoctorById(doctoraddress.DoctorId);
             var doctorLanguages =  this._doctorLanguageApplicationService.GetDoctorLanguages(doctoraddress.DoctorId);
             var doctorSpecialities = this._doctorSpecialityApplicationService.GetDoctorSpecialities(doctoraddress.DoctorId);

             nearestDoctor.addresses = doctoraddress;
             nearestDoctor.doctor = Mapping.Mapper.Map<DoctorToReturnDTO>(doctor);
             nearestDoctor.languages = Mapping.Mapper.Map<IEnumerable<DoctorLanguagesToReturnDTO>>(doctorLanguages).ToList();
             nearestDoctor.specialities = Mapping.Mapper.Map<IEnumerable<DoctorSpecialitiesToReturnDTO>>(doctorSpecialities).ToList();
             nearestDoctor.distance = Math.Round(DistanceTo(doctoraddress.Longitude, doctoraddress.Latitude, Longitude, Latitude), 2);
             doctorsList.Add(nearestDoctor);
            }

            return doctorsList.OrderBy(doc => doc.distance).ToList();
        }

        public double GetDistance(double longitude, double latitude, double otherLongitude, double otherLatitude)
        {
            var d1 = latitude * (Math.PI / 180.0);
            var num1 = longitude * (Math.PI / 180.0);
            var d2 = otherLatitude * (Math.PI / 180.0);
            var num2 = otherLongitude * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            return 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
        }

        public static double DistanceTo(double lat1, double lon1, double lat2, double lon2)
        {
            double rlat1 = Math.PI * lat1 / 180;
            double rlat2 = Math.PI * lat2 / 180;
            double theta = lon1 - lon2;
            double rtheta = Math.PI * theta / 180;
            double dist =
                Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                Math.Cos(rlat2) * Math.Cos(rtheta);
            dist = Math.Acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            return dist;
        }

        private bool IsPasswordMatched(string hash, string password)
        {
            var result = this._passwordHasherApplicationService.Check(hash, password);
            return result.Verified;
        }
    }
}
