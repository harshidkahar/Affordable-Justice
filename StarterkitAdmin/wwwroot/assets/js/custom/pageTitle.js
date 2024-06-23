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
    case "AdminProfileOverview":
        pageTitle = "Account Overview";
        pageBreadcrum = "Account";
        overview.classList.add("active");
        break;
    case "AdminProfileSettings":
        pageTitle = "Account - Edit Profile";
        pageBreadcrum = "Account - Edit Profile";
        settings.classList.add("active");
        break;
    case "changeEmail":
        pageTitle = "Account - Change Email";
        pageBreadcrum = "Account - Change Email";
        changeEmail.classList.add("active");
        break;
    case "CreateAdmin":
        pageTitle = "Create Admin";
        pageBreadcrum = "Create Admin";
        break;
    case "ViewAdmin":
        pageTitle = "Admin List";
        pageBreadcrum = "Admin List";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "UpdateAdmin":
        pageTitle = "Update Admin";
        pageBreadcrum = "Update Admin";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "DeleteAdmin":
        pageTitle = "Delete Admin";
        pageBreadcrum = "Delete Admin";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "CreateAgent":
        pageTitle = "Create Agent";
        pageBreadcrum = "Create Agent";
        break;
    case "ViewAgent":
        pageTitle = "Agent List";
        pageBreadcrum = "Agent List";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "UpdateAgent":
        pageTitle = "Update Agent";
        pageBreadcrum = "Update Agent";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "DeleteAgent":
        pageTitle = "Delete Agent";
        pageBreadcrum = "Delete Agent";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "CreateLawyer":
        pageTitle = "Create Lawyer";
        pageBreadcrum = "Create Lawyer";
        break;
    case "ViewLawyer":
        pageTitle = "Lawyer List";
        pageBreadcrum = "Lawyer List";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "UpdateLawyer":
        pageTitle = "Update Lawyer";
        pageBreadcrum = "Update Lawyer";
        document.getElementById("action_status").style.visibility = "visible";
        break;
    case "DeleteLawyer":
        pageTitle = "Delete Lawyer";
        pageBreadcrum = "Delete Lawyer";
        document.getElementById("action_status").style.visibility = "visible";
        break;       
}

document.getElementById("pageTitle").innerHTML = pageTitle;
document.getElementById("pageBreadcrum").innerHTML = pageBreadcrum;
