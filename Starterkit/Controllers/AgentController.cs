using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class AgentController : Controller
	{
		
		[HttpGet("agent/AgentProfileOverview/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Agent/AgentProfileOverview.cshtml");
		}
		[HttpGet("agent/AgentProfileSetting/")]
		public IActionResult AgentProfileSetting()
		{
			return View("Views/Pages/Agent/AgentProfileSetting.cshtml");
		}

		[HttpGet("agent/RegisteredCaseList/")]
		public IActionResult RegisteredCaseList()
		{
			return View("Views/Pages/Agent/RegisteredCaseList.cshtml");
		}

		[HttpGet("agent/AgentViewRegisteredCompanyList/")]
		public IActionResult AgentViewRegisteredCompanyList()
		{
			return View("Views/Pages/Agent/AgentViewRegisteredCompanyList.cshtml");
		}

		[HttpGet("agent/RegisteredCaseDetails/")]
		public IActionResult RegisteredCaseDetails()
		{
			return View("Views/Pages/Agent/RegisteredCaseDetails.cshtml");
		}

		[HttpGet("agent/RegisteredCompanyDetails/")]
		public IActionResult RegisteredCompanyDetails()
		{
			return View("Views/Pages/Agent/RegisteredCompanyDetails.cshtml");
		}

		[HttpGet("agent/ViewPendingCaseList/")]
		public IActionResult ViewPendingCaseList()
		{
			return View("Views/Pages/Agent/ViewPendingCaseList.cshtml");
		}

	}
}
