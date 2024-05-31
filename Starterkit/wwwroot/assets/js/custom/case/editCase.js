"use strict";

var KTCaseDetail = function () {
    var caseDetailData = [];

    var fetchCaseDetail = function () {
        $.ajax({
            url: '/Case/EditCase',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    caseDetailData = response.caseDetail;
                    renderData();
                    $('[data-control="select2"]').select2();
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

            document.getElementById('ddlCT0').value = caseDetail.PrimaryCaseType || '';
            document.getElementById('caseType1').value = caseDetail.SecondaryCaseType || '';

            if (caseDetail.SecondaryCaseType === "CIVIL") {
                document.querySelector('[name="civil-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "CRIMINAL") {
                document.querySelector('[name="criminal-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "OTHERS") {
                document.querySelector('[name="other-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "PERSONAL STATUS") {
                document.querySelector('[name="personal-status-case"]').value = caseDetail.ThirdCaseType || '';
            }

            document.getElementById('any-proceedings').value = caseDetail.ProceedingYet ? '1' : '2';
            document.querySelector('[name="which-court"]').value = caseDetail.WhichCourt || '';
            document.querySelector('[name="legal-advice-inferred"]').value = caseDetail.LegalAdviceInferred ? '1' : '2';
            document.getElementById('kt_datepicker_2').value = caseDetail.DateCommenced ? new Date(caseDetail.DateCommenced).toISOString().split('T')[0] : '';
            document.querySelector('[name="previous_case_number"]').value = caseDetail.PreviousCaseNo || '';
            document.querySelector('[name="current_case_number"]').value = caseDetail.CurrentCaseNo || '';
            document.querySelector('[name="opposition-fullname"]').value = caseDetail.Opname || '';
            document.querySelector('[name="opposition-email"]').value = caseDetail.Opmail || '';
            document.querySelector('[name="opposition-phone"]').value = caseDetail.Opmob || '';
            document.querySelector('[name="opposition-emiratesId"]').value = caseDetail.Emrid || '';
            document.querySelector('[name="opposition-passport"]').value = caseDetail.Passno || '';
        }
    };

    return {
        init: function () {
            fetchCaseDetail();
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTCaseDetail.init();
});
