using System;

namespace Starterkit.Model
{
    [Serializable]
    public class PatnerDetailsModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        private int _partnerKey = 0;
        public int PartnerKey
        {
            get { return _partnerKey; }
            set { _partnerKey = value; }
        }

        /// <summary>
        /// Represents Company Id
        /// </summary>
        private int _compId = 0;
        public int CompId
        {
            get { return _compId; }
            set { _compId = value; }
        }

        /// <summary>
        /// Represents whether the partner is a UAE resident or not
        /// </summary>
        private bool _UAEResidence = false;
        public bool UAEResidence
        {
            get { return _UAEResidence; }
            set { _UAEResidence = value; }
        }

        /// <summary>
        /// Represents whether the partner is a company manager or not
        /// </summary>
        private bool _isCompanyManager = false;
        public bool IsCompanyManager
        {
            get { return _isCompanyManager; }
            set { _isCompanyManager = value; }
        }

        /// <summary>
        /// Represents the name of the partner
        /// </summary>
        private string _name = "";
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        /// <summary>
        /// Represents the email id of the partner
        /// </summary>
        private string _emailId = "";
        public string EmailId
        {
            get { return _emailId; }
            set { _emailId = value; }
        }

        /// <summary>
        /// Represents the date of birth of the partner
        /// </summary>
        private string _dateOfBirth = "";
        public string DateOfBirth
        {
            get { return _dateOfBirth; }
            set { _dateOfBirth = value; }
        }

        /// <summary>
        /// Represents the country code of the partner's phone number
        /// </summary>
        private string _countryCode = "";
        public string CountryCode
        {
            get { return _countryCode; }
            set { _countryCode = value; }
        }

        /// <summary>
        /// Represents the phone number of the partner
        /// </summary>
        private string _phone = "";
        public string Phone
        {
            get { return _phone; }
            set { _phone = value; }
        }

        /// <summary>
        /// Represents the Emirates Id of the partner
        /// </summary>
        private string _EMRId = "";
        public string EMRId
        {
            get { return _EMRId; }
            set { _EMRId = value; }
        }

        /// <summary>
        /// Represents the passport number of the partner
        /// </summary>
        private string _passportNo = "";
        public string PassportNo
        {
            get { return _passportNo; }
            set { _passportNo = value; }
        }

        /// <summary>
        /// Represents the address of the partner
        /// </summary>
        private string _address = "";
        public string Address
        {
            get { return _address; }
            set { _address = value; }
        }

        /// <summary>
        /// Represents the country of the partner
        /// </summary>
        private string _country = "";
        public string Country
        {
            get { return _country; }
            set { _country = value; }
        }

        /// <summary>
        /// Represents the nationality of the partner
        /// </summary>
        private string _nationality = "";
        public string Nationality
        {
            get { return _nationality; }
            set { _nationality = value; }
        }

        /// <summary>
        /// Represents the ownership percentage of the partner in the company
        /// </summary>
        private decimal _patnerOwnership = 0.0m;
        public decimal PatnerOwnership
        {
            get { return _patnerOwnership; }
            set { _patnerOwnership = value; }
        }

        /// <summary>
        /// Represents additional options or information related to the partner
        /// </summary>
        private string _opt = "";
        public string Opt
        {
            get { return _opt; }
            set { _opt = value; }
        }
    }
}
