using DocFinder.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IHospitalTimingsService
    {
        public void AddHospitalTimings(HospitalTimings hospitalTimings);

        public HospitalTimings GetHospitalTimings(int AddressId);
    }
}
