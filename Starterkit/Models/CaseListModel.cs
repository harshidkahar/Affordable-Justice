namespace Starterkit.Models
{
    [Serializable]
    public class CaseListModel
    {    
            public int CaseKey { get; set; }
            public string PrimaryCaseType { get; set; }
            public string ThirdCaseType { get; set; }
            public DateTime DateCommenced { get; set; }
            public string Status { get; set; } // This will hold the translated status
            public int SrNo { get; set; } // This will hold the row number
    }
}
