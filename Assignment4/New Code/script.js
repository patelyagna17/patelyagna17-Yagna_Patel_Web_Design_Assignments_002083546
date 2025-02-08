document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");
    var drinkDropdown = document.getElementById("mySelect");
    var checkBoxDiv = document.getElementById("checkBoxDiv");
    var checkboxSelectValue = document.getElementById("checkboxSelectValue");
    var spanTag = document.getElementById("spanTag");
    var textAreaDiv = document.getElementById("text_area");
    var textAreaInput = document.getElementById("xyz");
    var submitBtn = document.getElementById("submitbtn");

    form.addEventListener("submit", submitted);
    form.addEventListener("reset", resetFunc);

    // Hide drink checkbox and text area initially
    checkBoxDiv.style.display = "none";
    textAreaDiv.style.display = "none";
    submitBtn.disabled = true; // Initially disable the submit button

    // Function to show/hide checkbox and textarea
    function handleDrinkSelection() {
        var selectedDrink = drinkDropdown.value;

        if (selectedDrink !== "--Please choose a drink--") {
            checkBoxDiv.style.display = "block"; // Show checkbox
            checkboxSelectValue.checked = false; // Uncheck checkbox initially
            spanTag.innerHTML = selectedDrink; // Update checkbox label with drink name
            textAreaDiv.style.display = "none"; // Hide text area initially
            textAreaInput.value = ""; // Clear text area
        } else {
            checkBoxDiv.style.display = "none"; // Hide checkbox
            textAreaDiv.style.display = "none"; // Hide text area
            checkboxSelectValue.checked = false;
        }

        checkSubmitButtonStatus();
    }

    // Show/hide textarea when checkbox is checked
    checkboxSelectValue.addEventListener("change", function () {
        textAreaDiv.style.display = this.checked ? "block" : "none";
        checkSubmitButtonStatus();
    });

    // Attach event listener to the dropdown
    drinkDropdown.addEventListener("change", handleDrinkSelection);

    // Validate and enable submit button only when all required fields are filled
    function checkSubmitButtonStatus() {
        var validFirstName = document.getElementById("firstName").value.trim().match(/^[a-zA-Z]+$/);
        var validLastName = document.getElementById("lastName").value.trim().match(/^[a-zA-Z]+$/);
        var validEmail = document.getElementById("emailId").value.trim().match(/([\w\.]+)@(northeastern+)\.(edu)/);
        var validContact = document.getElementById("phoneNumber").value.trim().match(/^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/);
        var validZipcode = document.getElementById("zipcode").value.trim().match(/^[0-9]{5}(?:-[0-9]{4})?$/);
        var drinkSelected = drinkDropdown.value !== "--Please choose a drink--";
        var drinkCheckboxChecked = checkboxSelectValue.checked;
        var validComments = document.getElementById("comments").value.trim().length >= 5 &&
                            document.getElementById("comments").value.trim().length <= 20;

        if (validFirstName && validLastName && validEmail && validContact && validZipcode &&
            drinkSelected && drinkCheckboxChecked && validComments) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Attach validation event listeners
    document.getElementById("firstName").addEventListener("input", checkSubmitButtonStatus);
    document.getElementById("lastName").addEventListener("input", checkSubmitButtonStatus);
    document.getElementById("emailId").addEventListener("input", checkSubmitButtonStatus);
    document.getElementById("phoneNumber").addEventListener("input", checkSubmitButtonStatus);
    document.getElementById("zipcode").addEventListener("input", checkSubmitButtonStatus);
    document.getElementById("comments").addEventListener("input", checkSubmitButtonStatus);

    // Handle form submission
    function submitted(e) {
        e.preventDefault();

        if (!submitBtn.disabled) {
            alert("Data Saved Successfully");
            var table = document.getElementById("table");
            var row = table.insertRow(-1);
            var title = row.insertCell(0);
            var firstName = row.insertCell(1);
            var lastName = row.insertCell(2);
            var emailId = row.insertCell(3);
            var phoneNumber = row.insertCell(4);
            var address1 = row.insertCell(5);
            var address2 = row.insertCell(6);
            var city = row.insertCell(7);
            var state = row.insertCell(8);
            var zipcode = row.insertCell(9);
            var hear = row.insertCell(10);
            var comments = row.insertCell(11);
            var drinkDesc = row.insertCell(12);

            title.innerHTML = document.querySelector('input[name="title"]:checked')?.value || "N/A";
            firstName.innerHTML = document.getElementById("firstName").value;
            lastName.innerHTML = document.getElementById("lastName").value;
            emailId.innerHTML = document.getElementById("emailId").value;
            phoneNumber.innerHTML = document.getElementById("phoneNumber").value;
            address1.innerHTML = document.getElementById("Address1").value;
            address2.innerHTML = document.getElementById("Address2").value;
            city.innerHTML = document.getElementById("city").value;
            state.innerHTML = document.getElementById("state").value;
            zipcode.innerHTML = document.getElementById("zipcode").value;

            var checkedBoxes = document.querySelectorAll('input[name="link"]:checked');
            var checkedValues = Array.from(checkedBoxes).map(cb => cb.value).join(", ");
            hear.innerHTML = checkedValues;

            comments.innerHTML = document.getElementById("comments").value;
            drinkDesc.innerHTML = textAreaInput.value || "No description provided";

            form.reset();
            handleDrinkSelection(); // Reset drink selection
            checkSubmitButtonStatus(); // Revalidate form
        } else {
            alert("Please enter correct details");
        }
    }

    // Reset form and validation
    function resetFunc() {
        form.reset();
        checkBoxDiv.style.display = "none";
        textAreaDiv.style.display = "none";
        checkboxSelectValue.checked = false;
        textAreaInput.value = "";
        submitBtn.disabled = true;
    }
});
