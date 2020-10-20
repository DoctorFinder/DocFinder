using DocFinder.Domain.Entities;
using DocFinder.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DocFinder.Domain.Service
{
    public class HospitalTimingsService : IHospitalTimingsService
    {
        private DocFinderDBContext _db { get; set; }
        public HospitalTimingsService(DocFinderDBContext db)
        {
            this._db = db;
        }

        public void AddHospitalTimings(HospitalTimings hospitalTimings)
        {
            var hospitalTimingsAdded = this._db.Add(hospitalTimings);
            this.Commit();
            return;
        }

        public HospitalTimings GetHospitalTimings(int AddressId)
        {
            var timings =this._db.HospitalTimings.Where(hostime => hostime.DoctorAddressId == AddressId).SingleOrDefault();
            return timings;
        }

        public int Commit()
        {
            return this._db.SaveChanges();
        }
    }
}
