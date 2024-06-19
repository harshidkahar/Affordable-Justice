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
        private int _VisaKey;
        public int VisaKey
        {
            get { return _VisaKey; }
            set { _VisaKey = value; }
        }

        private int _CompId;
        public int CompId
        {
            get { return _CompId; }
            set { _CompId = value; }
        }

        private string _Name;
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }

        private string _DateOfBirth;
        public string DateOfBirth
        {
            get { return _DateOfBirth; }
            set { _DateOfBirth = value; }
        }

        private string _EmiratesId;
        public string EmiratesId
        {
            get { return _EmiratesId; }
            set { _EmiratesId = value; }
        }

        private string _CurrentAddress;
        public string CurrentAddress
        {
            get { return _CurrentAddress; }
            set { _CurrentAddress = value; }
        }

        private string _ResidenceAddress;
        public string ResidenceAddress
        {
            get { return _ResidenceAddress; }
            set { _ResidenceAddress = value; }
        }

        private string _Country;
        public string Country
        {
            get { return _Country; }
            set { _Country = value; }
        }

        private string _Nationality;
        public string Nationality
        {
            get { return _Nationality; }
            set { _Nationality = value; }
        }

        private string _PassportUrl;
        public string PassportUrl
        {
            get { return _PassportUrl; }
            set { _PassportUrl = value; }
        }

        private string _Opt;
        public string Opt
        {
            get { return _Opt; }
            set { _Opt = value; }
        }

       
    }
}
