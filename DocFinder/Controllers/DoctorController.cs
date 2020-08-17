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
    [Route("[controller]")]
    public class DoctorController : ControllerBase
    {
        private IDoctorService _doctorService { get; set; }
        public DoctorController(IDoctorService doctorService)
        {
            this._doctorService = doctorService;
        }

        [HttpPost]
        public void Post(Doctor doctor)
        {

            this._doctorService.RegisterDoctor(doctor);

        }

        public void Get(string doctorId)
        {

        }
    }
}
