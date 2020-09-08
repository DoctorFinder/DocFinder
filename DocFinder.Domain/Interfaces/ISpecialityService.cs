using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface ISpecialityService
    {
        public IEnumerable<Specialities> GetSpecialities();

        public Specialities GetSpecialitiesByName(string speciality);
    }
}
