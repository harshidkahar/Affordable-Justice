// Function to fetch admin data from the server and populate the table
var lawyerListData = [];
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


var fetchLawyerData = function () {
    $.ajax({
        url: '/Admin/GetLawyerList',
        type: 'GET',
        success: function (response) {
            //const result = JSON.parse(response); // Parse the JSON string response
            console.log(response)
            //console.log(result);
            if (response.success) {
                lawyerListData = response.lawyerList;
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
    const tableBody = document.querySelector('#lawyerTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    lawyerListData.forEach((lawyerItem, index) => {
        const row = tableBody.insertRow();

        const lisenceNumberInt = convertLicenseNumber(lawyerItem.LisenceNumber);

        row.insertCell(0).textContent = lawyerItem.FirstName +' ' + lawyerItem.LastName;
        row.insertCell(1).textContent = lisenceNumberInt;
        row.insertCell(2).textContent = lawyerItem.LawyerType;
        row.insertCell(3).textContent = lawyerItem.Company;
        row.insertCell(4).textContent = lawyerItem.EmailId;
        row.insertCell(5).textContent = lawyerItem.Username;
        row.insertCell(6).innerHTML = '<a href="#" class="btn btn-light btn-active-light-primary btn-flex btn-center btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions'
            + '<i class="ki-duotone ki-down fs-5 ms-1" ></i>'
            + '</a>'
            + '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a href="/UpdateLawyer?id=' + lawyerItem.Id + '" class="menu-link px3">Edit</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '<!--begin::Menu item-->'
            + '<div class="menu-item px-3">'
            + '<a href="/DeleteLawyer?id=' + lawyerItem.Id + '" class="menu-link px3">Delete</a>'
            + '</div>'
            + '<!--end::Menu item-->'
            + '</div>';
    });
    KTMenu.createInstances();
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



