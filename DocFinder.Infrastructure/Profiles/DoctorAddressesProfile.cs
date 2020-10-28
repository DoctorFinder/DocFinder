using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using NetTopologySuite;
using NetTopologySuite.Geometries;

namespace DocFinder.Infrastructure.Profiles
{
    public class DoctorAddressesProfile : Profile
    {
        public DoctorAddressesProfile()
        {
            var geometryService = NtsGeometryServices.Instance.CreateGeometryFactory(srid:4326);
     CreateMap<DoctorAddressesForCreation, DoctorAddresses>()
                .ForMember(
                dest => dest.Location,
                opt => opt.MapFrom(src => geometryService.CreatePoint(new Coordinate(src.Longitude,src.Latitude)))
                );
            CreateMap<DoctorAddresses, DoctorAddressesToReturnDTO>()
                .ForMember(
                dest => dest.Latitude,
                opt => opt.MapFrom(src => src.Location.Y))
                .ForMember(
                dest => dest.Longitude,
                opt => opt.MapFrom(src => src.Location.X)
                );
                //.ForMember(
                //dest => dest.Longitude,
                //opt => opt.MapFrom(src => (double)src.Longitude)
                //);
        }
    }
}
