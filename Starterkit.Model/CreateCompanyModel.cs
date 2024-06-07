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
        private int _id = 0;
        public int Id 
        { 
            get 
            { 
                return _id;
            } 
            set 
            { 
                _id = value; 
            } 
        }

        /// <summary>
        /// Represents User Id
        /// </summary>
        private int _userId = 0;
        public int UserId 
        {
			get
			{
				return _userId;
			}
			set
			{
				_userId = value;
			}
		}
        /// <summary>
        /// Represents Application Type
        /// </summary>
        private string _applicationType = "";
        public string ApplicationType
		{
			get
			{
				return _applicationType;
			}
			set
			{
				_applicationType = value;
			}
		}
		/// <summary>
		/// Represents Company Type
		/// </summary>
		private string _companyType = "";
		public string CompanyType {
			get
			{
				return _companyType;
			}
			set
			{
				_companyType = value;
			}
		}
		/// <summary>
		/// Represents Business City
		/// </summary>
		private string _businessCity = "";
		public string BusinessCity {
			get
			{
				return _businessCity;
			}
			set
			{
				_businessCity = value;
			}
		}
		/// <summary>
		/// Represents Business Location
		/// </summary>
		private string _businessLocation = "";
		public string BusinessLocation {
			get
			{
				return _businessLocation;
			}
			set
			{
				_businessLocation = value;
			}
		}
		/// <summary>
		/// Represents Business Category
		/// </summary>
		private string _businessCategory = "";
		public string BusinessCategory {
			get
			{
				return _businessCategory;
			}
			set
			{
				_businessCategory = value;
			}
		}
		/// <summary>
		/// Represents No of Resident Visa
		/// </summary>
		private int _noOfResidentVisa = 0;
		public int NoOfResidentVisa {
			get
			{
				return _noOfResidentVisa;
			}
			set
			{
				_noOfResidentVisa = value;
			}
		}
		/// <summary>
		/// Represents Dependent Visa Required
		/// </summary>
		private bool _dependentVisaReq = false;
		public bool DependentVisaReq {
			get
			{
				return _dependentVisaReq;
			}
			set
			{
				_dependentVisaReq = value;
			}
		}

		private string _dependentVisareqtext ="";

		public string dependentVisaReqText
		{
			get { 
			
				return _dependentVisareqtext;
			}
			set
			{
				_dependentVisareqtext = value;
			}
		}

        /// <summary>
        /// Represents OfficeType.
        /// </summary>
        private string _officeType = "";
		public string OfficeType {
			get
			{
				return _officeType;
			}
			set
			{
				_officeType = value;
			}
		}
		///<summary>
		/// Represents Your Office Type.
		/// </summary>
		private string _yourOfficeType = "";
		public string YourOfficeType {
			get
			{
				return _yourOfficeType;
			}
			set
			{
				_yourOfficeType = value;
			}
		}
		/// <summary>
		/// Represents Start Business Plan.
		/// </summary>
		private string _startBusiness = "";
		public string StartBusiness {
			get
			{
				return _startBusiness;
			}
			set
			{
				_startBusiness = value;
			}
		}
		/// <summary>
		/// Represents Has Business Name
		/// </summary>
		private bool _hasBusinessName=false;
		public bool HasBusinessName {
			get
			{
				return _hasBusinessName;
			}
			set
			{
				_hasBusinessName = value;
			}
		}

        private string _businessnametext = "";

        public string BusinessNameText
        {
            get
            {

                return _businessnametext;
            }
            set
            {
                _businessnametext = value;
            }
        }


        /// <summary>
        /// Represents Business Name Option
        /// </summary>
        private string _businessNameOption = "";
		public string BusinessNameOption {
			get
			{
				return _businessNameOption;
			}
			set
			{
				_businessNameOption = value;
			}
		}
		/// <summary>
		/// Represents Need Assistance On means Needed Any Service
		/// </summary>
		private string _needAssistanceOn = "";
		public string NeedAssistanceOn {
			get
			{
				return _needAssistanceOn;
			}
			set
			{
				_needAssistanceOn = value;
			}
		}
		/// <summary>
		/// Represents First Name
		/// </summary>
		private string _firstName = "";
		public string FirstName {
			get
			{
				return _firstName;
			}
			set
			{
				_firstName = value;
			}
		}
		/// <summary>
		/// Represents Last Name
		/// </summary>
		private string _lastName = "";
		public string LastName {
			get
			{
				return _lastName;
			}
			set
			{
				_lastName = value;
			}
		}
		/// <summary>
		/// Represents Email Id
		/// </summary>
		private string _emailId = "";
		public string EmailId {
			get
			{
				return _emailId;
			}
			set
			{
				_emailId = value;
			}
		}
		/// <summary>
		/// Represents Country Code.
		/// </summary>
		private string _countryCode = "";
		public string CountryCode {
			get
			{
				return _countryCode;
			}
			set
			{
				_countryCode = value;
			}
		}
		/// <summary>
		/// Represents Phone No
		/// </summary>
		private string _phone = "";
		public string Phone {
			get
			{
				return _phone;
			}
			set
			{
				_phone = value;
			}
		}
		/// <summary>
		/// Represents Residential Address
		/// </summary>
		private string _rAddress = "";
		public string RAddress {
			get
			{
				return _rAddress;
			}
			set
			{
				_rAddress = value;
			}
		}
		/// <summary>
		/// Represents Current Address
		/// </summary>
		private string _cAddress = "";
		public string CAddress {
			get
			{
				return _cAddress;
			}
			set
			{
				_cAddress = value;
			}
		}
		/// <summary>
		/// Represents Country.
		/// </summary>
		private string _country = "";
		public string Country {
			get
			{
				return _country;
			}
			set
			{
				_country = value;
			}
		}
		/// <summary>
		/// Represents Nationality.
		/// </summary>
		private string _nationality = "";
		public string Nationality {
			get
			{
				return _nationality;
			}
			set
			{
				_nationality = value;
			}
		}
		/// <summary>
		/// Represents Passport URL.
		/// </summary>
		private string _passportUrl = "";
		public string PassportUrl {
			get
			{
				return _passportUrl;
			}
			set
			{
				_passportUrl = value;
			}
		}
		/// <summary>
		/// Represents Passport Photo URL.
		/// </summary>
		/// 
		private string _passportPhotoUrl = "";
		public string PassportPhotoUrl {
			get
			{
				return _passportPhotoUrl;
			}
			set
			{
				_passportPhotoUrl = value;
			}
		}

		///<summary>
		///Represent Opt
		/// </summary>
		private string _opt = "";
		public string Opt {
			get
			{
				return _opt;
			}
			set
			{
				_opt = value;
			}
		}
    
    }
}
