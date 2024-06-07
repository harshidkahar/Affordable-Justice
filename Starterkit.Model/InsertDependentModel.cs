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
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        private int _id = 0;
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        /// <summary>
        /// Represents Company Key
        /// </summary>
        private int _compKey = 0;
        public int CompKey
        {
            get { return _compKey; }
            set { _compKey = value; }
        }

        /// <summary>
        /// Represents Visa Name
        /// </summary>
        private string _dependVisaName = "";
        public string dependvisaName
        {
            get { return _dependVisaName; }
            set { _dependVisaName = value; }
        }

        /// <summary>
        /// Represents Visa Email
        /// </summary>
        private string _dependVisaEmail = "";
        public string dependvisaEmail
        {
            get { return _dependVisaEmail; }
            set { _dependVisaEmail = value; }
        }

        /// <summary>
        /// Represents Visa Date of Birth
        /// </summary>
        private string _dependVisaDOB = "";
        public string dependvisaDOB
        {
            get { return _dependVisaDOB; }
            set { _dependVisaDOB = value; }
        }

        /// <summary>
        /// Represents Visa Passport Number
        /// </summary>
        private string _dependVisaPasspno = "";
        public string dependvisaPasspno
        {
            get { return _dependVisaPasspno; }
            set { _dependVisaPasspno = value; }
        }
        /// <summary>
        /// Represents Visa Address
        /// </summary>
        private string _dependVisaAddress = "";
        public string dependvisaAddress
        {
            get { return _dependVisaAddress; }
            set { _dependVisaAddress = value; }
        }


        /// <summary>
        /// Represents Visa Country
        /// </summary>
        private string _dependVisaCountry = "";
        public string dependvisacountry
        {
            get { return _dependVisaCountry; }
            set { _dependVisaCountry = value; }
        }


        /// <summary>
        /// Represents Visa Nationality
        /// </summary>
        private string _dependVisaNationality = "";
        public string dependvisanationality
        {
            get { return _dependVisaNationality; }
            set { _dependVisaNationality = value; }
        }

        /// <summary>
        /// Represents an Optional field
        /// </summary>
        private string _opt = "";
        public string Opt
        {
            get { return _opt; }
            set { _opt = value; }
        }
    }
}
