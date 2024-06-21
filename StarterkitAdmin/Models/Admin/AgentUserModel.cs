﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
	[Serializable]
	public class AgentUserModel
	{
		private int _Id;
		public int Id
		{
			get { return _Id; }
			set { _Id = value; }
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

		private DateTime _DateOfBirth;
		public DateTime DateOfBirth
		{
			get { return _DateOfBirth; }
			set { _DateOfBirth = value; }
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
        private int _Role;
        public int Role
        {
            get { return _Role; }
            set { _Role = value; }
        }
    }
}