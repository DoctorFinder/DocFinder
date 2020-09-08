using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Interfaces
{
    public interface ILanguageService
    {
        public IEnumerable<Languages> GetLanguages();

        public Languages GetLanguageByName(string language);
    }
}
