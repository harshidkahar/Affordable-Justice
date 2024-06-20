"use strict";
// Define form element
const form = document.getElementById('kt_modal_create_project_form');

const form1 = document.getElementById('kt_modal_create_project_settings_logo');



// Variable to store the selected radio input value
let businesscatogory;
let businessactivity;
let selectedOwnersValue;
let SelectedOwnersValue;
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



// Event listener for the "Next" button
const nextButton = document.querySelector('[data-kt-element="type-next"]');
nextButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio = document.querySelector('input[name="radio_input"]:checked');
    
    if (selectedRadio) {
        businesscatogory = selectedRadio.value;
        console.log('Variable stored:', businesscatogory);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }
});


const nextButton1 = document.querySelector('[data-kt-element="settings-next"]');
nextButton1.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();


    

    var companyTypeInput = document.querySelector('#companyType');

    
    var companyType = companyTypeInput.value;
        
        if (companyType === 'Mainland') {
            document.querySelector('#mainlandDetails').style.display = 'block';
            document.querySelector('#mainlandForm').style.display = 'block';
            document.querySelector('#mainlandbussDetails').style.display = 'block';
            document.querySelector('#mainlandbussForm').style.display = 'block';
        } 
        
        
        if (companyType === 'FreeZone') {
            document.querySelector('#freezoneDetails').style.display = 'block';
            document.querySelector('#freezoneForm').style.display = 'block';
            document.querySelector('#freezonebussDetails').style.display = 'block';
            document.querySelector('#freezonebussForm').style.display = 'block';
        }
   
    // Get the select element
   
    const selectElement = document.querySelector('select[name="businessactivity"]');
    
    // Get the selected option value
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    if (selectedOption.value) {
        businessactivity = selectedOption.value;
        console.log('Variable stored:', businessactivity);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a business activity');
    }
});




const nextButton2 = document.querySelector('[data-kt-element="team-next"]');
nextButton2.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the select element
    const selectElement1 = document.querySelector('select[name="mainlandbusscity"]');
    
    // Get the selected option value
    const selectedOption1 = selectElement1.options[selectElement1.selectedIndex];
    
    if (selectedOption1.value) {
        selectedOwnersValue = selectedOption1.value;
        console.log('Variable stored:', selectedOwnersValue);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose the number of owners/shareholders');
    }


    const SelectElement3 = document.querySelector('select[name="fzzcity"]');
    
    // Get the selected option value
    const SelectedOption3 = SelectElement3.options[SelectElement3.selectedIndex];
    
    if (SelectedOption3.value) {
        SElectedOwnersValue = SelectedOption3.value;
        console.log('Variable stored:', SElectedOwnersValue);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose the number of owners/shareholders');
    }





});





const nextButton3 = document.querySelector('[data-kt-element="targets-next"]');
nextButton3.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the select element
    const selectElement2 = document.querySelector('select[name="target_assign"]');
    
    // Get the selected option value
    const selectedOption2 = selectElement2.options[selectElement2.selectedIndex];
    
    if (selectedOption2.value) {
        targetassign = selectedOption2.value;
        console.log('Variable stored:', targetassign);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose the number of residence visas needed');
    }
});







const nextButton5 = document.querySelector('[data-kt-element="budget-next"]');
nextButton5.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio3 = document.querySelector('select[name="mainlandcity"]');
    
    if (selectedRadio3) {
        residence = selectedRadio3.value;
        console.log('Variable stored:', residence);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }

    const SelectElement2 = document.querySelector('select[name="fzcity"]');
    
    // Get the selected option value
    const SelectedOption2 = SelectElement2.options[SelectElement2.selectedIndex];
    
    if (SelectedOption2.value) {
        selectedOwnersValue = SelectedOption2.value;
        console.log('Variable stored:', selectedOwnersValue);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose the number of owners/shareholders');
    }
    
    const SelectElement3 = document.querySelector('select[name="fzlocation"]');
        
    // Get the selected option value
    const SelectedOption3 = SelectElement3.options[SelectElement3.selectedIndex];
    
    if (SelectedOption3.value) {
        SelectedOwnersValue = SelectedOption3.value;
        console.log('Variable stored:', SelectedOwnersValue);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose the number of owners/shareholders');
    }
    
  
});

const prevButton=document.querySelector('[data-kt-element="budget-previous"]');
prevButton.addEventListener('click',function(e){

    var companyTypeInput = document.querySelector('#companyType');
   // Log the selected index before resetting
   console.log('Before reset:', companyTypeInput.selectedIndex);

   // Reset the selected index to -1
   companyTypeInput.selectedIndex = -1;

   // Log the selected index after resetting
   console.log('After reset:', companyTypeInput.selectedIndex);
})


const nextButton7 = document.querySelector('[data-kt-element="complete-next"]');
nextButton7.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio5 = document.querySelector('input[name="officespace"]:checked');
    
    if (selectedRadio5) {
        officespace = selectedRadio5.value;
        console.log('Variable stored:', officespace);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }
});



const nextButton6 = document.querySelector('[data-kt-element="files-next"]');
nextButton6.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio4 = document.querySelector('input[name="visadependent"]:checked');
    
    if (selectedRadio4) {
        visadependent = selectedRadio4.value;
        console.log('Variable stored:', visadependent);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }
});






const nextButton9 = document.querySelector('[data-kt-element="plan-next"]');
nextButton9.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio7 = document.querySelector('input[name="bussplan"]:checked');
    
    if (selectedRadio7) {
        bussplan = selectedRadio7.value;
        console.log('Variable stored:', bussplan);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }
});

const nextButton10 = document.querySelector('[data-kt-element="bmind-next"]');
nextButton10.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Get the selected radio input value
    const selectedRadio8 = document.querySelector('input[name="busmind"]:checked');
    
    if (selectedRadio8) {
        bmind = selectedRadio8.value;
        console.log('Variable stored:', bmind);
        
        // Add your logic here for any additional processing or redirection if needed
        
    } else {
        console.error('Please choose a radio option');
    }
});


const nextButton11 = document.querySelector('[data-kt-element="serv-next"]');
nextButton11.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    const services = document.querySelector('input[name="services"]').value;
            // Store the form data in variables
            const formData = {
                services: services
                
            };

            // Log the stored variables to the console
            console.log('Stored Form Data:', formData);
});







const nextButton13 = document.querySelector('[data-kt-element="13-next"]');
nextButton13.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const phoneno = document.querySelector('input[name="phoneno"]').value;
            const residence = document.querySelector('textarea[name="raddress"]').value;
            const nationality=document.querySelector('select[name="nationality"]').value;
            
            // Store the form data in variables
            const formData1 = {
                name: name,
                email: email,
                phoneno: phoneno,
                residence:residence,
                nationality:nationality,
            };

            // Log the stored variables to the console
            console.log('Stored Form Data:', formData1);

            





});

var myDropzone = new Dropzone("#kt_dropzonejs_example_1", {
    url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
    maxFilesize: 10, // MB
    addRemoveLinks: true,
    accept: function(file, done) {
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
    accept: function(file, done) {
        if (file.name == "wow.jpg") {
            done("Naha, you don't.");
        } else {
            done();
        }
    }
});






