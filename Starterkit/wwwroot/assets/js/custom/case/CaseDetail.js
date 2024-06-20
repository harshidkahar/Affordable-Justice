"use strict";

var KTCaseDetail = function () {
    var caseDetailData = [];

    var fetchCaseDetail = function () {
        $.ajax({
            url: '/Case/GetCaseDetail',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    caseDetailData = response.caseDetail;
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
        if (caseDetailData.length > 0) {
            var caseDetail = caseDetailData[0];

            document.getElementById('lblCaseId').textContent = caseDetail.CaseKey || '';
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
            document.getElementById('lblOppPass').textContent = caseDetail.Passno || '';
        }
    };

    return {
        init: function () {
            // Check if the URL contains 'createCase' and 'CaseId' parameter
            const urlParams = new URLSearchParams(window.location.search);
            const caseId = urlParams.get('CaseId');
            const url = window.location.href;

            if (url.includes('caseDetails') && caseId !== null) {
                fetchCaseDetail();
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTCaseDetail.init();
});
