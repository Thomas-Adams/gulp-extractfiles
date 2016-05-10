
var handleFileComplete = function(evt){	
	$("[data-src='" + evt.item.src +"']").attr("src", evt.item.src);
	if($("[data-src='" + evt.item.src +"']").hasClass("main")) {		
		$("[data-src='" + evt.item.src +"']").parent().focusPoint("adjustFocus");
	}
	loadedImages +=1;
	var percentLoaded = Math.round(loadedImages / numOfImages *100,0);
	$("#preloadModal .progress-bar").css('width', percentLoaded +'%').html(percentLoaded + "%");
	return true;
};

var handleComplete = function(evt){
	$(".lazy.main").css("opacity",1);
	$(".lazy.main").parent().focusPoint("adjustFocus");
	$("#preloadModal").modal('hide');
	scene1.trigger("enter");
};

var numOfImages = 0;
var loadedImages = 0;
var scene1,scene2,scene3,scene4,scene5,scene6,scene7;

jQuery(document).ready(function($) {
	$("#preloadModal").modal({show:true, backdrop: 'static'});
	var controller = new ScrollMagic.Controller();
	var wh = window.innerHeight;
	$('.focuspoint').focusPoint();
	
	var images = $(".lazy").map(function(){
		return $(this).attr('data-src');
	}).get();
	
	numOfImages = images.length;
	
	var preload = new createjs.LoadQueue(true);
	preload.setMaxConnections(10);
	preload.on("fileload", handleFileComplete, this);
	preload.on("complete", handleComplete, this);
	preload.loadManifest(images);
	
	
	$("section").height(wh);
	$(".content").children().removeClass("show");
	
	var bodyHeight = 0;
	$("section").each(function(){
		$(this).css("top", bodyHeight +"px");
		bodyHeight += $(this).height();		
	});
	
	//$(".content").css("top",-wh + "px");
	
	$(document).height(bodyHeight);
	
	
	
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
    });
    
    var controller = new ScrollMagic.Controller();
    
    scene1 = new ScrollMagic.Scene({ triggerElement : "#blue"}).setClassToggle("#blue","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#magenta"}).setClassToggle("#magenta","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#yellow"}).setClassToggle("#yellow","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#red"}).setClassToggle("#red","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#aqua"}).setClassToggle("#aqua","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#black"}).setClassToggle("#black","show").addTo(controller);
    scene2 = new ScrollMagic.Scene({ triggerElement : "#green"}).setClassToggle("#green","show").addTo(controller);
    
    
    
});


