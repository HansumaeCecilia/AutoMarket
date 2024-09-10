window.onload = (event) => {
  initMultiselect('myMultiselect');
  initMultiselect('myMultiselect1');
  initMultiselect('myMultiselect2');
  initMultiselect('myMultiselect3');
  initMultiselect('myMultiselect4');
  initMultiselect('myMultiselect5');
  initMultiselect('myMultiselect6');
  initMultiselect('myMultiselect7');
    
};

function initMultiselect(id) {
  checkboxStatusChange(id);

  document.addEventListener("click", function(evt) {
    var flyoutElement = document.getElementById(id),
      targetElement = evt.target; // clicked element

    do {
      if (targetElement == flyoutElement) {
        // This is a click inside. Do nothing, just return.
        //console.log('click inside');
        return;
      }

      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    toggleCheckboxArea(true);
    //console.log('click outside');
  });
}

function checkboxStatusChange(id) {
  var multiselect = document.getElementById("mySelectLabel_" + id);
  var multiselectOption = multiselect.getElementsByTagName('option')[0];

  var values = [];
  var checkboxes = document.getElementById("mySelectOptions_" + id);
  var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');

  for (const item of checkedCheckboxes) {
    var checkboxValue = item.getAttribute('value');
    values.push(checkboxValue);
  }

  var dropdownValue = fieldTitles[id] || "Select";
  if (values.length > 0) {
    dropdownValue = values.join(', ');
  }

  multiselectOption.innerText = dropdownValue;
}

function toggleCheckboxArea(id, onlyHide = false) {
  var checkboxes = document.getElementById("mySelectOptions_" + id);
  var displayValue = checkboxes.style.display;

  if (displayValue != "block") {
    if (onlyHide == false) {
      checkboxes.style.display = "block";
    }
  } else {
    checkboxes.style.display = "none";
  }
}

// Object containing titles for each field
var fieldTitles = {
  'myMultiselect': 'Käyttövoima',
  'myMultiselect1': 'Väri',
  'myMultiselect2': 'Sisätilat ja Mukavuus',
  'myMultiselect3': 'Muut',
  'myMultiselect4': 'Turvallisuus',
  'myMultiselect5': 'Elektroniikka',
  'myMultiselect6': 'Ajoneuvon tyyppi',
  'myMultiselect7': 'Vaihteisto'
  
};

// Call the checkboxStatusChange function with the field titles
checkboxStatusChange('myMultiselect', fieldTitles);
checkboxStatusChange('myMultiselect1', fieldTitles);
checkboxStatusChange('myMultiselect2', fieldTitles);
checkboxStatusChange('myMultiselect3', fieldTitles);
checkboxStatusChange('myMultiselect4', fieldTitles);
checkboxStatusChange('myMultiselect5', fieldTitles);
checkboxStatusChange('myMultiselect6', fieldTitles);
checkboxStatusChange('myMultiselect7', fieldTitles);