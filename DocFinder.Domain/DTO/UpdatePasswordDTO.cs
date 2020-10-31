using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.DTO
{
    public class UpdatePasswordDTO
    {
        public string ResetToken { get; set; }

        public string Password { get; set; }
    }
}
