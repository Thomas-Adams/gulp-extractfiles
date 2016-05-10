var heightSubMenuItems = 20;
jQuery(document).ready(function($) {
	var wh = window.innerHeight;
	$("section").height(wh);
    $('.focuspoint').focusPoint();

    
    
    $(".submenuToggle").click(function(ev){
		ev.preventDefault();
		var $this = $(this);		
		$("ul.submenu").css({
			"height": "0px"
		});	
		$(".submenuToggle").not($this).removeClass("open");
		if($this.hasClass("open")) {
			$this.removeClass("open");
		} else {
			var submenuHeight  = $this.next("ul").find("li").length * heightSubMenuItems;
			$this.next("ul").css("height", submenuHeight + "px");
			$this.addClass("open");
		}		
	});
    
    $("ul.submenu a").click(function(ev){
    	ev.preventDefault();
    	var $this =$(this);
    	var index = $this.parent().prevAll("li").size();
    	$("#scroll-body").ioSimplePageTransition("navigateTo",index);
    });
    
    $(".nav-button-wrapper-up").click(function(ev){
    	var index = $(this).closest("section").prevAll("section").size()-1;
    	$("#scroll-body").ioSimplePageTransition("navigateTo",index);
    });
    
    $(".nav-button-wrapper-down").click(function(ev){
    	var index = $(this).closest("section").prevAll("section").size()+1;
    	$("#scroll-body").ioSimplePageTransition("navigateTo",index);
    });
    
});