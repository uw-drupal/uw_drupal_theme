(function (Drupal, $) {
  "use strict";
  var body = document.getElementsByTagName("body"),
    searchArea = document.getElementById("uwsearcharea"),
    searchButton = document.querySelector("button.uw-search"),
    submitButton = document.querySelector("button.js-form-submit.form-submit.btn.btn-primary"),
    searchBar = document.querySelector("input.form-search");

  function toggleSearchArea() {
    document.body.classList.toggle("search-open");
  }

  function setAttributes(e, t) {
    for (var a in t) e.setAttribute(a, t[a]);
  }

  function toggleBlur() {
    document.body.classList.contains("search-open")
      ? ((searchArea.hidden = !1), searchBar.focus(), setAttributes(searchButton, {
        "aria-hidden": "false",
        "aria-label": "close search area",
        "aria-expanded": "true",
        role: "search"
      }))
      : ((searchArea.hidden = !0), setAttributes(searchButton, {
        "aria-hidden": "true",
        "aria-label": "open search area",
        "aria-expanded": "false",
        role: "search"
      }));
  }

  // if (
  //   ((document.onkeydown = function (e) {
  //     return e.keyCode !== UW.KEYCODES.TAB
  //       ? e.keyCode !== UW.KEYCODES.ESC || !$("body").hasClass("search-open") || (e.stopPropagation(), toggleSearchArea(), searchButton.focus(), toggleBlur(), !1)
  //       : (e.target !== submitButton || e.shiftKey || searchLabels.classList.add("focused"),
  //         e.target != submitButton && searchLabels.classList.contains("focused") && (searchLabels.classList.remove("focused"), !e.shiftKey) ? (e.stopPropagation(), toggleSearchArea(), searchButton.focus(), toggleBlur(), !1) : void 0);
  //   }),
  //     searchButton.addEventListener("click", function () {
  //       toggleSearchArea(), toggleBlur();
  //     }),
  //     submitButton.addEventListener("click", function () {
  //       Array.from(radiobtn).forEach(function (e) {
  //         e.disabled = !0;
  //       }),
  //         submitForm();
  //     }),
  //   "none" == window.getComputedStyle(mobileSelect).display)
  // )
  // TODO: add onkeydown functionality to like search.js from WP theme
  //       leaving this very basic for now
  searchButton.addEventListener("click", function () {
    toggleSearchArea(), toggleBlur();
  });

}(Drupal, jQuery));
