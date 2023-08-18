(function (Drupal, $) {
  "use strict";
  var body = document.getElementsByTagName("body"),
    searchArea = document.getElementById("uwsearcharea"),
    searchButton = document.querySelector("button.uw-search"),
    radiobtn = document.getElementsByClassName("radiobtn"),
    mobileSelect = document.getElementById("mobile-search-select"),
    form = document.querySelector("form.uw-search"),
    searchLabels = document.getElementById("search-labels"),
    submitButton = document.querySelector("input.search"),
    radioLabel = document.getElementsByClassName("radio"),
    url = window.location.href,
    searchSite = searchArea.dataset.search,
    searchBar = document.getElementById("uw-search-bar");
  function switchAction() {
    "uw" === searchSite
      ? ((form.action = "https://uw.edu/search"),
        searchBar.setAttribute("name", "q"))
      : ((form.action = $("form.uw-search").data("sitesearch")),
        searchBar.setAttribute("name", "keys"));
  }
  function toggleSearchArea() {
    document.body.classList.toggle("search-open");
  }
  function setAttributes(e, t) {
    for (var a in t) e.setAttribute(a, t[a]);
  }
  function toggleBlur() {
    document.body.classList.contains("search-open")
      ? ((searchArea.hidden = !1),
        searchBar.focus(),
        setAttributes(searchButton, {
          "aria-hidden": "false",
          "aria-label": "close search area",
          "aria-expanded": "true",
          role: "search",
        }))
      : ((searchArea.hidden = !0),
        setAttributes(searchButton, {
          "aria-hidden": "true",
          "aria-label": "open search area",
          "aria-expanded": "false",
          role: "search",
        }));
  }
  if (
    ((document.onkeydown = function (e) {
      return e.keyCode !== UW.KEYCODES.TAB
        ? e.keyCode !== UW.KEYCODES.ESC ||
            !$("body").hasClass("search-open") ||
            (e.stopPropagation(),
            toggleSearchArea(),
            searchButton.focus(),
            toggleBlur(),
            !1)
        : (e.target !== submitButton ||
            e.shiftKey ||
            searchLabels.classList.add("focused"),
          e.target != submitButton &&
          searchLabels.classList.contains("focused") &&
          (searchLabels.classList.remove("focused"), !e.shiftKey)
            ? (e.stopPropagation(),
              toggleSearchArea(),
              searchButton.focus(),
              toggleBlur(),
              !1)
            : void 0);
    }),
    searchButton.addEventListener("click", function () {
      toggleSearchArea(), toggleBlur();
    }),
    submitButton.addEventListener("click", function () {
      Array.from(radiobtn).forEach(function (e) {
        e.disabled = !0;
      }),
        submitForm();
    }),
    "none" == window.getComputedStyle(mobileSelect).display)
  )
    for (
      var _loop = function (e) {
          var t = radiobtn[e];
          t.onchange = function () {
            (searchSite = t.value), switchAction();
          };
        },
        i = 0;
      i < radioLabel.length;
      i++
    )
      _loop(i);
  else
    mobileSelect.addEventListener("change", function () {
      (searchSite = mobileSelect.value), switchAction();
    });
  function submitForm(e) {
    return form.submit(), !1;
  }
})(Drupal, jQuery);
