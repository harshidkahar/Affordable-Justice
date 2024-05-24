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
        public bool ProceedingYet { get; set; }
        /// <summary>
        /// Represents Proceeding Yet
        /// </summary>
        public DateTime DateCommenced { get; set; }
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
        public bool LegalAdviceInferred { get; set; }
        /// <summary>
        /// Represents Legal Advice Inferred
        /// </summary>
        public string WhichCourt { get; set; }
        /// <summary>
        /// Represents Which Court
        /// </summary>
        public string Opname { get; set; }
        /// <summary>
        /// Represents Opname
        /// </summary>
        public string Opmail { get; set; }
        /// <summary>
        /// Represents Opmail
        /// </summary>
        public string Opmob { get; set; }
        /// <summary>
        /// Represents Opmob
        /// </summary>
        public string Emrid { get; set; }
        /// <summary>
        /// Represents Emirates Id
        /// </summary>
        public string Passno { get; set; }
        /// <summary>
        /// Represents Passport Number
        /// </summary>
        public string Cdesc { get; set; }
        ///<summary>
        ///Represents Case Description
        ///</summary>
       

    }
}
