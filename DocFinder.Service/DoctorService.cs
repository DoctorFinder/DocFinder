using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Service.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;

namespace DocFinder.Service
{
    public class DoctorService : IDoctorService
    {

        private DocFinderDBContext db { get; set; }
        public DoctorService(DocFinderDBContext db)
        {
            this.db = db;
        }

        public int RegisterDoctor(Doctor doctor)
        {
            var doctorExists = this.GetDoctorByEmailandMobileNumber(doctor.Email, doctor.PhoneNumber);
       
            
        //       if (doctorExists != null)
         //   {   

               var doctorAdded =  this.db.Add(doctor);
           // }
            this.Commit();

            return doctorAdded.Entity.Id;
          
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this.db.Doctor.Where(d => d.Email == email).SingleOrDefault();
        }

        public Doctor GetDoctorByEmailandMobileNumber(string email, int mobileNumber)
        {
            return this.db.Doctor.Where(d => d.Email == email ||
            d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public Doctor GetDoctorByMobileNumber(int mobileNumber)
        {
            return this.db.Doctor.Where(d => d.PhoneNumber == mobileNumber).SingleOrDefault();
        }

        public int Commit()
        {
            return this.db.SaveChanges();
        }
    }
}
