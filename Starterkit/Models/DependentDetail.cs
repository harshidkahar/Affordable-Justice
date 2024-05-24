namespace Starterkit.Models
{
    [Serializable]
    public class DependentDetail
    {
        public int CompId { get; set; }
        public string Name { get; set; }
        public string EmailId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Nationality { get; set; }
        public string PassportUrl { get; set; }
     
    }
}
