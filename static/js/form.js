// This JS file contains code related to forms within Llama Log

// When page loads...
document.addEventListener("DOMContentLoaded", function () {
    // Grab input fields within form
    let inputFields = [...document.getElementsByTagName("input")];

    // If a text area exists, add it to input fields array
    if ([...document.getElementsByTagName("textarea")][0]){
        inputFields.push([...document.getElementsByTagName("textarea")][0]);
    }

    if (inputFields.length >= 1){

        // Add event listeners for each form
        addListeners(inputFields);

        // As long as page is not add new user page
        let currentPage = window.location.pathname;

        // If the page is the account or edit user page
        if(currentPage.includes("account") || currentPage.includes("edit_user") || currentPage.includes("log_in") || currentPage.includes("edit_post") || currentPage.includes("update_comment")){
            // Asses the validity of fields on load
            assessValidityOnLoad(inputFields);
        }
    }

    // Grab progress bar
    let progressBar = [...document.getElementsByTagName("progress")][0];

    // If progress bar exists
    if (progressBar) {
        // Assess the amount of valid fields on page & update
        updateProgressBar();
    }

});

function assessValidityOnLoad(inputFields){
    // Assess the validity for each input field
    inputFields.forEach(inputField => {
        switch(inputField.id){
            case "email":
                testEmail(inputField, inputFields);
                break;
            case "first_name":
                testName(inputField);
                break;
            case "last_name":
                testName(inputField);
                break;
            case "dob":
                testDate(inputField);
                break;
            case "phone":
            case "customer_phone":
                testPhone(inputField);
                break;
            case "title":
            case "equipment":
            case "customer_name":
            case "description":
                testTextLimit(inputField, inputFields);
                break;
            case "was_customer_involved":
                inputField.addEventListener("change", updateProgressBar);
                break;
        }
    })
}

function addListeners(inputFields){
    // Loop through input fields & attach relevant listeners
    inputFields.forEach(inputField => {
        switch(inputField.id){
            case "email":
                inputField.addEventListener("input", (event) => {
                    testEmail(event.target, inputFields);
                });
                break;
            case "first_name":
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
            case "customer_phone":
                inputField.addEventListener("input", (event) => {
                    testPhone(event.target);
                });
                break;
            case "password":
                inputField.addEventListener("input", (event) => {
                    testPassword(event.target, inputFields);
                });
                break;
            case "repeat_password":
                inputField.addEventListener("input", (event) => {
                    testRepeatPassword(event.target);
                });
                break;
            case "title":
            case "equipment":
            case "customer_name":
            case "description":
            case "content":
                inputField.addEventListener("input", (event) => {
                    testTextLimit(event.target, inputFields);
                });
                break;
            case "was_customer_involved":
                inputField.addEventListener("change", updateProgressBar);
                break;
        }
    });
}

function testTextLimit(inputField, inputFields){

    if (inputField.checkValidity()) {
        inputField.setCustomValidity("");
        // If user input is valid, ensure error message is clear
        updateFieldDesignToSuccess(inputField);

        // If there is only one input, enable form button
        if (inputFields.length === 1){
            updateFormButton(true);
        }
    } else {
        inputField.setCustomValidity("");
        // If user input is valid, ensure error message is clear
        updateFieldDesignToError(inputField, "Please provide more detail.");
        // If there is only one input, enable form button
        if (inputFields.length === 1){
            updateFormButton(false);
        }
    }

    // If a progress bar exists on the page
    if ([...document.getElementsByTagName("progress")][0]){
        // Update progress bar
        updateProgressBar();
    }
}

function updateProgressBar(){
    // Grab progress bar
    let progressBar = [...document.getElementsByClassName("progress")][0];

    // Grab all fields
    let inputFields = [...document.getElementsByTagName("input")];

    // Attempt to grab customer involved container
    let customerInvolvedContainer = document.getElementById("customer-involved-fields");

    // If customer involved fields exists & are hidden, remove them from the input fields
    if (customerInvolvedContainer){
        if (customerInvolvedContainer.classList.contains("is-hidden")){
            inputFields = inputFields.filter(inputField => inputField.id === "title" || inputField.id === "description")
        } else {
            inputFields = inputFields.filter(inputField => inputField.id === "title" || inputField.id === "description" || inputField.id === "customer_name" || inputField.id === "customer_phone")
        }
    }

    // If a text area exists, add it to input fields array
    if ([...document.getElementsByTagName("textarea")][0]){
        inputFields.push([...document.getElementsByTagName("textarea")][0]);
    }

    if(inputFields.at(-1).type === "checkbox"){
        // Filter out checkbox
        inputFields.pop();
    }

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

    // If a progress bar exists on the page
    if ([...document.getElementsByTagName("progress")][0]){
        // Update progress bar
        updateProgressBar();
    }
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

    // If a progress bar exists on the page
    if ([...document.getElementsByTagName("progress")][0]){
        // Update progress bar
        updateProgressBar();
    }
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

    // If a progress bar exists on the page
    if ([...document.getElementsByTagName("progress")][0]){
        // Update progress bar
        updateProgressBar();
    }
}

function testEmail(inputField, inputFields){
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Check current validity
    let isValid = inputField.checkValidity();

    if(inputField.value === ""){
        // If input is the only one on the page
        if (inputFields.length === 1){
            // Disable the form button
            updateFormButton(false);
        }

    } else if (isValid){
        // If Valid
        inputField.setCustomValidity("");
        // clear error message
        updateFieldDesignToSuccess(inputField);
        
        // If input is the only one on the page
        if (inputFields.length === 1){
            // Enable the form button
            updateFormButton(true);
        }

    } else if (!isValid){
        inputField.setCustomValidity("Please enter a valid email.");
        // If invalid, display error styling & message
        updateFieldDesignToError(inputField, "Please enter a valid email.");

        // If input is the only one on the page
        if (inputFields.length === 1){
            // Disable the form button
            updateFormButton(false);
        }
    }

    // If a progress bar exists on the page
    if ([...document.getElementsByTagName("progress")][0]){
        // Update progress bar
        updateProgressBar();
    }
}

function testPassword(inputField, inputFields){
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Check current validity
    let isValid = inputField.checkValidity();

    if (isValid){
        // clear error message
        updateFieldDesignToSuccess(inputField);

        if (inputFields.length === 1) {
            // Enable form submission
            updateFormButton(true);
        }
        
    } else if (!isValid){
        // If invalid, display error styling & message
        updateFieldDesignToError(inputField, "Input is empty, please enter a password.");

        if (inputFields.length === 1) {
            // Disable form submission
            updateFormButton(false);
        }
    }
}

function testRepeatPassword(inputField) {
    // Ensure old message is cleared
    inputField.setCustomValidity('');

    // Grab first password creation attempt
    let firstPasswordInput = [...document.getElementsByTagName("input")][0];

    // If passwords match
    if (inputField.value === firstPasswordInput.value){
        // clear error message
        updateFieldDesignToSuccess(inputField);

        // Enable form submission
        updateFormButton(true);        

    } else if (inputField.value !== firstPasswordInput.value){
        // Else if passwords do not match

        // display error styling & message
        updateFieldDesignToError(inputField, "The passwords must match.");

        // Disable form submission
        updateFormButton(false);
    }
}

function updateFieldDesignToSuccess(inputField){
    // Ensure error message is clear
    updateFormErrorMessage(inputField, "");

    // present success border color
    updateFieldBorder(inputField, true);

    if (inputField.tagName !== "TEXTAREA"){
        // present success icon
        updateStatusIcon(inputField, true);
    }
}

function updateFieldDesignToError(inputField, message){
    // Display error message
    updateFormErrorMessage(inputField, message);

    // present error border colour
    updateFieldBorder(inputField, false);

    if (inputField.tagName !== "TEXTAREA"){
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
    // Clear classes to base bulma classes
    if (inputField.tagName === "INPUT"){
        inputField.className = "input";
    } else if (inputField.tagName === "TEXTAREA"){
        inputField.className = "textarea";
    }

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
