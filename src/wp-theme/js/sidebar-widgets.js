if ( document.querySelectorAll( '.widget:has(h2)' ) ) {

	// If sidebar widgets with h2s exist, get both the widgets and the h2s.
	const sidebarWidgets = document.querySelectorAll( '.widget:has(h2)' );

	// for each of the widgets that have an h2, use the h2 as the aria-label. If there isn't an h2, the default aria-label (widget class name) will be used.
	sidebarWidgets.forEach( widget => {
		const sidebarWidgetTitle = widget.querySelector( 'h2' ).textContent.trim();
		widget.setAttribute( 'aria-label', sidebarWidgetTitle );
	});

	// get sidebar widgets without a title
	const sidebarWidgetsNoTitle = document.querySelectorAll( '.widget:not(:has(h2))' );

	// Look at each wiget and if the ID includes "search" in the name.
	sidebarWidgetsNoTitle.forEach( widget => {
		const sidebarWidgetId = widget.id;
		if ( sidebarWidgetId.includes( 'search' ) ) {
			widget.setAttribute( 'aria-label', 'Search' );
		}
	});

}
