var myDropzone = new Dropzone("#kt_modal_create_project_files_upload", {
    url: "FileUpload.ashx", // Set the url for your upload script location
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
    maxFilesize: 100, // MB
    addRemoveLinks: true,
    accept: function (file, done) {
        if (file.name == "wow.jpg") {
            done("Naha, you don't.");
        } else {
            done();
            //$.ajax({
            //    type: "POST",
            //    url: "Customer/Create/Case.aspx/CreateCase", 
            //    contentType: "application/json; charset=utf-8",
            //    data: '',
            //    dataType: "json",
            //    success: '',
            //    error: ''
            //});
        }
    }
});