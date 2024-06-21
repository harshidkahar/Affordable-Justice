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
	public class AdminLogic : Starterkit.Web.Logic.Base.ILogic
	{
		// Create New User
		public string AddAdmin(AdminModel creataAdmin)
		{
			AdminDA adminDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
			return adminDA.InsertAdmin(creataAdmin);
		}

        public string AddAgent(AgentModel creataAgent)
        {
            AdminDA adminDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
            return adminDA.InsertAgent(creataAgent);
        }

        public string AddLawyer(LawyerModel creataLawyer)
        {
            AdminDA adminDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
            return adminDA.InsertLawyer(creataLawyer);
        }


        //Validate Email

        public string ValidateEmail(string email)
		{
			AdminCommonLogic commonLogic = (AdminCommonLogic)LogicFactory.GetLogic(LogicType.AdminCommonLogic);
			return commonLogic.GetAdminValue(0, email, "ValidateAdminEmail");
		}

		public string ValidateChangeEmail(string email, int id)
		{
			AdminCommonLogic commonLogic = (AdminCommonLogic)LogicFactory.GetLogic(LogicType.AdminCommonLogic);
			return commonLogic.GetAdminValue(id, email, "ValidateAdminChangeEmail");
		}

		public AdminModel ValidateOtp(string phone, string email, string otp)
		{
			AdminModel adminModel = new AdminModel();
			AdminDA adminDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
			return adminModel = adminDA.GetLoginId(phone, email, otp);
		}

		public string UpdateEmail(int Id, string email, string otp)
		{
			AdminDA adminDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
			return adminDA.UpdateEmail(Id, email, otp);
		}

		public List<AdminProfileModel> Overview(int userId)
		{
			List<AdminProfileModel> profileoverview = new List<AdminProfileModel>();
			try
			{
				AdminCommonDA commonDA = new AdminCommonDA();
				DataSet ds = commonDA.GetAdminCommonFillData(userId, "", "AdminDetails");

				if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
				{
					foreach (DataRow row in ds.Tables[0].Rows)
					{
						AdminProfileModel adminprofiloverviewModel = new AdminProfileModel();

						if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.UserId = Convert.ToInt32(row["Id"]);
						}
						if (!string.IsNullOrEmpty(adminprofiloverviewModel.FirstName))
						{
                            adminprofiloverviewModel.FirstName += " ";
						}
                        adminprofiloverviewModel.FirstName += (row["FirstName"] ?? "").ToString();

						if (!string.IsNullOrEmpty(adminprofiloverviewModel.LastName))
						{
                            adminprofiloverviewModel.LastName += " ";
						}
                        adminprofiloverviewModel.LastName += (row["LastName"] ?? "").ToString();

						if (ds.Tables[0].Columns.Contains("DateOfBirth") && !row["DateOfBirth"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.DateOfBirth = Convert.ToDateTime(row["DateOfBirth"]);
						}
						if (ds.Tables[0].Columns.Contains("EmailId") && !row["EmailId"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.EmailId = Convert.ToString(row["EmailId"]);
						}
						if (ds.Tables[0].Columns.Contains("Phone") && !row["Phone"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.Phone = Convert.ToString(row["Phone"]);
						}
						if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.CountryCode = Convert.ToString(row["CountryCode"]);
						}
						
						if (ds.Tables[0].Columns.Contains("Address") && !row["Address"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.Address = Convert.ToString(row["Address"]);
						}
						if (ds.Tables[0].Columns.Contains("Country") && !row["Country"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.Country = Convert.ToString(row["Country"]);
						}
						if (ds.Tables[0].Columns.Contains("Nationality") && !row["Nationality"].Equals(DBNull.Value))
						{
                            adminprofiloverviewModel.Nationality = Convert.ToString(row["Nationality"]);
						}

						profileoverview.Add(adminprofiloverviewModel);


					}
				}
			}
			catch (Exception ex)
			{
				// Handle exception
			}
			return profileoverview;
		}

		public List<AdminProfileSettingModel> Setting(int userId)
		{
			List<AdminProfileSettingModel> profilesetting = new List<AdminProfileSettingModel>();
			try
			{
				AdminCommonDA commonDA = new AdminCommonDA();
				DataSet ds = commonDA.GetAdminCommonFillData(userId, "", "AdminDetails");

				if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
				{
					foreach (DataRow row in ds.Tables[0].Rows)
					{
						AdminProfileSettingModel profilsettingModel = new AdminProfileSettingModel();

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

						if (ds.Tables[0].Columns.Contains("DateOfBirth") && !row["DateOfBirth"].Equals(DBNull.Value))
						{
							profilsettingModel.DateOfBirth = Convert.ToDateTime(row["DateOfBirth"]);
						}
						if (ds.Tables[0].Columns.Contains("EmailId") && !row["EmailId"].Equals(DBNull.Value))
						{
							profilsettingModel.EmailId = Convert.ToString(row["EmailId"]);
						}
						if (ds.Tables[0].Columns.Contains("Phone") && !row["Phone"].Equals(DBNull.Value))
						{
							profilsettingModel.Phone = Convert.ToString(row["Phone"]);
						}
						if (ds.Tables[0].Columns.Contains("CountryCode") && !row["CountryCode"].Equals(DBNull.Value))
						{
							profilsettingModel.CountryCode = Convert.ToString(row["CountryCode"]);
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
		
		public string UpdateAdmin(AdminProfileSettingModel profileUpdate)
		{
			AdminDA customerDA = (AdminDA)DataAccessFactory.GetDataAccess(DataAccessType.Admin);
			return customerDA.DAL_AdminNew(profileUpdate);
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
