using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit._keenthemes.libs;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;

namespace Starterkit.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<AuthController> _logger;
    private readonly IKTTheme _theme;

    public AuthController(ILogger<AuthController> logger, IKTTheme theme)
    {
        _logger = logger;
        _theme = theme;
    }

    [HttpGet("/signin")]
    public IActionResult SignIn()
    {
        return View("Views/Auth/SignIn.cshtml");
    }

    [HttpGet("/signup")]
    public IActionResult SignUp()
    {
        string refCode = "";
        try {
             if (!String.IsNullOrEmpty(HttpContext.Request.Query["refCode"]))
                refCode = HttpContext.Request.Query["refCode"];
             ViewData["RefCode"] = refCode;
        }
        catch { }
        return View("Views/Auth/SignUp.cshtml");
    }

    //[HttpPost("/register")]
    [AllowAnonymous]
    [HttpPost]
    public JsonResult RegisterUser([FromBody] RegisterUser register)//, string LastName, string Email, string ContactNo, string SponsorId)
    {
        try
        {
            string ErrorMessage = string.Empty;
            string _Result = string.Empty;
            int customerID = 0;
            //int SponsorID = Convert.ToInt32(register.SponsorId);
            CustomerLogic customerLogic = (CustomerLogic)LogicFactory.GetLogic(LogicType.Customer);
            UserModel _Customer = new UserModel();
            _Customer.SponsorId = register.SponsorId;
            _Customer.FirstName = !string.IsNullOrEmpty(register.FirstName) ? register.FirstName.Trim() : register.FirstName;
            _Customer.LastName = !string.IsNullOrEmpty(register.LastName) ? register.LastName.Trim() : register.LastName;
            _Customer.Email = !string.IsNullOrEmpty(register.Email) ? register.Email.Trim() : register.Email;

            _Customer.ContactNo = !string.IsNullOrEmpty(register.ContactNo) ? register.ContactNo.Trim() : register.ContactNo;
            //_Customer.IsActive = _Customer.IsActive.HasValue ? _Customer.IsActive.Value : false;
            _Customer.CustomerGUID = System.Guid.NewGuid();

            _Result = customerLogic.InsertCustomer(_Customer);

            return Json(_Result);
        }
        catch
        {
            return Json("error");
        }
    }

    [HttpGet("/reset-password")]
    public IActionResult ResetPassword()
    {
        return View(_theme.GetPageView("Auth", "ResetPassword.cshtml"));
    }

    [HttpGet("/new-password")]
    public IActionResult NewPassword()
    {
        return View(_theme.GetPageView("Auth", "NewPassword.cshtml"));
    }

	[HttpGet("twoFactor/")]
	// GET: HomeController/Details/5
	public ActionResult TwoFactor(int id)
	{
		return View("Views/Auth/TwoFactor.cshtml");
	}

    //[HttpPost("/register")]
    [AllowAnonymous]
    [HttpGet]
    public JsonResult RegisterUserN([FromBody] RegisterUser register)
    {
        return Json(register.FirstName);
    }
}
