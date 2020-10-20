using DocFinder.Domain.DTO;
using DocFinder.Domain.Entities;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class HospitalTimingsApplicationService : IHospitalTimingsApplicationService
    {
        private IHospitalTimingsService _hospitalTimingsSerice { get; set; }
        public HospitalTimingsApplicationService(IHospitalTimingsService hospitalTimingsSerice)
        {
            this._hospitalTimingsSerice = hospitalTimingsSerice;
        }

        public void AddHospitalTimings(IEnumerable<HospitalTimingsForCreationDTO> hospitalTimingsdTO, int doctorAddressId)
        {
            var hospitalTimings = Mapping.Mapper.Map<HospitalTimings>(hospitalTimingsdTO);
            hospitalTimings.DoctorAddressId = doctorAddressId;           
            this._hospitalTimingsSerice.AddHospitalTimings(hospitalTimings);
        }

        public HospitalTimingsForCreationDTO GetHospitalTimings(int doctorAddressId)
        {
            var hospitalTimings = this._hospitalTimingsSerice.GetHospitalTimings(doctorAddressId);
            var hospitalTimingsToReturn = Mapping.Mapper.Map<HospitalTimingsForCreationDTO>(hospitalTimings);
            return hospitalTimingsToReturn;
        }
    }
}
