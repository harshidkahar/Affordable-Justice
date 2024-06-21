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
using System.Data;

namespace Starterkit.Web.Logic
{
    public class AdminCommonLogic : Starterkit.Web.Logic.Base.ILogic
    {
        public DataSet GetAdminCommonFillData(int id, string searchTxt, string opt)
        {
            AdminCommonDA admincommonDA= (AdminCommonDA)DataAccessFactory.GetDataAccess(DataAccessType.AdminCommon);
            return admincommonDA.GetAdminCommonFillData(id,searchTxt,opt);
        }

        public string GetAdminValue(int id, string s, string query)
        {
            string i = "";
            try
            {
                DataSet ds = new DataSet();
                ds = GetAdminCommonFillData(id, s, query);
                if (ds != null)
                {
                    if (ds.Tables[query].Rows.Count > 0)
                    {
                        i = ds.Tables[query].Rows[0]["Value"].ToString();
                    }
                }
            }
            catch (Exception ex) { i = "0"; }
            return i;
        }
    }
}
