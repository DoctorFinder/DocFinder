using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorLanguageService : IDoctorLanguageService
    {
        private DocFinderDBContext _db { get; set; }

        public DoctorLanguageService(DocFinderDBContext db)
        {
            this._db = db;
        }

        public void AddDoctorLanguages(IEnumerable<DoctorLanguages> doctorLanguages)
        {
            var dbLanguages = doctorLanguages.ToList();
            for (int i = 0; i < doctorLanguages.Count(); i++)
            {
                this._db.Add(dbLanguages[i]);
                this.Commit();
            }
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
