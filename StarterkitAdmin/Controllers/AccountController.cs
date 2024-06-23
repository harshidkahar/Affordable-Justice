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


      
        [HttpGet("AdminProfileOverview/")]
        public IActionResult ProfileOverview()
        {
            return View("Views/Pages/Account/Overview.cshtml");
        }


        [HttpGet]
        public JsonResult profileoverview()
        {
            try
            {
                AdminLogic _customerLogic = new AdminLogic();
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

        [HttpGet("AdminProfileSetting/")]
        public IActionResult ProfileSetting()
        {
            return View("Views/Pages/Account/Settings.cshtml");
        }

        
        [HttpGet]
        public JsonResult Adminprofilesetting()
        {
            try
            {
                AdminLogic _adminLogic = new AdminLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var adminprofilesetting = _adminLogic.Setting(userId);

                var result = new { success = true, adminprofilesetting };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve ssetting." };
                return Json(errorResult);
            }
        }


        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateAdminProfile([FromBody] AdminProfileSetting updateCustomer)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic customerLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AdminProfileSettingModel profileUpdate = new AdminProfileSettingModel();

                
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                profileUpdate.UserId = userId;

                profileUpdate.FirstName = updateCustomer.FirstName?.Trim();
                profileUpdate.LastName = updateCustomer.LastName?.Trim();
                profileUpdate.DateOfBirth = updateCustomer.DateOfBirth?.Trim();
                profileUpdate.EmailId = updateCustomer.EmailId?.Trim();
                profileUpdate.Phone = updateCustomer.Phone?.Trim();
                profileUpdate.CountryCode = updateCustomer.CountryCode?.Trim();
                profileUpdate.Address = updateCustomer.Address?.Trim();
                profileUpdate.Address_Flat = updateCustomer.Address_Flat?.Trim();
                profileUpdate.Address_Building = updateCustomer.Address_Building?.Trim();
                profileUpdate.Country = updateCustomer.Country?.Trim();
                profileUpdate.Nationality = updateCustomer.Nationality?.Trim();
                profileUpdate.Username = updateCustomer.Username?.Trim();
                profileUpdate.Watchword = updateCustomer.Watchword?.Trim();

                _Result = customerLogic.UpdateAdminProfile(profileUpdate);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }



        [HttpGet("/changeEmail")]
        public IActionResult ChangeEmail()
        {
            return View("Views/Pages/Account/ChangeEmail.cshtml");
        }

      

    }
}
