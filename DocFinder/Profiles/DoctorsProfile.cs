using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Profiles
{
    public class DoctorsProfile : Profile
    {

        public DoctorsProfile()
        {
            CreateMap<Doctor, DoctorForCreationDTO>();
            CreateMap<DoctorForCreationDTO, Doctor>();

        }

    }
}
