"use strict";

var KTCompanyList = function () {
    // Elements
    var table;
    var companyListData = [];

    // Fetch case list data
    var fetchCompanyList = function () {
        $.ajax({
            url: '/Case/GetCompanyList',
            type: 'GET',
            success: function (response) {
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    companyListData = response.companyList;
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

        companyListData.forEach((companyItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = companyItem.SrNo;
            row.insertCell(1).textContent = companyItem.CompanyKey;
            //row.insertCell(1).textContent = companyItem.PrimaryCaseType;
            //row.insertCell(2).textContent = companyItem.ThirdCaseType;
            if (companyItem.Date !== null && companyItem.Date !== undefined) {
                row.insertCell(2).textContent = companyItem.Date;
            } else {
                row.insertCell(2).textContent = ""; 
            }
            row.insertCell(3).textContent = companyItem.Status;// getStatusLabel(caseItem.Status); // Call a function to get status label

            row.insertCell(4).innerHTML = '<a href="#" class="btn btn-light btn-active-light-primary btn-flex btn-center btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions'
                +'<i class="ki-duotone ki-down fs-5 ms-1" ></i>'
                                +'</a>'
                + '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">'
                + '<!--begin::Menu item-->'
                + '<div class="menu-item px-3">'
                + '<a href="/viewCaseDocuments?CaseId' + companyItem.CompanyKey +'" class="menu-link px3">View Documents</a>'
                + '</div>'
                + '<!--end::Menu item-->'
                + '<!--begin::Menu item-->'
                + '<div class="menu-item px-3">'
                + '<a href="/uploadCaseDocuments?CaseId=' + companyItem.CompanyKey+'" class="menu-link px3">Upload Documents</a>'
                    + '</div>'
                    + '!--end::Menu item-->'
                    + '<!--begin::Menu item-->'
                    + '<div class="menu-item px-3">'
                + '<a href="caseDetails?CaseId' + companyItem.CompanyKey +'"  class="menu-link px3">Company Details</a>'
                    + '</div>'
                    + '<!--end::Menu item-->'
                + '</div>';

            KTMenu.createInstances();
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
            table = document.querySelector('#kt_datatable_select1');
            fetchCompanyList();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCompanyList.init();
});
