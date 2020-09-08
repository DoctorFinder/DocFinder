using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorService : IDoctorService
    {
        private DocFinderDBContext _db { get; set; }
        public DoctorService(DocFinderDBContext db)
        {
            this._db = db;
        }

        public int RegisterDoctor(Doctor doctor)
        {
            var doctorExists = this.GetDoctorByEmailandMobileNumber(doctor.Email, doctor.PhoneNumber);

            if (doctorExists != null)
            {
                return 0;
            }
            var doctorAdded = this._db.Add(doctor);
            this.Commit();
            return doctorAdded.Entity.Id;           
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._db.Doctor.Where(d => d.Email == email).SingleOrDefault();
        }

        public Doctor GetDoctorByEmailandMobileNumber(string email, string mobileNumber)
        {
            return this._db.Doctor.Where(d => d.Email == email ||
            d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public Doctor GetDoctorByMobileNumber(string mobileNumber)
        {
            return this._db.Doctor.Where(d => d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }

    }
}
