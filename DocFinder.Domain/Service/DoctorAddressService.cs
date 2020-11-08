using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorAddressService : IDoctorAddressService
    {

        private DocFinderDBContext _db { get; set; }

        public DoctorAddressService(DocFinderDBContext db)
        {
            this._db = db;
        }


        public void AddDoctorAddress(IEnumerable<DoctorAddresses> doctorAddresses)
        {
            var doctorAddressesToAdd = doctorAddresses.ToList();
            for (int i = 0; i < doctorAddresses.Count(); i++)
            {
                this._db.Add(doctorAddressesToAdd[i]);
                this.Commit();
            }
        }

        public IEnumerable<DoctorAddresses> GetDoctorAddress(int doctorId)
        {
            return this._db.DoctorAddresses.Where(doc => doc.DoctorId == doctorId);
        }

        public IEnumerable<DoctorAddresses> GetAllDoctorAddresses()
        {
            return this._db.DoctorAddresses.ToList();
        }

        public IEnumerable<DoctorAddresses> GetDoctorAddressesForSpeciality(string speciality)
        {
            if (String.IsNullOrEmpty(speciality))
            {
                return GetAllDoctorAddresses();
            }

            var specialityId = this._db.Specialities.Where(spec => spec.Speciality == speciality).FirstOrDefault(); ;
            var doctorsAddresses = (from docadd in this._db.DoctorAddresses
                                    join docspec in this._db.DoctorSpecialities on docadd.DoctorId equals docspec.DoctorId
                                    where docspec.SpecialityId == specialityId.ID
                                    select docadd);
            return doctorsAddresses.ToList();
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
