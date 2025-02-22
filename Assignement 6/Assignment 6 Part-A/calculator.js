// $(document).ready(function () {
//     const username = localStorage.getItem("username");
//     $("#loggedInUser").text(username);
  
//     const validateInputs = () => {
//       const num1 = $("#num1").val();
//       const num2 = $("#num2").val();
//       let isValid = true;
  
//       if (!num1 || isNaN(num1)) {
//         $("#num1Error").text("Please enter a valid number.").show();
//         isValid = false;
//       } else {
//         $("#num1Error").hide();
//       }
  
//       if (!num2 || isNaN(num2)) {
//         $("#num2Error").text("Please enter a valid number.").show();
//         isValid = false;
//       } else {
//         $("#num2Error").hide();
//       }
  
//       return isValid;
//     };
  
//     const calculate = (operation) => {
//       if (!validateInputs()) return;
  
//       const num1 = parseFloat($("#num1").val());
//       const num2 = parseFloat($("#num2").val());
//       let result;
  
//       switch (operation) {
//         case "add":
//           result = num1 + num2;
//           break;
//         case "subtract":
//           result = num1 - num2;
//           break;
//         case "multiply":
//           result = num1 * num2;
//           break;
//         case "divide":
//           result = num1 / num2;
//           break;
//         default:
//           result = NaN;
//       }
  
//       $("#result").val(isNaN(result) ? "Invalid operation" : result);
//     };
  
//     $("#add").click(() => calculate("add"));
//     $("#subtract").click(() => calculate("subtract"));
//     $("#multiply").click(() => calculate("multiply"));
//     $("#divide").click(() => calculate("divide"));
//   });

// $(document).ready(() => {
//     // Display the logged-in username
//     const username = localStorage.getItem("username");
//     $("#loggedInUser").text(username || "Guest");

//     // Validation function
//     const validateInputs = () => {
//         let isValid = true;

//         // Reset error messages
//         $(".error").hide();

//         // Validate Number 1
//         const num1 = $("#num1").val().trim();
//         if (!num1) {
//             $("#num1Error").text("Number 1 cannot be empty.").show();
//             isValid = false;
//         } else if (isNaN(num1)) {
//             $("#num1Error").text("Number 1 must be a valid number.").show();
//             isValid = false;
//         } else if (!isFinite(num1)) {
//             $("#num1Error").text("Number 1 cannot be infinite.").show();
//             isValid = false;
//         }

//         // Validate Number 2
//         const num2 = $("#num2").val().trim();
//         if (!num2) {
//             $("#num2Error").text("Number 2 cannot be empty.").show();
//             isValid = false;
//         } else if (isNaN(num2)) {
//             $("#num2Error").text("Number 2 must be a valid number.").show();
//             isValid = false;
//         } else if (!isFinite(num2)) {
//             $("#num2Error").text("Number 2 cannot be infinite.").show();
//             isValid = false;
//         }

//         return isValid;
//     };

//     // Single arrow function for all operations
//     const calculate = (operation) => {
//         if (!validateInputs()) return;

//         const num1 = parseFloat($("#num1").val());
//         const num2 = parseFloat($("#num2").val());
//         let result;

//         switch (operation) {
//             case "add":
//                 result = num1 + num2;
//                 break;
//             case "subtract":
//                 result = num1 - num2;
//                 break;
//             case "multiply":
//                 result = num1 * num2;
//                 break;
//             case "divide":
//                 result = num2 === 0 ? "Cannot divide by zero" : num1 / num2;
//                 break;
//             default:
//                 result = "Invalid operation";
//         }

//         $("#result").val(result);
//     };

//     // Event listeners for buttons
//     $("#add").click(() => calculate("add"));
//     $("#subtract").click(() => calculate("subtract"));
//     $("#multiply").click(() => calculate("multiply"));
//     $("#divide").click(() => calculate("divide"));
// });



$(document).ready(() => {
    // Display the logged-in username
    const username = localStorage.getItem("username");
    $("#loggedInUser").text(username || "Guest");

    // Validate Number 1 individually
    $("#num1").on("input blur", () => {
        const num1 = $("#num1").val().trim();
        const num1Error = $("#num1Error");

        num1Error.hide(); // Hide error message initially

        if (!num1) {
            num1Error.text("Number 1 cannot be empty.").show();
        } else if (isNaN(num1)) {
            num1Error.text("Number 1 must be a valid number.").show();
        } else if (!isFinite(num1)) {
            num1Error.text("Number 1 cannot be infinite.").show();
        }
    });

    // Validate Number 2 individually
    $("#num2").on("input blur", () => {
        const num2 = $("#num2").val().trim();
        const num2Error = $("#num2Error");

        num2Error.hide(); // Hide error message initially

        if (!num2) {
            num2Error.text("Number 2 cannot be empty.").show();
        } else if (isNaN(num2)) {
            num2Error.text("Number 2 must be a valid number.").show();
        } else if (!isFinite(num2)) {
            num2Error.text("Number 2 cannot be infinite.").show();
        }
    });

    // Single arrow function for all operations
    const calculate = (operation) => {
        // Validate both fields before calculation
        const num1 = $("#num1").val().trim();
        const num2 = $("#num2").val().trim();
        let isValid = true;

        // Validate Number 1
        if (!num1) {
            $("#num1Error").text("Number 1 cannot be empty.").show();
            isValid = false;
        } else if (isNaN(num1)) {
            $("#num1Error").text("Number 1 must be a valid number.").show();
            isValid = false;
        } else if (!isFinite(num1)) {
            $("#num1Error").text("Number 1 cannot be infinite.").show();
            isValid = false;
        }

        // Validate Number 2
        if (!num2) {
            $("#num2Error").text("Number 2 cannot be empty.").show();
            isValid = false;
        } else if (isNaN(num2)) {
            $("#num2Error").text("Number 2 must be a valid number.").show();
            isValid = false;
        } else if (!isFinite(num2)) {
            $("#num2Error").text("Number 2 cannot be infinite.").show();
            isValid = false;
        }

        // If validation fails, stop calculation
        if (!isValid) return;

        // Perform calculation
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);
        let result;

        switch (operation) {
            case "add":
                result = number1 + number2;
                break;
            case "subtract":
                result = number1 - number2;
                break;
            case "multiply":
                result = number1 * number2;
                break;
            case "divide":
                result = number2 === 0 ? "Cannot divide by zero" : number1 / number2;
                break;
            default:
                result = "Invalid operation";
        }

        $("#result").val(result);
    };

    // Event listeners for buttons
    $("#add").click(() => calculate("add"));
    $("#subtract").click(() => calculate("subtract"));
    $("#multiply").click(() => calculate("multiply"));
    $("#divide").click(() => calculate("divide"));
});