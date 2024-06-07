var path = window.location.pathname;
var page = (path.split("/")[path.split("/").length - 1]);//path.split("/").pop(); 
var pageTitle = "";
var pageBreadcrum = "";

const overview = document.getElementById("acc_nav_overview");
const settings = document.getElementById("acc_nav_settings");
const kyc = document.getElementById("acc_nav_kyc");
const billing = document.getElementById("acc_nav_billing");
const statements = document.getElementById("acc_nav_statements");
const referrals = document.getElementById("acc_nav_referrals");
const changeEmail = document.getElementById("acc_nav_change_email"); 

try {
    overview.classList.remove("active");
    settings.classList.remove("active");
    billing.classList.remove("active");
    statements.classList.remove("active");
    referrals.classList.remove("active");
    kyc.classList.remove("active");
    changeEmail.classList.remove("active");
}
catch { }

switch (page) {
    case "dashboard":
        pageTitle = "Dashboard";
        pageBreadcrum = "Dashboard";
        break;
    case "overview":
        pageTitle = "Account Overview";
        pageBreadcrum = "Account";
        overview.classList.add("active");
        break;
    case "settings":
        pageTitle = "Account - Edit Profile";
        pageBreadcrum = "Account - Edit Profile";
        settings.classList.add("active");
        break;
    case "kyc":
        pageTitle = "Accouint - KYC";
        pageBreadcrum = "Account - KYC";
        kyc.classList.add("active");
        break;
    case "billing":
        pageTitle = "Account Billing";
        pageBreadcrum = "Account - Billing";
        billing.classList.add("active");
        break;
    case "statements":
        pageTitle = "Statements";
        pageBreadcrum = "Account";
        statements.classList.add("active");
        break;
    case "referrals":
        pageTitle = "Referrals";
        pageBreadcrum = "Account";
        referrals.classList.add("active");
        break;
    case "changeEmail":
        pageTitle = "Account - Change Email";
        pageBreadcrum = "Account - Change Email";
        changeEmail.classList.add("active");
        break;
    case "createcase":
        pageTitle = "Create Case";
        pageBreadcrum = "Create Case";
        break;
    case "viewCaseList":
        pageTitle = "View Case List";
        pageBreadcrum = "View Case List";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "uploadCaseDocuments":
        pageTitle = "Upload Case Documents";
        pageBreadcrum = "Upload Case Documents";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "viewCaseDocuments":
        pageTitle = "View Case Documents";
        pageBreadcrum = "View Case Documents";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "caseDetails":
        pageTitle = "Case Details";
        pageBreadcrum = "Case Details";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "createcompany":
        pageTitle = "Create Company";
        pageBreadcrum = "Create Company";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "companyList":
        pageTitle = "Company List";
        pageBreadcrum = "Company List";
        document.getElementById("action_status").style.visibility = "visible";
        break;

        
}

document.getElementById("pageTitle").innerHTML = pageTitle;
document.getElementById("pageBreadcrum").innerHTML = pageBreadcrum;
