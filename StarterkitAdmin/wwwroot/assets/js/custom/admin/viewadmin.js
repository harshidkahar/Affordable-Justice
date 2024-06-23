// Function to fetch admin data from the server and populate the table

// Function to convert a timestamp wrapped in a string to a human-readable date format (e.g., "YYYY-MM-DD")
var adminListData = [];
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

var fetchAdminData = function () {
    $.ajax({
        url: '/Admin/GetAdminList',
        type: 'GET',
        success: function (response) {
            //const result = JSON.parse(response); // Parse the JSON string response
            console.log(response)
            //console.log(result);
            if (response.success) {
                adminListData = response.adminList;
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
                text: "Failed to retrieve case list.",
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
    const tableBody = document.querySelector('#adminTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    adminListData.forEach((adminItem, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = adminItem.FirstName + adminItem.LastName;
        row.insertCell(1).textContent = adminItem.EmailId;
        row.insertCell(2).textContent = adminItem.Phone;
        row.insertCell(3).textContent = adminItem.Username;
        row.insertCell(4).innerHTML = '<a href="#" class="btn btn-light btn-active-light-primary btn-flex btn-center btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions'
            + '<i class="ki-duotone ki-down fs-5 ms-1" ></i>'
            + '</a>'
            + '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a href="/UpdateAdmin?id=' + adminItem.Id + '" class="menu-link px3">Edit</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a class="menu-link px3 admindelete" onclick="deleteAdminById(' + adminItem.Id + ');">Delete</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '</div>';

        const deleteButton = row.querySelector('.admindelete');
        deleteButton.addEventListener('click', () => {
            // Add your edit functionality here
            console.log('delete button clicked for index:', index);
            deleteAdminById(adminItem.Id);

        });
       
    });
    KTMenu.createInstances();
}

function deleteAdminById(Id) {
    var model = {
        Id: Id
    /*    FirstName: document.querySelector('[name="FirstName"]').value,
        LastName: document.querySelector('[name="LastName"]').value,
        DateOfBirth: document.querySelector('[name="DateOfBirth"]').value,
        CountryCode: document.querySelector('[name="countrycode"]').value,
        Phone: document.querySelector('[name="Phone"]').value,
        EmailId: document.querySelector('[name="EmailId"]').value,
        Address: document.querySelector('[name="Address"]').value,
        Country: document.querySelector('[name="Country"]').value,
        Nationality: document.querySelector('[name="Nationality"]').value, */
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

                fetchAdminData();
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
            //deleteAdminById(adminId);

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



// Call the function to fetch admin data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAdminData();
});



