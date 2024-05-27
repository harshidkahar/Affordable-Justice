using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Web.Logic;

namespace Starterkit.Controllers
{
	public class AccountController : Controller
	{
       
      
        [HttpGet("/overview")]
		public IActionResult Index()
		{
			return View("Views/Pages/Account/Overview.cshtml");
        }
        [HttpGet("/settings")]
        public IActionResult Settings()
        {
            return View("Views/Pages/Account/Settings.cshtml");
        }
        [HttpGet("/billing")]
        public IActionResult Billing()
        {
            return View("Views/Pages/Account/Billing.cshtml");
        }
        [HttpGet("/statements")]
        public IActionResult Statements()
        {
            return View("Views/Pages/Account/Statements.cshtml");
        }
        [HttpGet("/referrals")]
        public IActionResult Referrals()
        {
            return View("Views/Pages/Account/Referrals.cshtml");
        }
        [HttpGet("/kyc")]
        public IActionResult KYC()
        {
            return View("Views/Pages/Account/KYC.cshtml");
        }
        [HttpGet("/changeEmail")]
        public IActionResult ChangeEmail()
        {
            return View("Views/Pages/Account/ChangeEmail.cshtml");
        }
    }
}
