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
        /// Represents Serial number
        /// </summary>
        public int SrNo { get; set; }
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int CaseKey { get; set; }
        /// <summary>
        /// Represents Case-Type
        /// </summary>
        public string PrimaryCaseType { get; set; }
        /// <summary>
        /// Represents SubCase-Type
        /// </summary>
        public string ThirdCaseType { get; set; }
        /// <summary>
        /// Represents Date Commenced
        /// </summary>
        public DateTime? DateCommenced { get; set; }
        ///<summary>
        ///Represents Status.
        ///</summary>   
        public string Status { get; set; }
        ///
     
    }
}
