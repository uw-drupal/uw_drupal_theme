// ### UW Button script
// This file makes the spacebar activate links with role="button" (expected behavior).
// Works with shortcode and with the raw HTML as long as the classes are used.

// get all the button links.
const buttons = document.querySelectorAll( 'a.btn' );

// for each button, add event listener for the keyboard.
for ( let button of buttons ) {
	button.addEventListener( 'keydown', ( event ) => {

		// if the space bar was the keydown event, then don't page down the page, but activate/click the link.
		if ( 'Space' === event.code ) {
			event.preventDefault();
			event.stopPropagation();

			button.click();
		}
	});
}
