var UpdateAdmin = function () {
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
                        url: "Admin/Updateprofile" + sessionId,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (response) {
                            if (response === "Profile Updated.") {
                                Swal.fire({
                                    text: "Profile updated successfully!",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then(function () {
                                    location.reload(); // Reload the page after successful update
                                });
                            } else {
                                Swal.fire({
                                    text: response,
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                text: "An error occurred. Please try again later.",
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        },
                        complete: function () {
                            submitButton.removeAttribute("data-kt-indicator");
                            submitButton.disabled = false;
                        }
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

    return {
        init: function () {
            initForm();
        }
    };
}();


// Initialize the CreateAdmin script when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    UpdateAdmin.init();
});
