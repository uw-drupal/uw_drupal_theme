(function (Drupal, $, drupalSettings) {
  let UWModal = function () {
    // if default 'uw-modal' on the trigger button, count the number of modals and add -# to the end of each.
    // get all the modals on the page using the default name.
    const defaultModals = document.querySelectorAll('button.uw-modal');

    // if there's more than one modal with the default name, let's loop through and add a unique identifier to the end in all the places that need it.
    if (1 < defaultModals.length) {
      for (let m = 0; m < defaultModals.length; m++) {
        // remove default .uw-modal.
        defaultModals[m].classList.remove('uw-modal');

        // add unique id to .uw-modal-*.
        defaultModals[m].classList.add('uw-modal-' + m);

        // set the data-target for the button to match the ID of the modal div.
        defaultModals[m].setAttribute('data-target', '#uw-modal-' + m);

        // set the modal div ID.
        defaultModals[m].parentElement.nextElementSibling.id = 'uw-modal-' + m;

        // set the aria-labelledby.
        defaultModals[m].parentElement.nextElementSibling.setAttribute('aria-labelledby', 'uw-modal-' + m + '-title');

        // set the h5 modal title ID.
        defaultModals[m].parentElement.nextElementSibling.getElementsByClassName('modal-title')[0].id = 'uw-modal-' + m + '-title';
      }
    }

    // Now, let's make sure none of the other modals have the same class/ID. If they do, we give them a unique ID, too.
    const allModals = document.querySelectorAll('.modal');
    if (1 < allModals.length) {
      // convert to an array.
      const modalEls = Array.prototype.slice.call(allModals);

      // map all elements by ID.
      const modalIds = modalEls.map(el => el.id);

      // get all IDs with duplicates.
      const modalDups = modalEls.filter(el => 1 < modalIds.filter(id => id === el.id).length);

      // If there are any duplicate modal names, let's make them unique.
      if (0 < modalDups.length) {
        // get the duplicated ID.
        const modalDupId = modalDups[0].id;

        // then add a unique id to the end e.g. -1 (++).
        for (let m = 0; m < allModals.length; m++) {
          if (modalDupId === allModals[m].id) {
            allModals[m].id = modalDupId + '-' + m;

            // remove the duplicate class from the trigger button.
            allModals[m].previousElementSibling.querySelector('button').classList.remove(modalDupId);

            // add the unique class for this trigger button.
            allModals[m].previousElementSibling.querySelector('button').classList.add(modalDupId + '-' + m);

            // set the data-target for the button to match the new ID of the modal div.
            allModals[m].previousElementSibling.querySelector('button').setAttribute('data-target', '#' + modalDupId + '-' + m);

            // set the aria-labelledby.
            allModals[m].setAttribute('aria-labelledby', modalDupId + '-' + m + '-title');

            // set the h5 modal title ID.
            allModals[m].getElementsByClassName('modal-title')[0].id = modalDupId + '-' + m + '-title';
          }
        }
      }
    }
  };
  new UWModal();
})(Drupal, jQuery, drupalSettings);