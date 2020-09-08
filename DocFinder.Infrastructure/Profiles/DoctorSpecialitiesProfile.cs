using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
   public  class DoctorSpecialitiesProfile : Profile
    {
        public DoctorSpecialitiesProfile() { 
        CreateMap<DoctorSpecialitiesForCreation, DoctorSpecialities>()
                .ForMember(
                 dest => dest.SpecialityId,
                 opt => opt.MapFrom(src => src.value));
    }
    }
}
