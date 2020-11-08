using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorAddressesApplicationService
    {
        public void AddDoctorAddresses(IEnumerable<DoctorAddressesForCreation> doctorAddressesdTO, int doctorId);

        public IEnumerable<DoctorAddressesToReturnDTO> GetDoctorAddresses(int doctorId);

        public IEnumerable<DoctorAddresses> GetDoctorAddressesEntities(int doctorId);

        public IEnumerable<DoctorAddressesToReturnDTO> GetDoctorAddressesForSpeciality(string speciality);
    }
}
