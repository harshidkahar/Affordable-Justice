// Function to fetch admin data from the server and populate the table
var agentListData = [];
// Function to convert a timestamp wrapped in a string to a human-readable date format (e.g., "YYYY-MM-DD")
function convertTimestampToDate(timestampString) {
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



var fetchAgentData = function () {
    $.ajax({
        url: '/Admin/GetAgentList',
        type: 'GET',
        success: function (response) {
            //const result = JSON.parse(response); // Parse the JSON string response
            console.log(response)
            //console.log(result);
            if (response.success) {
                agentListData = response.agentList;
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
                text: "Failed to retrieve agent list.",
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
    const tableBody = document.querySelector('#agentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    agentListData.forEach((agentItem, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = agentItem.FirstName + agentItem.LastName;
        row.insertCell(1).textContent = agentItem.EmailId;
        row.insertCell(2).textContent = agentItem.Phone;
        row.insertCell(3).textContent = agentItem.Role
        row.insertCell(4).textContent = agentItem.Username;
        row.insertCell(5).innerHTML = '<a href="#" class="btn btn-light btn-active-light-primary btn-flex btn-center btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions'
            + '<i class="ki-duotone ki-down fs-5 ms-1" ></i>'
            + '</a>'
            + '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a href="/UpdateAgent?id=' + agentItem.Id + '" class="menu-link px3">Edit</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a class="menu-link px3 agentdelete" onclick="deleteAgentById(' + agentItem.Id + ');">Delete</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '</div>';


        const deleteButton = row.querySelector('.agentdelete');
        deleteButton.addEventListener('click', () => {
            // Add your edit functionality here
            console.log('delete button clicked for index:', index);
            deleteAgentById(agentItem.Id);

        });
    });
    KTMenu.createInstances();
}

function deleteAgentById(Id) {
    var model = {
        Id: Id
        /*FirstName: document.querySelector('[name="FirstName"]').value,
        LastName: document.querySelector('[name="LastName"]').value,
        DateOfBirth: document.querySelector('[name="DateOfBirth"]').value,
        CountryCode: document.querySelector('[name="countrycode"]').value,
        Role: document.querySelector('[name="Role"]').value,
        Phone: document.querySelector('[name="Phone"]').value,
        EmailId: document.querySelector('[name="Email"]').value,
        Address: document.querySelector('[name="Address"]').value,
        Country: document.querySelector('[name="Country"]').value,
        Nationality: document.querySelector('[name="Nationality"]').value, */
    };

    // Perform an AJAX request to delete the admin by ID
    $.ajax({
        type: 'DELETE',
        url: 'Admin/DeleteAgent', // URL of the Web Method
        data: JSON.stringify(model), // Send the ID as JSON data
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data == "done") {
                fetchAgentData();
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

function getAgentIdFromURL() {
    const url = window.location.pathname; // Example: '/Admin/ManageAdmin/Update-Agent/123'
    const parts = url.split('/');
    // Assuming the ID is the last part of the URL path
    const Id = parts[parts.length - 1];
    return Id;
}




// Call the function to fetch admin data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAgentData();


});



