jQuery( '.uw-recent a.feed' ).off( 'click' ).on( 'click', function( event ) {
	event.preventDefault();
	jQuery( '.uw-recent p.feed' ).toggleClass( 'hide' );
	jQuery( '.uw-recent p.feed > input' ).trigger( 'select' );
});
