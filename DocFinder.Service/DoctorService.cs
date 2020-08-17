using DocFinder.Domain;
using DocFinder.Service.Interfaces;
using System;
using System.Linq;

namespace DocFinder.Service
{
    public class DoctorService : IDoctorService
    {

        private DocFinderDBContext db { get; set; }
        public DoctorService(DocFinderDBContext db)
        {
            this.db = db;
        }

        public void RegisterDoctor(Doctor doctor)
        {
            var doctorExists = this.GetDoctorByEmailandMobileNumber(doctor.Email, doctor.PhoneNumber);
            if (doctorExists != null)
            {
                this.db.Add(doctor);
            }
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this.db.Doctors.Where(d => d.Email == email).SingleOrDefault();
        }

        public Doctor GetDoctorByEmailandMobileNumber(string email, int mobileNumber)
        {
            return this.db.Doctors.Where(d => d.Email == email ||
            d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public Doctor GetDoctorByMobileNumber(int mobileNumber)
        {
            return this.db.Doctors.Where(d => d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public int Commit()
        {
            return this.db.SaveChanges();
        }
    }
}
