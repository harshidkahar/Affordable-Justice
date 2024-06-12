"use strict";

var KTCompanyDetail = function () {
    var companyDetailData = [];
    var partnerDetailData = [];
    var partnerListData = [];
    var dependentListData = [];
    var dependentDetailData = [];
    var visaDetailData = [];

    //Company Detail Section.
    var fetchCompanyDetail = function () {
        $.ajax({
            url: '/Company/GetCompanyDetail',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    companyDetailData = response.companyDetail;
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
                    text: "Failed to retrieve case detail.",
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
        if (companyDetailData.length > 0) {
            var companyItem = companyDetailData[0];

            // Set the value for the radio button group with the name 'create_company_type'
            var applicationTypeRadios = document.getElementsByName('create_company_type');
            for (var i = 0; i < applicationTypeRadios.length; i++) {
                if (applicationTypeRadios[i].value === companyItem.ApplicationType) {
                    applicationTypeRadios[i].checked = true;
                    break;
                }
            }

            var DependentVisaRadios = document.getElementsByName('visadependent');
            for (var i = 0; i < DependentVisaRadios.length; i++) {
                if (DependentVisaRadios[i].value === companyItem.dependentVisaReqText) {
                    DependentVisaRadios[i].checked = true;
                    break;
                }
            }
            if (companyItem.dependentVisaReqText === 'yes') {
                document.querySelector('#dependentviewtable').style.display = 'block';
                fetchDependent();
                
            }


            var offcietypeRadios = document.getElementsByName('officespace');
            for (var i = 0; i < offcietypeRadios.length; i++) {
                if (offcietypeRadios[i].value === companyItem.OfficeType) {
                    offcietypeRadios[i].checked = true;
                    break;
                }
            }

            var startbusinessRadios = document.getElementsByName('bussplan');
            for (var i = 0; i < startbusinessRadios.length; i++) {
                if (startbusinessRadios[i].value === companyItem.StartBusiness) {
                    startbusinessRadios[i].checked = true;
                    break;
                }
            }

            var businessNameRadios = document.getElementsByName('busmind');
            for (var i = 0; i < businessNameRadios.length; i++) {
                if (businessNameRadios[i].value === companyItem.BusinessNameText) {
                    businessNameRadios[i].checked = true;
                    break;
                }
            }
            if (companyItem.OfficeType === 'Others') {
                document.querySelector('#off_type').style.display = 'block';
                document.querySelector('[name="youroffice"]').value = companyItem.YourOfficeType;
            }
            var businessNameParts = companyItem.BusinessNameOption.split(',');
            var c1 = businessNameParts[0];
            var c2 = businessNameParts[1];
            var c3 = businessNameParts[2];
            console.log(c1);
            console.log(c2);
            console.log(c3);

            if (businessNameRadios[i].value === 'Yes') {
                document.querySelector('#bussiness_name').style.display= 'block';
                document.querySelector('[name="namesOfBusiness"]').value = c1;
                document.querySelector('[name="namesOfBusiness1"]').value = c2;
                document.querySelector('[name="namesOfBusiness2"]').value = c3;
            }

            
            document.querySelector('[name="services"]').value = companyItem.NeedAssistanceOn;
            document.querySelector('[name="fname"]').value = companyItem.FirstName;
            document.querySelector('[name="lname"]').value = companyItem.LastName;
            document.querySelector('[name="email"]').value = companyItem.EmailId;
            document.querySelector('[name="phoneno"]').value = companyItem.Phone;
            document.querySelector('[name="raddress"]').value = companyItem.RAddress;
            document.querySelector('[name="caddress"]').value = companyItem.CAddress;

            const countrycodeSelect = document.querySelector('[name="countrycode1"]');
            countrycodeSelect.value = companyItem.CountryCode;
            $(countrycodeSelect).trigger('change');

            const countrySelect = document.querySelector('[name="country"]');
            countrySelect.value = companyItem.Country;
            $(countrySelect).trigger('change');

            const nationalitySelect = document.querySelector('[name="nationality"]');
            nationalitySelect.value = companyItem.Nationality;
            $(nationalitySelect).trigger('change');

            const companyTypeSelect = document.querySelector('[name="businessactivity"]');
            companyTypeSelect.value = companyItem.CompanyType;
            $(companyTypeSelect).trigger('change');

            let sfZL = companyItem.BusinessCity;
            console.log(sfZL);

            if (companyTypeSelect.value === 'Mainland') {
                
                document.querySelector('#selectstep2').style.display = 'none';
                document.querySelector('#mainlandForm').style.display = 'block';
                document.querySelector('#mainlandDetails').style.display = 'block';
                const citySelect = document.querySelector('[name="mainlandcity"]');
                citySelect.value = companyItem.BusinessCity;
                $(citySelect).trigger('change');

                document.querySelector('#mainlandbussForm').style.display = 'block';
                document.querySelector('#mainlandbussDetails').style.display = 'block';
                document.querySelector('#lblMsgSkip').style.display = 'none';
                document.querySelector('#lblMsgStep4').style.display = 'none';


                const buscateSelect = document.querySelector('[name="mainlandbusscity"]');
                buscateSelect.value = companyItem.BusinessCategory;
                $(buscateSelect).trigger('change');

                if (companyItem.BusinessCategory === 'civil-company' || companyItem.BusinessCategory === 'limited-liability-company' || companyItem.BusinessCategory === 'limited-partnership' || companyItem.BusinessCategory === 'public-joint-stock-company' || companyItem.BusinessCategory === 'private-joint-stock-company' || companyItem.BusinessCategory === 'gcc-company-branch' || companyItem.BusinessCategory === 'local-company-branch' || companyItem.BusinessCategory === 'holding-companies' || companyItem.BusinessCategory === 'partnership')
                { 
                    document.querySelector('#patnerviewtable').style.display = 'block';
                    fetchPartner();
                    document.querySelector('#patnerDETAILSarea').style.display = 'block';
                    
                }

            }

            if (companyTypeSelect.value === 'FreeZone') {

                document.querySelector('#selectstep2').style.display = 'none';
                document.querySelector('#freezoneForm').style.display = 'block';
                document.querySelector('#freezoneDetails').style.display = 'block';
                const citySelect = document.querySelector('[name="fzcity"]');
                citySelect.value = companyItem.BusinessCity;
                $(citySelect).trigger('change');

                document.querySelector('#lblMsgSkip').style.display = 'none';
                document.querySelector('#lblMsgStep4').style.display = 'none';
                document.querySelector('#freezonebussForm').style.display = 'block';
                document.querySelector('#freezonebussDetails').style.display = 'block';
                const buscateSelect = document.querySelector('[name="fzbuscate"]');
                buscateSelect.value = companyItem.BusinessCategory;
                $(buscateSelect).trigger('change');

                if (companyItem.BusinessCategory) {
                    document.querySelector('#patnerviewtable').style.display = 'block';
                    fetchPartner();
                   
                   }


                
                if (sfZL == "Abu Dhabi") {
                    document.querySelector('#ddlAbudiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlAbu"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Dubai") {
                    document.querySelector('#ddlDubaidiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlDubai"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Sharjah") {
                    document.querySelector('#ddlSarjahdiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlSarjah"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Ajman") {
                    document.querySelector('#ddlAjmandiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddAjman"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Ras Al Khaimah (RAK)") {
                    document.querySelector('#ddlRAKdiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlRAK"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Fujairah") {
                    document.querySelector('#ddlFujairahdiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlFujairah"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');

                }
                if (sfZL == "Umm Al Quwain (UAQ)") {
                    document.querySelector('#ddlUAQdiv').style.display = 'block';
                    const buslocationSelect = document.querySelector('[name="ddlUAQ"]');
                    buslocationSelect.value = companyItem.BusinessLocation;
                    $(buslocationSelect).trigger('change');
                }    
            }

                if (companyTypeSelect.value === 'OffShore Company') {

                    document.querySelector('#selectstep2').style.display = 'none';
                    document.querySelector('#offshoreForm').style.display = 'block';
                    document.querySelector('#offshoreDetails').style.display = 'block';
                    const citySelect = document.querySelector('[name="offshoreCity"]');
                    citySelect.value = companyItem.BusinessCity;
                    $(citySelect).trigger('change');
                }
            
                const visaresiSelect = document.querySelector('[name="target_assign"]');
                visaresiSelect.value = companyItem.NoOfResidentVisa;
                $(visaresiSelect).trigger('change');

                visaDetail();

        //OVERVIEW STARTS FROM HERE.
                var overviewstep1 = document.querySelector('#App_type');
                var overviewstep1lbl = document.querySelector('#lblapptype');


                //Step-2 Company Type
                var overviewstep2 = document.querySelector('#Comp_type');
                var overviewstep2lbl = document.querySelector('#lblcomptype');

                //Step-3 Mainland and Freezone City.
                var overviewstep3 = document.querySelector('#City');
                var overviewstep3lbl = document.querySelector('#lblcity');

                //Step-4 Mainland and Freezone Business Category.
                var overviewstep4 = document.querySelector('#Bus_Cate');
                var overviewstep4lbl = document.querySelector('#lblbus_cate');

                //Step-3 Freezone Location.
                //Storing the freezone location in variables.
                let location = '';
                let sfZL1 = document.getElementById("fzcity").value;
                console.log(sfZL1);

                if (sfZL1 == "Abu Dhabi") {
                    const loc = document.querySelector('[name="ddlAbu"]');
                    location = loc.value;
                }
                if (sfZL1 == "Dubai") {
                    const loc = document.querySelector('[name="ddlDubai"]');
                    location = loc.value;
                }
                if (sfZL1 == "Sharjah") {
                    const loc = document.querySelector('[name="ddlSarjah"]');
                    location = loc.value;
                }
                if (sfZL1 == "Ajman") {
                    const loc = document.querySelector('[name="ddAjman"]');
                    location = loc.value;
                }
                if (sfZL1 == "Ras Al Khaimah (RAK)") {
                    const loc = document.querySelector('[name="ddlRAK"]');
                    location = loc.value;
                }
                if (sfZL1 == "Fujairah") {
                    const loc = document.querySelector('[name="ddlFujairah"]');
                    location = loc.value;
                }
                if (sfZL1 == "Umm Al Quwain (UAQ)") {
                    const loc = document.querySelector('[name="ddlUAQ"]');
                    location = loc.value;
                }

                var overviewstep3loca = document.querySelector('#freezloca');
                var overviewstep3localbl = document.querySelector('#freezlocalbl');

                //Step-5 Visa Residence
                var overviewstep5 = document.querySelector('#resi_visa');
                var overviewstep5lbl = document.querySelector('#lblresi_visa');

                //Step-6 Visa Dependent
                var overviewstep6 = document.querySelector('#dep_visa');
                var overviewstep6lbl = document.querySelector('#lbldep_visa');

                //Step-7 Office Type
                var overviewstep7 = document.querySelector('#office_type');
                var overviewstep7lbl = document.querySelector('#lbloffice_type');

                var overviewstep7offtype = document.querySelector('#youroffice_type');
                var overviewstep7offtypelbl = document.querySelector('#lblyouroffice_type');

                //Step-8 Business Plan
                var overviewstep8 = document.querySelector('#bstart_date');
                var overviewstep8lbl = document.querySelector('#lblbstart_date');

                //Step-9 Business Name in Mind
                var overviewstep9 = document.querySelector('#bname_mind');
                var overviewstep9lbl = document.querySelector('#lblbname_mind');

                //Step-9 Business Name if "Yes" then.
                var overviewstep9bname = document.querySelector('#B_name');
                var overviewstep9lblbname = document.querySelector('#lblB_name');

                var overviewstep9bname1 = document.querySelector('#B_name1');
                var overviewstep9lblbname1 = document.querySelector('#lblB_name1');

                var overviewstep9bname2 = document.querySelector('#B_name2');
                var overviewstep9lblbname2 = document.querySelector('#lblB_name2');

                //Step-10 Services Needed
                var overviewstep10 = document.querySelector('#Service');
                var overviewstep10lbl = document.querySelector('#lblService');

                //Step-11 Personal Details.
                var overviewstep11name = document.querySelector('#Personal_det_name');
                var overviewstep11lblname = document.querySelector('#lblPersonal_det_name');

                var overviewstep11email = document.querySelector('#Personal_det_email');
                var overviewstep11lblemail = document.querySelector('#lblPersonal_det_email');

                var overviewstep11phoneno = document.querySelector('#Personal_det_phoneno');
                var overviewstep11lblphoneno = document.querySelector('#lblPersonal_det_phoneno');

                var overviewstep11radd = document.querySelector('#Personal_det_radd');
                var overviewstep11lblradd = document.querySelector('#lblPersonal_det_radd');

                var overviewstep11cadd = document.querySelector('#Personal_det_cadd');
                var overviewstep11lblcadd = document.querySelector('#lblPersonal_det_cadd');

                var overviewstep11country = document.querySelector('#Personal_det_country');
                var overviewstep11lblcountry = document.querySelector('#lblPersonal_det_country');

                var overviewstep11nationality = document.querySelector('#Personal_det_nation');
                var overviewstep11lblnationality = document.querySelector('#lblPersonal_det_nation');

                var overviewstep11Uploadpplbl = document.querySelector('#upl_pass');
                var overviewstep11Uploadpp = document.querySelector('#lblupl_pass');

                var overviewstep11UploadPPlbl = document.querySelector('#passphoto_drop');
                var overviewstep11UploadPP = document.querySelector('#lblpassphoto_drop');

                var personaldet = document.querySelector('#personaldetlbl');
                var patdetail = document.querySelector('#patdetailslbl');

                // Applying INNER HTML TO ALL.

                overviewstep1.innerHTML = ` Application Type:`;
                overviewstep1lbl.innerHTML = `${companyItem.ApplicationType}`;

                overviewstep2.innerHTML = `Company Type:`;
                overviewstep2lbl.innerHTML = `${companyItem.CompanyType}`;
                document.querySelector('#freelocation').style.display = 'none';
                document.querySelector('#frlocation').style.display = 'none';

            if (companyItem.CompanyType === 'Mainland') {
                    document.querySelector('#freelocation').style.display = 'block';
                    overviewstep3.innerHTML = `Business City`;
                    overviewstep3lbl.innerHTML = `${companyItem.BusinessCity}`;
            }
            if (companyItem.CompanyType === 'FreeZone') {
                    document.querySelector('#freelocation').style.display = 'block';
                    overviewstep3.innerHTML = `Business City`;
                    overviewstep3lbl.innerHTML = `${companyItem.BusinessCity}`;
            }
            if (companyItem.CompanyType === 'OffShore Company') {
                    document.querySelector('#freelocation').style.display = 'block';
                    document.querySelector('#frlocation').style.display = 'none';
                    overviewstep3.innerHTML = `Offshore Company`;
                    overviewstep3lbl.innerHTML = `${companyItem.BusinessCity}`;
            }
            if (companyItem.CompanyType === 'Mainland') {
                    document.querySelector('#freelocation').style.display = 'block';
                    overviewstep4.innerHTML = `Business Category`;
                    overviewstep4lbl.innerHTML = `${companyItem.BusinessCategory}`;
            }
            if (companyItem.CompanyType === 'FreeZone') {
                    document.querySelector('#freelocation').style.display = 'block';
                    document.querySelector('#frlocation').style.display = 'block';
                    overviewstep4.innerHTML = `Business Category`;
                    overviewstep4lbl.innerHTML = `${companyItem.BusinessCategory}`;
                    overviewstep3loca.innerHTML = `Business Location:`;
                    overviewstep3localbl.innerHTML = `${companyItem.BusinessLocation}`;
             }

                overviewstep5.innerHTML = `Residency Visa Required:`;
                overviewstep5lbl.innerHTML = `${companyItem.NoOfResidentVisa}`;

                overviewstep6.innerHTML = `Dependents Visa Required:`;
                overviewstep6lbl.innerHTML = `${companyItem.dependentVisaReqText}`;

                overviewstep7.innerHTML = `Office Space:`;
                overviewstep7lbl.innerHTML = `${companyItem.OfficeType}`;

                var OfficeSpace = document.querySelector('[name="officespace"]:checked');
                var OSpace = OfficeSpace ? OfficeSpace.value : '';

                if (companyItem.OfficeType === 'Others') {
                    document.querySelector('#youroffice_typeSection').style.display = 'block';
                    overviewstep7offtype.innerHTML = `Your Office Type`;
                    overviewstep7offtypelbl.innerHTML = `${companyItem.YourOfficeType}`;
                } else {
                    document.querySelector('#off_type').style.display = 'none';
                    document.querySelector('#youroffice_typeSection').style.display = 'none';
                }

                overviewstep8.innerHTML = `Startup Plan`;
                overviewstep8lbl.innerHTML = `${companyItem.StartBusiness}`;

                overviewstep9.innerHTML = `Business Name Available`;
                overviewstep9lbl.innerHTML = `${companyItem.BusinessNameText}`;

                if (companyItem.BusinessNameText === 'Yes') {
                    document.querySelector('#businessSectionNames').style.display = 'block';
                    overviewstep9bname.innerHTML = `Business name 1:`;
                    overviewstep9lblbname.innerHTML = `${c1}`;

                    //form.querySelector('#busname_det_area1').style.display = 'block';
                    overviewstep9bname1.innerHTML = `Business name 2:`;
                    overviewstep9lblbname1.innerHTML = `${c2}`;

                    //form.querySelector('#busname_det_area2').style.display = 'block';
                    overviewstep9bname2.innerHTML = `Business name 3:`;
                    overviewstep9lblbname2.innerHTML = `${c3}`;
                }
                if (companyItem.BusinessNameText === 'No') {
                    form.querySelector('#businessSectionNames').style.display = 'none';
                    //form.querySelector('#busname_det_area1').style.display = 'none';
                    //form.querySelector('#busname_det_area2').style.display = 'none';

                }

                overviewstep10.innerHTML = `Services Needed:`;
                overviewstep10lbl.innerHTML = `${companyItem.NeedAssistanceOn}`;

                personaldet.innerText = "Personal Information";

                overviewstep11name.innerHTML = `Name:`;
                overviewstep11lblname.innerHTML = `${companyItem.FirstName} ${companyItem.LastName}`;

                overviewstep11email.innerHTML = `Email Id:`;
                overviewstep11lblemail.innerHTML = `${companyItem.EmailId}`;

                overviewstep11phoneno.innerHTML = `Contact No:`;
                overviewstep11lblphoneno.innerHTML = `${companyItem.CountryCode}-${companyItem.Phone}`;

                overviewstep11radd.innerHTML = `Residence Address:`;
                overviewstep11lblradd.innerText = `${companyItem.RAddress}`;

                overviewstep11cadd.innerHTML = `Current Address:`;
            overviewstep11lblcadd.innerText = `${companyItem.CAddress}`;

                overviewstep11country.innerHTML = `Country`;
                overviewstep11lblcountry.innerHTML = `${companyItem.Country}`;

                overviewstep11nationality.innerHTML = `Nationality:`;
                overviewstep11lblnationality.innerHTML = `${companyItem.Nationality}`;

                overviewstep11Uploadpplbl.innerHTML = `Passport`;
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
                personaldet.innerText = "Personal Information";

               
                
            

           
        }
    };

    //Residence Visa Section.
    var visaDetail = function () {

        $.ajax({
            url: '/Company/GetvisaDetail',
            type: 'GET',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    visaDetailData = response.visaDetail;
                    visadetailRenderDetail();
                    
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
                    text: "Failed to retrieve visa detail.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });

    }
    function visadetailRenderDetail() {

        if (visaDetailData.length > 0) {
            var visaItem = visaDetailData[0];

            document.querySelector('[name="visaname"]').value = visaItem.Name;
            try {

                let date = new Date(visaItem.DateOfBirth);
                document.getElementById('visaDateOfBirth').value = formatDateToDDMMYYYY(date).toString();
            }
            catch { document.getElementById('visaDateOfBirth').value = ''; }

            document.querySelector('[name="visaemirId"]').value = visaItem.EmiratesId;
            document.querySelector('[name="Cvisaaddress"]').value = visaItem.CurrentAddress;

            document.querySelector('[name="Rvisaaddress"]').value = visaItem.ResidenceAddress;

            const countrySelect = document.querySelector('[name="visacountry"]');
            countrySelect.value = visaItem.Country;
            $(countrySelect).trigger('change');

            const nationalitySelect = document.querySelector('[name="visanationality"]');
            nationalitySelect.value = visaItem.Nationality;
            $(nationalitySelect).trigger('change');

            var visaresidence = document.querySelector('[name="target_assign"]');
            var selected = visaresidence.value;

            const visaarea = document.querySelector('#residenceDETAILSarea');
            //if (selected === '0') {
            document.querySelector('#residenceDETAILSarea').style.display = 'block';
            residencedetailslbl.innerText = `Residence Visa Information`;

            // Build the entire HTML string
            const htmlContent = `
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Name</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.Name}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Date Of Birth</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.DateOfBirth}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Emirates Id</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.EmiratesId}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Current Address</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.CurrentAddress}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Resident Address</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.ResidenceAddress}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Country</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.Country}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Nationality</label>
                <label class="fs-4 fw-bold text-hover-primary">${visaItem.Nationality}</label>
            </div>
            <div class="d-flex mb-4">
                <label class="col-5 fs-5 text-gray-600">Passport</label>
                <a class="d-block overlay" data-fslightbox="lightbox-basic" href="assets/media/stock/900x600/23.jpg">
                    <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded h-lg-100px w-lg-200px"
                         style="background-image:url('assets/media/stock/900x600/23.jpg')">
                    </div>
                    <div class="overlay-layer card-rounded bg-dark bg-opacity-25 shadow w-lg-200px">
                        <i class="bi bi-eye-fill text-white fs-3x"></i>
                    </div>
                </a>
            </div>
            <div class="mb-3 mt-3">
                <hr class="text-gray-600" />
            </div>
        `;

            // Set the HTML content
            visaarea.innerHTML = htmlContent;

            //   }
            //    else {
            //document.querySelector('#residenceDETAILSarea').style.display = 'none';
            //    }


            if (visaItem.VisaKey) {
                updateVisaDetails();
            }
        }

    }

    var updateVisaDetails = function () {

       var VisaDetails = {

            Name: document.querySelector('[name="visaname"]').value,
            DateOfBirth: document.querySelector('[name="visaDateOfBirth"]').value,
            EmiratesId: document.querySelector('[name="visaemirId"]').value,
            CurrentAddress: document.querySelector('[name="Cvisaaddress"]').value,
            ResidenceAddress: document.querySelector('[name="Rvisaaddress"]').value,
            Country: document.querySelector('[name="visacountry"]').value,
            Nationality: document.querySelector('[name="visanationality"]').value,
        };
        console.log(VisaDetails);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateResidenceVisaDetails', // Ensure this URL is correct
            data: JSON.stringify(VisaDetails),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                // Hide loading indication
                // Handle success
                if (response.success) { // .d is used to access the data in the JSON response from ASP.NET WebMethod
                    stepperObj.goNext();
                    console.log('AJAX response:', response);
                    // Show success message
                } else {
                }
            },
            error: function (error) {
                // Show error message
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-light"
                    }
                }).then(function () {
                    KTUtil.scrollTop();
                });
                console.log('AJAX error:', error);
            }
        });
    }

   
    //Partner List Section.
    var fetchPartner = function () {
        $.ajax({
            url: '/Company/PartnerList',
            type: 'GET',
            success: function (response) {
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    partnerListData = response.partnerList;
                    partnerrenderTable();
                   
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
                    text: "Failed to retrieve partner list.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });

    }

    let patnercount = 0;
    const patarea = document.querySelector('#patnerDETAILSarea');
    function ptcount() {
        let pcount = ++patnercount;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Partner ${pcount}</label>`;
        patarea.appendChild(div);
    }

    var filterbusiness_cate = document.querySelector('[name="mainlandbusscity"]');
    var selectedOption1 = filterbusiness_cate.value;

    var filterbusiness_cate1 = document.querySelector('[name="fzbuscate"]');
    var selectedOption2 = filterbusiness_cate1.value;

    var patdetail = document.querySelector('#patdetailslbl');

    function partnerrenderTable() {

        const tableBody = document.querySelector('#kt_datatable_vertical_scroll tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        patdetail.innerText = "";
        patarea.innerHTML = "";
        patnercount=0;

        partnerListData.forEach((partnerItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = partnerItem.Name;
            row.insertCell(1).textContent = partnerItem.PatnerOwnership;
            row.insertCell(2).innerHTML = ` <td>
                            <button type="button" class="btn btn-sm btn-light-primary me-3 edit" id="edit" onclick="partnerDetail(${partnerItem.PartnerKey});">
                                <i class="ki-duotone ki-pencil">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light-danger partnerdelete" id="partnerdelete" onclick="partnerDelete(${partnerItem.PartnerKey});">
                                <i class="ki-duotone ki-trash fs-5">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                    <span class="path5"></span>
                                </i>
                            </button>
                        </td>
                                `;

            //KTMenu.createInstances();
            const editButton = row.querySelector('.edit');
            editButton.addEventListener('click', () => {
                // Add your edit functionality here
                console.log('Edit button clicked for index:', index);
                document.querySelector('#Patnerdetails').style.display = 'block';
                document.querySelector('#addpatner').style.display = 'block';
                partnerDetail(partnerItem.PartnerKey);

            });

            const deleteButton = row.querySelector('.partnerdelete');
            deleteButton.addEventListener('click', () => {
                // Add your edit functionality here
                console.log('parnter delete button clicked for index:', index);
                //document.querySelector('#Patnerdetails').style.display = 'block';
                //document.querySelector('#addpatner').style.display = 'block';
                partnerDelete(partnerItem.PartnerKey);

            });

            function generateId() {
                return Math.random().toString(36).substr(2, 9);
            }

            patdetail.innerText = `Partner Information`;
            document.querySelector('#patnerDETAILSarea').style.display = 'block';
            ptcount();

                const patarea = document.querySelector('#patnerDETAILSarea');
                document.querySelector('#patnerDETAILSarea').style.display = 'block';

                // Patner is residence of UAE or not
                let div1 = document.createElement('div');
                div1.className = 'd-flex mb-4';
                div1.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">UAE Residency</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.UAEResidenceText}</label>`;
                patarea.appendChild(div1);

                // Patner is manager or not
                let div2 = document.createElement('div');
                div2.className = 'd-flex mb-4';
                div2.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Company Manager</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.IsCompanyManagerText}</label>`;
                patarea.appendChild(div2);

                // Patner name
                let div3 = document.createElement('div');
                div3.className = 'd-flex mb-4';
                div3.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Name</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.Name}</label>`;
                patarea.appendChild(div3);

                // Patner email
                let div4 = document.createElement('div');
                div4.className = 'd-flex mb-4';
                div4.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Email Id</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.EmailId}</label>`;
                patarea.appendChild(div4);

                // Patner date of birth
                let div5 = document.createElement('div');
                div5.className = 'd-flex mb-4';
                div5.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Date of Birth</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.DateOfBirth}</label>`;
                patarea.appendChild(div5);

                // Patner contact no
                let div6 = document.createElement('div');
                div6.className = 'd-flex mb-4';
                div6.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Contact No</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.CountryCode}-${partnerItem.Phone}</label>`;
                patarea.appendChild(div6);

                if (partnerItem.UAEResidenceText === 'yes') {
                    // Patner Emirates ID
                    let div7 = document.createElement('div');
                    div7.className = 'd-flex mb-4';
                    div7.innerHTML = `
                <label class="col-5 fs-5 text-gray-600">Emirates ID</label>
                <label class="fs-4 fw-bold text-hover-primary">${partnerItem.EMRId}</label>`;
                    patarea.appendChild(div7);
                }

                if (partnerItem.UAEResidenceText === 'no') {
                    // Patner passport No
                    let div8 = document.createElement('div');
                    div8.className = 'd-flex mb-4';
                    div8.innerHTML = `
                <label class="col-5 fs-5 text-gray-600">Passport No</label>
                <label class="fs-4 fw-bold text-hover-primary">${partnerItem.PassportNo}</label>`;
                    patarea.appendChild(div8);
                }

                // Patner address
                let div9 = document.createElement('div');
                div9.className = 'd-flex mb-4';
                div9.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Address</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.Address}</label>`;
                patarea.appendChild(div9);

                // Patner country
                let div10 = document.createElement('div');
                div10.className = 'd-flex mb-4';
                div10.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Country</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.Country}</label>`;
                patarea.appendChild(div10);

                // Patner nationality
                let div11 = document.createElement('div');
                div11.className = 'd-flex mb-4';
                div11.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Nationality</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.Nationality}</label>`;
                patarea.appendChild(div11);

                // Patner percentage ownership
                let div12 = document.createElement('div');
                div12.className = 'd-flex mb-4';
                div12.innerHTML = `
            <label class="col-5 fs-5 text-gray-600">Ownership</label>
            <label class="fs-4 fw-bold text-hover-primary">${partnerItem.PatnerOwnership}%</label>`;
                patarea.appendChild(div12);

                let div13 = document.createElement('div');
                div13.className = 'mb-3 mt-3';
                div13.innerHTML = `<hr class="text-gray-600" />`;
                patarea.appendChild(div13);

            


        });

        

    }

    //Dependent List Section.
    var fetchDependent = function () {
        $.ajax({
            url: '/Company/DependentList',
            type: 'GET',
            success: function (response) {
                //const result = JSON.parse(response); // Parse the JSON string response
                console.log(response)
                //console.log(result);
                if (response.success) {
                    dependentListData = response.dependentList;
                    dependentrenderTable();
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
                    text: "Failed to retrieve Dependent list.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });

    }

    //Dependent overview function
    const dparea = document.querySelector('#DepDETAIL')
    let dpcount = 0;
    function Dcount() {
        let ddcount = ++dpcount;
        // patnercount++;
        let div = document.createElement('div');
        div.className = 'd-flex mb-3';
        div.innerHTML = `<label class="fw-bold fs-2">Dependent ${ddcount}</label>`;
        dparea.appendChild(div);
    }
    var dependvisa;
    var depdetail = document.querySelector('#dependentlbl');
    dependvisa = document.querySelector('[name="visadependent"]:checked');
    var depdetail = document.querySelector('#dependentlbl');

    function dependentrenderTable() {

        const tableBody = document.querySelector('#kt_datatable_vertical_scroll1 tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        depdetail.innerText="";
        dparea.innerHTML = "";
        dpcount = 0;

        dependentListData.forEach((dependentItem, index) => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = dependentItem.dependvisaName;
            row.insertCell(1).textContent = dependentItem.dependvisaPasspno;
            row.insertCell(2).innerHTML = ` <td>
                            <button type="button" class="btn btn-sm btn-light-primary me-3 edit" id="editdependent" onclick="partnerDetail(${dependentItem.Id});">
                                <i class="ki-duotone ki-pencil">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light-danger dependentdelete" id="dependentdelete" onclick="dependentDelete(${dependentItem.Id});">
                                <i class="ki-duotone ki-trash fs-5">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                    <span class="path5"></span>
                                </i>
                            </button>
                        </td>
                                `;
            const deleteButton = row.querySelector('.dependentdelete');
            deleteButton.addEventListener('click', () => {
                // Add your edit functionality here
                console.log('delete button clicked for index:', index);
                //document.querySelector('#Dependentdetails').style.display = 'block';
                //document.querySelector('#addDependent').style.display = 'block';
                //document.querySelector('#cancelDependent').style.display = 'block';
                dependentDelete(dependentItem.Id);

            });

            const editButton = row.querySelector('.edit');
            editButton.addEventListener('click', () => {
                // Add your edit functionality here
                console.log('Edit button clicked for index:', index);
                document.querySelector('#Dependentdetails').style.display = 'block';
                document.querySelector('#addDependent').style.display = 'block';
                document.querySelector('#cancelDependent').style.display = 'block';
                dependentDetail(dependentItem.Id);

            });

            var dependvisa;
            dependvisa = document.querySelector('[name="visadependent"]:checked');

            depdetail.innerText = "Dependent Information";  //Dependent Detail Label Section.

            const area = document.querySelector('#DepDETAIL');
            function generateId() {
                return 'row-' + Math.random().toString(36).substr(2, 9);    //Generate a unique ID for each row
            }
            var dependvisa = document.querySelector('[name="visadependent"]:checked'); //Dependent Details var declaration.
            var Depvisa = dependvisa ? dependvisa.value : '';

            document.querySelector('#DepDETAIL').style.display = 'block';

            document.querySelector('#DepDETAIL').style.display = 'block';
            Dcount(); //document.querySelector('#depdetailslbl').style.display = 'block';
            const dparea = document.querySelector('#DepDETAIL');

                // Dependent Name
                let div1 = document.createElement('div');
                div1.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div1.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Name</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisaName}</label>`;
                dparea.appendChild(div1);


                // Dependent Email
                let div2 = document.createElement('div');
                div2.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div2.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Email Id</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisaEmail}</label>`;
                dparea.appendChild(div2);


                // Dependent Date of Birth
                let div3 = document.createElement('div');
                div3.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div3.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Date Of Birth</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisaDOB}</label>`;
                dparea.appendChild(div3);


                //Dependent Passport No
                let div4 = document.createElement('div');
                div4.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div4.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Passport No</label> 
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisaPasspno}</label>`;
                dparea.appendChild(div4);


                //Dependent Address
                let div5 = document.createElement('div');
                div5.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div5.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Address</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisaAddress}</label>`;
                dparea.appendChild(div5);


                //Dependent Country
                let div6 = document.createElement('div');
                div6.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div6.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Country</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisacountry}</label>`;
                dparea.appendChild(div6);


                //Dependent Nationality
                let div7 = document.createElement('div');
                div7.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div7.innerHTML = `
                     <label class="col-5 fs-5 text-gray-600">Nationality</label>
                     <label class="fs-4 fw-bold text-hover-primary">${dependentItem.dependvisanationality}</label`;
                dparea.appendChild(div7);


                //Dependent Passport
                let div8 = document.createElement('div');
                div8.className = 'd-flex mb-4'; // Apply d-flex and margin-bottom classes
                div8.innerHTML = `
                 <label class="col-5 fs-5 text-gray-600">Passport</label>
                     <!--begin::Overlay-->
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
                     <!--end::Overlay-->
                     `;
                dparea.appendChild(div8);

                let div9 = document.createElement('div');
                div9.className = 'mb-3 mt-3';
                div9.innerHTML = `<hr class="text-gray-600" />`;
                dparea.appendChild(div9);
           //     document.querySelector('#DepDETAIL').style.display = 'none';
             //   document.querySelector('#DepDETAILS').style.display = 'none';
               // document.querySelector('#depdetailslbl').style.display = 'none';
            


            //KTMenu.createInstances();
        });

    }

    //Dependent Detail Section.
    var dependentDetail = function (dependentKey) {

        var model = { DependentKey: dependentKey };
        $.ajax({
            url: '/Company/GetDependentDetail',
            type: 'GET',
            contentType: 'application/json', // Specify JSON content type
            data: model,
            success: function (response) {
                console.log(response);
                if (response.success) {
                    dependentDetailData = response.dependentDetail;
                    dependentdetailRenderData();
                    //populateDependentForm(window.currentDependent);
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
                    text: "Failed to retrieve dependent detail.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });


    }
    var dependentdetailRenderData = function () {

        if (dependentDetailData.length > 0) {
            var dependentItem = dependentDetailData[0];

            document.querySelector('[name="Dependentvisaname"]').value = dependentItem.dependvisaName;
            document.querySelector('[name="Dependentvisaemail"]').value = dependentItem.dependvisaEmail;
            try {

                let date = new Date(dependentItem.dependvisaDOB);
                document.getElementById('DateOfBirth').value = formatDateToDDMMYYYY(date).toString();
            }
            catch { document.getElementById('DateOfBirth').value = ''; }

            document.querySelector('[name="Dependentvisapasspno"]').value = dependentItem.dependvisaPasspno;
            //document.querySelector('[name="dependvisaDOB"]').value = dependentItem.dependvisaDOB;
            document.querySelector('[name="dependentaddress"]').value = dependentItem.dependvisaAddress;
            
            const countrySelect = document.querySelector('[name="dependentcountry"]');
            countrySelect.value = dependentItem.dependvisacountry;
            $(countrySelect).trigger('change');

            const nationalitySelect = document.querySelector('[name="dependentnationality"]');
            nationalitySelect.value = dependentItem.dependvisanationality;
            $(nationalitySelect).trigger('change');

           
            


        }

    }

    document.querySelector('#addDependent').addEventListener('click', function () {
        console.log('edit dependent clicked');
        if (dependentDetailData.length > 0) {
            var dependentItem = dependentDetailData[0];
            console.log('dependent edit clicked');
            if (dependentItem.Id) {
                updateDependent(dependentItem.Id);
            }
            document.querySelector('#NewDependent').style.display = 'block';
            document.querySelector('#cancelDependent').style.display = 'none';

        }
    });    
    var updateDependent = function (dependentKey) {
        // Assuming you have the dependent data stored in window.currentDependent
        //var dependentData = window.currentDependent;

        // Prepare the data object to be sent to the server
        var model = {
            Id: dependentKey, // Assuming Id is stored in dependentData
            dependvisaName: document.querySelector('[name="Dependentvisaname"]').value,
            dependvisaEmail: document.querySelector('[name="Dependentvisaemail"]').value,
            dependvisaDOB: document.getElementById('DateOfBirth').value,
            dependvisaPasspno: document.querySelector('[name="Dependentvisapasspno"]').value,
            dependvisaAddress: document.querySelector('[name="dependentaddress"]').value,
            dependvisacountry: document.querySelector('[name="dependentcountry"]').value,
            dependvisanationality: document.querySelector('[name="dependentnationality"]').value,
              };

        // Send the data to the server for updating the dependent
        $.ajax({
            url: '/Company/UpdateDependent',
            type: 'PUT',
            contentType: 'application/json', // Specify JSON content type
            data: JSON.stringify(model),
            success: function (data) {
                if (data == "done") {
                    Swal.fire({
                        text: "Dependent Successfully Updated!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {

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
             error: function () {
                // Handle error
                Swal.fire({
                    text: "Failed to update dependent.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });
    }
    var dependentDelete = function (dependentKey) {

        var model = { Id: dependentKey };
        $.ajax({
            url: '/Company/DeleteDependent',
            type: 'DELETE',
            contentType: 'application/json', // Specify JSON content type
            data: JSON.stringify(model),
            success: function (data) {
                if (data.success == true) {
                    Swal.fire({
                        text: "Dependent Successfully Deleted!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            fetchDependent();
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
            }
        });


    }

    //Partner Detail Section.
    var partnerDetail = function (partnerKey) { 
        var model = { PartnerKey: partnerKey };
        $.ajax({
            url: '/Company/GetPartnerDetail',
            type: 'GET',
            contentType: 'application/json', // Specify JSON content type
            data: model,
            success: function (response) {
                console.log(response);
                if (response.success) {
                    partnerDetailData = response.partnerDetail;
                    partnerdetailRenderData();
                   
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
                    text: "Failed to retrieve partner detail.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });

    }
    var partnerdetailRenderData = function () {

        if (partnerDetailData.length > 0) {
            var partnerItem = partnerDetailData[0];

            var UAEResidenceRadios = document.getElementsByName('patner_resiUAE');
            for (var i = 0; i < UAEResidenceRadios.length; i++) {
                if (UAEResidenceRadios[i].value === partnerItem.UAEResidenceText) {
                    UAEResidenceRadios[i].checked = true;
                    break;
                }
            }

            var CompanyManagerRadios = document.getElementsByName('manager_comp');
            for (var i = 0; i < CompanyManagerRadios.length; i++) {
                if (CompanyManagerRadios[i].value === partnerItem.IsCompanyManagerText) {
                    CompanyManagerRadios[i].checked = true;
                    break;
                }
            }

            document.querySelector('[name="patnername"]').value = partnerItem.Name;
            document.querySelector('[name="patneremail"]').value = partnerItem.EmailId;
            document.querySelector('[name="patnerphoneno"]').value = partnerItem.Phone;
            document.querySelector('[name="patneraddress"]').value = partnerItem.Address;
            document.querySelector('[name="patneremiratesID"]').value = partnerItem.EMRId;
            document.querySelector('[name="patnerpassno"]').value = partnerItem.PassportNo;
            document.querySelector('[name="manageBudget"]').value = partnerItem.PatnerOwnership;

            const countrycodeSelect = document.querySelector('[name="country-code"]');
            countrycodeSelect.value = partnerItem.CountryCode;
            $(countrycodeSelect).trigger('change');

            const countrySelect = document.querySelector('[name="patnercountry"]');
            countrySelect.value = partnerItem.Country;
            $(countrySelect).trigger('change');

            const nationalitySelect = document.querySelector('[name="Nationality"]');
            nationalitySelect.value = partnerItem.Nationality;
            $(nationalitySelect).trigger('change');

            try {
                let date = new Date(partnerItem.DateOfBirth);
                document.getElementById('patnerDateOfBirth').value = formatDateToDDMMYYYY(date).toString();
            }
            catch { document.getElementById('patnerDateOfBirth').value = ''; }

           
        }
    }

    document.querySelector('#addpatner').addEventListener('click', function () {
        console.log('edit partner clicked');
        if (partnerDetailData.length > 0) {
            var partnerItem = partnerDetailData[0];

            if (partnerItem.PartnerKey) {
                console.log('edit partner working');
                updatePartner(partnerItem.PartnerKey);
            }
        }
    });

    var updatePartner = function (partnerKey) {
        var patresiUAE = document.querySelector('[name="patner_resiUAE"]:checked');
        var patType = patresiUAE ? patresiUAE.value : '';
        var isPatResiUAE = (patType === 'yes') ? true : (patType === 'no') ? false : null;
        var comptype = document.querySelector('[name="manager_comp"]:checked');
        var cmptype = comptype ? comptype.value : '';
        var isManagerComp = (cmptype === 'yes') ? true : (cmptype === 'no') ? false : null;

        // Assuming you have the dependent data stored in window.currentDependent
        //var dependentData = window.currentDependent;

        // Prepare the data object to be sent to the server
        var model = {
            Id: partnerKey, // Assuming Id is stored in dependentData
            ResidenceUAE: isPatResiUAE,
            CompanyManager: isManagerComp,
            Name: document.querySelector('#patnername').value,
            Email: document.querySelector('[name="patneremail"]').value,
            CountryCode: document.querySelector('[name="country-code"]').value,
            Phone: document.querySelector('[name="patnerphoneno"]').value,
            Dob: document.querySelector('#patnerDateOfBirth').value,
            EmiratesId: document.querySelector('#patneremiratesID').value,
            PassportNo: document.querySelector('[name="patnerpassno"]').value,
            Address: document.querySelector('[name="patneraddress"]').value,
            Country: document.querySelector('[name="patnercountry"]').value,
            Nationality: document.querySelector('[name="Nationality"]').value,
            ManageBudget: document.querySelector('[name="manageBudget"]').value
        };

        // Send the data to the server for updating the dependent
        $.ajax({
            url: '/Company/UpdatePartner',
            type: 'PUT',
            contentType: 'application/json', // Specify JSON content type
            data: JSON.stringify(model),
            success: function (data) {
                if (data == "done") {
                    Swal.fire({
                        text: "Partner Successfully Updated!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                          
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
            error: function () {
                // Handle error
                Swal.fire({
                    text: "Failed to update partner.",
                    icon: "error",
                    buttonsStyling: false,
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });
    }
    var partnerDelete = function (partnerKey) {

        var model = { Id: partnerKey };

        $.ajax({
            url: '/Company/PartnerDelete',
            type: 'DELETE',
            contentType: 'application/json', // Specify JSON content type
            data: JSON.stringify(model),
            success: function (data) {
                if (data.success == true) {
                    Swal.fire({
                        text: "Partner Successfully Deleted!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            fetchPartner();
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
            }
        });


    }

   
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

            if (url.includes('createCompany') && compId !== null) {
                fetchCompanyDetail();
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTCompanyDetail.init();
});
