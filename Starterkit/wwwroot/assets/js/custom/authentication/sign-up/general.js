"use strict";

// Class definition
var KTSignupGeneral = function () {
    // Elements
    var form;
    var submitButton;
    var validator;
    var jsonPostData = null;
    var passwordMeter;

    // Handle form
    var handleForm = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'first-name': {
                        validators: {
                            notEmpty: {
                                message: 'First Name is required'
                            }
                        }
                    },
                    'last-name': {
                        validators: {
                            notEmpty: {
                                message: 'Last Name is required'
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
                    },
                    'phone': {
                        validators: {
                            notEmpty: {
                                message: 'Phone number is required'
                            }
                        }
                    }
                },
                plugins: {
                    //trigger: new FormValidation.plugins.Trigger({
                    //    event: {
                    //        password: false
                    //    }
                    //}),
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

                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/

                    var redirectUrl = form.getAttribute('data-kt-redirect-url');
                    if (redirectUrl) {
                        //location.href = redirectUrl;
                        jsonPostData = {
                            FirstName: form.querySelector('[name="first-name"]').value,
                            LastName: form.querySelector('[name="last-name"]').value,
                            Email: form.querySelector('[name="email"]').value,
                            ContactNo: form.querySelector('[name="phone"]').value,
                            SponsorId: form.querySelector('[name="ReferralCode"]').value,
                            CountryCode: form.querySelector('[name="country-code"]').value
                        }
                        //RegisterUser(jsonPostData);  
                        var FirstName = form.querySelector('[name="first-name"]').value;
                        var LastName = form.querySelector('[name="last-name"]').value;
                        var Email = form.querySelector('[name="email"]').value;
                        var ContactNo = form.querySelector('[name="phone"]').value;
                        var SponsorId = form.querySelector('[name="ReferralCode"]').value;

                        //$.ajax({
                        //    type: "POST",
                        //    url: "SignUp.aspx/GetData",
                        //    data: JSON.stringify(jsonPostData),
                        //    contentType: "application/json; charset=utf-8",
                        //    dataType: "json",
                        //    success: function (response) {
                        //        alert(response.d);
                        //    },
                        //});  
                        $.ajax({
                            type: "POST",
                            url: "SignUp.aspx/RegisterUser",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(jsonPostData),
                            dataType: "json",
                            success: function (data) {
                                if (data.d == "done") {
                                    Swal.fire({
                                        text: "You have successfully registered!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                            if (result.isConfirmed) {
                                                form.reset();
                                                $.ajax({
                                                    type: "POST",
                                                    url: "SignIn.aspx/SendOTP",
                                                    contentType: "application/json; charset=utf-8",
                                                    data: JSON.stringify(jsonPostData),
                                                    dataType: "json",
                                                    success: function (data) {
                                                        if (data.d == "done") {
                                                            Swal.fire({
                                                                text: "An OTP is send to your email!",
                                                                icon: "success",
                                                                buttonsStyling: false,
                                                                confirmButtonText: "Ok, got it!",
                                                                customClass: {
                                                                    confirmButton: "btn btn-primary"
                                                                }
                                                            }).then(function (result) {
                                                                if (result.isConfirmed) {
                                                                    form.querySelector('[name="email"]').value = "";

                                                                    //form.submit(); // submit form
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
                                                    error: function (xhr) {
                                                        Swal.fire({
                                                            text: "Invalid Email id.",
                                                            icon: "error",
                                                            buttonsStyling: false,
                                                            confirmButtonText: "Ok, got it!",
                                                            customClass: {
                                                                confirmButton: "btn btn-primary"
                                                            }
                                                        });
                                                    }
                                                });

                                                //location.href = "/welcome";
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
                    }
                    //Swal.fire({
                    //    text: "You have successfully registered!",
                    //    icon: "success",
                    //    buttonsStyling: false,
                    //    confirmButtonText: "Ok, got it!",
                    //    customClass: {
                    //        confirmButton: "btn btn-primary"
                    //    }
                    //}).then(function (result) {
                    //    if (result.isConfirmed) {
                    //        form.reset();  // reset form
                    //        //passwordMeter.reset();  // reset password meter
                    //        //form.submit();

                    //        //form.submit(); // submit form

                    //    }
                    //});
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
                }//,
                //plugins: {
                //    trigger: new FormValidation.plugins.Trigger({
                //        event: {
                //            password: false
                //        }
                //    }),
                //    bootstrap: new FormValidation.plugins.Bootstrap5({
                //        rowSelector: '.fv-row',
                //        eleInvalidClass: '',  // comment to enable invalid state icons
                //        eleValidClass: '' // comment to enable valid state icons
                //    })
                //}
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
        //form.querySelector('input[name="password"]').addEventListener('input', function () {
        //    if (this.value.length > 0) {
        //        validator.updateFieldStatus('password', 'NotValidated');
        //    }
        //});
    }


    // Password input validation
    var validatePassword = function () {
        return (passwordMeter.getScore() > 50);
    }

    var isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
                handleFormAjax();
            } else {
                handleForm();
            }
        }
    };

    // Init DropzoneJS --- more info:
    // set the dropzone container id
    const id = "#kt_dropzonejs_example_2";
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
    KTSignupGeneral.init();
});


function RegisterUser(jsonPostData) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Auth/RegisterUser/',
        data: JSON.stringify(jsonPostData),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: 'application/jsonrequest'
    }).done(function () {
        alert('Added');
    });
}