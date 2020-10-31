using DocFinder.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IPasswordResetService
    {
        public int AddPasswordResetRequest(PasswordReset passwordReset);

        public int GetDoctorIdFromPasswordToken(string resetToken);
    }
}
