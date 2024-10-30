(function (Drupal, $) {
  'use strict';
  var body = document.getElementsByTagName('body'),
    searchArea = document.getElementById('uwsearcharea'),
    searchButton = document.querySelector('button.uw-search'),
    submitButton = document.querySelector('button.js-form-submit.form-submit.btn.btn-primary'),
    searchBar = document.querySelector('input.form-search');

  function toggleSearchArea() {
    document.body.classList.toggle('search-open');
  }

  function setAttributes(e, t) {
    for (var a in t) {
      e.setAttribute(a, t[a]);
    }
  }

  function toggleBlur() {
    document.body.classList.contains('search-open')
      ? ((searchArea.hidden = !1), searchBar.focus(), setAttributes(searchButton, { 'aria-hidden': 'false', 'aria-label': 'close search area', 'aria-expanded': 'true', role: 'search' }), setAttributes(searchArea, { 'aria-hidden': 'undefined' }))
      : ((searchArea.hidden = !0), setAttributes(searchButton, { 'aria-hidden': 'true', 'aria-label': 'open search area', 'aria-expanded': 'false', role: 'search' }), setAttributes(searchArea, { 'aria-hidden': 'true' }));
  }

  searchButton.addEventListener('click', function () {
    toggleSearchArea(), toggleBlur();
  });

}(Drupal, jQuery));
