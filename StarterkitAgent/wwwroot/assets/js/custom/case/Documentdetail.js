"use strict";

var KTDocDetail = function () {
    var documentDetailData = [];

    var fetchDocDetail = function () {
        $.ajax({
            url: '/Case/GetDocumentDetail',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    documentDetailData = response.documentDetail;
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
                    text: "Failed to retrieve document detail.",
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
        if (documentDetailData.length > 0) {
            var documentDetail = documentDetailData[0];

            document.getElementById('txtDocName').value = documentDetail.DocName || '';

            document.getElementById('txtDocDescription').value = documentDetail.Description || '';

            // Process the document URL
            var url = baseUrl + documentDetail.DocumentUrl.replace(/\\/g, '/');
            var extension = url.substring(url.lastIndexOf('.')).toLowerCase();
            url = url.replace(/\\/g, '/'); // Replace backslashes with forward slashes

            console.log(url);
            console.log(extension);

            // Hide both image and video divs initially
            document.getElementById('doc_img_div').style.visibility = 'hidden';
            document.getElementById('doc_video_div').style.visibility = 'hidden';

            // Update the image and video sources based on the file extension
            if (['.png', '.jpg', '.jpeg'].includes(extension)) {
                document.getElementById('doc_img_div').style.visibility = 'visible';
                document.getElementById('doc_image').src = url;
            } else if (['.mp4', '.mov'].includes(extension)) {
                document.getElementById('doc_video_div').style.visibility = 'visible';
                document.getElementById('videoSource').src = url;
                document.getElementById('videoPlayer').load(); // Ensure the video element loads the new source
            }


           
        }
    };

    return {
        init: function () {
            fetchDocDetail();
            
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTDocDetail.init();
});
