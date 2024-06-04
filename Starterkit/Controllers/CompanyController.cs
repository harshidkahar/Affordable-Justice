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
				_contextAccessor.HttpContext.Session.SetString("CompId", _Result);
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


        //Update Starts From Here

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter1Company([FromBody] companyInputParameterForm1Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();

             
                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.ApplicationType = editCompany.ApplicationType?.Trim();
                updateCompany.Opt = "A";
                
                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter2Company([FromBody] companyInputParameterForm2Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.CompanyType = editCompany.CompanyType?.Trim();
                updateCompany.Opt = "B";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter3Company([FromBody] companyInputParameterForm3Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.BusinessCity = editCompany.City?.Trim();
                updateCompany.BusinessLocation = editCompany.Location?.Trim();
                updateCompany.Opt = "C";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter4Company([FromBody] companyInputParameterForm4Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.BusinessCategory = editCompany.BusinessCategory?.Trim();
                updateCompany.Opt = "D";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter5Company([FromBody] companyInputParameterForm5Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.NoOfResidentVisa = editCompany.visaresidence;
                updateCompany.Opt = "E";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter6Company([FromBody] companyInputParameterForm6Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.DependentVisaReq = editCompany.Depvisa;
                updateCompany.Opt = "F";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter7Company([FromBody] companyInputParameterForm7Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.OfficeType = editCompany.officetype;
                updateCompany.YourOfficeType = editCompany.yourofficetype;
                updateCompany.Opt = "G";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter8Company([FromBody] companyInputParameterForm8Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.StartBusiness = editCompany.businessPlan?.Trim();
                updateCompany.Opt = "H";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter9Company([FromBody] companyInputParameterForm9Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.HasBusinessName = editCompany.businessname;
                updateCompany.BusinessNameOption = editCompany.concatenatedNames?.Trim();
                updateCompany.Opt = "J";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter10Company([FromBody] companyInputParameterForm10Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.NeedAssistanceOn = editCompany.service?.Trim();
                updateCompany.Opt = "K";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter11Company([FromBody] companyInputParameterForm11Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.FirstName = editCompany.firstname?.Trim();
                updateCompany.LastName = editCompany.lastname?.Trim();
                updateCompany.EmailId = editCompany.emailId?.Trim();
                updateCompany.CountryCode = editCompany.countryCode?.Trim();
                updateCompany.Phone = editCompany.phone?.Trim();
                updateCompany.CAddress = editCompany.CurrentAddress?.Trim();
                updateCompany.RAddress = editCompany.ResidenceAddress?.Trim();
                updateCompany.Country = editCompany.country?.Trim();
                updateCompany.Nationality = editCompany.nationality?.Trim();
                updateCompany.Opt = "L";



                _Result = companyLogic.EditCompany(updateCompany);

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
