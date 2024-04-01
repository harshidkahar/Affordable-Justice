using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
	public class AdminController : Controller
	{

		[HttpGet("admin/CreateAdmin/")]
		public IActionResult Index()
		{
			return View("Views/Pages/Admin/CreateAdmin.cshtml");
		}

		[HttpGet("admin/ViewAdmin/")]
		public IActionResult ViewAdmin()
		{
			return View("Views/Pages/Admin/ViewAdmin.cshtml");
		}

		[HttpGet("admin/UpdateAdmin/")]
		public IActionResult UpdateAdmin()
		{
			return View("Views/Pages/Admin/UpdateAdmin.cshtml");
		}

		[HttpGet("admin/DeleteAdmin/")]
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

        [HttpGet("admin/ProfileOverview/")]
        public IActionResult ProfileOverview()
        {
            return View("Views/Pages/Admin/ProfileOverview.cshtml");
        }

        [HttpGet("admin/ProfileSetting/")]
        public IActionResult ProfileSetting()
        {
            return View("Views/Pages/Admin/ProfileSetting.cshtml");
        }

		[HttpGet("admin/CreateRole/")]
		public IActionResult CreateRole()
		{
			return View("Views/Pages/Admin/CreateRole.cshtml");
		}


		[HttpGet("admin/ViewRole/")]
		public IActionResult ViewRole()
		{
			return View("Views/Pages/Admin/ViewRole.cshtml");
		}


		[HttpGet("admin/RoleDetail/")]
		public IActionResult RoleDetail()
		{
			return View("Views/Pages/Admin/RoleDetail.cshtml");
		}


	}
}
