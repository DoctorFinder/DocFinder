using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
   public class DoctorsProfile : Profile
    {

        public DoctorsProfile()
        {
            CreateMap<Doctor, DoctorForCreationDTO>();
            CreateMap<DoctorForCreationDTO, Doctor>();
            CreateMap<Doctor, DoctorToReturnDTO>();
            CreateMap<DoctorToReturnDTO, Doctor>();
        }
            
    }
}
