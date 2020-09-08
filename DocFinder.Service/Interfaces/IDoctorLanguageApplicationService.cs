using System;
using System.Collections.Generic;
using System.Text;
using DocFinder.Domain.DTO;

namespace DocFinder.Service.Interfaces
{
    public interface IDoctorLanguageApplicationService
    {
        public void AddDoctorLanguages(IEnumerable<DoctorLanguagesForCreation> doctorLanguagesDTO, int doctorId);
    }
}
