namespace Starterkit.Models
{
    [Serializable]
    public class VisaDetails
    {
        public int CompId { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; } 
        public string EmiratesId { get; set; } 
        public string CurrentAddress { get; set; } 
        public string ResidenceAddress { get; set; } 
        public string Country { get; set; } 
        public string Nationality { get; set; } 
        public string PassportUrl { get; set; } 
        
    }



}
