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
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = email;
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
					adminModel.EmailId = ds.Tables["AdminDetails"].Rows[0]["Email"].ToString();
					adminModel.Phone = ds.Tables["AdminDetails"].Rows[0]["ContactNo"].ToString();
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
				SqlCommand cmd = new SqlCommand("[dbo].[Insertadmin]", con);
				cmd.CommandType = CommandType.StoredProcedure;

				// Add parameters for the stored procedure
				cmd.Parameters.AddWithValue("@FirstName", insertAdmin.FirstName);
				cmd.Parameters.AddWithValue("@LastName", insertAdmin.LastName);
				cmd.Parameters.AddWithValue("@DateOfBirth", insertAdmin.DateOfBirth);
				cmd.Parameters.AddWithValue("@Phone", insertAdmin.Phone);
				cmd.Parameters.AddWithValue("@EmailId", insertAdmin.EmailId);
				cmd.Parameters.AddWithValue("@Address", insertAdmin.Address);
				cmd.Parameters.AddWithValue("@Country", insertAdmin.Country);
				cmd.Parameters.AddWithValue("@Nationality", insertAdmin.Nationality);
				cmd.Parameters.AddWithValue("@Timestamp", DateTime.Now);
				cmd.Parameters.AddWithValue("@IsActive", true);
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
                SqlCommand cmd = new SqlCommand("[dbo].[InsertAgent]", con);
                cmd.CommandType = CommandType.StoredProcedure;

                // Add parameters for the stored procedure
                cmd.Parameters.AddWithValue("@FirstName", insertAgent.FirstName);
                cmd.Parameters.AddWithValue("@LastName", insertAgent.LastName);
                cmd.Parameters.AddWithValue("@DateOfBirth", insertAgent.DateOfBirth);
                cmd.Parameters.AddWithValue("@Phone", insertAgent.Phone);
                cmd.Parameters.AddWithValue("@EmailId", insertAgent.EmailId);
                cmd.Parameters.AddWithValue("@Address", insertAgent.Address);
                cmd.Parameters.AddWithValue("@Country", insertAgent.Country);
                cmd.Parameters.AddWithValue("@Nationality", insertAgent.Nationality);
                cmd.Parameters.AddWithValue("@Role", insertAgent.Role);
                cmd.Parameters.AddWithValue("@Timestamp", DateTime.Now);
                cmd.Parameters.AddWithValue("@IsActive", true);
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
                SqlCommand cmd = new SqlCommand("[dbo].[AddLawyer]", con);
                cmd.CommandType = CommandType.StoredProcedure;

                // Add parameters for the stored procedure
                cmd.Parameters.AddWithValue("@FirstName", insertLawyer.FirstName);
                cmd.Parameters.AddWithValue("@LastName", insertLawyer.LastName);
                cmd.Parameters.AddWithValue("@LisenceNumber", insertLawyer.LisenceNo);
                cmd.Parameters.AddWithValue("@LawyerType", insertLawyer.LawyerType);
                cmd.Parameters.AddWithValue("@Company", insertLawyer.Company);
                cmd.Parameters.AddWithValue("@DateOfBirth", insertLawyer.DateOfBirth);
                cmd.Parameters.AddWithValue("@Phone", insertLawyer.Phone);
                cmd.Parameters.AddWithValue("@EmailId", insertLawyer.EmailId);
                cmd.Parameters.AddWithValue("@Address", insertLawyer.Address);
                cmd.Parameters.AddWithValue("@Country", insertLawyer.Country);
                cmd.Parameters.AddWithValue("@Nationality", insertLawyer.Nationality);
                cmd.Parameters.AddWithValue("@Timestamp", DateTime.Now);
                cmd.Parameters.AddWithValue("@IsActive", true);
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
