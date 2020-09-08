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

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
