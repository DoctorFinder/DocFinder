using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DocFinder.Domain
{
   public  class DoctorLanguages
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DoctorId { get; set; }
        
        [Required]
        public int LanguageId { get; set; }

    }
}
