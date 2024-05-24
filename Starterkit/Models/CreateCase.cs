namespace Starterkit.Models
{
    [Serializable]
    public class CreateCase
    {
         public int UserId { get; set; }
        public string PrimaryCaseType { get; set; }
        public string SecondaryCaseType { get; set; }
        public string ThirdCaseType { get; set; }
        public bool ProceedingYet { get; set; }
        public DateTime DateCommenced { get; set; }
        public string PreviousCaseNo { get; set; }
        public string CurrentCaseNo { get; set; }
        public bool LegalAdviceInferred { get; set; }
        public string WhichCourt { get; set; }
        public string Opname { get; set; }
        public string Opmail { get; set; }
        public string Opmob { get; set; }
        public string Emrid { get; set; }
        public string Passno { get; set; }
        public string Cdesc { get; set; }
       
    }
}
