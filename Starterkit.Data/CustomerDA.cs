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
