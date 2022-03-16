$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll <= 150) {
        $(".scroll_nav")
            .addClass("d-none")
            .fadeIn(1000);
    } else {
        $(".scroll_nav")
            .removeClass("d-none")
            .fadeIn(1000);
    }
});

$(document).ready(function () {
    // Show div by removing inline display none style rule
    $(".about_us_item").click(function () {
        $(".pakging_item").removeClass('d-none');
        $(".about_us_item").addClass('active_ab_btn');
    });

    // Hide div by setting display to none
    $(".about_us_item").click(function () {
        $(".whoweare_item").addClass('d-none');
        $(".who_we_item").removeClass('active_ab_btn');
    });

    $(".who_we_item").click(function () {
        $(".pakging_item").addClass('d-none');
        $(".who_we_item").addClass('active_ab_btn');
    });

    // Hide div by setting display to none
    $(".who_we_item").click(function () {
        $(".whoweare_item").removeClass('d-none');
        $(".about_us_item").removeClass('active_ab_btn');
    });

    $(".popup_close").click(function () {
        $(".popup").addClass('d-none');
    });
    $(".slider_right").click(function () {
        $(".popup").removeClass('d-none');
    });
});

$(document).ready(function () {
    $("#top-banner").owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
});
