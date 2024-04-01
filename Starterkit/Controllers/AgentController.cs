using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class AgentController : Controller
	{
		
		[HttpGet("AgentProfileOverview/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Agent/AgentProfileOverview.cshtml");
		}
		[HttpGet("AgentProfileSetting/")]
		public IActionResult AgentProfileSetting()
		{
			return View("Views/Pages/Agent/AgentProfileSetting.cshtml");
		}

		[HttpGet("RegisteredCaseList/")]
		public IActionResult RegisteredCaseList()
		{
			return View("Views/Pages/Agent/RegisteredCaseList.cshtml");
		}

		[HttpGet("AgentViewRegisteredCompanyList/")]
		public IActionResult AgentViewRegisteredCompanyList()
		{
			return View("Views/Pages/Agent/AgentViewRegisteredCompanyList.cshtml");
		}

		[HttpGet("RegisteredCaseDetails/")]
		public IActionResult RegisteredCaseDetails()
		{
			return View("Views/Pages/Agent/RegisteredCaseDetails.cshtml");
		}

		[HttpGet("RegisteredCompanyDetails/")]
		public IActionResult RegisteredCompanyDetails()
		{
			return View("Views/Pages/Agent/RegisteredCompanyDetails.cshtml");
		}

		[HttpGet("ViewPendingCaseList/")]
		public IActionResult ViewPendingCaseList()
		{
			return View("Views/Pages/Agent/ViewPendingCaseList.cshtml");
		}

	}
}
