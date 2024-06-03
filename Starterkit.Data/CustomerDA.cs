﻿using Starterkit.Data.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Starterkit.Model;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;
using System.Numerics;

namespace Starterkit.Data
{
    public class CustomerDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        DataSet ds = new DataSet();
        public string InsertCustomer(UserModel p_Customer)
        {
            try
            {
                string _Result = string.Empty;
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("lf_Customer_Register",con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@CustomerGUID", SqlDbType.UniqueIdentifier).Value = p_Customer.CustomerGUID;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = p_Customer.FirstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = p_Customer.LastName;
                cmd.Parameters.Add("@SponsorEmail", SqlDbType.NVarChar).Value = p_Customer.SponsorId;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = p_Customer.Email;
                cmd.Parameters.Add("@ContactNo", SqlDbType.NVarChar).Value = p_Customer.ContactNo;
                SqlDataAdapter dap = new SqlDataAdapter();
                dap.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result="done";
            }
            catch (Exception _Exception)
            {
                return "false";
            }
        }

        public UserModel GetLoginId(string phone, string email, string otp)
        {
            UserModel userModel = new UserModel();
            try
            {
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[GetLoginId]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = email;
                cmd.Parameters.Add("@Phone", SqlDbType.VarChar).Value = phone;
                cmd.Parameters.Add("@Otp", SqlDbType.VarChar).Value = otp;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(ds, "UserDetails");
                con.Close();
                if (ds.Tables["UserDetails"].Rows.Count > 0)
                {
                    userModel.Id = Convert.ToInt32(ds.Tables["UserDetails"].Rows[0]["Id"]);
                    userModel.FirstName = ds.Tables["UserDetails"].Rows[0]["FirstName"].ToString();
                    userModel.LastName = ds.Tables["UserDetails"].Rows[0]["LastName"].ToString();
                    userModel.Email = ds.Tables["UserDetails"].Rows[0]["Email"].ToString();
                    userModel.ContactNo = ds.Tables["UserDetails"].Rows[0]["ContactNo"].ToString();
                    userModel.SponsorId = ds.Tables["UserDetails"].Rows[0]["SponsorId"].ToString();
                    userModel.CustomerGUID = Guid.Parse(ds.Tables["UserDetails"].Rows[0]["CustomerGUID"].ToString());
                    userModel.Country = ds.Tables["UserDetails"].Rows[0]["Country"].ToString();
                }
            }
            catch (Exception ex){ }
            return userModel;
        }

        public string DAL_CreateCase(CreateCaseModel _createCase)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_CreateCase]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = _createCase.CaseKey;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = _createCase.UserId;
                cmd.Parameters.Add("@PrimaryCaseType", SqlDbType.NVarChar).Value = _createCase.PrimaryCaseType;
                cmd.Parameters.Add("@SecondaryCaseType", SqlDbType.NVarChar).Value = _createCase.SecondaryCaseType;
                cmd.Parameters.Add("@ThirdCaseType", SqlDbType.NVarChar).Value = _createCase.ThirdCaseType;
                cmd.Parameters.Add("@ProceedingYet", SqlDbType.Int).Value = _createCase.ProceedingYet;
                cmd.Parameters.Add("@DateCommenced", SqlDbType.NVarChar).Value = _createCase.DateCommenced;
                cmd.Parameters.Add("@PreviousCaseNo", SqlDbType.NVarChar).Value = _createCase.PreviousCaseNo;
                cmd.Parameters.Add("@CurrentCaseNo", SqlDbType.NVarChar).Value = _createCase.CurrentCaseNo;
                cmd.Parameters.Add("@LegalAdviceInferred", SqlDbType.Int).Value = _createCase.LegalAdviceInferred;
                cmd.Parameters.Add("@whichCourt", SqlDbType.NVarChar).Value = _createCase.whichCourt;
                cmd.Parameters.Add("@opname", SqlDbType.NVarChar).Value = _createCase.opname;
                cmd.Parameters.Add("@opmail", SqlDbType.NVarChar).Value = _createCase.opmail;
                cmd.Parameters.Add("@opmob", SqlDbType.NVarChar).Value = _createCase.opmob;
                cmd.Parameters.Add("@emrid", SqlDbType.NVarChar).Value = _createCase.emrid;
                cmd.Parameters.Add("@passno", SqlDbType.NVarChar).Value = _createCase.passno;
                cmd.Parameters.Add("@cdesc", SqlDbType.NVarChar).Value = _createCase.cdesc;
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = _createCase.Opt;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex) {
                return "false";
            }
        }

        public string DAL_CustomerNew(CustomerProfileSettingModel profileUpdate)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Customer]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@CustomerGUID", SqlDbType.UniqueIdentifier).Value = profileUpdate.CustomerGUID;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = profileUpdate.FirstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = profileUpdate.LastName;
                cmd.Parameters.Add("@ContactNo", SqlDbType.NVarChar).Value = profileUpdate.ContactNo;
                cmd.Parameters.Add("@CountryCode", SqlDbType.NVarChar).Value = profileUpdate.CountryCode;
                cmd.Parameters.Add("@Dob", SqlDbType.NVarChar).Value = profileUpdate.Dob;
                cmd.Parameters.Add("@Address_Flat", SqlDbType.NVarChar).Value = profileUpdate.Address_Flat;
                cmd.Parameters.Add("@Address_Building", SqlDbType.NVarChar).Value = profileUpdate.Address_Building;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar).Value = profileUpdate.Address;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = profileUpdate.Country;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = profileUpdate.Nationality;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";

            }
        }

        public string DAL_UserDocument(UserDocumentModel updateDescription)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_UserDocument]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = updateDescription.Id;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = updateDescription.UserId;
                cmd.Parameters.Add("@CaseId", SqlDbType.Int).Value = updateDescription.CaseKey;
                cmd.Parameters.Add("@DocumentUrl", SqlDbType.NVarChar).Value = updateDescription.DocumentUrl;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar).Value = updateDescription.Description;
                cmd.Parameters.Add("@FileName", SqlDbType.NVarChar).Value = updateDescription.FileName;
                cmd.Parameters.Add("@Size", SqlDbType.NVarChar).Value = updateDescription.Size;
                cmd.Parameters.Add("@DocName", SqlDbType.NVarChar).Value = updateDescription.DocName;
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = updateDescription.Opt;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";
            }
        }

        public string UpdateEmail(int Id, string email, string otp)
        {
            string returnValue = "invalid";
            try
            {
                ds.Tables.Clear();
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[UpdateEmail]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value=Id;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = email;
                cmd.Parameters.Add("@Otp", SqlDbType.VarChar).Value = otp;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                // try { ds.Tables[opt].Clear(); } catch { }
                da.Fill(ds, "UpdateEmail");
                con.Close();
                if (ds.Tables["UpdateEmail"].Rows.Count > 0)
                {
                    returnValue = ds.Tables["UpdateEmail"].Rows[0]["Value"].ToString();
                }
            }
            catch { }
            return returnValue;
        }

		public string DAL_Company(CreateCompanyModel createCompany)
		{
			string returnValue = "invalid";
			try
			{
				string _Result = string.Empty;
				Guid guid = Guid.NewGuid();
				ds.Tables.Clear();
				con = DataAccess.OpenConnection();
				SqlCommand cmd = new SqlCommand("[dbo].[DAL_Company]", con);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.Add("@Id", SqlDbType.Int).Value = createCompany.Id;
				cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = createCompany.UserId;
				cmd.Parameters.Add("@ApplicationType", SqlDbType.NVarChar).Value = createCompany.ApplicationType;
				cmd.Parameters.Add("@CompanyType", SqlDbType.NVarChar).Value = createCompany.CompanyType;
				cmd.Parameters.Add("@BusinessCity", SqlDbType.NVarChar).Value = createCompany.BusinessCity;
				cmd.Parameters.Add("@BusinessLocation", SqlDbType.NVarChar).Value = createCompany.BusinessLocation;
                cmd.Parameters.Add("@BusinessCategory", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@NoOfResidentVisa", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@DependentVisaReq", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@OfficeType", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@YourOfficeType", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@StartBusiness", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@HasBusinessName", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@BusinessNameOption", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@NeedAssistanceOn", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@Phone", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@RAddress", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@CAddress", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@PassportUrl", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@PassportPhotoUrl", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@CountryCode", SqlDbType.NVarChar).Value = "";
				cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = "I";
				SqlDataAdapter da = new SqlDataAdapter();
				da.SelectCommand = cmd;
				da.Fill(ds, "CreateCompany");
				if (ds.Tables["CreateCompany"].Rows.Count > 0)
				{
					returnValue = ds.Tables["CreateCompany"].Rows[0]["Value"].ToString();
				}
				con.Close();
				return returnValue;
			}
			catch (Exception ex)
			{
				return "false";

			}
		}
		public string DAL_Dependent(InsertDependentModel addDependent)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_DependentDetail]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = addDependent.Id;
                cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = addDependent.CompKey;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = addDependent.UserId;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = addDependent.dependvisaName;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = addDependent.dependvisaEmail;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.NVarChar).Value = addDependent.dependvisaDOB;
                cmd.Parameters.Add("@Address", SqlDbType.Int).Value = addDependent.dependvisaAddress;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = addDependent.dependvisacountry;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = addDependent.dependvisanationality;
                cmd.Parameters.Add("@PassportNo", SqlDbType.NVarChar).Value = addDependent.dependvisaPasspno;
                cmd.Parameters.Add("@PassportUrl", SqlDbType.NVarChar).Value = "C://Downloads/ABC.pdf";
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = addDependent.Opt;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";

            }
        }




        public string DAL_UpdateCase(CaseUpdateModel caseUpdate)
        {
            try
            {
                string _Result = string.Empty;

                using (SqlConnection con = DataAccess.OpenConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[DAL_UpdateCase]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = caseUpdate.CaseKey;
                        //cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = caseUpdate.UserId;
                        cmd.Parameters.Add("@PrimaryCaseType", SqlDbType.NVarChar).Value =caseUpdate.PrimaryCaseType;
                        cmd.Parameters.Add("@SecondaryCaseType", SqlDbType.NVarChar).Value= caseUpdate.SecondaryCaseType;
                        cmd.Parameters.Add("@ThirdCaseType", SqlDbType.NVarChar).Value = caseUpdate.ThirdCaseType;
                        cmd.Parameters.Add("@ProceedingYet", SqlDbType.Int).Value = caseUpdate.ProceedingYet;
                        cmd.Parameters.Add("@DateCommenced", SqlDbType.NVarChar).Value = caseUpdate.DateCommenced;
                        cmd.Parameters.Add("@PreviousCaseNo", SqlDbType.NVarChar).Value = caseUpdate.PreviousCaseNo;
                        cmd.Parameters.Add("@CurrentCaseNo", SqlDbType.NVarChar).Value = caseUpdate.CurrentCaseNo;
                        cmd.Parameters.Add("@LegalAdviceInferred", SqlDbType.Int).Value = caseUpdate.LegalAdviceInferred;
                        cmd.Parameters.Add("@whichCourt", SqlDbType.NVarChar).Value = caseUpdate.whichCourt;
                        cmd.Parameters.Add("@opname", SqlDbType.NVarChar).Value = caseUpdate.opname;
                        cmd.Parameters.Add("@opmail", SqlDbType.NVarChar).Value = caseUpdate.opmail;
                        cmd.Parameters.Add("@opmob", SqlDbType.NVarChar).Value = caseUpdate.opmob;
                        cmd.Parameters.Add("@emrid", SqlDbType.NVarChar).Value = caseUpdate.emrid;
                        cmd.Parameters.Add("@passno", SqlDbType.NVarChar).Value = caseUpdate.passno;
                        cmd.Parameters.Add("@cdesc", SqlDbType.NVarChar).Value = caseUpdate.cdesc;


                        cmd.ExecuteNonQuery();
                    }
                }
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";
            }
        }


       

        public string DAL_KycDocument(KycModel kycDocument)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Kyc]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = kycDocument.Id;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = kycDocument.UserId;
                cmd.Parameters.Add("@EmiratesId", SqlDbType.NVarChar).Value = kycDocument.EmiratesId;
                cmd.Parameters.Add("@PassportNo", SqlDbType.NVarChar).Value = kycDocument.PassportNo;
                cmd.Parameters.Add("@PassportFrontUrl", SqlDbType.NVarChar).Value = kycDocument.PassportFrontUrl;
                cmd.Parameters.Add("@PassportBackUrl", SqlDbType.NVarChar).Value = kycDocument.PassportBackUrl;
                cmd.Parameters.Add("@KycDocumentUrl", SqlDbType.NVarChar).Value = kycDocument.KycDocumentUrl;
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = kycDocument.Opt;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";
            }
        }

    }
}
