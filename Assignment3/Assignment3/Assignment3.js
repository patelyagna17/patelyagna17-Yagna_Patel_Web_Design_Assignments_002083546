//Title constructor function that creates a Title object
// Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

let checkValues = document.querySelectorAll("input[type=checkbox]");
let tableInfo = document.querySelectorAll("#myTable tr");
let data1 = tableInfo[1].cloneNode(true);
let data2 = tableInfo[2].cloneNode(true);

function checkboxSelect(checkbox) {
  var parentDataValue = checkbox.parentElement.parentElement;
  var deleteElementValue = parentDataValue.querySelector(":nth-child(9)");
  var editElementValue = parentDataValue.querySelector(":nth-child(10)");

  removeDeleteButton(deleteElementValue);
  removeEditButton(editElementValue);

  if (checkbox.checked) {
      parentDataValue.bgColor = "yellow";
      deleteElementValue.appendChild(deleteButtonValue(parentDataValue));
      editElementValue.appendChild(editButtonValue(parentDataValue));
  } else {
      parentDataValue.bgColor = "";
  }
  submitButtonChangeValue();
}

function removeEditButton(editElement) {
  while (editElement.firstChild) {
      editElement.firstChild.remove();
  }
}

function removeDeleteButton(deleteExtraButton) {
  while (deleteExtraButton.firstChild) {
      deleteExtraButton.firstChild.remove();
  }
}


function deleteButtonValue(rowdata) {
  let deleteDataButton = document.createElement("input");
  deleteDataButton.type = "button";
  deleteDataButton.value = "Delete";

  deleteDataButton.addEventListener("click", () => {
      let studentName = rowdata.querySelector("td:nth-child(2)").innerText;

      rowdata.nextElementSibling.style.display = "none"; 
      rowdata.remove(); 

      alert(`${studentName} Record deleted successfully!`);

      let checkValues = document.querySelectorAll("input[type=checkbox]");
      let check = false;
      checkValues.forEach((values) => {
          if (values.checked) check = true;
      });

      if (check) {
          document.getElementById("button").style.backgroundColor = "orange";
          document.getElementById("button").disabled = false;
      } else {
          document.getElementById("button").style.backgroundColor = "";
          document.getElementById("button").disabled = true;
      }
  });

  return deleteDataButton;
}


function editButtonValue(rowdata) {
  const editButtonData = document.createElement("input");
  editButtonData.type = "button";
  editButtonData.value = "Edit";

  editButtonData.addEventListener("click", () => {
      let studentName = rowdata.querySelector("td:nth-child(2)").innerText; 

      let newValue = prompt(`Edit details for ${studentName}:`, ""); 

      if (newValue !== null && newValue.trim() !== "") { 
          alert(`${studentName} data updated successfully!`);
      }
  });

  return editButtonData;
}

function submitButtonChangeValue() {
  let checkValues = document.querySelectorAll("input[type=checkbox]");
  let check = false;
  checkValues.forEach((values) => {
      if (values.checked) check = true;
  });

  if (check) {
      document.getElementById("button").style.backgroundColor = "orange";
      document.getElementById("button").disabled = false;
  } else {
      document.getElementById("button").style.backgroundColor = "";
      document.getElementById("button").disabled = true;
  }

  let hiddenData = document.querySelectorAll(
      "table td:nth-child(9), table th:nth-child(9),table td:nth-child(10), table th:nth-child(10)"
  );

  hiddenData.forEach((column) => {
      column.classList.remove("cellRenderer");
      if (check) {
          column.classList.add("cellRenderer");
      }
  });
}

function addCheckboxValues(checkbox) {
  checkbox.addEventListener("change", () => {
      checkboxSelect(checkbox);
  });

  let dropdownValue =
      checkbox.nextElementSibling.nextElementSibling.nextElementSibling;
  dropdownValue.addEventListener("click", () => {
      toggleButtonFunc(dropdownValue);
  });
}

checkValues.forEach((checkbox) => {
  addCheckboxValues(checkbox);
});

function collapseAllDropdowns() {
  let dropdownRows = document.querySelectorAll(".dropDownTextArea");
  dropdownRows.forEach(row => {
      row.style.display = "none"; 
  });
}


function toggleButtonFunc(dropdown) {
  if (
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility ===
    "visible"
  ) {
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility =
      "collapse";
  } else {
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility =
      "visible";
  }
}

let addButton = document.getElementById("add");
addButton.addEventListener("click", () => {
  addStudentButtonFunc();
});



function addStudentButtonFunc() {
  try {
      let dataValue = document.querySelector("#myTable tbody");
      let recordValue1 = data1.cloneNode(true);
      let recordValue2 = data2.cloneNode(true);

      var rowsValue = document.getElementById("myTable").rows;
      var latestIndex;
      if (rowsValue.length > 1) {
          latestIndex =
              parseInt(
                  rowsValue[
                      rowsValue.length - 2
                  ].firstElementChild.nextElementSibling.innerHTML.split(" ")[1]
              ) + 1;
      } else {
          latestIndex = 1;
      }

      let newStudentRowValue = recordValue1.querySelectorAll("td");
      newStudentRowValue[1].innerHTML = `Student ${latestIndex}`;
      newStudentRowValue[2].innerHTML = `Teacher ${latestIndex}`;
      newStudentRowValue[6].innerHTML = `${Math.floor(Math.random() * 100000 + 1)}`;
      let checkBoxData = recordValue1.querySelector("input[type=checkbox]");
      addCheckboxValues(checkBoxData);
      
      dataValue.appendChild(recordValue1);
      dataValue.appendChild(recordValue2);
      recordValue2.style.display = "none"; 

      alert(`Student ${latestIndex} Record added successfully!`);
  } catch (error) {
      alert("Error: Failed to add new student record. Please try again!");
  }
}
