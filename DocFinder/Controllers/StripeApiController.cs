using DocFinder.Domain.DTO;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using System.Collections.Generic;

namespace DocFinder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StripeApiController : ControllerBase
    {
        private ILogger<StripeApiController> _logger { get; set; }

        private IDoctorApplicationService _doctorApplicationService { get; set; }
        public StripeApiController(ILogger<StripeApiController> logger, IDoctorApplicationService doctorApplicationService)
        {
            this._logger = logger;
            this._doctorApplicationService = doctorApplicationService;
        }

        [HttpGet]
        public ActionResult Get()
        {
            StripeConfiguration.ApiKey = "sk_test_51HfT5ZBZF2Gh46d9jSS3A7lFrQiEG4bkZxZQBzuMz4nSGt9paywOnzgDufaZHklnjty1MU9Z7QfpA9H21zkiJuhF00SHXrGOag";

            var options = new PaymentIntentCreateOptions
            {
                Amount = 1099,
                Currency = "usd",
                // Verify your integration in this guide by including this parameter
                Metadata = new Dictionary<string, string>
                    {{ "integration_check", "accept_a_payment" },}, };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);
            var intent = new { client_secret = paymentIntent.ClientSecret };
            string result = paymentIntent.ClientSecret;
            return new JsonResult(result);
        }

        [HttpPut]
        [Route("[action]")]
        public ActionResult Put(DoctorForRetrieving doctor) 
        {
            var doctorToReturn = this._doctorApplicationService.UpdateDoctorPaid(doctor.EmailAddress);
            return Ok(doctorToReturn);
        }
    }
}
