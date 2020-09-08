using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IDoctorService
    {
        public int RegisterDoctor(Doctor doctor);

        public Doctor GetDoctorByEmailandMobileNumber(string email, string mobileNumber);

        public Doctor GetDoctorByEmail(string email);

        public Doctor GetDoctorByMobileNumber(string mobileNumber);

        public int Commit();
    }
}
