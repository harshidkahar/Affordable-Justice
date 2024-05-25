using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
   public class ViewCompanyListModel
    {
        /// <summary> 
        /// Represents Primary Key
        /// </summary>  
        public int CompanyKey { get; set; }
        public string SerialNumber { get; set; }
        /// <summary>
        /// Represents Serial Number
        /// </summary>
        public bool Status { get; set; }
        /// <summary>
        /// Represents Status Of Company
        /// </summary>
        public DateTime Timestamp { get; set; }
        ///<summary>
        ///Represents Time Last Modified
        /// </summary>
    }
}
