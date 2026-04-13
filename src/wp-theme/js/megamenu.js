/**
 * Mega Menu JS.
 * - Adds column classes.
 * - Adds right-aligned class if top-level menus are over 4 items long.
 * - Adds keyboard access (keycodes) not found in default Bootstrap -> this was moved to keyboard-navmenu.js.
*/
if ( document.querySelector( '#mega-menu' ) ) {

	// get all the top-level menu items that have children.
	const allDepthZero = document.querySelectorAll( '#mega-menu .depth-0' );

	// go through all the top-level menu items that have children (drop-downs) of any kind and then we'll add in the columns for the mega menu where approporiate.
	if ( 0 < allDepthZero.length ) {
		for ( let n = 0; n < allDepthZero.length; n++ ) {

			// look at all the next-level menu items but only one level down.
			const allNavGroups = allDepthZero[n].querySelectorAll( ':scope div > li' );

			// go through all the sub-menus and see if any of them are a traditional list (no need for columns). these are menus that don't have any of the classes checked on the classlist check below.
			let counter = 0;
			for ( let i = 0; i < allNavGroups.length; i++ ) {
				let menuItem = allNavGroups[i];
				if ( menuItem.classList.contains( 'heading' ) || menuItem.classList.contains( 'nav-group' ) || menuItem.classList.contains( 'menu-item-has-children' ) ) {
					counter++;
				}
			}

			// if a heading has been added to a mega menu without the nav-group (maybe it's by itself in a column? why would you want to do this? I don't know but someone will do it.), we should check for that and add the nav-group class so the styling isn't messed up.
			for ( let h = 0; h < allNavGroups.length; h++ ) {
				let menuItem = allNavGroups[h];
				if ( menuItem.classList.contains( 'heading' ) && ! menuItem.classList.contains( 'nav-group' ) ) {
					menuItem.classList.add( 'nav-group' );
				}
			}

			// if a traditional list menu, just one column, please.
			if ( 0 === counter ) {

				// add class to div.row.
				allNavGroups[0].parentNode.classList.add( 'one-col' );

			// otherwise, we have a bunch of other stuff to check for to set up the columns.
			} else {
				if ( 2 === allNavGroups.length || 4 === allNavGroups.length ) {

					// add class to div.row.
					allNavGroups[0].parentNode.classList.add( 'two-col' );
				} else if ( 3 === allNavGroups.length ) {

					// add class to div.row.
					allNavGroups[0].parentNode.classList.add( 'three-col' );
				} else if ( 4 < allNavGroups.length ) {

					// add class to div.row.
					allNavGroups[0].parentNode.classList.add( 'three-col' );
				} else if ( 0 === allNavGroups.length || null === allNavGroups.length ) {

					// add class to div.row.
					allDepthZero[n].querySelector( '.row' ).classList.add( 'one-col' );
				} else {

					// add class to div.row.
					allNavGroups[0].parentNode.classList.add( 'one-col' );
				}
			}
		}
	}

	// count all top level menu items. If there's more than 4, anything after #4 with a drop-down we add the class that aligns it right.
	// get the mega menu.
	const megaMenu = document.querySelector( '#mega-menu ul' );

	// get only the top-level menu items from the mega menu.
	const allTopLevelNav = megaMenu.querySelectorAll( ':scope > li' );

	// if there are more than 4 items in the mega menu, add .dropdown-menu-right to the ul.dropdown-menu.
	if ( 4 < allTopLevelNav.length ) {
		for ( let d = 4; d < allTopLevelNav.length; d++ ) {
			const allDropDowns = allTopLevelNav[d].querySelectorAll( '.dropdown-menu' );

			if ( allDropDowns.length ) {
				for ( let dd = 0; dd < allDropDowns.length; dd++ ) {
					allDropDowns[dd].classList.add( 'dropdown-menu-right' );
				}
			}
		}
	}

	// check for a dropdown menu with the class of 'left-dropdown'
	const leftDropDown = document.querySelectorAll( '.left-dropdown' );

	if ( 0 < leftDropDown.length ) {
		for ( let n = 0; n < leftDropDown.length; n++ ) {
			leftDropDown[n].querySelector( '.dropdown-menu' ).classList.remove( 'dropdown-menu-right' );
		}
	}
}

