﻿// Function to fetch admin data from the server and populate the table

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
            + '<a href="/DeleteAdmin?id=' + adminItem.Id + '" class="menu-link px3">Delete</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '</div>';
    });
    KTMenu.createInstances();
}




function getAdminIdFromURL() {
    const url = window.location.pathname; // Example: '/Admin/ManageAdmin/Update-Admin/123'
    const parts = url.split('/');
    // Assuming the ID is the last part of the URL path
    const Id = parts[parts.length - 1];
    return Id;
}




// Call the function to fetch admin data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAdminData();
});



