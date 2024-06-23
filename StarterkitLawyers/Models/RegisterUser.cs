namespace Starterkit.Models
{
    [Serializable]
    public class RegisterUser
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Email { set; get; }
        public string ContactNo { set; get; }
        public string SponsorId { set; get; }
        public string CountryCode { set; get; }
        
    }
}
