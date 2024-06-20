using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Starterkit.Helper
{
    public class SessionCheck
    {        
        static public bool CheckSession(IHttpContextAccessor session, String sessionName)
		{
			if (session.HttpContext.Session.GetString(sessionName) == null || session.HttpContext.Session.GetString(sessionName).ToString() == String.Empty || session.HttpContext.Session.GetString(sessionName) == "")
				return false;
			else
				return true;
		}
		static public void ClearSession(IHttpContextAccessor session, String sessionName)
		{
			if (CheckSession(session, sessionName))
			{
                session.HttpContext.Session.SetString(sessionName, null);
			}
		}
	}
}