using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
    public class DoctorAddressesProfile : Profile
    {
        public DoctorAddressesProfile()
        {
            CreateMap<DoctorAddressesForCreation, DoctorAddresses>();
            CreateMap<DoctorAddresses, DoctorAddressesToReturnDTO>();
        }
    }
}
