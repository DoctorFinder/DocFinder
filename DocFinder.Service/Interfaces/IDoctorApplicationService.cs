using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using DocFinder.Domain.DTO;
using DocFinder.Domain.ServiceResponse;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorApplicationService
    {
        public DoctorToReturnResponse RegisterDoctor(DoctorForCreationDTO doctorDTO);

        //public DoctorForCreationDTO GetDoctorByEmailandMobileNumber(string email, string mobileNumber);

        public DoctorForCreationDTO GetDoctorByEmail(string email);

        //public DoctorForCreationDTO GetDoctorByMobileNumber(string mobileNumber);

        public DoctorToReturnResponse GetDoctorDetails(DoctorForRetrieving doctor);

        public DoctorToReturnResponse UpdateDoctorPaid(string emailAddress);

        public DoctorToReturnResponse UpdateDoctorActivated(string emailAddress);

        public void UpdateDoctorPassword(int doctorId, string updatedPassword);

        public List<DoctorToReturnResponse> GetDoctors();

        public List<DoctorToReturnResponse> GetNearestDoctorsBySpeciality(Double Latitude,Double Longitude,string speciality);

        public IEnumerable<DoctorToReturnResponse> GetDoctorsBySpecialityAndDistance(Double Latitude, Double Longitude, string speciality);
        public List<NearByDoctorsResponse> GetNearByDoctorsForSpeciality(Double Latitude, Double Longitude, string speciality);
    }
}
