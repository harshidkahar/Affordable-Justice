"use strict";

var KTDocumentList = function () {
    // Elements
    var table;
    var documentListData = [];

    // Fetch case list data
    var fetchDocumentList = function () {
        $.ajax({
            url: '/Case/GetDocumentList',
            type: 'GET',
            success: function (response) {
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    documentListData = response.documentList;
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
                    text: "Failed to retrieve document list.",
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

        documentListData.forEach((documentItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = documentItem.FileName;
            row.insertCell(1).textContent = documentItem.Size;
            row.insertCell(2).textContent = documentItem.DocName;
            row.insertCell(3).textContent = documentItem.Description;
            if (documentItem.TimeStamp !== null && documentItem.TimeStamp !== undefined) {
                row.insertCell(4).textContent = documentItem.TimeStamp;
            } else {
                row.insertCell(4).textContent = ""; 
            }
            //row.insertCell(3).textContent = documentItem.Status;// getStatusLabel(caseItem.Status); // Call a function to get status label

            row.insertCell(5).innerHTML = '<td class="text-end" data-kt-filemanager-table="action_dropdown"><a href = "addDocDescription?DocId=' + documentItem.Id+ '"> Add Description</a></td>';
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
            table = document.querySelector('#kt_datatable_example_1');
            // Check if the URL contains 'createCase' and 'CaseId' parameter
            const urlParams = new URLSearchParams(window.location.search);
            const caseId = urlParams.get('CaseId');
            const url = window.location.href;

            if (url.includes('viewCaseDocuments') && caseId !== null) {
                fetchDocumentList();
            }
            
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTDocumentList.init();
});
