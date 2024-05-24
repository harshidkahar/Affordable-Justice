using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class EmailSettingsModel
    {
        /// <summary>
        /// Represents Email address from which email will be send
        /// </summary>
        public string EmailFrom { get; set; }

        /// <summary> 
        /// Represents Password
        /// </summary>
        public string WatchWord { get; set; }

        /// <summary>
        /// Represents SMTP HOST server address
        /// </summary>
        public string Host { get; set; }

        /// <summary>
        /// Represents Port from which email will be send
        /// </summary>

        public int Port { get; set; }

        /// <summary>
        /// Represents SSL certificate required or not
        /// </summary>
        public bool SSL { get; set; }

        /// <summary>
        /// Represents Active or Inactive
        /// </summary>
        public bool Active { get; set; }

       
    }
}
