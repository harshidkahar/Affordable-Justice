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
                //List<DataType> _ListOfDataType = new List<DataType>();

                //_ListOfDataType.Add(new DataType("@FirstName", DbType.String, p_Customer.FirstName, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@LastName", DbType.String, p_Customer.LastName, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@Email", DbType.String, p_Customer.Email, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@CustomerGUID", DbType.Guid, p_Customer.CustomerGUID, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@ContactNo", DbType.String, p_Customer.ContactNo, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@IsActive", DbType.Boolean, p_Customer.IsActive, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@IdProof", DbType.String, p_Customer.IdProof, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@IdProofNumber", DbType.String, p_Customer.IdProofNumber, ParameterDirection.Input));
                //_ListOfDataType.Add(new DataType("@IdProofUrl", DbType.String, p_Customer.IdProofUrl, ParameterDirection.Input));

                ////_Result = Convert.ToString(DataAccess.ExecuteScalar("lf_Customer_Register", _ListOfDataType));
                //_Result = Convert.ToString(DataAccess.ExecuteNonQuery("lf_Customer_Register", _ListOfDataType, true));

                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("lf_Customer_Register",con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@CustomerGUID", SqlDbType.UniqueIdentifier).Value = p_Customer.CustomerGUID;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar).Value = p_Customer.FirstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar).Value = p_Customer.LastName;
                //cmd.Parameters.Add("@IdProof", SqlDbType.NVarChar).Value = "Emirates ID";// p_Customer.IdProof;
                //cmd.Parameters.Add("@IdProofNumber", SqlDbType.NVarChar).Value ="testId";//p_Customer.IdProofNumber;
                //cmd.Parameters.Add("@IdProofUrl", SqlDbType.NVarChar).Value = "Test URL";//p_Customer.IdProofUrl;
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
                //throw _Exception;
            }
        }

        public DataSet GetLoginId(string phone, string email, string otp)
        {
            try
            {
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[GetLoginId]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = email;
                cmd.Parameters.Add("@Phone", SqlDbType.VarChar).Value = phone;
                cmd.Parameters.Add("@Otp", SqlDbType.VarChar).Value = otp;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                // try { ds.Tables[opt].Clear(); } catch { }
                da.Fill(ds, "UserDetails");
                con.Close();
            }
            catch { }
            return ds;
        }
    }
}
