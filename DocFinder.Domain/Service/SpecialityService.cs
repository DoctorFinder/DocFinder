using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class SpecialityService : ISpecialityService
    {
        private DocFinderDBContext _db { get; set; }

        public SpecialityService(DocFinderDBContext db)
        {
            this._db = db;
        }

       public IEnumerable<Specialities>  GetSpecialities()
        {
            return this._db.Specialities.ToList();
            
        }

       public Specialities GetSpecialitiesByName(string speciality)
        {
            return this._db.Specialities.SingleOrDefault(spl => spl.Speciality == speciality);
        }
    }
}
