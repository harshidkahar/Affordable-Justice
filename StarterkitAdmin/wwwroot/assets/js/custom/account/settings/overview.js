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
                    text: "Failed to retrieve admin detail.",
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
        //const table = document.querySelector('table');
        // const tableBody = document.querySelector('#adminTableBody');
        //tableBody.innerHTML = ''; // Clear existing rows

        if (ProfileOverview.length > 0) {
            var profileoverview = ProfileOverview[0];
            // document.querySelector('#ttlFullName').textContent = profileoverview.FirstName + profileoverview.LastName;
            //document.querySelector('#ttlUsername').textContent = profileoverview.Username;
            //document.querySelector('#ttlAddress').textContent = profileoverview.Address;
            //document.querySelector('#ttlEmailId').textContent = profileoverview.EmailId;

            //var form = document.querySelector('#kt_admin_profile_details_form');
            document.querySelector('#lblfullname').textContent = profileoverview.FirstName + profileoverview.LastName;
            document.querySelector('#lblEmailId').textContent = profileoverview.EmailId;
            const adminDateOfBirth = profileoverview.DateOfBirth;

            /*// Convert the date to "YYYY-MM-DD" format
            const formattedDOB = convertDateToString(adminDateOfBirth);
     
            // Find the DateOfBirth input element
            const dobInput = form.querySelector('[name="DateOfBirth"]');
     
            // Set the value of the input element to the formatted date
            if (dobInput) {
                dobInput.value = formattedDOB;
                // Trigger a change event
                $(dobInput).trigger('change');
            } else {
                console.error('Input element with name "DateOfBirth" not found');
            } */
            document.querySelector('#lblAdminCountry').textContent = profileoverview.Country;
            document.querySelector('#lblAdminNationality').textContent = profileoverview.Nationality;
            document.querySelector('#lblDateofBirth').textContent = adminDateOfBirth;
            document.querySelector('#lblPhone').textContent = profileoverview.CountryCode + profileoverview.Phone;
            document.querySelector('#lblAddress').textContent = profileoverview.Address_Flat + profileoverview.Address_Building + profileoverview.Address;
            document.querySelector('#lblUsername').textContent = profileoverview.Username;
            document.querySelector('#lblpassword').textContent = profileoverview.Watchword;
            



        }
        KTMenu.createInstances();
    }


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
