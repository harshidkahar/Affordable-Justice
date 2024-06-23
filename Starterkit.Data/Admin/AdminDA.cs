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
    public class AdminDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        DataSet ds = new DataSet();
    
        public AdminModel GetLoginId(string phone, string email, string otp)
        {
            AdminModel adminModel = new AdminModel();
            try
            {
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[GetLoginId_Admin]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = email;
                cmd.Parameters.Add("@Phone", SqlDbType.VarChar).Value = phone;
                cmd.Parameters.Add("@Otp", SqlDbType.VarChar).Value = otp;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(ds, "AdminDetails");
                con.Close();
                if (ds.Tables["AdminDetails"].Rows.Count > 0)
                {
					adminModel.Id = Convert.ToInt32(ds.Tables["AdminDetails"].Rows[0]["Id"]);
					adminModel.FirstName = ds.Tables["AdminDetails"].Rows[0]["FirstName"].ToString();
					adminModel.LastName = ds.Tables["AdminDetails"].Rows[0]["LastName"].ToString();
					adminModel.EmailId = ds.Tables["AdminDetails"].Rows[0]["EmailId"].ToString();
					adminModel.Phone = ds.Tables["AdminDetails"].Rows[0]["Phone"].ToString();
					adminModel.Nationality = ds.Tables["AdminDetails"].Rows[0]["Nationality"].ToString();
					adminModel.Country = ds.Tables["AdminDetails"].Rows[0]["Country"].ToString();
                }
            }
            catch (Exception ex){ }
            return adminModel;
        }

		// Method for inserting a new admin
		public String InsertAdmin(AdminModel insertAdmin)
		{
			try
			{
				string _Result = string.Empty;
				Guid guid = Guid.NewGuid();

				con = DataAccess.OpenConnection();
				SqlCommand cmd = new SqlCommand("[dbo].[DAL_Admin]", con);
				cmd.CommandType = CommandType.StoredProcedure;

				// Add parameters for the stored procedure
				cmd.Parameters.AddWithValue("@Id", insertAdmin.Id);
				cmd.Parameters.AddWithValue("@FirstName", (object)insertAdmin.FirstName ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@LastName", (object)insertAdmin.LastName ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@DateOfBirth", (object)insertAdmin.DateOfBirth ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@CountryCode", (object)insertAdmin.CountryCode ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Phone", (object)insertAdmin.Phone ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@EmailId", (object)insertAdmin.EmailId ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Address", (object)insertAdmin.Address ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Country", (object)insertAdmin.Country ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Nationality", (object)insertAdmin.Nationality ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Opt", (object)insertAdmin.Opt ?? DBNull.Value);
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

        public String InsertAgent(AgentModel insertAgent)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Agent]", con);
                cmd.CommandType = CommandType.StoredProcedure;

				// Add parameters for the stored procedure
				cmd.Parameters.AddWithValue("@Id", insertAgent.Id);
				cmd.Parameters.AddWithValue("@FirstName", (object)insertAgent.FirstName ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@LastName", (object)insertAgent.LastName ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@DateOfBirth", (object)insertAgent.DateOfBirth ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@CountryCode", (object)insertAgent.CountryCode ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Phone", (object)insertAgent.Phone ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@EmailId", (object)insertAgent.EmailId ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Address", (object)insertAgent.Address ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Country", (object)insertAgent.Country ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Nationality", (object)insertAgent.Nationality ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Role", (object)insertAgent.Role ?? DBNull.Value);
				cmd.Parameters.AddWithValue("@Opt", (object)insertAgent.Opt ?? DBNull.Value);
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

        public String InsertLawyer(LawyerModel insertLawyer)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[DAL_Lawyer]", con);
                cmd.CommandType = CommandType.StoredProcedure;

				// Add parameters for the stored procedure
				cmd.Parameters.AddWithValue("@Id", insertLawyer.Id);
				cmd.Parameters.AddWithValue("@FirstName", insertLawyer.FirstName ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@LastName", insertLawyer.LastName ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@LisenceNumber", insertLawyer.LisenceNo ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@LawyerType", insertLawyer.LawyerType ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Company", insertLawyer.Company ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@DateOfBirth", insertLawyer.DateOfBirth ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Phone", insertLawyer.Phone ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@CountryCode", insertLawyer.CountryCode ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@EmailId", insertLawyer.EmailId ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Address", insertLawyer.Address ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Country", insertLawyer.Country ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Nationality", insertLawyer.Nationality ?? (object)DBNull.Value);
				cmd.Parameters.AddWithValue("@Opt", insertLawyer.Opt);
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

        public string DAL_AdminNew(AdminProfileSettingModel profileUpdate)
        {
            try
            {
                string _Result = string.Empty;
                Guid guid = Guid.NewGuid();

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[UpdateAdminProfile]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = profileUpdate.UserId;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = profileUpdate.FirstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = profileUpdate.LastName;
                cmd.Parameters.Add("@CountryCode", SqlDbType.NVarChar).Value = profileUpdate.CountryCode;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar).Value = profileUpdate.Phone;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.DateTime).Value = profileUpdate.DateOfBirth;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar).Value = profileUpdate.Address;
                cmd.Parameters.Add("@Address_Flat", SqlDbType.NVarChar).Value = profileUpdate.Address_Flat;
                cmd.Parameters.Add("@Address_Building", SqlDbType.NVarChar).Value = profileUpdate.Address_Building;
                cmd.Parameters.Add("@Country", SqlDbType.NVarChar).Value = profileUpdate.Country;
                cmd.Parameters.Add("@Nationality", SqlDbType.NVarChar).Value = profileUpdate.Nationality;
                cmd.Parameters.Add("@EmailId", SqlDbType.NVarChar).Value = profileUpdate.EmailId;
                cmd.Parameters.Add("@Username", SqlDbType.NVarChar).Value = profileUpdate.Username;
                cmd.Parameters.Add("@Watchword", SqlDbType.NVarChar).Value = profileUpdate.Watchword;
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

        

    }
}
