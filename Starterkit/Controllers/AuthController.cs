using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit._keenthemes.libs;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Starterkit.Helper;


namespace Starterkit.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<AuthController> _logger;
    private readonly IKTTheme _theme;
    private readonly IWebHostEnvironment _env;
    private readonly IHttpContextAccessor _contextAccessor;

    public AuthController(ILogger<AuthController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
    {
        _logger = logger;
        _theme = theme;
        _env = env;
        _contextAccessor = contextAccessor;
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
        try
        {
            if (!String.IsNullOrEmpty(HttpContext.Request.Query["refCode"]))
                refCode = HttpContext.Request.Query["refCode"];
            ViewData["RefCode"] = refCode;
        }
        catch { }
        return View("Views/Auth/SignUp.cshtml");
    }

    [HttpGet("/signout")]
    public IActionResult SignOut()
    {
        string req = "";
        try
        {
            if (!String.IsNullOrEmpty(HttpContext.Request.Query["logout"]))
                req = HttpContext.Request.Query["logout"];
            if (req == "logout")
            {
                _contextAccessor.HttpContext.Session.Clear();
            };
        }
        catch { }
        return View("Views/Auth/SignIn.cshtml");
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
    public ActionResult TwoFactor()
    {
        return View("Views/Auth/TwoFactor.cshtml");
    }


    [HttpPost]
    public string ValidateOtp([FromBody] TfOtpModel otpModel)
    {
        CustomerLogic customerLogic = new CustomerLogic();
        string _Result = string.Empty;
        string email = _contextAccessor.HttpContext.Session.GetString("OtpEmail");
        string phone = ""; // You need to add code to get phone number from session or wherever it is stored

        // Call your logic to validate OTP
        var userModel = customerLogic.ValidateOtp(phone, email, otpModel.otp);

        if (userModel != null)
        {
            _contextAccessor.HttpContext.Session.SetString("Name", userModel.FirstName + " " + userModel.LastName);

            _contextAccessor.HttpContext.Session.SetString("Id", userModel.Id.ToString());

            _contextAccessor.HttpContext.Session.SetString("UserName", userModel.Email);

            _contextAccessor.HttpContext.Session.SetString("UserEmail", userModel.Email);

            _contextAccessor.HttpContext.Session.SetString("CustomerGUID", userModel.CustomerGUID.ToString());

            //_contextAccessor.HttpContext.Session.SetString("Country", userModel.Country.ToString());

            return "done";

        }

        return "invalid";
    }



    [HttpPost]
    public string EmailValidateOtp([FromBody] TfOtpModel otpModel)
    {
        CustomerLogic customerLogic = new CustomerLogic();
        string _Result = string.Empty;
        int Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
        string email = _contextAccessor.HttpContext.Session.GetString("OtpEmail");

        // Call your logic to validate OTP
        string returnValue = customerLogic.UpdateEmail(Id, email, otpModel.otp);

        return returnValue;
    }


    //[HttpPost("/register")]
    [AllowAnonymous]
    [HttpGet]
    public JsonResult RegisterUserN([FromBody] RegisterUser register)
    {
        return Json(register.FirstName);
    }


    [HttpPost]
    public string SendOTP([FromBody] SendOtpModel otpModel)
    {
        string returnValue = string.Empty;
        try
        {
            CustomerLogic customerLogic = new CustomerLogic();
            SendEmailLogic sendEmailLogic = new SendEmailLogic();
            string validateEmail = customerLogic.ValidateEmail(otpModel.Email);
            if (validateEmail != "invalid" && validateEmail != "" && validateEmail != string.Empty)
            {
                string subject = validateEmail + " is the OTP for your login.";

                string body = string.Empty;
                string path = Path.Combine(_env.WebRootPath, "EmailTemplate/SendOtp.html");
                using (StreamReader reader = new StreamReader(path))
                {
                    body = reader.ReadToEnd();
                }
                body = body.Replace("{OTP}", validateEmail);
                //sendEmailLogic.SendEmail(otpModel.Email, subject, body);
                _contextAccessor.HttpContext.Session.SetString("OtpEmail", otpModel.Email);

                returnValue = "done";//otpModel.Email;
            }
            else if (validateEmail == "invalid")
            {
                returnValue = "invalid-Email";
            }
        }
        catch (Exception ex)
        {
            returnValue = "invalid-Email";
        }
        return returnValue;
    }

    [HttpPost]
    public string ChangeEmailSendOTP([FromBody] SendOtpModel otpModel)
    {
        string returnValue = string.Empty;
        try
        {
            CustomerLogic customerLogic = new CustomerLogic();
            SendEmailLogic sendEmailLogic = new SendEmailLogic();
            string validateEmail = customerLogic.ValidateChangeEmail(otpModel.Email, Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")));
            if (validateEmail != "invalid" && validateEmail != "" && validateEmail != string.Empty)
            {
                string subject = validateEmail + " is the OTP for your login.";

                string body = string.Empty;
                string path = Path.Combine(_env.WebRootPath, "EmailTemplate/SendOtp.html");
                using (StreamReader reader = new StreamReader(path))
                {
                    body = reader.ReadToEnd();
                }
                body = body.Replace("{OTP}", validateEmail);
                //sendEmailLogic.SendEmail(otpModel.Email, subject, body);
                _contextAccessor.HttpContext.Session.SetString("OtpEmail", otpModel.Email);

                returnValue = "done";//otpModel.Email;
            }
            else if (validateEmail == "invalid")
            {
                returnValue = "invalid-Email";
            }
        }
        catch (Exception ex)
        {
            returnValue = "invalid-Email";
        }
        return returnValue;
    }

    [HttpPost]
    public string CancelEmail([FromBody] SendOtpModel otpModel)
    {
        try
        {
            _contextAccessor.HttpContext.Session.SetString("OtpEmail", string.Empty);

            return "done";
        }
        catch (Exception)
        {
            return "invalid-Email";
        }
    }


   

}


// Add data to session _contextAccessor.HttpContext.Session.SetString("OtpEmail", otpModel.Email);
// Get data from session string otpEmail = _contextAccessor.HttpContext.Session.GetString("OtpEmail");