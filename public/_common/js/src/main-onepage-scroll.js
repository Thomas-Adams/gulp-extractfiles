var heightSubMenuItems = 20;
jQuery(document).ready(function($) {

	$(".content").children().removeClass("show");
	$("#scroll-body").ioSimplePageTransition();
	$('.focuspoint').focusPoint();

	$('.blue .lazy').ioloader({
		onBeforeImageShow: function(e) {
			if (e.hasClass("main"))
				e.parent().focusPoint("adjustFocus");
			$('.blue .content').children().addClass("show");
		}
	});


	$('.magenta .lazy').ioloader({
		onBeforeImageShow: function(e) {
			if (e.hasClass("main"))
				e.parent().focusPoint("adjustFocus");
		}
	});

	$(".submenuToggle").click(function(ev) {
		ev.preventDefault();
		var $this = $(this);
		$("ul.submenu").css({
			"height": "0px"
		});
		$(".submenuToggle").not($this).removeClass("open");
		if ($this.hasClass("open")) {
			$this.removeClass("open");
		} else {
			var submenuHeight = $this.next("ul").find("li").length * heightSubMenuItems;
			$this.next("ul").css("height", submenuHeight + "px");
			$this.addClass("open");
		}
	});

	$("ul.submenu a").click(function(ev) {
		ev.preventDefault();
		//$("#scroll-body").removeClass("pagetransition");
		//$("#scroll-body").addClass("nopagetransition");
		var $this = $(this);
		var index = $this.parent().prevAll("li").size();
		$("#scroll-body").ioSimplePageTransition("navigateTo", index);
		//$("#scroll-body").removeClass("nopagetransition");
		//$("#scroll-body").addClass("pagetransition");

	});

	$(document).on("section-loaded", function(ev) {
		$("div.overlay").hide();
	});

	$(".nav-button-wrapper-up").click(function(ev) {
		var index = $(this).closest("section").prevAll("section").size() - 1;
		$("#scroll-body").ioSimplePageTransition("navigateTo", index);
	});

	$(".nav-button-wrapper-down").click(function(ev) {
		var index = $(this).closest("section").prevAll("section").size() + 1;
		$("#scroll-body").ioSimplePageTransition("navigateTo", index);
	});

});
