using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class CreateCaseModel
    {
        /// <summary>
        /// Represents Primary Key
        /// </summary>
        public int CaseKey { get; set; }
        public int UserId { get; set; }
        /// <summary>
        /// Represents User Id
        /// </summary>
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
       
        public string Opt {  get; set; }
    }
}
