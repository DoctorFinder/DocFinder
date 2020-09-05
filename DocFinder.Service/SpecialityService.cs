using DocFinder.Domain;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service
{
    public class SpecialityService : ISpecialityService
    {

        private DocFinderDBContext db { get; set; }
        public SpecialityService(DocFinderDBContext db)
        {
            this.db = db;
        }

        public IQueryable<Specialities> GetSpecialities()
        {

            return this.db.Specialities;
        }

        public Specialities GetSpecialitiesByName(string speciality)
        {

            return this.db.Specialities.SingleOrDefault(spl => spl.Speciality == speciality);
        }
    }
}
