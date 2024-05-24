using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Security.Authentication;
using System.Text.RegularExpressions;
using System.Configuration;
using Starterkit.Model;
using Starterkit.Data;
using Starterkit.Data.Base;
using System.Net.Mail;
using System.Net;

namespace Starterkit.Web.Logic
{
    public class SendEmailLogic : Starterkit.Web.Logic.Base.ILogic
    {
        public string SendEmail(string emailTo, string subject, string body)
        {
            string returnMessage = string.Empty;

            try
            {
                EmailSettingsModel settings = new EmailSettingsModel(); 
               
                EmailDA emailDA = (EmailDA)DataAccessFactory.GetDataAccess(DataAccessType.Email);
                settings = emailDA.GetEmailSettings();

                MailMessage m = new MailMessage(settings.EmailFrom, emailTo);
                m.Subject = subject;
                m.Body = body;
                m.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient();
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Host = settings.Host;
                smtp.Port = Convert.ToInt32(settings.Port);
                if (settings.SSL == true)
                {
                    smtp.EnableSsl = true;
                }
                else
                {
                    smtp.EnableSsl = false;
                }
                NetworkCredential authinfo = new NetworkCredential(settings.EmailFrom, settings.WatchWord);
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = authinfo;
                smtp.Send(m);
                returnMessage = "1";
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
            }
            return returnMessage;
        }

    }
}
