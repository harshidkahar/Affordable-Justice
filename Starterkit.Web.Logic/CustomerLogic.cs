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
using Starterkit.Web.Logic.Base;

namespace Starterkit.Web.Logic
{
    public class CustomerLogic : Starterkit.Web.Logic.Base.ILogic
    {
        // Create New User
        public string InsertCustomer(UserModel p_Customer)
        {
            CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
            return customerDA.InsertCustomer(p_Customer);
        }

        //Validate Email

        public string ValidateEmail(string email)
        {
            CommonLogic commonLogic = (CommonLogic)LogicFactory.GetLogic(LogicType.Common);
            return commonLogic.GetValue(0, email, "ValidateEmail"); 
        }

        public UserModel ValidateOtp(string phone, string email, string otp)
        {
            UserModel userModel = new UserModel();
            CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
            return userModel=customerDA.GetLoginId(phone,email,otp);
        }

        public List<ViewCompanyListModel> GetCompanyList(int userId)
        {
            List<ViewCompanyListModel> caseList = new List<ViewCompanyListModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "UserCompanyList");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ViewCompanyListModel companyModel = new ViewCompanyListModel();
                        companyModel.SrNo = Convert.ToInt32(row["SrNo"]);
                        companyModel.CompanyKey = Convert.ToInt32(row["Id"]);
                        if (ds.Tables[0].Columns.Contains("Date") && !row["Date"].Equals(DBNull.Value))
                        {
                            companyModel.Date = Convert.ToDateTime(row["Date"]);
                        }
                        companyModel.Status = Convert.ToString(row["Status"]);
                        caseList.Add(companyModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return caseList;
        }



        //public bool CheckAuthentication(string p_LoginID, string p_Password, int p_MaxPasswordAttempts, string url)
        //{
        //    var isAuthenticated = false;

        //    CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);

        //    var customer = customerDA.GetCustomerDetailsForAuthentication(p_LoginID);

        //    if (customer != null)
        //    {
        //        var maxPasswordAttempts = p_MaxPasswordAttempts <= 0 ? 5 : p_MaxPasswordAttempts;

        //        if (customer.PasswordAttempts >= p_MaxPasswordAttempts)
        //        {
        //            throw new AuthenticationException("You have exceeded the maximum number of attempts to authenticate with your credentials. contact: support@kinetiq.tv");
        //        }

        //        isAuthenticated = IQMedia.Security.Authentication.VerifyPassword(p_Password, customer.Password);

        //        if (!isAuthenticated || customer.PasswordAttempts > 0)
        //        {
        //            customerDA.UpdatePasswordAttempts(p_LoginID, isAuthenticated);
        //        }

        //        // Check the users's allowed subdomains
        //        if (isAuthenticated)
        //        {
        //            List<string> allowedSubDomains = new List<string>();

        //            if (!string.IsNullOrWhiteSpace(customer.WhiteLabelClient.SubDomain))
        //                allowedSubDomains.Add(customer.WhiteLabelClient.SubDomain);
        //            else
        //            {
        //                allowedSubDomains.Add("");

        //                string defaultSubDomains = ConfigurationManager.AppSettings["DefaultSubDomains"];
        //                if (!string.IsNullOrWhiteSpace(defaultSubDomains))
        //                    allowedSubDomains.AddRange(defaultSubDomains.Split(','));
        //            }

        //            foreach (string subDomain in allowedSubDomains)
        //            {
        //                string tmpVal = subDomain;

        //                if (!string.IsNullOrWhiteSpace(tmpVal) && !tmpVal.EndsWith("."))
        //                    tmpVal += ".";

        //                string regexPattern = $"http[s]?:\\/\\/(www.)?{tmpVal}iqmediacorp\\.com";
        //                if (Regex.IsMatch(url, regexPattern))
        //                {
        //                    hasDomainAccess = true;
        //                    break;
        //                }
        //            }
        //        }
        //    }

        //    return isAuthenticated && hasDomainAccess;
        //}

    }
}
