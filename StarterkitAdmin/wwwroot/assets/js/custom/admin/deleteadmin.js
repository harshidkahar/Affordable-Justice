// Function to convert a date string to the "YYYY-MM-DD" format
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
    var model = {
        Id: id,
        FirstName: document.querySelector('[name="FirstName"]').value,
        LastName: document.querySelector('[name="LastName"]').value,
        DateOfBirth: document.querySelector('[name="DateOfBirth"]').value,
        CountryCode: document.querySelector('[name="countrycode"]').value,
        Phone: document.querySelector('[name="Phone"]').value,
        EmailId: document.querySelector('[name="EmailId"]').value,
        Address: document.querySelector('[name="Address"]').value,
        Country: document.querySelector('[name="Country"]').value,
        Nationality: document.querySelector('[name="Nationality"]').value,
    };
    // Perform an AJAX request to delete the admin by ID
    $.ajax({
        type: 'DELETE',
        url: 'Admin/DeleteAdmin', // URL of the Web Method
        data: JSON.stringify(model), // Send the ID as JSON data
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data == "done") {
                Swal.fire({
                    text: "Admin Successfully Deleted!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    location.href = "ViewAdmin"
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




var adminDetailData = [];

var fetchAdminDetailById = function (id) {
    var model = { Id: id };

    $.ajax({
        url: '/Admin/GetAdminDetail',
        type: 'GET',
        data: model,
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

        var form = document.querySelector('#kt_admin_delete_form');
        form.querySelector('[name="FirstName"]').value = adminDetail.FirstName;
        form.querySelector('[name="LastName"]').value = adminDetail.LastName;
        form.querySelector('[name="EmailId"]').value = adminDetail.EmailId;
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
        form.querySelector('[name="DateOfBirth"]').value = adminDateOfBirth;
        form.querySelector('[name="Phone"]').value = adminDetail.Phone;
        form.querySelector('[name="Address"]').value = adminDetail.Address;
        const countrySelect = form.querySelector('[name="Country"]');
        countrySelect.value = adminDetail.Country;
        $(countrySelect).trigger('change');
        const nationselect = form.querySelector('[name="Nationality"]');
        nationselect.value = adminDetail.Nationality;
        $(nationselect).trigger('change');
        const countrycodeSelect = form.querySelector('[name="countrycode"]');
        countrycodeSelect.value = adminDetail.CountryCode;
        $(countrycodeSelect).trigger('change');


    }
    KTMenu.createInstances();
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
