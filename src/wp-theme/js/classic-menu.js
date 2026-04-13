/**
 * Classic Menu JS.
*/
if ( document.querySelector( '#white-bar' ) ) {

	// Function to set the number of columns for all dropdown menus.
	const dropdownMenus = document.querySelectorAll( '.dropdown-menu' );

	// Loop through all dropdown menus on the page.
	dropdownMenus.forEach( function( dropdownMenu ) {
		const listItems = dropdownMenu.querySelectorAll('li' );

		// Check if there are more than 8 list items.
		if ( 8 < listItems.length ) {
			//dropdownMenu.style.columnCount = '2'; // Set to 2 columns
			dropdownMenu.classList.add( 'two-columns' );
		}
	});

}
