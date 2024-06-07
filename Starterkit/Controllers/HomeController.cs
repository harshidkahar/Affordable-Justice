using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Starterkit._keenthemes.libs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Starterkit.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<DashboardsController> _logger;
        private readonly IKTTheme _theme;
        public HomeController(ILogger<DashboardsController> logger, IKTTheme theme)
        {
            _logger = logger;
            _theme = theme;
        }
        // GET: HomeController
        [HttpGet("/")]
        [HttpGet("index/")]
        public ActionResult Index()
        {
            //return View(_theme.GetPageView("Auth", "SignIn.cshtml"));
            return View("Views/LandingPage.cshtml");
        }

        [HttpGet("welcome/")]
        public ActionResult Welcome()
        {
            //return View(_theme.GetPageView("Auth", "SignIn.cshtml"));
            return View("Views/Welcome.cshtml");
        }
        // GET: HomeController/Details/5
        public ActionResult Details(string FirstName)
        {
            return View();
        }

        // GET: HomeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: HomeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: HomeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: HomeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: HomeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: HomeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
