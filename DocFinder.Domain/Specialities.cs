using System;
using System.ComponentModel.DataAnnotations;


namespace DocFinder.Domain
{
   public class Specialities
    {
        [Key]
        public int ID { get; set; }
        public string Speciality { get; set; }
    }
}
