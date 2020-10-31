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
    public class PasswordResetController : ControllerBase
    {

        private ILogger<PasswordResetController> _logger { get; set; }

        private IDoctorApplicationService _doctorApplicationService { get; set; }
        public PasswordResetController(ILogger<PasswordResetController> logger, IDoctorApplicationService doctorApplicationService)
        {
            this._logger = logger;
            this._doctorApplicationService = doctorApplicationService;
        }


        [HttpPost]
        [Route("[action]")]
        public ActionResult ResetDoctorPassword(AdminForRetrieving doctor)
        {
            if (doctor.EmailAddress == "admintestemailid@gmail.com" && doctor.Password == "Test@1234")
            {
                var doctors = this._doctorApplicationService.GetDoctors();
                return Ok(doctors);
            }
            return NotFound();
        }
    }
}
