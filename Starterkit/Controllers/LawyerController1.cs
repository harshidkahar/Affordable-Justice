using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class LawyerController1 : Controller
	{
		[HttpGet("lawyerProfileOverview/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Lawyer/lawyerProfileOverview.cshtml");
		}
		[HttpGet("lawyerProfileSetting/")]
		public IActionResult lawyerProfileSetting()
		{
			return View("Views/Pages/Lawyer/lawyerProfileSetting.cshtml");
		}

		
		[HttpGet("ViewCases/")]
		public IActionResult ViewCases()
		{
			return View("Views/Pages/Lawyer/ViewCases.cshtml");
		}



		[HttpGet("lawyerCaseDetails/")]
		public IActionResult LawyerCaseDetails()
		{
			return View("Views/Pages/Lawyer/lawyerCaseDetails.cshtml");
		}

		[HttpGet("lawyerCompanyDetails/")]
		public IActionResult LawyerCompanyDetails()
		{
			return View("Views/Pages/Lawyer/lawyerCompanyDetails.cshtml");
		}


	}
}
