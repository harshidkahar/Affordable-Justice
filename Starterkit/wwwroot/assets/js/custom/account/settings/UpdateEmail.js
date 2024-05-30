"use strict";

// Class definition
var KTUpdateEmail = function () {
    // Elements
    var form;
    var submitButton;
    var resendOtpButton;
    var validator;
    var jsonPostData = null;
    // Handle form
    var handleValidation = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'emailaddress': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                            notEmpty: {
                                message: 'Email address is required'
                            }
                        }
                    }//,
                    //'password': {
                    //    validators: {
                    //        notEmpty: {
                    //            message: 'The password is required'
                    //        }
                    //    }
                    //},
                    //'mobile': {
                    //    validators: {
                    //        regexp: {
                    //            regexp: /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/,
                    //            message: 'The value is not a valid dubai phone number',
                    //        }
                    //    }
                    //}
                    ///^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/g
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );
    }


    //function of Timer in resend OTP.
    var timerInterval;
    function startTimer() {
        var timerMsg = document.getElementById('kt_otp_timer_msg');
        var resendOtpButton = document.getElementById('kt_signin_cancel');
        var timerSpan = document.getElementById('timer');
        var secondsLeft = 30;

        // Show the timer message and disable the resend button
        //timerMsg.style.display = 'block';
        //resendOtpButton.style.display = 'none'; // Hide the resend button
        resendOtpButton.classList.add('disabled');

        // Update the timer every second
        timerInterval = setInterval(function () {
            secondsLeft--;
            timerSpan.textContent = secondsLeft + ' seconds';

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                resendOtpButton.style.display = 'block'; // Show the resend button
                //timerMsg.style.display = 'none'; // Hide the timer message
                resendOtpButton.classList.remove('disabled');
            }
        }, 1000);
    }

    //function of Get OTP
    var handleSubmitDemo = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();

            // Validate form
            validator.validate().then(function (status) {
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
                        jsonPostData = {
                            Email: form.querySelector('[name="emailaddress"]').value
                        }
                        $.ajax({
                            type: "POST",
                            url: "/Auth/ChangeEmailSendOTP/",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(jsonPostData),
                            success: function (data) {
                                if (data == "done") {
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
                                            //unhide the otp field and timer after Otp is send.
                                            //form.querySelector('[name="emailaddress"]').value = "";
                                            document.querySelector('#kt_signin_changeEmail_submit').style.display = 'none';
                                            document.querySelector('#kt_changeEmail_cancel').style.display = 'block';                                         
                                            document.querySelector('#confirmemailpassword').style.display = "block";
                                            document.querySelector('#kt_otp_timer_msg').style.display = "block";
                                            document.querySelector('#kt_emailTF_form_submit').style.display = "block";
                                            document.querySelector('#kt_otp_timer_msg').style.display = "block";
                                            clearInterval(timerInterval); // Clear any existing timer
                                            startTimer();


                                            //form.submit(); // submit form
                                            var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                            if (redirectUrl) {
                                                location.href = redirectUrl;
                                            }
                                        }
                                    });
                                }
                                else if (data == "invalid-Email") {
                                    Swal.fire({
                                        text: "Email already exists... Please enter different e-mail address.",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });
                                    //hide the otp field and timer if email already exist.
                                    document.querySelector('#confirmemailpassword').style.display = "none";
                                    document.querySelector('#kt_otp_timer_msg').style.display = "none";
                                    document.querySelector('#kt_emailTF_form_submit').style.display = "none";

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

                    }, 2000);
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

      
    }

    //function of resend OTP.
    var ResendOtp = function (e) {
        //Resend Otp Button.
        resendOtpButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();

            // Validate form
            validator.validate().then(function (status) {
                if (status == 'Valid') {



                    // Simulate ajax request
                    setTimeout(function () {


                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        jsonPostData = {
                            Email: form.querySelector('[name="emailaddress"]').value
                        }
                        $.ajax({
                            type: "POST",
                            url: "/Auth/ChangeEmailSendOTP/",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(jsonPostData),
                            success: function (data) {
                                if (data == "done") {
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
                                            //form.querySelector('[name="emailaddress"]').value = "";


                                        }
                                    });
                                }
                                else if (data == "invalid-Email") {
                                    Swal.fire({
                                        text: "Email already exists... Please enter different e-mail address.",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
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

                    }, 2000);
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


    }

    //Resend Otp Button Event Listener.
    document.getElementById('kt_signin_cancel').addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
            clearInterval(timerInterval); // Clear any existing timer
            startTimer();
        }
    });

    //Cancel Button Event Listener.
    document.querySelector('#kt_changeEmail_cancel').addEventListener('click', function () {
        //sessionStorage.removeItem('OtpEmail');
        console.log('might removed');
    });


    //unnessescery function.
    var handleSubmitAjax = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();

            // Validate form
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

                            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "You have successfully logged in!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
 
                        } else {
                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "Sorry, the email or password is incorrect, please try again.",
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
            form = document.querySelector('#kt_signin_change_email');
            submitButton = document.querySelector('#kt_signin_changeEmail_submit');
            resendOtpButton = document.querySelector('#kt_signin_cancel');

            handleValidation();

            if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
                handleSubmitAjax(); // use for ajax submit
            } else {
             handleSubmitDemo(); 
            }
            ResendOtp();
           
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUpdateEmail.init();
});
