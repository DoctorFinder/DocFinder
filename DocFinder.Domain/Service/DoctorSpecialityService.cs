using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorSpecialityService : IDoctorSpecialityService
    {
        private DocFinderDBContext _db { get; set; }

        public DoctorSpecialityService(DocFinderDBContext db)
        {
            this._db = db;
        }

        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialities> doctorSpecialities)
        {
            var dbSpecialities = doctorSpecialities.ToList();
            for (int i = 0; i < doctorSpecialities.Count(); i++)
            {
                this._db.Add(dbSpecialities[i]);
                this.Commit();
            }
        }

        public IEnumerable<Specialities> GetDoctorSpecialities(int doctorId)
        {

            var specialities = (from spec in this._db.Specialities
                             join docspec in this._db.DoctorSpecialities on spec.ID equals docspec.SpecialityId
                                where docspec.DoctorId == doctorId
                             select new Specialities() { ID = spec.ID, Speciality = spec.Speciality });

            return specialities;
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
