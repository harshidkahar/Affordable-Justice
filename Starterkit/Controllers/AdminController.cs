using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class AdminController : Controller
	{

		[HttpGet("CreateAdmin/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Admin/CreateAdmin.cshtml");
		}

		[HttpGet("ViewAdmin/")]
		public IActionResult ViewAdmin()
		{
			return View("Views/Pages/Admin/ViewAdmin.cshtml");
		}

		[HttpGet("UpdateAdmin/")]
		public IActionResult UpdateAdmin()
		{
			return View("Views/Pages/Admin/UpdateAdmin.cshtml");
		}

		[HttpGet("DeleteAdmin/")]
		public IActionResult DeleteAdmin()
		{
			return View("Views/Pages/Admin/DeleteAdmin.cshtml");
		}
	}
}
