using Microsoft.AspNetCore.Mvc;

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
	}
}
