/**
 * TO DO: merge the two different methods for modals into one.
 * Alternatively : figure out how to create modal code only when needed.
 */
jQuery( function( $ ) {

	$( '#photoGridModal' ).on( 'show.bs.modal', function( event ) {
		let button = $( event.relatedTarget );
		let img =  button.children( 'img' );
		let image = img.data( 'image' );
		let caption = img.data( 'caption' );
		let credit = img.data( 'credit' );
		let source = img.data( 'source' );
		let altText = img.attr( 'alt' );
		let modal = $( this );
		let creditHTML = '';

		if ( source ) {
			creditHTML = ' <span class="wp-media-credit">Photo: <a href="' + source + '" target="_blank">' + credit + '</a></span>';
		} else {
			creditHTML = ' <span class="wp-media-credit">Photo: ' + credit + '</span>';
		}

		// insert the image and alt text from the clicked image in the modal body.
		modal.find( '.modal-body' ).html(
			'<figure><img src="' + image + '" alt="' + altText + '" />' +
				'<figcaption>' + caption + creditHTML + '</figcaption>' +
			'</figure>'
		);
	});
	$( '.entry-content' ).append( '<div class="modal fade photo-modal" id="photoModal" tabindex="-1" role="dialog" aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered w-90" role="document">' +
				'<div class="modal-content"><div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
				'</div>' +
				'<div class="modal-body"></div></div></div></div>'
	);
	$( 'a > .wp-img, figure > a > img' ).on( 'click', function( e ) {
		let target = $( e.currentTarget );
		let rel = target.parent( 'a' ).attr( 'rel' );
		if ( ! rel ) {
			e.preventDefault();
			let image = target.parent( 'a' ).attr( 'href' );
			let altText = target.attr( 'alt' );
			let caption = target.parent( 'a' ).siblings( 'figcaption' ).html();
			let fullCap = ( caption == undefined ) ? '' : '<figcaption>' + caption + '</figcaption>';
			$( '#photoModal' ).find( '.modal-body' ).html(
				'<figure><img src="' + image + '" alt="' + altText + '" />' +
						fullCap +
					'</figure></div></div></div></div>' );

			$( '#photoModal' ).modal( 'show' );

		}
	});

});
