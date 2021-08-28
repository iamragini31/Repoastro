using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pandit_Application.Controllers
{
    public class StartChatController : Controller
    {
        // GET: StartChat
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult StartChat()
        {
            return View();
        }
    }
}