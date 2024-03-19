var path = window.location.pathname;
var page = path.split("/").pop();
var pageTitle = "";
var pageBreadcrum = "";

const overview = document.getElementById("acc_nav_overview");
const settings = document.getElementById("acc_nav_settings");
const kyc = document.getElementById("acc_nav_kyc");
const billing = document.getElementById("acc_nav_billing");
const statements = document.getElementById("acc_nav_statements");
const referrals = document.getElementById("acc_nav_referrals");

try {
    overview.classList.remove("active");
    settings.classList.remove("active");
    billing.classList.remove("active");
    statements.classList.remove("active");
    referrals.classList.remove("active");
    kyc.classList.remove("active");
}
catch { }

switch (page) {
    case "dashboards":
        pageTitle = "Dashboard";
        pageBreadcrum = "Dashboard";
        break;
    case "overview":
        pageTitle = "Account Overview";
        pageBreadcrum = "Account";
        overview.classList.add("active");
        break;
    case "settings":
        pageTitle = "Account Settings";
        pageBreadcrum = "Account";
        settings.classList.add("active");
        break;
    case "kyc":
        pageTitle = "KYC";
        pageBreadcrum = "Account";
        settings.classList.add("active");
        break;
    case "billing":
        pageTitle = "Account Billing";
        pageBreadcrum = "Account";
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
    case "createCase":
        pageTitle = "Create Case";
        pageBreadcrum = "Create Case";
        break;
    case "viewCaseList":
        pageTitle = "View Case List";
        pageBreadcrum = "View Case List";
        document.getElementById("action_status").style.visibility = "visible";
        break;
}

document.getElementById("pageTitle").innerHTML = pageTitle;
document.getElementById("pageBreadcrum").innerHTML = pageBreadcrum;
