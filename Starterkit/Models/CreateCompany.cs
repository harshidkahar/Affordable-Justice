namespace Starterkit.Models
{
    [Serializable]
    public class CreateCompany
    {
            public int UserId { get; set; }
            public string ApplicationType { get; set; }
            public string CompanyType { get; set; }
            public string BusinessCity { get; set; }
            public string BusinessLocation { get; set; }
            public string BusinessCategory { get; set; }
            public int NoOfResidentVisa { get; set; }
            public bool DependentVisaReq { get; set; }
            public string OfficeType { get; set; }
            public bool HasBusinessName { get; set; }
            public string BusinessNameOption { get; set; }
            public string NeedAssistanceOn { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string EmailId { get; set; }
            public string Phone { get; set; }
            public string RAddress { get; set; }
            public string CAddress { get; set; }
            public string Country { get; set; }
            public string Nationality { get; set; }
            public string PassportUrl { get; set; }
            public string PassportPhotoUrl { get; set; }
            public string CountryCode { get; set; }
            public string StartBusiness { get; set; }
            public string YourOfficeType { get; set; }
       

    }
}
