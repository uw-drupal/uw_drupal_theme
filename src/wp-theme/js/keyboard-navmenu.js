/**
 * File keyboard-navmenu.js.
 *
 * Additional keyboard accessibility for both classic and mega menus.
 * */
 ( function( $ ) {

	// Safari bug fix. There is a random Safari bug where focus-within doesn't always work. This adds a class to the navigation button when there is focus on the link inside the list element. When the focus is removed, the class is removed too.
	const topLevelNavButtons = document.querySelectorAll( '.top-level-nav.button' );
	if ( topLevelNavButtons ) {
		for ( let navButton of topLevelNavButtons ) {
			const navButtonLink = navButton.querySelector( 'a' );
			navButtonLink.addEventListener( 'focusin', ( event ) => {
				navButton.classList.add( 'button-fw' );
			});
			navButtonLink.addEventListener( 'mouseenter', ( event ) => {
				navButton.classList.add( 'button-fw' );
			});
			navButtonLink.addEventListener( 'focusout', ( event ) => {
				navButton.classList.remove( 'button-fw' );
			});
			navButtonLink.addEventListener( 'mouseleave', ( event ) => {
				navButton.classList.remove( 'button-fw' );
			});
		}
	}

	// add IDs to menu uls and add aria-controls to buttons to match.
	// get all top-level nav children.
	const topNavCheck = document.querySelector( 'ul.navbar-nav' );

	if ( topNavCheck ) {
		const topNav = document.querySelector( 'ul.navbar-nav' ).children;

		// loop through the children and add the id and aria-controls to each.
		for ( let navItem of topNav ) {

			// get each nav item's text and convert to all lower case.
			const navItemText = navItem.innerText.toLowerCase();

			// remove everything that isn't alphanumeric from the nav item's ID.
			const listId = navItemText.replace( /[^A-Za-z0-9]/g, '' );

			// check to see if there is a drop-down and if so, add these 2 things.
			if ( navItem.querySelector( 'ul' ) ) {

				// add aria-controls to the link and the ID to the list.
				navItem.querySelector( 'a' ).setAttribute( 'aria-controls', 'nav-' + listId );
				navItem.querySelector( 'ul' ).id = 'nav-' + listId;
			}
		}

		// adding extra keyboard accessibility.
		$( '.menu-item' ).on( 'keydown', function( e ) {

			// Store the reference to our top level link
			let topLevel = $( this ).closest( '.top-level-nav' );
			let currentTarget = $( e.currentTarget );
			let currentMenu = currentTarget.closest( '.dropdown' );
			let currentDropdownMenu = currentTarget.closest( '.dropdown-menu' );
			let menuItem;

			switch ( e.code ) {
				case 'ArrowDown':
				case 'ArrowRight':
					menuItem = topLevel.nextAll( 'li' );

					// Make sure to stop event bubbling
					e.preventDefault();
					e.stopPropagation();

					// top level dropdown with the dropdown open.
					if ( currentTarget.hasClass( 'top-level-nav' ) && currentTarget.hasClass( 'show' ) ) {
						currentMenu.find( 'li' ).first().find( 'a' ).first().trigger( 'focus' );

					// top level nav without the dropdown open.
					} else if ( currentTarget.hasClass( 'top-level-nav' ) ) {
						menuItem.first().find( 'a' ).first().trigger( 'focus' );

					// megamenu in dropdown.
					} else if ( ! currentTarget.hasClass( 'top-level-nav' ) && currentTarget.parents().hasClass( 'megamenu-nav' ) ) {
						if ( currentTarget.parents().hasClass( 'depth-1' ) ) {

							// when we get to the end of a list, go to the next list.
							currentTarget.parent().children( 'li' ).last().parent().parent().next( 'li' ).find( 'a' ).first().trigger( 'focus' );

							// otherwise, just go to the next list item.
							currentTarget.next( 'li' ).find( 'a' ).trigger( 'focus' );

						// this is for dropdowns without multiple columns.
						} else if ( currentTarget.parents().hasClass( 'depth-0' ) && ! currentTarget.children().hasClass( 'depth-1' ) ) {
							currentTarget.next( 'li' ).find( 'a' ).trigger( 'focus' );

						// this is for multiple columns with headings.
						} else if ( currentTarget.parents().hasClass( 'depth-0' ) && ! currentTarget.parents().hasClass( 'depth-1' ) ) {
							currentTarget.find( 'ul li' ).first().find( 'a' ).trigger( 'focus' );
						}

					// inside the dropdown.
					} else {
						currentTarget.next( 'li' ).find( 'a' ).trigger( 'focus' );
					}
					break;

				case 'ArrowUp':
				case 'ArrowLeft':
					menuItem = topLevel.prevAll( 'li' );

					// Make sure to stop event bubbling
					e.preventDefault();
					e.stopPropagation();

					// top level nav for both mega and classic.
					if ( currentTarget.hasClass( 'top-level-nav' ) ) {
						menuItem.first().find( 'a' ).first().trigger( 'focus' );

						// close any open dropdowns.
						$( '.dropdown-menu' ).removeClass( 'show' );
						$( '.dropdown' ).removeClass( 'show' );

					// megamenu dropdowns.
					} else if ( ! currentTarget.hasClass( 'top-level-nav' ) && currentTarget.parents().hasClass( 'megamenu-nav' ) ) {
						if ( currentTarget.parents().hasClass( 'depth-1' ) ) {

							// when we get to the top of a list, go to the top/heading of the list.
							currentTarget.parent().children( 'li' ).first().parent().parent().find( 'a' ).first().trigger( 'focus' );

							// otherwise, just go to the next list item.
							currentTarget.prev( 'li' ).find( 'a' ).trigger( 'focus' );

						// this is for dropdowns without multiple columns.
						} else if ( currentTarget.parents().hasClass( 'depth-0' ) && ! currentTarget.children().hasClass( 'depth-1' ) ) {
							currentTarget.prev( 'li' ).find( 'a' ).trigger( 'focus' );

						// this is for multiple columns with headings.
						} else if ( currentTarget.parents().hasClass( 'depth-0' ) && ! currentTarget.parents().hasClass( 'depth-1' ) ) {
							currentTarget.prev( 'li' ).find( 'a' ).last().trigger( 'focus' );
						}

					// inside the dropdown.
					} else {
						currentTarget.prev( 'li' ).find( 'a' ).trigger( 'focus' );
					}
					break;

				case 'Space':
					e.preventDefault();
					e.stopPropagation();

					// Top level with dropdown.
					if ( currentTarget.hasClass( 'top-level-nav' ) && currentTarget.hasClass( 'dropdown' ) ) {
						currentTarget.toggleClass( 'show' );
						currentTarget.find( 'ul' ).toggleClass( 'show' );

						if ( currentTarget.find( 'ul' ).hasClass( 'show' ) ) {
							currentTarget.find( '.dropdown-toggle' ).attr( 'aria-expanded', 'true' );
						} else {
							currentTarget.find( '.dropdown-toggle' ).attr( 'aria-expanded', 'false' );
						}

					// top level link only.
					} else if ( currentTarget.hasClass( 'top-level-nav' ) && ! currentTarget.hasClass( 'dropdown' ) ) {
						$( 'a' ).removeAttr( 'aria-current' );
						currentTarget.find( 'a' ).first().trigger( 'focus' ).attr( 'aria-current', 'page' );

					// Remove aria-current from everything, focus the selected link, add aria-current="page" to the link.
					} else {

						$( 'a' ).removeAttr( 'aria-current' );
						currentTarget.find( 'a' ).first().trigger( 'focus' ).attr( 'aria-current', 'page' );

						// Note: still need to press enter key to activate the link but this does all the other things. According to W3, space does not activate links and we should not try override the browser's default behavior.
					}
					break;

				case 'Home':
					e.preventDefault();
					e.stopPropagation();

					// if in top level, jump to first top level link.
					if ( currentTarget.hasClass( 'top-level-nav' ) ) {
						topLevel.parent().children( 'li' ).first().find( 'a' ).trigger( 'focus' );

					// otherwise, it's a dropdown so jump to top of dropdown.
					} else {

						// classic menu.
						if ( currentTarget.parents().hasClass( 'classic-menu-nav' ) ) {
							currentDropdownMenu.children( 'li' ).first().find( 'a' ).trigger( 'focus' );

						// megamenu.
						} else if ( currentTarget.parents().hasClass( 'megamenu-nav' ) ) {
							currentDropdownMenu.find( '.row' ).first().find( 'li' ).first().find( 'a' ).first().trigger( 'focus' );
						}
					}
					break;

				case 'End':
					e.preventDefault();
					e.stopPropagation();

					// if in top level, jump to first top level link.
					if ( currentTarget.hasClass( 'top-level-nav' ) ) {
						topLevel.parent().children( 'li' ).last().find( 'a' ).trigger( 'focus' );

					// otherwise, it's a dropdown so jump to bottom of dropdown.
					} else {

						// classic menu.
						if ( currentTarget.parents().hasClass( 'classic-menu-nav' ) ) {
							currentDropdownMenu.children( 'li' ).last().find( 'a' ).trigger( 'focus' );

						// megamenu.
						} else if ( currentTarget.parents().hasClass( 'megamenu-nav' ) ) {
							currentDropdownMenu.find( '.row' ).last().find( 'li' ).last().find( 'a' ).last().trigger( 'focus' );
						}
					}
					break;


				case 'Escape':
					// close on escape
					// currentTarget.parent().sibling( '.nav-link.dropdown-toggle' ).removeClass( 'show' );
					// currentTarget.parent().sibling( '.nav-link.dropdown-toggle' ).attr( 'aria-expanded', 'false' );
					// currentTarget.parent().sibling( '.dropdown-toggle' ).trigger( 'focus' );

					break;


			}
		});

	}
}( jQuery ) );
