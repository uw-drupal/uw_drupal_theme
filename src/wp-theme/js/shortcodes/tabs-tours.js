let UWTabs = ( function() {

	// Query selector for both tours and tabs
	const tabsAndTours = document.querySelectorAll( '.nav-tabs button, .nav-pills button' );

	// Function to update the URL hash
	function updateHash( hash ) {
		if ( history.pushState ) {
			history.pushState( null, null, hash );
		} else {
			window.location.hash = hash; // Polyfill for old browsers
		}
	}

	// Loop through each tab or tour element
	tabsAndTours.forEach( ( element ) => {

		// Add event listener to each tab or tour element
		element.addEventListener( 'click', function( e ) {
			$( this ).tab( 'show' ); // Show the tab or tour content

			const targetHash = e.target.id;
			const newTargetHash = targetHash.replace( 'title-', '' );
			updateHash( `#${newTargetHash}` ); // Update the URL hash
		});
	});

	// Initial handling of URL hash.
	// scroll to hash/ID location on page.
	const url = document.location.toString();
	if ( url.match( '#' ) ) {

		// if this is a tab, this will run.
		if ( document.querySelector( `.nav-tabs button[id="title-${url.split( '#' )[1]}"]` ) ) {
			$( `.nav-tabs button[id="title-${url.split( '#' )[1]}"]` ).tab( 'show' );
			$( 'html, body' ).animate({scrollTop: $( `.nav-tabs button[id="title-${url.split( '#' )[1]}"]` ).offset().top - 100 }, 'slow' );
		}

		// if this is a pill, this will run.
		if ( document.querySelector( `.nav-pills button[id="title-${url.split( '#' )[1]}"]` ) ) {
			$( `.nav-pills button[id="title-${url.split( '#' )[1]}"]` ).tab( 'show' );
			$( 'html, body' ).animate({scrollTop: $( `.nav-pills button[id="title-${url.split( '#' )[1]}"]` ).offset().top - 100 }, 'slow' );
		}
	}

	// Javascript to enable link to tab
	const hash = document.location.hash;
	const prefix = '#';

	if ( hash ) {
		$( `.nav-tabs button[id="title-${hash.replace( prefix, '' )}"]` ).tab( 'show' );
		$( `.nav-pills button[id="title-${hash.replace( prefix, '' )}"]` ).tab( 'show' );
	}

	// if default 'tab-tour', count the number of tab sets and add -# to the end of each. (otherwise they will all be unique IDs.).
	// get all the tab sets on the page using the default name.
	const defaultTabTours = document.querySelectorAll( '#tabs-tour-container' );

	// if there's more than one tab set with the default name, let's loop through and add a unique identifier to the end.
	if ( 1 < defaultTabTours.length ) {
		for ( let d = 0; d < defaultTabTours.length; d++ ) {
			defaultTabTours[d].id = 'tabs-tour-container-' + d;
		}
	}

	// look at tab <ul> to see if it has a duplicate ID (because the user put the same name on multiple tabs).
	const allTabLists = document.querySelectorAll( '.tab-tour ul.nav-tabs' );
	if ( 1 < allTabLists.length ) {

		// convert to an array.
		const elements = Array.prototype.slice.call( allTabLists );

		// map all elements by ID.
		const ids = elements.map( el => el.id );

		// get all IDs with duplicates.
		const dups = elements.filter( el => 1 < ids.filter( id => id === el.id ).length );

		// then add a unique id to the end e.g. -1 (++).
		if ( 0 !== dups.length ) {

			// get the duplicated ID.
			const dupId = dups[0].id;

			for ( let d = 0; d < allTabLists.length; d++ ) {
				if ( dupId === allTabLists[d].id ) {
					allTabLists[d].id = dupId + '-' + d;

					// set the IDs and hrefs for the links.
					const dupTabsLinks = allTabLists[d].getElementsByClassName( 'nav-link' );


					for ( let t = 0; t < dupTabsLinks.length; t++ ) {
						dupTabsLinks[t].id = 'title-' + dupId + '-' + d + '-' + t;
						dupTabsLinks[t].href = '#content-' + dupId + '-' + d + '-' + t;
						dupTabsLinks[t].setAttribute( 'aria-controls', 'content-' + dupId + '-' + d + '-' + t );
					}

					// set the content panels to match the IDs.
					allTabLists[d].parentElement.getElementsByClassName( 'tab-content' )[0].id = 'tab-content-' + dupId + '-' + d;

					// set the
					const dupTabsPanes = allTabLists[d].parentElement.getElementsByClassName( 'tab-pane' );
					for ( let p = 0; p < dupTabsPanes.length; p++ ) {
						dupTabsPanes[p].id = 'content-' + dupId + '-' + d + '-' + p;
						dupTabsPanes[p].setAttribute( 'aria-labelledby', 'title-' + dupId + '-' + d + '-' + p );
					}
				}
			}
		}
	}

	// Event listeners and key codes for added accessibility. Taken in part from WAI-ARIA example: https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/js/tabs.js and our accordion JS.
	const allTabs = document.querySelectorAll( '.tab-tour' );
	allTabs.forEach( function( tab ) {

		// convert NodeList to an Array so we can play with it.
		const tabTitles = Array.prototype.slice.call( tab.querySelectorAll( '.nav-link' ) );

		tab.addEventListener( 'keydown', function( event ) {
			const target = event.target;
			const key = event.which;

			// let's use human-friendly key names.
			const keys = {
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};

			// if down, right, left, or up key, move one tab down/right or up/left.
			if ( keys.down === key || keys.right === key || keys.left === key || keys.up === key ) {
				event.preventDefault();
				const index = tabTitles.indexOf( target );
				const direction = ( keys.right === key || keys.down === key ) ? 1 : -1;
				const length = tabTitles.length;
				const newIndex = ( index + length + direction ) % length;

				tabTitles[newIndex].focus();
			} else {
				switch ( key ) {

					// if the end key, go to the last tab.
					case keys.end:
						event.preventDefault();
						tabTitles[tabTitles.length - 1].focus();
						break;

					// if the home key, go to the first tab.
					case keys.home:
						event.preventDefault();
						tabTitles[0].focus();
						break;

					// if none of the keys match, break out of this!
					default:
						break;
				}
			}
		});
	});
});

new UWTabs();
