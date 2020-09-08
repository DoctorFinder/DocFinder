using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
    public class LanguagesProfile : Profile
    {
        public LanguagesProfile()
        {
         CreateMap<Languages, LanguageDTO>().ForMember(
         dest => dest.value,
         opt => opt.MapFrom(src => src.Id)).ForMember(
         dest => dest.label,
         opt => opt.MapFrom(src => src.Language)
         );
         CreateMap<LanguageDTO, Languages>();
        }
    }
}
