namespace Starterkit.Models
{
    [Serializable]
    public class PatnerDetails
    {
        public int CompId { get; set; }
        public bool UAEResidence { get; set; }
        public bool IsCompanyManager { get; set; }
        public string Name { get; set; }
        public string EmailId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string EMRId { get; set; }
        public string PassportNo { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Nationality { get; set; }
        public decimal PatnerOwnership { get; set; }
        public string CountryCode { get; set; }

    }
}
