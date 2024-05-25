using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class ViewCaseListModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int CaseKey { get; set; }
        public string PrimaryCaseType { get; set; }
        /// <summary>
        /// Represents Case-Type
        /// </summary>
        public string ThirdCaseType { get; set; }
        /// <summary>
        /// Represents SubCase-Type
        /// </summary>
        public DateTime DateCommenced { get; set; }
        /// <summary>
        /// Represents Date Commenced
        /// </summary>
        public int Status { get; set; }
        ///<summary>
        ///Represents Status.
        ///</summary>   
    }
}
