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
  flashDeleteButtons = [...document.getElementsByClassName("flash-delete")];

  // When clicked, delete the flash message
  flashDeleteButtons.forEach(flashDeleteButton => {
    flashDeleteButton.addEventListener('click', () => {
      flashDeleteButton.parentElement.parentElement.remove()
    })
  })

  focusFirstInputOnLoad()
  
});

function focusFirstInputOnLoad(){
  // Target the first text input element on page
  firstInputElement = [...document.getElementsByClassName("input")][0]

  // Auto focus on input element on document load
  firstInputElement.focus()
}



