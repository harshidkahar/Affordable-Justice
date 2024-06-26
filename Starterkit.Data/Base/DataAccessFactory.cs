﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Data.Base
{
    public static class DataAccessFactory
    {
        private static readonly Hashtable _DAMap = new Hashtable();

        public static IDataAccess GetDataAccess(DataAccessType daType)
        {
            if (_DAMap[daType] == null)
                _DAMap[daType] = CreateDataAccess(daType);

            return (IDataAccess)_DAMap[daType];
        }

        private static IDataAccess CreateDataAccess(DataAccessType daType)
        {
            switch (daType)
            {
                case DataAccessType.Customer:
                    return new CustomerDA();
                case DataAccessType.Email:
                    return new EmailDA();
                case DataAccessType.Common:
                    return new CommonDA();
                case DataAccessType.Case:
                    return new CaseDA();
                case DataAccessType.Company:
                    return new CompanyDA();
               default:
                    //If we get to this point, no logic has bee defined and the code 'SHOULD' fail...
                    throw new ArgumentException("No Logic defined for requested type: '" + daType + "'");
            }
        }
    }

    public enum DataAccessType
    {
        Customer,
        Email,
        Common,
        Case,
        Company
    }
}