namespace Starterkit.Models
{
    [Serializable]
    public class ViewCaselist
    {
        public int UserId {  get; set; }
        public string PrimaryCaseType { get; set; }
        public string ThirdCaseType { get; set; }
        public DateTime DateCommenced { get; set; }
        public int Status { get; set; }
    }
}
