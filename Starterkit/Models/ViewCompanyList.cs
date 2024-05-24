namespace Starterkit.Models
{
    [Serializable]
    public class ViewCompanyList
    {
        public int UserId { get; set; }
        public string SerialNumber { get; set; }
        public bool Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
