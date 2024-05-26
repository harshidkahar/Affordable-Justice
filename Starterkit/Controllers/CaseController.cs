using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Model;
using Starterkit.Web.Logic;

namespace Starterkit.Controllers
{
	public class CaseController : Controller
	{
		[HttpGet("createCase/")]
		public IActionResult Index()
		{
            return View("Views/Pages/Cases/CreateCase.cshtml");
        }
        [HttpGet("viewCaseList/")]
        public IActionResult ViewCaseList()
        {
            return View("Views/Pages/Cases/ViewCaseList.cshtml");
        }
        [HttpGet("uploadCaseDocuments/")]
        public IActionResult UploadCaseDocuments()
        {
            return View("Views/Pages/Cases/UploadCaseDocuments.cshtml");
        }

        [HttpGet("caseDetails/")]
        public IActionResult CaseDetails()
        {
            return View("Views/Pages/Cases/caseDetails.cshtml");
        }

        [HttpGet("viewCaseDocuments/")]
        public IActionResult ViewCaseDocuments()
        {
            return View("Views/Pages/Cases/ViewCaseDocuments.cshtml");
        }

        [HttpGet("addDocDescription/")]
        public IActionResult ViewDocument()
        {
            return View("Views/Pages/Cases/ViewDocument.cshtml");
        }

        [HttpGet("createCompany/")]
		public IActionResult createCompany()
		{
			return View("Views/Pages/Cases/createCompany.cshtml");
		}

        [HttpGet("CompanyList/")]
        public IActionResult CompanyList()
        {
            return View("Views/Pages/Cases/CompanyList.cshtml");
        }

        [HttpGet]
        public JsonResult GetCaseList()
        {
            try
            {
                CustomerLogic _customerLogic = new CustomerLogic();
                int userId = 17; // Replace with actual logic to fetch user ID
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

    }
}
