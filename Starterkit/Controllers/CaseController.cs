using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;
using System.Xml.Linq;

namespace Starterkit.Controllers
{
	public class CaseController : Controller
	{
        private readonly ILogger<CaseController> _logger;
        private readonly IKTTheme _theme;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _contextAccessor;

        public CaseController(ILogger<CaseController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _theme = theme;
            _env = env;
            _contextAccessor = contextAccessor;
        }

        [HttpGet("/createCase")]
		public IActionResult Index()
		{
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CaseId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CaseId", HttpContext.Request.Query["CaseId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CaseId", ""); 
            }
            return View("Views/Pages/Cases/CreateCase.cshtml");
        }

        [HttpGet("/viewCaseList")]
        public IActionResult ViewCaseList()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CaseId", "");
            }
            catch {  }
            return View("Views/Pages/Cases/ViewCaseList.cshtml");
        }
        [HttpGet("/uploadCaseDocuments")]
        public IActionResult UploadCaseDocuments()
        {
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CaseId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CaseId", HttpContext.Request.Query["CaseId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CaseId", ""); }
            return View("Views/Pages/Cases/UploadCaseDocuments.cshtml");
        }

        [HttpGet("/caseDetails")]
        public IActionResult CaseDetails()
        {
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CaseId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CaseId", HttpContext.Request.Query["CaseId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CaseId", ""); }
            return View("Views/Pages/Cases/caseDetails.cshtml");
        }

     
        [HttpGet("/viewCaseDocuments")]
        public IActionResult ViewCaseDocuments()
        {
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CaseId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CaseId", HttpContext.Request.Query["CaseId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CaseId", ""); }
            return View("Views/Pages/Cases/ViewCaseDocuments.cshtml");
        }

        [HttpGet("/addDocDescription")]
        public IActionResult ViewDocument()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("DocId", "");
            }
            catch { }
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["DocId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("DocId", HttpContext.Request.Query["DocId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("DocId", ""); }
            return View("Views/Pages/Cases/ViewDocument.cshtml");
        }

        [HttpGet("/createCompany")]
		public IActionResult createCompany()
		{
			return View("Views/Pages/Cases/createCompany.cshtml");
		}

        [HttpGet("/CompanyList")]
        public IActionResult CompanyList()
        {
            return View("Views/Pages/Cases/CompanyList.cshtml");
        }

        [HttpGet]
        public JsonResult GetCaseList()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CaseId", "");
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var caseList = _customerLogic.GetCaseList(userId);
                var result = new { success = true, caseList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve case list." };
                return Json(errorResult);
            }
        }


        [HttpGet]
        public JsonResult GetCompanyList()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var companyList = _customerLogic.GetCompanyList(userId);
                var result = new { success = true, companyList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company list." };
                return Json(errorResult);
            }
        }


        [HttpGet]
        public JsonResult GetDocumentList()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                int caseId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId")); // Replace with actual logic to fetch user ID
                var documentList = _customerLogic.GetDocumentList(userId,caseId);
                var result = new { success = true, documentList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve document list." };
                return Json(errorResult);
            }
        }



        [HttpGet]
        public JsonResult GetDocumentDetail()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                int caseId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId")); // Replace with actual logic to fetch user ID
                int docId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("DocId"));
                var documentDetail = _customerLogic.GetDocumentDescription(docId, userId, caseId);
                var result = new { success = true, documentDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve document Detail." };
                return Json(errorResult);
            }
        }


        [HttpGet]
        public JsonResult EditCase()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                int caseId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId")); // Replace with actual logic to fetch user ID
                var caseDetail = _customerLogic.GetCaseDetail(userId, caseId);

                var result = new { success = true, caseDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve case detail." };
                return Json(errorResult);
            }
        }

        [HttpGet]
        public JsonResult GetCaseDetail()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                int caseId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId")); // Replace with actual logic to fetch user ID
                var caseDetail = _customerLogic.GetCaseDetail(userId, caseId);

                var result = new { success = true, caseDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve case detail." };
                return Json(errorResult);
            }
        }

              
        [AllowAnonymous]
        [HttpPost]
        public JsonResult CreateCase([FromBody] InsertCaseModel registerCase)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CustomerLogic customerLogic = (CustomerLogic)LogicFactory.GetLogic(LogicType.Customer);
                CreateCaseModel _createCase = new CreateCaseModel();

                _createCase.UserId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                _createCase.PrimaryCaseType = registerCase.PrimaryCaseType?.Trim();
                _createCase.SecondaryCaseType = registerCase.SecondaryCaseType?.Trim();
                _createCase.ThirdCaseType = registerCase.ThirdCaseType?.Trim();
                _createCase.whichCourt = registerCase.whichCourt?.Trim();
                _createCase.opname = registerCase.opname?.Trim();
                _createCase.opmail = registerCase.opmail?.Trim();
                _createCase.opmob = registerCase.opmob?.Trim();
                _createCase.emrid = registerCase.emrid?.Trim();
                _createCase.passno = registerCase.passno?.Trim();
                _createCase.cdesc = registerCase.cdesc?.Trim();
                _createCase.CurrentCaseNo = registerCase.CurrentCaseNo?.Trim();
                _createCase.PreviousCaseNo = registerCase.PreviousCaseNo?.Trim();
                _createCase.ProceedingYet = registerCase.ProceedingYet;
                   
                _createCase.LegalAdviceInferred = registerCase.LegalAdviceInferred;
               
                if (registerCase.DateCommenced != null)
                {
                    _createCase.DateCommenced = registerCase.DateCommenced;
                }


                //_Customer.SponsorId = register.SponsorId;
                //_Customer.FirstName = !string.IsNullOrEmpty(register.FirstName) ? register.FirstName.Trim() : register.FirstName;
                //_Customer.LastName = !string.IsNullOrEmpty(register.LastName) ? register.LastName.Trim() : register.LastName;
                //_Customer.Email = !string.IsNullOrEmpty(register.Email) ? register.Email.Trim() : register.Email;
                //_Customer.ContactNo = !string.IsNullOrEmpty(register.ContactNo) ? register.ContactNo.Trim() : register.ContactNo;
                //_Customer.IsActive = _Customer.IsActive.HasValue ? _Customer.IsActive.Value : false;
                //_Customer.CustomerGUID = System.Guid.NewGuid();

                _createCase.Opt = "I";
                _Result = customerLogic.CreateCase(_createCase);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            } 
        }

      
        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateDescription([FromBody] DocumentDetailModel documentUpdate)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CustomerLogic customerLogic = (CustomerLogic)LogicFactory.GetLogic(LogicType.Customer);
                UserDocumentModel updateDescription = new UserDocumentModel();
                updateDescription.Id= Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("DocId"));
                updateDescription.UserId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateDescription.CaseKey = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId"));
                updateDescription.DocName = documentUpdate.DocName?.Trim();
                updateDescription.Description = documentUpdate.Description.ToString();
                updateDescription.DocumentUrl = "";
                updateDescription.Size = "";
                updateDescription.FileName = "";
                updateDescription.Opt = "U";
                _Result = customerLogic.DocumentDetail(updateDescription);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult EditCase([FromBody] UpdateCaseModel UpdateCase)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CustomerLogic customerLogic = (CustomerLogic)LogicFactory.GetLogic(LogicType.Customer);
                CaseUpdateModel updateCreatecase = new CaseUpdateModel();

                // Retrieving session data
                int caseId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CaseId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));

                // Updating the updateCreatecase object with session data and request data
                // Updating the updateCreatecase object with session data and request data
                updateCreatecase.CaseKey = caseId;
                //updateCreatecase.UserId = userId;
                updateCreatecase.PrimaryCaseType = UpdateCase.PrimaryCaseType?.Trim();
                updateCreatecase.SecondaryCaseType = UpdateCase.SecondaryCaseType?.Trim();
                updateCreatecase.ThirdCaseType = UpdateCase.ThirdCaseType?.Trim();
                updateCreatecase.ProceedingYet = UpdateCase.ProceedingYet;
                //updateCreatecase.DateCommenced = UpdateCase.DateCommenced;
                updateCreatecase.PreviousCaseNo = UpdateCase.PreviousCaseNo?.Trim();
                updateCreatecase.CurrentCaseNo = UpdateCase.CurrentCaseNo?.Trim();
                updateCreatecase.LegalAdviceInferred = UpdateCase.LegalAdviceInferred;
                updateCreatecase.whichCourt = UpdateCase.whichCourt?.Trim();
                updateCreatecase.opname = UpdateCase.opname?.Trim();
                updateCreatecase.opmail = UpdateCase.opmail?.Trim();
                updateCreatecase.opmob = UpdateCase.opmob?.Trim();
                updateCreatecase.emrid = UpdateCase.emrid?.Trim();
                updateCreatecase.passno = UpdateCase.passno?.Trim();
                updateCreatecase.cdesc = UpdateCase.cdesc?.Trim();

                if (UpdateCase.DateCommenced != null)
                {
                    updateCreatecase.DateCommenced = UpdateCase.DateCommenced;
                }

                _Result = customerLogic.CaseEdit(updateCreatecase);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }




    }
}
