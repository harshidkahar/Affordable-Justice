"use strict";

var AdminManager = function () {
    // Function to handle updating an admin record
    var handleUpdateAdmin = function () {
        // Select the update form
        var updateForm = document.querySelector("#kt_account_profile_details_form");

        // Add event listener to form submission
        updateForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Collect form data
            var formData = new FormData(updateForm);

            // Convert form data to an object
            var adminData = {
                id: formData.get("adminId"),
                name: formData.get("fullName"),
                dateOfBirth: formData.get("dateOfBirth"),
                emailId: formData.get("email"),
                phone: formData.get("phone"),
                address: formData.get("address"),
                country: formData.get("country"),
                nationality: formData.get("nationality"),
                username: formData.get("username"),
                password: formData.get("password"),
                isActive: true, // Assuming true for active status, update as needed
                timestamp: new Date().toISOString()
            };

            // Send AJAX request to update admin data
            fetch("UpdateAdmin.aspx/UpdateAdminData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(adminData)
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response
                    if (data.d === "Admin successfully updated.") {
                        Swal.fire({
                            text: "Admin successfully updated!",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(function () {
                            // Optional: Reload the page or navigate to another page after a successful update
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            text: data.d,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        text: "An error occurred while updating admin. Please try again later.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                });
        });
    };

    // Function to handle deleting an admin record
    var handleDeleteAdmin = function () {
        // Select the delete button
        var deleteButtons = document.querySelectorAll("[data-kt-users-table-filter='delete_row']");

        // Add event listeners to delete buttons
        deleteButtons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                // Get the admin ID from the button data attributes
                var adminId = button.getAttribute("data-admin-id");

                // Ask for confirmation before deleting
                Swal.fire({
                    text: "Are you sure you want to delete this admin account?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "Cancel"
                }).then(function (result) {
                    if (result.isConfirmed) {
                        // Send AJAX request to delete admin data
                        fetch("ViewAdmin.aspx/DeleteAdmin", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ adminId: adminId })
                        })
                            .then(response => response.json())
                            .then(data => {
                                // Handle the response
                                if (data.d === "Admin successfully deleted.") {
                                    Swal.fire({
                                        text: "Admin successfully deleted!",
                                        icon: "success",
                                        confirmButtonText: "OK"
                                    }).then(function () {
                                        // Reload the page to reflect the changes
                                        location.reload();
                                    });
                                } else {
                                    Swal.fire({
                                        text: data.d,
                                        icon: "error",
                                        confirmButtonText: "OK"
                                    });
                                }
                            })
                            .catch(error => {
                                Swal.fire({
                                    text: "An error occurred while deleting admin. Please try again later.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            });
                    }
                });
            });
        });
    };

    // Public functions to initialize the script
    return {
        init: function () {
            handleUpdateAdmin();
            handleDeleteAdmin();
        }
    };
}();

// Initialize the AdminManager script when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    AdminManager.init();
});
