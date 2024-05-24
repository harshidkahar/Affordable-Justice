using System.Web.SessionState;
using System;

namespace Starterkit
{
	public class SessionCheck
	{
		static public bool CheckSession(HttpSessionState session, String sessionName)
		{
			if (session[sessionName] == null || session[sessionName].ToString() == String.Empty || session[sessionName] == "")
				return false;
			else
				return true;
		}
		static public void ClearSession(HttpSessionState session, String sessionName)
		{
			if (CheckSession(session, sessionName))
			{
				session[sessionName] = null;
			}
		}
	}
}