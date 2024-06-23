
var adminDetailData = [];

var fetchAdminDetailById = function () {
   // var model = { Id: id };

    $.ajax({
        url: '/Admin/GetAdminDetail',
        type: 'GET',
        
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
        document.querySelector('#ttlFullName').textContent = adminDetail.FirstName + adminDetail.LastName;
        document.querySelector('#ttlUsername').textContent = adminDetail.Username;
        document.querySelector('#ttlAddress').textContent = adminDetail.Address;
        document.querySelector('#ttlEmailId').textContent = adminDetail.EmailId;

        //var form = document.querySelector('#kt_admin_profile_details_form');
        document.querySelector('#lblfullname').textContent = adminDetail.FirstName + adminDetail.LastName;
        document.querySelector('#lblEmailId').textContent = adminDetail.EmailId;
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
        document.querySelector('#lblDateofBirth').textContent = adminDateOfBirth;
        document.querySelector('#lblPhone').textContent = adminDetail.CountryCode + adminDetail.Phone;
        document.querySelector('#lblAddress').textContent = adminDetail.Address;
        document.querySelector('#lblUsername').textContent.adminDetail.Username;
        document.querySelector('#lblpassword').textContent = adminDetail.Watchword;
        document.querySelector('#lblCountry').textContent = adminDetail.Country;
        document.querySelector('#lblNationality').textContent = adminDetail.Nationality;




    }
    KTMenu.createInstances();
}



// Initialize the CreateAdmin script when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    fetchAdminDetailById();
});
