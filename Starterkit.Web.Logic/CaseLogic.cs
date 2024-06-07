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
	public class CaseLogic : Starterkit.Web.Logic.Base.ILogic
	{
		

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
						if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
						{
							documentModel.Id = Convert.ToInt32(row["Id"]);
						}
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

		public List<ViewDocumentModel> GetDocumentDescription(int docId, int userId, int CaseId)
		{
			List<ViewDocumentModel> documentDetail = new List<ViewDocumentModel>();
			try
			{
				CommonDA commonDA = new CommonDA();
				DataSet ds = commonDA.GetCommonFillData(docId, "", "GetDocumentDetails");

				if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
				{
					foreach (DataRow row in ds.Tables[0].Rows)
					{
						ViewDocumentModel documentdetailModel = new ViewDocumentModel();
						if (ds.Tables[0].Columns.Contains("CaseId") && !row["CaseId"].Equals(DBNull.Value))
						{
							documentdetailModel.CaseKey = Convert.ToInt32(row["CaseId"]);
						}
						if (ds.Tables[0].Columns.Contains("DocName") && !row["DocName"].Equals(DBNull.Value))
						{
							documentdetailModel.DocName = Convert.ToString(row["DocName"]);
						}
						if (ds.Tables[0].Columns.Contains("Description") && !row["Description"].Equals(DBNull.Value))
						{
							documentdetailModel.Description = Convert.ToString(row["Description"]);
						}
						if (ds.Tables[0].Columns.Contains("DocumentUrl") && !row["DocumentUrl"].Equals(DBNull.Value))
						{
							documentdetailModel.DocumentUrl = Convert.ToString(row["DocumentUrl"]);
						}
						if (ds.Tables[0].Columns.Contains("Id") && !row["Id"].Equals(DBNull.Value))
						{
							documentdetailModel.Id = Convert.ToInt32(row["Id"]);
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
                        if (ds.Tables[0].Columns.Contains("cdesc") && !row["cdesc"].Equals(DBNull.Value))
                        {
                            casedetailModel.Cdesc = Convert.ToString(row["cdesc"]);
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



		public string CreateCase(CreateCaseModel _Createcase)
		{
			CaseDA caseDA = (CaseDA)DataAccessFactory.GetDataAccess(DataAccessType.Case);
			return caseDA.DAL_CreateCase(_Createcase);
		}

	
		public string DocumentDetail(UserDocumentModel updateDescription)
		{
			CaseDA caseDA = (CaseDA)DataAccessFactory.GetDataAccess(DataAccessType.Case);
			return caseDA.DAL_UserDocument(updateDescription);
		}

        public string CaseEdit(CaseUpdateModel Updatecase)
        {
            CaseDA caseDA = (CaseDA)DataAccessFactory.GetDataAccess(DataAccessType.Case);
            return caseDA.DAL_UpdateCase(Updatecase);
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
