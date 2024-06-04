using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class InsertDependentModel
    {
        public int Id { get; set; }
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int CompKey { get; set; }
        //public int UserId { get; set; }
        /// <summary>
        /// Represents User Id
        /// </summary>
        public string DepVisa { get; set; }
        /// <summary>
        /// Represents Visa
        /// </summary>
        public string dependvisaName { get; set; }
        /// <summary>
        /// Represents Name
        /// </summary>
        public string dependvisaEmail { get; set; }
        /// <summary>
        /// Represents Email
        /// </summary>
        public string dependvisaDOB { get; set; }
        /// <summary>
        /// Represents DOB
        /// </summary>
        public string dependvisaPasspno { get; set; }
        /// <summary>
        /// Represents Passport No
        /// </summary>
        public string dependvisaAddress { get; set; }
        /// <summary>
        /// Represents Address
        /// </summary>
        public string dependvisacountry { get; set; }
        /// <summary>
        /// Represents Country
        /// </summary>
        public string dependvisanationality { get; set; }
        /// <summary>
        /// Represents Nationality
        /// </summary>
       
        public string Opt {  get; set; }
    }
}
