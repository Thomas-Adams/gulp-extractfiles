var animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
};

function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    isAnimating = false;
    resetPage($outpage, $inpage);
}

function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' current');
}

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
    $(".lazy.main").parent().focusPoint("adjustFocus");
    $(".lazy.main").css("opacity", 1);
    $("div.overlay").hide();
    $currentPage = $pages.eq(current);
    $currentPage.addClass('current');
    //animationIndex = $currentPage.data('animation');
};

var numOfImages = 0,
    loadedImages = 0,
    pagesCount = 0,
    current = 0,
    wh = window.innerHeight,
    $currentPage = null,
    $nextPage = null,
    animationIndex = 59,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    support = Modernizr.cssanimations,
    animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];


function navigateTo(targetPageIndex) {
    var idx = parseInt(targetPageIndex.substring(1), 10) - 1;
    if (isAnimating === true) {
        return;
    }
    isAnimating = true;
    $currentPage = $pages.eq(current);
    current = idx;
    $nextPage = $pages.eq(current).addClass('current');
    $currentPage.addClass(animations[animationIndex].outClass).on(animEndEventName, function() {

        try {
            $currentPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currentPage, $nextPage);
            }
        } catch (err) {
            aler(err);
        }

    });


    $nextPage.addClass(animations[animationIndex].inClass).on(animEndEventName, function() {

        try {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currentPage, $nextPage);
            }
        } catch (err) {
            aler(err);
        }

    });

    if (!support) {
        onEndAnimation($currPage, $nextPage);
    }
}


$(document).ready(function() {
    $overlay = $("div.overlay");
    $overlay.height(wh).css('width', '100%');
    $main = $("div.container-fluid");
    $pages = $main.children("section");
    pagesCount = $pages.length;
    $('.focuspoint').focusPoint();
    var images = $(".lazy").map(function() {
        return $(this).attr('data-src');
    }).get();
    $pages.each(function(index, elem) {
        var $page = $(elem);
        $page.height(wh).data('originalClassList', $page.attr('class'));
    });
    numOfImages = images.length;

    var preload = new createjs.LoadQueue(true);
    preload.setMaxConnections(10);
    preload.on("fileload", handleFileComplete, this);
    preload.on("complete", handleComplete, this);
    preload.loadManifest(images);

    $("#cbp-spmenu-s2").height(window.innerHeight);

    $("#navToggle").click(function() {
        $("#cbp-spmenu-s2").toggleClass("cbp-spmenu-open");
    });

    $("#navClose").click(function() {
        $("#cbp-spmenu-s2").toggleClass("cbp-spmenu-open");
    });



    $(".cbp-spmenu a").click(function(ev) {
        ev.preventDefault();
        var id = $(this).attr('id');
        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open");
        navigateTo(id);
    });

    $pages.each(function(index, elem) {
        var $page = $(elem);
        $page.swipe({
            swipe: function(event, direction, distance, duration, fingercount, fingerData) {
                if (isAnimating === true) {
                    return;
                }
                isAnimating = true;
                $currentPage = $pages.eq(current);
                if (direction === 'down') {
                    if (current < pagesCount - 1) {
                        current++;
                    } else {
                        current = 0;
                    }
                    $nextPage = $pages.eq(current).addClass('current');
                    $currentPage.addClass(animations[animationIndex].outClass).on(animEndEventName, function() {

                        try {
                            $currentPage.off(animEndEventName);
                            endCurrPage = true;
                            if (endNextPage) {
                                onEndAnimation($currentPage, $nextPage);
                            }
                        } catch (err) {
                            aler(err);
                        }

                    });


                    $nextPage.addClass(animations[animationIndex].inClass).on(animEndEventName, function() {

                        try {
                            $nextPage.off(animEndEventName);
                            endNextPage = true;
                            if (endCurrPage) {
                                onEndAnimation($currentPage, $nextPage);
                            }
                        } catch (err) {
                            aler(err);
                        }

                    });
                }
                if (direction === 'up') {
                    if (current > 0) {
                        current--;
                    } else {
                        current = 0;
                    }
                    $nextPage = $pages.eq(current).addClass('current');
                    $nextPage.addClass(animations[animationIndex].inClass).on(animEndEventName, function() {

                        try {
                            $nextPage.off(animEndEventName);
                            endNextPage = true;
                            if (endCurrPage) {
                                onEndAnimation($currentPage, $nextPage);
                            }
                        } catch (err) {
                            aler(err);
                        }

                    });
                    $currentPage.addClass(animations[animationIndex].outClass).on(animEndEventName, function() {

                        try {
                            $currentPage.off(animEndEventName);
                            endCurrPage = true;
                            if (endNextPage) {
                                onEndAnimation($currentPage, $nextPage);
                            }
                        } catch (err) {
                            aler(err);
                        }

                    });



                }



                if (!support) {
                    onEndAnimation($currPage, $nextPage);
                }
            }
        });
    });
});
