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
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    caseListData = response.caseList;
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
        const tableBody = table.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        caseListData.forEach((caseItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = caseItem.SrNo;
            //row.insertCell(1).textContent = caseItem.CaseKey;
            row.insertCell(1).textContent = caseItem.PrimaryCaseType;
            row.insertCell(2).textContent = caseItem.ThirdCaseType;
            if (caseItem.DateCommenced !== null && caseItem.DateCommenced !== undefined) {
                row.insertCell(3).textContent = caseItem.DateCommenced;
            } else {
                row.insertCell(3).textContent = ""; 
            }
            row.insertCell(4).textContent = caseItem.Status;// getStatusLabel(caseItem.Status); // Call a function to get status label

            row.insertCell(5).innerHTML = '<a href="#" class="btn btn-light btn-active-light-primary btn-flex btn-center btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions'
                +'<i class="ki-duotone ki-down fs-5 ms-1" ></i>'
                                +'</a>'
                + '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">'
                + '<!--begin::Menu item-->'
                + '<div class="menu-item px-3">'
                + '<a href="/viewCaseDocuments?CaseId=' + caseItem.CaseKey +'" class="menu-link px3">View Documents</a>'
                + '</div>'
                + '<!--end::Menu item-->'
                + '<!--begin::Menu item-->'
                + '<div class="menu-item px-3">'
                + '<a href="/uploadCaseDocuments?CaseId=' + caseItem.CaseKey+'" class="menu-link px3">Upload Documents</a>'
                    + '</div>'
                    + '<!--end::Menu item-->'
                    + '<!--begin::Menu item-->'
                    + '<div class="menu-item px-3">'
                + '<a href="/caseDetails?CaseId=' + caseItem.CaseKey +'"  class="menu-link px3">Case Details</a>'
                    + '</div>'
                    + '<!--end::Menu item-->'
                    + '</div>';
        });
        KTMenu.createInstances();
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
