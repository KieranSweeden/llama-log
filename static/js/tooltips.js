// Within this file, is the code relating to Tippy.js

// Log in tooltips

tippy('#email-tooltip', {
    content: 'An email to log in should be provided to you by an Admin',
    trigger: 'click mouseenter',
    placement: 'right',
    animation: 'fade',
    theme: 'llama-log'
});

tippy('#password-tooltip', {
    content: 'Enter your password to sign into Llama Log',
    trigger: 'click mouseenter',
    placement: 'right',
    animation: 'fade',
    theme: 'llama-log'
});

// New user tooltips

// tippy('.primary-tooltip', {
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });


// tippy('#new-user-first-name-tooltip', {
//     content: "This will be attached to the user's posts & comments"
// });

// tippy('.primary-tooltip', {
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// tippy('#new-user-last-name-tooltip', {
//     content: "This will be attached to the user's posts & comments",
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// tippy('#new-user-dob-tooltip', {
//     content: "This will not be publicly available",
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// tippy('#new-user-phone-tooltip', {
//     content: "This will only be accessed for emergency purposes",
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// tippy('#new-user-email-tooltip', {
//     content: "This will be email the user will need to sign in",
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// tippy('#new-user-admin-tooltip', {
//     content: "If checked, this user will be able to edit/delete all posts, comments & user accounts",
//     trigger: 'click mouseenter',
//     placement: 'right',
//     animation: 'fade',
//     theme: 'llama-log'
// });

// Grab question mark icons & apply tippy tooltip instances to each of them
const tooltips = tippy([...document.getElementsByClassName('fas fa-question-circle')]);

// Insert description content for each tooltip
insertTooltipStylingAndContent(tooltips);

function insertTooltipStylingAndContent(tooltips){
    // Apply content to each tooltip
    tooltips.forEach(tooltip => {

        // Set llama log appearance to each tooltip
        tooltip.props.placement = "right";
        tooltip.props.theme = "llama-log";

        // Get label text content associated with tooltip
        let tooltipLabel = tooltip.reference.parentElement.innerText;

        // Set tooltip content based on label tooltip associated with
        tooltip.setContent(getTooltipDescription(tooltipLabel));
    });
}

function getTooltipDescription(type){

    // Create all tooltip descriptions
    const tooltipDescriptions = {
        "First Name": "The user's first name will be attached to the user's posts & comments.",
        "Last Name": "The user's last name will be attached to the user's posts & comments.",
        "Date of Birth": "The user's Date of Birth will not be publicly available as it's for data collection purposes only.",
        "Phone": "The user's phone number will only be accessed for emergency purposes.",
        "Email": "The user will need an email to sign in.",
        "Provide this user with admin credentials": "If checked, this user will be able to edit/delete all posts, comments & user accounts."
    }

    // Return tooltip description associated with type given
    return tooltipDescriptions[type];
};