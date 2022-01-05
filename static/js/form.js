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
            case "dob":
                // Set max limit to today's date - 16 years
                setDateOfBirthLimits(inputField);
                inputField.addEventListener("change", (event) => {
                    testDate(event.target);
                });
                break;
            case "phone":
                inputField.addEventListener("change", (event) => {
                    testPhone(event.target);
                });
                break;
        }
    });
}

function updateProgressBar(){
    // Grab progress bar
    let progressBar = [...document.getElementsByClassName("progress")][0];

    // Grab all fields
    let inputFields = [...document.getElementsByTagName("input")];

    // Filter out checkbox
    inputFields.pop();

    // Init empty array to store valid input fields
    let validFields = [];

    // Loop through each required field on page
    inputFields.forEach(inputField => {
        // Check input's validity
        let isValid = inputField.checkValidity();

        // If input is valid & input is not already included
        if (isValid && !validFields.includes(inputField)){
            // Insert input field into valid fields array
            validFields.push(inputField);
        } else if (!isValid && validFields.includes(inputField)){
            validFields.pop(inputField);
        }
    });

    // Determine the percentage of valid fields
    let percentageOfValidFields = (validFields.length / inputFields.length) * 100;

    // Set value attribute of progress bar to percentage
    progressBar.setAttribute("value", percentageOfValidFields);

    // If percentage is 100, enable the user to submit
    if (percentageOfValidFields === 100){
        updateFormButton(true);
    } else {
        updateFormButton(false)
    }
}

function updateFormButton(toBeEnabled){
    // Grab buttons
    let submitButton = [...document.getElementsByClassName("button")].filter(button => button.getAttribute("type") === "submit")[0];

    // If submit button is to be enabled, remove disabled attribute
    if (toBeEnabled) {
        submitButton.disabled = false;
    } else if (!toBeEnabled) {
        submitButton.disabled = true;
    }
}

function testPhone(inputField){
    // Create UK phone number based regex
    // Regex code taken from https://stackoverflow.com/a/66516460/15607265
    let phoneRegex = new RegExp(/^((\+44)|(0)) ?\d{4} ?\d{6}$/);

    // Store test result
    let isValid = phoneRegex.test(inputField.value);

    // Update field design based on validity
    if(isValid){
        inputField.setCustomValidity("");
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        inputField.setCustomValidity("Please enter a UK based number containing 11 digits.");
        updateFieldDesignToError(inputField, "Please enter a UK based number containing 11 digits.")
    }

    // Update progress bar
    updateProgressBar();
}

function setDateOfBirthLimits(inputField){
    // Create variables that will store date
    let today, day, month, year;

    // Store max date of birth a user can be
    today = new Date();
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear(); // User needs to be 16 and over

    // Add a 0 before number if day in double digits
    if (day < 10){
        day = "0" + day;
    }

    // Add a 0 before number if month in double digits
    if(month < 10){
        month = "0" + month;
    }

    // Set max & min date of birth limit
    let minLimit = (year - 80) + "-" + month + "-" + day;
    let maxLimit = (year - 16) + "-" + month + "-" + day;

    // Grab date min & max attribute of input field and set it to date limit
    inputField.setAttribute("min", minLimit);
    inputField.setAttribute("max", maxLimit);
}

function testDate(inputField){
    // Check validity of user input
    let isValid = inputField.checkValidity();

    // Depending on validity, update fields design
    if(isValid){
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        updateFieldDesignToError(inputField, "User should be between 16 & 80 years old.")
    }

    // Update progress bar
    updateProgressBar();
}

function testName(inputField){
    // Store name specific regex
    // Regex code taken from https://stackoverflow.com/a/46665046/15607265
    let nameRegex = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/, "i");

    // Store test result of user's input
    let isValid = nameRegex.test(inputField.value);

    // Update input field design based on user input result
    if(isValid){
        inputField.setCustomValidity("");
        // If user input is valid, ensure error message is clear
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        inputField.setCustomValidity("Please enter a valid name.");
        // If user input is invalid, display error styling & message
        updateFieldDesignToError(inputField, "Please enter a valid name.");
    }

    // Update progress bar
    updateProgressBar();
}

function testEmail(inputField){
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Check current validity
    let isValid = inputField.checkValidity();

    if(isValid){
        // If Valid
        inputField.setCustomValidity("");
        // clear error message
        updateFieldDesignToSuccess(inputField);
    } else if (!isValid){
        inputField.setCustomValidity("Please enter a valid email.");
        // If invalid, display error styling & message
        updateFieldDesignToError(inputField, "Please enter a valid email.");
    }

    // Update progress bar
    updateProgressBar();
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
