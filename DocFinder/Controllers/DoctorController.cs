using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController : ControllerBase
    {
        private IDoctorApplicationService _doctorApplicationService { get; set; }

        private IDoctorLanguageApplicationService _doctorLanguageApplicationService { get; set; }

        private IDoctorSpecialityApplicationService _doctorSpecialityApplicationService { get; set; }

        private readonly IMapper _mapper;
        public DoctorController(IDoctorApplicationService doctorApplicationService, IDoctorSpecialityApplicationService doctorSpecialityApplicationService, IDoctorLanguageApplicationService doctorLanguageApplicationService, IMapper mapper)
        {
            this._doctorApplicationService = doctorApplicationService;
            this._doctorLanguageApplicationService = doctorLanguageApplicationService;
            this._doctorSpecialityApplicationService = doctorSpecialityApplicationService;
            this._mapper = mapper;
        }

        [HttpPost]
        public ActionResult<string> Post (DoctorForCreationDTO doctor)
        {

             var doctorId = this._doctorApplicationService.RegisterDoctor(doctor);
             return "str";             
        }


        [HttpGet]
        public string Get()
        {
            return "Test return bro";
        }
    } 
}
