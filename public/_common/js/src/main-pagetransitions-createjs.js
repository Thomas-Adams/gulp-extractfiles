var handleFileComplete = function(evt) {
    $("[data-src='" + evt.item.src + "']").attr("src", evt.item.src);
    loadedImages += 1;
    var percentLoaded = Math.round(loadedImages / numOfImages * 100, 0);
    return true;
};

var handleComplete = function(evt) {
    $(".lazy.main").parent().focusPoint("adjustFocus");
    $(".lazy").css("opacity", 1);
    $("div.overlay").hide();
    $(".gen-page-wrap").css("visibility", "visible");
};

var numOfImages = 0;
var loadedImages = 0;


$(document).ready(function() {
    var wh = window.innerHeight;
    $('section').height(wh);
    $('.focuspoint').focusPoint();

    var images = $(".lazy").map(function() {
        return $(this).attr('data-src');
    }).get();

    numOfImages = images.length;

    var preload = new createjs.LoadQueue(true);
    preload.setMaxConnections(10);
    preload.on("fileload", handleFileComplete, this);
    preload.on("complete", handleComplete, this);
    preload.loadManifest(images);


});
