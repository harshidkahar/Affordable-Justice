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




var agentDetailData = [];

var fetchAgentDetailById = function (id) {
    $.ajax({
        url: '/Admin/GetAgentDetail',
        type: 'GET',
        data: JSON.stringify({ Id: id }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (response) {
            //const result = JSON.parse(response); // Parse the JSON string response
            console.log(response)
            //console.log(result);
            if (response.success) {
                agentDetailData = response.agentDetail;
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

    if (agentDetailData.length > 0) {
        var agentDetail = agentDetailData[0];

        var form = document.querySelector('#kt_update_agent_form');
        form.querySelector('[name="FirstName"]').value = agentDetail.FirstName;
        form.querySelector('[name="LastName"]').value = agentDetail.LastName;
        form.querySelector('[name="Email"]').value = agentDetail.EmailId;
        const agentDateOfBirth = agentDetail.DateOfBirth;

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
        form.querySelector('[name="DateOfBirth"]').value = agentDateOfBirth;
        form.querySelector('[name="Phone"]').value = agentDetail.Phone;
        form.querySelector('[name="Address"]').value = agentDetail.Address;
        const countrySelect = form.querySelector('[name="Country"]');
        countrySelect.value = agentDetail.Country;
        $(countrySelect).trigger('change');
        const nationselect = form.querySelector('[name="Nationality"]');
        nationselect.value = agentDetail.Nationality;
        $(nationselect).trigger('change');
        const countrycodeSelect = form.querySelector('[name="countrycode"]');
        countrycodeSelect.value = agentDetail.CountryCode;
        $(countrycodeSelect).trigger('change');
        const roleSelect = form.querySelector('[name="Role"]');
        roleSelect.value = agentDetail.Role;
        $(roleSelect).trigger('change');


    }
    KTMenu.createInstances();
}



function getAgentIdFromURL() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Create a URLSearchParams object to parse the query string
    const params = new URLSearchParams(queryString);

    // Get the value of the 'id' parameter
    const agentId = params.get('id');

    // Convert the retrieved ID to an integer using parseInt
    const id = parseInt(agentId, 10);

    // Check if the parsed ID is a valid number and return it
    return !isNaN(id) ? id : null;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the admin ID from the URL
    const agentId = getAgentIdFromURL();

    // Ensure the ID is valid
    if (agentId !== null) {
        // Call the function to fetch admin data by ID and populate the form
        fetchAgentDetailById(agentId);
    } else {
        console.error('Invalid admin ID in URL');
    }
});
