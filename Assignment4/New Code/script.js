
document.addEventListener("DOMContentLoaded", function () {
    // Global validity flags
    var validFirstName = false;
    var validLastName = false;
    var validEmail = false;
    var validContact = false;
    var validZipcode = false;
    var validComments = false;
    var validAddress1 = false;
    var validCity = false;
    var validState = false;
    var validDrinkSelect = false;
    var validDrinkCheckbox = false;
    
    // Regex patterns (email is restricted to @northeastern.edu)
    var regName    = /^[a-zA-Z]+$/;
    var regEmail   = /^[\w\.]+@northeastern\.edu$/i;
    var regPhone   = /^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/;
    var regZipcode = /^[0-9]{5}(?:-[0-9]{4})?$/;
    
    // Get form elements by their IDs
    var form           = document.getElementById("myForm");
    var firstName      = document.getElementById("firstName");
    var lastName       = document.getElementById("lastName");
    var emailId        = document.getElementById("emailId");
    var phoneNumber    = document.getElementById("phoneNumber");
    var zipcode        = document.getElementById("zipcode");
    var comments       = document.getElementById("comments");
    var address1       = document.getElementById("Address1");
    var address2       = document.getElementById("Address2");
    var city           = document.getElementById("city");
    var state          = document.getElementById("state");
    var drinkDropdown  = document.getElementById("mySelect");
    var drinkCheckbox  = document.getElementById("checkboxSelectValue");
    var submitBtn      = document.getElementById("submitbtn");
    
    // Additional elements for drink description
    var checkBoxDiv    = document.getElementById("checkBoxDiv");  // container for drink checkbox
    var spanTag        = document.getElementById("spanTag");      // label to display the selected drink
    var textAreaDiv    = document.getElementById("text_area");    // container for drink description textarea
    var textAreaInput  = document.getElementById("xyz");          // the drink description textarea
    
    // --------------------------
    // Helper: Show/Clear Error Message (for validation errors)
    // --------------------------
    function showError(fieldId, message) {
      var errorElem = document.getElementById("error_" + fieldId);
      if (!errorElem) {
        errorElem = document.createElement("span");
        errorElem.id = "error_" + fieldId;
        errorElem.style.color = "red";
        var field = document.getElementById(fieldId);
        if (field) {
          field.parentNode.insertBefore(errorElem, field.nextSibling);
        }
      }
      errorElem.textContent = message;
      errorElem.style.display = "block";
    }
    
    function clearError(fieldId) {
      var errorElem = document.getElementById("error_" + fieldId);
      if (errorElem) {
        errorElem.textContent = "";
        errorElem.style.display = "none";
      }
    }
    
    // --------------------------
    // Live Character Counter for Address2
    // --------------------------
    var address2Counter = document.getElementById("address2Counter");
    if (!address2Counter) {
      address2Counter = document.createElement("span");
      address2Counter.id = "address2Counter";
      address2.parentNode.insertBefore(address2Counter, address2.nextSibling);
    }
    address2.addEventListener("input", function () {
      address2Counter.textContent = "Character count: " + address2.value.length;
      // Optionally, limit Address2 to 20 characters
      if (address2.value.trim().length > 20) {
        showError("Address2", "Address2 cannot exceed 20 characters");
        address2.style.border = "2px solid red";
      } else {
        clearError("Address2");
        address2.style.border = "";
      }
      checkSubmitButtonStatus();
    });
    
    // --------------------------
    // Field Validation Function for Text Fields
    // --------------------------
    function validate(e) {
      var value = e.target.value;
      var fieldId = this.id;
      switch (fieldId) {
        case "firstName":
          if (!value.trim().match(regName)) {
            showError("firstName", "Only alphabets allowed");
            this.style.border = "2px solid red";
            validFirstName = false;
          } else {
            clearError("firstName");
            this.style.border = "";
            validFirstName = true;
          }
          break;
        case "lastName":
          if (!value.trim().match(regName)) {
            showError("lastName", "Only alphabets allowed");
            this.style.border = "2px solid red";
            validLastName = false;
          } else {
            clearError("lastName");
            this.style.border = "";
            validLastName = true;
          }
          break;
        case "emailId":
          if (!value.trim().match(regEmail)) {
            showError("emailId", "Enter a valid Northeastern email (username@northeastern.edu)");
            this.style.border = "2px solid red";
            validEmail = false;
          } else {
            clearError("emailId");
            this.style.border = "";
            validEmail = true;
          }
          break;
        case "phoneNumber":
          if (!value.trim().match(regPhone)) {
            showError("phoneNumber", "Format: (xxx) xxx-xxxx or xxx-xxx-xxxx");
            this.style.border = "2px solid red";
            validContact = false;
          } else {
            clearError("phoneNumber");
            this.style.border = "";
            validContact = true;
          }
          break;
        case "zipcode":
          if (!value.trim().match(regZipcode)) {
            showError("zipcode", "Enter a valid zipcode");
            this.style.border = "2px solid red";
            validZipcode = false;
          } else {
            clearError("zipcode");
            this.style.border = "";
            validZipcode = true;
          }
          break;
        case "comments":
          if (value.trim().length < 5 || value.trim().length > 20) {
            showError("comments", "Comments must be between 5 and 20 characters");
            this.style.border = "2px solid red";
            validComments = false;
          } else {
            clearError("comments");
            this.style.border = "";
            validComments = true;
          }
          break;
        case "Address1":
          if (value.trim() === "") {
            showError("Address1", "Address is required");
            this.style.border = "2px solid red";
            validAddress1 = false;
          } else {
            clearError("Address1");
            this.style.border = "";
            validAddress1 = true;
          }
          break;
        case "city":
          if (value.trim() === "") {
            showError("city", "City is required");
            this.style.border = "2px solid red";
            validCity = false;
          } else {
            clearError("city");
            this.style.border = "";
            validCity = true;
          }
          break;
        case "state":
          if (value.trim() === "") {
            showError("state", "State is required");
            this.style.border = "2px solid red";
            validState = false;
          } else {
            clearError("state");
            this.style.border = "";
            validState = true;
          }
          break;
      }
      checkSubmitButtonStatus();
    }
    
    // --------------------------
    // Attach "input" Event Listeners for Text Fields (existing validations)
    // --------------------------
    var textFields = [firstName, lastName, emailId, phoneNumber, zipcode, comments, address1, city, state];
    textFields.forEach(function (field) {
      field.addEventListener("input", validate);
    });
    
    // --------------------------
    // New: Length Validation Function for Specified Fields
    // --------------------------
    var lengthRequirements = {
      "firstName": { min: 2, max: 30 },
      "lastName": { min: 2, max: 30 },
      "Address1": { min: 5, max: 100 },
      "Address2": { min: 0, max: 20 },
      "city": { min: 2, max: 50 },
      "state": { min: 2, max: 50 },
      "xyz": { min: 5, max: 100 } // Drink Description Textarea
    };
    
    function validateLength(e) {
      var fieldId = this.id;
      if (lengthRequirements.hasOwnProperty(fieldId)) {
        var value = this.value.trim();
        var min = lengthRequirements[fieldId].min;
        var max = lengthRequirements[fieldId].max;
        var errorId = "error_length_" + fieldId;
        var errorElem = document.getElementById(errorId);
        if (!errorElem) {
          errorElem = document.createElement("span");
          errorElem.id = errorId;
          errorElem.style.color = "red";
          errorElem.style.marginLeft = "10px";
          this.parentNode.insertBefore(errorElem, this.nextSibling);
        }
        if (value.length < min) {
          errorElem.textContent = "Minimum length required: " + min;
        } else if (value.length > max) {
          errorElem.textContent = "Maximum length allowed: " + max;
        } else {
          errorElem.textContent = "";
        }
      }
    }
    
    // Attach the length validation to the specified fields
    var fieldsToCheckLength = ["firstName", "lastName", "Address1", "Address2", "city", "state", "xyz"];
    fieldsToCheckLength.forEach(function(fieldId) {
      var field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener("input", validateLength);
      }
    });
    
    // --------------------------
    // Drink Dropdown Validation & UI Handling
    // --------------------------
    drinkDropdown.addEventListener("change", function () {
      if (drinkDropdown.value !== "--Please choose a drink--") {
        validDrinkSelect = true;
        clearError("mySelect");
        // Show the drink checkbox container and update its label
        checkBoxDiv.style.display = "block";
        drinkCheckbox.checked = false;
        // Hide the drink description textarea when a new drink is selected
        textAreaDiv.style.display = "none";
        textAreaInput.value = "";
        if (spanTag) {
          spanTag.innerHTML = drinkDropdown.value;
        }
      } else {
        validDrinkSelect = false;
        showError("mySelect", "Please choose a drink");
        checkBoxDiv.style.display = "none";
        textAreaDiv.style.display = "none";
      }
      checkSubmitButtonStatus();
    });
    
    // --------------------------
    // Drink Checkbox Validation & UI Handling (for showing Drink Description)
    // --------------------------
    drinkCheckbox.addEventListener("change", function () {
      if (drinkCheckbox.checked) {
        validDrinkCheckbox = true;
        clearError("checkboxSelectValue");
        // Show the drink description textarea when checkbox is checked
        textAreaDiv.style.display = "block";
      } else {
        validDrinkCheckbox = false;
        showError("checkboxSelectValue", "Please check the drink option");
        textAreaDiv.style.display = "none";
      }
      checkSubmitButtonStatus();
    });
    
    // --------------------------
    // Check if Submit Button Should be Enabled
    // --------------------------
    function checkSubmitButtonStatus() {
      var addressComplete = address1.value.trim() !== "" && city.value.trim() !== "" && state.value.trim() !== "";
      var commentsValid = comments.value.trim().length >= 5 && comments.value.trim().length <= 20;
      if (
        validFirstName &&
        validLastName &&
        validEmail &&
        validContact &&
        validZipcode &&
        validComments &&
        validAddress1 &&
        validCity &&
        validState &&
        validDrinkSelect &&
        validDrinkCheckbox &&
        addressComplete &&
        commentsValid
      ) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }
    
    // --------------------------
    // Form Submission Handling (Retrieve Data & Display in Table)
    // --------------------------
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!submitBtn.disabled) {
        alert("Data Saved Successfully");
        // Retrieve the table element with id "table"
        var table = document.getElementById("table");
        if (table) {
          // Insert a new row at the end of the table's tbody
          var row = table.insertRow(-1);
    
          // Create cells for each field (adjust the number of cells as needed)
          var titleCell = row.insertCell(0);
          var firstNameCell = row.insertCell(1);
          var lastNameCell = row.insertCell(2);
          var emailCell = row.insertCell(3);
          var phoneCell = row.insertCell(4);
          var address1Cell = row.insertCell(5);
          var address2Cell = row.insertCell(6);
          var cityCell = row.insertCell(7);
          var stateCell = row.insertCell(8);
          var zipcodeCell = row.insertCell(9);
          var drinkCell = row.insertCell(10);
          var drinkDescCell = row.insertCell(11);
          var commentsCell = row.insertCell(12);
          var socialMediaCell = row.insertCell(13);
    
          // Retrieve the value from the title radio buttons
          var titleValue = "";
          var titleRadio = document.querySelector('input[name="title"]:checked');
          if (titleRadio) {
            titleValue = titleRadio.value;
          }
    
          // Set the cell values using the form fields
          socialMediaCell.innerHTML = Array.from(document.querySelectorAll('input[name="link"]:checked')).map(function(el) {
            return el.value;
          }).join(", ");
          titleCell.innerHTML = titleValue;
          firstNameCell.innerHTML = firstName.value;
          lastNameCell.innerHTML = lastName.value;
          emailCell.innerHTML = emailId.value;
          phoneCell.innerHTML = phoneNumber.value;
          address1Cell.innerHTML = address1.value;
          address2Cell.innerHTML = address2.value;
          cityCell.innerHTML = city.value;
          stateCell.innerHTML = state.value;
          zipcodeCell.innerHTML = zipcode.value;
          drinkCell.innerHTML = drinkDropdown.value;
          drinkDescCell.innerHTML = textAreaInput.value;
          commentsCell.innerHTML = comments.value;
        } else {
          console.error("Table element with id 'table' not found.");
        }
    
        // Reset the form and UI elements
        form.reset();
        address2Counter.textContent = "Character count: 0";
        validFirstName = validLastName = validEmail = validContact = validZipcode =
          validComments = validAddress1 = validCity = validState = validDrinkSelect = validDrinkCheckbox = false;
        submitBtn.disabled = true;
      } else {
        alert("Please enter correct details");
      }
    });
    
    // --------------------------
    // Form Reset Handling: Clear error messages and reset styles
    // --------------------------
    form.addEventListener("reset", function () {
      var errorSpans = document.querySelectorAll("span[id^='error_']");
      errorSpans.forEach(function (span) {
        span.textContent = "";
        span.style.display = "none";
      });
      textFields.forEach(function (field) {
        field.style.border = "";
      });
      address2Counter.textContent = "Character count: 0";
      submitBtn.disabled = true;
    });
  });
  