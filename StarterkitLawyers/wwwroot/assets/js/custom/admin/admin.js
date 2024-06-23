//Create Admin Code.
"use strict";
var CreateAdmin = function () {
    // Elements
    var form;
    var submitButton;
    var validator;

    // Initialize the form
    var initForm = function () {
        form = document.querySelector("#kt_create_admin_form");
        submitButton = document.querySelector("#kt_create_admin_form_submit");

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
                        firstName: form.querySelector("[name='firstName']").value,
                        lastName: form.querySelector("[name='lastName']").value,
                        dateOfBirth: form.querySelector("[name='DateOfBirth']").value,
                        phone: form.querySelector("[name='Phone']").value,
                        email: form.querySelector("[name='EmailId']").value,
                        address: form.querySelector("[name='Address']").value,
                        country: form.querySelector("[name='Country']").value,
                        nationality: form.querySelector("[name='Nationality']").value,
                    };

                    // Send AJAX request to create a new admin account
                    $.ajax({
                        type: "POST",
                        url: "Admin/ManageAdmin/CreateAdmin.aspx/RegisterAdmin",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (response) {
                            // Handle success response
                            if (response.d === "Admin successfully registered.") {
                                Swal.fire({
                                    text: "Admin account created successfully!",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then(function () {
                                    // Redirect to another page (e.g., admin list page) after success
                                    location.href = "New-Admin";
                                    form.reset();
                                });
                            } else {
                                // Handle failure response
                                Swal.fire({
                                    text: response.d,
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


//View Admin Code.
function dateOfBirthFormatted(timestampString) {
    // Extract the timestamp from the string (e.g., "Date(946665000000)" becomes "946665000000")
    const match = timestampString.match(/\d+/); // Find the first sequence of digits

    // If a match is found, convert the extracted number to an integer
    if (match) {
        const timestamp = parseInt(match[0], 10);

        // Check if the timestamp is a valid number
        if (isNaN(timestamp)) {
            console.error('Invalid timestamp:', timestampString);
            return ''; // Return an empty string if the timestamp is invalid
        }

        // Create a new Date object using the integer timestamp
        const date = new Date(timestamp);

        // Check if the date object is valid
        if (isNaN(date.getTime())) {
            console.error('Invalid date object:', date);
            return ''; // Return an empty string if the date is invalid
        }

        // Format the date as "YYYY-MM-DD"
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${month}-${day}-${year}`;
    } else {
        // No match found, handle the error
        console.error('Invalid timestamp format:', timestampString);
        return ''; // Return an empty string if the format is invalid
    }
}

function fetchAdminData() {
    // Make an AJAX request to the server-side method
    $.ajax({
        type: 'POST',
        url: 'Admin/ManageAdmin/ViewAdmin.aspx/GetAdminListData',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            var data = response.d;

            // Add debug logging to check the data type and structure
            console.log('Response data:', data);
            console.log('Is data an array?:', Array.isArray(data));

            // If data is not an array, convert it to an array
            if (!Array.isArray(data)) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.error('Error parsing data as JSON:', e);
                    return;
                }
            }

            // Proceed to populate the admin table if data is now an array
            populateAdminTable(data);
        },
        error: function (error) {
            console.error('Error fetching admin data:', error);
        }
    });
}

function populateAdminTable(data) {
    // Get the table body element
    var adminTableBody = document.getElementById('adminTableBody');

    // Clear existing rows
    adminTableBody.innerHTML = '';

    // Iterate through the data and create rows
    data.forEach(function (admin) {
        var row = document.createElement('tr');
        // Convert timestamp to date format


        // Add columns to the row
        row.innerHTML = `
            <td>${admin.FullName}</td>
            <td>${admin.EmailId}</td>
            <td>${admin.Phone}</td>
            <td>${admin.Username}</td>
            <td>
                <a href='/Update-Admin?id=${admin.Id}' class="btn btn-light btn-sm btn-flex btn-center me-1">Edit</a>
                <a href='/Delete-Admin?id=${admin.Id}' class="btn btn-light btn-sm btn-flex btn-center">Delete</a>
            </td>
        `;

        // Append the row to the table body
        adminTableBody.appendChild(row);
    });
}


//Update Admin Code.
var UpdateAdmin = function () {
    // Elements
    var form;
    var submitButton;
    var validator;

    // Initialize the form
    var initForm = function () {
        form = document.querySelector("#kt_admin_update_form");
        submitButton = document.querySelector("#kt_admin_update_submit");

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
                        id: getAdminIdFromURL(),
                        FirstName: form.querySelector('[name="FirstName"]').value,
                        LastName: form.querySelector('[name="LastName"]').value,
                        dateOfBirth: form.querySelector('[name="DateOfBirth"]').value,
                        phone: form.querySelector('[name="Phone"]').value,
                        email: form.querySelector('[name="EmailId"]').value,
                        address: form.querySelector('[name="Address"]').value,
                        country: form.querySelector('[name="Country"]').value,
                        nationality: form.querySelector('[name="Nationality"]').value,
                    };

                    // Send AJAX request to create a new admin account
                    $.ajax({
                        type: "POST",
                        url: "Admin/ManageAdmin/UpdateAdmin.aspx/UpdateAdminUser",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (response) {
                            // Handle success response
                            if (response.d === "Admin successfully Updated.") {
                                Swal.fire({
                                    text: "Admin account updated successfully!",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then(function () {
                                    // Redirect to another page (e.g., admin list page) after success
                                    location.href = "New-Admin";
                                    form.reset();
                                });
                            } else {
                                // Handle failure response
                                Swal.fire({
                                    text: response.d,
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

// Function to convert a date string to the "YYYY-MM-DD" format
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

function fetchAdminDetailById(id) {
    $.ajax({
        type: 'POST',
        url: 'Admin/ManageAdmin/UpdateAdmin.aspx/GetAdminDetailtData',
        data: JSON.stringify({ id: id }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log('Response data:', response);
            const adminDetails = response.d ? JSON.parse(response.d) : null;
            console.log('Fetched admin data:', adminDetails);

            if (Array.isArray(adminDetails)) {
                // Handle case where response is an array
                if (adminDetails.length > 0) {
                    populateForm(adminDetails[0]); // Take the first object in the array
                } else {
                    console.error('Empty array received');
                }
            } else if (adminDetails && !adminDetails.message) {
                // Handle case where response is a single object
                populateForm(adminDetails);
            } else {
                console.error('Unexpected response format or missing data:', response);
            }
        },
        error: function (error) {
            console.error('Error fetching admin data by ID:', error);
        }
    });
}

function populateForm(adminDetails) {
    var form = document.querySelector('#kt_admin_update_form');
    form.querySelector('[name="FirstName"]').value = adminDetails.FirstName;
    form.querySelector('[name="LastName"]').value = adminDetails.LastName;
    form.querySelector('[name="EmailId"]').value = adminDetails.EmailId;
    const adminDateOfBirth = adminDetails.DateOfBirth;

    // Convert the date to "YYYY-MM-DD" format
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
    }
    form.querySelector('[name="Phone"]').value = adminDetails.Phone;
    form.querySelector('[name="Address"]').value = adminDetails.Address;
    const countrySelect = form.querySelector('[name="Country"]');
    countrySelect.value = adminDetails.Country;
    $(countrySelect).trigger('change');
    const nationselect = form.querySelector('[name="Nationality"]');
    nationselect.value = adminDetails.Nationality;
    $(nationselect).trigger('change');

}


//Delete Admin Code. Note that fetchAdminDetailById() is used in Update Admin Code.
function deleteAdminById(id) {
    // Perform an AJAX request to delete the admin by ID
    $.ajax({
        type: 'POST',
        url: 'Admin/ManageAdmin/DeleteAdmin.aspx/DeleteAdminById', // URL of the Web Method
        data: JSON.stringify({ id: id }), // Send the ID as JSON data
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            // Parse the JSON response
            const serverMessage = response.d ? JSON.parse(response.d) : null;

            // Check the response for success or error
            if (serverMessage && serverMessage.message === "Admin deleted successfully.") {
                Swal.fire({
                    text: serverMessage.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(function () {
                    // Optional: Redirect to another page or refresh the page after success
                    location.href = "Admin-List";
                });
            } else {
                Swal.fire({
                    text: serverMessage.message || 'An error occurred while deleting the admin.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function (error) {
            Swal.fire({
                text: 'An error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

function handleDeleteAdmin() {
    // Get the form element by its ID
    const form = document.getElementById('kt_admin_delete_form');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the admin ID from a hidden field or other source
        const adminId = getAdminIdFromURL();

        // Ensure the ID is valid
        if (adminId !== null) {
            // Call the function to delete the admin by ID
            deleteAdminById(adminId);

        } else {
            console.error('Invalid admin ID');
            Swal.fire({
                text: 'Invalid admin ID. Unable to delete admin.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}


//Fetch AdminId by URL.
function getAdminIdFromURL() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Create a URLSearchParams object to parse the query string
    const params = new URLSearchParams(queryString);

    // Get the value of the 'id' parameter
    const adminId = params.get('id');

    // Convert the retrieved ID to an integer using parseInt
    const id = parseInt(adminId, 10);

    // Check if the parsed ID is a valid number and return it
    return !isNaN(id) ? id : null;
}


//Call all the codes.
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the admin ID from the URL
    const adminId = getAdminIdFromURL();

    // Ensure the ID is valid
    if (adminId !== null) {
        // Call the function to fetch admin data by ID and populate the form
        fetchAdminDetailById(adminId);
    } else {
        console.error('Invalid admin ID in URL');
    }
    CreateAdmin.init();
    UpdateAdmin.init();
    handleDeleteAdmin();
    fetchAdminData();
});
