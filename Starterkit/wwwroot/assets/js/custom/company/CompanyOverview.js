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
    let patnercount = 0;
    const patarea = document.querySelector('#partnerDetail');
    function ptcount() {
        let pcount = ++patnercount;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Partner ${pcount}</label>`;
        patarea.appendChild(div);
    }

    const dparea = document.querySelector('#dependentDetail')
    let dpcount = 0;
    function Dcount() {
        let ddcount = ++dpcount;
        // patnercount++;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Dependent ${ddcount}</label>`;
        dparea.appendChild(div);
    }


    var renderData = function () {
        patarea.innerHTML = "";
        patnercount = companyOverviewData.patnerDetails.length;
        if (patnercount > 0) {
            partnerDetailData = companyOverviewData.patnerDetails;
        }
        if (companyOverviewData.DependentVisaReq == true) {
            dpcount = companyOverviewData
        }
        dpcount = 0;
        dparea.innerHTML = "";

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

                document.querySelector('#lblPartnerDetail').innerText = `Partner Detail`;

                ptcount();
                const patarea = document.querySelector('#partnerDetail');
                
                // Partner is residence of UAE or not
                let div1 = document.createElement('div');
                div1.className = 'col-lg-6 col-md-12 fv-row';
                div1.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">UAE Residency</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.patnerDetails[0].UAEResidenceText}</label>`;
                patarea.appendChild(div1);

                // Partner is manager or not
                let div2 = document.createElement('div');
                div2.className = 'col-lg-6 col-md-12 fv-row';
                div2.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Company Manager</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.IsCompanyManagerText}</label>`;
                patarea.appendChild(div2);

                // Partner name
                let div3 = document.createElement('div');
                div3.className = 'col-lg-6 col-md-12 fv-row';
                div3.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Name</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.Name}</label>`;
                patarea.appendChild(div3);

                // Partner email
                let div4 = document.createElement('div');
                div4.className = 'col-lg-6 col-md-12 fv-row';
                div4.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Email Id</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.EmailId}</label>`;
                patarea.appendChild(div4);

                // Partner date of birth
                let div5 = document.createElement('div');
                div5.className = 'col-lg-6 col-md-12 fv-row';
                div5.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date of Birth</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.DateOfBirth}</label>`;
                patarea.appendChild(div5);

                // Partner contact no
                let div6 = document.createElement('div');
                div6.className = 'col-lg-6 col-md-12 fv-row';
                div6.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Contact No</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.CountryCode}-${companyoverview.Phone}</label>`;
                patarea.appendChild(div6);

                if (companyoverview.UAEResidenceText === 'yes') {
                    // Partner Emirates ID
                    let div7 = document.createElement('div');
                    div7.className = 'col-lg-6 col-md-12 fv-row';
                    div7.innerHTML = `
            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Emirates ID</label>
            <label class="fs-4 fw-bold text-hover-primary">${companyoverview.EMRId}</label>`;
                    patarea.appendChild(div7);
                }

                if (companyoverview.UAEResidenceText === 'no') {
                    // Partner passport No
                    let div8 = document.createElement('div');
                    div8.className = 'col-lg-6 col-md-12 fv-row';
                    div8.innerHTML = `
            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport No</label>
            <label class="fs-4 fw-bold text-hover-primary">${companyoverview.PassportNo}</label>`;
                    patarea.appendChild(div8);
                }

                // Partner address
                let div9 = document.createElement('div');
                div9.className = 'col-lg-6 col-md-12 fv-row';
                div9.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Address</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.Address}</label>`;
                patarea.appendChild(div9);

                // Partner country
                let div10 = document.createElement('div');
                div10.className = 'col-lg-6 col-md-12 fv-row';
                div10.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Country</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.Country}</label>`;
                patarea.appendChild(div10);

                // Partner nationality
                let div11 = document.createElement('div');
                div11.className = 'col-lg-6 col-md-12 fv-row';
                div11.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Nationality</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.Nationality}</label>`;
                patarea.appendChild(div11);

                // Partner percentage ownership
                let div12 = document.createElement('div');
                div12.className = 'col-lg-6 col-md-12 fv-row';
                div12.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Ownership</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.PatnerOwnership}%</label>`;
                patarea.appendChild(div12);

                let div13 = document.createElement('div');
                div13.className = 'mb-3 mt-3';
                div13.innerHTML = `<hr class="text-gray-600" />`;
                patarea.appendChild(div13);
            }

            


            document.querySelector('#lblResidentVisaReq').textContent = companyoverview.NoOfResidentVisa || 'N/A';

            if (companyoverview.NoOfResidentVisa === '0') {
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
                                            <label>${companyoverview.Name}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date Of Birth : </label>
                                            <label>${companyoverview.DateOfBirth}</label>
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
                                            <label>${companyoverview.EmiratesId}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Current Address : </label>
                                            <label>${companyoverview.CurrentAddress}</label>
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
                                            <label>${companyoverview.ResidenceAddress}</label>
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
                                            <label>${companyoverview.Nationality}</label>
                                        </div>
                                        <!--end::Col-->
                                        <!--begin::Col-->
                                        <div class="col-lg-6 col-md-12 fv-row">
                                            <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport : </label>
                                            <label></label>
                                        </div>
                                        <!--end::Col-->
                                    </div>
                                    <!--end::Row-->
                                </div>
                                <!--end::Input group-->
                `;
            }

            document.querySelector('#lblVisaDependent').textContent = companyoverview.dependentVisaReqText || 'N/A';

            if (companyoverview.dependentVisaReqText === 'no') {

                document.querySelector('#lblDependentDetail').style.display = 'block';
                document.querySelector('#dependentDetail').style.display = 'block';

                document.querySelector('#lblDependentDetail').innerText = `Dependent Detail`;

                Dcount(); //document.querySelector('#depdetailslbl').style.display = 'block';
                const dparea = document.querySelector('#dependentDetail');

                // Dependent Name
                let div1 = document.createElement('div');
                div1.className = 'col-lg-6 col-md-12 fv-row';
                div1.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Name</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaName}</label>`;
                dparea.appendChild(div1);

                // Dependent Email
                let div2 = document.createElement('div');
                div2.className = 'col-lg-6 col-md-12 fv-row';
                div2.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Email Id</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaEmail}</label>`;
                dparea.appendChild(div2);

                // Dependent Date of Birth
                let div3 = document.createElement('div');
                div3.className = 'col-lg-6 col-md-12 fv-row';
                div3.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Date Of Birth</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaDOB}</label>`;
                dparea.appendChild(div3);

                // Dependent Passport No
                let div4 = document.createElement('div');
                div4.className = 'col-lg-6 col-md-12 fv-row';
                div4.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Passport No</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaPassport}</label>`;
                dparea.appendChild(div4);

                // Dependent Emirates ID
                let div5 = document.createElement('div');
                div5.className = 'col-lg-6 col-md-12 fv-row';
                div5.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Emirates ID</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaEMRId}</label>`;
                dparea.appendChild(div5);

               
                //
                // Dependent Nationality
                let div6 = document.createElement('div');
                div6.className = 'col-lg-6 col-md-12 fv-row';
                div6.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Nationality</label>
        <label class="fs-4 fw-bold text-hover-primary">${companyoverview.dependvisaNationality}</label>`;
                dparea.appendChild(div6);

                let div7 = document.createElement('div');
                div7.className = 'col-lg-6 col-md-12 fv-row';
                div7.innerHTML = `
        <label class="col-lg-4 col-md-4 col-form-label fw-bold fs-6">Visa Expiry Date</label>
        <label class="fs-4 fw-bold text-hover-primary"></label>`;
                dparea.appendChild(div7);


            }

            document.querySelector('#lblofficeType').textContent = companyoverview.OfficeType || 'N/A';
            document.querySelector('#lblYourOfficeType').textContent = companyoverview.YourOfficeType || 'N/A';
            document.querySelector('#lblbusinessPlan').textContent = companyoverview.StartBusiness || 'N/A';
            document.querySelector('#lblbusinessName').textContent = companyoverview.BusinessNameText || 'N/A';
            document.querySelector('#lblyourBusinessName').textContent = companyoverview.BusinessNameOption || 'N/A';
            document.querySelector('#lblNeedAssistanceOn').textContent = companyoverview.NeedAssistanceOn || 'N/A';
            document.querySelector('#lblFullName').textContent = `${companyoverview.FirstName || ''} ${companyoverview.LastName || ''}`;
            document.querySelector('#lblEmail').textContent = companyoverview.EmailId || 'N/A';
            document.querySelector('#lblPhone').textContent = `${companyoverview.CountryCode || ''}${companyoverview.Phone || ''}`;
            document.querySelector('#lblResidentAddress').textContent = companyoverview.RAddress || 'N/A';
            document.querySelector('#lblCurrentAddress').textContent = companyoverview.CAddress || 'N/A';
            document.querySelector('#lblCountry').textContent = companyoverview.Country || 'N/A';
            document.querySelector('#lblNationality').textContent = companyoverview.Nationality || 'N/A';

           
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
