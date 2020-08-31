using DocFinder.Domain;
using DocFinder.Service;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocFinder.Controllers
{
    [ApiController]
    [Route("Language")]
    public class LanguageController : ControllerBase
    {
        private ILanguageService _languageService { get; set; }
        
        public LanguageController(ILanguageService languageService)
        {
            this._languageService = languageService;
        }

        public ActionResult<IQueryable<Languages>> Get()
        {
          var languages = this._languageService.GetLanguages();
          return  Ok(languages);
        }
    }
}
