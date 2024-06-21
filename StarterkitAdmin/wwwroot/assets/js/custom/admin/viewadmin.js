﻿// Function to fetch admin data from the server and populate the table

// Function to convert a timestamp wrapped in a string to a human-readable date format (e.g., "YYYY-MM-DD")
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
        type: 'GET',
        url: 'Admin/ViewAdmin',
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
                <a href='/UpdateAdmin?id=${admin.Id}' class="btn btn-light btn-sm btn-flex btn-center me-1">Edit</a>
                <a href='/DeleteAdmin?id=${admin.Id}' class="btn btn-light btn-sm btn-flex btn-center">Delete</a>
            </td>
        `;

        // Append the row to the table body
        adminTableBody.appendChild(row);
    });
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



