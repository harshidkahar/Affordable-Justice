using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class CustomerModel
    {
        /// <summary> 
        /// Represents Primary Key
        /// </summary>
        public int CustomerKey { get; set; }

        public Guid CustomerGUID { get; set; }
        /// <summary>
        /// Represents First Name of Customer
        /// </summary>
        public string FirstName { get; set; }

        /// <summary> 
        /// Represents LastName of Customer
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Represents Full Name Of The Customer
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Represents Email of Customer
        /// </summary>

        [Required(ErrorMessage = "*")]
        public string Email { get; set; }

        /// <summary>
        /// Represents ContactNo of Customer
        /// </summary>
        [Required(ErrorMessage = "*")]
        public string ContactNo { get; set; }

        /// <summary>
        /// Represents CreatedBy
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Represents ModifiedBy
        /// </summary>
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Represents CreatedDate
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Represents ModifiedDate
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Represents Flag for particular record is active or not.
        /// </summary>
        public bool? IsActive { get; set; }

        /// <summary>
        /// Represents Unique Key associated with client
        /// </summary>
        public long RoleID { get; set; }

        /// <summary>
        ///  Represents Role Name Associated with the customer
        /// </summary>
        public string ?RoleName { get; set; }

        public Dictionary<string, bool> ?CustomerRoles { get; set; }

        public string SponsorId { get; set; }
    }
}
