using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class UserDocumentModel
    {
        /// <summary>
        /// Represents UserId
        /// </summary>
        public int CaseKey { get; set; }
        public string Description { get; set; }
        /// <summary>
        /// Represents Description
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// Represents FileName
        /// </summary>
        public DateTime ?TimeStamp { get; set; }
        /// <summary>
        /// Represents Last Modified Time
        /// </summary>
        public string Size { get; set; }
        /// <summary>
        /// Represents Size of Document
        /// </summary>
        public string DocName { get; set; }
        ///<summary>
        ///Represent Document Name
        /// </summary>
    }

    [Serializable]
    public class ViewDocumentModel
    {
        ///<summary>
        ///Represents CaseKey
        /// </summary>
        public int CaseKey { get; set; }
        public string DocName { get; set; }
        /// <summary>
        /// Represents Document Name
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Represents Description
        /// </summary>
        public string DocumentUrl { get; set; }
        ///<summary>
        ///Represents Document Url
        /// </summary>
    }
}
