using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class CustomerProfileModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int UserId { get; set; }
   
        public string FirstName { get; set; }
        /// <summary>
        /// Represents First Name of Customer
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Represents LastName
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Represents Email
        /// </summary>
        public string ContactNo { get; set; }
        /// <summary>
        /// Represents Phone no
        /// </summary>
        public DateTime? Dob { get; set; }
        /// <summary>
        /// Represents Date of BIrth
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Represents Country
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// Represents Nationality
        /// </summary>
        public string CountryCode { get; set; }
        /// <summary>
        /// Represents Country code
        /// </summary>
        public string Address_Flat { get; set; }
        /// <summary>
        /// Represents Address Flat
        /// </summary>
        public string Address_Building { get; set; }
        /// <summary>
        /// Represents Address Building
        /// </summary>

        public string Address { get; set; }
        /// <summary>
        /// Represents Whole Address
        /// </summary>


        public string Watchword { get; set; }
        /// <summary>
        /// Represents Password
        /// </summary>

    }


    [Serializable]
    public class CustomerProfileSettingModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int UserId { get; set; }

        public string FirstName { get; set; }
        /// <summary>
        /// Represents First Name of Customer
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Represents LastName
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Represents Email
        /// </summary>
        public string ContactNo { get; set; }
        /// <summary>
        /// Represents Phone no
        /// </summary>
        public DateTime? Dob { get; set; }
        /// <summary>
        /// Represents Date of BIrth
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Represents Country
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// Represents Nationality
        /// </summary>
        public string CountryCode { get; set; }
        /// <summary>
        /// Represents Country code
        /// </summary>
        public string Address_Flat { get; set; }
        /// <summary>
        /// Represents Address Flat
        /// </summary>
        public string Address_Building { get; set; }
        /// <summary>
        /// Represents Address Building
        /// </summary>

        public string Address { get; set; }
        /// <summary>
        /// Represents Whole Address
        /// </summary>


        public string Watchword { get; set; }
        /// <summary>
        /// Represents Password
        /// </summary>

    }
}
