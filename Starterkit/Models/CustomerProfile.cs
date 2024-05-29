namespace Starterkit.Models
{
    [Serializable]
    public class CustomerProfile
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string EmailId { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string Address_Flat { get; set; }
        public string Address_Building { get; set; }
        public string Country { get; set; }
        public string Nationality { get; set; }

    }

    [Serializable]
    public class ProfileSetting
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Email { get; set; }
        public string CountryCode { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Address_Flat { get; set; }
        public string Address_Building { get; set; }
        public string Country { get; set; }
        public string Nationality { get; set; }


    }


}
