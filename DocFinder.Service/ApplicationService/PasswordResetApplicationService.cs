using DocFinder.Domain.Interfaces;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;
using DocFinder.Domain.DTO;
using DocFinder.Infrastructure;
using DocFinder.Domain.Entities;

namespace DocFinder.Service.ApplicationService
{
    public class PasswordResetApplicationService : IPasswordResetApplicationService
    {

        private IPasswordResetService _passwordResetService { get; set; }

        private IDoctorApplicationService _doctorApplicationService { get; set; }
        public PasswordResetApplicationService(IPasswordResetService passwordResetService, IDoctorApplicationService doctorApplicationService) 
        {
            this._passwordResetService = passwordResetService;
            this._doctorApplicationService = doctorApplicationService;
        }

        public string AddPasswordResetRequest(string emailAddress)
        {

  
            var doctor = this._doctorApplicationService.GetDoctorByEmail(emailAddress);
            if (doctor != null) 
            {
                string passwordResetToken = GenerateAPasswordReset();
                
                PasswordResetDTO passwordResetDTO = new PasswordResetDTO();
                passwordResetDTO.DoctorId = doctor.id;
                passwordResetDTO.PasswordResetCode = GenerateAPasswordReset();
                passwordResetDTO.PasswordResetStart = DateTime.Now;
                var passwordReset = Mapping.Mapper.Map<PasswordReset>(passwordResetDTO);
                var result =  this._passwordResetService.AddPasswordResetRequest(passwordReset);
                if (result >= 1)
                {
                    return passwordResetDTO.PasswordResetCode;
                }
                else
                {
                    return null;
                }

            }
            return "";            
        }

        private string GenerateAPasswordReset()
        {
            Byte[] bytes;
            String bytesBase64Url;
            bytes = new Byte[12];
            RandomNumberGenerator.Create().GetBytes(bytes);
            String base64 = Convert.ToBase64String(bytes);
            bytesBase64Url = base64.Replace('+', '-').Replace('/', '_');
            return bytesBase64Url;
        }
    }
}
