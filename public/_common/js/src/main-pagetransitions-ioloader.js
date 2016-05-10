$(document).ready(function() {
    $(".content").children().removeClass("show");
    $('.focuspoint').focusPoint();
    var wh = window.innerHeight;
    $("section").height(wh);
    $("img.lazy").ioloader();
});
