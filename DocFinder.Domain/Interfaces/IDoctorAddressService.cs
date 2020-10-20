using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface IDoctorAddressService
    {
        public void AddDoctorAddress(IEnumerable<DoctorAddresses> doctorAddresses);

        public IEnumerable<DoctorAddresses> GetDoctorAddress(int doctorId);
    }
}
