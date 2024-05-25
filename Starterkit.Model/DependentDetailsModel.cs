using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class DependentDetailsModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int DependentKey { get; set; }
        public int CompId { get; set; }
        /// <summary>
        /// Represents Company Id
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Represents Name
        /// </summary>
        public string EmailId { get; set; }
        /// <summary>
        /// Represents Email id
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary>
        /// Represents Date of Birth
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Represents Address
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Represents Country
        /// </summary>  
        public string Nationality { get; set; }
        /// <summary>
        /// Represents Nationality
        /// </summary>
        public string PassportUrl { get; set; }
        /// <summary>
        /// Represents Passport URL.
        /// </summary>


    }
}
