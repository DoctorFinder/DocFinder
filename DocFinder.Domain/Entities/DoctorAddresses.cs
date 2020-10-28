using DocFinder.Domain.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DocFinder.Domain
{
    public class DoctorAddresses
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Address1 { get; set; }

        [Required]
        [MaxLength(50)]
        public string Address2 { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string State { get; set; }

        [Required]
        [MaxLength(5)]
        public string Zipcode { get; set; }

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }

        public Point Location { get; set; }

        public virtual HospitalTimings HospitalTimings  { get; set; }

    }
}
