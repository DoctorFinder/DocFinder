using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Controllers
{
    [ApiController]
    [Route("Speciality")]
    public class SpecialityController : ControllerBase
    {
        private ISpecialityApplicationService _specialityApplicationService { get;set;}
        public SpecialityController(ISpecialityApplicationService specialityApplicationService)
        {
            this._specialityApplicationService = specialityApplicationService;        
        }

        public ActionResult<IEnumerable<SpecialitiesDTO>> Get()
        {           
            var specialities = this._specialityApplicationService.GetSpecialities();
            return Ok(specialities);
        }
    }

}
