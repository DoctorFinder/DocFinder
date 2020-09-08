using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class DoctorLanguageApplicationService : IDoctorLanguageApplicationService
    {
        private IDoctorLanguageService _doctorLanguageService { get; set; }
        public DoctorLanguageApplicationService(IDoctorLanguageService doctorLanguageService)
        {
            this._doctorLanguageService = doctorLanguageService;
        }
        public void AddDoctorLanguages(IEnumerable<DoctorLanguagesForCreation> doctorLanguagesDTO, int doctorId)
        {
            var doctorLanguages = Mapping.Mapper.Map<IEnumerable<DoctorLanguages>>(doctorLanguagesDTO);
            doctorLanguages = doctorLanguages.Select(doclan => { doclan.DoctorId = doctorId; return doclan; }).ToList();
            this._doctorLanguageService.AddDoctorLanguages(doctorLanguages); 
        }
    }
}
