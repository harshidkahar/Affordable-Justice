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

	}
}
