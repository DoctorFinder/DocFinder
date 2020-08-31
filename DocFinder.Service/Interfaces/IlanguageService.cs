using DocFinder.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service.Interfaces
{
    public interface ILanguageService
    {
        public IQueryable<Languages> GetLanguages();
    }
}
