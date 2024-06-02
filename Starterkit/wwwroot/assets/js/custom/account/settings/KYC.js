"use strict";

// Class definition
var KTKyc = function () {
    // Private variables
    var form;
    var submitButton;
    var validation;
    var jsonPostData = null;
    var Status = [];
    //var ProfileSetting = [];
    //KTMenu.createInstances();
    // Private functions

/*
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
*/

/*
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
                $('#ddlCountry').val(profile.Country).trigger('change');
                $('#ddlNationality').val(profile.Nationality).trigger('change');
                document.getElementById('txtFirstName').value = profile.FirstName || '';
                document.getElementById('txtLastName').value = profile.LastName || '';
                document.getElementById('txtPhone').value = profile.ContactNo || '';
                document.getElementById('txtEmail').value = profile.Email || '';
                try {
                    let date = new Date(profile.Dob);
                    document.getElementById('txtDob').value = formatDateToDDMMYYYY(date).toString();
                }
                catch { document.getElementById('txtDob').value = ''; }
                //document.getElementById('txtDob').value = profile.Dob;
                document.getElementById('txtFlatno').value = profile.Address_Flat || '';
                document.getElementById('txtStreetname').value = profile.Address_Building || '';
                document.getElementById('txtAddress').value = profile.Address || '';
                $('#ddlCountryCode').val(profile.CountryCode).trigger('change');

                // const countrySelect = document.getElementById('#ddlCountry');
                //countrySelect.value = profile.Country;
                //$(countrySelect).trigger('change');
                //const nationselect = document.getElementById('#ddlNationality');
                //nationselect.value = profile.Nationality || '';
                //$(nationselect).trigger('change');

                // Set select2 dropdown values
                //document.getElementById('lblNationality').textContent = profile.Nationality || '';
            }
        });
    };
*/
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
                    countryC: {
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
                            EmiratesId: document.getElementById("EmiratesId").value.trim(),
                            PassportNo: document.getElementById("PassportNo").value.trim(),
                        }


                        $.ajax({
                            type: "POST",
                            url: "/Account/KycDocumentUpload",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(jsonPostData),
                            dataType: "json",
                            success: function (data) {
                                if (data == "done") {
                                    Swal.fire({
                                        text: "Your Kyc Details is Submitted!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            //form.reset();
                                            //fetchData();

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

    function fetchData() {

        document.querySelector('#kt_account_kyc_details_form').style.display = 'none';
        document.querySelector('#kt_account_kyc_details_Update').style.display = 'block';

        $.ajax({
            url: '/Account/GetStatus',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Status = response.getstatus;
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
                    text: "Failed to retrieve Status of KYC.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });



    }


    var renderData = function () {
        $(document).ready(function () {
            
            document.querySelector('#StatusKYC').style.display = 'block';
            if (Status.length > 0) {
                var profile = Status[0];
                console.log(profile.statusKYC);
                if (profile.statusKYC === 0) {
                    document.querySelector('#kt_landing_hero_text').textContent = 'Your KYC is in process';
                } else if (profile.statusKYC === 1) {
                    document.querySelector('#kt_landing_hero_text').textContent = 'Approved';
                } else {
                    document.querySelector('#kt_landing_hero_text').textContent = 'Unknown KYC status'; // Handle unexpected values
                }
            }

        });
    };


    // Public methods
    return {
        init: function () {
            form = document.getElementById('kt_account_kyc_details_form');

            if (!form) {
                return;
            }
            
            submitButton = form.querySelector('#kt_account_kyc_details_submit');
            //fetchprofilesetting();
            initValidation();
            handleForm();
           // handleKycForm();

        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTKyc.init();

});
function formatDateToDDMMYYYY(date) {
    // Get the day, month, and year from the date object
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Return the formatted date string
    return `${year}-${month}-${day}`;
}