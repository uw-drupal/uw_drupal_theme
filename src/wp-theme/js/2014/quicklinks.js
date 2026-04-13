/* eslint-disable camelcase */
/* eslint-disable yoda */

// This section builds and populates the quicklinks section (off-canvas right)
UW.QuickLinks = Backbone.View.extend({

	// todo: the default list and these elements could be put into the php templates
	container: '#page',

	events: {
	'click': 'animate',
	'touchstart': 'animate',
	'keyup': 'animate',
	'blur': 'loop'
	},

	initialize: function( options ) {
		_.bindAll( this, 'inner_keydown', 'render', 'animate', 'accessible', 'loop', 'transitionEnd' );

		this.render();

	},

	render: function() {
        this.quicklinks = $( '#quicklinks' );
		this.$container = $( this.container );
		this.$el.attr( 'aria-controls', 'quicklinks' ).attr( 'aria-owns', 'quicklinks' );
		UW.$body.on( 'keydown', '#quicklinks', this.inner_keydown );
		UW.$body.on( 'keyup', '#quicklinks a', this.animate );
		this.quicklinks.on( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', this.transitionEnd );
	},

	transitionEnd: function( event ) {
		if ( this.open && event.target == this.quicklinks[0]) {
			this.accessible();
		}
	},

	inner_keydown: function( e ) {
		var focusableEls = this.quicklinks.find( 'a' );
		var firstFocusableEl = focusableEls[0];
		var lastFocusableEl = focusableEls[focusableEls.length - 1];

		var focusableLittleLinkEls = $( '#little-links' ).find( 'a' );
		var focusableBigLinkEls = $( '#big-links' ).find( 'a' );
		var firstLittleLinkEl = focusableLittleLinkEls[0];
		var lastBigLinkEl = focusableBigLinkEls[focusableBigLinkEls.length - 1];
		if ( this.quicklinks.hasClass( 'open' ) ) {

			// may need event.prevent_default() here if screenreaders aren't acting right.
			if ( e.keyCode == 9 && e.shiftKey ) {
				if ( $( ':focus' )[0] === firstFocusableEl ) {
					lastFocusableEl.focus();
					e.preventDefault();
				} else if ( $( ':focus' )[0] === firstLittleLinkEl ) {
					lastBigLinkEl.focus();
					e.preventDefault();
				} else {
					$( ':focus' ).closest( 'li' ).prev().find( 'a' ).trigger( 'focus' );
				}
				return false;
			} if ( e.keyCode == 9 ) {
				if ( $( ':focus' )[0] === lastFocusableEl ) {
					firstFocusableEl.focus();
					e.preventDefault();
					}

			} else {

			}
		}
	},

	animate: function( e ) {
		e.preventDefault();

		if ( e.keyCode && e.keyCode != 27 ) {
			if ( e.keyCode && e.keyCode != 13 || e.keyCode && e.keyCode != 32 ) {
				return false;
			}
		}

		this.$container.toggleClass( 'open' );
		this.quicklinks.toggleClass( 'open' );

		this.open = this.quicklinks.hasClass( 'open' );
		this.loop();
		this.accessible();
	},

	accessible: function( argument ) {
		this.$el.attr( 'aria-expanded', this.open );
		if ( this.open ) {
			this.$el.attr( 'aria-label', 'Close quick links' );
			this.quicklinks.find( 'a' ).attr( 'tabindex', 0 ).first().focus();
			$( '#page-inner' ).attr( 'aria-hidden', true );
			$( '.screen-reader-shortcut' ).attr( 'aria-hidden', true );
		} else {
			this.$el.attr( 'aria-label', 'Open quick links' );
			this.quicklinks.find( 'a' ).attr( 'tabindex', -1 );
			this.$el.focus();
			$( '#page-inner' ).attr( 'aria-hidden', false );
			$( '.screen-reader-shortcut' ).attr( 'aria-hidden', false );
		}
	},

	loop: function( event ) {
		if ( this.quicklinks.hasClass( 'open' ) ) {
			this.quicklinks.find( 'li a' ).first().focus();
		}
	}

});
