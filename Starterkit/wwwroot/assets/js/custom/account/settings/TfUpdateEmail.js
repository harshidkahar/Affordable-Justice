"use strict";

// Class Definition
var KTChangeEmailTwoFactor = function() {
    // Elements
    var form;
    var submitButton;
    var otp="";
    var jsonPostData=null;
    // Handle form
    var handleForm = function(e) {        
        // Handle form submit
       const email= document.querySelector('[name="emailaddress"]').value;
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            var validated = true;

            var inputs = [].slice.call(form.querySelectorAll('input[maxlength="1"]'));
            inputs.map(function (input) {
                if (input.value === '' || input.value.length === 0) {
                    validated = false;
                }
            });

            if (validated === true) {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click 
                submitButton.disabled = true;

                // Simulate ajax request
                setTimeout(function() {
                    // Hide loading indication
                    submitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    submitButton.disabled = false;

                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    jsonPostData = {
                        otp: 
                        form.querySelector("[name=code_1]").value+
                        form.querySelector("[name=code_2]").value +
                        form.querySelector("[name=code_3]").value +
                        form.querySelector("[name=code_4]").value +
                        form.querySelector("[name=code_5]").value +
                        form.querySelector("[name=code_6]").value
                    }
                    $.ajax({
                        type: "POST",
                        url: "/Auth/EmailValidateOtp/",
                        url: "Auth/EmailValidateOtp",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(jsonPostData),
                        success: function (data) {
                            if (data == "done") {
                                Swal.fire({
                                    text: "Your Email have been successfully Updated to " + email,
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }

                                })
                                //Toogle of Email code after succesfull update.
                                document.querySelector('#kt_signin_email').classList.toggle('d-none');
                                document.querySelector('#kt_signin_email_edit').classList.toggle('d-none');
                                document.querySelector('#kt_signin_email_button').classList.toggle('d-none');
                                document.querySelector('#kt_changeEmail_cancel').style.display = 'none';  
                                document.querySelector('#confirmemailpassword').style.display = "none";
                                document.querySelector('#kt_otp_timer_msg').style.display = "none";
                                document.querySelector('#kt_emailTF_form_submit').style.display = "none";
                                document.querySelector('#kt_signin_changeEmail_submit').style.display = "block";
                                document.querySelector('[name="emailaddress"]').value = "";
                               }
                            else {
                                Swal.fire({
                                    text: "Please enter valid securtiy code and try again.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                form.querySelector("[name=code_1]").value = "";
                                form.querySelector("[name=code_2]").value = "";
                                form.querySelector("[name=code_3]").value = "";
                                form.querySelector("[name=code_4]").value = "";
                                form.querySelector("[name=code_5]").value = "";
                                form.querySelector("[name=code_6]").value = "";
                            }
                        },
                        error: function (xhr) {
                            Swal.fire({
                                text: "Invalid OTP.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }
                    });
                }, 1000); 
            } else {
                swal.fire({
                    text: "Please enter valid securtiy code and try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                }).then(function () {

                    form.querySelector("[name=code_1]").value = "";
                    form.querySelector("[name=code_2]").value = "";
                    form.querySelector("[name=code_3]").value = "";
                    form.querySelector("[name=code_4]").value = "";
                    form.querySelector("[name=code_5]").value = "";
                    form.querySelector("[name=code_6]").value = "";
                    KTUtil.scrollTop();
                });
            }
        });
    }

    var handleType = function() {
        var input1 = form.querySelector("[name=code_1]");
        var input2 = form.querySelector("[name=code_2]");
        var input3 = form.querySelector("[name=code_3]");
        var input4 = form.querySelector("[name=code_4]");
        var input5 = form.querySelector("[name=code_5]");
        var input6 = form.querySelector("[name=code_6]");

        input1.focus();

        input1.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input2.focus();
            }
        });

        input2.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input3.focus();
            }
        });

        input3.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input4.focus();
            }
        });

        input4.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input5.focus();
            }
        });

        input5.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input6.focus();
            }
        });
        
        input6.addEventListener("keyup", function() {
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

    // Public functions
    return {
        // Initialization
        init: function() {
            form = document.querySelector('#kt_emailTF_form');
            submitButton = document.querySelector('#kt_emailTF_form_submit');

            handleForm();
            handleType();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTChangeEmailTwoFactor.init();
});