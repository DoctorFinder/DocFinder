using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorService
    {
        public int RegisterDoctor(Doctor doctor);

        public Doctor GetDoctorByEmailandMobileNumber(string email, int mobileNumber);

        public Doctor GetDoctorByEmail(string email);

        public Doctor GetDoctorByMobileNumber(int mobileNumber);

        public int Commit();
    }
}
