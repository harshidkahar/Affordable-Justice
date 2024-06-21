using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Starterkit.Model;
using Starterkit.Web.Logic.Base;
using Starterkit.Web.Logic;

namespace Starterkit.Controllers
{
	public class AdminController : Controller
	{
        private readonly ILogger<AdminController> _logger;
        private readonly IKTTheme _theme;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _contextAccessor;

        public AdminController(ILogger<AdminController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _theme = theme;
            _env = env;
            _contextAccessor = contextAccessor;
        }

        [HttpGet("CreateAdmin/")]
		public IActionResult Index()
		{
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["AdminId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("AdminId", HttpContext.Request.Query["AdminId"].ToString());
                }
            }
            catch
            {
                _contextAccessor.HttpContext.Session.SetString("AdminId", "");
            }
            return View("Views/Pages/Admin/CreateAdmin.cshtml");
		}


        [AllowAnonymous]
        [HttpPost]
        public JsonResult CreateAdmin([FromBody] AdminUserModel registerAdmin)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AdminModel _createAdmin = new AdminModel();

                _createAdmin.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                _createAdmin.FirstName = registerAdmin.FirstName?.Trim();
                _createAdmin.LastName = registerAdmin.LastName?.Trim();
                _createAdmin.Phone = registerAdmin.Phone?.Trim();
                _createAdmin.CountryCode = registerAdmin.CountryCode?.Trim();
                _createAdmin.EmailId = registerAdmin.EmailId?.Trim();
                _createAdmin.Address = registerAdmin.Address?.Trim();
                _createAdmin.Country = registerAdmin.Country?.Trim();
                _createAdmin.Nationality = registerAdmin.Nationality?.Trim();
                _Result = adminLogic.AddAdmin(_createAdmin);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult CreateAgent([FromBody] AgentUserModel registerAgent)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AgentModel _createAgent = new AgentModel();

                _createAgent.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                _createAgent.FirstName = registerAgent.FirstName?.Trim();
                _createAgent.LastName = registerAgent.LastName?.Trim();
                _createAgent.Phone = registerAgent.Phone?.Trim();
                _createAgent.CountryCode = registerAgent.CountryCode?.Trim();
                _createAgent.EmailId = registerAgent.EmailId?.Trim();
                _createAgent.Address = registerAgent.Address?.Trim();
                _createAgent.Country = registerAgent.Country?.Trim();
                _createAgent.Nationality = registerAgent.Nationality?.Trim();
                _createAgent.Role = registerAgent.Role; 
                _Result = adminLogic.AddAgent(_createAgent);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult CreateLawyer([FromBody] LawyerUserModel registerLawyer)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                LawyerModel _createLawyer = new LawyerModel();

                _createLawyer.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                _createLawyer.FirstName = registerLawyer.FirstName?.Trim();
                _createLawyer.LastName = registerLawyer.LastName?.Trim();
                _createLawyer.LisenceNo = registerLawyer.LisenceNo?.Trim();
                _createLawyer.LawyerType = registerLawyer.LawyerType?.Trim();
                _createLawyer.Company = registerLawyer.Company?.Trim();
                _createLawyer.Phone = registerLawyer.Phone?.Trim();
                _createLawyer.CountryCode = registerLawyer.CountryCode?.Trim();
                _createLawyer.EmailId = registerLawyer.EmailId?.Trim();
                _createLawyer.Address = registerLawyer.Address?.Trim();
                _createLawyer.Country = registerLawyer.Country?.Trim();
                _createLawyer.Nationality = registerLawyer.Nationality?.Trim();
                _Result = adminLogic.AddLawyer(_createLawyer);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [HttpGet("ViewAdmin/")]
		public IActionResult ViewAdmin()
		{
			return View("Views/Pages/Admin/ViewAdmin.cshtml");
		}

		[HttpGet("UpdateAdmin/")]
		public IActionResult UpdateAdmin()
		{
			return View("Views/Pages/Admin/UpdateAdmin.cshtml");
		}

		[HttpGet("DeleteAdmin/")]
		public IActionResult DeleteAdmin()
		{
			return View("Views/Pages/Admin/DeleteAdmin.cshtml");
		}

		[HttpGet("CreateAgent/")]
		public IActionResult CreateAgent()
		{
			return View("Views/Pages/Admin/CreateAgent.cshtml");
		}

		[HttpGet("UpdateAgent/")]
		public IActionResult UpdateAgent()
		{
			return View("Views/Pages/Admin/UpdateAgent.cshtml");
		}

		[HttpGet("DeleteAgent/")]
		public IActionResult DeleteAgent()
		{
			return View("Views/Pages/Admin/DeleteAgent.cshtml");
		}

		[HttpGet("ViewAgent/")]
		public IActionResult ViewAgent()
		{
			return View("Views/Pages/Admin/ViewAgent.cshtml");
		}

		[HttpGet("CreateLawyer/")]
		public IActionResult CreateLawyer()
		{
			return View("Views/Pages/Admin/CreateLawyer.cshtml");
		}

		[HttpGet("ViewLawyer/")]
		public IActionResult ViewLawyer()
		{
			return View("Views/Pages/Admin/ViewLawyer.cshtml");
		}

		[HttpGet("UpdateLawyer/")]
		public IActionResult UpdateLawyer()
		{
			return View("Views/Pages/Admin/UpdateLawyer.cshtml");
		}

		[HttpGet("DeleteLawyer/")]
		public IActionResult DeleteLawyer()
		{
			return View("Views/Pages/Admin/DeleteLawyer.cshtml");
		}

        [HttpGet("ProfileOverview/")]
        public IActionResult ProfileOverview()
        {
            return View("Views/Pages/Admin/ProfileOverview.cshtml");
        }

        [HttpGet("ProfileSetting/")]
        public IActionResult ProfileSetting()
        {
            return View("Views/Pages/Admin/ProfileSetting.cshtml");
        }

		[HttpGet("CreateRole/")]
		public IActionResult CreateRole()
		{
			return View("Views/Pages/Admin/CreateRole.cshtml");
		}


		[HttpGet("ViewRole/")]
		public IActionResult ViewRole()
		{
			return View("Views/Pages/Admin/ViewRole.cshtml");
		}


		[HttpGet("RoleDetail/")]
		public IActionResult RoleDetail()
		{
			return View("Views/Pages/Admin/RoleDetail.cshtml");
		}

        [HttpGet("ViewCustomer/")]
        public IActionResult ViewCustomer()
        {
            return View("Views/Pages/Admin/ViewCustomer.cshtml");
        }

        [HttpGet("UpdateCustomer/")]
        public IActionResult UpdateCustomer()
        {
            return View("Views/Pages/Admin/UpdateCustomer.cshtml");
        }

        [HttpGet("DeleteCustomer/")]
        public IActionResult DeleteCustomer()
        {
            return View("Views/Pages/Admin/DeleteCustomer.cshtml");
        }



    }
}
