using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.ServiceResponse;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
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

        private IDoctorAddressesApplicationService _doctorAddresesApplicationService { get; set; }

        private ILogger<DoctorController> _logger { get; set; }

        private readonly IMapper _mapper;
        public DoctorController(IDoctorApplicationService doctorApplicationService, IDoctorSpecialityApplicationService doctorSpecialityApplicationService,
                                IDoctorLanguageApplicationService doctorLanguageApplicationService, IDoctorAddressesApplicationService doctorAddresesApplicationService,
                                ILogger<DoctorController> logger,IMapper mapper)
        {
            this._doctorApplicationService = doctorApplicationService;
            this._doctorLanguageApplicationService = doctorLanguageApplicationService;
            this._doctorSpecialityApplicationService = doctorSpecialityApplicationService;
            this._doctorAddresesApplicationService = doctorAddresesApplicationService;
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<DoctorToReturnResponse>> Post (IFormCollection doctor)
        {
            
            DoctorForCreationDTO doctorForCreation = new DoctorForCreationDTO();
            await this.TryUpdateModelAsync(doctorForCreation);
            doctorForCreation.Specialities = JsonSerializer.Deserialize<ICollection<DoctorSpecialitiesForCreation>>(doctor["specialities"]);
            doctorForCreation.Languages = JsonSerializer.Deserialize<ICollection<DoctorLanguagesForCreation>>(doctor["languages"]);
            doctorForCreation.Addresses = JsonSerializer.Deserialize<ICollection<DoctorAddressesForCreation>>(doctor["addresses"]);
            var doctorForCreationImage = doctor.Files[0];

            using (var memoryStream = new MemoryStream())
            {
                await doctorForCreationImage.CopyToAsync(memoryStream);
                doctorForCreation.UserImage = memoryStream.ToArray();
            }

            var doctorDetails = this._doctorApplicationService.RegisterDoctor(doctorForCreation);
            
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
        public ActionResult Get()
        {
            var doctorToRetun = this._doctorApplicationService.GetDoctorByEmail("aasriram.sakinala@gmail.com");
            string result = Convert.ToBase64String(doctorToRetun.UserImage);
            return new JsonResult(result);
        }
    } 
}
