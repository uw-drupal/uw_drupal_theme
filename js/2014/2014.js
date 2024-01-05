"use strict";
var root = window.document,
  UW = function e(o) {
    return o instanceof e
      ? o
      : this instanceof e
      ? void (this._wrapped = o)
      : new e(o);
  };
((root.UW = UW).VERSION = "0.1"),
  (UW.KEYCODES = { TAB: 9, ENTER: 13, ESC: 27 }),
  (UW.elements = {
    alert: ".site-header",
    radio: ":radio",
    checkbox: ":checkbox",
    search: "#uwsearcharea",
    select: ".uw-select",
    quicklinks: ".uw-quicklinks",
  }),
  (UW.getBaseUrl = function () {
    var e = _.first(_.compact(Backbone.history.location.pathname.split("/")));
    return (
      Backbone.history.location.origin ||
        (Backbone.history.location.origin =
          Backbone.history.location.protocol +
          "//" +
          Backbone.history.location.hostname +
          (Backbone.history.location.port
            ? ":" + Backbone.history.location.port
            : "")),
      -1 != Backbone.history.location.origin.indexOf("www.washington.edu")
        ? Backbone.history.location.origin + (e ? "/" + e : "") + "/"
        : -1 != Backbone.history.location.origin.indexOf("depts.washington.edu")
        ? Backbone.history.location.origin + (e ? "/" + e : "") + "/"
        : Backbone.history.location.origin + "/"
    );
  }),
  (UW.wpinstance = function () {
    return Backbone.history.location.pathname
      ? Backbone.history.location.pathname
      : "";
  }),
  (UW.sources = { search: UW.getBaseUrl() + "wp-admin/admin-ajax.php" }),
  (UW.initialize = function (e) {
    (UW.$body = e("body")),
      (UW.$window = e(window)),
      (UW.baseUrl = UW.getBaseUrl()),
      (UW.alert = new UW.Alert({
        after: UW.elements.alert,
        model: new UW.Alert.Model(),
      })),
      (UW.quicklinks = _.map(e(UW.elements.quicklinks), function (e) {
        return new UW.QuickLinks({ el: e });
      })),
      (UW.radio = _.map(e(UW.elements.radio), function (e) {
        return new UW.Radio({ el: e });
      })),
      (UW.checkbox = _.map(e(UW.elements.checkbox), function (e) {
        return new UW.Radio({ el: e });
      })),
      (UW.select = _.map(e(UW.elements.select), function (e) {
        return new UW.Select({ el: e });
      }));
  }),
  jQuery(document).ready(function () {
    UW.initialize(jQuery);
  });
("use strict");
(UW.Alert = Backbone.View.extend({
  alert: "#uwalert-alert-message",
  events: { "click .close": "hide" },
  template:
    '<div id="uwalert-alert-message" class="<% _.each( categories, function( category ) { %> <%= category.slug %> <% }) %>"><div class="container"><span class="close">Close</span><h1><%= title %></h1><p><%= excerpt %><a class="more" href="http://emergency.uw.edu" title="<%= title %>">More info</a></p></div></div>',
  initialize: function (e) {
    _.bindAll(this, "render", "hide"),
      (this.options = _.extend({}, e)),
      this.model.on("sync", this.render);
  },
  render: function () {
    this.model.get("title") &&
      ($(this.options.after).after(
        _.template(this.template)(this.model.toJSON())
      ),
      this.setElement($(this.alert)));
  },
  hide: function () {
    this.$el.remove();
  },
})),
  (UW.Alert.Model = Backbone.Model.extend({
    alerts: ["red-alert-urgent", "orange-alert", "steel-alert-fyis"],
    data: {
      c: "?",
      test: !0,
      number: 1,
      type: "post",
      status: "publish",
      dataType: "json",
    },
    url: "https://public-api.wordpress.com/rest/v1/sites/uwemergency.wordpress.com/posts/",
    initialize: function () {
      this.fetch({ data: this.data });
    },
    parse: function (e) {
      var t = _.first(e.posts);
      if (
        (_.extend(t.categories, {
          alert: { slug: window.location.hash.replace("#", "") },
        }),
        _.intersection(_.pluck(t.categories, "slug"), this.alerts).length ||
          -1 !== t.categories.alert.slug.indexOf("uwalert"))
      )
        return t;
    },
  }));
("use strict");
UW.QuickLinks = Backbone.View.extend({
  container: "#page",
  events: {
    click: "animate",
    touchstart: "animate",
    keyup: "animate",
    blur: "loop",
  },
  initialize: function (i) {
    _.bindAll(
      this,
      "inner_keydown",
      "render",
      "animate",
      "accessible",
      "loop",
      "transitionEnd"
    ),
      this.render();
  },
  render: function () {
    (this.quicklinks = $("#quicklinks")),
      (this.$container = $(this.container)),
      this.$el
        .attr("aria-controls", "quicklinks")
        .attr("aria-owns", "quicklinks"),
      UW.$body.on("keydown", "#quicklinks", this.inner_keydown),
      UW.$body.on("keyup", "#quicklinks a", this.animate),
      this.quicklinks.on(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        this.transitionEnd
      );
  },
  transitionEnd: function (i) {
    this.open && i.target == this.quicklinks[0] && this.accessible();
  },
  inner_keydown: function (i) {
    var n = this.quicklinks.find("a"),
      t = n[0],
      e = n[n.length - 1];
    if (this.quicklinks.hasClass("open")) {
      if (9 == i.keyCode && i.shiftKey)
        return (
          $(":focus")[0] === t
            ? (e.focus(), i.preventDefault())
            : (console.log($(":focus").closest("li").prevAll("li > a")),
              $(":focus").closest("li").prev().find("a").trigger("focus")),
          !1
        );
      9 == i.keyCode && $(":focus")[0] === e && (t.focus(), i.preventDefault());
    }
  },
  animate: function (i) {
    if (
      (i.preventDefault(),
      i.keyCode &&
        27 != i.keyCode &&
        ((i.keyCode && 13 != i.keyCode) || (i.keyCode && 32 != i.keyCode)))
    )
      return !1;
    this.$container.toggleClass("open"),
      this.quicklinks.toggleClass("open"),
      (this.open = this.quicklinks.hasClass("open")),
      this.loop(),
      this.accessible();
  },
  accessible: function (i) {
    this.$el.attr("aria-expanded", this.open),
      this.quicklinks.attr("aria-hidden", (!this.open).toString()),
      this.open
        ? (this.$el.attr("aria-label", "Close quick links"),
          this.quicklinks.find("a").attr("tabindex", 0).first().focus(),
          $("#page-inner").attr("aria-hidden", !0),
          $(".screen-reader-shortcut").attr("aria-hidden", !0))
        : (this.$el.attr("aria-label", "Open quick links"),
          this.quicklinks.find("a").attr("tabindex", -1),
          this.$el.focus(),
          $("#page-inner").attr("aria-hidden", !1),
          $(".screen-reader-shortcut").attr("aria-hidden", !1));
  },
  loop: function (i) {
    this.quicklinks.hasClass("open") &&
      this.quicklinks.find("li a").first().focus();
  },
});
("use strict");
UW.Radio = Backbone.View.extend({
  states: { checked: "checked", disabled: "disabled" },
  events: { "click input": "toggle" },
  initialize: function (t) {
    _.bindAll(this, "toggle", "getGroup", "toggleCheckBox"),
      (this.settings = _.extend({}, this.defaults, this.$el.data(), t)),
      (this.$input = this.$el),
      (this.name = this.$el.attr("name")),
      this.setElement(this.$el.closest("label")),
      this.setState();
  },
  setState: function () {
    this.$input.prop(this.states.disabled) &&
      this.$el.addClass(this.states.disabled),
      this.$input.prop(this.states.checked) &&
        this.$el.addClass(this.states.checked);
  },
  getGroup: function () {
    return "radio" === this.$input.attr("type")
      ? _.where(UW.radio, { name: this.name })
      : "checkbox" === this.$input.attr("type")
      ? _.where(UW.checkbox, { name: this.name })
      : void 0;
  },
  toggle: function (t) {
    _.each(this.getGroup(), this.toggleCheckBox);
  },
  toggleCheckBox: function (t) {
    var e = t.$input.prop(this.states.checked),
      s = t.$input.prop(this.states.disabled);
    !s &&
      t.$el.removeClass(this.states.checked) &&
      t.$el.removeAttr(this.states.checked).trigger("change"),
      s ||
        (e &&
          t.$el.addClass(this.states.checked) &&
          t.$el.trigger($.Event("toggle")),
        e !== t.$el.prop(this.states.checked) && t.$el.trigger("change"));
  },
});
("use strict");
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
      searchBar.setAttribute("name", "s"));
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
("use strict");
UW.SearchToggle = Backbone.View.extend({
  el: "button.uw-search",
  events: { click: "toggleSearchBar" },
  settings: { isOpen: !1 },
  initialize: function () {},
  toggleSearchBar: function () {
    return (
      (this.settings.isOpen = !this.settings.isOpen),
      this.trigger("open"),
      UW.$body.toggleClass("search-open"),
      this.settings.isOpen
        ? (this.$el.attr("aria-label", "close search area"),
          this.$el.attr("aria-expanded", "true"))
        : (this.$el.attr("aria-label", "open search area"),
          this.$el.attr("aria-expanded", "false")),
      !1
    );
  },
});
("use strict");
UW.Select = Backbone.View.extend({
  el: ".uw-select",
  submit: !1,
  current: 0,
  keyCodes: { enter: 13, spacebar: 32, tab: 9, up: 38, down: 40 },
  events: {
    "keydown li": "openMenuOnKeydown",
    "click li.active": "open",
    "click li.inactive": "close",
    "click .uw-select-arrow": "open",
    "click .uw-select-arrow.open": "closeWithoutAnimating",
    click: "closeWithoutAnimating",
  },
  template:
    '<div class="uw-select-mask"><ul class="uw-select"><% _.each( lis, function( title, value ) { %><li data-value="<%= value %>"><a href="#"><%= title %></a></li><% }) %></ul><span class="uw-select-arrow"></span></div>',
  initialize: function (e) {
    _.bindAll(
      this,
      "open",
      "close",
      "addOpenClass",
      "removeOpenClass",
      "closeWithoutAnimating"
    ),
      (this.options = _.extend({}, this.settings, this.$el.data(), e)),
      this.parseSelect(),
      this.render(),
      $("body").click(this.closeWithoutAnimating);
  },
  open: function (e) {
    return (
      this.isOpen() ? this.closeWithoutAnimating() : this.addOpenClass(), !1
    );
  },
  close: function (e) {
    this.$target = $(e.currentTarget);
    var t = this.$target.index();
    return (
      this.isDisabled(t) ||
        ((this.clicked = !0),
        (this.current = t),
        this.animate(),
        this.toggleLIClasses()),
      !1
    );
  },
  isDisabled: function (e) {
    var t = this.$el.find("li").eq(e).data().value;
    return this.$select.find('option[value="' + t + '"]').prop("disabled");
  },
  closeWithoutAnimating: function () {
    this.$el.removeClass("open"), this.$el.children().removeClass("open");
  },
  animate: function () {
    (this.scroll =
      this.$target.offset().top - this.$el.find("li").first().offset().top),
      this.$el
        .children("ul")
        .animate(
          { scrollTop: this.scroll },
          { queue: !1, complete: this.removeOpenClass }
        );
  },
  cloneSelectEvents: function () {
    var e = this.$el.find("li").eq(this.current).data().value;
    this.$select.val(e),
      this.$select.find('option[value="' + e + '"]').prop("selected", !0),
      this.submit && this.$select.parent("form").submit(),
      this.trigger_link && (window.location = e),
      this.$select.hasClass("uw-select-wp") &&
        (window.location = UW.baseUrl + "?cat=" + e);
  },
  render: function () {
    (this.html = _.template(this.template)({ lis: this.LIs })),
      this.$el.hide().after(this.html),
      (this.$select = this.$el),
      this.setElement(this.$el.next()),
      this.toggleLIClasses(),
      this.$el.find("li").length < 7 && this.$el.children("ul").height("auto");
  },
  parseSelect: function () {
    var e = _.map(this.$el.find("option"), this.getValue),
      t = _.map(this.$el.find("option"), this.getText);
    this.$el.data("submit") && (this.submit = !0),
      "links" == this.$el.data("type") && (this.trigger_link = !0),
      (this.current = this.$el.find(":selected").index()),
      (this.LIs = _.object(e, t));
  },
  toggleLIClasses: function () {
    this.$el.find("li").removeClass().addClass("inactive"),
      this.$el.find("li").eq(this.current).removeClass().addClass("active");
  },
  addOpenClass: function () {
    this.$el.addClass("open"),
      this.$el.children().addClass("open"),
      this.$el.children("ul").scrollTop(this.scroll);
  },
  removeOpenClass: function (e) {
    this.cloneSelectEvents(),
      (this.clicked || e) &&
        (this.$el.removeClass("open"),
        this.$el.children().removeClass("open"),
        (this.clicked = !1));
  },
  getText: function (e) {
    return $(e).text();
  },
  getValue: function (e) {
    return e.value;
  },
  openMenuOnKeydown: function (e) {
    if (e.keyCode == this.keyCodes.tab && !this.isOpen()) return !0;
    if (_.contains(this.keyCodes, e.keyCode)) {
      switch ((this.isOpen() || this.open(), e.keyCode)) {
        case this.keyCodes.down:
          this.down();
          break;
        case this.keyCodes.up:
          this.up();
          break;
        case this.keyCodes.enter:
        case this.keyCodes.spacebar:
          this.current != this.$select.val() &&
            (this.removeOpenClass(!0),
            this.toggleLIClasses(),
            this.cloneSelectEvents());
      }
      return !1;
    }
  },
  up: function () {
    this.atEdge("up") || ((this.current -= 1), this.move());
  },
  down: function () {
    this.atEdge("down") || ((this.current += 1), this.move());
  },
  move: function () {
    (this.$target = this.$el.find("li").eq(this.current)),
      this.$target.find("a").focus(),
      this.animate();
  },
  atEdge: function (e) {
    return (
      (0 === this.current && "up" === e) ||
      (this.current === this.$el.find("li").length - 1 && "down" === e)
    );
  },
  isOpen: function () {
    return this.$el.hasClass("open");
  },
});
