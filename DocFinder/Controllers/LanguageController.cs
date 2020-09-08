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
        private ILanguageApplicationService _languageApplicationService { get; set; }
        
        public LanguageController(ILanguageApplicationService languageApplicationService)
        {
            this._languageApplicationService = languageApplicationService;
        }

        public ActionResult<IQueryable<Languages>> Get()
        {
          var languages = this._languageApplicationService.GetLanguages();
          return  Ok(languages);
        }
    }
}
