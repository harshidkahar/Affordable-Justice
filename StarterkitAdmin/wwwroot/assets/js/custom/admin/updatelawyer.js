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


function fetchLawyerDetailById(id) {
    $.ajax({
        type: 'GET',
        url: 'Admin/GetLawyerDetailtData',
        data: JSON.stringify({ id: id }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log('Response data:', response);
            const lawyerDetails = response ? JSON.parse(response) : null;
            console.log('Fetched lawyer data:', lawyerDetails);

            if (Array.isArray(lawyerDetails)) {
                // Handle case where response is an array
                if (lawyerDetails.length > 0) {
                    populateForm(lawyerDetails[0]); // Take the first object in the array
                } else {
                    console.error('Empty array received');
                }
            } else if (lawyerDetails && !lawyerDetails.message) {
                // Handle case where response is a single object
                populateForm(lawyerDetails);
            } else {
                console.error('Unexpected response format or missing data:', response);
            }
        },
        error: function (error) {
            console.error('Error fetching lawyer data by ID:', error);
        }
    });
}

function populateForm(lawyerDetails) {
    var form = document.querySelector('#kt_update_advocate_form');
    form.querySelector('[name="FirstName"]').value = lawyerDetails.FirstName;
    form.querySelector('[name="LastName"]').value = lawyerDetails.LastName;
    form.querySelector('[name="Email"]').value = lawyerDetails.EmailId;
    const lawyerDateOfBirth = lawyerDetails.DateOfBirth;

    // Convert the date to "YYYY-MM-DD" format
    const formattedDOB = convertDateToString(lawyerDateOfBirth);

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
    const lawyerType = form.querySelector('[name="LawyerType"]');
    lawyerType.value = lawyerDetails.LawyerType;
    $(lawyerType).trigger('change');

    const companyname = form.querySelector('[name="CompanyName"]');
    companyname.value = lawyerDetails.Company;
    $(companyname).trigger('change');
    form.querySelector('[name="lisenceNo"]').value = lawyerDetails.LisenceNumber;
    form.querySelector('[name="countrycode"]').value = lawyerDetails.CountryCode;
    form.querySelector('[name="Phone"]').value = lawyerDetails.Phone;
    form.querySelector('[name="Address"]').value = lawyerDetails.Address;
    const countrySelect = form.querySelector('[name="Country"]');
    countrySelect.value = lawyerDetails.Country;
    $(countrySelect).trigger('change');
    const nationselect = form.querySelector('[name="Nationality"]');
    nationselect.value = lawyerDetails.Nationality;
    $(nationselect).trigger('change');

}



function getLawyerIdFromURL() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Create a URLSearchParams object to parse the query string
    const params = new URLSearchParams(queryString);

    // Get the value of the 'id' parameter
    const lawyerId = params.get('id');

    // Convert the retrieved ID to an integer using parseInt
    const id = parseInt(lawyerId, 10);

    // Check if the parsed ID is a valid number and return it
    return !isNaN(id) ? id : null;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the admin ID from the URL
    const lawyerId = getLawyerIdFromURL();

    // Ensure the ID is valid
    if (lawyerId !== null) {
        // Call the function to fetch admin data by ID and populate the form
        fetchLawyerDetailById(lawyerId);
    } else {
        console.error('Invalid lawyer ID in URL');
    }
});
