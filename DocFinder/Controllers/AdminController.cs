using DocFinder.Domain.DTO;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private ILogger<AdminController> _logger { get; set; }

        private IDoctorApplicationService _doctorApplicationService { get; set; }
        public AdminController(ILogger<AdminController> logger, IDoctorApplicationService doctorApplicationService)
        {
            this._logger = logger;
            this._doctorApplicationService = doctorApplicationService;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult PostAdminLogin(AdminForRetrieving admin)
        {
            if (admin.EmailAddress == "admintestemailid@gmail.com" && admin.Password == "Test@1234")
            {
                var doctors = this._doctorApplicationService.GetDoctors();
                return Ok(doctors);
            }
            return NotFound();
        }

        [HttpPut]
        [Route("[action]")]
        public ActionResult Put(DoctorForRetrieving doctor)
        {
            var doctorToReturn = this._doctorApplicationService.UpdateDoctorActivated(doctor.EmailAddress);
            return Ok(doctorToReturn);
        }
    }
}
