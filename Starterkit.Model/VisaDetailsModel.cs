using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class VisaDetailsModel
    {
        /// <summary> 
        /// Represents Primary Key
        /// </summary>
        public int VisaKey { get; set; }
        public int CompId { get; set; }
        /// <summary> 
        /// Represents Company Id.
        /// </summary>
        public string Name { get; set; }
        /// <summary> 
        /// Represents Name.
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary> 
        /// Represents Date of Birth.
        /// </summary>
        public string EmiratesId { get; set; }
        /// <summary> 
        /// Represents Emirates Id
        /// </summary>

        public string CurrentAddress { get; set; }
        /// <summary> 
        /// Represents Current Address
        /// </summary>
        public string ResidenceAddress { get; set; }
        /// <summary> 
        /// Represents Resident Address
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
