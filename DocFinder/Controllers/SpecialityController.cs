using DocFinder.Domain;
using DocFinder.Service.Interfaces;
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
        private ISpecialityService _specialityService {get;set;}
        public SpecialityController(ISpecialityService specialityService)
        {
            this._specialityService = specialityService;        
        }

        public ActionResult<IQueryable<Specialities>> Get()
        {
            var specialities = this._specialityService.GetSpecialities();
            return Ok(specialities);
        }
    }

}
