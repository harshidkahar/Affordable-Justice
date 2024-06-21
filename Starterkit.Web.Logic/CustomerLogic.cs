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

		public string ValidateChangeEmail(string email, int id)
		{
			CommonLogic commonLogic = (CommonLogic)LogicFactory.GetLogic(LogicType.Common);
			return commonLogic.GetValue(id, email, "ValidateChangeEmail");
		}

		public UserModel ValidateOtp(string phone, string email, string otp)
		{
			UserModel userModel = new UserModel();
			CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
			return userModel = customerDA.GetLoginId(phone, email, otp);
		}

		public string UpdateEmail(int Id, string email, string otp)
		{
			CustomerDA customerDA = (CustomerDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
			return customerDA.UpdateEmail(Id, email, otp);
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


		
		public string UpdateCustomer(CustomerProfileSettingModel profileUpdate)
		{
			AdminDA customerDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
			return customerDA.DAL_CustomerNew(profileUpdate);
		}


        public string InsertKyc(KycModel kycDocument)
        {
            AdminDA customerDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Customer);
            return customerDA.DAL_KycDocument(kycDocument);
        }

        public List<KycstatusModel> KYCStatus(int userId)
        {
            List<KycstatusModel> getstatus = new List<KycstatusModel>();
            try
            {
                CommonDA commonDA = new CommonDA();
                DataSet ds = commonDA.GetCommonFillData(userId, "", "KYCStatus");

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        KycstatusModel profiloverviewModel = new KycstatusModel();

                        if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Id = Convert.ToInt32(row["Id"]);
                        }
                        if (ds.Tables[0].Columns.Contains("Status") && !row["Status"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.Status = Convert.ToInt32(row["Status"]);
                            profiloverviewModel.StatusMessage = profiloverviewModel.Status == 0 ? "Your KYC is in Process !" : "Your KYC is now linked !";
                        }
                    
                        if (ds.Tables[0].Columns.Contains("UserId") && !row["UserId"].Equals(DBNull.Value))
                        {
                            profiloverviewModel.UserId = Convert.ToInt32(row["UserId"]);
                        }

                        getstatus.Add(profiloverviewModel);


                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return getstatus;
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
