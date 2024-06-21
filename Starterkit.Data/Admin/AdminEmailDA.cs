using Starterkit.Data.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Starterkit.Model;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;
using System.Numerics;

namespace Starterkit.Data
{
    public class AdminEmailDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        public EmailSettingsModel GetEmailSettings()
        {
            EmailSettingsModel emailSettings = new EmailSettingsModel();
            try
            {
                AdminCommonDA admincommonDA = (AdminCommonDA)DataAccessFactory.GetDataAccess(DataAccessType.AdminCommon);
                DataSet ds = admincommonDA.GetAdminCommonFillData(0, "", "EmailSettings");

                emailSettings.Host = ds.Tables[0].Rows[0]["SMTP"].ToString();
                emailSettings.SSL = Convert.ToBoolean(ds.Tables[0].Rows[0]["SSL"]);
                emailSettings.WatchWord = ds.Tables[0].Rows[0]["WatchWord"].ToString();
                emailSettings.EmailFrom = ds.Tables[0].Rows[0]["UserName"].ToString();
                emailSettings.Port = Convert.ToInt32(ds.Tables[0].Rows[0]["Port"].ToString());
                return emailSettings;
            }
            catch (Exception _Exception)
            {
                return emailSettings = null;
                //throw _Exception;
            }
        }

    }
}
