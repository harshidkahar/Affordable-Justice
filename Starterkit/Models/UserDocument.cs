namespace Starterkit.Models
{
    [Serializable]
    public class UserDocument
    {
        public string Description { get; set; }
        public string FileName { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Size { get; set; }
        public string DocName { get; set; }

        }

    [Serializable]
    public class ViewDocument 
    { 
        public string DocName { get; set; }
        public string Description { get; set; }
        public string DocumentUrl { get; set; }

    }
}
