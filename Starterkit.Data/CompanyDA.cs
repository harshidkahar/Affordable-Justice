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

    }
}
