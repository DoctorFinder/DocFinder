using AutoMapper;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure.Profiles
{
    public class PasswordResetProfile : Profile
    {
        public PasswordResetProfile() 
        {
            CreateMap<PasswordResetDTO, PasswordReset>();
            CreateMap<PasswordReset, PasswordResetDTO>();
        }
    }
}
