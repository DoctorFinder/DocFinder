using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IPasswordResetApplicationService
    {
        public string AddPasswordResetRequest(string emailAddress);

        public int GetDoctorIdFromPasswordToken(string resetToken);
    }
}
