/**
 * io-simple-page-transition.js
 * JQuery plugin implementing a simple single page navigation.
 * This plugin depends on the following other plugins:
 * 	1. jquery.touchSwipe
 *  2. jquery.focuspoint
 *  3. io-loader plugin
 */

(function($, window, document, undefined) {


	$.widget("ui.ioSimplePageTransition", {

		initialized: false,

		activeSectionIndex: 0,

		countSections: 0,

		options: {
			selectorClickNext: null,
			selectorClickPrevious: null,
			pageflow: "vertical",
			pageSelector: "section"

		},


		_init: function() {
			var $elem = $(this.element),
				wh = window.innerHeight;
			var sections = $elem.find(this.options.pageSelector);
			sections.height(wh);
			this.countSections = sections.size();
			this.initialized = true;
		},

		_create: function() {
			var wh = window.innerHeight,
				self = this,
				$elem = $(this.element),
				sections = $elem.find(this.options.pageSelector),
				direction1 = this.options.pageflow === "vertical" ? "down" : "right",
				direction2 = this.options.pageflow === "vertical" ? "up" : "left";

			if (!this.initialized) this._init();

			sections.each(function(index, section) {
				var $e = $(section);

				$e.swipe({
					swipe: function(event, direction, distance, duration, fingercount, fingerData) {
						if (direction === direction1) { //down

							if (self.activeSectionIndex === 0) {
								var clazz = "";
								for (var i = 2; i < self.countSections + 1; i++) {
									clazz += " page" + i;
								}
								$elem.removeClass($.trim(clazz));
							} else {
								$(self.options.pageSelector).find(".content").children().removeClass("show");
								self._loadPrevious($e);
								$elem.removeClass("page" + (self.activeSectionIndex + 1));
								self.activeSectionIndex--;
								var top = (-100 * self.activeSectionIndex) + "%",
									offset = $elem.offset();
								offset.top = offset.top + wh;
								$e.prev().find(".content").children().addClass("show");
							}
						}

						if (direction === direction2) { //up
							if (self.activeSectionIndex === (self.countSections - 1)) {
								//nope, no looping
							} else {
								$(self.options.pageSelector).find(".content").children().removeClass("show");
								self._loadNext($e);
								self.activeSectionIndex++;
								var clazz = "page" + (self.activeSectionIndex + 1);
								$elem.addClass(clazz);
								var top = (-100 * self.activeSectionIndex) + "%",
									offset = $elem.offset();
								offset.top = offset.top - wh;
								$e.next().find(".content").children().addClass("show");
							}
						}
					}
				});
			});
		},

		_loadNext: function(e) {
			if (e.next()[0]) {
				e.next().find(".lazy").ioloader({
					onBeforeImageShow: function(elem) {
						if (elem.hasClass("main"))
							elem.parent().focusPoint("adjustFocus");

					}
				});

				if (e.next().next()[0]) {
					e.next().next().find(".lazy").ioloader({
						onBeforeImageShow: function(elem) {
							if (elem.hasClass("main"))
								elem.parent().focusPoint("adjustFocus");
						}
					});
				}
			}
		},



		_loadPrevious: function(e) {

			if (e.prev()[0]) {
				e.prev().find(".lazy").ioloader({
					onBeforeImageShow: function(elem) {
						if (elem.hasClass("main"))
							elem.parent().focusPoint("adjustFocus");
					}
				});
				if (e.prev().prev()[0]) {

					e.prev().prev().find(".lazy").ioloader({
						onBeforeImageShow: function(elem) {
							if (elem.hasClass("main"))
								elem.parent().focusPoint("adjustFocus");
						}
					});
				}
			}
		},

		_loadCurrent: function(e) {
			e.find(".lazy").ioloader({
				onBeforeImageShow: function(elem) {
					if (elem.hasClass("main"))
						elem.parent().focusPoint("adjustFocus");
				}
			});
		},

		navigateTo: function(index) {
			$("#scroll-body").removeClass("pagetransition");
			$("#scroll-body").addClass("nopagetransition");
			var $elem = $(this.element),
				e = $elem.find(this.options.pageSelector).eq(index),
				wh = window.innerHeight;
			this._loadCurrent(e);
			this._loadPrevious(e);
			this._loadNext(e);


			this.activeSectionIndex = index;
			var top = (-100 * this.activeSectionIndex) + "%",
				offset = $elem.offset(),
				clazz = "page" + (this.activeSectionIndex + 1);
			offset.top = this.activeSectionIndex * wh;

			var clazz = "";
			for (var i = 2; i < this.countSections + 1; i++) {
				clazz += " page" + i;
			}
			$elem.removeClass($.trim(clazz));

			clazz = "";
			for (var i = 2; i < index + 2; i++) {
				clazz += " page" + i;
			}
			$elem.addClass(clazz);


			$(this.options.pageSelector).find(".content").children().removeClass("show");
			e.find(".content").children().addClass("show");

			$("#scroll-body").removeClass("nopagetransition");
			$("#scroll-body").addClass("pagetransition");

			return $elem;
		},

		_setOption: function(key, value) {

		},

		_update: function() {

		},

		_destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments);
		}

	});

})(jQuery, window, document);
