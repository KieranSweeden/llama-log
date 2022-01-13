// Within this file, is the code relating to tooltips using Tippy.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Grab question mark icons & apply tippy tooltip instances to each of them
    const tooltips = tippy([...document.getElementsByClassName('fas fa-question-circle')]);
    
    // Insert description content for each tooltip
    insertTooltipStylingAndContent(tooltips);

    // Attempt to grab customer involved radio buttons
    let radioButtons = [...document.getElementsByName("was_customer_involved")];

    // If customer involved orietned radio buttons exist, add popups
    if(radioButtons.length > 0){
        addCustomerInvolvedPopups(radioButtons, tooltips);
    }
});

function addCustomerInvolvedPopups(radioButtons, tooltips){
    // Add click event listener to each radio button
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener("click", (event) => {
            insertTooltipStylingAndContent(tooltips);
        });
    });
}


function insertTooltipStylingAndContent(tooltips){

    // Find out what page is currently loaded
    let currentPage = window.location.pathname;

    // Apply content to each tooltip
    tooltips.forEach(tooltip => {

        // Set llama log appearance to each tooltip
        tooltip.props.placement = "right";
        tooltip.props.theme = "llama-log";

        // Get label text content associated with tooltip
        let tooltipLabel = tooltip.reference.parentElement.innerText;

        // Set tooltip content based on label tooltip associated with
        tooltip.setContent(getTooltipDescription(tooltipLabel, currentPage));
    });
}

function getTooltipDescription(type, currentPage){
    // Create empty object to store descriptions
    let tooltipDescriptions = {};

    if (currentPage.includes("create_user")){
        // For create new user form
        tooltipDescriptions = {
            "First Name": "The user's first name will be attached to the user's posts & comments.",
            "Last Name": "The user's last name will be attached to the user's posts & comments.",
            "Date of Birth": "The user's date of birth will not be publicly available as it's for data collection purposes only.",
            "Phone": "The user's phone number will only be accessed for emergency purposes.",
            "Email": "The user will need an email to sign in to Llama Log.",
            "Provide this user with admin credentials": "If checked, this user will be able to edit/delete all posts, comments & user accounts.",
            "Create New User": "Here you can create a new user. All fields are required except for the admin checkbox, which is optional. The new user will create their password when they first sign in."
        };
    } else if (currentPage.includes("edit_user")) {
        // For edit user form
        tooltipDescriptions = {
            "First Name": "The user's first name will be attached to the user's posts & comments.",
            "Last Name": "The user's last name will be attached to the user's posts & comments.",
            "Date of Birth": "The user's date of birth will not be publicly available as it's for data collection purposes only.",
            "Phone": "The user's phone number will only be accessed for emergency purposes.",
            "Email": "The user will need an email to sign in to Llama Log.",
            "Provide this user with admin credentials": "If checked, this user will be able to edit/delete all posts, comments & user accounts."
        };

        // Grab title on page
        let title = [...document.getElementsByTagName("h2")][0];

        // Set tooltip for title
        tooltipDescriptions[title.innerText] = "Here you can edit this user's account. All fields are required except for the admin checkbox which is optional.";

    } else if (currentPage.includes("account")) {
        // For account page
        tooltipDescriptions = {
            "First Name": "Your first name will be attached to the user's posts & comments.",
            "Last Name": "Your last name will be attached to the user's posts & comments.",
            "Date of Birth": "Your date of birth will not be publicly available as it's for data collection purposes only.",
            "Phone": "Your phone number will only be accessed for emergency purposes.",
            "Email": "You will need an email to sign in to Llama Log.",
            "My Account": "Here you can make changes to your account. You can also reset your own password."
        };
    } else if (currentPage.includes("log_in")){
        // For log in page if user visits it rather than default routed to it
        tooltipDescriptions = {
            "Email": "Use the email given to you by an admin to sign in. (For accessor: Credentials are found in project submission)",
            "Llama Log": "Llama Log is an application that enables colleagues to communicate efficiently & effectively through the use of posts and comments."
        };
    } else if (currentPage.includes("password")){
        // For password page
        tooltipDescriptions = {
            "Password": "Enter the password you've previously created to sign in.",
            "Create New Password": "Enter a new password and make sure to include various characters to increase security.",
            "Re-Enter Password": "Re-enter the password you recently created within the input box above.",
            "Llama Log": "Llama Log is an application that enables colleagues to communicate efficiently & effectively through the use of posts and comments."
        };
    } else if (currentPage.includes("create_post") || currentPage.includes("edit_post")){

        // Find out if form is an incident or work order using text contents within heading
        let formType = ([...document.getElementsByTagName("h2")][0].innerText.includes("Work Order")) ? "Work Order" : "Incident";

        if (formType === "Work Order"){
            // For work order forms
            tooltipDescriptions = {
                "Title": "Provide a brief title for the work order post. (Limit: 50 Characters)", 
                "Equipment": "Insert what equipment the work order is for. (Limit: 50 Characters)", 
                "Description": "Provide a detailed description of the work order. (Limit: 500 Characters)",
                "Create Work Order Post": "This is where you can create a new work order post. Make sure you provide the name of the equipment you're referring to.",
                "Edit Work Order": "This is where you can edit a work order post you've previously made. Make sure you provide the name of the equipment you're referring to."
            };
        } else if (formType === "Incident"){
            // For incident forms
            tooltipDescriptions = {
                "Title": "Provide a brief title for the incident post. (Limit: 50 Characters)", 
                "Was A Customer Involved?": "If a customer was involved in any way, select yes.",
                "Customer Name": "Insert the customer's full name. (Limit: 50 Characters)",
                "Customer Phone": "Insert the customer's phone number, so we're able to contact them if necessary.",
                "Description": "Provide a detailed description of the incident. (Limit: 500 Characters)",
                "Create Incident Post": "This is where you can create an incident post. Make sure to include a customer name & number if one is involved.",
                "Edit Incident": "This is where you can edit an incident post you've previously made. Make sure to include a customer name & number if one is involved."

            };
        }
    } else if (currentPage.includes("view_post") || currentPage.includes("update_comment")){
        // For pages containing comments
        tooltipDescriptions = {
            "Comment": "Insert a comment to the post currently being viewed. (Limit: 250 Characters)",
            "Viewing Incident": "You're currently viewing an incident, which can sometimes involve a customer. If so, the customer's info should be displayed.",
            "Viewing Work Order": "You're currently viewing a work order. This involves a piece of equipment which should be displayed within the post.",
            "Editing Comment": "This is where you can edit & update a comment you've already posted.",
            "Work Order": "Work orders hold information regarding how a piece of equipment or hardware is broken.",
            "Incident": "Incidents hold information about staff or customer related problems in the workplace."
        };
    } else if (currentPage.includes("feed")) {
        // For feed page
        tooltipDescriptions = {
            "Feed": "This is your feed, a place where stored work order & incident posts can be viewed & filtered.",
            "Work Order": "Work orders hold information regarding how a piece of equipment or hardware is broken.",
            "Incident": "Incidents hold information about staff or customer related problems in the workplace."
        };
    } else if (currentPage.includes("manage")) {
        // For manage users page
        tooltipDescriptions = {
            "Manage Users": "Here is a list of users who currently have accounts within Llama Log. You're able to reset their passwords and edit or delete their accounts."
        };
    } else {
        // For default log in route when opening application
        tooltipDescriptions = {
            "Email": "Use the email given to you by an admin to sign in. (For accessor: Credentials are found in project submission)",
            "Llama Log": "Llama Log is an application that enables colleagues to communicate efficiently & effectively through the use of posts and comments."
        };
    }

    // Return tooltip description associated with type given
    return tooltipDescriptions[type];
}