using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]

    public class PatnerDetailsModel
    {
        /// <summary> 
        /// Represents Primary Key
        /// </summary>
        public int PartnerKey { get; set; }
        public int CompId { get; set; }
        /// <summary> 
        /// Represents Company Id
        /// </summary>

        public bool UAEResidence { get; set; }
        /// <summary> 
        /// Represents is it a UAE Residence or not ?
        /// </summary>

        public bool IsCompanyManager { get; set; }
        /// <summary> 
        /// Represents is it a Company Manager or not ?
        /// </summary>

        public string Name { get; set; }
        /// <summary> 
        /// Represents Name of partner
        /// </summary>

        public string EmailId { get; set; }
        /// <summary> 
        /// Represents Email id of partner
        /// </summary>

        public DateTime DateOfBirth { get; set; }
        /// <summary> 
        /// Represents Partner Date of Birth
        /// </summary>

        public string CountryCode { get; set; }
        /// <summary> 
        /// Represents partner country code of phone no
        /// </summary>

        public string Phone { get; set; }
        /// <summary> 
        /// Represents partner phone no
        /// </summary>

        public string EMRId { get; set; }
        /// <summary> 
        /// Represents partner Emirates Id
        /// </summary>

        public string PassportNo { get; set; }
        /// <summary> 
        /// Represents partner Passport No.
        /// </summary>

        public string Address { get; set; }
        /// <summary> 
        /// Represents partner Address.
        /// </summary>

        public string Country { get; set; }
        /// <summary> 
        /// Represents partner country.
        /// </summary>

        public string Nationality { get; set; }
        /// <summary> 
        /// Represents partner Nationality.
        /// </summary>

        public decimal PatnerOwnership { get; set; }
        /// <summary> 
        /// Represents patner ownership in company.
        /// </summary>


    }
}
