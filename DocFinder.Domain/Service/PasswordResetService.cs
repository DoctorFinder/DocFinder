using DocFinder.Domain.Entities;
using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class PasswordResetService : IPasswordResetService
    {

        private DocFinderDBContext _db { get; set; }

        public PasswordResetService(DocFinderDBContext db) 
        {
            this._db = db;
        }
        public int AddPasswordResetRequest(PasswordReset passwordReset)
        {
            var passwordResetRequestAdded = this._db.Add(passwordReset);
            this.Commit();
            return passwordReset.Id;
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }

    }
}
