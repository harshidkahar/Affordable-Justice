using Starterkit.Data.Base;
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
    public class CompanyDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        DataSet ds = new DataSet();
    
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

		public string DAL_UpdateCompany(CreateCompanyModel updateCompany) {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Company]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = updateCompany.Id;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = updateCompany.UserId;
                cmd.Parameters.Add("@ApplicationType", SqlDbType.NVarChar).Value = updateCompany.ApplicationType;
                cmd.Parameters.Add("@CompanyType", SqlDbType.NVarChar).Value = updateCompany.CompanyType;
                cmd.Parameters.Add("@BusinessCity", SqlDbType.NVarChar).Value = updateCompany.BusinessCity;
                cmd.Parameters.Add("@BusinessLocation", SqlDbType.NVarChar).Value = updateCompany.BusinessLocation;
                cmd.Parameters.Add("@BusinessCategory", SqlDbType.NVarChar).Value = updateCompany.BusinessCategory;
                cmd.Parameters.Add("@NoOfResidentVisa", SqlDbType.Int).Value = updateCompany.NoOfResidentVisa;
                cmd.Parameters.Add("@DependentVisaReq", SqlDbType.Bit).Value = updateCompany.DependentVisaReq;
                cmd.Parameters.Add("@OfficeType", SqlDbType.NVarChar).Value = updateCompany.OfficeType;
                cmd.Parameters.Add("@YourOfficeType", SqlDbType.NVarChar).Value = updateCompany.YourOfficeType;
                cmd.Parameters.Add("@StartBusiness", SqlDbType.NVarChar).Value = updateCompany.StartBusiness;
                cmd.Parameters.Add("@HasBusinessName", SqlDbType.Bit).Value = updateCompany.HasBusinessName;
                cmd.Parameters.Add("@BusinessNameOption", SqlDbType.NVarChar).Value = updateCompany.BusinessNameOption;
                cmd.Parameters.Add("@NeedAssistanceOn", SqlDbType.NVarChar).Value = updateCompany.NeedAssistanceOn;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = updateCompany.FirstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = updateCompany.LastName;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = updateCompany.EmailId;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar).Value = updateCompany.Phone;
                cmd.Parameters.Add("@CAddress", SqlDbType.NVarChar).Value = updateCompany.CAddress;
                cmd.Parameters.Add("@RAddress", SqlDbType.NVarChar).Value = updateCompany.RAddress;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = updateCompany.Country;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = updateCompany.Nationality;
                cmd.Parameters.Add("@CountryCode", SqlDbType.NVarChar).Value = updateCompany.CountryCode;
                cmd.Parameters.Add("@PassportUrl", SqlDbType.NVarChar).Value = "C:/Downloads/passport.pdf";
                cmd.Parameters.Add("@PassportPhotoUrl", SqlDbType.NVarChar).Value = "C:/Downloads/passportPhoto.pdf";
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = updateCompany.Opt;
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

        public string DAL_Dependent(InsertDependentModel addDependent)
        {
            string returnValue = "invalid";
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();
                ds.Tables.Clear();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_DependentDetail]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = addDependent.Id;
                cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = addDependent.CompKey;
                //cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = addDependent.UserId;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = addDependent.dependvisaName;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = addDependent.dependvisaEmail;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.NVarChar).Value = addDependent.dependvisaDOB;
                cmd.Parameters.Add("@PassportNo", SqlDbType.NVarChar).Value = addDependent.dependvisaPasspno;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar).Value = addDependent.dependvisaAddress;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = addDependent.dependvisacountry;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = addDependent.dependvisanationality;
                cmd.Parameters.Add("@PassportUrl", SqlDbType.NVarChar).Value = "C://Downloads/ABC.pdf";
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = addDependent.Opt;
                SqlDataAdapter da = new SqlDataAdapter();
                cmd.ExecuteNonQuery();
                con.Close();
                return _Result = "done";
            }
            catch (Exception ex)
            {
                return "false";

            }
        }

        public string DAL_Partner(PatnerDetailsModel addPartner)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Partner]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = addPartner.PartnerKey;
                cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = addPartner.CompId;
                cmd.Parameters.Add("@UAEResidence", SqlDbType.Bit).Value = addPartner.UAEResidence;
                cmd.Parameters.Add("@IsCompanyManager", SqlDbType.Bit).Value = addPartner.IsCompanyManager;
                //cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = addDependent.UserId;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = addPartner.Name;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = addPartner.EmailId;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.NVarChar).Value = addPartner.DateOfBirth;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar).Value = addPartner.Address;
                cmd.Parameters.Add("@CountryCode", SqlDbType.NVarChar).Value = addPartner.CountryCode;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar).Value = addPartner.Phone;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = addPartner.Country;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = addPartner.Nationality;
                cmd.Parameters.Add("@EMRId", SqlDbType.NVarChar).Value = addPartner.EMRId;
                cmd.Parameters.Add("@PassportNo", SqlDbType.NVarChar).Value = addPartner.PassportNo;
                cmd.Parameters.Add("@PatnerOwnership", SqlDbType.Decimal).Value = addPartner.PatnerOwnership;
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = addPartner.Opt;
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

        public string DAL_VisaDetail(VisaDetailsModel addVisa)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Visa]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = addVisa.VisaKey;
                cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = addVisa.CompId;
                //cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = addDependent.UserId;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = addVisa.Name;
                cmd.Parameters.Add("@EmiratesId", SqlDbType.NVarChar).Value = addVisa.EmiratesId;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.NVarChar).Value = addVisa.DateOfBirth;
                cmd.Parameters.Add("@CurrentAddress", SqlDbType.NVarChar).Value = addVisa.CurrentAddress;
                cmd.Parameters.Add("@ResidenceAddress", SqlDbType.NVarChar).Value = addVisa.ResidenceAddress;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = addVisa.Country;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = addVisa.Nationality;
                cmd.Parameters.Add("@PassportUrl", SqlDbType.NVarChar).Value = "C://Downloads/ABC.pdf";
                cmd.Parameters.Add("@Opt", SqlDbType.Char).Value = addVisa.Opt;
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
