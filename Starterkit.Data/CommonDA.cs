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
    public class CommonDA :IDataAccess
    {
        public SqlConnection con = new SqlConnection();
        
        public DataSet GetCommonFillData(int id, string searchtext, string opt)
        {
            DataSet ds = new DataSet();
            try
            {
                con = DataAccess.OpenConnection();
                SqlCommand cmd = new SqlCommand("[dbo].[Common_Fill]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                cmd.Parameters.Add("@Searchtxt", SqlDbType.VarChar).Value = searchtext;
                cmd.Parameters.Add("@Opt", SqlDbType.NVarChar).Value = opt;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds, opt);
                return ds;
            }
            catch (Exception _Exception)
            {
                return ds = null;
                //throw _Exception;
            }
        }
    }
}
