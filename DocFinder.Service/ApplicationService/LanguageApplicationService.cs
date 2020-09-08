using AutoMapper;
using DocFinder.Domain.DTO;
using DocFinder.Domain.Interfaces;
using DocFinder.Infrastructure;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service.ApplicationService
{
    public class LanguageApplicationService : ILanguageApplicationService
    {
        private ILanguageService _languageService { get; set; }
        public LanguageApplicationService(ILanguageService languageService)
        {
            this._languageService = languageService;
        }

        public LanguageDTO GetLanguageByName(string languageName)
        {
           var language = this._languageService.GetLanguageByName(languageName);

           var languageDTO =  Mapping.Mapper.Map<LanguageDTO>(language);

            return languageDTO;
        }

        public IEnumerable<LanguageDTO> GetLanguages()
        {
            var languages = this._languageService.GetLanguages();
            var languagesDTO = Mapping.Mapper.Map<IEnumerable<LanguageDTO>>(languages);

            return languagesDTO;

        }
    }
}
