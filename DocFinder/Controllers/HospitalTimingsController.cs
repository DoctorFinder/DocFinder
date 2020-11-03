using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.DTO;
using DocFinder.Domain.ServiceResponse;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;


namespace DocFinder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalTimingsController : ControllerBase
    {

        private ILogger<HospitalTimingsController> _logger { get; set; }

        private IHospitalTimingsApplicationService _hospitalTimingsApplicationService { get; set; }


        public HospitalTimingsController(ILogger<HospitalTimingsController> logger, IHospitalTimingsApplicationService hospitalTimingsApplicationService) 
        {
            this._logger = logger;
            this._hospitalTimingsApplicationService = hospitalTimingsApplicationService;
        }

        [HttpGet]
        public ActionResult Get(int addressId)
        {
            var hospitalTimings = this._hospitalTimingsApplicationService.GetHospitalTimings(addressId);
            return Ok(hospitalTimings);
        }
    }
}
