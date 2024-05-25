using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class CreateCompanyModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int CompanyKey { get; set; }
        public int UserId { get; set; }
        /// <summary>
        /// Represents User Id
        /// </summary>
        public string ApplicationType { get; set; }
        /// <summary>
        /// Represents Application Type
        /// </summary>
        public string CompanyType { get; set; }
        /// <summary>
        /// Represents Company Type
        /// </summary>
        public string BusinessCity { get; set; }
        /// <summary>
        /// Represents Business City
        /// </summary>
        public string BusinessLocation { get; set; }
        /// <summary>
        /// Represents Business Location
        /// </summary>
        public string BusinessCategory { get; set; }
         /// <summary>
         /// Represents Business Category
         /// </summary>
        public int NoOfResidentVisa { get; set; }
        /// <summary>
        /// Represents No of Resident Visa
        /// </summary>
        public bool DependentVisaReq { get; set; }
        /// <summary>
        /// Represents Dependent Visa Required
        /// </summary>
        public string OfficeType { get; set; }
        /// <summary>
        /// Represents OfficeType.
        /// </summary>
        public string YourOfficeType { get; set; }
        ///<summary>
        /// Represents Your Office Type.
        /// </summary>
        public string StartBusiness { get; set; }
        /// <summary>
        /// Represents Start Business Plan.
        /// </summary>
        public bool HasBusinessName { get; set; }
        /// <summary>
        /// Represents Has Business Name
        /// </summary>
        public string BusinessNameOption { get; set; }
        /// <summary>
        /// Represents Business Name Option
        /// </summary>
        public string NeedAssistanceOn { get; set; }
        /// <summary>
        /// Represents Need Assistance On means Needed Any Service
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Represents First Name
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Represents Last Name
        /// </summary>
        public string EmailId { get; set; }
        /// <summary>
        /// Represents Email Id
        /// </summary>
        public string CountryCode { get; set; }
        /// <summary>
        /// Represents Country Code.
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Represents Phone No
        /// </summary>
        public string RAddress { get; set; }
        /// <summary>
        /// Represents Residential Address
        /// </summary>
        public string CAddress { get; set; }
        /// <summary>
        /// Represents Current Address
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Represents Country.
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// Represents Nationality.
        /// </summary>
        public string PassportUrl { get; set; }
        /// <summary>
        /// Represents Passport URL.
        /// </summary>
        public string PassportPhotoUrl { get; set; }
        /// <summary>
        /// Represents Passport Photo URL.
        /// </summary>
    
    }
}
