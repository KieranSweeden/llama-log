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


  // Clamps for posts within feed
  let cardTextContent = [...document.getElementsByClassName("add-text-overflow-cutoff")];

  // If card text content exists on the page, clamp the text if too large
  if(cardTextContent.length > 1){
    clampText(cardTextContent);
  };

  // Get Radio Buttons
  let radioButtons = [...document.getElementsByName("was_customer_involved")];

  if(radioButtons.length > 0){
    addListenerToRadioButtons(radioButtons);
  };

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
  };

  // Grab flash delete buttons on page
  let flashDeleteButtons = [...document.getElementsByClassName("flash-delete")];

  // When clicked, delete the flash message
  flashDeleteButtons.forEach(flashDeleteButton => {
    flashDeleteButton.addEventListener('click', () => {
      flashDeleteButton.parentElement.parentElement.remove();
    })
  })

  // Focus on first input element if found
  focusFirstInputOnLoad();

  // Add event listener to unlock form input fields for editing
  let editButton = document.getElementById("enable-edit");

  if (editButton){
    editButton.addEventListener('click', (editButton) => {
      unlockFormInputFields(editButton.target)
    })
  }

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
      }, 1000)
    }, 5000)
  }

});

function addDeleteCommentConfirmListener(deleteCommentButtons){
  // Add click event listener to delete comment button
  deleteCommentButtons.forEach(deleteCommentButton => {
    deleteCommentButton.addEventListener("click", (event) => {
      displayConfirmDeleteModal(deleteCommentButton);
    });
  });
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
    })
  });
}

function enableNavbarDropdown(navbarDropdown){
  navbarDropdown.addEventListener("click", (event) => {
    event.target.parentElement.classList.toggle("is-active")
  })
}

function clampText(cardTextContent){
  // Clamp each text content if it exceeds 3 lines
  cardTextContent.forEach(cardTextContent => {
    $clamp(cardTextContent, {clamp: 3});
  })
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

  // Create div elements
  let customerNameInput = document.createElement("div");
  let customerPhoneInput = document.createElement("div");

  // Add bulma field class to each div
  customerNameInput.className = "field";
  customerPhoneInput.className = "field";

  // Add html markup for customer name input field
  customerNameInput.innerHTML = `
    <label for="customer_name" class="label customer">Customer Name<i class="fas fa-question-circle"></i></label>
    <div class="control has-icons-left has-icons-right">
        <input class="input is-success" id="customer_name" name="customer_name" type="text" placeholder="Enter Customer's Full Name">
        <span class="icon is-small is-left">
          <i class="fas fa-user-tag"></i>
        </span>
        <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
        </span>
    </div>
    `;
  
  // Add html markup for customer phone input field
  customerPhoneInput.innerHTML = `
    <label for="customer_phone" class="label customer">Customer Phone<i class="fas fa-question-circle"></i></label>
    <div class="control has-icons-left has-icons-right">
        <input class="input is-success" id="customer_phone" name="customer_phone" type="number" placeholder="Enter Customer's Phone Number">
        <span class="icon is-small is-left">
          <i class="fas fa-phone"></i>
        </span>
        <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
        </span>
    </div>
    `;

  // Get parent & sibling
  let parent = [...document.getElementsByTagName("form")][0];
  let sibling = document.getElementById("description").closest(".field");

  // Insert customer input fields before description textarea
  parent.insertBefore(customerNameInput, sibling);
  parent.insertBefore(customerPhoneInput, sibling);
}

function removeCustomerIncidentFields(){
  // Get customer related field labels
  let customerInputLabels = [...document.getElementsByClassName("label customer")];

  // Remove fields using the labels
  customerInputLabels.forEach(inputLabel => {
    inputLabel.parentElement.remove()
  })
}

function addListenerToDropdowns(dropdowns){
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", event => {

      // Grab dropdown component & toggle is-active class
      event.target.closest(".dropdown").classList.toggle("is-active");
    })
  })
}

function unlockFormInputFields(editButton) {
  // Grab form element
  let form = [...document.getElementsByTagName("form")][0]
  
  // Get all input elements within form & lock icons
  let inputElements = [...form.getElementsByTagName("input")]
  let lockIcons = [...form.getElementsByClassName("fas fa-lock")]

  // Remove disabled attribute from each input element
  inputElements.forEach(inputElement => {
    inputElement.removeAttribute("disabled")
  })

  // Change lock icon to unlock icon
  lockIcons.forEach(lockIcon => {
    lockIcon.className = "fas fa-lock-open";
  })

  // Update form button
  changeEditButtonToSaveButton(editButton)
}

function changeEditButtonToSaveButton(editButton){

  // Create save button
  let saveButton = document.createElement("button");
  saveButton.className = "button is-link";
  saveButton.type = "submit";
  saveButton.innerHTML = "Save <i class='fas fa-save'></i>"

  // Ensure editButton is button & not icon
  editButton = (editButton.nodeName == "BUTTON") ? editButton : editButton.parentElement;

  // Get button sibling & parent
  let sibling = editButton.nextElementSibling;
  let parent = editButton.parentElement;

  // Remove edit button
  editButton.remove()

  // Insert save button recently created
  parent.insertBefore(saveButton, sibling)

}

function focusFirstInputOnLoad(){
  // Target the first text input element on page
  firstInputElement = [...document.getElementsByClassName("input")][0];

  // If an input element has been found
  if (firstInputElement) {

    // Auto focus on that input element on document load
    firstInputElement.focus();
  }
}



