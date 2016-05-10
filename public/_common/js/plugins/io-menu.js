(function( $ ) {
	
	$.fn.iomenu = function(options) {
		
		var defaults = {
				heightSubMenuItems : 20
		};
		
		var settings = $.extend(defaults ,options);
		
		this.each(function(){
			var $e = $(this);
			
			$e.click(function(ev){
				ev.preventDefault();
				var $this = $(this);		
				$("ul.submenu").css({
					"height": "0px"
				});	
				$e.not($this).removeClass("open");
				if($this.hasClass("open")) {
					$this.removeClass("open");
				} else {
					var submenuHeight  = $this.next("ul").find("li").length * settings.heightSubMenuItems;
					$this.next("ul").css("height", submenuHeight + "px");
					$this.addClass("open");
				}						
			});
		});	
		
		return this;
	};
}(jQuery));
	