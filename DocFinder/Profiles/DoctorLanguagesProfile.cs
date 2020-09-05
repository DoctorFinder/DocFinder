using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Profiles
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
