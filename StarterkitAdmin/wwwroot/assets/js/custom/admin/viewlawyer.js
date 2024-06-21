// Function to fetch admin data from the server and populate the table
function convertLicenseNumber(licenseNumber) {
    // Check if licenseNumber is a valid non-empty string
    if (typeof licenseNumber !== 'string' || licenseNumber.trim() === '') {
        console.error('Invalid licenseNumber:', licenseNumber);
        return 0; // Return 0 for invalid inputs instead of NaN
    }

    // Remove non-numeric characters from the licenseNumber using a regular expression
    const cleanedLicenseNumber = licenseNumber.replace(/\D/g, '');

    // If the cleaned string is empty, return 0 as there are no numeric characters
    if (cleanedLicenseNumber === '') {
        console.error('No numeric characters found in licenseNumber:', licenseNumber);
        return 0; // Return 0 when no numeric characters found
    }

    // Convert the cleaned string to an integer using parseInt with base 10
    const licenseNumberInt = parseInt(cleanedLicenseNumber, 10);

    // Return the integer value
    return licenseNumberInt;
}



function fetchLawyerData() {
    // Make an AJAX request to the server-side method
    $.ajax({
        type: 'GET',
        url: 'Admin/ViewLawyer',
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
            populateLawyerTable(data);
        },
        error: function (error) {
            console.error('Error fetching Lawyer data:', error);
        }
    });
}


// Function to populate the admin table with data
function populateLawyerTable(data) {
    // Get the table body element
    var lawyerTableBody = document.getElementById('lawyerTableBody');

    // Clear existing rows
    lawyerTableBody.innerHTML = '';

    // Iterate through the data and create rows
    data.forEach(function (lawyer) {
        var row = document.createElement('tr');
        // Convert timestamp to date format
        //const dateOfBirthFormatted = convertTimestampToDate(lawyer.DateOfBirth);

        // Convert LisenceNumber to integer format
        const lisenceNumberInt = convertLicenseNumber(lawyer.LisenceNumber);



        // Add columns to the row
        row.innerHTML = `
             <td>${lawyer.FullName}</td>
            <td>${lisenceNumberInt}</td>
            <td>${lawyer.LawyerType}</td>
            <td>${lawyer.Company}</td>
            <td>${lawyer.EmailId}</td>
            <td>${lawyer.Username}</td>
            <td>
                <a href='/UpdateLawyer?id=${lawyer.Id}' class="btn btn-light btn-sm btn-flex btn-center me-1">Edit</a>
                <a href='/DeleteLawyer?id=${lawyer.Id}' class="btn btn-light btn-sm btn-flex btn-center">Delete</a>
            </td>
        `;

        // Append the row to the table body
        lawyerTableBody.appendChild(row);
    });
   
}
function getLawyerIdFromURL() {
    const url = window.location.pathname; // Example: '/Admin/ManageAdmin/Update-Agent/123'
    const parts = url.split('/');
    // Assuming the ID is the last part of the URL path
    const Id = parts[parts.length - 1];
    return Id;
}




// Call the function to fetch admin data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchLawyerData();


});



