"use strict";



// Class definition
var KTModalCreateProject = function () {
	// Private variables
	var stepper;
	var stepperObj;
	var form;	

	// Private functions
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new KTStepper(stepper);
	}

	return {
		// Public functions
		init: function () {
			stepper = document.querySelector('#kt_modal_create_project_stepper');
			form = document.querySelector('#kt_modal_create_project_form');

			initStepper();
		},

		getStepperObj: function () {
			return stepperObj;
		},

		getStepper: function () {
			return stepper;
		},
		
		getForm: function () {
			return form;
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	if (!document.querySelector('#kt_modal_create_project')) {
		return;
	}

	KTModalCreateProject.init();
	KTModalCreateProjectType.init();
	KTModalCreateProjectBudget.init();
	KTModalCreateProjectSettings.init();
	KTModalCreateProjectTeam.init();
	KTModalCreateProjectTargets.init();
	KTModalCreateProjectFiles.init();
	KTModalCreateProjectComplete.init();
});

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.KTModalCreateProject = module.exports = KTModalCreateProject;
}

$("#caseType1").on('change', function () {
	var caseType1 = $(this).val();
	var $caseType2 = $("#caseType2");

	// Clear existing options
	$caseType2.empty();

	// Fetch state data based on selected country
	//fetchJSONFile('data/caseList.json', function (data) {
	//	$.each(data.caseType2[caseType1], function () {
	//		$caseType2.append($("<option>").val(this.value).text(this.name));
	//	});
	//});

	let jsonData;

	fetch('data/caseList.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			// Save the JSON data into a variable
			jsonData = data;
			console.log(jsonData);

			// You can do further processing with the data here if needed
			console.log('Data loaded:', jsonData);
		});

	if (jsonData != null) {
		$.each(jsonData.caseType2[caseType1], function () {
			$caseType2.append($("<option>").val(this.value).text(this.name));
		});
	}
});
//function fetchJSONFile('data/caseList.json', callback) {
//	var httpRequest = new XMLHttpRequest();
//	httpRequest.onreadystatechange = function () {
//		if (httpRequest.readyState === 4) {
//			if (httpRequest.status === 200) {
//				var data = JSON.parse(httpRequest.responseText);
//				if (callback) callback(data);
//			}
//		}
//	};
//	httpRequest.open('GET', 'data/caseList.json');
//	httpRequest.send();
//}