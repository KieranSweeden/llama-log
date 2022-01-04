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
    let currentValidity = inputField.checkValidity();

    if(currentValidity){
        // If Valid, clear error message
        updateFormErrorMessage(inputField, "");
        // & present success colours
        updateFieldBorder(inputField, "valid");
        updateStatusIcon(inputField, "valid");
    } else if (!currentValidity){
        // If invalid, display error message
        updateFormErrorMessage(inputField, "Please enter a valid email.");
        // & present error colours
        updateFieldBorder(inputField, "invalid");
        updateStatusIcon(inputField, "invalid");
    }
}

function updateFormErrorMessage(inputField, message){
    // Grab element containing error message
    let errorMessageElement = inputField.closest(".field").querySelector(".help");

    // Update the text content within error message element
    errorMessageElement.textContent = message;
}

function updateFieldBorder(inputField, status){

    // Clear input class
    inputField.className = "input";

    if(status === "invalid"){
        inputField.classList.add("is-danger");
    } else if (status === "valid"){
        inputField.classList.add("is-success");
    }
}

function updateStatusIcon(inputField, status){
    // Grab status icon within field
    let statusIcon = [...inputField.parentElement.getElementsByTagName("span")][1].firstElementChild;

    // Set icon type & it's color based on validity
    if(status === "invalid"){
        statusIcon.className = "fas fa-exclamation-triangle has-text-danger";
    } else if (status === "valid"){
        statusIcon.className = "fas fa-check has-text-success";
    }
}
