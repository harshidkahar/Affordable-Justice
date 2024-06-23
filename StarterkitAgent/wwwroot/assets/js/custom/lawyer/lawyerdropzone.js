var myDropzone = new Dropzone("#kt_dropzonejs_example_1", {
    url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
    maxFilesize: 10, // MB
    addRemoveLinks: true,
    accept: function (file, done) {
        if (file.name == "wow.jpg") {
            done("Naha, you don't.");
        } else {
            done();
        }
    }
});



$("#kt_datatable_select").DataTable({
    select: false
});


document.addEventListener("DOMContentLoaded", function () {
    const caseDetailButtons = document.querySelectorAll("[data-kt-element='open']");

    caseDetailButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            const row = this.closest("tr");
            const caseType = row.querySelector("td:nth-child(3)").textContent.trim(); // Get the case type from the third column

            if (caseType === "Civil") {
                const caseModal = document.querySelector('[name="caseModal"]');
                if (caseModal) {
                    caseModal.classList.add('show');
                    caseModal.style.display = 'block';


                }
            } else if (caseType === "Company Setup") {
                const companyModal = document.querySelector('[name="companyModal"]');
                if (companyModal) {
                    companyModal.classList.add('show');
                    companyModal.style.display = 'block';

                }
            }
        });
    });
});
