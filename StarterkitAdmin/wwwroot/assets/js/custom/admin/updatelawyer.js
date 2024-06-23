﻿// Function to convert a date string to the "YYYY-MM-DD" format
function convertDateToString(dateString) {
    const dateRegex = /\/Date\((\d+)\)\//; // Regex pattern to extract milliseconds
    const match = dateString.match(dateRegex);
    if (match && match[1]) {
        const milliseconds = parseInt(match[1]);
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        console.error('Invalid date string:', dateString);
        return ''; // Return an empty string if the date string is invalid
    }
}

var updateLawyer = function () {

    form = document.querySelector("#kt_update_advocate_form");
    submitButton = document.querySelector("#kt_update_advocate_submit");

    // Initialize form validation
    validator = FormValidation.formValidation(form, {
        fields: {
            FirstName: {
                validators: {
                    notEmpty: {
                        message: "First name is required"
                    }
                }
            },
            LastName: {
                validators: {
                    notEmpty: {
                        message: "Last name is required"
                    }
                }
            },
            lisenceNo: {
                validators: {
                    notEmpty: {
                        message: "Lisence is required"
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
                        message: "Company is required"
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
            Email: {
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
            },

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
                    Id: getLawyerIdFromURL(),
                    FirstName: form.querySelector('[name="FirstName"]').value,
                    LastName: form.querySelector('[name="LastName"]').value,
                    LisenceNo: form.querySelector('[name="lisenceNo"]').value,
                    LawyerType: form.querySelector('[name="LawyerType"]').value,
                    Company: form.querySelector('[name="CompanyName"]').value,
                    DateOfBirth: form.querySelector('[name="DateOfBirth"]').value,
                    CountryCode: form.querySelector('[name="countrycode"]').value,
                    Phone: form.querySelector('[name="Phone"]').value,
                    EmailId: form.querySelector('[name="Email"]').value,
                    Address: form.querySelector('[name="Address"]').value,
                    Country: form.querySelector('[name="Country"]').value,
                    Nationality: form.querySelector('[name="Nationality"]').value,
                };

                // Send AJAX request to create a new admin account
                $.ajax({
                    type: "PUT",
                    url: "Admin/UpdateLawyer",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(formData),
                    dataType: "json",
                    success: function (data) {
                        if (data == "done") {
                            Swal.fire({
                                text: "Lawyer Successfully Updated!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                location.href = "ViewLawyer";
                            });
                        }

                    },

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



var lawyerDetailData = [];

var fetchLawyerDetailById = function (id) {
    var model = { Id: id };

    $.ajax({
        url: '/Admin/GetLawyerDetail',
        type: 'GET',
        data: model,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (response) {
            //const result = JSON.parse(response); // Parse the JSON string response
            console.log(response)
            //console.log(result);
            if (response.success) {
                lawyerDetailData = response.lawyerDetail;
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

    if (lawyerDetailData.length > 0) {
        var lawyerDetail = lawyerDetailData[0];

        var form = document.querySelector('#kt_update_advocate_form');
        form.querySelector('[name="FirstName"]').value = lawyerDetail.FirstName;
        form.querySelector('[name="LastName"]').value = lawyerDetail.LastName;
        form.querySelector('[name="Email"]').value = lawyerDetail.EmailId;
        form.querySelector('[name="lisenceNo"]').value = lawyerDetail.LisenceNo;
        const lawyerType = form.querySelector('[name="LawyerType"]');
        lawyerType.value = lawyerDetail.LawyerType;
        $(lawyerType).trigger('change');
        const companyname = form.querySelector('[name="CompanyName"]');
        companyname.value = lawyerDetail.Company;
        $(companyname).trigger('change');
        const lawyerDateOfBirth = lawyerDetail.DateOfBirth;

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
        form.querySelector('[name="DateOfBirth"]').value = lawyerDateOfBirth;
        form.querySelector('[name="Phone"]').value = lawyerDetail.Phone;
        form.querySelector('[name="Address"]').value = lawyerDetail.Address;
        const countrySelect = form.querySelector('[name="Country"]');
        countrySelect.value = lawyerDetail.Country;
        $(countrySelect).trigger('change');
        const nationselect = form.querySelector('[name="Nationality"]');
        nationselect.value = lawyerDetail.Nationality;
        $(nationselect).trigger('change');
        const countrycodeSelect = form.querySelector('[name="countrycode"]');
        countrycodeSelect.value = lawyerDetail.CountryCode;
        $(countrycodeSelect).trigger('change');
       

    }
    KTMenu.createInstances();
}


function getLawyerIdFromURL() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Create a URLSearchParams object to parse the query string
    const params = new URLSearchParams(queryString);

    // Get the value of the 'id' parameter
    const lawyerId = params.get('id');

    // Convert the retrieved ID to an integer using parseInt
    const id = parseInt(lawyerId, 10);

    // Check if the parsed ID is a valid number and return it
    return !isNaN(id) ? id : null;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the admin ID from the URL
    const lawyerId = getLawyerIdFromURL();

    // Ensure the ID is valid
    if (lawyerId !== null) {
        // Call the function to fetch admin data by ID and populate the form
        fetchLawyerDetailById(lawyerId);
        updateLawyer();
    } else {
        console.error('Invalid lawyer ID in URL');
    }
});
