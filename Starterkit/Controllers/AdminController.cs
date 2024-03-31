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

		[HttpGet("admin/CreateAgent/")]
		public IActionResult CreateAgent()
		{
			return View("Views/Pages/Admin/CreateAgent.cshtml");
		}

		[HttpGet("admin/UpdateAgent/")]
		public IActionResult UpdateAgent()
		{
			return View("Views/Pages/Admin/UpdateAgent.cshtml");
		}

		[HttpGet("admin/DeleteAgent/")]
		public IActionResult DeleteAgent()
		{
			return View("Views/Pages/Admin/DeleteAgent.cshtml");
		}

		[HttpGet("admin/ViewAgent/")]
		public IActionResult ViewAgent()
		{
			return View("Views/Pages/Admin/ViewAgent.cshtml");
		}

		[HttpGet("admin/CreateLawyer/")]
		public IActionResult CreateLawyer()
		{
			return View("Views/Pages/Admin/CreateLawyer.cshtml");
		}

		[HttpGet("admin/ViewLawyer/")]
		public IActionResult ViewLawyer()
		{
			return View("Views/Pages/Admin/ViewLawyer.cshtml");
		}

		[HttpGet("admin/UpdateLawyer/")]
		public IActionResult UpdateLawyer()
		{
			return View("Views/Pages/Admin/UpdateLawyer.cshtml");
		}

		[HttpGet("admin/DeleteLawyer/")]
		public IActionResult DeleteLawyer()
		{
			return View("Views/Pages/Admin/DeleteLawyer.cshtml");
		}

	}
}
