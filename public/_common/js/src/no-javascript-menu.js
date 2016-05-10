/**
 * New node file
 */

var heightSubMenuItems = 20;

$(document).ready(function(){
	
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
	
});