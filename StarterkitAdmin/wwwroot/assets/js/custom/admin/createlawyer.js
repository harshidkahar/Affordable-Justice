"use strict";

var CreateLawyer = function () {
    // Elements
    var form;
    var submitButton;
    var validator;

    // Initialize the form
    var initForm = function () {
        form = document.querySelector('[name="kt_create_advocate_form"]');
        submitButton = document.querySelector('[name="kt_create_advocate_form_submit"]');

        // Initialize form validation
        validator = FormValidation.formValidation(form, {
            fields: {
                firstName: {
                    validators: {
                        notEmpty: {
                            message: "First name is required"
                        }
                    }
                },
                lastName: {
                    validators: {
                        notEmpty: {
                            message: "Last name is required"
                        }
                    }
                },
                lisenceNo: {
                    validators: {
                        notEmpty: {
                            message: "Lisence No is required"
                        }
                    }
                },
                LawyerType: {
                    validators: {
                        notEmpty: {
                            message: "Lawyer Type is required"
                        }
                    }
                },
                CompanyName: {
                    validators: {
                        notEmpty: {
                            message: "Company  is required"
                        }
                    }
                },
                DateOfBirth: {
                    validators: {
                        notEmpty: {
                            message: "Date of birth is required"
                        }
                    }
                },
                Phone: {
                    validators: {
                        notEmpty: {
                            message: "Phone number is required"
                        }
                    }
                },
                countrycode: {
                    validators: {
                        notEmpty: {
                            message: "Country Code is required"
                        }
                    }
                },
                EmailId: {
                    validators: {
                        notEmpty: {
                            message: "Email is required"
                        },
                        email: {
                            message: "Please enter a valid email"
                        }
                    }
                },
                Address: {
                    validators: {
                        notEmpty: {
                            message: "Address is required"
                        }
                    }
                },
                Country: {
                    validators: {
                        notEmpty: {
                            message: "Country is required"
                        }
                    }
                },
                Nationality: {
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

        // Handle form submission
        submitButton.addEventListener("click", function (e) {
            e.preventDefault();

            // Validate the form
            validator.validate().then(function (status) {
                if (status === "Valid") {
                    // Form is valid, proceed with form submission
                    submitButton.setAttribute("data-kt-indicator", "on");
                    submitButton.disabled = true;

                    // Collect form data
                    var formData = {
                        FirstName: form.querySelector("[name='firstName']").value,
                        LastName: form.querySelector("[name='lastName']").value,
                        LisenceNumber: form.querySelector("[name='lisenceNo']").value,
                        LawyerType: form.querySelector("[name='LawyerType']").value,
                        Company: form.querySelector("[name='CompanyName']").value,
                        DateOfBirth: form.querySelector("[name='DateOfBirth']").value,
                        CountryCode: form.querySelector("[name='countrycode']").value,
                        Phone: form.querySelector("[name='Phone']").value,
                        EmailId: form.querySelector("[name='EmailId']").value,
                        Address: form.querySelector("[name='Address']").value,
                        Country: form.querySelector("[name='Country']").value,
                        Nationality: form.querySelector("[name='Nationality']").value
                    };

                    // Send AJAX request to create a new admin account
                    $.ajax({
                        type: "POST",
                        url: "Admin/CreateLawyer",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (response) {
                            // Handle success response
                            if (response === "Advocate successfully registered.") {
                                Swal.fire({
                                    text: "Advocate account created successfully!",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then(function () {
                                    // Redirect to another page (e.g., admin list page) after success
                                    location.href = "New-Lawyer";
                                    form.reset();
                                });
                            } else {
                                // Handle failure response
                                Swal.fire({
                                    text: response,
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }
                        },
                        error: function () {
                            // Handle AJAX request error
                            Swal.fire({
                                text: "An error occurred. Please try again later.",
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        },
                        complete: function () {
                            // Hide loading indication and enable the button
                            submitButton.removeAttribute("data-kt-indicator");
                            submitButton.disabled = false;
                        }
                    });
                } else {
                    // Form validation failed, show error message
                    Swal.fire({
                        text: "Please fix the errors in the form and try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            });
        });
    };

    // Public function to initialize the CreateAdmin namespace
    return {
        init: function () {
            initForm();
        }
    };
}();

// Initialize the CreateAdmin script when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    CreateLawyer.init();
});
