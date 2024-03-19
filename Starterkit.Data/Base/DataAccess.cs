using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Data.Base
{
    internal static class DataAccess
    {
         public static string CONNECTION_STRING_KEY = "Server=DESKTOP-OSME1C4;Database=AffordableJustice;User Id=sa;password=admin@123;";
        public static string LIVE_CONNECTION_STRING = "Server=103.154.185.160;Database=AffordableJustice;User Id=sa;password=2]u8#X%`Ql<5";

        public static SqlConnection OpenConnection()
        {
            //string connStr = ConfigurationManager.ConnectionStrings[CONNECTION_STRING_KEY].ToString();
            string connStr = LIVE_CONNECTION_STRING;
            SqlConnection conn = new SqlConnection(connStr);
            conn.Open();
            return conn;
        }

        public static IDataReader GetDataReaderByStatement(string sqlCommand)
        {
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetSqlStringCommand(sqlCommand);


            // The ExecuteReader call will request the connection to be closed upon
            // the closing of the DataReader. The DataReader will be closed 
            // automatically when it is disposed.
            IDataReader dataReader = db.ExecuteReader(dbCommand);

            return dataReader;
        }


        public static string ExecuteNonQuery(string ProcedureName, List<DataType> oListOfDataType)
        {

            Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

            Int32 returnValue = 0;

            string sOutPramName = string.Empty;
            string _ReturnValue = string.Empty;

            foreach (DataType oDataType in oListOfDataType)
            {
                if (oDataType != null)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output || oDataType.Direction == ParameterDirection.InputOutput)
                    {
                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnValue);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

            }

            _ReturnValue = Convert.ToString(oDatabase.ExecuteNonQuery(oDbCommand));

            if (!string.IsNullOrEmpty(sOutPramName))
            {
                _ReturnValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, sOutPramName));

            }

            return _ReturnValue;
        }

        //public string ExecuteNonQueryWithSQLDatType(string ProcedureName, List<SQLDataType> oListOfDataType)
        //{

        //    Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
        //    DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

        //    Int32 returnValue = 0;

        //    string sOutPramName = string.Empty;
        //    string _ReturnValue = string.Empty;

        //    foreach (SQLDataType oDataType in oListOfDataType)
        //    {
        //        if (oDataType != null)
        //        {
        //            if (oDataType.Direction == ParameterDirection.Input)
        //            {
        //                oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.dbType, oDataType.Value);
        //            }

        //            if (oDataType.Direction == ParameterDirection.Output || oDataType.Direction == ParameterDirection.InputOutput)
        //            {
        //                oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.dbType, returnValue);
        //                sOutPramName = oDataType.ParameterName;
        //            }
        //        }

        //    }

        //    _ReturnValue = Convert.ToString(oDatabase.ExecuteNonQuery(oDbCommand));

        //    if (!string.IsNullOrEmpty(sOutPramName))
        //    {
        //        _ReturnValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, sOutPramName));

        //    }

        //    return _ReturnValue;
        //}

        public static List<string> ExecuteNonQuery(string ProcedureName, List<DataType> oListOfDataType, bool Status)
        {

            Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);

            DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

            Int32 returnValue = 0;

            string sOutPramName = string.Empty;
            string _ReturnValue = string.Empty;

            List<string> _ListOfReturn = new List<string>();

            foreach (DataType oDataType in oListOfDataType)
            {
                if (oDataType != null)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnValue);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

            }

            _ReturnValue = Convert.ToString(oDatabase.ExecuteNonQuery(oDbCommand));

            if (!string.IsNullOrEmpty(sOutPramName))
            {
                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        _ReturnValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, oDataType.ParameterName));
                        _ListOfReturn.Add(_ReturnValue);
                    }
                }
            }

            return _ListOfReturn;
        }

        public static string ExecuteNonQuery(string ProcedureName, List<DataType> oListOfDataType, out Dictionary<string, string> p_Outputparams)
        {

            Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);

            DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

            Int32 returnValue = 65535;

            string sOutPramName = string.Empty;
            string _ReturnValue = string.Empty;


            p_Outputparams = new Dictionary<string, string>();

            foreach (DataType oDataType in oListOfDataType)
            {
                if (oDataType != null)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnValue);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

            }

            _ReturnValue = Convert.ToString(oDatabase.ExecuteNonQuery(oDbCommand));

            if (!string.IsNullOrEmpty(sOutPramName))
            {
                string _OutputParamValue = string.Empty;

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        _OutputParamValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, oDataType.ParameterName));
                        p_Outputparams.Add(oDataType.ParameterName, _OutputParamValue);
                    }
                }
            }

            return _ReturnValue;
        }

        public static DataSet GetDataSet(string sProcedureName, List<DataType> oListOfDataType)
        {
            DataSet oDataSet = null;
            try
            {

                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(sProcedureName);
                oDbCommand.CommandTimeout = 0;

                foreach (DataType oDataType in oListOfDataType)
                {
                    oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                }

                oDataSet = oDatabase.ExecuteDataSet(oDbCommand);

            }
            catch (Exception oException)
            {
                throw oException;
            }
            return oDataSet;

        }


        public static DataSet GetDataSet(string sProcedureName, DataTable dataTable, string tableParameterName, string tableParameterType)
        {
            DataSet oDataSet = null;
            try
            {
                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(sProcedureName);
                oDbCommand.CommandTimeout = 0;
                var parameter = new SqlParameter($"@{tableParameterName}", SqlDbType.Structured);
                parameter.Value = dataTable;
                parameter.TypeName = tableParameterType; // My Table valued user defined type
                oDbCommand.Parameters.Add(parameter);
                oDataSet = oDatabase.ExecuteDataSet(oDbCommand);
            }
            catch (Exception oException)
            {
                throw oException;
            }
            return oDataSet;

        }

        public static DataSet GetDataSetWithOutParam(string sProcedureName, List<DataType> oListOfDataType, out string returnValue)
        {
            DataSet oDataSet = null;
            try
            {
                returnValue = string.Empty;

                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(sProcedureName);
                oDbCommand.CommandTimeout = 0;

                int returnSize = 0;

                string sOutPramName = string.Empty;

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnSize);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

                oDataSet = oDatabase.ExecuteDataSet(oDbCommand);

                if (!string.IsNullOrEmpty(sOutPramName))
                {
                    returnValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, sOutPramName));
                }

            }
            catch (Exception oException)
            {
                throw oException;
            }
            return oDataSet;

        }

        public static DataSet GetDataSetWithOutParam(string sProcedureName, List<DataType> oListOfDataType, out Dictionary<string, string> p_Outputparams)
        {
            DataSet oDataSet = null;
            try
            {
                p_Outputparams = new Dictionary<string, string>();

                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(sProcedureName);
                oDbCommand.CommandTimeout = 0;

                int returnSize = 0;

                string sOutPramName = string.Empty;

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        oDatabase.AddParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, ParameterDirection.InputOutput, "", DataRowVersion.Default, oDataType.Value);
//                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnSize);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

                oDataSet = oDatabase.ExecuteDataSet(oDbCommand);


                if (!string.IsNullOrEmpty(sOutPramName))
                {
                    string _OutputParamValue = string.Empty;

                    foreach (DataType oDataType in oListOfDataType)
                    {
                        if (oDataType.Direction == ParameterDirection.Output)
                        {
                            _OutputParamValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, oDataType.ParameterName));
                            p_Outputparams.Add(oDataType.ParameterName, _OutputParamValue);
                        }
                    }
                }


            }
            catch (Exception oException)
            {
                throw oException;
            }
            return oDataSet;

        }

        public static object ExecuteScalar(string ProcedureName, List<DataType> oListOfDataType)
        {

            Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

            object returnValue = 0;
            object iReturn = 0;

            string sOutPramName = string.Empty;

            
            foreach (DataType oDataType in oListOfDataType)
            {
                if (oDataType != null)
                {
                    if (oDataType.Direction == ParameterDirection.Input)
                    {
                        oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                    }

                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, 0);
                        sOutPramName = oDataType.ParameterName;
                    }
                }

            }

            iReturn = oDatabase.ExecuteScalar(oDbCommand);

            if (!string.IsNullOrEmpty(sOutPramName))
            {
                returnValue = oDatabase.GetParameterValue(oDbCommand, sOutPramName);
                return returnValue;
            }

            return iReturn;
        }

        /// <summary>
        /// This function is used to retrieve last affected text from database.
        /// </summary>
        /// <param name="ProcedureName">Stored procedure name.</param>
        /// <param name="oListOfDataType">List Of DataTypes.</param>
        /// <param name="returnVal">Return last affected text.</param>
        public static void ExecuteScalar(string ProcedureName, List<DataType> oListOfDataType, ref string returnVal)
        {
            try
            {
                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType != null)
                    {
                        if (oDataType.Direction == ParameterDirection.Input)
                        {
                            oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                        }
                    }
                }
                returnVal = Convert.ToString(oDatabase.ExecuteScalar(oDbCommand));
            }
            catch (Exception oException)
            {
                throw oException;
            }

        }

        /// <summary>
        /// This method is used for to GetDataSetByProcedure(Generic Function)
        /// </summary>
        /// <param name="sParameterName">Name of the s parameter.</param>
        /// <param name="sParameterValue">The s parameter value.</param>
        /// <param name="sProcedureName">Name of the s procedure.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName:GetDataSetByProcedure
        /// ================================================================================================
        public static DataSet GetDataSetByProcedure(string sParameterName, string sParameterValue, string sProcedureName)
        {
            DataSet oDataSet = null;
            Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand oDbCommand = oDatabase.GetStoredProcCommand(sProcedureName);
            try
            {
                oDatabase.AddInParameter(oDbCommand, sParameterName, DbType.String, sParameterValue);
            }
            catch (Exception oException)
            {
                throw oException;
            }
            oDataSet = oDatabase.ExecuteDataSet(oDbCommand);
            return oDataSet;
        }

        ///================================================================================================
        /// MethodName: GetDataReaderByProcedure, It is Generic Function.
        ///================================================================================================

        public static IDataReader GetDataReaderByProcedure(string procedureName)
        {

            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetStoredProcCommand(procedureName);

            // The ExecuteReader call will request the connection to be closed upon
            // the closing of the DataReader. The DataReader will be closed 
            // automatically when it is disposed.
            IDataReader dataReader = db.ExecuteReader(dbCommand);

            return dataReader;
        }

        public static IDataReader GetDataReader(string ProcedureName, List<DataType> oListOfDataType )
        {
            try
            {
                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                DbCommand oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType != null)
                    {
                        if (oDataType.Direction == ParameterDirection.Input)
                        {
                            oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                        }
                    }
                }

                IDataReader dataReader = oDatabase.ExecuteReader(oDbCommand);
                return dataReader;

            }
            catch (Exception oException)
            {
                throw oException;
            }
        }

        public static IDataReader GetDataReaderWithDBCommandOut(string ProcedureName, List<DataType> oListOfDataType ,out DbCommand oDbCommand)
        {
            try
            {
                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                 oDbCommand = oDatabase.GetStoredProcCommand(ProcedureName);

                string sOutPramName = string.Empty;
                int returnSize = 0;                

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType != null)
                    {
                        if (oDataType.Direction == ParameterDirection.Input)
                        {
                            oDatabase.AddInParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, oDataType.Value);
                        }
                        else if (oDataType.Direction == ParameterDirection.Output)
                        {
                            oDatabase.AddOutParameter(oDbCommand, oDataType.ParameterName, oDataType.DBType, returnSize);
                            sOutPramName = oDataType.ParameterName;
                        }
                    }
                }

                IDataReader dataReader = oDatabase.ExecuteReader(oDbCommand);


                return dataReader;

            }
            catch (Exception oException)
            {
                throw oException;
            }
        }

        public static Dictionary<string, string> GetReaderOutPutParameters(DbCommand oDbCommand, IDataReader dataReader, List<DataType> oListOfDataType)
        {

            try
            {
                dataReader.Close();
                Dictionary<string, string> p_Outputparams = new Dictionary<string, string>();
                Database oDatabase = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
                string _OutputParamValue = string.Empty;

                foreach (DataType oDataType in oListOfDataType)
                {
                    if (oDataType.Direction == ParameterDirection.Output)
                    {
                        _OutputParamValue = Convert.ToString(oDatabase.GetParameterValue(oDbCommand, oDataType.ParameterName));
                        p_Outputparams.Add(oDataType.ParameterName, _OutputParamValue);
                    }
                }
                return p_Outputparams;
            }
            catch (Exception oException)
            {

                throw oException;
            }

            //if (!string.IsNullOrEmpty(sOutPramName))
            //{

            // }

        }

        /// <summary>
        /// Gets the data set by statement.
        /// </summary>
        /// <param name="sqlCommand">The SQL command.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName: GetDataSetByStatement, It is a Generic Function.
        /// ================================================================================================
        public static DataSet GetDataSetByStatement(string sqlCommand)
        {
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration.
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);


            // DataSet that will hold the returned results		
            DataSet objectsDataSet = null;
            objectsDataSet = db.ExecuteDataSet(dbCommand);
            // Note: connection was closed by ExecuteDataSet method call 

            return objectsDataSet;
        }

        public static DataSet GetDataSetBySQLStatement(string Query)
        {
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration.
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetSqlStringCommand(Query);


            // DataSet that will hold the returned results		
            DataSet objectsDataSet = null;
            objectsDataSet = db.ExecuteDataSet(dbCommand);
            // Note: connection was closed by ExecuteDataSet method call 

            return objectsDataSet;
        }

        /// <summary>
        /// Gets the data set by procedure.
        /// </summary>
        /// <param name="procedureName">Name of the procedure.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName: GetDataSetByProcedure, It is a Generic Function.
        /// ================================================================================================

        public static DataSet GetDataSetByProcedure(string procedureName)
        {
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration.
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetStoredProcCommand(procedureName);

            // DataSet that will hold the returned results		
            DataSet objectsDataSet = null;
            dbCommand.CommandTimeout = 300;
            objectsDataSet = db.ExecuteDataSet(dbCommand);
            // Note: connection was closed by ExecuteDataSet method call 

            return objectsDataSet;
        }

        /// <summary>
        /// Gets the data set by procedure.
        /// </summary>
        /// <param name="Category">The category.</param>
        /// <param name="procedureName">Name of the procedure.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName: GetDataSetByProcedure, It is a Generic Function.
        /// ================================================================================================

        public static DataSet GetDataSetByProcedure(int Category, string procedureName)
        {
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration.
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetStoredProcCommand(procedureName);

            // Retrieve products from the specified category.
            db.AddInParameter(dbCommand, "CategoryID", DbType.Int32, Category);

            // DataSet that will hold the returned results		
            DataSet objectsDataSet = null;
            objectsDataSet = db.ExecuteDataSet(dbCommand);
            // Note: connection was closed by ExecuteDataSet method call 

            return objectsDataSet;
        }
        ///================================================================================================
        /// MethodName: GetDataSetByProcedure, It is a Generic Function.
        ///================================================================================================

        public static DataSet GetDataSetByProcedure(Database db, DbCommand dbCommand)
        {

            // DataSet that will hold the returned results		
            DataSet objectsDataSet = null;
            objectsDataSet = db.ExecuteDataSet(dbCommand);
            // Note: connection was closed by ExecuteDataSet method call 

            return objectsDataSet;
        }

        public static Database CreateDataBase()
        {
            return DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
        }
        /// <summary>
        /// Saves the details by procedure.
        /// </summary>
        /// <param name="productID">The product ID.</param>
        /// <param name="procedureName">Name of the procedure.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName: SaveDetailsByProcedure, It is a Generic Function.
        /// ================================================================================================

        public static int SaveDetailsByProcedure(int productID, string procedureName)
        {
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration.
            Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);
            DbCommand dbCommand = db.GetStoredProcCommand(procedureName);

            // Add paramters
            // Input parameters can specify the input value
            db.AddInParameter(dbCommand, "ProductID", DbType.Int32, productID);

            // Output parameters specify the size of the return data
            db.AddOutParameter(dbCommand, "generatedID", DbType.Int32, 9);

            db.ExecuteNonQuery(dbCommand);

            // Row of data is captured via output parameters
            int results = (int)db.GetParameterValue(dbCommand, "generatedID");

            return results;
        }
        /// <summary>
        /// Gets the scalar value by procedure.
        /// </summary>
        /// <param name="valueID">The value ID.</param>
        /// <param name="procedureName">Name of the procedure.</param>
        /// <returns></returns>
        /// ================================================================================================
        /// MethodName: GetScalarValueByProcedure, It is a Generic Function.
        /// ================================================================================================

        public static string GetScalarValueByProcedure(int valueID, string procedureName)
        {
            string returnValue = string.Empty;

            try
            {
                // Create the Database object, using the default database service. The
                // default database service is determined through configuration.
                Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);

                // Passing the productID value to the GetStoredProcCommand
                // results in parameter discovery being used to correctly establish the parameter
                // information for the productID. Subsequent calls to this method will
                // cause the block to retrieve the parameter information from the 
                // cache, and not require rediscovery.
                DbCommand dbCommand = db.GetStoredProcCommand(procedureName, valueID);

                // Retrieve ProdcutName. ExecuteScalar returns an object, so
                // we cast to the correct type (string).
                returnValue = (string)db.ExecuteScalar(dbCommand);

            }

            catch (Exception oException)
            {
                throw oException;
            }

            return returnValue;
        }

        public static Int32 GetScalarValueByProcedure(string valueID, string procedureName)
        {
            Int32 returnValue = 0;
            // Create the Database object, using the default database service. The
            // default database service is determined through configuration. 
            try
            {

                Database db = DatabaseFactory.CreateDatabase(CONNECTION_STRING_KEY);

                // Passing the productID value to the GetStoredProcCommand
                // results in parameter discovery being used to correctly establish the parameter
                // information for the productID. Subsequent calls to this method will
                // cause the block to retrieve the parameter information from the 
                // cache, and not require rediscovery.
                DbCommand dbCommand = db.GetStoredProcCommand(procedureName, valueID);

                // Retrieve ProdcutName. ExecuteScalar returns an object, so
                // we cast to the correct type (string).
                if (!Convert.IsDBNull(db.ExecuteScalar(dbCommand)))
                {
                    returnValue = Convert.ToInt32(db.ExecuteScalar(dbCommand));
                }

            }

            catch (Exception oException)
            {
                throw oException;
            }

            return returnValue;

        }
    }
}
