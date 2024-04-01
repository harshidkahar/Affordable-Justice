using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class LawyerController1 : Controller
	{
		[HttpGet("lawyer/lawyerProfileOverview/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Lawyer/lawyerProfileOverview.cshtml");
		}
		[HttpGet("lawyer/lawyerProfileSetting/")]
		public IActionResult lawyerProfileSetting()
		{
			return View("Views/Pages/Lawyer/lawyerProfileSetting.cshtml");
		}

		
		[HttpGet("lawyer/ViewCases/")]
		public IActionResult ViewCases()
		{
			return View("Views/Pages/Lawyer/ViewCases.cshtml");
		}



		[HttpGet("lawyer/lawyerCaseDetails/")]
		public IActionResult LawyerCaseDetails()
		{
			return View("Views/Pages/Lawyer/lawyerCaseDetails.cshtml");
		}

		[HttpGet("lawyer/lawyerCompanyDetails/")]
		public IActionResult LawyerCompanyDetails()
		{
			return View("Views/Pages/Lawyer/lawyerCompanyDetails.cshtml");
		}


	}
}
