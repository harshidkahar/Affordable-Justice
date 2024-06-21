var ProfileOverview = function () {
    var form;
    var submitButton;
    var validator;

    // Function to get the value of a form field or fallback to a default value
    function getValueOrFallback(selector, fallbackValue) {
        var value = getValue(selector);
        return value !== '' ? value : fallbackValue;
    }

    // Function to get the value of a form field by CSS selector
    function getValue(selector) {
        var element = form.querySelector(selector);
        return element ? element.value : '';
    }

    var initForm = function () {
        form = document.querySelector("#kt_admin_profile_details_form");
        submitButton = document.querySelector("#kt_admin_profile_settings_submit");

        validator = FormValidation.formValidation(form, {
            fields: {
                txtfname: {
                    validators: {
                        notEmpty: {
                            message: "First name is required"
                        }
                    }
                },
                txtlname: {
                    validators: {
                        notEmpty: {
                            message: "Last name is required"
                        }
                    }
                },
                txtEmail: {
                    validators: {
                        notEmpty: {
                            message: "Email is required"
                        },
                        emailAddress: {
                            message: "Please enter a valid email address"
                        }
                    }
                },
                txtphone: {
                    validators: {
                        notEmpty: {
                            message: "Phone number is required"
                        }
                    }
                },
                txtcountrycode: {
                    validators: {
                        notEmpty: {
                            message: "Country Code is required"
                        }
                    }
                },
                txtdob: {
                    validators: {
                        notEmpty: {
                            message: "Date of birth is required"
                        },
                        date: {
                            format: "YYYY-MM-DD",
                            message: "Please enter a valid date in the format YYYY-MM-DD"
                        }
                    }
                },
                txtAddress: {
                    validators: {
                        notEmpty: {
                            message: "Address is required"
                        }
                    }
                },
                txtusername: {
                    validators: {
                        notEmpty: {
                            message: "Username is required"
                        }
                    }
                },
                txtPass: {
                    validators: {
                        notEmpty: {
                            message: "Watchword is required"
                        }
                    }
                },
                ddlCountry: {
                    validators: {
                        notEmpty: {
                            message: "Country is required"
                        }
                    }
                },
                ddlNationality: {
                    validators: {
                        notEmpty: {
                            message: "Nationality is required"
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: ".fv-row",
                    eleInvalidClass: "is-invalid",
                    eleValidClass: "is-valid"
                })
            }
        });

        submitButton.addEventListener("click", function (e) {
            e.preventDefault();

            validator.validate().then(function (status) {
                if (status === "Valid") {
                    submitButton.setAttribute("data-kt-indicator", "on");
                    submitButton.disabled = true;

                    var sessionId = getSessionId();
                    var formData = {
                        Id: sessionId,
                        FirstName: getValueOrFallback('[name="txtfname"]', form.querySelector('[name="txtfname"]').value),
                        LastName: getValueOrFallback('[name="txtlname"]', form.querySelector('[name="txtlname"]').value),
                        EmailId: getValueOrFallback('[name="txtEmail"]', form.querySelector('[name="txtEmail"]').value),
                        countrycode: getValueOrFallback('[name="txtcountrycode"]', form.querySelector('[name="txtcountrycode"]').value),
                        Phone: getValueOrFallback('[name="txtphone"]', form.querySelector('[name="txtphone"]').value),
                        DateOfBirth: getValueOrFallback('[name="txtdob"]', form.querySelector('[name="txtdob"]').value),
                        Address: getValueOrFallback('[name="txtAddress"]', form.querySelector('[name="txtAddress"]').value),
                        Username: getValueOrFallback('[name="txtusername"]', form.querySelector('[name="txtusername"]').value),
                        Watchword: getValueOrFallback('[name="txtPass"]', form.querySelector('[name="txtPass"]').value),
                        Country: getValueOrFallback('[name="ddlCountry"]', form.querySelector('[name="ddlCountry"]').value),
                        Nationality: getValueOrFallback('[name="ddlNationality"]', form.querySelector('[name="ddlNationality"]').value)
                    };

                    $.ajax({
                        type: "PUT",
                        url: "Admin/UpdateAdminProfile" + sessionId,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (data) {
                            if (data == "done") {
                                Swal.fire({
                                    text: "Profile Updated!",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function (result) {
                                    location.href = "New-Admin"
                                });
                            }

                        },
                    });
                } else {
                    Swal.fire({
                        text: "Please fix the errors in the form and try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            });
        });
    };

    // Function to get the session ID from sessionStorage
    var getSessionId = function () {
        return sessionStorage.getItem("Id");
    };

    var adminDetailData = [];

    var fetchAdminDetailById = function (id) {
        $.ajax({
            url: '/Admin/GetAdminDetail',
            type: 'GET',
            data: JSON.stringify({ Id: id }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',

            success: function (response) {
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    adminDetailData = response.adminDetail;
                    renderTable();
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
    }


    // Render table with case list data
    var renderTable = function () {
        //const table = document.querySelector('table');
        // const tableBody = document.querySelector('#adminTableBody');
        //tableBody.innerHTML = ''; // Clear existing rows

        if (adminDetailData.length > 0) {
            var adminDetail = adminDetailData[0];
            document.querySelector('#ttlFullName').textContent = adminDetail.FirstName + adminDetail.LastName;
            document.querySelector('#ttlUsername').textContent = adminDetail.Username;
            document.querySelector('#ttlAddress').textContent = adminDetail.Address;
            document.querySelector('#ttlEmailId').textContent = adminDetail.EmailId;

            //var form = document.querySelector('#kt_admin_profile_details_form');
            document.querySelector('#lblfullname').textContent = adminDetail.FirstName + adminDetail.LastName;
            document.querySelector('#lblEmailId').textContent = adminDetail.EmailId;
            const adminDateOfBirth = adminDetail.DateOfBirth;

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
            document.querySelector('#lblDateofBirth').textContent = adminDateOfBirth;
            document.querySelector('#lblPhone').textContent = adminDetail.CountryCode + adminDetail.Phone;
            document.querySelector('#lblAddress').textContent = adminDetail.Address;
            document.querySelector('#lblUsername').textContent.adminDetail.Username;
            document.querySelector('#lblpassword"').textContent = adminDetail.Watchword;
            document.querySelector('#lblCountry').textContent.adminDetail.Country;
            document.querySelector('#lblNationality').textContent.adminDetail.Nationality;


         

        }
        KTMenu.createInstances();
    }


    return {
        init: function () {
            initForm();
            fetchAdminDetailById();
        }
    };
}();


// Initialize the CreateAdmin script when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    ProfileOverview.init();
});
