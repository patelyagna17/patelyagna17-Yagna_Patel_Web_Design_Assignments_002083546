$(document).ready(function () {
  let emailTouched = false;
  let usernameTouched = false;
  let passwordTouched = false;
  let confirmPasswordTouched = false;

  // Disable the login button initially
  $("#loginButton").prop("disabled", true);

  // Helper functions for validation
  const validateEmail = (email) => /^[\w\.]+@northeastern\.edu$/.test(email);
  const validateUsername = (username) => /^[a-zA-Z]+$/.test(username);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // Validate Email Field
  const validateEmailField = () => {
    const email = $("#email").val();
    if (emailTouched && !validateEmail(email)) {
      $("#emailError").text("Please enter a valid Northeastern email.").show();
      return false;
    } else {
      $("#emailError").hide();
      return true;
    }
  };

  // Validate Username Field
  const validateUsernameField = () => {
    const username = $("#username").val();
    if (usernameTouched && !validateUsername(username)) {
      $("#usernameError").text("Username must contain only letters.").show();
      return false;
    } else {
      $("#usernameError").hide();
      return true;
    }
  };

  // Validate Password Field
  const validatePasswordField = () => {
    const password = $("#password").val();
    if (passwordTouched && !validatePassword(password)) {
      $("#passwordError").text("Password must be at least 8 characters with one uppercase, one lowercase, and one number.").show();
      return false;
    } else {
      $("#passwordError").hide();
      return true;
    }
  };

  // Validate Confirm Password Field
  const validateConfirmPasswordField = () => {
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();
    if (confirmPasswordTouched && password !== confirmPassword) {
      $("#confirmPasswordError").text("Passwords do not match.").show();
      return false;
    } else {
      $("#confirmPasswordError").hide();
      return true;
    }
  };

  // Attach input events to validate fields in real-time
  $("#email").on("input", function () {
    emailTouched = true;
    validateEmailField();
    validateForm(); // Revalidate the form after each input
  });

  $("#username").on("input", function () {
    usernameTouched = true;
    validateUsernameField();
    validateForm();
  });

  $("#password").on("input", function () {
    passwordTouched = true;
    validatePasswordField();
    validateForm();
  });

  $("#confirmPassword").on("input", function () {
    confirmPasswordTouched = true;
    validateConfirmPasswordField();
    validateForm();
  });

  // Validate the entire form and enable/disable the login button
  const validateForm = () => {
    const isValid =
      emailTouched &&
      usernameTouched &&
      passwordTouched &&
      confirmPasswordTouched &&
      validateEmailField() &&
      validateUsernameField() &&
      validatePasswordField() &&
      validateConfirmPasswordField();

    // Enable or disable the button based on form validity
    $("#loginButton").prop("disabled", !isValid);
  };

  // Store username and redirect on button click
  $("#loginButton").click(function () {
    const username = $("#username").val();
    localStorage.setItem("username", username);
    window.location.href = "calculator.html";
  });
});  

