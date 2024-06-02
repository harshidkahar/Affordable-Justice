using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class KycModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
       
        public int Id { get; set; }
        public int UserId { get; set; }
        public string EmiratesId { get; set; }
        /// <summary>
        /// Represents EmiratesvId
        /// /// </summary>
        public string PassportNo { get; set; }
        /// <summary>
        /// Represents Passport No
        /// </summary>
        public string PassportFrontUrl { get; set; }
        /// <summary>
        /// Represents Passport Front URL
        /// </summary>
        public string PassportBackUrl { get; set; }
        /// <summary>
        /// Represents Passport Back URL
        /// </summary>  
        public string KycDocumentUrl { get; set; }
        /// <summary>
        /// Represents Kyc Document URL
        /// </summary>
       
        public string Opt { get; set; }
        /// <summary>
        /// Represent Opt   
        ///</summary>


    }
}
