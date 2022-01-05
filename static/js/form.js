// This JS file contains code related to forms within Llama Log

// When page loads...
document.addEventListener("DOMContentLoaded", function () {
    // Grab input fields within form
    let inputFields = [...document.getElementsByTagName("input")];

    // If input fields exist
    if (inputFields.length > 0){
        // Add event listeners for each form
        addListeners(inputFields);
    }

});

function addListeners(inputFields){
    // Loop through input fields & attach relevant listeners
    inputFields.forEach(inputField => {
        switch(inputField.id){
            case "email":
                inputField.addEventListener("input", (event) => {
                    testEmail(event.target);
                });
                break;
            case "first_name":
                inputField.addEventListener("change", (event) => {
                    testName(event.target);
                });
                break;
            case "last_name":
                inputField.addEventListener("change", (event) => {
                    testName(event.target);
                });
                break;
        }
    });
}

function testName(inputField){
    // Store name specific regex
    // regex taken from https://stackoverflow.com/a/46665046/15607265
    let nameRegex = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/, "i");

    // Store test result of user's input
    let isValid = nameRegex.test(inputField.value);

    // Update input field design based on user input result
    if(isValid){
        // If user input is valid, ensure error message is clear
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        // If user input is invalid, display error styling & message
        updateFieldDesignToError(inputField, "Please enter a valid name.");
    }
}

function testEmail(inputField){
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Check current validity
    let isValid = inputField.checkValidity();

    if(isValid){
        // If Valid, clear error message
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        // If invalid, display error styling & message
        updateFieldDesignToError(inputField, "Please enter a valid email.");
    }
}

function updateFieldDesignToSuccess(inputField){
    // Ensure error message is clear
    updateFormErrorMessage(inputField, "");
    // present success border color
    updateFieldBorder(inputField, true);
    // present success icon
    updateStatusIcon(inputField, true);
}

function updateFieldDesignToError(inputField, message){
    // Display error message
    updateFormErrorMessage(inputField, message);
    // present error border colour
    updateFieldBorder(inputField, false);
    //  present error icon
    updateStatusIcon(inputField, false);
}

function updateFormErrorMessage(inputField, message){
    // Grab element containing error message
    let errorMessageElement = inputField.closest(".field").querySelector(".help");

    // Update the text content within error message element
    errorMessageElement.textContent = message;
}

function updateFieldBorder(inputField, isValid){

    // Clear input class
    inputField.className = "input";

     // Set input border colour based on validitity
    if(isValid === false){
        inputField.classList.add("is-danger");
    } else if (isValid === true){
        inputField.classList.add("is-success");
    }
}

function updateStatusIcon(inputField, isValid){
    // Grab status icon within field
    let statusIcon = [...inputField.parentElement.getElementsByTagName("span")][1].firstElementChild;

    // Set icon type & it's color based on validity
    if(isValid === false){
        statusIcon.className = "fas fa-exclamation-triangle has-text-danger";
    } else if (isValid === true){
        statusIcon.className = "fas fa-check has-text-success";
    }
}
