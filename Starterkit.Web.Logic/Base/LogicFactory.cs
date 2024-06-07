using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Web.Logic.Base
{
    public static class LogicFactory
    {
        private static readonly Hashtable _LogicMap = new Hashtable();
        public static ILogic GetLogic(LogicType logicType)
        {
            if (_LogicMap[logicType] == null)
                _LogicMap[logicType] = CreateLogic(logicType);

            return (ILogic)_LogicMap[logicType];
        }

        private static ILogic CreateLogic(LogicType logicType)
        {
            switch (logicType)
            {
                case LogicType.Customer:
                    return new CustomerLogic();
                case LogicType.Email:
                    return new SendEmailLogic();
                case LogicType.Common:
                    return new CommonLogic();
                case LogicType.Case:
                    return new CaseLogic();
                case LogicType.Company:
                    return new CompanyLogic();
                default:
                    //If we get to this point, no logic has bee defined and the code 'SHOULD' fail...
                    throw new ArgumentException("No Logic defined for requested type: '" + logicType + "'");
            }
        }
    }
    public enum LogicType
    {
        Customer,
        Client,
        Agent,
        Email,
        Common,
        Case,
        Company       
    }
}
