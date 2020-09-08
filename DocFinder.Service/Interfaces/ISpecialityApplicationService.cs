using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface ISpecialityApplicationService
    {
        public IEnumerable<SpecialitiesDTO> GetSpecialities();

        public SpecialitiesDTO GetSpecialitiesByName(string specialityName);
    }
}
