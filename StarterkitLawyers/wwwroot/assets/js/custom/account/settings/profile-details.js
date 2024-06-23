"use strict";

// Class definition
var KTAccountSettingsOverview = function () {
    var ProfileOverview = [];
    var form;
    var submitButton;
    var validation;
    var jsonPostData;

    var fetchprofile = function () {
        $.ajax({
            url: '/Account/Adminprofilesetting',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    ProfileOverview = response.adminprofilesetting;
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
        //const table = document.querySelector('table');
        // const tableBody = document.querySelector('#adminTableBody');
        //tableBody.innerHTML = ''; // Clear existing rows

        if (ProfileOverview.length > 0) {
            var profilesetting = ProfileOverview[0];

            var form = document.querySelector('#kt_admin_profile_details_form');
            form.querySelector('[name="txtfname"]').value = profilesetting.FirstName;
            form.querySelector('[name="txtlname"]').value = profilesetting.LastName;
            form.querySelector('[name="txtEmail"]').value = profilesetting.EmailId;
            const adminDateOfBirth = profilesetting.DateOfBirth;

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
            form.querySelector('[name="txtdob"]').value = adminDateOfBirth;
            form.querySelector('[name="txtphone"]').value = profilesetting.Phone;
            form.querySelector('[name="flatno"]').value = profilesetting.Address_Flat;
            form.querySelector('[name="streetname"]').value = profilesetting.Address_Building;
            form.querySelector('[name="txtAddress"]').value = profilesetting.Address;
            form.querySelector('[name="txtusername"]').value = profilesetting.Username;
            form.querySelector('[name="txtPass"]').value = profilesetting.Watchword;
            const countrySelect = form.querySelector('[name="ddlCountry"]');
            countrySelect.value = profilesetting.Country;
            $(countrySelect).trigger('change');
            const nationselect = form.querySelector('[name="ddlNationality"]');
            nationselect.value = profilesetting.Nationality;
            $(nationselect).trigger('change');
            const countrycodeSelect = form.querySelector('[name="countrycode"]');
            countrycodeSelect.value = profilesetting.CountryCode;
            $(countrycodeSelect).trigger('change');


        }
        KTMenu.createInstances();
    }

    var initValidation = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    FirstName: {
                        validators: {
                            notEmpty: {
                                message: 'First name is required'
                            }
                        }
                    },
                    LastName: {
                        validators: {
                            notEmpty: {
                                message: 'Last name is required'
                            }
                        }
                    },
                    countrycode: {
                        validators: {
                            notEmpty: {
                                message: 'Company name is required'
                            }
                        }
                    },
                    Phone: {
                        validators: {
                            notEmpty: {
                                message: 'Contact phone number is required'
                            }
                        }
                    },
                    Country: {
                        validators: {
                            notEmpty: {
                                message: 'Country is required'
                            }
                        }
                    },
                    Address: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            }
                        }
                    },
                    'Nationality': {
                        validators: {
                            notEmpty: {
                                message: 'Nationality is required'
                            }
                        }
                    },
                    DateOfBirth: {
                        validators: {
                            notEmpty: {
                                message: 'Date Of Birth is required '
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Select2 validation integration
        $(form.querySelector('[name="country"]')).on('change', function () {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('country');
        });

        $(form.querySelector('[name="language"]')).on('change', function () {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('language');
        });

        $(form.querySelector('[name="timezone"]')).on('change', function () {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('timezone');
        });
    }

    var handleForm = function () {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    setTimeout(function () {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;



                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        jsonPostData = {
                            FirstName: document.getElementById("txtfname").value.trim(),
                            LastName: document.getElementById("txtlname").value.trim(),
                            EmailId: document.getElementById("txtEmail").value.trim(),
                            Phone: document.getElementById("txtphone").value.trim(),
                            Username: document.getElementById("txtusername").value.trim(),
                            Watchword: document.getElementById("txtPass").value.trim(),
                            CountryCode: document.getElementById("ddlCountryCodeadmin").value.trim(),
                            Address: document.getElementById("txtAddress").value.trim(),
                            Address_Flat: document.getElementById("txtFlatno").value.trim(),
                            Address_Building: document.getElementById("txtStreetname").value.trim(),
                            Country: document.getElementById("ddlCountry").value.trim(),
                            Nationality: document.getElementById("ddlNationality").value.trim(),
                            DateOfBirth: document.getElementById("txtdob").value.trim()
                        }


                        $.ajax({
                            type: "PUT",
                            url: "/Account/UpdateAdminProfile",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(jsonPostData),
                            dataType: "json",
                            success: function (data) {
                                if (data == "done") {
                                    Swal.fire({
                                        text: "You have successfully updated!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            //form.reset();

                                            var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                            if (redirectUrl) {
                                                location.href = redirectUrl;

                                            }
                                        }
                                    });
                                }
                                else {
                                    Swal.fire({
                                        text: "Sorry, looks like there are some errors detected, please try again.",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });
                                }
                            },
                            error: ''
                        });

                    }, 1500);
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });
        });
    }





    // Public methods
    return {
        init: function () {
            form = document.querySelector('#kt_admin_profile_details_form');

            if (!form) {
                return;
            }

            submitButton = form.querySelector('#kt_admin_profile_settings_submit');

            fetchprofile();
            initValidation();
            handleForm();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTAccountSettingsOverview.init();
});
