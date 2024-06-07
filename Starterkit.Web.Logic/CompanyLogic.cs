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
                DataSet ds = commonDA.GetCommonFillData(userId, CompId.ToString(), "UserCompanyDetail");

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
                            companyModel.ApplicationType = Convert.ToString(row["ApplicationType"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CompanyType") && !row["CompanyType"].Equals(DBNull.Value))
                        {
                            companyModel.CompanyType = Convert.ToString(row["CompanyType"]);
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessCity") && !row["BusinessCity"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessCity = Convert.ToString(row["BusinessCity"]);
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessLocation") && !row["BusinessLocation"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessLocation = Convert.ToString(row["BusinessLocation"]);
                        }
                        if (ds.Tables[0].Columns.Contains("BusinessCategory") && !row["BusinessCategory"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessCategory = Convert.ToString(row["BusinessCategory"]);
                        }
                        if (ds.Tables[0].Columns.Contains("NoOfResidentVisa") && !row["NoOfResidentVisa"].Equals(DBNull.Value))
                        {
                            companyModel.NoOfResidentVisa = Convert.ToInt32(row["NoOfResidentVisa"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependentVisaReq") && !row["DependentVisaReq"].Equals(DBNull.Value))
                        {
                            companyModel.DependentVisaReq = Convert.ToBoolean(row["DependentVisaReq"]);
                            companyModel.dependentVisaReqText = companyModel.DependentVisaReq ? "yes" : "no";
                        }
                        if (ds.Tables[0].Columns.Contains("OfficeType") && !row["OfficeType"].Equals(DBNull.Value))
                        {
                            companyModel.OfficeType = Convert.ToString(row["OfficeType"]);
                        }
                        if (ds.Tables[0].Columns.Contains("YourOfficeType") && !row["YourOfficeType"].Equals(DBNull.Value))
                        {
                            companyModel.YourOfficeType = Convert.ToString(row["YourOfficeType"]);
                        }
                        if (ds.Tables[0].Columns.Contains("StartBusiness") && !row["StartBusiness"].Equals(DBNull.Value))
                        {
                            companyModel.StartBusiness = Convert.ToString(row["StartBusiness"]);
                        }
                        if (ds.Tables[0].Columns.Contains("HasBusinessName") && !row["HasBusinessName"].Equals(DBNull.Value))
                        {
                            companyModel.HasBusinessName = Convert.ToBoolean(row["HasBusinessName"]);
                            companyModel.BusinessNameText = companyModel.HasBusinessName ? "Yes" : "No";

                        }
                        if (ds.Tables[0].Columns.Contains("BusinessNameOption") && !row["BusinessNameOption"].Equals(DBNull.Value))
                        {
                            companyModel.BusinessNameOption = Convert.ToString(row["BusinessNameOption"]);
                        }
                        if (ds.Tables[0].Columns.Contains("NeedAssistanceOn") && !row["NeedAssistanceOn"].Equals(DBNull.Value))
                        {
                            companyModel.NeedAssistanceOn = Convert.ToString(row["NeedAssistanceOn"]);
                        }
                        if (ds.Tables[0].Columns.Contains("FirstName") && !row["FirstName"].Equals(DBNull.Value))
                        {
                            companyModel.FirstName = Convert.ToString(row["FirstName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("LastName") && !row["LastName"].Equals(DBNull.Value))
                        {
                            companyModel.LastName = Convert.ToString(row["LastName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("EmailId") && !row["EmailId"].Equals(DBNull.Value))
                        {
                            companyModel.EmailId = Convert.ToString(row["EmailId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Phone") && !row["Phone"].Equals(DBNull.Value))
                        {
                            companyModel.Phone = Convert.ToString(row["Phone"]);
                        }
                        if (ds.Tables[0].Columns.Contains("RAddress") && !row["RAddress"].Equals(DBNull.Value))
                        {
                            companyModel.RAddress = Convert.ToString(row["RAddress"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CAddress") && !row["CAddress"].Equals(DBNull.Value))
                        {
                            companyModel.CAddress = Convert.ToString(row["CAddress"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            companyModel.Country = Convert.ToString(row["Country"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            companyModel.Nationality = Convert.ToString(row["Nationality"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PassportUrl") && !row["PassportUrl"].Equals(DBNull.Value))
                        {
                            companyModel.PassportUrl = Convert.ToString(row["PassportUrl"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PassportPhotoUrl") && !row["PassportPhotoUrl"].Equals(DBNull.Value))
                        {
                            companyModel.PassportPhotoUrl = Convert.ToString(row["PassportPhotoUrl"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
                        {
                            companyModel.CountryCode = Convert.ToString(row["CountryCode"]);
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

        public List<VisaDetailsModel> VisaDetail(int CompId)
        {
            List<VisaDetailsModel> visaDetailList = new List<VisaDetailsModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(CompId, "", "GetVisaDetail");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        VisaDetailsModel visaModel = new VisaDetailsModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            visaModel.VisaKey = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CompId") && !row["CompId"].Equals(DBNull.Value))
                        {
                            visaModel.CompId = Convert.ToInt32(row["CompId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Name") && !row["Name"].Equals(DBNull.Value))
                        {
                            visaModel.Name = Convert.ToString(row["Name"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DateOfBirth") && !row["DateOfBirth"].Equals(DBNull.Value))
                        {
                            visaModel.DateOfBirth = Convert.ToString(row["DateOfBirth"]);
                        }
                        if (ds.Tables[0].Columns.Contains("EmiratesId") && !row["EmiratesId"].Equals(DBNull.Value))
                        {
                            visaModel.EmiratesId = Convert.ToString(row["EmiratesId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CurrentAddress") && !row["CurrentAddress"].Equals(DBNull.Value))
                        {
                            visaModel.CurrentAddress = Convert.ToString(row["CurrentAddress"]);
                        }
                        if (ds.Tables[0].Columns.Contains("ResidenceAddress") && !row["ResidenceAddress"].Equals(DBNull.Value))
                        {
                            visaModel.ResidenceAddress = Convert.ToString(row["ResidenceAddress"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            visaModel.Country = Convert.ToString(row["Country"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            visaModel.Nationality = Convert.ToString(row["Nationality"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PassportUrl") && !row["PassportUrl"].Equals(DBNull.Value))
                        {
                            visaModel.PassportUrl = Convert.ToString(row["PassportUrl"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Opt") && !row["Opt"].Equals(DBNull.Value))
                        {
                            visaModel.Opt = Convert.ToString(row["Opt"]);
                        }

                        visaDetailList.Add(visaModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return visaDetailList;
        }

        public List<PatnerDetailsModel> PartnerDetail(int partId)
        {
            List<PatnerDetailsModel> partnerDetailList = new List<PatnerDetailsModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(partId, "", "GetVisaDetail");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        PatnerDetailsModel partnerModel = new PatnerDetailsModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            partnerModel.PartnerKey = Convert.ToInt32(row["PartnerKey"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CompId") && !row["CompId"].Equals(DBNull.Value))
                        {
                            partnerModel.CompId = Convert.ToInt32(row["CompId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("UAEResidence") && !row["UAEResidence"].Equals(DBNull.Value))
                        {
                            partnerModel.UAEResidence = Convert.ToBoolean(row["UAEResidence"]);
                            partnerModel.UAEResidenceText = partnerModel.UAEResidence ? "yes" : "no";
                        }
                    
                        if (ds.Tables[0].Columns.Contains("IsCompanyManager") && !row["IsCompanyManager"].Equals(DBNull.Value))
                        {
                            partnerModel.IsCompanyManager = Convert.ToBoolean(row["IsCompanyManager"]);
                            partnerModel.IsCompanyManagerText = partnerModel.IsCompanyManager ? "yes" : "no";
                        }
                        if (ds.Tables[0].Columns.Contains("Name") && !row["Name"].Equals(DBNull.Value))
                        {
                            partnerModel.Name = Convert.ToString(row["Name"]);
                        }
                        if (ds.Tables[0].Columns.Contains("EmailId") && !row["EmailId"].Equals(DBNull.Value))
                        {
                            partnerModel.EmailId = Convert.ToString(row["EmailId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DateOfBirth") && !row["DateOfBirth"].Equals(DBNull.Value))
                        {
                            partnerModel.DateOfBirth = Convert.ToString(row["DateOfBirth"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
                        {
                            partnerModel.CountryCode = Convert.ToString(row["CountryCode"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Phone") && !row["Phone"].Equals(DBNull.Value))
                        {
                            partnerModel.Phone = Convert.ToString(row["Phone"]);
                        }
                        if (ds.Tables[0].Columns.Contains("EMRId") && !row["EMRId"].Equals(DBNull.Value))
                        {
                            partnerModel.EMRId = Convert.ToString(row["EMRId"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PassportNo") && !row["PassportNo"].Equals(DBNull.Value))
                        {
                            partnerModel.PassportNo = Convert.ToString(row["PassportNo"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Address") && !row["Address"].Equals(DBNull.Value))
                        {
                            partnerModel.Address = Convert.ToString(row["Address"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
                        {
                            partnerModel.Country = Convert.ToString(row["Country"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
                        {
                            partnerModel.Nationality = Convert.ToString(row["Nationality"]);
                        }
                        if (ds.Tables[0].Columns.Contains("PatnerOwnership") && !row["PatnerOwnership"].Equals(DBNull.Value))
                        {
                            partnerModel.PatnerOwnership = Convert.ToDecimal(row["PatnerOwnership"]);
                        }
                        

                        partnerDetailList.Add(partnerModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return partnerDetailList;
        }

        public List<InsertDependentModel> DependentDetail(int depId)
        {
            List<InsertDependentModel> dependentDetailList = new List<InsertDependentModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(depId, "", "GetDependentDetail");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        InsertDependentModel dependentModel = new InsertDependentModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            dependentModel.Id = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("CompKey") && !row["CompKey"].Equals(DBNull.Value))
                        {
                            dependentModel.CompKey = Convert.ToInt32(row["CompKey"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaName") && !row["DependVisaName"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaName = Convert.ToString(row["DependVisaName"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaEmail") && !row["DependVisaEmail"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaEmail = Convert.ToString(row["DependVisaEmail"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaDOB") && !row["DependVisaDOB"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaDOB = Convert.ToString(row["DependVisaDOB"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaPasspno") && !row["DependVisaPasspno"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaPasspno = Convert.ToString(row["DependVisaPasspno"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaAddress") && !row["DependVisaAddress"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisaAddress = Convert.ToString(row["DependVisaAddress"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaCountry") && !row["DependVisaCountry"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisacountry = Convert.ToString(row["DependVisaCountry"]);
                        }
                        if (ds.Tables[0].Columns.Contains("DependVisaNationality") && !row["DependVisaNationality"].Equals(DBNull.Value))
                        {
                            dependentModel.dependvisanationality = Convert.ToString(row["DependVisaNationality"]);
                        }
                        

                        dependentDetailList.Add(dependentModel);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return dependentDetailList;
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
