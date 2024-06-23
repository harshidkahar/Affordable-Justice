using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;

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
                _createAdmin.DateOfBirth = registerAdmin.DateOfBirth?.Trim();
                _createAdmin.Phone = registerAdmin.Phone?.Trim();
                _createAdmin.CountryCode = registerAdmin.CountryCode?.Trim();
                _createAdmin.EmailId = registerAdmin.EmailId?.Trim();
                _createAdmin.Address = registerAdmin.Address?.Trim();
                _createAdmin.Country = registerAdmin.Country?.Trim();
                _createAdmin.Nationality = registerAdmin.Nationality?.Trim();
                _createAdmin.Opt = "I";
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
                _createAgent.DateOfBirth = registerAgent.DateOfBirth?.Trim();
                _createAgent.Phone = registerAgent.Phone?.Trim();
                _createAgent.CountryCode = registerAgent.CountryCode?.Trim();
                _createAgent.EmailId = registerAgent.EmailId?.Trim();
                _createAgent.Address = registerAgent.Address?.Trim();
                _createAgent.Country = registerAgent.Country?.Trim();
                _createAgent.Nationality = registerAgent.Nationality?.Trim();
                _createAgent.Role = registerAgent.Role;
                _createAgent.Opt = "I";
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
                _createLawyer.DateOfBirth = registerLawyer.DateOfBirth?.Trim();
                _createLawyer.Phone = registerLawyer.Phone?.Trim();
                _createLawyer.CountryCode = registerLawyer.CountryCode?.Trim();
                _createLawyer.EmailId = registerLawyer.EmailId?.Trim();
                _createLawyer.Address = registerLawyer.Address?.Trim();
                _createLawyer.Country = registerLawyer.Country?.Trim();
                _createLawyer.Nationality = registerLawyer.Nationality?.Trim();
                _createLawyer.Opt = "I";
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

        [HttpGet]
        public JsonResult GetAdminList()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("AdminId", "");
                AdminLogic _adminLogic = new AdminLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var adminList = _adminLogic.GetAdminList(userId);
                var result = new { success = true, adminList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve admin list." };
                return Json(errorResult);
            }
        }

       
		[HttpGet]
		public JsonResult GetAdminDetail(AdminIdRequestModel model)
		{
			try
			{
				AdminLogic _adminLogic = new AdminLogic();
				var adminDetail = _adminLogic.GetAdminDetail(model.Id);

				var result = new { success = true, adminDetail };
				return Json(result);
			}
			catch (Exception ex)
			{
				var errorResult = new { success = false, message = "Failed to retrieve admin detail." };
				return Json(errorResult);
			}
		}


		[HttpGet("UpdateAdmin/")]
		public IActionResult UpdateAdmin()
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

			return View("Views/Pages/Admin/UpdateAdmin.cshtml");
		}

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateAdmin([FromBody] AdminUserModel updateAdmin)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AdminModel _updateAdmin = new AdminModel();

                _updateAdmin.Id =updateAdmin.Id;
                _updateAdmin.FirstName = updateAdmin.FirstName?.Trim();
                _updateAdmin.LastName = updateAdmin.LastName?.Trim();
                _updateAdmin.DateOfBirth = updateAdmin.DateOfBirth?.Trim();
                _updateAdmin.Phone = updateAdmin.Phone?.Trim();
                _updateAdmin.CountryCode = updateAdmin.CountryCode?.Trim();
                _updateAdmin.EmailId = updateAdmin.EmailId?.Trim();
                _updateAdmin.Address = updateAdmin.Address?.Trim();
                _updateAdmin.Country = updateAdmin.Country?.Trim();
                _updateAdmin.Nationality = updateAdmin.Nationality?.Trim();
                _updateAdmin.Opt = "U";
                _Result = adminLogic.UpdateAdmin(_updateAdmin);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        public JsonResult DeleteAdmin([FromBody] AdminUserModel deleteAdmin)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AdminModel _deleteAdmin = new AdminModel();

                _deleteAdmin.Id = deleteAdmin.Id;
                _deleteAdmin.FirstName = deleteAdmin.FirstName?.Trim();
                _deleteAdmin.LastName = deleteAdmin.LastName?.Trim();
                _deleteAdmin.Phone = deleteAdmin.Phone?.Trim();
                _deleteAdmin.DateOfBirth = deleteAdmin.DateOfBirth?.Trim();
                _deleteAdmin.CountryCode = deleteAdmin.CountryCode?.Trim();
                _deleteAdmin.EmailId = deleteAdmin.EmailId?.Trim();
                _deleteAdmin.Address = deleteAdmin.Address?.Trim();
                _deleteAdmin.Country = deleteAdmin.Country?.Trim();
                _deleteAdmin.Nationality = deleteAdmin.Nationality?.Trim();
                _deleteAdmin.Opt = "D";
                _Result = adminLogic.DeleteAdmin(_deleteAdmin);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [HttpGet("DeleteAdmin/")]
		public IActionResult DeleteAdmin()
		{
			return View("Views/Pages/Admin/DeleteAdmin.cshtml");
		}

		[HttpGet("CreateAgent/")]
		public IActionResult CreateAgent()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["AgentId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("AgentId", HttpContext.Request.Query["AgentId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("AgentId", "");
			}

			return View("Views/Pages/Admin/CreateAgent.cshtml");
		}

		[HttpGet("UpdateAgent/")]
		public IActionResult UpdateAgent()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["AgentId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("AgentId", HttpContext.Request.Query["AgentId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("AgentId", "");
			}
			return View("Views/Pages/Admin/UpdateAgent.cshtml");
		}

		[HttpGet("DeleteAgent/")]
		public IActionResult DeleteAgent()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["AgentId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("AgentId", HttpContext.Request.Query["AgentId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("AgentId", "");
			}
			return View("Views/Pages/Admin/DeleteAgent.cshtml");
		}

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateAgent([FromBody] AgentUserModel updateAgent)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AgentModel _updateAgent = new AgentModel();

                _updateAgent.Id = updateAgent.Id;
                _updateAgent.FirstName = updateAgent.FirstName?.Trim();
                _updateAgent.LastName = updateAgent.LastName?.Trim();
                _updateAgent.Phone = updateAgent.Phone?.Trim();
                _updateAgent.DateOfBirth = updateAgent.DateOfBirth?.Trim();
                _updateAgent.CountryCode = updateAgent.CountryCode?.Trim();
                _updateAgent.EmailId = updateAgent.EmailId?.Trim();
                _updateAgent.Address = updateAgent.Address?.Trim();
                _updateAgent.Country = updateAgent.Country?.Trim();
                _updateAgent.Nationality = updateAgent.Nationality?.Trim();
                _updateAgent.Role = updateAgent.Role;
                _updateAgent.Opt = "U";
                _Result = adminLogic.UpdateAgent(_updateAgent);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        public JsonResult DeleteAgent([FromBody] AgentUserModel deleteAgent)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                AgentModel _deleteAgent = new AgentModel();

                _deleteAgent.Id = deleteAgent.Id;
				_deleteAgent.FirstName = deleteAgent.FirstName?.Trim();
				_deleteAgent.LastName = deleteAgent.LastName?.Trim();
				_deleteAgent.Phone = deleteAgent.Phone?.Trim();
				_deleteAgent.CountryCode = deleteAgent.CountryCode?.Trim();
				_deleteAgent.EmailId = deleteAgent.EmailId?.Trim();
				_deleteAgent.Address = deleteAgent.Address?.Trim();
				_deleteAgent.Country = deleteAgent.Country?.Trim();
				_deleteAgent.Nationality = deleteAgent.Nationality?.Trim();
				_deleteAgent.Role = deleteAgent.Role;
                _deleteAgent.Opt = "D";
                _Result = adminLogic.DeleteAgent(_deleteAgent);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [HttpGet("ViewAgent/")]
		public IActionResult ViewAgent()
		{
			return View("Views/Pages/Admin/ViewAgent.cshtml");
		}

        [HttpGet]
        public JsonResult GetAgentList()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("AgentId", "");
                AdminLogic _adminLogic = new AdminLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var agentList = _adminLogic.GetAgentList(userId);
                var result = new { success = true, agentList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve agent list." };
                return Json(errorResult);
            }
        }


     
		[HttpGet]
		public JsonResult GetAgentDetail(AgentIdRequestModel model)
		{
			try
			{
				AdminLogic _adminLogic = new AdminLogic();
				var agentDetail = _adminLogic.GetAgentDetail(model.Id);

				var result = new { success = true, agentDetail };
				return Json(result);
			}
			catch (Exception ex)
			{
				var errorResult = new { success = false, message = "Failed to retrieve agent detail." };
				return Json(errorResult);
			}
		}


		[HttpGet("CreateLawyer/")]
		public IActionResult CreateLawyer()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["LawyerId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("LawyerId", HttpContext.Request.Query["LawyerId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("LawyerId", "");
			}

			return View("Views/Pages/Admin/CreateLawyer.cshtml");
		}

		[HttpGet("ViewLawyer/")]
		public IActionResult ViewLawyer()
		{
			return View("Views/Pages/Admin/ViewLawyer.cshtml");
		}

        [HttpGet]
        public JsonResult GetLawyerList()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("LawyerId", "");
                AdminLogic _adminLogic = new AdminLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var lawyerList = _adminLogic.GetLawyerList(userId);
                var result = new { success = true, lawyerList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve lawyer list." };
                return Json(errorResult);
            }
        }

      
		[HttpGet]
		public JsonResult GetLawyerDetail(LawyerIdRequestModel model)
		{
			try
			{
				AdminLogic _adminLogic = new AdminLogic();
				var lawyerDetail = _adminLogic.GetLawyerDetail(model.Id);

				var result = new { success = true, lawyerDetail };
				return Json(result);
			}
			catch (Exception ex)
			{
				var errorResult = new { success = false, message = "Failed to retrieve lawyer detail." };
				return Json(errorResult);
			}
		}





		[HttpGet("UpdateLawyer/")]
		public IActionResult UpdateLawyer()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["LawyerId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("LawyerId", HttpContext.Request.Query["LawyerId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("LawyerId", "");
			}
			return View("Views/Pages/Admin/UpdateLawyer.cshtml");
		}

		[HttpGet("DeleteLawyer/")]
		public IActionResult DeleteLawyer()
		{
			try
			{
				if (!String.IsNullOrEmpty(HttpContext.Request.Query["LawyerId"]))
				{
					_contextAccessor.HttpContext.Session.SetString("LawyerId", HttpContext.Request.Query["LawyerId"].ToString());
				}
			}
			catch
			{
				_contextAccessor.HttpContext.Session.SetString("LawyerId", "");
			}
			return View("Views/Pages/Admin/DeleteLawyer.cshtml");
		}

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateLawyer([FromBody] LawyerUserModel updateLawyer)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                LawyerModel _updateLawyer = new LawyerModel();

                _updateLawyer.Id =updateLawyer.Id;
                _updateLawyer.FirstName = updateLawyer.FirstName?.Trim();
                _updateLawyer.LastName = updateLawyer.LastName?.Trim();
                _updateLawyer.LisenceNo = updateLawyer.LisenceNo?.Trim();
                _updateLawyer.LawyerType = updateLawyer.LawyerType?.Trim();
                _updateLawyer.DateOfBirth = updateLawyer.DateOfBirth?.Trim();
                _updateLawyer.Company = updateLawyer.Company?.Trim();
                _updateLawyer.Phone = updateLawyer.Phone?.Trim();
                _updateLawyer.CountryCode = updateLawyer.CountryCode?.Trim();
                _updateLawyer.EmailId = updateLawyer.EmailId?.Trim();
                _updateLawyer.Address = updateLawyer.Address?.Trim();
                _updateLawyer.Country = updateLawyer.Country?.Trim();
                _updateLawyer.Nationality = updateLawyer.Nationality?.Trim();
                _updateLawyer.Opt = "U";
                _Result = adminLogic.UpdateLawyer(_updateLawyer);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        public JsonResult DeleteLawyer([FromBody] LawyerUserModel deleteLawyer)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                AdminLogic adminLogic = (AdminLogic)LogicFactory.GetLogic(LogicType.AdminLogic);
                LawyerModel _deleteLawyer = new LawyerModel();

                _deleteLawyer.Id = deleteLawyer.Id;
                _deleteLawyer.FirstName = deleteLawyer.FirstName?.Trim();
                _deleteLawyer.LastName = deleteLawyer.LastName?.Trim();
                _deleteLawyer.Phone = deleteLawyer.Phone?.Trim();
                _deleteLawyer.DateOfBirth = deleteLawyer.DateOfBirth?.Trim();
                _deleteLawyer.CountryCode = deleteLawyer.CountryCode?.Trim();
                _deleteLawyer.LisenceNo = deleteLawyer.LisenceNo?.Trim();
                _deleteLawyer.LawyerType = deleteLawyer.LawyerType?.Trim();
                _deleteLawyer.Company = deleteLawyer.Company?.Trim();
                _deleteLawyer.EmailId = deleteLawyer.EmailId?.Trim();
                _deleteLawyer.Address = deleteLawyer.Address?.Trim();
                _deleteLawyer.Country = deleteLawyer.Country?.Trim();
                _deleteLawyer.Nationality = deleteLawyer.Nationality?.Trim();
                _deleteLawyer.Opt = "D";
                _Result = adminLogic.DeleteLawyer(_deleteLawyer);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
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
