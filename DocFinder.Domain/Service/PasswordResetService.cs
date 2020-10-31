using DocFinder.Domain.Entities;
using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public int GetDoctorIdFromPasswordToken(string resetToken)
        {
            var passwordResetRequest = this._db.PasswordReset.Where(req => req.PasswordResetCode == resetToken).SingleOrDefault();
            return passwordResetRequest.DoctorId;
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }

    }
}
