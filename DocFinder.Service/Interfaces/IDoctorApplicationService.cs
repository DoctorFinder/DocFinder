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

    }
}
