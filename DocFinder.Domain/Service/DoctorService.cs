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
            var doctorExists = this.GetDoctorByEmail(doctor.Email);

            if (doctorExists != null)
            {
              //  return 0;
            }
            var doctorAdded = this._db.Add(doctor);
            this.Commit();
            return doctorAdded.Entity.Id;           
        }

        public Doctor GetDoctorById(int doctorId)
        {
            var doctor = this._db.Doctor.Where(doc => doc.Id == doctorId).SingleOrDefault();
            return doctor;
        }

        public Doctor UpdateDoctor(Doctor doctor)
        {
            this._db.Doctor.Update(doctor);
            this.Commit();
            return doctor;
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._db.Doctor.Where(d =>d.Email == email).SingleOrDefault();            

        }

        public IEnumerable<Doctor> GetDoctors()
        {
            return this._db.Doctor.ToList();
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }

    }
}
