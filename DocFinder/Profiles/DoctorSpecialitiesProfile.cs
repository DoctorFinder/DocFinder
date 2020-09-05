using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Profiles
{
    public class DoctorSpecialitiesProfile: Profile
    {
        public DoctorSpecialitiesProfile()
        {
            CreateMap<DoctorSpecialitiesForCreation, DoctorSpecialities>()
                .ForMember(
                 dest => dest.SpecialityId,
                 opt => opt.MapFrom(src => src.value));

        }
    }
}
