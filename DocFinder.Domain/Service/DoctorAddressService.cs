using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class DoctorAddressService : IDoctorAddressService
    {

        private DocFinderDBContext _db { get; set; }

        public DoctorAddressService(DocFinderDBContext db)
        {
            this._db = db;
        }


        public void AddDoctorAddress(IEnumerable<DoctorAddresses> doctorAddresses)
        {
            var doctorAddressesToAdd = doctorAddresses.ToList();
            for (int i = 0; i < doctorAddresses.Count(); i++)
            {
                this._db.Add(doctorAddressesToAdd[i]);
                this.Commit();
            }
        }

        public IEnumerable<DoctorAddresses> GetDoctorAddress(int doctorId)
        {
            return this._db.DoctorAddresses.Where(doc => doc.DoctorId == doctorId);
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
