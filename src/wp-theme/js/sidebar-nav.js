if ( document.querySelector( 'nav#desktop-relative' ) ) {

	// If the sidebar navigation exists, get it.
	const sidebarNav = document.querySelector( 'nav#desktop-relative' );

	// get the text of the top level item in the navigation.
	const topLevelNavItem = document.querySelector( '#desktop-relative ul ul li:first-child a' );

	// Set the aria-label for sidebarNav to topLevelNavItem.textContent
	sidebarNav.setAttribute( 'aria-label', topLevelNavItem.textContent );
}
