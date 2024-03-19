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
            return View("Views/Pages/Cases/_UploadCaseDocuments.cshtml");
        }
    }
}
