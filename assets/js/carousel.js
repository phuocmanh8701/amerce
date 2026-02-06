$(window).on("load", function () {
    $(".tf-swiper").each(function (index, element) {
        var $this = $(element);
        var laptop = $this.data("laptop") || 1;
        var preview = $this.data("preview") || 1;
        var tablet = $this.data("tablet") || 1;
        var mobile = $this.data("mobile") || 1;
        var mobileSm = $this.data("mobile-sm") !== undefined ? $this.data("mobile-sm") : mobile;

        // Spacing
        var spacing = $this.data("space");
        var spacingMd = $this.data("space-md");
        var spacingLg = $this.data("space-lg");
        var spacingXxl = $this.data("space-xxl");

        if (spacing !== undefined && spacingMd === undefined && spacingLg === undefined) {
            spacingMd = spacing;
            spacingLg = spacing;
        } else if (spacing === undefined && spacingMd !== undefined && spacingLg === undefined) {
            spacing = 0;
            spacingLg = spacingMd;
        }
        spacing = spacing || 0;
        spacingMd = spacingMd || 0;
        spacingLg = spacingLg || 0;
        spacingXxl = spacingXxl || 1;

        var perGroup = $this.data("pagination") || 1;
        var perGroupSm = $this.data("pagination-sm") || 1;
        var perGroupMd = $this.data("pagination-md") || 1;
        var perGroupLg = $this.data("pagination-lg") || 1;
        var gridRows = $this.data("grid") || 1;
        var cursorType = $this.data("cursor") ?? false;
        var loop = $this.data("loop") ?? false;
        var loopMd = $this.data("loop-md") ?? false;
        var effect = $this.data("effect") || "slide";
        var atPlay = $this.data("auto"); // True || False
        var speed = $this.data("speed") || 800;
        var delay = $this.data("delay") || 1000;
        var direction = $this.data("direction") || "horizontal";
        var centered = $this.data("center") ?? false;
        var init = $this.data("init") || 0;
        var touch = $this.data("touch") ?? true;


        var isNumberType = $this.hasClass("swiper-type-number");
        var paginationConfig = isNumberType
            ? {
                el: ".pagination-fraction",
                type: "fraction",
                renderFraction: function (prev, next) {
                    return `<span class="${prev}"></span><span class="swiper-slice"></span> <span class="${next}"></span>`;
                },
            }
            : {
                el: [
                    $this.find(".tf-sw-pagination")[0],
                    $this.closest(".tf-pag-swiper").find(".tf-sw-pagination")[0],
                ],
                clickable: true,
            };

        var swiperT = new Swiper($this[0], {
            direction: direction,
            speed: speed,
            centeredSlides: centered,
            slidesPerView: mobile,
            spaceBetween: spacing,
            slidesPerGroup: perGroup,
            grabCursor: cursorType,
            loop: loop,
            effect: effect,
            initialSlide: init,
            touchStartPreventDefault: touch,
            autoplay: atPlay
                ? {
                    delay: delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }
                : false,
            grid: {
                rows: gridRows,
                fill: "row",
            },
            pagination: paginationConfig,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: [
                    $this.find(".nav-next-swiper")[0],
                    $this.closest(".tf-btn-swiper-main").find(".nav-next-swiper")[0],
                    $this.closest(".box-swiper").find(".nav-next-swiper")[0],
                    $this.closest(".container").find(".group-btn-slider .nav-next-swiper")[0],
                ],
                prevEl: [
                    $this.find(".nav-prev-swiper")[0],
                    $this.closest(".tf-btn-swiper-main").find(".nav-prev-swiper")[0],
                    $this.closest(".box-swiper").find(".nav-prev-swiper")[0],
                    $this.closest(".container").find(".group-btn-slider .nav-prev-swiper")[0],
                ],
            },
            breakpoints: {
                575: {
                    slidesPerView: mobileSm,
                    spaceBetween: spacing,
                    slidesPerGroup: perGroupSm,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                768: {
                    slidesPerView: tablet,
                    spaceBetween: spacingMd,
                    slidesPerGroup: perGroupMd,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                1200: {
                    slidesPerView: preview,
                    spaceBetween: spacingLg,
                    slidesPerGroup: perGroupLg,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                1600: {
                    slidesPerView: laptop === 1 ? preview : laptop,
                    spaceBetween: spacingXxl === 1 ? spacingLg : spacingXxl,
                    slidesPerGroup: perGroupLg,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
            },
        });
        $(".swiper-button")
            .on("mouseenter", function () {
                var slideIndex = $(this).data("slide");
                swiperT.slideTo(slideIndex, 500, false);

                $(".tf-swiper .card-product").removeClass("active");
                $(".tf-swiper .card-product").eq(slideIndex).addClass("active");
            })
            .on("mouseleave", function () {
                $(".tf-swiper .card-product").removeClass("active");
            })
            .on("click", function () {
                var slideIndex = $(this).data("slide");
                $(".tf-swiper .card-product").eq(slideIndex).toggleClass("clicked");
            });
    });
});

if ($(".tf-sw-thumbs").length > 0) {
    var $this = $(".tf-sw-thumbs");
    var thumbEffect = $this.find(".sw-thumb").data("effect") || "slide";

    var thumbSwiper = new Swiper(".sw-thumb", {
        slidesPerView: 1,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        speed: 800,
        centeredSlides: true,
        effect: thumbEffect,
        navigation: {
            nextEl: ".group-action-nav_thumb .nav-next-swiper",
            prevEl: ".group-action-nav_thumb .nav-prev-swiper",
        },
    });

    var mainSwiper = new Swiper(".sw-main-thumb", {
        grabCursor: true,
        speed: 800,
        spaceBetween: 20,
        navigation: {
            nextEl: ".tes_thumb .nav-next-swiper",
            prevEl: ".tes_thumb .nav-prev-swiper",
        },
        pagination: {
            el: ".sw-pg-thumb",
            clickable: true,
        },
    });
    thumbSwiper.controller.control = mainSwiper;
    mainSwiper.controller.control = thumbSwiper;
}
if ($(".slider-thumb-wrap").length > 0) {
    const contentThumbSlider = new Swiper(".slider-content-thumb", {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        speed: 800,
        on: {
            slideChange: function () {
                const activeIndex = this.realIndex;
                $(".btn-thumbs").removeClass("active");
                $(".btn-thumbs").eq(activeIndex).addClass("active");
            },
        },
    });

    $(".btn-thumbs").on("click", function () {
        const index = $(this).index();
        $(".btn-thumbs").removeClass("active");
        $(this).addClass("active");
        contentThumbSlider.slideToLoop(index);
    });
}

if ($(".tf-sw-mobile").length > 0) {
    $(".tf-sw-mobile").each(function () {
        var swiperMb;
        var $this = $(this);
        var screenWidth = $this.data("screen");

        function initSwiper() {
            if (
                matchMedia(`only screen and (max-width: ${screenWidth}px)`)
                    .matches
            ) {
                if (!swiperMb) {
                    var preview = $this.data("preview");
                    var previewMd = $this.data("preview-md") || preview;
                    var spacing = $this.data("space");

                    swiperMb = new Swiper($this[0], {
                        slidesPerView: preview,
                        spaceBetween: spacing,
                        speed: 1000,
                        pagination: {
                            el: $this.find(".sw-pagination-mb")[0],
                            clickable: true,
                        },
                        navigation: {
                            nextEl: $this.find(".nav-prev-mb")[0],
                            prevEl: $this.find(".nav-next-mb")[0],
                        },

                        breakpoints: {
                            640: {
                                slidesPerView: previewMd,
                                spaceBetween: spacing,
                            },
                        },
                        
                    });
                }
            } else {
                if (swiperMb) {
                    swiperMb.destroy(true, true);
                    swiperMb = null;
                    $this.find(".swiper-wrapper").removeAttr("style");
                    $this.find(".swiper-slide").removeAttr("style");
                }
            }
        }

        initSwiper();
        window.addEventListener("resize", function () {
            initSwiper();
        });
    });
}