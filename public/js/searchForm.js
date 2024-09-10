// window.onload = (event) => {
//     initMultiselect1('multiselectBrand');
//       initMultiselect2('multiselectModel');
//       initMultiselect3('multiselectBody');
//       initMultiselect4('multiselectPower');
//       initMultiselect5('multiselectTransmission');
//       initMultiselect6('multiselectAccessories');
//       initMultiselect7('multiselectElectronics');
//       initMultiselect8('multiselectColor');
//       initMultiselect9('multiselectOther');
//       initMultiselect10('multiselectSafety');
//   };
  
//   function initMultiselect(id) {
//     checkboxStatusChange(id);
  
//     document.addEventListener("click", function(evt) {
//       var flyoutElement = document.getElementById(id),
//         targetElement = evt.target; // clicked element
  
//       do {
//         if (targetElement == flyoutElement) {
//           // This is a click inside. Do nothing, just return.
//           //console.log('click inside');
//           return;
//         }
  
//         // Go up the DOM
//         targetElement = targetElement.parentNode;
//       } while (targetElement);
  
//       // This is a click outside.
//       toggleCheckboxArea(true);
//       //console.log('click outside');
//     });
//   }
  
//   function checkboxStatusChange(id) {
//     var multiselect = document.getElementById("mySelectLabel_" + id);
//     var multiselectOption = multiselect.getElementsByTagName('option')[0];
  
//     var values = [];
//     var checkboxes = document.getElementById("mySelectOptions_" + id);
//     var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
  
//     for (const item of checkedCheckboxes) {
//       var checkboxValue = item.getAttribute('value');
//       values.push(checkboxValue);
//     }
  
//     var dropdownValue = fieldTitles[id] || "Select";
//     if (values.length > 0) {
//       dropdownValue = values.join(', ');
//     }
  
//     multiselectOption.innerText = dropdownValue;
//   }
  
//   function toggleCheckboxArea(id, onlyHide = false) {
//     var checkboxes = document.getElementById("mySelectOptions_" + id);
//     if (onlyHide) {
//         checkboxes.style.display = "none";
//     } else {
//       checkboxes.style.display = checkboxes.style.display === "none" ? "block" : "none";
//     }
//   }
  
//   // Object containing titles for each field
//   var fieldTitles = {
//     'multiselectPower': 'Käyttövoima',
//     'multiselectColor': 'Väri',
//     'multiselectAccessories': 'Varusteet',
//     'multiselectOther': 'Muut',
//     'multiselectSafety': 'Turvallisuus',
//     'multiselectElectronics': 'Elektroniikka',
//     'multiselectBody': 'Korimalli',
//     'multiselectTransmission': 'Vaihteisto',
//     'multiselectBrand': 'Merkki',
//     'multiselectModel': 'Malli',
//   };