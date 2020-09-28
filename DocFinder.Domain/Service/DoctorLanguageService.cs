using DocFinder.Domain.Interfaces;
using Microsoft.Data.SqlClient.DataClassification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorLanguageService : IDoctorLanguageService
    {
        private DocFinderDBContext _db { get; set; }

        public DoctorLanguageService(DocFinderDBContext db)
        {
            this._db = db;
        }

        public void AddDoctorLanguages(IEnumerable<DoctorLanguages> doctorLanguages)
        {
            var dbLanguages = doctorLanguages.ToList();
            for (int i = 0; i < doctorLanguages.Count(); i++)
            {
                this._db.Add(dbLanguages[i]);
                this.Commit();
            }
        }

        public IEnumerable<Languages> GetDoctorLanguages(int doctorId)
        {

            var languages  = (from lan in this._db.Languages
                 join doclan in this._db.DoctorLanguages on lan.Id equals doclan.LanguageId
                 where doclan.DoctorId == doctorId
                 select new Languages() { Id = lan.Id, Language = lan.Language, Code = lan.Code });         


            return languages;
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
