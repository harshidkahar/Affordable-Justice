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
	public class CompanyLogic : Starterkit.Web.Logic.Base.ILogic
	{
		
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
							companyModel.Date = Convert.ToDateTime(row["Date"]).Date;
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
	
		public string InsertDependent(InsertDependentModel addDependent)
		{
			CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
			return companyDA.DAL_Dependent(addDependent);
		}

        public string UpdateDependent(InsertDependentModel addDependent)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_Dependent(addDependent);
        }

        public string CreateCompany(CreateCompanyModel createCompany)
		{
			CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
			return companyDA.DAL_Company(createCompany);
		}

        public string EditCompany(CreateCompanyModel updateCompany)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_UpdateCompany(updateCompany);
        }

        public string InsertPartner(PatnerDetailsModel addPartner)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_Partner(addPartner);
        }

        public string UpdatePartner(PatnerDetailsModel addPartner)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_Partner(addPartner);
        }

        public string InsertVisaDetails(VisaDetailsModel addVisa)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_VisaDetail(addVisa);
        }

        public string UpdateVisaDetails(VisaDetailsModel addVisa)
        {
            CompanyDA companyDA = (CompanyDA)DataAccessFactory.GetDataAccess(DataAccessType.Company);
            return companyDA.DAL_VisaDetail(addVisa);
        }

        public List<PatnerDetailsModel> GetPartnerList(int compId)
        {
            List<PatnerDetailsModel> partnerList = new List<PatnerDetailsModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(compId, "", "UserPartnerList");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        PatnerDetailsModel partnerModel = new PatnerDetailsModel();
                        if (ds.Tables[0].Columns.Contains("Name") && !row["Name"].Equals(DBNull.Value))
                        {
                            partnerModel.Name = Convert.ToString(row["Name"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PatnerOwnership") && !row["PatnerOwnership"].Equals(DBNull.Value))
                        {
                            partnerModel.PatnerOwnership = Convert.ToDecimal(row["PatnerOwnership"]);
                        }
                        partnerList.Add(partnerModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return partnerList;
        }

        public List<InsertDependentModel> GetDependentList(int compId)
        {
            List<InsertDependentModel> dependentList = new List<InsertDependentModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(compId, "", "UserDependentList");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        InsertDependentModel dependentModel = new InsertDependentModel();
                        if (ds.Tables[0].Columns.Contains("Name") && !row["Name"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaName = Convert.ToString(row["Name"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PassportNo") && !row["PassportNO"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaPasspno = Convert.ToString(row["PassportNo"]);
                        }
                        dependentList.Add(dependentModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return dependentList;
        }

        public List<CreateCompanyModel> CompanyDetail(int userId, int CompId)
        {
            List<CreateCompanyModel> companyDetailList = new List<CreateCompanyModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, CompId.ToString(), "CompanyDetail");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CreateCompanyModel companyModel = new CreateCompanyModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            companyModel.Id = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("UserId") && !row["UserId"].Equals(DBNull.Value))
                        {
                            companyModel.UserId = Convert.ToInt32(row["UserId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("ApplicationType") && !row["ApplicationType"].Equals(DBNull.Value))
                        {
                            companyModel.ApplicationType = row["ApplicationType"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("CompanyType") && !row["CompanyType"].Equals(DBNull.Value))
                        {
                            companyModel.CompanyType = row["CompanyType"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessCity") && !row["BusinessCity"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessCity = row["BusinessCity"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessLocation") && !row["BusinessLocation"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessLocation = row["BusinessLocation"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessCategory") && !row["BusinessCategory"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessCategory = row["BusinessCategory"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("NoOfResidentVisa") && !row["NoOfResidentVisa"].Equals(DBNull.Value))
                        {
                            companyModel.NoOfResidentVisa = Convert.ToInt32(row["NoOfResidentVisa"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependentVisaReq") && !row["DependentVisaReq"].Equals(DBNull.Value))
                        {
                            companyModel.DependentVisaReq = Convert.ToBoolean(row["DependentVisaReq"]);
                        }
                        if (ds.Tables[0].Columns.Contains("OfficeType") && !row["OfficeType"].Equals(DBNull.Value))
                        {
                            companyModel.OfficeType = row["OfficeType"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("YourOfficeType") && !row["YourOfficeType"].Equals(DBNull.Value))
                        {
                            companyModel.YourOfficeType = row["YourOfficeType"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("StartBusiness") && !row["StartBusiness"].Equals(DBNull.Value))
                        {
                            companyModel.StartBusiness = row["StartBusiness"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("HasBusinessName") && !row["HasBusinessName"].Equals(DBNull.Value))
                        {
                            companyModel.HasBusinessName = Convert.ToBoolean(row["HasBusinessName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessNameOption") && !row["BusinessNameOption"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessNameOption = row["BusinessNameOption"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("NeedAssistanceOn") && !row["NeedAssistanceOn"].Equals(DBNull.Value))
                        {
                            companyModel.NeedAssistanceOn = row["NeedAssistanceOn"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("FirstName") && !row["FirstName"].Equals(DBNull.Value))
                        {
                            companyModel.FirstName = row["FirstName"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("LastName") && !row["LastName"].Equals(DBNull.Value))
                        {
                            companyModel.LastName = row["LastName"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("EmailId") && !row["EmailId"].Equals(DBNull.Value))
                        {
                            companyModel.EmailId = row["EmailId"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("Phone") && !row["Phone"].Equals(DBNull.Value))
                        {
                            companyModel.Phone = row["Phone"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("RAddress") && !row["RAddress"].Equals(DBNull.Value))
                        {
                            companyModel.RAddress = row["RAddress"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("CAddress") && !row["CAddress"].Equals(DBNull.Value))
                        {
                            companyModel.CAddress = row["CAddress"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            companyModel.Country = row["Country"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            companyModel.Nationality = row["Nationality"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("PassportUrl") && !row["PassportUrl"].Equals(DBNull.Value))
                        {
                            companyModel.PassportUrl = row["PassportUrl"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("PassportPhotoUrl") && !row["PassportPhotoUrl"].Equals(DBNull.Value))
                        {
                            companyModel.PassportPhotoUrl = row["PassportPhotoUrl"].ToString();
                        }
                        if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
                        {
                            companyModel.CountryCode = row["CountryCode"].ToString();
                        }
                       
                        companyDetailList.Add(companyModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return companyDetailList;
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
