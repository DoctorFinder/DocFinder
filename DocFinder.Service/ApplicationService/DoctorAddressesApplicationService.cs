using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class DoctorAddressesApplicationService : IDoctorAddressesApplicationService
    {
        public IDoctorAddressService _doctorAddressService { get; set; }
        public DoctorAddressesApplicationService(IDoctorAddressService doctorAddressservice)
        {
            this._doctorAddressService = doctorAddressservice;
        }

        public void AddDoctorAddresses(IEnumerable<DoctorAddressesForCreation> doctorAddressesdTO, int doctorId)
        {
            var doctorAddresses = Mapping.Mapper.Map<IEnumerable<DoctorAddresses>>(doctorAddressesdTO);
            doctorAddresses = doctorAddresses.Select(docadd => { docadd.DoctorId = doctorId; return docadd; }).ToList();
            this._doctorAddressService.AddDoctorAddress(doctorAddresses);
        }

        public IEnumerable<DoctorAddressesToReturnDTO> GetDoctorAddresses(int doctorId)
        {
            var doctorAddresses = this._doctorAddressService.GetDoctorAddress(doctorId);
            var doctorAddressesToReturn = Mapping.Mapper.Map<IEnumerable<DoctorAddressesToReturnDTO>>(doctorAddresses);
            return doctorAddressesToReturn;
        }

        public IEnumerable<DoctorAddresses> GetDoctorAddressesEntities(int doctorId)
        {
            var doctorAddresses = this._doctorAddressService.GetDoctorAddress(doctorId);
            return doctorAddresses;
        }

        public IEnumerable<DoctorAddressesToReturnDTO> GetDoctorAddressesForSpeciality(string speciality)
        {
            var doctorAddresses = this._doctorAddressService.GetDoctorAddressesForSpeciality(speciality);
            var doctorAddressesToReturn = Mapping.Mapper.Map<IEnumerable<DoctorAddressesToReturnDTO>>(doctorAddresses);
            return doctorAddressesToReturn;
        }
    }
}
