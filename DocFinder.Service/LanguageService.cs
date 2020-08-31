using DocFinder.Domain;
using DocFinder.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Service
{
    public class LanguageService : ILanguageService
    {
        private DocFinderDBContext _db { get; set; }
        public LanguageService(DocFinderDBContext db)
        {
            this._db = db;
        }
       public  IQueryable<Languages> GetLanguages()
        {
            return   this._db.Languages;
        }
    }
}
