(function (Drupal, $, drupalSettings) {
  let UWAccordion = function () {
    // if default 'accordion', count the number of accordions and add -# to the end of each. (otherwise they will all be unique IDs.).
    // get all the accordions on the page using the default name.
    const defaultAccordions = document.querySelectorAll('#accordion');

    // if there's more than one accordion with the default name, let's loop through and add a unique identifier to the end.
    if (1 < defaultAccordions.length) {
      for (let d = 0; d < defaultAccordions.length; d++) {
        defaultAccordions[d].id = 'accordion-' + d;
      }
    }

    // get all the collapse sections for accordions, regardless of default or unique ID.
    const collapseEl = document.querySelectorAll('.accordion #collapse');

    // if there is at least 1 accordion, loop through collapse sections.
    if (0 < collapseEl.length) {
      for (let c = 0; c < collapseEl.length; c++) {
        // set the id of each collapse to a unique ID.
        collapseEl[c].id = 'collapse-' + c;

        // set the data-target on the button to the associated collapse unique ID.
        collapseEl[c].parentElement.getElementsByClassName('btn-link')[0].dataset.target = '#' + collapseEl[c].id;
        collapseEl[c].parentElement.getElementsByClassName('btn-link')[0].setAttribute('aria-controls', collapseEl[c].id);

        // set data-parent to whatever its accordion ID is.
        collapseEl[c].dataset.parent = '#' + collapseEl[c].parentElement.parentElement.id;

        // assign unique but related ID to the header.
        collapseEl[c].previousElementSibling.id = collapseEl[c].id + '-header';

        // assign the same ID as immediately above to the aria-labelledby for the collapse element.
        collapseEl[c].setAttribute('aria-labelledby', collapseEl[c].previousElementSibling.id);
      }
    }

    // add role="region" to any open .collapse div using mutation observer.
    const elemToObserve = document.querySelectorAll('.accordion .collapse');
    if (1 < elemToObserve.length) {
      for (let el = 0; el < elemToObserve.length; el++) {
        let prevClassState = elemToObserve[el].classList.contains('collapse');
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if ('class' === mutation.attributeName) {
              const currentClassState = mutation.target.classList.contains('show');
              if (prevClassState !== currentClassState) {
                prevClassState = currentClassState;
                if (currentClassState) {
                  elemToObserve[el].setAttribute('role', 'region');
                } else {
                  elemToObserve[el].removeAttribute('role', 'region');
                }
              }
            }
          });
        });
        observer.observe(elemToObserve[el], {
          attributes: true
        });
      }
    }

    // check header buttons for focus and add .focus to highlight entire accordion when in focus.
    const allHeaderBtns = document.querySelectorAll('.accordion .card-header button');
    allHeaderBtns.forEach(function (trigger) {
      trigger.addEventListener('focus', function (event) {
        trigger.parentElement.parentElement.parentElement.parentElement.classList.add('focus');
      });
      trigger.addEventListener('blur', function (event) {
        trigger.parentElement.parentElement.parentElement.parentElement.classList.remove('focus');
      });
    });

    // Bind keyboard behaviors on the main accordion container
    // taken in part from https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html.
    const allAccordions = document.querySelectorAll('.accordion');
    allAccordions.forEach(function (accordion) {
      // convert NodeList to an Array so we can play with it.
      const allHeaders = Array.prototype.slice.call(accordion.querySelectorAll('.card-header button'));
      accordion.addEventListener('keydown', function (event) {
        const target = event.target;
        const key = event.which.toString();

        // 33 = Page Up, 34 = Page Down
        const ctrlModifier = event.ctrlKey && key.match(/33|34/);

        // Is this coming from an accordion header?
        if (target.classList.contains('btn-link')) {
          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            const index = allHeaders.indexOf(target);
            const direction = key.match(/34|40/) ? 1 : -1;
            const length = allHeaders.length;
            const newIndex = (index + length + direction) % length;
            allHeaders[newIndex].focus();
            event.preventDefault();
          } else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              // Go to first accordion
              case '36':
                allHeaders[0].focus();
                break;

              // Go to last accordion
              case '35':
                allHeaders[allHeaders.length - 1].focus();
                break;
            }
            event.preventDefault();
          }
        }
      });
    });
    // Open an accordion section based on the ID of the section.
    const openMe = $(location.hash).children('.collapse'); // find the child div of the section with user-added ID

    if (null !== location.hash && '' !== location.hash) {
      // if there is a hash in the URL, open the section with the same ID
      $(openMe).collapse('show');
    }
  };
  new UWAccordion();
})(Drupal, jQuery, drupalSettings);