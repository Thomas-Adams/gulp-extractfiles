var handleFileComplete = function(evt) {
    $("[data-src='" + evt.item.src + "']").attr("src", evt.item.src);
    if ($("[data-src='" + evt.item.src + "']").hasClass("main")) {
        $("[data-src='" + evt.item.src + "']").parent().focusPoint("adjustFocus");
    }
    loadedImages += 1;
    var percentLoaded = Math.round(loadedImages / numOfImages * 100, 0);
    return true;
};

var handleComplete = function(evt) {
    $(".lazy.main").css("opacity", 1);
    $(".lazy.main").parent().focusPoint("adjustFocus");
    $("div.overlay").hide();
    $(window).stellar();
};

var numOfImages = 0;
var loadedImages = 0;



$(document).ready(function() {
    var images = ['_common/css/images/Chrysanthemum.jpg', '_common/css/images/Hydrangeas.jpg', '_common/css/images/Tulips.jpg'];
    numOfImages = images.length;
    var preload = new createjs.LoadQueue(true);
    preload.setMaxConnections(10);
    preload.on("fileload", handleFileComplete, this);
    preload.on("complete", handleComplete, this);
    preload.loadManifest(images);

    $('#scroller').stellar({
        horizontalScrolling: false,
        scrollProperty: 'transform',
        verticalOffset: 0,
        parallaxBackgrounds: true,
        parallaxElements: true,
        hideDistantElements: false,
    });
    $(document).mousedown(function(e) {
        e.preventDefault();
    });
});
