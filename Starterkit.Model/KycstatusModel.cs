using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class KycstatusModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
       
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public int Status { get; set; }
        /// <summary>
        /// Represent Status   
        ///</summary>
        ///
        public string StatusMessage { get; set; }
        ///<summary>
        /// Represent Status Message.
        ///</summary>
    }
}
