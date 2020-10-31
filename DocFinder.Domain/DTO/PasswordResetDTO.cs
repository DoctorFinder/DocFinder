using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.DTO
{
   public class PasswordResetDTO
    {
        public int DoctorId { get; set; }
        public string PasswordResetCode { get; set; }
        public DateTime PasswordResetStart { get; set; }
    }
}
