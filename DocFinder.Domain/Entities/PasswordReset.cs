using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DocFinder.Domain.Entities
{
    public class PasswordReset
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public string PasswordResetCode { get; set; }

        [Required]
        public DateTime PasswordResetStart { get; set; } 
           
    }
}
