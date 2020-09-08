using DocFinder.Domain;
using DocFinder.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface ILanguageApplicationService
    {
        public IEnumerable<LanguageDTO> GetLanguages();

        public LanguageDTO GetLanguageByName(string languageName);
    }
}
