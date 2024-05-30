"use strict";

// Class definition
var KTAccountSettingsSigninMethods = function () {
    var signInForm;
    var signInMainEl;
    var signInEditEl;
    var passwordMainEl;
    var passwordEditEl;
    var signInChangeEmail;
    var signInCancelEmail;
    var passwordChange;
    var passwordCancel;

    var toggleChangeEmail = function () {
        signInMainEl.classList.toggle('d-none');
        signInChangeEmail.classList.toggle('d-none');
        signInEditEl.classList.toggle('d-none');
    }

    var toggleChangePassword = function () {
        passwordMainEl.classList.toggle('d-none');
        passwordChange.classList.toggle('d-none');
        passwordEditEl.classList.toggle('d-none');
    }

    // Private functions
    var initSettings = function () {
        if (!signInMainEl) {
            return;
        }

        // toggle UI
        signInChangeEmail.querySelector('button').addEventListener('click', function () {
            toggleChangeEmail();
        });



    }

    var handleChangeEmail = function (e) {
        var validation;

        if (!signInForm) {
            return;
        }

        validation = FormValidation.formValidation(
            signInForm,
            {
                fields: {
                    emailaddress: {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            },
                            emailAddress: {
                                message: 'The value is not a valid email address'
                            }
                        }
                    },


                },

                plugins: { //Learn more: https://formvalidation.io/guide/plugins
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        );

        signInForm.querySelector('#kt_signin_changeEmail_submit').addEventListener('click', function (e) {
            e.preventDefault();
            console.log('click');
            //document.querySelector('#kt_signin_cancel').style.display = 'block';
            document.querySelector('#confirmemailpassword').style.display = 'block';
            //document.querySelector('#kt_otp_timer_msg').style.display = 'block';
            document.querySelector('#kt_emailTF_form_submit').style.display = 'block';
            
            var btn = document.querySelector('#kt_signin_submit');
            btn.disabled = true;

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    swal.fire({
                        text: "OTP Sent Sucessfully. Please check your email",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        signInForm.reset();
                        validation.resetForm();
                        // Reset formvalidation --- more info: https://formvalidation.io/guide/api/reset-form/

                    });
                } else {
                    swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    });
                }
            });

        });

    }

    

    var handleType = function () {
        var input1 = signInForm.querySelector("[name=code_1]");
        var input2 = signInForm.querySelector("[name=code_2]");
        var input3 = signInForm.querySelector("[name=code_3]");
        var input4 = signInForm.querySelector("[name=code_4]");
        var input5 = signInForm.querySelector("[name=code_5]");
        var input6 = signInForm.querySelector("[name=code_6]");

        input1.focus();

        input1.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input2.focus();
            }
        });

        input2.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input3.focus();
            }
        });

        input3.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input4.focus();
            }
        });

        input4.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input5.focus();
            }
        });

        input5.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input6.focus();
            }
        });

        input6.addEventListener("keyup", function () {
            if (this.value.length === 1) {
                input6.blur();
            }
        });
        const inputs = document.getElementById("inputs");
        inputs.addEventListener("keyup", function (e) {
            const target = e.target;
            const key = e.key.toLowerCase();

            if (key == "backspace" || key == "delete") {
                target.value = "";
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
                return;
            }
        });
    }

    var handleChangePassword = function (e) {
        var validation;

        // form elements
        var passwordForm = document.getElementById('kt_signin_change_password');

        if (!passwordForm) {
            return;
        }

        validation = FormValidation.formValidation(
            passwordForm,
            {
                fields: {
                    currentpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Current Password is required'
                            }
                        }
                    },

                    newpassword: {
                        validators: {
                            notEmpty: {
                                message: 'New Password is required'
                            }
                        }
                    },

                    confirmpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Confirm Password is required'
                            },
                            identical: {
                                compare: function () {
                                    return passwordForm.querySelector('[name="newpassword"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                },

                plugins: { //Learn more: https://formvalidation.io/guide/plugins
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        );

        passwordForm.querySelector('#kt_password_submit').addEventListener('click', function (e) {
            e.preventDefault();
            console.log('click');

            validation.validate().then(function (status) {
                if (status == 'Valid') {
                    swal.fire({
                        text: "Sent password reset. Please check your email",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        passwordForm.reset();
                        validation.resetForm(); // Reset formvalidation --- more info: https://formvalidation.io/guide/api/reset-form/
                        toggleChangePassword();
                    });
                } else {
                    swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    });
                }
            });
        });
    }

    // Public methods
    return {
        init: function () {
            signInForm = document.getElementById('kt_signin_change_email');
            signInMainEl = document.getElementById('kt_signin_email');
            signInEditEl = document.getElementById('kt_signin_email_edit');
            passwordMainEl = document.getElementById('kt_signin_password');
            passwordEditEl = document.getElementById('kt_signin_password_edit');
            signInChangeEmail = document.getElementById('kt_signin_email_button');
            signInCancelEmail = document.getElementById('kt_signin_cancel');
            passwordChange = document.getElementById('kt_signin_password_button');
            passwordCancel = document.getElementById('kt_password_cancel');

            initSettings();
            handleChangeEmail();
            handleType();
            handleChangePassword();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTAccountSettingsSigninMethods.init();
});
