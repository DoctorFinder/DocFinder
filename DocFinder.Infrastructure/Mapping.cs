using AutoMapper;
using DocFinder.Infrastructure.Profiles;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure
{
    public static class Mapping
    {
        private static readonly Lazy<IMapper> Lazy = new Lazy<IMapper>(() =>
        {
            var config = new MapperConfiguration(cfg => {
                // This line ensures that internal properties are also mapped over.
                cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsAssembly;
                cfg.AddProfile<DoctorsProfile>();
                cfg.AddProfile<SpecialitiesProfile>();
                cfg.AddProfile<LanguagesProfile>();
                cfg.AddProfile<DoctorLanguagesProfile>();
                cfg.AddProfile<DoctorSpecialitiesProfile>();
            });
            var mapper = config.CreateMapper();
            return mapper;
        });

        public static IMapper Mapper => Lazy.Value;
    }
}
