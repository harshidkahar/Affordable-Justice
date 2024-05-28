using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Web.Logic;

namespace Starterkit.Controllers
{
	public class AccountController : Controller
	{

        private readonly ILogger<AccountController> _logger;
        private readonly IKTTheme _theme;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _contextAccessor;

        public AccountController(ILogger<AccountController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _theme = theme;
            _env = env;
            _contextAccessor = contextAccessor;
        }


        [HttpGet("/overview")]
		public IActionResult Index()
		{
			return View("Views/Pages/Account/Overview.cshtml");
        }

        [HttpGet]
        public JsonResult profileoverview()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var profileoverview = _customerLogic.Overview(userId);

                var result = new { success = true, profileoverview };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve overview." };
                return Json(errorResult);
            }
        }


        [HttpGet("/settings")]
        public IActionResult Settings()
        {
            return View("Views/Pages/Account/Settings.cshtml");
        }

        [HttpGet]
        public JsonResult profilesetting()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var profilesetting = _customerLogic.Setting(userId);

                var result = new { success = true, profilesetting };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve overview." };
                return Json(errorResult);
            }
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
