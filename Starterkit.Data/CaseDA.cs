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
    public class CaseDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        DataSet ds = new DataSet();
        
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


       
    }
}
