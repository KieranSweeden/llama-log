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
                })
                break;
        }
    });
}

function testEmail(inputField){
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Check current validity
    let isValid = inputField.checkValidity();

    if(isValid){
        // If Valid, clear error message
        updateFormErrorMessage(inputField, "");
        // present success border color
        updateFieldBorder(inputField, true);
        // present success icon
        updateStatusIcon(inputField, true);
    } else if (!isValid){
        // If invalid, display error message
        updateFormErrorMessage(inputField, "Please enter a valid email.");
        // present error border colour
        updateFieldBorder(inputField, false);
        //  present error icon
        updateStatusIcon(inputField, false);
    }
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
