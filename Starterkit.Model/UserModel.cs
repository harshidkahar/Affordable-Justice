using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starterkit.Model
{
    [Serializable]
    public class UserModel
    {
        private int _Id;
        public int Id
        {
            get { return _Id; }
            set { _Id = value; }
        }
        public Guid _CustomerGUID;
        public Guid CustomerGUID
        {
            get { return _CustomerGUID; }
            set { _CustomerGUID = value; }
        }

        private string _FullName;
        public string FullName
        {
            get { return _FullName; }
            set { _FullName = value; }
        }

        private string _FirstName;
        public string FirstName
        {
            get { return _FirstName; }
            set { _FirstName = value; }
        }

        private string _LastName;
        public string LastName
        {
            get { return _LastName; }
            set { _LastName = value; }
        }

        private string _Gender;
        public string Gender
        {
            get { return _Gender; }
            set { _Gender = value; }
        }

        private int _Age;
        public int Age
        {
            get { return _Age; }
            set { _Age = value; }
        }

        private string _MaritialStatus;
        public string MaritialStatus
        {
            get { return _MaritialStatus; }
            set { _MaritialStatus = value; }
        }

        private string _Profession;
        public string Profession
        {
            get { return _Profession; }
            set { _Profession = value; }
        }

        private string _IdProof;
        public string IdProof
        {
            get { return _IdProof; }
            set { _IdProof = value; }
        }

        private string _IdProofNumber;
        public string IdProofNumber
        {
            get { return _IdProofNumber; }
            set { _IdProofNumber = value; }
        }

        private string _IdProofUrl;
        public string IdProofUrl
        {
            get { return _IdProofUrl; }
            set { _IdProofUrl = value; }
        }

        private string _Nationality;
        public string Nationality
        {
            get { return _Nationality; }
            set { _Nationality = value; }
        }

        private string _Address;
        public string Address
        {
            get { return _Address; }
            set { _Address = value; }
        }

        private DateTime _TimeStamp;
        public DateTime TimeStamp
        {
            get { return _TimeStamp; }
            set { _TimeStamp = value; }
        }

        private bool _IsActive;
        public bool IsActive
        {
            get { return _IsActive; }
            set { _IsActive = value; }
        }

        private string _SponsorId = "";
        public string SponsorId
        {
            get { return _SponsorId; }
            set { _SponsorId = value; }
        }

        private int _RoleId;
        public int RoleId
        {
            get { return _RoleId; }
            set { _RoleId = value; }
        }

        private int _PremiumUser;
        public int PremiumUser
        {
            get { return _PremiumUser; }
            set { _PremiumUser = value; }
        }

        private string _Email;
        public string Email
        {
            get { return _Email; }
            set { _Email = value; }
        }
        private string _CountryCode;
        public string CountryCode
        {
            get { return _CountryCode; }
            set { _CountryCode = value; }
        }

		private string _ContactNo;
        public string ContactNo
        {
            get { return _ContactNo; }
            set { _ContactNo = value; }
        }

        private int _CreatedBy;
        public int CreatedBy
        {
            get { return _CreatedBy; }
            set { _CreatedBy = value; }
        }

        private DateTime _CreatedDate;
        public DateTime CreatedDate
        {
            get { return _CreatedDate; }
            set { _CreatedDate = value; }
        }

        private int _ModifiedBy;
        public int ModifiedBy
        {
            get { return _ModifiedBy; }
            set { _ModifiedBy = value; }
        }

        private DateTime _ModifiedDate;
        public DateTime ModifiedDate
        {
            get { return _ModifiedDate; }
            set { _ModifiedDate = value; }
        }
        private string _WatchWord;
        public string WatchWord
        {
            get { return _WatchWord; }
            set { _WatchWord = value; }
        }

        private string _Country;
        public string Country
        {
            get { return _Country; }
            set { _Country = value; }
        }

        private DateTime _DateOfBirth;
        public DateTime DateOfBirth
        {
            get { return _DateOfBirth; }
            set { _DateOfBirth = value; }
        }

       
    //public UserModel(int Id_, Guid CustomerGUID_, string FullName_, string FirstName_, string LastName_, string Gender_, int Age_, string MaritialStatus_, string Profession_, string IdProof_, string IdProofNumber_, string IdProofUrl_, string Nationality_, string Address_, DateTime TimeStamp_, bool IsActive_, int SponsorId_, int RoleId_, int PremiumUser_, string Email_, string ContactNo_, int CreatedBy_, DateTime CreatedDate_, int ModifiedBy_, DateTime ModifiedDate_, string WatchWord_)
    //{
    //    this.Id = Id_;
    //    this.CustomerGUID = CustomerGUID_;
    //    this.FullName = FullName_;
    //    this.FirstName = FirstName_;
    //    this.LastName = LastName_;
    //    this.Gender = Gender_;
    //    this.Age = Age_;
    //    this.MaritialStatus = MaritialStatus_;
    //    this.Profession = Profession_;
    //    this.IdProof = IdProof_;
    //    this.IdProofNumber = IdProofNumber_;
    //    this.IdProofUrl = IdProofUrl_;
    //    this.Nationality = Nationality_;
    //    this.Address = Address_;
    //    this.TimeStamp = TimeStamp_;
    //    this.IsActive = IsActive_;
    //    this.SponsorId = SponsorId_;
    //    this.RoleId = RoleId_;
    //    this.PremiumUser = PremiumUser_;
    //    this.Email = Email_;
    //    this.ContactNo = ContactNo_;
    //    this.CreatedBy = CreatedBy_;
    //    this.CreatedDate = CreatedDate_;
    //    this.ModifiedBy = ModifiedBy_;
    //    this.ModifiedDate = ModifiedDate_;
    //    this.WatchWord = WatchWord_;
    //}
}
}
