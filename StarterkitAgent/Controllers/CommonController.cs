using Azure.Core;
using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Controllers
{
    public class CommonController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        //private bool SaveContent(string p_FileName)
        //{
        //    bool flag = true;
        //    string FileLocation = "";
        //    if (Request.Files.Count > 0)
        //    {
        //        Request.Files[0].SaveAs(FileLocation + Path.GetFileName(p_FileName));
        //    }
        //    else
        //        flag = false;

        //    return flag;
        //}
    }
    
}
