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
})

function addCustomerInvolvedPopups(radioButtons, tooltips){
    // Add click event listener to each radio button
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener("click", (event) => {
            insertTooltipStylingAndContent(tooltips);
        })
    })
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
            "Provide this user with admin credentials": "If checked, this user will be able to edit/delete all posts, comments & user accounts."
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
    } else if (currentPage.includes("account")) {
        // For account page
        tooltipDescriptions = {
            "First Name": "Your first name will be attached to the user's posts & comments.",
            "Last Name": "Your last name will be attached to the user's posts & comments.",
            "Date of Birth": "Your date of birth will not be publicly available as it's for data collection purposes only.",
            "Phone": "Your phone number will only be accessed for emergency purposes.",
            "Email": "You will need an email to sign in to Llama Log."
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
                "Description": "Provide a detailed description of the work order. (Limit: 500 Characters)" 
            };
        } else if (formType === "Incident"){
            // For incident forms
            tooltipDescriptions = {
                "Title": "Provide a brief title for the incident post. (Limit: 50 Characters)", 
                "Was A Customer Involved?": "If a customer was involved in any way, select yes.",
                "Customer Name": "Insert the customer's full name. (Limit: 50 Characters)",
                "Customer Phone": "Insert the customer's phone number, so we're able to contact them if necessary.",
                "Description": "Provide a detailed description of the incident. (Limit: 500 Characters)" 
            };
        }
    } else if (currentPage.includes("view_post") || currentPage.includes("update_comment")){
        // For pages containing comments
        tooltipDescriptions = {
            "Comment": "Insert a comment to the post currently being viewed. (Limit: 250 Character)"
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
};