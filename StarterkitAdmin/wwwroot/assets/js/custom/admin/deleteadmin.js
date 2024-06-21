﻿// Function to convert a date string to the "YYYY-MM-DD" format
function convertToDateFormat(dateString) {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return ''; // Return an empty string if the date is invalid
    }

    // Format the date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function deleteAdminById(id) {
    // Perform an AJAX request to delete the admin by ID
    $.ajax({
        type: 'DELETE',
        url: 'Admin/DeleteAdmin', // URL of the Web Method
        data: JSON.stringify({ id: id }), // Send the ID as JSON data
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            // Parse the JSON response
            const serverMessage = response ? JSON.parse(response) : null;

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
        type: 'GET',
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
    var form = document.querySelector('#kt_admin_delete_form');
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
    form.querySelector('[name="countrycode"]').value = adminDetails.CountryCode;
    form.querySelector('[name="Phone"]').value = adminDetails.Phone;
    form.querySelector('[name="Address"]').value = adminDetails.Address;
    const countrySelect = form.querySelector('[name="Country"]');
    countrySelect.value = adminDetails.Country;
    $(countrySelect).trigger('change');
    const nationselect = form.querySelector('[name="Nationality"]');
    nationselect.value = adminDetails.Nationality;
    $(nationselect).trigger('change');

}

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

// Call this function when the page loads
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
    handleDeleteAdmin();
});
