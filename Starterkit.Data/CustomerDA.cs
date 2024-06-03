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
                // try { ds.Tables[opt].Clear(); } catch { }
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
                }   

            }
            catch { }
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
