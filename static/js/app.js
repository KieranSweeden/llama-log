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
        flashes[0].remove()
      }, 1000)
    }, 5000)
  }

});

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



