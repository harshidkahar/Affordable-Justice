namespace Starterkit.Models
{
    [Serializable]
    public class AdminProfile
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string EmailId { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

		public string Address_Flat { get; set; }

		public string Address_Building { get; set; }

		public string Country { get; set; }
        public string Nationality { get; set; }

        public string Username { get; set; }

        public string Watchword { get; set; }

    }

    [Serializable]
    public class AdminProfileSetting
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string EmailId { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public string Address_Flat { get; set; }

        public string Address_Building { get; set; }

        public string Country { get; set; }
        public string Nationality { get; set; }

        public string Username { get; set; }

        public string Watchword { get; set; }


    }


}
