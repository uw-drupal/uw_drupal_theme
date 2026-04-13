// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

const body =  document.getElementsByTagName( 'body' );
const searchArea = document.getElementById( 'uwsearcharea' );
const searchButton = document.querySelector( 'button.uw-search' );
const radiobtn = document.getElementsByClassName( 'radiobtn' );
const mobileSelect = document.getElementById( 'mobile-search-select' );
const optionsFieldset = document.getElementById( 'uw' );
const form = document.querySelector( 'form.uw-search' );
const searchLabels = document.getElementById( 'search-labels' );
const submitButton = document.querySelector( 'input.search' );
const radioLabel = document.getElementsByClassName( 'radio' );
let url = window.location.href;

//get initial search site from theme settings
let searchSite = searchArea.dataset.search;
let searchBar = document.getElementById( 'uw-search-bar' );

//change form action and name attribute depending on which site should be searched
function switchAction(  ) {
	if ( 'uw' === searchSite ) {
		form.action = 'https://uw.edu/search';
		searchBar.setAttribute( 'name', 'q' );
	} else {
		form.action = $( 'form.uw-search' ).data( 'sitesearch' );
		searchBar.setAttribute( 'name', 's' );
	}
}

//toggle search area open or closed
function toggleSearchArea() {
	document.body.classList.toggle( 'search-open' );
}

//helper function to set multiple attributes
function setAttributes( el, attrs ) {
	for ( let key in attrs ) {
		el.setAttribute( key, attrs[key]);
	}
}

//change aria stuff when search area is toggled open/closed
function toggleBlur() {
	if ( document.body.classList.contains( 'search-open' ) ) {
		searchArea.hidden = false;

		// check if this is mobile or desktop with toggle options.
		if ( optionsFieldset || mobileSelect ) {

			// if this is desktop, fieldset gets the focus.
			if ( 'none' == window.getComputedStyle( mobileSelect ).display ) {
				optionsFieldset.focus();
			} else {

				// if this is mobile, the mobile select gets the focus.
				mobileSelect.focus();
			}
		} else {

			// if there are no toggle options, put the focus on the search input.
			searchBar.focus();
		}


		setAttributes( searchButton, { 'aria-label': 'close search area', 'aria-expanded': 'true' });
		setAttributes( searchArea, { 'aria-hidden': 'false' });
	} else {
		searchArea.hidden = true;
		setAttributes( searchButton, { 'aria-label': 'open search area', 'aria-expanded': 'false' });
		setAttributes( searchArea, { 'aria-hidden': 'true' });
	}
}

//handle keydown events
document.onkeydown = ( e ) => {
	if ( ( e.keyCode === UW.KEYCODES.TAB ) ) {
		if ( e.target === submitButton && ! e.shiftKey ) {
			searchLabels.classList.add( 'focused' );
		}
		if ( ( e.target != submitButton && searchLabels.classList.contains( 'focused' ) ) ) {
			searchLabels.classList.remove( 'focused' );
			if ( ! e.shiftKey ) {
				e.stopPropagation();
				toggleSearchArea();
				searchButton.focus();
				toggleBlur();
				return false;
			}
		}
	} else if (  e.keyCode === UW.KEYCODES.ESC && $( 'body' ).hasClass( 'search-open' ) ) {
		e.stopPropagation();
		toggleSearchArea();
		searchButton.focus();
		toggleBlur();
		return false;
	} else {
		return true;
	}
};

searchButton.addEventListener( 'click', () => {
	toggleSearchArea();
	toggleBlur();
});

submitButton.addEventListener( 'click', ()  => {
	let radioArr = Array.from( radiobtn );
	radioArr.forEach( btn => {
		btn.disabled = true;
	});
	submitForm();
});

//determine which site is selected
// check if this is mobile or desktop with toggle options.
if ( optionsFieldset || mobileSelect ) {
	if ( 'none' == window.getComputedStyle( mobileSelect ).display ) { //desktop view
		for ( let i = 0; i < radioLabel.length; i++ ) {
			let input = radiobtn[i];
			input.onchange = function() {
				searchSite =  input.value;
				switchAction( );
			};
		}
	} else { //mobile view
		mobileSelect.addEventListener( 'change', function() {
			searchSite = mobileSelect.value;
			switchAction( );
		});
	}
}

function submitForm( e ) {
	form.submit();
	return false;
}
