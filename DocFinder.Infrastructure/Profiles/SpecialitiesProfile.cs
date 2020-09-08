using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
    public class SpecialitiesProfile : Profile
    {
        public SpecialitiesProfile() {
            CreateMap<Specialities, SpecialitiesDTO>().ForMember(
                 dest => dest.value,
                 opt => opt.MapFrom(src => src.ID)).ForMember(
                 dest => dest.label,
                 opt => opt.MapFrom(src => src.Speciality)
                 ); 
            CreateMap<SpecialitiesDTO, Specialities>();
        }

    }
}
