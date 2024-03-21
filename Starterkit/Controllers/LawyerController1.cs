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

		[HttpGet("lawyerAssignedCases/")]
		public IActionResult LawyerAssignedCases()
		{
			return View("Views/Pages/Lawyer/lawyerAssignedCases.cshtml");
		}

		[HttpGet("lawyerCaseDetails/")]
		public IActionResult LawyerCaseDetails()
		{
			return View("Views/Pages/Lawyer/lawyerCaseDetails.cshtml");
		}

	}
}
