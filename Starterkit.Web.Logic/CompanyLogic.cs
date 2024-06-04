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
	
	
		public string InsertDependent(InsertDependentModel addDependent)
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
