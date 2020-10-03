using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.ServiceResponse;
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
        public ActionResult<DoctorToReturnResponse> Post (DoctorForCreationDTO doctor)
        {

             var doctorDetails = this._doctorApplicationService.RegisterDoctor(doctor);

            if (doctorDetails is null || doctorDetails.doctor is null)
            {
                return NotFound(doctorDetails);
            }
             return Ok(doctorDetails);             
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult<DoctorToReturnResponse> PostDoctorLogin(DoctorForRetrieving doctor)
        {
            var doctorDetails = this._doctorApplicationService.GetDoctorDetails(doctor);
            if (doctorDetails.doctor is null)
            {

                return NotFound(doctorDetails);
            }

            return Ok(doctorDetails);
        
        }

        [HttpPut]
        [Route("[action]")]
        public ActionResult<DoctorToReturnResponse> UpdateDoctorLogin(DoctorForCreationDTO doctor)
        {
            var doctorDTO = this._doctorApplicationService.RegisterDoctor(doctor);

            if (doctorDTO is null || doctorDTO.doctor is null)
            {
                return NotFound(doctorDTO);
            }
            return Ok(doctorDTO);
        }

        [HttpGet]
        public string Get()
        {
            return "Test return bro";
        }
    } 
}
