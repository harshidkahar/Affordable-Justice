using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;

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


        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateCustomer([FromBody] ProfileSetting updateCustomer)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CustomerLogic customerLogic = (CustomerLogic)LogicFactory.GetLogic(LogicType.Customer);
                CustomerProfileSettingModel profileUpdate = new CustomerProfileSettingModel();

                string customerGuidString = _contextAccessor.HttpContext.Session.GetString("CustomerGUID");
                Guid customerGuid = Guid.Parse(customerGuidString);
                profileUpdate.CustomerGUID = customerGuid;

                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                profileUpdate.UserId = userId;

                profileUpdate.FirstName = updateCustomer.FirstName?.Trim();
                profileUpdate.LastName = updateCustomer.LastName?.Trim();
                profileUpdate.Dob = updateCustomer.Dob;
                profileUpdate.Email = updateCustomer.Email?.Trim();
                profileUpdate.ContactNo = updateCustomer.ContactNo?.Trim();
                profileUpdate.CountryCode = updateCustomer.CountryCode?.Trim();
                profileUpdate.Address = updateCustomer.Address?.Trim();
                profileUpdate.Address_Flat = updateCustomer.Address_Flat?.Trim();
                profileUpdate.Address_Building = updateCustomer.Address_Building?.Trim();
                profileUpdate.Country = updateCustomer.Country?.Trim();
                profileUpdate.Nationality = updateCustomer.Nationality?.Trim();

                _Result = customerLogic.UpdateCustomer(profileUpdate);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
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
