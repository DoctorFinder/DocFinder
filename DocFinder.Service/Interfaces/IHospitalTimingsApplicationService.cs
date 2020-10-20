using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IHospitalTimingsApplicationService
    {
        public void AddHospitalTimings(IEnumerable<HospitalTimingsForCreationDTO> hospitalTimingsdTO, int doctorAddressId);

        public  HospitalTimingsForCreationDTO GetHospitalTimings(int doctorAddressId);
    }
}
