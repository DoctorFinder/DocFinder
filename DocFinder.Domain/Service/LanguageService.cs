using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class LanguageService : ILanguageService
    {
        private DocFinderDBContext _db { get; set; }
        public LanguageService(DocFinderDBContext db)
        {
            this._db = db;
        }
        public IEnumerable<Languages> GetLanguages()
        {
            return this._db.Languages;
        }

        public Languages GetLanguageByName(string language)
        {
            return this._db.Languages.SingleOrDefault(lan => lan.Language == language);
        }
    }
}
