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
using System.Data;

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


        public List<ViewCaseListModel> GetCaseList(int userId)
        {
            List<ViewCaseListModel> caseList = new List<ViewCaseListModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "UserCaseList");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ViewCaseListModel caseModel = new ViewCaseListModel();
                        if (ds.Tables[0].Columns.Contains("SrNo") && !row["SrNo"].Equals(DBNull.Value))
                        {
                            caseModel.SrNo = Convert.ToInt32(row["SrNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            caseModel.CaseKey = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("ThirdCaseType") && !row["ThirdCaseType"].Equals(DBNull.Value))
                        {
                            caseModel.ThirdCaseType = row["ThirdCaseType"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("DateCommenced") && !row["DateCommenced"].Equals(DBNull.Value)) 
                        {
                            caseModel.DateCommenced = Convert.ToDateTime(row["DateCommenced"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Status") && !row["Status"].Equals(DBNull.Value))
                        {
                            caseModel.Status = Convert.ToString(row["Status"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PrimaryCaseType") && !row["PrimaryCaseType"].Equals(DBNull.Value))
                        {
                            caseModel.PrimaryCaseType = Convert.ToString(row["PrimaryCaseType"]);
                        }
                        caseList.Add(caseModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return caseList;
        }


         public List<ViewCompanyListModel> GetCompanyList(int userId)
        {
            List<ViewCompanyListModel> companyList = new List<ViewCompanyListModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "UserCompanyList");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ViewCompanyListModel companyModel = new ViewCompanyListModel();
                        if (ds.Tables[0].Columns.Contains("SrNo") && !row["SrNo"].Equals(DBNull.Value)) 
                        {
                            companyModel.SrNo = Convert.ToInt32(row["SrNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            companyModel.CompanyKey = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Date") && !row["Date"].Equals(DBNull.Value)) 
                        {
                            companyModel.Date = Convert.ToDateTime(row["Date"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Status") && !row["Status"].Equals(DBNull.Value))
                        {
                            companyModel.Status = Convert.ToString(row["Status"]);
                        }
                        companyList.Add(companyModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return companyList;
        }

        public List<UserDocumentModel> GetDocumentList(int userId)
        {
            List<UserDocumentModel> documentList = new List<UserDocumentModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "CaseDocuments");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        UserDocumentModel documentModel = new UserDocumentModel();
                        if (ds.Tables[0].Columns.Contains("FileName") && !row["FileName"].Equals(DBNull.Value))
                        {
                            documentModel.FileName = Convert.ToString(row["FileName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            documentModel.Id = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CaseId") && !row["CaseId"].Equals(DBNull.Value))
                        {
                            documentModel.CaseKey = Convert.ToInt32(row["CaseId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("TimeStamp") && !row["TimeStamp"].Equals(DBNull.Value))
                        {
                            documentModel.TimeStamp = Convert.ToDateTime(row["TimeStamp"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Size") && !row["Size"].Equals(DBNull.Value))
                        {
                            documentModel.Size = Convert.ToString(row["Size"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DocName") && !row["DocName"].Equals(DBNull.Value))
                        {
                            documentModel.DocName = Convert.ToString(row["DocName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Description") && !row["Description"].Equals(DBNull.Value))
                        {
                            documentModel.Description = Convert.ToString(row["Description"]);
                        }
                        documentList.Add(documentModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return documentList;
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
