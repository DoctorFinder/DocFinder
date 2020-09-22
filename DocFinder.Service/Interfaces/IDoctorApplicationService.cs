using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using DocFinder.Domain.DTO;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorApplicationService
    {
        public DoctorForCreationDTO RegisterDoctor(DoctorForCreationDTO doctorDTO);

        public DoctorForCreationDTO GetDoctorByEmailandMobileNumber(string email, string mobileNumber);

        public DoctorForCreationDTO GetDoctorByEmail(string email);

        public DoctorForCreationDTO GetDoctorByMobileNumber(string mobileNumber);

    }
}
