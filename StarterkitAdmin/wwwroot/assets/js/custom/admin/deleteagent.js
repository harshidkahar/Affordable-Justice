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


function fetchAgentDetailById(id) {
    $.ajax({
        type: 'GET',
        url: 'Admin/DeleteAgent',
        data: JSON.stringify({ id: id }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log('Response data:', response);
            const agentDetails = response ? JSON.parse(response) : null;
            console.log('Fetched agent data:', agentDetails);

            if (Array.isArray(agentDetails)) {
                // Handle case where response is an array
                if (agentDetails.length > 0) {
                    populateForm(agentDetails[0]); // Take the first object in the array
                } else {
                    console.error('Empty array received');
                }
            } else if (agentDetails && !agentDetails.message) {
                // Handle case where response is a single object
                populateForm(agentDetails);
            } else {
                console.error('Unexpected response format or missing data:', response);
            }
        },
        error: function (error) {
            console.error('Error fetching admin data by ID:', error);
        }
    });
}

function populateForm(agentDetails) {
    var form = document.querySelector('#kt_delete_agent_form');
    form.querySelector('[name="FirstName"]').value = agentDetails.FirstName;
    form.querySelector('[name="LastName"]').value = agentDetails.LastName;
    form.querySelector('[name="Email"]').value = agentDetails.EmailId;
    const agentDateOfBirth = agentDetails.DateOfBirth;

    // Convert the date to "YYYY-MM-DD" format
    const formattedDOB = convertDateToString(agentDateOfBirth);

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
    const Role = form.querySelector('[name="Role"]');
    Role.value = agentDetails.Role;
    $(Role).trigger('change');

    form.querySelector('[name="Phone"]').value = agentDetails.Phone;
    form.querySelector('[name="countrycode"]').value = agentDetails.CountryCode;
    form.querySelector('[name="Address"]').value = agentDetails.Address;
    const countrySelect = form.querySelector('[name="Country"]');
    countrySelect.value = agentDetails.Country;
    $(countrySelect).trigger('change');
    const nationselect = form.querySelector('[name="Nationality"]');
    nationselect.value = agentDetails.Nationality;
    $(nationselect).trigger('change');

}


function deleteAgentById(id) {
    // Perform an AJAX request to delete the admin by ID
    $.ajax({
        type: 'DELETE',
        url: 'Admin/DeleteAgent', // URL of the Web Method
        data: JSON.stringify({ id: id }), // Send the ID as JSON data
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            // Parse the JSON response
            const serverMessage = response ? JSON.parse(response) : null;

            // Check the response for success or error
            if (serverMessage && serverMessage.message === "Agent deleted successfully.") {
                Swal.fire({
                    text: serverMessage.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(function () {
                    // Optional: Redirect to another page or refresh the page after success
                    location.href = "Agent-List";
                });
            } else {
                Swal.fire({
                    text: serverMessage.message || 'An error occurred while deleting the agent.',
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

function handleDeleteAgent() {
    // Get the form element by its ID
    const form = document.getElementById('kt_delete_agent_form');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the agent ID from a hidden field or other source
        const agentId = getAgentIdFromURL();

        // Ensure the ID is valid
        if (agentId !== null) {
            // Call the function to delete the agent by ID
            deleteAgentById(agentId);

        } else {
            console.error('Invalid agent ID');
            Swal.fire({
                text: 'Invalid agent ID. Unable to delete agent.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
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
        console.error('Invalid agent ID in URL');
    }
    handleDeleteAgent();
});
