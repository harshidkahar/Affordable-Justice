"use strict";

// Class definition
var KTAccountSettingsOverview = function () {
    var ProfileOverview = [];

    var fetchprofile = function () {
        $.ajax({
            url: '/Account/profileoverview',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    ProfileOverview = response.profileoverview;
                    renderData();
                } else {
                    Swal.fire({
                        text: response.message,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            },
            error: function () {
                Swal.fire({
                    text: "Failed to retrieve case detail.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });
    };

    var renderData = function () {
        if (ProfileOverview.length > 0) {
            var profile = ProfileOverview[0];

            //document.getElementById('lblCaseId').textContent = caseDetail.CaseKey || '';
            document.getElementById('lblFullName').textContent = [
                profile.FirstName,
                profile.LastName,
            ].filter(Boolean).join(' ') || '';

            document.getElementById('lblContactNo').textContent = [
                profile.CountryCode,
                profile.ContactNo,
            ].filter(Boolean).join(' ') || '';

            document.getElementById('lblCAddress').textContent = [
                profile.Address_Flat,
                profile.Address_Building,
            ].filter(Boolean).join(' ') || '';

            document.getElementById('lblEmailId').textContent = profile.Email || '';
            document.getElementById('lblDob').textContent = profile.Dob ? new Date(profile.Dob).toLocaleDateString() : '';
            //document.getElementById('lblOppFullName').textContent = profile.Opname || '';
            //document.getElementById('lblOppEmail').textContent = profile.Address_Flat || '';
            //document.getElementById('lblOppPhone').textContent = profile.Address_Building || '';
            document.getElementById('lblCountry').textContent = profile.Country || '';
            document.getElementById('lblNationality').textContent = profile.Nationality || '';
        }
    };

    // Public methods
    return {
        init: function () {
            fetchprofile();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAccountSettingsOverview.init();
});
