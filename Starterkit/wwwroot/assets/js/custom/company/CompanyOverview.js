"use strict";

var KTCompanyDetail = function () {
    var companyOverviewData = [];
    var partnerDetailData = [];
    var dependentDetailData = [];
    var visaDetailData = [];

    //Company Detail Section.
    var fetchCompanyDetail = function () {
        $.ajax({
            url: '/Company/GetCompanyOverview',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    companyOverviewData = response.companyOverview;
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
                    text: "Failed to retrieve company overview.",
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
    let patcount = 0;
    const patarea = document.querySelector('#partnerDetail');
    function ptcount() {
        let pcount = ++patcount;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Partner ${pcount}</label>`;
        patarea.appendChild(div);
    }

    const dparea = document.querySelector('#dependentDetail')
    let depcount = 0;
    function Dcount() {
        let ddcount = ++depcount;
        // patnercount++;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Dependent ${ddcount}</label>`;
        dparea.appendChild(div);
    }
    let patnercount = 0;

    let dpcount =0;

    var renderData = function () {
        patarea.innerHTML = "";
        patnercount = companyOverviewData.patnerDetails.length;
        if (patnercount > 0) {
            partnerDetailData = companyOverviewData.patnerDetails;
        }
        dpcount = companyOverviewData.dependentDetails.length;
        dparea.innerHTML = "";

        if (companyOverviewData.DependentVisaReq == true) {
            dependentDetailData = companyOverviewData.dependentDetails;
        }
        if (companyOverviewData.NoOfResidentVisa == true) {
            visaDetailData = companyOverviewData.visaDetails;
        }

        
        if (companyOverviewData != null) {
            var companyoverview = companyOverviewData;

            document.querySelector('#lblApplicationType').textContent = companyoverview.ApplicationType || 'N/A';
            document.querySelector('#lblCompanyType').textContent = companyoverview.CompanyType || 'N/A';

            if (companyoverview.CompanyType === 'FreeZone') {
                document.querySelector('#location').style.display = 'block';
                document.querySelector('#lblLocation').textContent = companyoverview.BusinessLocation || 'N/A';
            }

            document.querySelector('#lblCity').textContent = companyoverview.BusinessCity || 'N/A';
            document.querySelector('#lblBusinessCategory').textContent = companyoverview.BusinessCategory || 'N/A';

            if (companyoverview.BusinessCategory === 'civil-company' || companyoverview.BusinessCategory === 'limited-liability-company' || companyoverview.BusinessCategory === 'limited-partnership' || companyoverview.BusinessCategory === 'public-joint-stock-company' || companyoverview.BusinessCategory === 'private-joint-stock-company' || companyoverview.BusinessCategory === 'gcc-company-branch' || companyoverview.BusinessCategory === 'local-company-branch' || companyoverview.BusinessCategory === 'holding-companies' || companyoverview.BusinessCategory === 'partnership' || companyoverview.BusinessCategory === 'fz-llc' || companyoverview.BusinessCategory === 'fz-co' || companyoverview.BusinessCategory === 'fze')
            {
                document.querySelector('#lblPartnerDetail').style.display = 'block';
                document.querySelector('#partnerDetail').style.display = 'block';

                const patarea = document.querySelector('#partnerDetail');

               
                document.querySelector('#lblPartnerDetail').innerText = `Partner Detail`;
                
                // Check if patnerDetails is an array and has elements
                if (Array.isArray(companyoverview.patnerDetails) && companyoverview.patnerDetails.length > 0) {
                    companyoverview.patnerDetails.forEach((partner, index) => {
                        console.log(`Partner ${index + 1}:`, partner); // Logging partner details for debugging
                        ptcount();

                        // Grouping the fields in input groups and rows with two columns each
                        const inputGroup1 = document.createElement('div');
                        inputGroup1.className = 'row mb-0 mb-xl-6';
                        inputGroup1.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">UAE Residency : </label>
                        <label>${partner.UAEResidenceText}</label>
                    </div>
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Company Manager : </label>
                        <label>${partner.IsCompanyManagerText}</label>
                    </div>
                </div>`;
                        patarea.appendChild(inputGroup1);

                        const inputGroup2 = document.createElement('div');
                        inputGroup2.className = 'row mb-0 mb-xl-6';
                        inputGroup2.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Name : </label>
                        <label>${partner.Name}</label>
                    </div>
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Email Id : </label>
                        <label>${partner.EmailId}</label>
                    </div>
                </div>`;
                        patarea.appendChild(inputGroup2);

                        const inputGroup3 = document.createElement('div');
                        inputGroup3.className = 'row mb-0 mb-xl-6';
                        inputGroup3.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date of Birth : </label>
                        <label>${partner.DateOfBirth}</label>
                    </div>
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Contact No : </label>
                        <label>${partner.CountryCode}-${partner.Phone}</label>
                    </div>
                </div>`;
                        patarea.appendChild(inputGroup3);

                        if (partner.UAEResidenceText === 'yes') {
                            const inputGroup4 = document.createElement('div');
                            inputGroup4.className = 'row mb-0 mb-xl-6';
                            inputGroup4.innerHTML = `
                    <div class="row">
                        <div class="col-lg-6 col-md-12 fv-row">
                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Emirates ID : </label>
                            <label>${partner.EMRId}</label>
                        </div>
                         <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Address : </label>
                        <label>${partner.Address}</label>
                    </div>
                    </div>
                   `;
                            patarea.appendChild(inputGroup4);
                        }

                        if (partner.UAEResidenceText === 'no') {
                            const inputGroup4 = document.createElement('div');
                            inputGroup4.className = 'row mb-0 mb-xl-6';
                            inputGroup4.innerHTML = `
                    <div class="row">
                        <div class="col-lg-6 col-md-12 fv-row">
                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport No : </label>
                            <label>${partner.PassportNo}</label>
                        </div>
                         <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Address : </label>
                        <label>${partner.Address}</label>
                    </div>
                        </div>`;
                            patarea.appendChild(inputGroup4);
                        }

                        const inputGroup5 = document.createElement('div');
                        inputGroup5.className = 'row mb-0 mb-xl-6';
                        inputGroup5.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Country : </label>
                        <label>${partner.Country}</label>
                    </div>
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Nationality : </label>
                        <label>${partner.Nationality}</label>
                    </div>
                    
                </div>`;
                        patarea.appendChild(inputGroup5);

                        const inputGroup6 = document.createElement('div');
                        inputGroup6.className = 'row mb-0 mb-xl-6';
                        inputGroup6.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-12 fv-row">
                        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Ownership : </label>
                        <label>${partner.PatnerOwnership}%</label>
                    </div>
                </div>`;
                        patarea.appendChild(inputGroup6);

                        const divider = document.createElement('div');
                        divider.className = 'mb-3 mt-3';
                        divider.innerHTML = `<hr class="text-gray-600" />`;
                        patarea.appendChild(divider);
                    });
                }
                else {
                    console.log('No partner details available or partner details are not in expected format.');
                }
            
            }

            document.querySelector('#lblResidentVisaReq').textContent = companyoverview.NoOfResidentVisa;

            if (companyoverview.NoOfResidentVisa === 0) {
                document.querySelector('#lblVisaDetail').style.display = 'block';
                document.querySelector('#visaDetail').style.display = 'block';

            document.querySelector('#lblVisaDetail').innerText = `Visa Detail`;
                document.querySelector('#visaDetail').innerHTML = `
                                  <!--begin::Input group-->
                                <div class="row mb-0 mb-xl-6">
                                    <!--begin::Row-->
                                    <div class="row">
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Name : </label>
                                            <label>${companyoverview.visaDetails[0].Name}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date Of Birth : </label>
                                            <label>${companyoverview.visaDetails[0].DateOfBirth}</label>
                                        </div>
                                        <!--end::Col-->
                                    </div>
                                    <!--end::Row-->
                                </div>
                                <!--end::Input group-->              
                                <!--begin::Input group-->
                                <div class="row mb-0 mb-xl-6">
                                    <!--begin::Row-->
                                    <div class="row">
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Emirates Id : </label>
                                            <label>${companyoverview.visaDetails[0].EmiratesId}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Current Address : </label>
                                            <label>${companyoverview.visaDetails[0].CurrentAddress}</label>
                                        </div>
                                        <!--end::Col-->
                                    </div>
                                    <!--end::Row-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-2 mb-xl-6">
                                    <!--begin::Row-->
                                    <div class="row">
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Resident Address : </label>
                                            <label>${companyoverview.visaDetails[0].ResidenceAddress}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Country : </label>
                                            <label>${companyoverview.Country}</label>
                                        </div>
                                        <!--end::Col-->
                                    </div>
                                    <!--end::Row-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-2 mb-xl-6">
                                    <!--begin::Row-->
                                    <div class="row">
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Nationality : </label>
                                            <label>${companyoverview.visaDetails[0].Nationality}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport : </label>
                        <!--begin::Overlay-->
                         <a class="d-block overlay justify-content-end align-items-end" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                     <!--begin::Image-->
                         <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                             style="background-image:url('assets/media/stock/900x600/23.jpg')">
                         </div>
                     <!--end::Image-->
                     <!--begin::Action-->
                         <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                             <i class="bi bi-eye-fill text-white fs-3x"></i>
                         </div>
                     <!--end::Action-->
                         </a>
                     <!--end::Overlay-->
                
                                        </div>
                                        <!--end::Col-->
                                    </div>
                                    <!--end::Row-->
                                </div>
                                <!--end::Input group-->
                                <hr class"mb-3 mt-3 text-gray-600" />
                `;
            }
            document.querySelector('#lblVisaDependent').textContent = companyoverview.dependentVisaReqText || 'N/A';

            if (companyoverview.dependentVisaReqText === 'yes') {

                document.querySelector('#lblDependentDetail').style.display = 'block';
                document.querySelector('#dependentDetail').style.display = 'block';

                document.querySelector('#lblDependentDetail').innerText = `Dependent Detail`;

                const dparea = document.querySelector('#dependentDetail');

                // Check if dependentDetails is an array and has elements
                if (Array.isArray(companyoverview.dependentDetails) && companyoverview.dependentDetails.length > 0) {
                    companyoverview.dependentDetails.forEach((dependent, index) => {
                        console.log(`Dependent ${index + 1}:`, dependent); // Logging dependent details for debugging
                        Dcount(); //document.querySelector('#depdetailslbl').style.display = 'block';

                        // Grouping the fields in input groups and rows with two columns each
                        const inputGroup1 = document.createElement('div');
                        inputGroup1.className = 'row mb-0 mb-xl-6';
                        inputGroup1.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Name : </label>
                    <label>${dependent.dependvisaName}</label>
                </div>
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Email Id : </label>
                    <label>${dependent.dependvisaEmail}</label>
                </div>
            </div>`;
                        dparea.appendChild(inputGroup1);

                        const inputGroup2 = document.createElement('div');
                        inputGroup2.className = 'row mb-0 mb-xl-6';
                        inputGroup2.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date Of Birth : </label>
                    <label>${dependent.dependvisaDOB}</label>
                </div>
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport No : </label>
                    <label>${dependent.dependvisaPasspno}</label>
                </div>
            </div>`;
                        dparea.appendChild(inputGroup2);

                        const inputGroup3 = document.createElement('div');
                        inputGroup3.className = 'row mb-0 mb-xl-6';
                        inputGroup3.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Address : </label>
                    <label>${dependent.dependvisaAddress}</label>
                </div>
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Country : </label>
                    <label>${dependent.dependvisacountry}</label>
                </div>
            </div>`;
                        dparea.appendChild(inputGroup3);

                        const inputGroup4 = document.createElement('div');
                        inputGroup4.className = 'row mb-0 mb-xl-6';
                        inputGroup4.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-12 fv-row">
                    <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Nationality : </label>
                    <label>${dependent.dependvisanationality}</label>
                </div>
                <div class="col-lg-6 col-md-12 fv-row">
                <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport : </label>
                     <!--begin::Overlay-->
                         <a class="d-block overlay justify-content-end align-items-end" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                     <!--begin::Image-->
                         <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                             style="background-image:url('assets/media/stock/900x600/23.jpg')">
                         </div>
                     <!--end::Image-->
                     <!--begin::Action-->
                         <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                             <i class="bi bi-eye-fill text-white fs-3x"></i>
                         </div>
                     <!--end::Action-->
                         </a>
                     <!--end::Overlay-->
                     </div>
                </div>
          `;
                        dparea.appendChild(inputGroup4);

                        const divider = document.createElement('div');
                        divider.className = 'mb-3 mt-3';
                        divider.innerHTML = `<hr class="text-gray-600" />`;
                        dparea.appendChild(divider);
                    });
                } else {
                    console.log('No dependent details available or dependent details are not in expected format.');
                }
            }

            document.querySelector('#lblofficeType').textContent = companyoverview.OfficeType || 'N/A';
            if (companyoverview.OfficeType === 'Others') {
                document.querySelector('#yourOfficeType').style.display = 'block';
                document.querySelector('#lblYourOfficeType').textContent = companyoverview.YourOfficeType || 'N/A';
            }
            document.querySelector('#lblbusinessPlan').textContent = companyoverview.StartBusiness || 'N/A';
            document.querySelector('#lblbusinessName').textContent = companyoverview.BusinessNameText || 'N/A';
            if (companyoverview.BusinessNameText === 'Yes') {
                document.querySelector('#YourBusinessName').style.display = 'block';
                document.querySelector('#lblyourBusinessName').textContent = companyoverview.BusinessNameOption || 'N/A';
            }
            document.querySelector('#lblNeedAssistanceOn').textContent = companyoverview.NeedAssistanceOn || 'N/A';
            document.querySelector('#lblFullName').textContent = `${companyoverview.FirstName || ''} ${companyoverview.LastName || ''}`;
            document.querySelector('#lblEmail').textContent = companyoverview.EmailId || 'N/A';
            document.querySelector('#lblPhone').textContent = `${companyoverview.CountryCode || ''}${companyoverview.Phone || ''}`;
            document.querySelector('#lblResidentAddress').textContent = companyoverview.RAddress || 'N/A';
            document.querySelector('#lblCurrentAddress').textContent = companyoverview.CAddress || 'N/A';
            document.querySelector('#lblCountry').textContent = companyoverview.Country || 'N/A';
            document.querySelector('#lblNationality').textContent = companyoverview.Nationality || 'N/A';
            document.querySelector('#lblpassportUrl').innerHTML = `            <!--begin::Overlay-->
                         <a class="d-block overlay justify-content-end align-items-end" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                     <!--begin::Image-->
                         <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                             style="background-image:url('assets/media/stock/900x600/23.jpg')">
                         </div>
                     <!--end::Image-->
                     <!--begin::Action-->
                         <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                             <i class="bi bi-eye-fill text-white fs-3x"></i>
                         </div>
                     <!--end::Action-->
                         </a>
                     <!--end::Overlay-->
                                     `;
            document.querySelector('#lblpassport').innerHTML =`           <!--begin::Overlay-->
                         <a class="d-block overlay justify-content-end align-items-end" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                     <!--begin::Image-->
                         <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                             style="background-image:url('assets/media/stock/900x600/23.jpg')">
                         </div>
                     <!--end::Image-->
                     <!--begin::Action-->
                         <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                             <i class="bi bi-eye-fill text-white fs-3x"></i>
                         </div>
                     <!--end::Action-->
                         </a>
                     <!--end::Overlay-->
                    `;

           
        /*        overviewstep11Uploadpplbl.innerHTML = `Passport`;
                overviewstep11Uploadpp.innerHTML = ` <!--begin::Overlay-->
                                                        <a class="d-block overlay" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                                                            <!--begin::Image-->
                                                            <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                                                                style="background-image:url('assets/media/stock/900x600/23.jpg')">
                                                            </div>
                                                            <!--end::Image-->

                                                            <!--begin::Action-->
                                                            <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                                                                <i class="bi bi-eye-fill text-white fs-3x"></i>
                                                            </div>
                                                            <!--end::Action-->
                                                        </a>
                                                        <!--end::Overlay-->`;


                overviewstep11UploadPPlbl.innerHTML = `Passport photo`;
                overviewstep11UploadPP.innerHTML = `<!--begin::Overlay-->
                                                    <a class="d-block overlay" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                                                        <!--begin::Image-->
                                                        <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                                                            style="background-image:url('assets/media/stock/900x600/23.jpg')">
                                                        </div>
                                                        <!--end::Image-->

                                                        <!--begin::Action-->
                                                        <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                                                            <i class="bi bi-eye-fill text-white fs-3x"></i>
                                                        </div>
                                                        <!--end::Action-->
                                                    </a>
                                                    <!--end::Overlay-->`;
                personaldet.innerText = "Personal Information";  */

               
                
            

           
        }
    };

    
   
  function formatDateToDDMMYYYY(date) {
        // Get the day, month, and year from the date object
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        let year = date.getFullYear();

        // Pad day and month with leading zeros if necessary
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        // Return the formatted date string
        return `${year}-${month}-${day}`;
    }
  

   return {
        init: function () {
            // Check if the URL contains 'createCase' and 'CaseId' parameter
            const urlParams = new URLSearchParams(window.location.search);
            const compId = urlParams.get('CompId');
            const url = window.location.href;

           if (url.includes('companyOverview') && compId !== null) {
                fetchCompanyDetail();
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTCompanyDetail.init();
});
