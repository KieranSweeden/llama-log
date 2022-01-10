document.addEventListener('DOMContentLoaded', () => {
  // Enable mobile nav functionality with bulma
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  // Grab delete comment buttons
  let deleteCommentButtons = [...document.getElementsByClassName("delete-btn")];

  // If delete comment buttons exist on page
  if(deleteCommentButtons.length > 0){
    // Add defensive modal event listener to delete button
    addDeleteCommentConfirmListener(deleteCommentButtons);
  }

  let resetCommentButtons = [...document.getElementsByClassName("reset-btn")];

  // If reset comment buttons exist on page
  if(resetCommentButtons.length > 0){
    // Add defensive modal event listener for reset button
    addResetCommentConfirmListener(resetCommentButtons);
  }

  // Clamps for posts within feed
  let cardTextContent = [...document.getElementsByClassName("add-text-overflow-cutoff")];

  // If card text content exists on the page, clamp the text if too large
  if(cardTextContent.length > 1){
    clampText(cardTextContent);
  }

  // Get Radio Buttons
  let radioButtons = [...document.getElementsByName("was_customer_involved")];

  if(radioButtons.length > 0){
    addListenerToRadioButtons(radioButtons);
  }

  // Enable navbar dropdown button
  let navbarDropdown = document.getElementById("navbarDropdown");

  if (navbarDropdown){
    enableNavbarDropdown(navbarDropdown);
  }

  // Enable dropdown buttons
  let dropdowns = [...document.getElementsByClassName("dropdown")];

  // If dropdown buttons exist on page
  if (dropdowns.length > 0){
    addListenerToDropdowns(dropdowns);
  }

  // Grab flash delete buttons on page
  let flashDeleteButtons = [...document.getElementsByClassName("flash-delete")];

  // When clicked, delete the flash message
  flashDeleteButtons.forEach(flashDeleteButton => {
    flashDeleteButton.addEventListener('click', () => {
      flashDeleteButton.parentElement.parentElement.remove();
    });
  });

  // Focus on first input element if found
  focusFirstInputOnLoad();

  // Set timer for flash messages after 5 seconds
  let flashes = Array.from(document.getElementsByClassName("message"));

  // If flashes are present on page
  if (flashes.length > 0) {
    // Set a 5s timer to add fade out class
    setTimeout(() => {
      flashes[0].classList.remove("animate__fadeInUp");
      flashes[0].classList.add("animate__fadeOutDown");
      // Remove flash after second of fade out
      setTimeout(() => {
        flashes[0].remove();
      }, 1000);
    }, 5000);
  }

});

function addResetCommentConfirmListener(resetCommentButtons){
  // Add click event listener to reset comment button
  resetCommentButtons.forEach(resetCommentButton => {
    resetCommentButton.addEventListener("click", (event) => {
      displayConfirmResetModal(resetCommentButton);
    });
  });
}

function addDeleteCommentConfirmListener(deleteCommentButtons){
  // Add click event listener to delete comment button
  deleteCommentButtons.forEach(deleteCommentButton => {
    deleteCommentButton.addEventListener("click", (event) => {
      displayConfirmDeleteModal(deleteCommentButton);
    });
  });
}

function displayConfirmResetModal(resetCommentButton){
  // Get id of comment using data modal attribute
  let commentID = resetCommentButton.dataset.modal;

  // Grab modals
  let confirmModals = [...document.getElementsByClassName("modal")];

  // Filter to the target modal using the commentID
  let targettedModal = confirmModals.filter(modal => modal.dataset.modal === commentID)[0];

  // Add is-active class to display modal to user
  targettedModal.classList.add("is-active");

  // Add close modal click listeners to close buttons
  addCloseModalListeners([...targettedModal.getElementsByClassName("close-modal")], targettedModal);
}


function displayConfirmDeleteModal(deleteCommentButton){
  // Get id of comment using data modal attribute
  let commentID = deleteCommentButton.dataset.modal;

  // Grab modals
  let confirmModals = [...document.getElementsByClassName("modal")];

  // Filter to the target modal using the commentID
  let targettedModal = confirmModals.filter(modal => modal.dataset.modal === commentID)[0];

  // Add is-active class to display modal to user
  targettedModal.classList.add("is-active");

  // Add close modal click listeners to close buttons
  addCloseModalListeners([...targettedModal.getElementsByClassName("close-modal")], targettedModal);
}

function addCloseModalListeners(closeButtons, openedModal){
  // If user clicks close buttons, modal closes
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener("click", () => {
      openedModal.classList.remove("is-active");
    });
  });
}

function enableNavbarDropdown(navbarDropdown){
  navbarDropdown.addEventListener("click", (event) => {
    event.target.parentElement.classList.toggle("is-active");
  });
}

function clampText(cardTextContent){
  // Clamp each text content
  cardTextContent.forEach(cardTextContent => {
    // If it's a span within a heading
    if(cardTextContent.tagName === "SPAN"){
      // Clamp it down to 1 line
      $clamp(cardTextContent, {clamp: 1});
    } else {
      // Else clamp it down to 3 as it'll be description text
      $clamp(cardTextContent, {clamp: 3});
    }
  });
}

function addListenerToRadioButtons(radioButtons) {
  // Add click listener for each radio button
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener("click", () => {
      // If the radio button clicked is yes, display customer inputs to user
      if(radioButton.parentElement.innerText === "Yes"){
        // Display customer oriented input fields
        displayCustomerIncidentFields();

      } else {
        // Remove customer oriented input fields
        removeCustomerIncidentFields();
      }
    });
  });
}

function displayCustomerIncidentFields(){
  // Grab customer involved field container
  let customerFieldsContainer = document.getElementById("customer-involved-fields");

  // Grab customer involved input fields
  let customerInvolvedFields = [...customerFieldsContainer.getElementsByTagName("input")];

  // Add required attribute to each input field
  customerInvolvedFields.forEach(inputField => {
    inputField.required = true;
  });

  // Remove is-hidden class so fields are displayed to user
  customerFieldsContainer.classList.remove("is-hidden");
}

function removeCustomerIncidentFields(){
  // Grab customer involved field container
  let customerFieldsContainer = document.getElementById("customer-involved-fields");

  // Grab customer involved input fields
  let customerInvolvedFields = [...customerFieldsContainer.getElementsByTagName("input")];

  // Add required attribute to each input field
  customerInvolvedFields.forEach(inputField => {
    inputField.required = false;
  });

  // Add is-hidden class so fields are displayed to user
  customerFieldsContainer.classList.add("is-hidden");
}

function addListenerToDropdowns(dropdowns){
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", event => {

      // Grab dropdown component & toggle is-active class
      event.target.closest(".dropdown").classList.toggle("is-active");
    });
  });
}

function focusFirstInputOnLoad(){
  // Target the first text input element on page
  let firstInputElement = [...document.getElementsByClassName("input")][0];

  // If an input element has been found
  if (firstInputElement) {

    // Auto focus on that input element on document load
    firstInputElement.focus();
  }
}



