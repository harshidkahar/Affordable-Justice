using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Models.Company;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;
using System.Xml.Linq;

namespace Starterkit.Controllers
{
	public class CompanyController : Controller
	{
        private readonly ILogger<CompanyController> _logger;
        private readonly IKTTheme _theme;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _contextAccessor;

        public CompanyController(ILogger<CompanyController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _theme = theme;
            _env = env;
            _contextAccessor = contextAccessor;
        }

       
        [HttpGet("/createCompany")]
		public IActionResult createCompany()
		{
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CompId", "");
            }
            catch { }
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CompId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CompId", HttpContext.Request.Query["CompId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CompId", ""); }

            return View("Views/Pages/Company/createCompany.cshtml");
		}

        [HttpGet("/CompanyList")]
        public IActionResult CompanyList()
        {
            return View("Views/Pages/Company/CompanyList.cshtml");
        }

        
        [HttpGet]
        public JsonResult GetCompanyList()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var companyList = _companyLogic.GetCompanyList(userId);
                var result = new { success = true, companyList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company list." };
                return Json(errorResult);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public JsonResult InsertCompany([FromBody] companyInsertModel insertcompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel Company = new CreateCompanyModel();


                Company.UserId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                Company.ApplicationType=insertcompany.ApplicationType?.Trim();
                Company.CompanyType=insertcompany.CompanyType?.Trim();
                Company.BusinessCity=insertcompany.City?.Trim();
                Company.BusinessLocation=insertcompany.Location?.Trim();
                
                
                Company.Opt = "I";
                _Result = companyLogic.CreateCompany(Company);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }




        [AllowAnonymous]
		[HttpGet]
		public JsonResult GetCompanyId()
		{
			try
			{				
				string _Result = string.Empty;
				
				_Result = _contextAccessor.HttpContext.Session.GetString("CompId");

				return Json(_Result);
			}
			catch
			{
				return Json("error");
			}
		}

		[AllowAnonymous]
        [HttpPost]
        public JsonResult AddDependent([FromBody] DependentModel insertDependent)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                InsertDependentModel addDependent = new InsertDependentModel();
                addDependent.UserId= Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                addDependent.CompKey = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                addDependent.dependvisaName= insertDependent.dependvisaName?.Trim();
                addDependent.dependvisaEmail= insertDependent.dependvisaEmail?.Trim();
                addDependent.dependvisaDOB= insertDependent.dependvisaDOB;
                addDependent.dependvisaPasspno= insertDependent.dependvisaPasspno?.Trim();
                addDependent.dependvisaAddress= insertDependent.dependvisaAddress?.Trim();
                addDependent.dependvisacountry= insertDependent.dependvisacountry?.Trim();
                addDependent.dependvisanationality= insertDependent.dependvisanationality?.Trim();

                
                addDependent.Opt = "I";
                _Result = companyLogic.InsertDependent(addDependent);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }





    }
}
