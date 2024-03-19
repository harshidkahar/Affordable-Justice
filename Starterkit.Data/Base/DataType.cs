using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Data.Base
{
    internal class DataType
    {
        public string ParameterName { get; set; }

        public DbType DBType { get; set; }

        public object Value { get; set; }

        public ParameterDirection Direction { get; set; }

        public DataType()
        {

        }

        public DataType(string ParameterName, DbType DBType, object Value, ParameterDirection Direction)
        {
            this.ParameterName = ParameterName;
            this.DBType = DBType;
            this.Value = Value;
            this.Direction = Direction;
        }
    }
}