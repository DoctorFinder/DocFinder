using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class SpecialityApplicationService : ISpecialityApplicationService
    {
        private ISpecialityService _specialityService { get; set; }
        public SpecialityApplicationService(ISpecialityService specialityService) 
        {
            this._specialityService = specialityService;
        }
        public IEnumerable<SpecialitiesDTO> GetSpecialities()
        {
            var specialities = this._specialityService.GetSpecialities();
            var specialitiesDTO =   Mapping.Mapper.Map<IEnumerable<SpecialitiesDTO>>(specialities);
            return specialitiesDTO;
        }

       public SpecialitiesDTO GetSpecialitiesByName(string specialityName)
        {
            var speciality = this._specialityService.GetSpecialitiesByName(specialityName);
            var specialityDTO = Mapping.Mapper.Map<SpecialitiesDTO>(speciality);

            return specialityDTO;
        }
    }
}
