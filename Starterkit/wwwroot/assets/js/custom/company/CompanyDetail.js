"use strict";

var KTCompanyDetail = function () {
    var companyDetailData = [];

    var fetchCompanyDetail = function () {
        $.ajax({
            url: '/Company/GetCompanyDetail',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    companyDetailData = response.companyDetail;
                    renderData();
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
                    text: "Failed to retrieve case detail.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });
    };

    var renderData = function () {
        if (companyDetailData.length > 0) {
            var companyItem = companyDetailData[0];

            // Set the value for the radio button group with the name 'ApplicationType'
            var applicationTypeRadios = document.getElementsByName('create_company_type');
            for (var i = 0; i < applicationTypeRadios.length; i++) {
                if (applicationTypeRadios[i].value === companyItem.ApplicationType) {
                    applicationTypeRadios[i].checked = true;
                    break;
                }
            }

            document.

         /*   document.getElementById('lblCaseId').textContent = caseDetail.CaseKey || '';
            document.getElementById('lblCaseType').textContent = [
                caseDetail.PrimaryCaseType,
                caseDetail.SecondaryCaseType,
                caseDetail.ThirdCaseType
            ].filter(Boolean).join(' ') || '';

            document.getElementById('lblAnyPro').textContent = caseDetail.ProceedingYet || '';
            document.getElementById('lblWhichCourt').textContent = caseDetail.WhichCourt || '';
            document.getElementById('lblAnyLegal').textContent = caseDetail.LegalAdviceInferred || '';
            document.getElementById('lblDateCom').textContent = caseDetail.DateCommenced ? new Date(caseDetail.DateCommenced).toLocaleDateString() : '';
            document.getElementById('lblPreCaseNumber').textContent = caseDetail.PreviousCaseNo || '';
            document.getElementById('lblCurrCaseNumber').textContent = caseDetail.CurrentCaseNo || '';
            document.getElementById('lblOppFullName').textContent = caseDetail.Opname || '';
            document.getElementById('lblOppEmail').textContent = caseDetail.Opmail || '';
            document.getElementById('lblOppPhone').textContent = caseDetail.Opmob || '';
            document.getElementById('lblOppEmiratesId').textContent = caseDetail.Emrid || '';
            document.getElementById('lblOppPass').textContent = caseDetail.Passno || ''; */
        }
    };

    return {
        init: function () {
            // Check if the URL contains 'createCase' and 'CaseId' parameter
            const urlParams = new URLSearchParams(window.location.search);
            const compId = urlParams.get('CompId');
            const url = window.location.href;

            if (url.includes('createCompany') && compId !== null) {
                fetchCompanyDetail();
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTCompanyDetail.init();
});
