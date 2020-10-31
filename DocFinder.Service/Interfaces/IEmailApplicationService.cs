using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IEmailApplicationService
    {
        public void SendPasswordResetEmail(string resetToken,string emailAddress);

        public void AccountActivatedEmail(string emailAddress);
    }
}
