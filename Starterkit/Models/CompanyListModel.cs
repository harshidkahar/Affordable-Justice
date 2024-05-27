namespace Starterkit.Models
{
    [Serializable]
    public class CompanyListModel
    {    
            public int CompanyKey { get; set; }
            public DateTime? Date { get; set; }
            public string Status { get; set; } // This will hold the translated status
            public int SrNo { get; set; } // This will hold the row number
    }
}
