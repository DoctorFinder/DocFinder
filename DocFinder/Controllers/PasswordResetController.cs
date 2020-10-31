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

        private IPasswordResetApplicationService _passwordResetApplicationService { get; set; }

        private IEmailApplicationService _emailApplicationService { get; set; }
        public PasswordResetController(ILogger<PasswordResetController> logger, IDoctorApplicationService doctorApplicationService,
            IPasswordResetApplicationService passwordResetApplicationService, IEmailApplicationService emailApplicationService)
        {
            this._logger = logger;
            this._doctorApplicationService = doctorApplicationService;
            this._passwordResetApplicationService = passwordResetApplicationService;
            this._emailApplicationService = emailApplicationService;
        }


        [HttpPost]
        [Route("[action]")]
        public ActionResult ResetDoctorPassword(AdminForRetrieving doctor)
        {
            string result = "Successfully sent a password reset link to your email address";
            var resetToken = this._passwordResetApplicationService.AddPasswordResetRequest(doctor.EmailAddress);

            if (resetToken != null && resetToken != "")
            {
                this._emailApplicationService.SendPasswordResetEmail(resetToken, doctor.EmailAddress);
                
            }
            return new JsonResult(result);
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult UpdatePassword(UpdatePasswordDTO password)
        {
            string result = "Successfully updated the password";
            var doctorId = this._passwordResetApplicationService.GetDoctorIdFromPasswordToken(password.ResetToken);
            this._doctorApplicationService.UpdateDoctorPassword(doctorId, password.Password);

            return new JsonResult(result);
        }
    }
}
