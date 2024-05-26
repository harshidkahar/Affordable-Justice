"use strict";

var KTCaseList = function () {
    // Elements
    var table;
    var caseListData = [];

    // Fetch case list data
    var fetchCaseList = function () {
        $.ajax({
            url: '/Case/GetCaseList',
            type: 'GET',
            success: function (response) {
                const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                console.log(result);
                if (result.success) {
                    caseListData = result.caseList;
                    renderTable();
                } else {
                    Swal.fire({
                        text: result.message,
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
        const tableBody = table.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        caseListData.forEach((caseItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = caseItem.CaseKey;
            row.insertCell(2).textContent = caseItem.PrimaryCaseType;
            row.insertCell(3).textContent = caseItem.ThirdCaseType;
            row.insertCell(4).textContent = new Date(caseItem.DateCommenced).toLocaleDateString();
            row.insertCell(5).textContent = getStatusLabel(caseItem.Status); // Call a function to get status label
        });
    }

    // Function to get status label based on status code
    var getStatusLabel = function (statusCode) {
        switch (statusCode) {
            case 0:
                return 'In Process';
            case 1:
                return 'Assigned';
            case 2:
                return 'Submitted';
            case 3:
                return 'Closed';
            default:
                return '';
        }
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            table = document.querySelector('#kt_datatable_select');
            fetchCaseList();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCaseList.init();
});
