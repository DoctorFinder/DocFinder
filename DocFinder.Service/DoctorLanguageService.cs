using DocFinder.Domain;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service
{
    public class DoctorLanguageService : IDoctorLanguageService
    {

        private DocFinderDBContext db { get; set; }

        public DoctorLanguageService(DocFinderDBContext db)
        {
            this.db = db;
        }

        public void AddDoctorLanguages(IEnumerable<DoctorLanguages> doctorLanguages)
        {
            var dbLanguages = doctorLanguages.ToList();
            for (int i = 0; i < doctorLanguages.Count(); i++)
            {
                this.db.Add(dbLanguages[i]);
                this.Commit();
            }
        }

        public int Commit()
        {
            return this.db.SaveChanges();
        }
    }
}
