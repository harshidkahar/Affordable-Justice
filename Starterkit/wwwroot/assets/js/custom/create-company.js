"use strict";

// Class definition
var KTCreateAccount = function () {
    // Elements
    var modal;
    var modalEl;

    var stepper;
    var form;
    var formSubmitButton;
    var formContinueButton;
    var formSaveButton;
    let CompId;
    var partnerListData = [];
    var partnerDetailData = [];
    var dependentListData = [];
    var dependentDetailData = [];
    var visaDetailData = [];


    //Company insert and update variable declared.
    var InsertCompanyData = null;
    var VisaDetails = null;
    var updateFormParameter1 = null;
    var updateFormParameter2 = null;
    var updateFormParameter3 = null;
    var updateFormParameter4 = null;
    var updateFormParameter5 = null;
    var updateFormParameter6 = null;
    var updateFormParameter7 = null;
    var updateFormParameter8 = null;
    var updateFormParameter9 = null;
    var updateFormParameter10 = null;
    var updateFormParameter11 = null;


    // Variables
    var stepperObj;
    var validations = [];

    // Variable to store the selected radio input value
    let businesscatogory;
    let businessactivity;
    let businessCity;
    let businessLocation;
    let SElectedOwnersValue;
    let targetassign;
    let residence;
    let visadependent;
    let officespace;
    let jurdtype;
    let bussplan;
    let bmind;
    let serv;
    let quote;
    let laststep;

    var jsonPostData = null;
    

    // Private Functions
    var initStepper = function () {
        // Initialize Stepper
        stepperObj = new KTStepper(stepper);

        // Stepper change event
        stepperObj.on('kt.stepper.changed', function (stepper) {
            if (stepperObj.getCurrentStepIndex() === 12) {
                formSubmitButton.classList.remove('d-none');
                formSubmitButton.classList.add('d-inline-block');

                formContinueButton.classList.add('d-none');
            } else if (stepperObj.getCurrentStepIndex() === 13) {
                formSubmitButton.classList.add('d-none');
                formContinueButton.classList.add('d-none');
            } else {
                formSubmitButton.classList.remove('d-inline-block');
                formSubmitButton.classList.remove('d-none');
                formContinueButton.classList.remove('d-none');
            }
        });

        stepperObj.on("kt.stepper.click", function (stepper) {
            console.log('stepper.clicked');
            if (stepper.getClickedStepIndex() == 12) {
                document.querySelector('#save').style.display = 'block';
            } else {
                document.querySelector('#save').style.display = 'none';
            }
            stepper.goTo(stepperObj.getClickedStepIndex());
            KTUtil.scrollTop();
        });

        //Step-4 Patner residence details
        form.querySelector('#UAE_resiyes').addEventListener('change', function () {
            document.querySelector('#patnerPPno').style.display = 'none';
            document.querySelector('#patnerEMRno').style.display = 'block';
        });
        form.querySelector('#UAE_resino').addEventListener('change', function () {
            document.querySelector('#patnerPPno').style.display = 'block';
            document.querySelector('#patnerEMRno').style.display = 'none';
        });

        //Step-6 Dependent Visa Yes or No if Yes then Fill up the details.

        //"yes" Event Listener.
        form.querySelector('#yes').addEventListener('change', function () {
            var dependentvisa = form.querySelector('#yes');
            if (dependentvisa.checked) {
                document.querySelector('#NewDependent').style.display = 'block';
            } else {
                document.querySelector('#NewDependent').style.display = 'none';
            }
            
        });

        //"no" Event Listener.
        form.querySelector('#no').addEventListener('change', function () {
            //console.log('no is clicked');
            document.querySelector('#NewDependent').style.display = 'none';
        });

        //step-6 To add a new dependent.
        form.querySelector('#NewDependent').addEventListener('click', function () {
            console.log('NewDependent is clicked');
            document.querySelector('#Dependentdetails').style.display = 'block';
            document.querySelector('#addDependent').style.display = 'block';
            document.querySelector('#NewDependent').style.display = 'none';
            document.querySelector('#cancelDependent').style.display = 'block';

        });

        //Dependent step-6.
        var addDependent = function () {

            var dependvisa = form.querySelector('[name="visadependent"]:checked');
            var depdetail = document.querySelector('#dependentlbl');
            dependvisa = form.querySelector('[name="visadependent"]:checked');

            var dependvisa = form.querySelector('[name="visadependent"]:checked'); //Dependent Details var declaration.
            var Depvisa = dependvisa ? dependvisa.value : '';
            var dependvisaName = form.querySelector('[name="Dependentvisaname"]').value;
            var dependvisaEmail = form.querySelector('[name="Dependentvisaemail"]').value;
            var dependvisaDOB = form.querySelector('[name="DependentvisaDateOfBirth"]').value;
            var dependvisaPasspno = form.querySelector('[name="Dependentvisapasspno"]').value;
            var dependvisaAddress = form.querySelector('[name="dependentaddress"]').value;
            var dependvisacountry = form.querySelector('[name="dependentcountry"]').value;
            var dependvisanationality = form.querySelector('[name="dependentnationality"]').value;

            var depDetails = null;
            depDetails = {
                dependvisaName: form.querySelector('[name="Dependentvisaname"]').value,
                dependvisaEmail: form.querySelector('[name="Dependentvisaemail"]').value,
                dependvisaDOB: form.querySelector('[name="DependentvisaDateOfBirth"]').value,
                dependvisaPasspno: form.querySelector('[name="Dependentvisapasspno"]').value,
                dependvisaAddress: form.querySelector('[name="dependentaddress"]').value,
                dependvisacountry: form.querySelector('[name="dependentcountry"]').value,
                dependvisanationality: form.querySelector('[name="dependentnationality"]').value,
            };

            dependvisaName = form.querySelector('[name="Dependentvisaname"]').value = '';
            dependvisaEmail = form.querySelector('[name="Dependentvisaemail"]').value = '';
            dependvisaDOB = form.querySelector('[name="DependentvisaDateOfBirth"]').value = '';
            dependvisaPasspno = form.querySelector('[name="Dependentvisapasspno"]').value = '';
            dependvisaAddress = form.querySelector('[name="dependentaddress"]').value = '';
            const countrySelect = form.querySelector('[name="dependentcountry"]');  // Reset Select2 elements
            const nationalitySelect = form.querySelector('[name="dependentnationality"]');
            countrySelect.selectedIndex = 0;  // Resetting the native select elements
            nationalitySelect.selectedIndex = 0;
            if ($(countrySelect).data('select2')) { // If Select2 is used, reset the Select2 elements
                $(countrySelect).val(null).trigger('change');
            }
            if ($(nationalitySelect).data('select2')) {
                $(nationalitySelect).val(null).trigger('change');
            }
            document.querySelector('#dependentviewtable').style.display = 'block';// Show the table if it's not already visible
            document.querySelector('#Dependentdetails').style.display = 'none';
            document.querySelector('#addDependent').style.display = 'none';

            $.ajax({
                type: "POST",
                url: "Company/AddDependent",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(depDetails),
                dataType: "json",
                success: function (data) {
                    if (data == "done") {
                        Swal.fire({
                            text: "Dependent Successfully Added!",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                document.querySelector('#Dependentdetails').style.display = 'none';
                                document.querySelector('#addDependent').style.display = 'none';
                                document.querySelector('#NewDependent').style.display = 'block';
                                document.querySelector('#cancelDependent').style.display = 'none';
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
                },
                error: ''
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
        const dependarea = document.querySelector('#DepDETAIL')
        let dpcount = 0;
        function Dcount() {
            let ddcount = ++dpcount;
            // patnercount++;
            let div = document.createElement('div');
            div.className = 'd-flex mb-3';
            div.innerHTML = `<label class="fw-bold fs-2">Dependent ${ddcount}</label>`;
            dependarea.appendChild(div);
        }
        var dependvisa;
        var depdetail = document.querySelector('#dependentlbl');
        dependvisa = document.querySelector('[name="visadependent"]:checked');

        function dependentrenderTable() {

            const tableBody = document.querySelector('#kt_datatable_vertical_scroll1 tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            dependentListData.forEach((dependentItem, index) => {
                const row = tableBody.insertRow();

                row.insertCell(0).textContent = dependentItem.dependvisaName;
                row.insertCell(1).textContent = dependentItem.dependvisaPasspno;
                row.insertCell(2).innerHTML = ` <td>
                            <button type="button" class="btn btn-sm btn-light-primary me-3 edit" id="editdependent" onclick="partnerDetail(${dependentItem.Id})">
                                <i class="ki-duotone ki-pencil">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light-danger dependentdelete" id="dependentdelete">
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
                var depdetail = document.querySelector('#dependentlbl');
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
                                document.querySelector('#Dependentdetails').style.display = 'none';
                                document.querySelector('#addDependent').style.display = 'none';
                                document.querySelector('#NewDependent').style.display = 'block';
                                document.querySelector('#cancelDependent').style.display = 'none';
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

        document.querySelector('#addDependent').addEventListener('click', function () {
            console.log('edit dependent clicked');

            if (dependentDetailData.length > 0) {
                var dependentItem = dependentDetailData[0];
                console.log('dependent edit clicked');
                if (dependentItem.Id) {
                    updateDependent(dependentItem.Id);
                    console.log('dependent edit clicked');
                }

                document.querySelector('#NewDependent').style.display = 'block';
                document.querySelector('#cancelDependent').style.display = 'none';

            } else {
                addDependent();
            }
        });
        var dependentDelete = function (dependentKey) {

            var model = { Id: dependentKey };
            $.ajax({
                url: '/Company/DeleteDependent',
                type: 'DELETE',
                contentType: 'application/json', // Specify JSON content type
                data: JSON.stringify(model),
                success: function (data) {
                    if (data == "done") {
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
      
        form.querySelector('#cancelDependent').addEventListener('click', function () {

            form.querySelector('[name="Dependentvisaname"]').value = '';
            form.querySelector('[name="Dependentvisaemail"]').value = '';
            form.querySelector('[name="DependentvisaDateOfBirth"]').value = '';
            form.querySelector('[name="Dependentvisapasspno"]').value = '';
            form.querySelector('[name="dependentaddress"]').value = '';
            // Reset Select2 elements
            const countrySelect = form.querySelector('[name="dependentcountry"]');
            const nationalitySelect = form.querySelector('[name="dependentnationality"]');

            // Resetting the native select elements
            countrySelect.selectedIndex = 0;
            nationalitySelect.selectedIndex = 0;

            // If Select2 is used, reset the Select2 elements
            if ($(countrySelect).data('select2')) {
                $(countrySelect).val(null).trigger('change');
            }
            if ($(nationalitySelect).data('select2')) {
                $(nationalitySelect).val(null).trigger('change');
            }
            document.querySelector('#Dependentdetails').style.display = 'none';
            document.querySelector('#addDependent').style.display = 'none';
            document.querySelector('#NewDependent').style.display = 'block';
            document.querySelector('#cancelDependent').style.display = 'none';


        });

        // Step - 9 Business Name handler(Event listener)
        //if yes is selected
        form.querySelector('#bmindyes').addEventListener('change', function () {
            document.querySelector('#bussiness_name').style.display = 'block';
            document.querySelector('#autogenrated_busname').style.display = 'none';
        });

        //if no is selected
        form.querySelector('#bmindno').addEventListener('change', function () {
            document.querySelector('#autogenrated_busname').style.display = 'block';
            document.querySelector('#bussiness_name').style.display = 'none';
        });
                                   
        // Validation before going to next page
        stepperObj.on('kt.stepper.next', function (stepper) {
            console.log('stepper.next');

            /* Step-12 OVERVIEW Variables DECLARED.*/

            //Step-1
            var applicationtype = form.querySelector('[name="create_company_type"]:checked');
            var atype = applicationtype ? applicationtype.value : '';

            //Step-2
            var companyTypeInput = form.querySelector('[name="businessactivity"]').value;

            //Step -3
            var mainlandcity = form.querySelector('[name="mainlandcity"]').value;
            var freezcity = form.querySelector('[name="fzcity"]').value;
            var offshoreCity = form.querySelector('[name="offshoreCity"]').value;
            //var freezloca = form.querySelector('[name="fzlocation"]').value;



            //Step-4
            var mainlbusscate = form.querySelector('[name="mainlandbusscity"]').value;
            var freezbusscate = form.querySelector('[name="fzbuscate"]').value;

            var patresiUAE = form.querySelector('[name="patner_resiUAE"]:checked');
            var patType = patresiUAE ? patresiUAE.value : '';

            var comptype = form.querySelector('[name="manager_comp"]:checked');
            var cmptype = comptype ? comptype.value : '';


            var patname = form.querySelector('#patnername').value;
            var patemail = form.querySelector('input[name="patneremail"]').value;
            var patphone = form.querySelector('input[name="patnerphoneno"]').value;
            var patdob = form.querySelector('#patnerDateOfBirth').value;
            var patemiratesID = form.querySelector('#patneremiratesID').value;
            var pataddress = form.querySelector('textarea[name="patneraddress"]').value;
            var patnationality = form.querySelector('select[name="Nationality"]').value;
            //var patpercent = form.querySelector('[name="manageBudget"]').value;
            // Global variable to store the selected percentage
            let selectedPercentage = 50.0;

            // Get references to the input, display, and button elements
            const dialer = document.querySelector('#percentageDialer');
            //const display = document.querySelector('#percentageDisplay');
            //const alertButton = document.querySelector('#alertButton');
            // Function to update the display based on the input value
            function updateDisplay() {
                // Get the input value as a number
                const percentage = parseFloat(dialer.value);
                // Update the display
                //display.textContent = `${percentage.toFixed(1)}%`;
                // Log the selected percentage to the console
                console.log(`Selected percentage: ${percentage.toFixed(1)}%`);
            }
            // Attach an event listener to update the display when the input value changes
            dialer.addEventListener('input', updateDisplay);

            //Step-5
            var visaresidence = form.querySelector('[name="target_assign"]').value;
            var visaname = form.querySelector('[name="visaname"]').value;
            var visaDOB = form.querySelector('[name="visaDateOfBirth"]').value;
            var visaEmrId = form.querySelector('[name="visaemirId"]').value;
            var CvisaAddress = form.querySelector('[name="Cvisaaddress"]').value;
            var RvisaAddress = form.querySelector('[name="Rvisaaddress"]').value;
            var visacountry = form.querySelector('[name="visacountry"]').value;
            var visanationality = form.querySelector('[name="visanationality"]').value;

            //Step-6
            var dependvisa = form.querySelector('[name="visadependent"]:checked');
            var Depvisa = dependvisa ? dependvisa.value : '';


            /* Declared Variables of Dependent Visa Details Old One Not in use.
            
                        //Form of visa dependent if yes
                        var dependvisaName = form.querySelector('[name="Dependentvisaname"]').value;
                        var dependvisaEmail = form.querySelector('[name="Dependentvisaemail"]').value;
                        var dependvisaDOB = form.querySelector('[name="DependentvisaDateOfBirth"]').value;
                        var dependvisaPasspno = form.querySelector('[name="Dependentvisapasspno"]').value;
                        var dependvisaAddress = form.querySelector('[name="dependentaddress"]').value;
                        var dependvisacountry = form.querySelector('[name="dependentcountry"]').value;
                        var dependvisanationality = form.querySelector('[name="dependentnationality"]').value;
            */

            //Step-7
            var OfficeSpace = form.querySelector('[name="officespace"]:checked');
            var OSpace = OfficeSpace ? OfficeSpace.value : '';
            console.log(OSpace);

            var offtype = form.querySelector('[name="youroffice"]').value;

            //Step-8
            var BussPlan = form.querySelector('[name="bussplan"]:checked');
            var Bplan = BussPlan ? BussPlan.value : '';

            //Step-9
            var busMind = form.querySelector('[name="busmind"]:checked');
            var BMind = busMind ? busMind.value : '';
            console.log(BMind);

            //Insert Business Name
            var busname = form.querySelector('[name="namesOfBusiness"]').value;
            console.log(busname);

            var busname1 = form.querySelector('[name="namesOfBusiness1"]').value;
            console.log(busname1);

            var busname2 = form.querySelector('[name="namesOfBusiness2"]').value;
            console.log(busname2);

            var concatenatedNames = busname + ', ' + busname1 + ', ' + busname2;
            console.log(concatenatedNames);

            //Step-10
            var service = form.querySelector('[name="services"]').value;

            //Step-11
            var FirstName = form.querySelector('[name="fname"]').value;
            var LastName = form.querySelector('[name="lname"]').value;
            var Email = form.querySelector('[name="email"]').value;
            var PhoneNo = form.querySelector('[name="phoneno"]').value;
            var Raddress = form.querySelector('[name="raddress"]').value;
            var Caddress = form.querySelector('[name="caddress"]').value;
            var CountryCode = form.querySelector('[name="countrycode1"]').value;
            var Country = form.querySelector('[name="country"]').value;
            var Nationality = form.querySelector('[name="nationality"]').value;

            /* OVERVIEW STEP 12 HTML LABELS DECLARED AND STORED */

            //Step-1 Application Type
            var overviewstep1 = form.querySelector('#App_type');
            var overviewstep1lbl = form.querySelector('#lblapptype');

            //Step-2 Company Type
            var overviewstep2 = form.querySelector('#Comp_type');
            var overviewstep2lbl = form.querySelector('#lblcomptype');

            //Step-3 Mainland and Freezone City.
            var overviewstep3 = form.querySelector('#City');
            var overviewstep3lbl = form.querySelector('#lblcity');

            //Step-4 Mainland and Freezone Business Category.
            var overviewstep4 = form.querySelector('#Bus_Cate');
            var overviewstep4lbl = form.querySelector('#lblbus_cate');

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
            var overviewstep3loca = form.querySelector('#freezloca');
            var overviewstep3localbl = form.querySelector('#freezlocalbl');

            //Step-5 Visa Residence
            var overviewstep5 = form.querySelector('#resi_visa');
            var overviewstep5lbl = form.querySelector('#lblresi_visa');


            //Step-6 Visa Dependent
            var overviewstep6 = form.querySelector('#dep_visa');
            var overviewstep6lbl = form.querySelector('#lbldep_visa');

            //Step-7 Office Type
            var overviewstep7 = form.querySelector('#office_type');
            var overviewstep7lbl = form.querySelector('#lbloffice_type');

            var overviewstep7offtype = form.querySelector('#youroffice_type');
            var overviewstep7offtypelbl = form.querySelector('#lblyouroffice_type');

            //Step-8 Business Plan
            var overviewstep8 = form.querySelector('#bstart_date');
            var overviewstep8lbl = form.querySelector('#lblbstart_date');

            //Step-9 Business Name in Mind
            var overviewstep9 = form.querySelector('#bname_mind');
            var overviewstep9lbl = form.querySelector('#lblbname_mind');

            //Step-9 Business Name if "Yes" then.
            var overviewstep9bname = form.querySelector('#B_name');
            var overviewstep9lblbname = form.querySelector('#lblB_name');

            var overviewstep9bname1 = form.querySelector('#B_name1');
            var overviewstep9lblbname1 = form.querySelector('#lblB_name1');

            var overviewstep9bname2 = form.querySelector('#B_name2');
            var overviewstep9lblbname2 = form.querySelector('#lblB_name2');

            //Step-10 Services Needed
            var overviewstep10 = form.querySelector('#Service');
            var overviewstep10lbl = form.querySelector('#lblService');

            //Step-11 Personal Details.
            var overviewstep11name = form.querySelector('#Personal_det_name');
            var overviewstep11lblname = form.querySelector('#lblPersonal_det_name');

            var overviewstep11email = form.querySelector('#Personal_det_email');
            var overviewstep11lblemail = form.querySelector('#lblPersonal_det_email');

            var overviewstep11phoneno = form.querySelector('#Personal_det_phoneno');
            var overviewstep11lblphoneno = form.querySelector('#lblPersonal_det_phoneno');

            var overviewstep11radd = form.querySelector('#Personal_det_radd');
            var overviewstep11lblradd = form.querySelector('#lblPersonal_det_radd');

            var overviewstep11cadd = form.querySelector('#Personal_det_cadd');
            var overviewstep11lblcadd = form.querySelector('#lblPersonal_det_cadd');

            var overviewstep11country = form.querySelector('#Personal_det_country');
            var overviewstep11lblcountry = form.querySelector('#lblPersonal_det_country');

            var overviewstep11nationality = form.querySelector('#Personal_det_nation');
            var overviewstep11lblnationality = form.querySelector('#lblPersonal_det_nation');

            var overviewstep11Uploadpplbl = form.querySelector('#upl_pass');
            var overviewstep11Uploadpp = form.querySelector('#lblupl_pass');

            var overviewstep11UploadPPlbl = form.querySelector('#passphoto_drop');
            var overviewstep11UploadPP = form.querySelector('#lblpassphoto_drop');

            var personaldet = form.querySelector('#personaldetlbl');
            var pdetail = form.querySelector('#patdetailslbl');

            // Applying INNER HTML TO ALL.

            overviewstep1.innerHTML = ` Application Type:`;
            overviewstep1lbl.innerHTML = `${atype}`;

            overviewstep2.innerHTML = `Company Type:`;
            overviewstep2lbl.innerHTML = `${companyTypeInput}`;
            document.querySelector('#freelocation').style.display = 'none';
            document.querySelector('#frlocation').style.display = 'none';

            if (companyTypeInput === 'Mainland') {
                document.querySelector('#freelocation').style.display = 'block';
                overviewstep3.innerHTML = `Business City`;
                overviewstep3lbl.innerHTML = `${mainlandcity}`;
            }
            if (companyTypeInput === 'FreeZone') {
                document.querySelector('#freelocation').style.display = 'block';
                overviewstep3.innerHTML = `Business City`;
                overviewstep3lbl.innerHTML = `${freezcity}`;
            }
            if (companyTypeInput === 'OffShore Company') {
                document.querySelector('#freelocation').style.display = 'block';
                document.querySelector('#frlocation').style.display = 'none';
                overviewstep3.innerHTML = `Offshore Company`;
                overviewstep3lbl.innerHTML = `${offshoreCity}`;
            }
            if (companyTypeInput === 'Mainland') {
                document.querySelector('#freelocation').style.display = 'block';
                overviewstep4.innerHTML = `Business Category`;
                overviewstep4lbl.innerHTML = `${mainlbusscate}`;
            }

            if (companyTypeInput === 'FreeZone') {
                document.querySelector('#freelocation').style.display = 'block';
                document.querySelector('#frlocation').style.display = 'block';
                overviewstep4.innerHTML = `Business Category`;
                overviewstep4lbl.innerHTML = `${freezbusscate}`;
                overviewstep3loca.innerHTML = `Business Location:`;
                overviewstep3localbl.innerHTML = `${location}`;
            }


            overviewstep5.innerHTML = `Residency Visa Required:`;
            overviewstep5lbl.innerHTML = `${visaresidence}`;

            overviewstep6.innerHTML = `Dependents Visa Required:`;
            overviewstep6lbl.innerHTML = `${Depvisa}`;

            overviewstep7.innerHTML = `Office Space:`;
            overviewstep7lbl.innerHTML = `${OSpace}`;

            var OfficeSpace = form.querySelector('[name="officespace"]:checked');
            var OSpace = OfficeSpace ? OfficeSpace.value : '';

            if (OSpace === 'Others') {
                document.querySelector('#youroffice_typeSection').style.display = 'block';
                overviewstep7offtype.innerHTML = `Your Office Type`;
                overviewstep7offtypelbl.innerHTML = `${offtype}`;
            } else {
                form.querySelector('#off_type').style.display = 'none';
                document.querySelector('#youroffice_typeSection').style.display = 'none';
            }

            overviewstep8.innerHTML = `Startup Plan`;
            overviewstep8lbl.innerHTML = `${Bplan}`;

            overviewstep9.innerHTML = `Business Name Available`;
            overviewstep9lbl.innerHTML = `${BMind}`;

            if (BMind === 'Yes') {
                form.querySelector('#businessSectionNames').style.display = 'block';
                overviewstep9bname.innerHTML = `Business name 1:`;
                overviewstep9lblbname.innerHTML = `${busname}`;

                //form.querySelector('#busname_det_area1').style.display = 'block';
                overviewstep9bname1.innerHTML = `Business name 2:`;
                overviewstep9lblbname1.innerHTML = `${busname1}`;

                //form.querySelector('#busname_det_area2').style.display = 'block';
                overviewstep9bname2.innerHTML = `Business name 3:`;
                overviewstep9lblbname2.innerHTML = `${busname2}`;
            }
            if (BMind === 'No') {
                form.querySelector('#businessSectionNames').style.display = 'none';
                //form.querySelector('#busname_det_area1').style.display = 'none';
                //form.querySelector('#busname_det_area2').style.display = 'none';

            }

            overviewstep10.innerHTML = `Services Needed:`;
            overviewstep10lbl.innerHTML = `${service}`;

            personaldet.innerText = "Personal Information";

            overviewstep11name.innerHTML = `Name:`;
            overviewstep11lblname.innerHTML = `${FirstName} ${LastName}`;

            overviewstep11email.innerHTML = `Email Id:`;
            overviewstep11lblemail.innerHTML = `${Email}`;

            overviewstep11phoneno.innerHTML = `Contact No:`;
            overviewstep11lblphoneno.innerHTML = `${CountryCode}-${PhoneNo}`;

            overviewstep11radd.innerHTML = `Residence Address:`;
            overviewstep11lblradd.innerText = `${Raddress}`;

            overviewstep11cadd.innerHTML = `Current Address:`;
            overviewstep11lblcadd.innerText = `${Caddress}`;

            overviewstep11country.innerHTML = `Country`;
            overviewstep11lblcountry.innerHTML = `${Country}`;

            overviewstep11nationality.innerHTML = `Nationality:`;
            overviewstep11lblnationality.innerHTML = `${Nationality}`;

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

            var visaresidence = document.querySelector('[name="target_assign"]');
            var selected = visaresidence.value;

  

                
                         // Validate form before change stepper step
                var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step
                if (validator) {
                    validator.validate().then(function (status) {
                        console.log('validated!');

                        if (status == 'Valid') {
                            stepper.goNext();
                            KTUtil.scrollTop();

                            if (stepper.getCurrentStepIndex() == 2) {
                                if (CompId) {
                                    UpdateFormParameter1();
                                }

                            }

                            var companyTypeInput = form.querySelector('[name="businessactivity"]').value;
                            if (stepper.getCurrentStepIndex() == 3) {

                                document.querySelector('#freezoneDetails').style.display = 'none';
                                document.querySelector('#freezoneForm').style.display = 'none';

                                document.querySelector('#mainlandDetails').style.display = 'none';
                                document.querySelector('#mainlandForm').style.display = 'none';

                                document.querySelector('#offshoreForm').style.display = 'none';
                                document.querySelector('#offshoreDetails').style.display = 'none';
                                document.querySelector('#NewPartner').style.display = 'none';

                                if (companyTypeInput) {
                                    if (companyTypeInput === 'Mainland') {
                                        document.querySelector('#mainlandDetails').style.display = 'block';
                                        document.querySelector('#mainlandForm').style.display = 'block';
                                        document.querySelector('#offshoreForm').style.display = 'none';
                                        document.querySelector('#offshoreDetails').style.display = 'none';

                                    }

                                    if (companyTypeInput === 'FreeZone') {
                                        document.querySelector('#freezoneDetails').style.display = 'block';
                                        document.querySelector('#freezoneForm').style.display = 'block';
                                        document.querySelector('#offshoreForm').style.display = 'none';
                                        document.querySelector('#offshoreDetails').style.display = 'none';

                                    }
                                    if (companyTypeInput === 'OffShore Company') {
                                        document.querySelector('#offshoreForm').style.display = 'block';
                                        document.querySelector('#offshoreDetails').style.display = 'block';
                                    }
                                    document.querySelector('#selectstep2').style.display = 'none';
                                }
                                else {
                                    document.querySelector('#selectstep2').style.display = 'block';
                                }
                                if (CompId) {
                                    UpdateFormParameter2();
                                }


                            }
                            if (stepper.getCurrentStepIndex() == 4) {

                                document.querySelector('#mainlandbussDetails').style.display = 'none';
                                document.querySelector('#mainlandbussForm').style.display = 'none';
                                document.querySelector('#freezonebussDetails').style.display = 'none';
                                document.querySelector('#freezonebussForm').style.display = 'none';

                                if (companyTypeInput) {
                                    if (companyTypeInput === 'Mainland') {
                                        businessCity = document.getElementById("mainlandCity").value;
                                        businessLocation = "";
                                        document.querySelector('#mainlandbussDetails').style.display = 'block';
                                        document.querySelector('#mainlandbussForm').style.display = 'block';
                                        document.querySelector('#lblMsgSkip').style.display = 'none';
                                    }
                                    if (companyTypeInput === 'FreeZone') {
                                        businessCity = document.getElementById("fzcity").value;
                                        //businessLocation = form.querySelector('[name="fzlocation"]').value;
                                        document.querySelector('#freezonebussDetails').style.display = 'block';
                                        document.querySelector('#freezonebussForm').style.display = 'block';
                                        document.querySelector('#lblMsgSkip').style.display = 'none';
                                    }
                                    if (companyTypeInput === 'OffShore Company') {
                                        businessCity = document.querySelector('#offshoreCity').value;
                                        document.querySelector('#lblMsgStep4').style.display = 'none';
                                        document.querySelector('#lblMsgSkip').style.display = 'block';
                                    }

                                    if (businessCity) {
                                        document.querySelector('#lblMsgStep4').style.display = 'none';
                                    }
                                    else {
                                        document.querySelector('#lblMsgStep4').style.display = 'block';
                                        var step4Msg = document.getElementById('lblMsgStep4');
                                        step4Msg.innerText = "Plese complete step 3";
                                    }
                                }
                                else {
                                    if (businessCity) {
                                        document.querySelector('#lblMsgStep4').style.display = 'none';
                                    }
                                    else {
                                        document.querySelector('#lblMsgStep4').style.display = 'block';
                                        var step4Msg = document.getElementById('lblMsgStep4');
                                        step4Msg.innerText = "Plese complete step 2 & 3";
                                    }
                                }
                                if (CompId) {
                                    UpdateFormParameter3();
                                } else {
                                    CompanyInsert();
                                }
                            }

                            if (stepper.getCurrentStepIndex() == 5) {
                                UpdateFormParameter4();
                            }
                            let visaresi = document.querySelector('[name="target_assign"]').value;
                            if (stepper.getCurrentStepIndex() == 6) {
                                //let Visa = visaresi.value;
                                console.log('visa', visaresi);
                                if (visaresi === '0') {
                                    VisaDet();
                                    visaDetail();
                                }
                                UpdateFormParameter5();
                            }
                            if (stepper.getCurrentStepIndex() == 7) {
                                UpdateFormParameter6();
                            }
                            if (stepper.getCurrentStepIndex() == 8) {
                                UpdateFormParameter7();
                            }
                            if (stepper.getCurrentStepIndex() == 9) {
                                UpdateFormParameter8();
                            }
                            if (stepper.getCurrentStepIndex() == 10) {
                                UpdateFormParameter9();
                            }
                            if (stepper.getCurrentStepIndex() == 11) {
                                UpdateFormParameter10();
                            }
                            if (stepper.getCurrentStepIndex() == 12) {
                                UpdateFormParameter11();
                                document.querySelector('#save').style.display = 'block';
                            }
                        }
                        else {
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
                        }
                    });
                } else {
                    stepper.goNext();
                    KTUtil.scrollTop();
                }
            });


        //Add partner section.
        var addPartner = function () {

            var patresiUAE = form.querySelector('[name="patner_resiUAE"]:checked');
            var patType = patresiUAE ? patresiUAE.value : '';
            var isPatResiUAE = (patType === 'yes') ? true : (patType === 'no') ? false : null;

            var comptype = form.querySelector('[name="manager_comp"]:checked');
            var cmptype = comptype ? comptype.value : '';
            var isManagerComp = (cmptype === 'yes') ? true : (cmptype === 'no') ? false : null;


            var patname = form.querySelector('#patnername').value;
            var patemail = form.querySelector('input[name="patneremail"]').value;
            var ddlcountrycode = form.querySelector('[name="country-code"]').value;
            var patphone = form.querySelector('input[name="patnerphoneno"]').value;
            var patdob = form.querySelector('#patnerDateOfBirth').value;
            var patemiratesID = form.querySelector('#patneremiratesID').value;
            var patpassno = form.querySelector('input[name="patnerpassno"]').value;
            var pataddress = form.querySelector('textarea[name="patneraddress"]').value;
            var parcountry = form.querySelector('select[name="patnercountry"]').value;
            var patnationality = form.querySelector('select[name="Nationality"]').value;

            var patDetail = null;
            patDetail = {
                ResidenceUAE: isPatResiUAE,
                CompanyManager: isManagerComp,
                Name: form.querySelector('#patnername').value,
                Email: form.querySelector('[name="patneremail"]').value,
                CountryCode: form.querySelector('[name="country-code"]').value,
                Phone: form.querySelector('[name="patnerphoneno"]').value,
                Dob: form.querySelector('#patnerDateOfBirth').value,
                EmiratesId: form.querySelector('#patneremiratesID').value,
                PassportNo: form.querySelector('[name="patnerpassno"]').value,
                Address: form.querySelector('[name="patneraddress"]').value,
                Country: form.querySelector('[name="patnercountry"]').value,
                Nationality: form.querySelector('[name="Nationality"]').value,
                ManageBudget: form.querySelector('[name="manageBudget"]').value
            };

            $.ajax({
                type: "POST",
                url: "Company/AddPartner",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(patDetail),
                dataType: "json",
                success: function (data) {
                    if (data == "done") {
                        Swal.fire({
                            text: "Partner Successfully Added!",
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
                },

            });

            patresiUAE = form.querySelector('[name="patner_resiUAE"]:checked');
            patType = patresiUAE ? patresiUAE.value : '';
            if (patresiUAE !== null) {
                patresiUAE.checked = false;
            }
            comptype = form.querySelector('[name="manager_comp"]:checked');
            cmptype = comptype ? comptype.value : '';
            if (comptype !== null) {
                comptype.checked = false;
            }
            // Clear form fields
            form.querySelector('#patnername').value = '';
            form.querySelector('input[name="patneremail"]').value = '';
            const pddlcountrycode = form.querySelector('[name="country-code"]');
            form.querySelector('input[name="patnerphoneno"]').value = '';
            form.querySelector('#patnerDateOfBirth').value = '';
            form.querySelector('#patneremiratesID').value = '';
            form.querySelector('input[name="patnerpassno"]').value = '';
            form.querySelector('textarea[name="patneraddress"]').value = '';
            const pcountry = form.querySelector('select[name="patnercountry"]');
            const pnationality = form.querySelector('select[name="Nationality"]');
            form.querySelector('[name="manageBudget"]').value = '50.0';

            // Resetting the native select elements
            pcountry.selectedIndex = 0;
            pnationality.selectedIndex = 0;
            pddlcountrycode.selectedIndex = 0;
            // If Select2 is used, reset the Select2 elements
            if ($(pcountry).data('select2')) {
                $(pcountry).val(null).trigger('change');
            }
            if ($(pnationality).data('select2')) {
                $(pnationality).val(null).trigger('change');
            }
            if ($(pddlcountrycode).data('select2')) {
                $(pddlcountrycode).val(null).trigger('change');
            }



            // Show the table if it's not already visible
            document.querySelector('#patnerviewtable').style.display = 'block';
            document.querySelector('#Patnerdetails').style.display = 'none';
            document.querySelector('#addpatner').style.display = 'none';
            document.querySelector('#cancelpartner').style.display = 'none';
            document.querySelector('#NewPartner').style.display = 'block';
            // percent = form.querySelector('[name="manageBudget"]').value = '';



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

            partnerListData.forEach((partnerItem, index) => {
                const row = tableBody.insertRow();

                row.insertCell(0).textContent = partnerItem.Name;
                row.insertCell(1).textContent = partnerItem.PatnerOwnership;
                row.insertCell(2).innerHTML = ` <td>
                            <button type="button" class="btn btn-sm btn-light-primary me-3 edit" id="edit" onclick="partnerDetail(${partnerItem.PartnerKey})">
                                <i class="ki-duotone ki-pencil">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light-danger partnerdelete" id="partnerdelete">
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
                    document.querySelector('#cancelpartner').style.display = 'block';
                    document.querySelector('#NewPartner').style.display = 'none';
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
            else {
                addPartner();

            }
        });

        document.querySelector('#cancelpartner').addEventListener('click', function () {

            patresiUAE = form.querySelector('[name="patner_resiUAE"]:checked');
            patType = patresiUAE ? patresiUAE.value : '';
            if (patresiUAE !== null) {
                patresiUAE.checked = false;
            }
            comptype = form.querySelector('[name="manager_comp"]:checked');
            cmptype = comptype ? comptype.value : '';
            if (comptype !== null) {
                comptype.checked = false;
            }
            // Clear form fields
            form.querySelector('#patnername').value = '';
            form.querySelector('input[name="patneremail"]').value = '';
            const pddlcountrycode = form.querySelector('[name="country-code"]');
            form.querySelector('input[name="patnerphoneno"]').value = '';
            form.querySelector('#patnerDateOfBirth').value = '';
            form.querySelector('#patneremiratesID').value = '';
            form.querySelector('input[name="patnerpassno"]').value = '';
            form.querySelector('textarea[name="patneraddress"]').value = '';
            const pcountry = form.querySelector('select[name="patnercountry"]');
            const pnationality = form.querySelector('select[name="Nationality"]');
            form.querySelector('[name="manageBudget"]').value = '50.0';

            // Resetting the native select elements
            pcountry.selectedIndex = 0;
            pnationality.selectedIndex = 0;
            pddlcountrycode.selectedIndex = 0;
            // If Select2 is used, reset the Select2 elements
            if ($(pcountry).data('select2')) {
                $(pcountry).val(null).trigger('change');
            }
            if ($(pnationality).data('select2')) {
                $(pnationality).val(null).trigger('change');
            }
            if ($(pddlcountrycode).data('select2')) {
                $(pddlcountrycode).val(null).trigger('change');
            }
            // Show the table if it's not already visible
            document.querySelector('#patnerviewtable').style.display = 'block';
            document.querySelector('#Patnerdetails').style.display = 'none';
            document.querySelector('#addpatner').style.display = 'none';
            document.querySelector('#cancelpartner').style.display = 'none';
            document.querySelector('#NewPartner').style.display = 'block';


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
                },
                error: function () {
                    // Handle error
                    Swal.fire({
                        text: "Failed to update partner.",
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
        var partnerDelete = function (partnerKey) {

            var model = { Id: partnerKey };
            $.ajax({
                url: '/Company/PartnerDelete',
                type: 'DELETE',
                contentType: 'application/json', // Specify JSON content type
                data: JSON.stringify(model),
                success: function (data) {
                    if (data == "done") {
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
                    Swal.fire({
                        text: "Failed to delete partner.",
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


                var visaresidence = document.querySelector('[name="target_assign"]');
                var selected = visaresidence.value;

                const visaarea = document.querySelector('#residenceDETAILSarea');
                if (selected === '0') {
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
                <label class="fs-4 fw-bold text-hover-primary">${date}</label>
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

                }
                else {
                    document.querySelector('#residenceDETAILSarea').style.display = 'none';
                }


            }



        }

            // Prev event
            stepperObj.on('kt.stepper.previous', function (stepper) {
                console.log('stepper.previous');
                document.querySelector('#save').style.display = 'none';
                stepper.goPrevious();
                document.querySelector('#save').style.display = 'none';
                KTUtil.scrollTop();
            });
        }

    var CompanyInsert = function () {

        let cityValue = '';
        const mainlandCity = form.querySelector('[name="mainlandcity"]');
        const freezoneCity = form.querySelector('[name="fzcity"]');
        const offshoreCity = form.querySelector('[name="offshoreCity"]');

        if (mainlandCity && mainlandCity.value) {
            cityValue = mainlandCity.value;
        } else if (freezoneCity && freezoneCity.value) {
            cityValue = freezoneCity.value;
        } else if (offshoreCity && offshoreCity.value) {
            cityValue = offshoreCity.value;
        }

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

        InsertCompanyData = {
            ApplicationType: form.querySelector('[name="create_company_type"]:checked') ? form.querySelector('[name="create_company_type"]:checked').value : '',
            CompanyType: form.querySelector('[name="businessactivity"]').value,
            City: cityValue,
            Location: location,
        };
        console.log(InsertCompanyData);
        // Perform AJAX request
        $.ajax({
            method: 'POST',
            url: 'Company/InsertCompany', // Ensure this URL is correct
            data: JSON.stringify(InsertCompanyData),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                // Hide loading indication
                // Handle success
                CompId = response;
                console.log(CompId);
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
    var VisaDet = function () {        

        VisaDetails = {

            Name: form.querySelector('[name="visaname"]').value,
            DateOfBirth: form.querySelector('[name="visaDateOfBirth"]').value,
            EmiratesId: form.querySelector('[name="visaemirId"]').value,
            CurrentAddress: form.querySelector('[name="Cvisaaddress"]').value,
            ResidenceAddress: form.querySelector('[name="Rvisaaddress"]').value,
            Country: form.querySelector('[name="visacountry"]').value,
            Nationality: form.querySelector('[name="visanationality"]').value,
 };
        console.log(VisaDetails);
        // Perform AJAX request
        $.ajax({
            method: 'POST',
            url: 'Company/ResidenceVisaDetails', // Ensure this URL is correct
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
    var UpdateFormParameter1 = function () {

        updateFormParameter1 = {
            ApplicationType: form.querySelector('[name="create_company_type"]:checked') ? form.querySelector('[name="create_company_type"]:checked').value : '',
            };
        console.log(updateFormParameter1);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter1Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter1),
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
                    // Show error message
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
    var UpdateFormParameter2 = function () {

        updateFormParameter2 = {
            CompanyType: form.querySelector('[name="businessactivity"]').value,
        };
        console.log(updateFormParameter2);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter2Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter2),
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
                    // Show error message
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
    var UpdateFormParameter3 = function () {

        let cityValue = '';
        const mainlandCity = form.querySelector('[name="mainlandcity"]');
        const freezoneCity = form.querySelector('[name="fzcity"]');
        const offshoreCity = form.querySelector('[name="offshoreCity"]');

        if (mainlandCity && mainlandCity.value) {
            cityValue = mainlandCity.value;
        } else if (freezoneCity && freezoneCity.value) {
            cityValue = freezoneCity.value;
        } else if (offshoreCity && offshoreCity.value) {
            cityValue = offshoreCity.value;
        }

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

        updateFormParameter3 = {
            City: cityValue,
            Location: location,
        };
        console.log(updateFormParameter3);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter3Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter3),
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
                    // Show error message
                }
            },
        });
    } 
    var UpdateFormParameter4 = function () {

        let businessCategory = '';
        const mainlandBusinessCategory = form.querySelector('[name="mainlandbusscity"]');
        const freezoneBusinessCategory = form.querySelector('[name="fzbuscate"]');
        if (mainlandBusinessCategory && mainlandBusinessCategory.value) {
            businessCategory = mainlandBusinessCategory.value;
        } else if (freezoneBusinessCategory && freezoneBusinessCategory.value) {
            businessCategory = freezoneBusinessCategory.value;
        }

        updateFormParameter4 = {
            BusinessCategory: businessCategory,
         };
        console.log(updateFormParameter4);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter4Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter4),
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
                    // Show error message         
                }
            },
        });
    }
    var UpdateFormParameter5 = function () {

        updateFormParameter5 = {
            visaresidence: form.querySelector('[name="target_assign"]').value,
        };
        console.log(updateFormParameter5);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter5Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter5),
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
                    // Show error message
                   }
            },
        });
    }
    var UpdateFormParameter6 = function () {

        var dependvisa = form.querySelector('[name="visadependent"]:checked');
        // Get the value of the checked radio button, defaulting to an empty string if none are checked
        var Depvisa = dependvisa ? dependvisa.value : '';
        // Convert 'yes' to true and 'no' to false
        var isDependVisa = (Depvisa === 'yes') ? true : (Depvisa === 'no') ? false : null;

        updateFormParameter6 = {
            Depvisa: isDependVisa,
    };
        console.log(updateFormParameter6);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter6Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter6),
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
                    // Show error message
                 }
            },
         });
    }
    var UpdateFormParameter7 = function () {

        updateFormParameter7 = {
            officetype: form.querySelector('[name="officespace"]:checked') ? form.querySelector('[name="officespace"]:checked').value : '',
            yourofficetype: form.querySelector('[name="youroffice"]').value,
        };
        console.log(updateFormParameter7);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter7Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter7),
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
                    // Show error message     
                }
            },
        });
    }
    var UpdateFormParameter8 = function () {

        updateFormParameter8 = {
           businessPlan: form.querySelector('[name="bussplan"]:checked') ? form.querySelector('[name="bussplan"]:checked').value : '',
        };
        console.log(updateFormParameter8);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter8Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter8),
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
                    // Show error message      
                }
            },
        });
    }
    var UpdateFormParameter9 = function () {

        var busMind = form.querySelector('[name="busmind"]:checked');
        var BMind = busMind ? busMind.value : '';
        var isBusMind = (BMind === 'Yes') ? true : (BMind === 'No') ? false : null;
        const busname = form.querySelector('[name="namesOfBusiness"]').value;
        const busname1 = form.querySelector('[name="namesOfBusiness1"]').value;
        const busname2 = form.querySelector('[name="namesOfBusiness2"]').value;
        const cNames = busname + ', ' + busname1 + ', ' + busname2;

        updateFormParameter9 = {
            businessname: isBusMind,
            concatenatedNames: cNames,
        };
        console.log(updateFormParameter9);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter9Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter9),
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
                    // Show error message    
                }
            },
        });

    }
    var UpdateFormParameter10 = function () {
       
        updateFormParameter10 = {
            service: form.querySelector('[name="services"]').value,
        };
        console.log(updateFormParameter10);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter10Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter10),
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
                    // Show error message     
                }
            },
        });
    }
    var UpdateFormParameter11 = function () {

        updateFormParameter11 = {
            firstname: form.querySelector('[name="fname"]').value,
            lastname: form.querySelector('[name="lname"]').value,
            emailId: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phoneno"]').value,
            countrycode: form.querySelector('[name="countrycode1"]').value,
            ResidenceAddress: form.querySelector('[name="raddress"]').value,
            CurrentAddress: form.querySelector('[name="caddress"]').value,
            country: form.querySelector('[name="country"]').value,
            nationality: form.querySelector('[name="nationality"]').value,
        };
        console.log(updateFormParameter11);
        // Perform AJAX request
        $.ajax({
            method: 'PUT',
            url: 'Company/UpdateParameter11Company', // Ensure this URL is correct
            data: JSON.stringify(updateFormParameter11),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                if (response.success) { // .d is used to access the data in the JSON response from ASP.NET WebMethod
                    stepperObj.goNext();
                    console.log('AJAX response:', response);
                } else {
                    // Show error message
                    
                }
            },
        });
    }

    //Redirecting to Company-List Code.
    document.querySelector('#insertcompany').addEventListener('click', function () {

        Swal.fire({
            html: `Are you sure you wish to submit this form, once submitted it cannot be changed`,
            icon: "info",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: 'btn btn-danger'
            }
        }).then(function (result) {
            //form.reset();
            if (result.isConfirmed) { 
            var redirectUrl = form.getAttribute('data-kt-redirect-url');
            if (redirectUrl) {
                location.href = redirectUrl;
            }
        }
        });
    });
    var handleForm = function () {
     formSubmitButton.addEventListener('click', function (e) {
            // Validate form before change stepper step
            var validator = validations[10]; // get validator for last form

            validator.validate().then(function (status) {
                console.log('validated!');

                if (status == 'Valid') {
                    // Prevent default button action
                    e.preventDefault();

                    // Disable button to avoid multiple click 
                    formSubmitButton.disabled = true;
/*

                    let location='';
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
                    console.log(location);
                    const dependentDetails = [];
                    const rows = document.querySelectorAll('#kt_datatable_vertical_scroll1 tbody tr');
                    rows.forEach(row => {
                        const data = JSON.parse(row.dataset.dependentDetails);
                        dependentDetails.push(data);
                    });
                    const partnerDetails = [];
                    const rows1 = document.querySelectorAll('#kt_datatable_vertical_scroll tbody tr');
                    rows1.forEach(row => {
                        const data = JSON.parse(row.dataset.partnerDetails);
                        partnerDetails.push(data);
                    });
                    let cityValue = '';
                    const mainlandCity = form.querySelector('[name="mainlandcity"]');
                    const freezoneCity = form.querySelector('[name="fzcity"]');
                    const offshoreCity= form.querySelector('[name="offshoreCity"]');

                    if (mainlandCity && mainlandCity.value) {
                        cityValue = mainlandCity.value;
                    } else if (freezoneCity && freezoneCity.value) {
                        cityValue = freezoneCity.value;
                    } else if (offshoreCity && offshoreCity.value) {
                        cityValue = offshoreCity.value;
                    }

                    let businessCategory = '';
                    const mainlandBusinessCategory = form.querySelector('[name="mainlandbusscity"]');
                    const freezoneBusinessCategory = form.querySelector('[name="fzbuscate"]');

                    if (mainlandBusinessCategory && mainlandBusinessCategory.value) {
                        businessCategory = mainlandBusinessCategory.value;
                    } else if (freezoneBusinessCategory && freezoneBusinessCategory.value) {
                        businessCategory = freezoneBusinessCategory.value;
                    }
                    const busname = form.querySelector('[name="namesOfBusiness"]').value;
                    const busname1 = form.querySelector('[name="namesOfBusiness1"]').value;
                    const busname2 = form.querySelector('[name="namesOfBusiness2"]').value;
                    const cNames = busname + ', ' + busname1 + ', ' + busname2;
                    console.log(cNames);

                    jsonPostData = {
                        ApplicationType: form.querySelector('[name="create_company_type"]:checked') ? form.querySelector('[name="create_company_type"]:checked').value : '',
                        CompanyType: form.querySelector('[name="businessactivity"]').value,
                        City: cityValue,
                        Location: location,
                        BusinessCategory: businessCategory,
                        PartnerDetails: {
                            partnerDetails
                        },
                        visaresidence: form.querySelector('[name="target_assign"]').value,
                        VisaDetails: {
                            visaname: form.querySelector('[name="visaname"]').value,
                            visaDOB: form.querySelector('[name="visaDateOfBirth"]').value,
                            visaEmrId: form.querySelector('[name="visaemirId"]').value,
                            CvisaAddress: form.querySelector('[name="Cvisaaddress"]').value,
                            RvisaAddress: form.querySelector('[name="Rvisaaddress"]').value,
                            visacountry: form.querySelector('[name="visacountry"]').value,
                            visanationality: form.querySelector('[name="visanationality"]').value,
                            Depvisa: form.querySelector('[name="visadependent"]:checked') ? form.querySelector('[name="visadependent"]:checked').value : '',

                        },
                        DependentDetails: {
                            dependentDetails,
                        },
                        officetype: form.querySelector('[name="officespace"]:checked') ? form.querySelector('[name="officespace"]:checked').value : '',
                        yourofficetype: form.querySelector('[name="youroffice"]').value,
                        businessPlan: form.querySelector('[name="bussplan"]:checked') ? form.querySelector('[name="bussplan"]:checked').value : '',
                        businessname: form.querySelector('[name="busmind"]:checked') ? form.querySelector('[name="busmind"]:checked').value : '',
                        concatenatedNames: cNames,
                        service: form.querySelector('[name="services"]').value,
                        firstname: form.querySelector('[name="fname"]').value,
                        lastname: form.querySelector('[name="lname"]').value,
                        emailId: form.querySelector('[name="email"]').value,
                        phone: form.querySelector('[name="phoneno"]').value,
                        countrycode: form.querySelector('[name="countrycode1"]').value,
                        ResidenceAddress: form.querySelector('[name="raddress"]').value,
                        CurrentAddress: form.querySelector('[name="caddress"]').value,
                        country: form.querySelector('[name="country"]').value,
                        nationality: form.querySelector('[name="nationality"]').value,
                        //businessNameOption: concatenatedNames,
                    };

                    console.log(jsonPostData); */
                    // Show loading indication
                    formSubmitButton.setAttribute('data-kt-indicator', 'on');

                    console.log('form Submitted Sucessfully');


                } else {
                    
                }
            });
     });

        // Expiry month. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_month"]')).on('change', function () {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_month');
        });

        // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_year"]')).on('change', function () {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_year');
        });

        // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="business_type"]')).on('change', function () {
            // Revalidate the field when an option is chosen
            validations[2].revalidateField('business_type');
        });
    }
    var initValidation = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    create_company_type: {
                        validators: {
                            notEmpty: {
                                message: 'Please select company type'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 2
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'businessactivity': {
                        validators: {
                            notEmpty: {
                                message: 'Choose company type'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 3
        validations.push(FormValidation.formValidation(
            form,
            {
               
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 4
        validations.push(FormValidation.formValidation(
            form,
            {
               
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 5
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'target_assign': {
                        validators: {
                            notEmpty: {
                                message: 'Residence Visa Required'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 6
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'visadependent': {
                        validators: {
                            notEmpty: {
                                message: 'Visa for dependent is  Required'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 7
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'officespace': {
                        validators: {
                            notEmpty: {
                                message: 'Please provide which type of office space Required'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 8
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'bussplan': {
                        validators: {
                            notEmpty: {
                                message: 'Business start plan is required'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 9
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'busmind': {
                        validators: {
                            notEmpty: {
                                message: 'Have business name'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 10
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'services': {
                        validators: {
                            notEmpty: {
                                message: 'Please provide what other service you needed'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));

        // Step 11
        validations.push(FormValidation.formValidation(
            form,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Name is required'
                            }
                        }
                    },
                    'email': {
                        validators: {
                            emailAddress: {
                                message: 'The value is not a valid email address'
                            },
                            notEmpty: {
                                message: 'Email is required'
                            }
                        }
                    },
                    'countrycode1': {
                        validators: {
                            notEmpty: {
                                message: 'Country Code is required'
                            }
                        }
                    },
                    'phoneno': {
                        validators: {
                            notEmpty: {
                                message: 'Contact no is required'
                            }
                        }
                    },
                    'raddress': {
                        validators: {
                            notEmpty: {
                                message: 'Residence Address is required'
                            }
                        }
                    },
                    'caddress': {
                        validators: {
                            notEmpty: {
                                message: 'Country Address is required'
                            }
                        }
                    },
                    'country': {
                        validators: {
                            notEmpty: {
                                message: 'Country is required'
                            }
                        }
                    },

                    'nationality': {
                        validators: {
                            notEmpty: {
                                message: 'Nationality is required'
                            }
                        }
                    },

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        ));



        //// Step 4
        //validations.push(FormValidation.formValidation(
        //	form,
        //	{
        //		fields: {
        //			'card_name': {
        //				validators: {
        //					notEmpty: {
        //						message: 'Name on card is required'
        //					}
        //				}
        //			},
        //			'card_number': {
        //				validators: {
        //					notEmpty: {
        //						message: 'Card member is required'
        //					},
        //                          creditCard: {
        //                              message: 'Card number is not valid'
        //                          }
        //				}
        //			},
        //			'card_expiry_month': {
        //				validators: {
        //					notEmpty: {
        //						message: 'Month is required'
        //					}
        //				}
        //			},
        //			'card_expiry_year': {
        //				validators: {
        //					notEmpty: {
        //						message: 'Year is required'
        //					}
        //				}
        //			},
        //			'card_cvv': {
        //				validators: {
        //					notEmpty: {
        //						message: 'CVV is required'
        //					},
        //					digits: {
        //						message: 'CVV must contain only digits'
        //					},
        //					stringLength: {
        //						min: 3,
        //						max: 4,
        //						message: 'CVV must contain 3 to 4 digits only'
        //					}
        //				}
        //			}
        //		},

        //		plugins: {
        //			trigger: new FormValidation.plugins.Trigger(),
        //			// Bootstrap Framework Integration
        //			bootstrap: new FormValidation.plugins.Bootstrap5({
        //				rowSelector: '.fv-row',
        //                      eleInvalidClass: '',
        //                      eleValidClass: ''
        //			})
        //		}
        //	}
        //));

    }

    return {
        // Public Functions
        init: function () {
            // Elements
            modalEl = document.querySelector('#kt_modal_create_account');

            if (modalEl) {
                modal = new bootstrap.Modal(modalEl);
            }

            stepper = document.querySelector('#kt_create_account_stepper');

            if (!stepper) {
                return;
            }

            form = stepper.querySelector('#kt_create_account_form');
            formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
            formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
            formSaveButton = stepper.querySelector('#save');

            initStepper();
            initValidation();
            handleForm();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCreateAccount.init();
});


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

var myDropzone = new Dropzone("#kt_dropzonejs_example_2", {
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

var myDropzone = new Dropzone("#kt_dropzonejs_example_3", {
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

var myDropzone = new Dropzone("#kt_dropzonejs_example_4", {
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