/**
 * New node file
 */

$(document).ready(function(){
	
	
	$(".lazy").recliner({
        attrib: "data-src", // selector for attribute containing the media src
        throttle: 300,      // millisecond interval at which to process events
        threshold: 500,     // scroll distance from element before its loaded
        live: true          // auto bind lazy loading to ajax loaded elements
    });
	
});