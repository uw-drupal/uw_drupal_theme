(function (Drupal, $) {
  "use strict";
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
        9 == i.keyCode &&
          $(":focus")[0] === e &&
          (t.focus(), i.preventDefault());
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
})(Drupal, jQuery);
