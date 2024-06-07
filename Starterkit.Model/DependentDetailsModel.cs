using System;

namespace Starterkit.Model
{
    [Serializable]
    public class DependentDetailsModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        private int _dependentKey = 0;
        public int DependentKey
        {
            get { return _dependentKey; }
            set { _dependentKey = value; }
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
        /// Represents Name
        /// </summary>
        private string _name = "";
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        /// <summary>
        /// Represents Email id
        /// </summary>
        private string _emailId = "";
        public string EmailId
        {
            get { return _emailId; }
            set { _emailId = value; }
        }

        /// <summary>
        /// Represents Date of Birth
        /// </summary>
        private DateTime _dateOfBirth;
        public DateTime DateOfBirth
        {
            get { return _dateOfBirth; }
            set { _dateOfBirth = value; }
        }

        /// <summary>
        /// Represents Address
        /// </summary>
        private string _address = "";
        public string Address
        {
            get { return _address; }
            set { _address = value; }
        }

        /// <summary>
        /// Represents Country
        /// </summary>
        private string _country = "";
        public string Country
        {
            get { return _country; }
            set { _country = value; }
        }

        /// <summary>
        /// Represents Nationality
        /// </summary>
        private string _nationality = "";
        public string Nationality
        {
            get { return _nationality; }
            set { _nationality = value; }
        }

        /// <summary>
        /// Represents Passport URL.
        /// </summary>
        private string _passportUrl = "";
        public string PassportUrl
        {
            get { return _passportUrl; }
            set { _passportUrl = value; }
        }
    }
}
