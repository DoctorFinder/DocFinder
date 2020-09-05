using DocFinder.Domain;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service
{
    public class DoctorSpecialityService : IDoctorSpecialityService
    {

        private DocFinderDBContext db { get; set; }

        public DoctorSpecialityService(DocFinderDBContext db)
        {
            this.db = db;
        }

        public void AddDoctorSpecialities(IEnumerable<DoctorSpecialities> doctorSpecialities)
        {
            var dbSpecialities = doctorSpecialities.ToList();
            for (int i = 0; i < doctorSpecialities.Count(); i++)
            {
                this.db.Add(dbSpecialities[i]);
                this.Commit();
            }
        }

        public int Commit()
        {
            return this.db.SaveChanges();
        }
    }
}
