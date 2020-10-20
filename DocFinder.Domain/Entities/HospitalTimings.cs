using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DocFinder.Domain.Entities
{
    public class HospitalTimings
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("DoctorAddresses")]
        public int DoctorAddressId { get; set; }
        public bool UpdateHours { get; set; }
        public bool SunDayOpen { get; set; }
        public bool MonDayOpen { get; set; }
        public bool TuesDayOpen { get; set; }
        public bool WednesDayOpen { get; set; }
        public bool ThursDayOpen { get; set; }
        public bool FriDayOpen { get; set; }
        public bool SatDayOpen { get; set; }
        public DateTime SundayStart { get;set;}
        public DateTime SundayEnd { get; set; }
        public DateTime MondayStart { get; set; }
        public DateTime MondayEnd { get; set; }
        public DateTime TuesdayStart { get; set; }
        public DateTime TuesdayEnd { get; set; }
        public DateTime WednesdayStart { get; set; }
        public DateTime WednesdayEnd { get; set; }
        public DateTime ThursdayStart { get; set; }
        public DateTime ThursdayEnd { get; set; }
        public DateTime FridayStart { get; set; }
        public DateTime FridayEnd { get; set; }
        public DateTime SaturdayStart { get; set; }
        public DateTime SaturdayEnd { get; set; }

        public virtual DoctorAddresses DoctorAddresses { get; set; }
    }
}
