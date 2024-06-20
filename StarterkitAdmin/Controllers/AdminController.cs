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

		[HttpGet("CreateAgent/")]
		public IActionResult CreateAgent()
		{
			return View("Views/Pages/Admin/CreateAgent.cshtml");
		}

		[HttpGet("UpdateAgent/")]
		public IActionResult UpdateAgent()
		{
			return View("Views/Pages/Admin/UpdateAgent.cshtml");
		}

		[HttpGet("DeleteAgent/")]
		public IActionResult DeleteAgent()
		{
			return View("Views/Pages/Admin/DeleteAgent.cshtml");
		}

		[HttpGet("ViewAgent/")]
		public IActionResult ViewAgent()
		{
			return View("Views/Pages/Admin/ViewAgent.cshtml");
		}

		[HttpGet("CreateLawyer/")]
		public IActionResult CreateLawyer()
		{
			return View("Views/Pages/Admin/CreateLawyer.cshtml");
		}

		[HttpGet("ViewLawyer/")]
		public IActionResult ViewLawyer()
		{
			return View("Views/Pages/Admin/ViewLawyer.cshtml");
		}

		[HttpGet("UpdateLawyer/")]
		public IActionResult UpdateLawyer()
		{
			return View("Views/Pages/Admin/UpdateLawyer.cshtml");
		}

		[HttpGet("DeleteLawyer/")]
		public IActionResult DeleteLawyer()
		{
			return View("Views/Pages/Admin/DeleteLawyer.cshtml");
		}

        [HttpGet("ProfileOverview/")]
        public IActionResult ProfileOverview()
        {
            return View("Views/Pages/Admin/ProfileOverview.cshtml");
        }

        [HttpGet("ProfileSetting/")]
        public IActionResult ProfileSetting()
        {
            return View("Views/Pages/Admin/ProfileSetting.cshtml");
        }

		[HttpGet("CreateRole/")]
		public IActionResult CreateRole()
		{
			return View("Views/Pages/Admin/CreateRole.cshtml");
		}


		[HttpGet("ViewRole/")]
		public IActionResult ViewRole()
		{
			return View("Views/Pages/Admin/ViewRole.cshtml");
		}


		[HttpGet("RoleDetail/")]
		public IActionResult RoleDetail()
		{
			return View("Views/Pages/Admin/RoleDetail.cshtml");
		}

        [HttpGet("ViewCustomer/")]
        public IActionResult ViewCustomer()
        {
            return View("Views/Pages/Admin/ViewCustomer.cshtml");
        }

        [HttpGet("UpdateCustomer/")]
        public IActionResult UpdateCustomer()
        {
            return View("Views/Pages/Admin/UpdateCustomer.cshtml");
        }

        [HttpGet("DeleteCustomer/")]
        public IActionResult DeleteCustomer()
        {
            return View("Views/Pages/Admin/DeleteCustomer.cshtml");
        }



    }
}
