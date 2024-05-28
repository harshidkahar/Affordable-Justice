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

          public List<UserDocumentModel> GetDocumentList(int userId, int CaseId)
        {
            List<UserDocumentModel> documentList = new List<UserDocumentModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, CaseId.ToString(), "CaseDocuments");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        UserDocumentModel documentModel = new UserDocumentModel();
                        if (ds.Tables[0].Columns.Contains("FileName") && !row["FileName"].Equals(DBNull.Value))
                        {
                            documentModel.FileName = Convert.ToString(row["FileName"]);
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

          public List<ViewDocumentModel> GetDocumentDescription(int userId, int CaseId)
        {
            List<ViewDocumentModel> documentDetail = new List<ViewDocumentModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, CaseId.ToString(), "GetDocumentDetails");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ViewDocumentModel documentdetailModel = new ViewDocumentModel();
                        if (ds.Tables[0].Columns.Contains("DocName") && !row["DocName"].Equals(DBNull.Value))
                        {
                            documentdetailModel.DocName = Convert.ToString(row["DocName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CaseId") && !row["CaseId"].Equals(DBNull.Value))
                        {
                            documentdetailModel.CaseKey = Convert.ToInt32(row["CaseId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Description") && !row["Description"].Equals(DBNull.Value))
                        {
                            documentdetailModel.Description = Convert.ToString(row["Description"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DocumentUrl") && !row["DocumentUrl"].Equals(DBNull.Value))
                        {
                            documentdetailModel.DocumentUrl = Convert.ToString(row["DocumentUrl"]);
                        }
                        documentDetail.Add(documentdetailModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return documentDetail;
        }


        public List<CaseDetailModel> GetCaseDetail(int userId, int CaseId)
        {
            List<CaseDetailModel> casedetail = new List<CaseDetailModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, CaseId.ToString(), "GetCaseDetails");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CaseDetailModel casedetailModel = new CaseDetailModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            casedetailModel.CaseKey = Convert.ToInt32(row["Id"]);
                        }
                        if (!string.IsNullOrEmpty(casedetailModel.PrimaryCaseType))
                        {
                            casedetailModel.PrimaryCaseType += " ";
                        }
                        casedetailModel.PrimaryCaseType += (row["PrimaryCaseType"] ?? "").ToString();

                        if (!string.IsNullOrEmpty(casedetailModel.SecondaryCaseType))
                        {
                            casedetailModel.SecondaryCaseType += " ";
                        }
                        casedetailModel.SecondaryCaseType += (row["SecondaryCaseType"] ?? "").ToString();

                        if (!string.IsNullOrEmpty(casedetailModel.ThirdCaseType))
                        {
                            casedetailModel.ThirdCaseType += " ";
                        }
                        casedetailModel.ThirdCaseType += (row["ThirdCaseType"] ?? "").ToString();

                        if (ds.Tables[0].Columns.Contains("ProceedingYet") && !row["ProceedingYet"].Equals(DBNull.Value))
                        {
                            int proceedingYetValue = Convert.ToInt32(row["ProceedingYet"]);
                            casedetailModel.ProceedingYet = proceedingYetValue == 1 ? "Yes" : "No";
                        }

                        if (ds.Tables[0].Columns.Contains("DateCommenced") && !row["DateCommenced"].Equals(DBNull.Value))
                        {
                            casedetailModel.DateCommenced = Convert.ToDateTime(row["DateCommenced"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PreviousCaseNo") && !row["PreviousCaseNo"].Equals(DBNull.Value))
                        {
                            casedetailModel.PreviousCaseNo = Convert.ToString(row["PreviousCaseNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CurrentCaseNo") && !row["CurrentCaseNo"].Equals(DBNull.Value))
                        {
                            casedetailModel.CurrentCaseNo = Convert.ToString(row["CurrentCaseNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("LegalAdviceInferred") && !row["LegalAdviceInferred"].Equals(DBNull.Value))
                        {
                            int legalAdviceInferredValue = Convert.ToInt32(row["LegalAdviceInferred"]);
                            casedetailModel.LegalAdviceInferred = legalAdviceInferredValue == 1 ? "Yes" : "No";
                        }
                        if (ds.Tables[0].Columns.Contains("WhichCourt") && !row["WhichCourt"].Equals(DBNull.Value))
                        {
                            casedetailModel.WhichCourt = Convert.ToString(row["WhichCourt"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Opname") && !row["Opname"].Equals(DBNull.Value))
                        {
                            casedetailModel.Opname = Convert.ToString(row["Opname"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Opmail") && !row["Opmail"].Equals(DBNull.Value))
                        {
                            casedetailModel.Opmail = Convert.ToString(row["Opmail"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Opmob") && !row["Opmob"].Equals(DBNull.Value))
                        {
                            casedetailModel.Opmob = Convert.ToString(row["Opmob"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Emrid") && !row["Emrid"].Equals(DBNull.Value))
                        {
                            casedetailModel.Emrid = Convert.ToString(row["Emrid"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Passno") && !row["Passno"].Equals(DBNull.Value))
                        {
                            casedetailModel.Passno = Convert.ToString(row["Passno"]);
                        }
                        casedetail.Add(casedetailModel);

                       
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return casedetail;
        }

          public List<CustomerProfileModel> Overview(int userId)
        {
            List<CustomerProfileModel> profileoverview = new List<CustomerProfileModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "UserDetails");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CustomerProfileModel profiloverviewModel = new CustomerProfileModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.UserId = Convert.ToInt32(row["Id"]);
                        }
                        if (!string.IsNullOrEmpty(profiloverviewModel.FirstName))
                        {
                            profiloverviewModel.FirstName += " ";
                        }
                        profiloverviewModel.FirstName += (row["FirstName"] ?? "").ToString();

                        if (!string.IsNullOrEmpty(profiloverviewModel.LastName))
                        {
                            profiloverviewModel.LastName += " ";
                        }
                        profiloverviewModel.LastName += (row["LastName"] ?? "").ToString();

                        if (ds.Tables[0].Columns.Contains("Dob") && !row["Dob"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Dob = Convert.ToDateTime(row["Dob"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Email") && !row["Email"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Email = Convert.ToString(row["Email"]);
                        }
                        if (ds.Tables[0].Columns.Contains("ContactNo") && !row["ContactNo"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.ContactNo = Convert.ToString(row["ContactNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.CountryCode = Convert.ToString(row["CountryCode"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address_Flat") && !row["Address_Flat"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Address_Flat = Convert.ToString(row["Address_Flat"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address_Building") && !row["Address_Building"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Address_Building = Convert.ToString(row["Address_Building"]);
                        }

                        if (ds.Tables[0].Columns.Contains("Address") && !row["Address"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Address = Convert.ToString(row["Address"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Country = Convert.ToString(row["Country"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Nationality = Convert.ToString(row["Nationality"]);
                        }

                        profileoverview.Add(profiloverviewModel);


                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return profileoverview;
        }

          public List<CustomerProfileSettingModel> Setting(int userId)
        {
            List<CustomerProfileSettingModel> profilesetting = new List<CustomerProfileSettingModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "UserDetails");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CustomerProfileSettingModel profilsettingModel = new CustomerProfileSettingModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            profilsettingModel.UserId = Convert.ToInt32(row["Id"]);
                        }
                        if (!string.IsNullOrEmpty(profilsettingModel.FirstName))
                        {
                            profilsettingModel.FirstName += " ";
                        }
                        profilsettingModel.FirstName += (row["FirstName"] ?? "").ToString();

                        if (!string.IsNullOrEmpty(profilsettingModel.LastName))
                        {
                            profilsettingModel.LastName += " ";
                        }
                        profilsettingModel.LastName += (row["LastName"] ?? "").ToString();

                        if (ds.Tables[0].Columns.Contains("Dob") && !row["Dob"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Dob = Convert.ToDateTime(row["Dob"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Email") && !row["Email"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Email = Convert.ToString(row["Email"]);
                        }
                        if (ds.Tables[0].Columns.Contains("ContactNo") && !row["ContactNo"].Equals(DBNull.Value))
                        {
                            profilsettingModel.ContactNo = Convert.ToString(row["ContactNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
                        {
                            profilsettingModel.CountryCode = Convert.ToString(row["CountryCode"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address_Flat") && !row["Address_Flat"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Address_Flat = Convert.ToString(row["Address_Flat"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address_Building") && !row["Address_Building"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Address_Building = Convert.ToString(row["Address_Building"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address") && !row["Address"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Address = Convert.ToString(row["Address"]);
                        }

                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Country = Convert.ToString(row["Country"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            profilsettingModel.Nationality = Convert.ToString(row["Nationality"]);
                        }

                        profilesetting.Add(profilsettingModel);


                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return profilesetting;
        }

        
        public string CreateCase(CreateCaseModel _Createcase)  {
            CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
            return customerDA.DAL_CreateCase(_Createcase);
       ;
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
