namespace Starterkit.Models
{
    [Serializable]
    public class PartnerModel
    {
        public int Id { get; set; }
        public bool ResidenceUAE { get; set; }
        /// <summary>
        /// Represent ResidenceUAE
        /// </summary>
        

        public bool CompanyManager { get; set; }
        /// <summary>
        /// Represents CompanyManager
        /// </summary>

        public string Name { get; set; }
        /// <summary>
        /// Represents Name
        /// </summary>
        
        public string Email { get; set; }
        /// <summary>
        /// Represents Email
        /// </summary>
        public string CountryCode { get; set; }
        /// <summary>
        /// Represents CountryCode
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Represents Phone No
        /// </summary>
        public string Dob { get; set; }
        /// <summary>
        /// Represents DOB
        /// </summary>
        public string EmiratesId { get; set; }
        /// <summary>
        /// Represents EmiratesId
        /// </summary>
        public string PassportNo { get; set; }
        /// <summary>
        /// Represents PassportNo
        /// </summary>
        /// 

        public string Address { get; set; }
        /// <summary>
        /// Represents Address
        /// </summary>

        public string Country { get; set; }
        /// <summary>
        /// Represents Country
        /// </summary>

        public string Nationality { get; set; }
        /// <summary>
        /// Represents Nationality
        /// </summary>

        public decimal ManageBudget { get; set; }
        /// <summary>
        /// Represents ManageBudget
        /// </summary>
    }
}

