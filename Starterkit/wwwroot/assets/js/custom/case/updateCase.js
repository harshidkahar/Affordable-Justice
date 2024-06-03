"use strict";

// Class definition
var KTCreateCaseGeneral = function () {
    // Elements
    var form;
    var submitButton;
    var validator;
    var caseDetailData = [];
    var jsonPostData = null;

    $('#yes-proceedings').hide();
    $('#date-commenced').hide();
    $('#ddlCriminalCase').hide();
    $('#ddlOtherCase').hide();
    $('#ddlPersonalStatus').hide();



    var primary_case_type;
    var secondary_case_type;
    var thrid_case_type;
    var any_proceedings;
    var which_court;
    var legal_advice_inferred;
    var current_case_number;
    var date_commenced;
    var previous_case_number;
    var opposition_fullname;
    var opposition_email;
    var opposition_phone;
    var opposition_emiratesId;
    var opposition_passport;
    var case_description;


    // Handle form
    var handleForm = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
       
        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            //location.href = form.getAttribute('data-kt-redirect-url');
            jsonPostData = null;
            //validator.revalidateField('password');
            var status = "Valid";
            //validator.validate().then(function (status) {
            if (status == 'Valid') {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                submitButton.disabled = true;

                // Simulate ajax request
                setTimeout(function () {
                    // Hide loading indication
                    submitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    submitButton.disabled = false;

                    secondary_case_type = form.querySelector('[name="secondary-case-type"]').value;
                    
                    if (secondary_case_type == "CIVIL") {
                        thrid_case_type = form.querySelector('[name="civil-case"]').value;
                    }
                    else if (secondary_case_type == "CRIMINAL") {
                        thrid_case_type = form.querySelector('[name="criminal-case"]').value;
                    }
                    else if (secondary_case_type == "OTHERS") {
                        thrid_case_type = form.querySelector('[name="other-case"]').value;
                    }
                    else if (secondary_case_type == "PERSONAL STATUS") {
                        thrid_case_type = form.querySelector('[name="personal-status-case"]').value;
                    }

                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    jsonPostData = {
                        PrimaryCaseType: form.querySelector('[name="primary-case-type"]').value,
                        SecondaryCaseType: form.querySelector('[name="secondary-case-type"]').value,
                        ThirdCaseType: thrid_case_type,
                        ProceedingYet: form.querySelector('[name="any-proceedings"]').value,
                        DateCommenced: form.querySelector('[name="date_commenced"]').value,
                        PreviousCaseNo: form.querySelector('[name="previous_case_number"]').value,
                        CurrentCaseNo: form.querySelector('[name="current_case_number"]').value,
                        LegalAdviceInferred: form.querySelector('[name="legal-advice-inferred"]').value,
                        whichCourt: form.querySelector('[name="which-court"]').value,
                        opname: form.querySelector('[name="opposition-fullname"]').value,
                        opmail: form.querySelector('[name="opposition-email"]').value,
                        opmob: form.querySelector('[name="opposition-phone"]').value,
                        emrid: form.querySelector('[name="opposition-emiratesId"]').value,
                        passno: form.querySelector('[name="opposition-passport"]').value,
                        cdesc: form.querySelector('[name="case_description"]').value
                    }


                    $.ajax({
                        type: "PUT",
                        url: "Case/EditCase",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(jsonPostData),
                        dataType: "json",
                        success: function (data) {
                            if (data == "done") {
                                Swal.fire({
                                    text: "You have successfully Updated",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        //form.reset();

                                        var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                        if (redirectUrl) {
                                            location.href = redirectUrl;

                                        }
                                    }
                                });
                            }
                            else {
                                Swal.fire({
                                    text: "Sorry, looks like there are some errors detected, please try again.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                            }
                        },
                        error: ''
                    });

                }, 1500);
            } else {
                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
            //});
        });

        // Handle password input

    }


    // Handle form ajax
    var handleFormAjax = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Name is required'
                            }
                        }
                    },
                    'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'The value is not a valid email address',
                            },
                            notEmpty: {
                                message: 'Email address is required'
                            }
                        }
                    },
                    'toc': {
                        validators: {
                            notEmpty: {
                                message: 'You must accept the terms and conditions'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    jsonPostData = {
                        Email: form.querySelector('[name="email"]').value
                    }

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios.post(submitButton.closest('form').getAttribute('action'), new FormData(form)).then(function (response) {
                        if (response) {
                            form.reset();

                            const redirectUrl = form.getAttribute('data-kt-redirect-url');

                            if (redirectUrl) {
                                location.href = redirectUrl;
                            }
                        } else {
                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "Sorry, looks like there are some errors detected, please try again.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }
                    }).catch(function (error) {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }).then(() => {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;
                    });

                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }
    
    var isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    var vlidateProceedings = function (e) {
        $('#yes-proceedings').hide();
        $('#date-commenced').hide(); 
        $('#ddlCriminalCase').hide();
        $('#ddlOtherCase').hide();
        $('#ddlPersonalStatus').hide();
        $('#any-proceedings').change(function () {
            if ($('#any-proceedings').val() == '1')
            {
                $('#yes-proceedings').show();
                $('#date-commenced').show(); 
            } else {
                $('#yes-proceedings').hide();
                $('#date-commenced').hide(); 
            }
        });

        $('#caseType1').change(function () {
            if ($('#caseType1').val() == 'CIVIL') {
                $('#ddlCivilCase').show();
                $('#ddlCriminalCase').hide();
                $('#ddlOtherCase').hide();
                $('#ddlPersonalStatus').hide();
            }
            else if ($('#caseType1').val() == 'CRIMINAL') {
                $('#ddlCivilCase').hide();
                $('#ddlCriminalCase').show();
                $('#ddlOtherCase').hide();
                $('#ddlPersonalStatus').hide();
            }
            else if ($('#caseType1').val() == 'OTHERS') {
                $('#ddlCivilCase').hide();
                $('#ddlCriminalCase').hide();
                $('#ddlOtherCase').show();
                $('#ddlPersonalStatus').hide();
            }
            else if ($('#caseType1').val() == 'PERSONAL STATUS') {
                $('#ddlCivilCase').hide();
                $('#ddlCriminalCase').hide();
                $('#ddlOtherCase').hide();
                $('#ddlPersonalStatus').show();
            }
        })
    };

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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    var renderData = function () {
        if (caseDetailData.length > 0) {
            var caseDetail = caseDetailData[0];

            document.getElementById('ddlCT0').value = caseDetail.PrimaryCaseType || '';
            document.getElementById('caseType1').value = caseDetail.SecondaryCaseType || '';
            if (caseDetail.SecondaryCaseType === "CIVIL") {
                document.querySelector('#ddlCivilCase').style.display = 'block';
                document.querySelector('#ddlCriminalCase').style.display = 'none';
                document.querySelector('#ddlOtherCase').style.display = 'none';
                document.querySelector('#ddlPersonalStatus').style.display = 'none';
                document.querySelector('[name="civil-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "CRIMINAL") {
                document.querySelector('#ddlCriminalCase').style.display = 'block';
                document.querySelector('#ddlCivilCase').style.display = 'none';
                document.querySelector('#ddlOtherCase').style.display = 'none';
                document.querySelector('#ddlPersonalStatus').style.display = 'none';
                document.querySelector('[name="criminal-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "OTHERS") {
                document.querySelector('#ddlOtherCase').style.display = 'block';
                document.querySelector('#ddlCivilCase').style.display = 'none';
                document.querySelector('#ddlCriminalCase').style.display = 'none';
                document.querySelector('#ddlPersonalStatus').style.display = 'none';
                document.querySelector('[name="other-case"]').value = caseDetail.ThirdCaseType || '';
            } else if (caseDetail.SecondaryCaseType === "PERSONAL STATUS") {
                document.querySelector('#ddlPersonalStatus').style.display = 'block';
                document.querySelector('#ddlCivilCase').style.display = 'none';
                document.querySelector('#ddlCriminalCase').style.display = 'none';
                document.querySelector('#ddlOtherCase').style.display = 'none';
                document.querySelector('[name="personal-status-case"]').value = caseDetail.ThirdCaseType || '';
            }
            const proceedingyet = caseDetail.ProceedingYet ? '1' : '2';
            console.log(proceedingyet);
            document.getElementById('any-proceedings').value = caseDetail.ProceedingYet ? '1' : '2';
            if (proceedingyet === '1') {
                document.querySelector('#yes-proceedings').style.display = 'block';

            }
            document.querySelector('[name="which-court"]').value = caseDetail.WhichCourt || '';
            document.querySelector('[name="legal-advice-inferred"]').value = caseDetail.LegalAdviceInferred ? '1' : '2';
            document.getElementById('kt_datepicker_2').value = caseDetail.DateCommenced ? formatDate(caseDetail.DateCommenced) : '';
            document.querySelector('[name="previous_case_number"]').value = caseDetail.PreviousCaseNo || '';
            document.querySelector('[name="current_case_number"]').value = caseDetail.CurrentCaseNo || '';
            document.querySelector('[name="opposition-fullname"]').value = caseDetail.Opname || '';
            document.querySelector('[name="opposition-email"]').value = caseDetail.Opmail || '';
            document.querySelector('[name="opposition-phone"]').value = caseDetail.Opmob || '';
            document.querySelector('[name="opposition-emiratesId"]').value = caseDetail.Emrid || '';
            document.querySelector('[name="opposition-passport"]').value = caseDetail.Passno || '';
            document.querySelector('[name="case_description"]').value = caseDetail.Cdesc || '';
        }
    };

    




    // Public functions
    return {
        // Initialization
        init: function () {
            // Elements
            form = document.querySelector('#kt_modal_create_case');
            submitButton = document.querySelector('#kt_modal_create_case_submit');
            vlidateProceedings();
            if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
                handleFormAjax();
            } else {
                handleForm();
                //fetchCaseDetail();
            }
            // Check if the URL contains 'createCase' and 'CaseId' parameter
            const urlParams = new URLSearchParams(window.location.search);
            const caseId = urlParams.get('CaseId');
            const url = window.location.href;

            if (url.includes('createCase') && caseId !== null) {
                fetchCaseDetail();
            }

        }
    };

    // Init DropzoneJS --- more info:
    // set the dropzone container id
    const id = "#kt_modal_create_project_files_upload";
    const dropzone = document.querySelector(id);

    // set the preview element template
    var previewNode = dropzone.querySelector(".dropzone-item");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var myDropzone = new Dropzone(id, { // Make the whole body a dropzone
        url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        maxFilesize: 1, // Max filesize in MB
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: id + " .dropzone-items", // Define the container to display the previews
        clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
    });

    myDropzone.on("addedfile", function (file) {
        // Hookup the start button
        file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone.enqueueFile(file); };
        const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
        dropzoneItems.forEach(dropzoneItem => {
            dropzoneItem.style.display = '';
        });
        dropzone.querySelector('.dropzone-upload').style.display = "inline-block";
        dropzone.querySelector('.dropzone-remove-all').style.display = "inline-block";
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
        const progressBars = dropzone.querySelectorAll('.progress-bar');
        progressBars.forEach(progressBar => {
            progressBar.style.width = progress + "%";
        });
    });

    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        const progressBars = dropzone.querySelectorAll('.progress-bar');
        progressBars.forEach(progressBar => {
            progressBar.style.opacity = "1";
        });
        // And disable the start button
        file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("complete", function (progress) {
        const progressBars = dropzone.querySelectorAll('.dz-complete');

        setTimeout(function () {
            progressBars.forEach(progressBar => {
                progressBar.querySelector('.progress-bar').style.opacity = "0";
                progressBar.querySelector('.progress').style.opacity = "0";
                progressBar.querySelector('.dropzone-start').style.opacity = "0";
            });
        }, 300);
    });

    // Setup the buttons for all transfers
    dropzone.querySelector(".dropzone-upload").addEventListener('click', function () {
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    });

    // Setup the button for remove all files
    dropzone.querySelector(".dropzone-remove-all").addEventListener('click', function () {
        dropzone.querySelector('.dropzone-upload').style.display = "none";
        dropzone.querySelector('.dropzone-remove-all').style.display = "none";
        myDropzone.removeAllFiles(true);
    });

    // On all files completed upload
    myDropzone.on("queuecomplete", function (progress) {
        const uploadIcons = dropzone.querySelectorAll('.dropzone-upload');
        uploadIcons.forEach(uploadIcon => {
            uploadIcon.style.display = "none";
        });
    });

    // On all files removed
    myDropzone.on("removedfile", function (file) {
        if (myDropzone.files.length < 1) {
            dropzone.querySelector('.dropzone-upload').style.display = "none";
            dropzone.querySelector('.dropzone-remove-all').style.display = "none";
        }
    });
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCreateCaseGeneral.init();
});


//function RegisterUser(jsonPostData) {
//    $.ajax({
//        type: 'GET',
//        dataType: 'json',
//        url: '/Auth/RegisterUser/',
//        data: JSON.stringify(jsonPostData),
//        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//        accepts: 'application/jsonrequest'
//    }).done(function () {
//        alert('Added');
//    });
//}