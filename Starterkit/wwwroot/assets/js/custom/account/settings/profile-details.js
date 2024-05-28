"use strict";

// Class definition
var KTAccountSettingsProfileDetails = function () {
    // Private variables
    var form;
    var submitButton;
    var validation;
    var ProfileSetting = [];
    //KTMenu.createInstances();
    // Private functions

    var fetchprofilesetting = function () {
        $.ajax({
            url: '/Account/profilesetting',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    ProfileSetting = response.profilesetting;
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
        $(document).ready(function () {
            $('#ddlCountryCode').select2({
                placeholder: "Select Country Code",
                allowClear: true
            });

            $('#ddlCountry').select2({
                placeholder: "Select Country",
                allowClear: true
            });

            $('#ddlNationality').select2({
                placeholder: "Select Nationality",
                allowClear: true
            });
            if (ProfileSetting.length > 0) {
                var profile = ProfileSetting[0];

                // Assigning values to HTML elements
                document.getElementById('txtFirstName').value = profile.FirstName || '';
                document.getElementById('txtLastName').value = profile.LastName || '';
                document.getElementById('txtPhone').value = profile.ContactNo || '';
                document.getElementById('txtEmail').value = profile.Email || '';
                document.getElementById('txtDob').value = profile.Dob ? new Date(profile.Dob).toISOString().substring(0, 10) : '';
                document.getElementById('txtFlatno').value = profile.Address_Flat || '';
                document.getElementById('txtStreetname').value = profile.Address_Building || '';
                document.getElementById('txtAddress').value = profile.Address || '';

                // Set select2 dropdown values
                $('#ddlCountryCode').val(profile.CountryCode).trigger('change');
                $('#ddlCountry').val(profile.Country).trigger('change');
                $('#ddlNationality').val(profile.Nationality).trigger('change');
                //document.getElementById('lblNationality').textContent = profile.Nationality || '';
            }
        });
    };


    var initValidation = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    fname: {
                        validators: {
                            notEmpty: {
                                message: 'First name is required'
                            }
                        }
                    },
                    lname: {
                        validators: {
                            notEmpty: {
                                message: 'Last name is required'
                            }
                        }
                    },
                    company: {
                        validators: {
                            notEmpty: {
                                message: 'Company name is required'
                            }
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: 'Contact phone number is required'
                            }
                        }
                    },
                    country: {
                        validators: {
                            notEmpty: {
                                message: 'Please select a country'
                            }
                        }
                    },
                    timezone: {
                        validators: {
                            notEmpty: {
                                message: 'Please select a timezone'
                            }
                        }
                    },
                    'communication[]': {
                        validators: {
                            notEmpty: {
                                message: 'Please select at least one communication method'
                            }
                        }
                    },
                    language: {
                        validators: {
                            notEmpty: {
                                message: 'Please select a language'
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
        $(form.querySelector('[name="country"]')).on('change', function() {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('country');
        });

        $(form.querySelector('[name="language"]')).on('change', function() {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('language');
        });

        $(form.querySelector('[name="timezone"]')).on('change', function() {
            // Revalidate the color field when an option is chosen
            validation.revalidateField('timezone');
        });
    }

    var handleForm = function () {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    swal.fire({
                        text: "Thank you! You've updated your basic info",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary"
                        }
                    });

                } else {
                    swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary"
                        }
                    });
                }
            });
        });
    }

    // Public methods
    return {
        init: function () {
            form = document.getElementById('kt_account_profile_details_form');
            
            if (!form) {
                return;
            }

            submitButton = form.querySelector('#kt_account_profile_details_submit');
            fetchprofilesetting();
            initValidation();
            
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAccountSettingsProfileDetails.init();
    
});
