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
        private IDoctorService _doctorService { get; set; }

        private IDoctorLanguageService _doctorLanguageService { get; set; }

        private IDoctorSpecialityService _doctorSpecialityService { get; set; }

        private readonly IMapper _mapper;
        public DoctorController(IDoctorService doctorService, IDoctorSpecialityService doctorSpecialityService,IDoctorLanguageService doctorLanguageService, IMapper mapper)
        {
            this._doctorService = doctorService;
            this._doctorLanguageService = doctorLanguageService;
            this._doctorSpecialityService = doctorSpecialityService;
            this._mapper = mapper;
        }

        [HttpPost]
        public ActionResult<string> Post (DoctorForCreationDTO doctor)
        {
            var doctorToAdd = _mapper.Map<Doctor>(doctor);
            List<DoctorLanguages> doctorLanguages = _mapper.Map<IEnumerable<DoctorLanguages>>(doctor.Languages).ToList();
            List<DoctorSpecialities> doctorSpecialities = _mapper.Map<IEnumerable<DoctorSpecialities>>(doctor.Specialities).ToList();

             var doctorId = this._doctorService.RegisterDoctor(doctorToAdd);

            doctorLanguages = doctorLanguages.Select(doclan => { doclan.DoctorId = doctorId; return doclan; }).ToList();
            doctorSpecialities = doctorSpecialities.Select(docspl => { docspl.DoctorId = doctorId; return docspl; }).ToList();

            this._doctorSpecialityService.AddDoctorSpecialities(doctorSpecialities);
            this._doctorLanguageService.AddDoctorLanguages(doctorLanguages);

            return "str";             
        }


        [HttpGet]
        public string Get()
        {
            return "Test return bro";
        }
    } 
}
