namespace Starterkit.Models
{
    [Serializable]
    public class UpdateCaseModel
    {
        public string PrimaryCaseType { get; set; }
        /// <summary>
        /// Represents Case-Type
        /// </summary>
        public string SecondaryCaseType { get; set; }
        /// <summary>
        /// Represents SubCase-Type
        /// </summary>
        public string ThirdCaseType { get; set; }
        /// <summary>
        /// Represents SubCase-Type
        /// </summary>
        public int ProceedingYet { get; set; }
        /// <summary>
        /// Represents Proceeding Yet
        /// </summary>
        public string DateCommenced { get; set; }
        /// <summary>
        /// Represents Date Commenced
        /// </summary>
        public string PreviousCaseNo { get; set; }
        /// <summary>
        /// Represents Previous Case Number
        /// </summary>
        public string CurrentCaseNo { get; set; }
        /// <summary>
        /// Represents Current Case Number
        /// </summary>
        public int LegalAdviceInferred { get; set; }
        /// <summary>
        /// Represents Legal Advice Inferred
        /// </summary>
        public string whichCourt { get; set; }
        /// <summary>
        /// Represents Which Court
        /// </summary>
        public string opname { get; set; }
        /// <summary>
        /// Represents Opname
        /// </summary>
        public string opmail { get; set; }
        /// <summary>
        /// Represents Opmail
        /// </summary>
        public string opmob { get; set; }
        /// <summary>
        /// Represents Opmob
        /// </summary>
        public string emrid { get; set; }
        /// <summary>
        /// Represents Emirates Id
        /// </summary>
        public string passno { get; set; }
        /// <summary>
        /// Represents Passport Number
        /// </summary>
        public string cdesc { get; set; }
        ///<summary>
        ///Represents Case Description
        ///</summary>


    }
}
