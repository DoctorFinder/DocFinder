using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
   public class DoctorLanguagesProfile : Profile
    {
        public DoctorLanguagesProfile()
        {
            CreateMap<DoctorLanguagesForCreation, DoctorLanguages>()
                  .ForMember(
                   dest => dest.LanguageId,
                   opt => opt.MapFrom(src => src.value));
        }
    }
}
