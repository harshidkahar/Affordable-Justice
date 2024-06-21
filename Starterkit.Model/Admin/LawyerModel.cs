﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
	[Serializable]
	public class LawyerModel
	{
		private int _Id;
		public int Id
		{
			get { return _Id; }
			set { _Id = value; }
		}

		private string _Name;
		public string Name
		{
			get { return _Name; }
			set { _Name = value; }
		}

		private string _LisenceNo;
		public string LisenceNo
		{
			get { return _LisenceNo; }
			set { _LisenceNo = value; }
		}

        private string _LawyerType;
        public string LawyerType
        {
            get { return _LawyerType; }
            set { _LawyerType = value; }
        }

        private string _Company;
        public string Company
        {
            get { return _Company; }
            set { _Company = value; }
        }


        private string _EmailId;
		public string EmailId
		{
			get { return _EmailId; }
			set { _EmailId = value; }
		}

		private string _CountryCode;
		
		public string CountryCode
		{
            get { return _CountryCode; }
            set { _CountryCode = value; }
        }

		private string _Phone;
		public string Phone
		{
			get { return _Phone; }
			set { _Phone = value; }
		}

		private string _DateOfBirth;
		public string DateOfBirth
		{
			get { return _DateOfBirth; }
			set { _DateOfBirth = value; }
		}

		private string _Username;
		public string Username
		{
			get { return _Username; }
			set { _Username = value; }
		}

		private string _Watchword;
		public string Watchword
		{
			get { return _Watchword; }
			set { _Watchword = value; }
		}

		private string _Address;
		public string Address
		{
			get { return _Address; }
			set { _Address = value; }
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

		private DateTime _Timestamp;
		public DateTime Timestamp
		{
			get { return _Timestamp; }
			set { _Timestamp = value; }
		}

		private bool _IsActive;
		public bool IsActive
		{
			get { return _IsActive; }
			set { _IsActive = value; }
		}

		private string _FirstName;
		public string FirstName
		{
			get { return _FirstName; }
			set { _FirstName = value; }
		}

		private string _LastName;
		public string LastName
		{
			get { return _LastName; }
			set { _LastName = value; }
		}
		private string _Opt;
		public string Opt
		{
            get { return _Opt; }
            set { _Opt = value; }
        }
	}
}