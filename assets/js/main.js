/**
 * Select Image
 * Button Quantity
 * Delete File
 * Go Top
 * Variant Picker
 * Sidebar Mobile
 * Stagger Wrap
 * Modal Second
 * Header Sticky
 * Auto Popup
 * Total Price Variant
 * Handle Progress
 * Handle Footer
 * Infinite Slide
 * Add Wishlist
 * Handle Sidebar Filter
 * Estimate Shipping
 * Coupon Copy
 * Parallaxie
 * Update Compare Empty
 * Delete Wishlist
 * Click Active
 * Handle Mobile Menu
 * Color Swatch Product
 * Custom Dropdown
 * Bottom Sticky
 * Show Password
 * Change Image Dashboard
 * Select Category
 * Hover Pin
 * Rate Click
 * Check Box Transfer Checkout Page
 * Counter Odo
 * Update Bundle Total
 * Preloader
 */

(function ($) {
    "use strict";

    /* Select Image
    -------------------------------------------------------------------------*/
    var dropdownSelect = function () {
        if ($(".tf-dropdown-select").length > 0) {
            const selectIMG = $(".tf-dropdown-select");

            selectIMG.find("option").each((idx, elem) => {
                const selectOption = $(elem);
                const imgURL = selectOption.attr("data-thumbnail");
                if (imgURL) {
                    selectOption.attr("data-content", `<img src="${imgURL}" alt="Country" /> ${selectOption.text()}`);
                }
            });
            selectIMG.selectpicker();
        }
    };

    /* Button Quantity
    -------------------------------------------------------------------------*/
    var btnQuantity = function () {
        $(".minus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > 1) {
                value = value - 1;
            }
            $input.val(value);
        });

        $(".plus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > -1) {
                value = value + 1;
            }
            $input.val(value);
        });
    };

    /* Delete File 
    -------------------------------------------------------------------------*/
    var deleteFile = function (e) {
        function updateCount() {
            var count = $(".list-file-delete .file-delete").length;
            $(".prd-count").text(count);
        }

        function updateTotalPrice() {
            var total = 0;

            $(".list-file-delete .tf-mini-cart-item").each(function () {
                var priceText = $(this).find(".tf-mini-card-price").text().replace("$", "").replace(",", "").trim();
                var price = parseFloat(priceText);
                if (!isNaN(price)) {
                    total += price;
                }
            });

            var formatted = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
            $(".tf-totals-total-value").text(formatted);
        }

        function updatePriceEach() {
            $(".each-prd").each(function () {
                var priceText = $(this).find(".each-price").text().replace("$", "").replace(",", "").trim();
                var price = parseFloat(priceText);
                var quantity = parseInt($(this).find(".quantity-product").val(), 10);
                if (!isNaN(price) && !isNaN(quantity)) {
                    var subtotal = price * quantity;
                    var formatted = subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
                    $(this).find(".each-subtotal-price").text(formatted);
                }
            });
        }

        function updateTotalPriceEach() {
            var total = 0;

            $(".each-list-prd .each-prd").each(function () {
                var priceText = $(this)
                    .find(".each-subtotal-price")
                    .text()
                    .replace(/[$,]/g, "")
                    .trim();

                var subtotal = parseFloat(priceText);

                if (!isNaN(subtotal)) {
                    total += subtotal;
                }
            });

            var formatted = total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });

            $(".each-total-price").text(formatted);
        }


        function checkListEmpty() {
            $(".wrap-empty_text").each(function () {
                var $listEmpty = $(this);
                var $textEmpty = $listEmpty.find(".box-text_empty");
                var $otherChildren = $listEmpty.find(".list-empty").children().not(".box-text_empty");
                var $boxEmpty = $listEmpty.find(".box-empty_clear");
                if ($otherChildren.length > 0) {
                    $textEmpty.hide();
                } else {
                    $textEmpty.show();
                    $boxEmpty.hide();
                }
            });
        }

        if ($(".main-list-clear").length) {
            $(".main-list-clear").each(function () {
                var $mainList = $(this);

                $mainList.find(".clear-list-empty").on("click", function () {
                    $mainList.find(".list-empty").children().not(".box-text_empty").remove();
                    checkListEmpty();
                });
            });
        }
        function ortherDel() {
            $(".container .orther-del").remove();
        }
        $(".list-file-delete").on("input", ".quantity-product", function () {
            updateTotalPrice();
        });

        $(".list-file-delete,.each-prd").on("click", ".minus-quantity, .plus-quantity", function () {
            var $quantityInput = $(this).siblings(".quantity-product");
            var currentQuantity = parseInt($quantityInput.val(), 10);

            if ($(this).hasClass("plus-quantity")) {
                $quantityInput.val(currentQuantity + 1);
            } else if ($(this).hasClass("minus-quantity") && currentQuantity > 1) {
                $quantityInput.val(currentQuantity - 1);
            }

            updateTotalPrice();
            updatePriceEach();
            updateTotalPriceEach();
        });

        $(".remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
            updateTotalPriceEach();
            ortherDel();
        });

        $(".clear-file-delete").on("click", function (e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
        });
        checkListEmpty();
        updateCount();
        updateTotalPrice();
        updatePriceEach();
        updateTotalPriceEach();
    };

    /* Go Top
    -------------------------------------------------------------------------*/
    var goTop = function () {
        var $goTop = $("#goTop");
        var $borderProgress = $(".border-progress");

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var scrollPercent = (scrollTop / docHeight) * 100;
            var progressAngle = (scrollPercent / 100) * 360;

            $borderProgress.css("--progress-angle", progressAngle + "deg");

            if (scrollTop > 100) {
                $goTop.addClass("show");
            } else {
                $goTop.removeClass("show");
            }
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    };

    /* Variant Picker
    -------------------------------------------------------------------------*/
    var variantPicker = function () {
        if ($(".variant-picker-item").length) {

            $(".color-btn").on("click", function () {
                var $wrapper = $(this).closest(".variant-picker-item");
                var value = $(this).data("scroll");
                var value2 = $(this).data("color");

                $wrapper.find(".value-currentColor").text(value2 || value);
                $wrapper.find(".color-btn").removeClass("active");
                $(this).addClass("active");
            });

            $(".size-btn").on("click", function () {
                var $wrapper = $(this).closest(".variant-picker-item");
                var value = $(this).data("size");

                $wrapper.find(".value-currentSize").text(value);
                $wrapper.find(".size-btn").removeClass("active");
                $(this).addClass("active");
            });
        }
    };


    /* Sidebar Mobile
    -------------------------------------------------------------------------*/
    var sidebarMobile = function () {
        if ($(".sidebar-content-wrap").length > 0) {
            var sidebar = $(".sidebar-content-wrap").html();
            $(".sidebar-mobile-append").append(sidebar);
        }
    };

    /* Stagger Wrap
    -------------------------------------------------------------------------*/
    var staggerWrap = function () {
        if ($(".stagger-wrap").length) {
            var count = $(".stagger-item").length;
            for (var i = 1, time = 0.2; i <= count; i++) {
                $(".stagger-item:nth-child(" + i + ")")
                    .css("transition-delay", time * i + "s")
                    .addClass("stagger-finished");
            }
        }
    };

    /* Modal Second
    -------------------------------------------------------------------------*/
    var clickModalSecond = function () {
        $(".show-shopping-cart").on("click", function () {
            $("#shoppingCart").modal("show");
        });
        $(".btn-icon-action.wishlist").on("click", function () {
            $("#wishlist").modal("show");
        });

        $(".btn-add-to-cart").on("click", function () {
            $(".tf-add-cart-success").addClass("active");
        });
        $(".tf-add-cart-success .tf-add-cart-close").on("click", function () {
            $(".tf-add-cart-success").removeClass("active");
        });

        $(".btn-add-note, .btn-estimate-shipping, .btn-add-gift").on("click", function () {
            var classList = {
                "btn-add-note": ".add-note",
                "btn-estimate-shipping": ".estimate-shipping",
                "btn-add-gift": ".add-gift",
            };

            $.each(classList, function (btnClass, targetClass) {
                if ($(event.currentTarget).hasClass(btnClass)) {
                    $(targetClass).addClass("open");
                }
            });
        });

        $(".tf-mini-cart-tool-close").on("click", function () {
            $(".tf-mini-cart-tool-openable").removeClass("open");
        });
    };

    /* Header Sticky
    -------------------------------------------------------------------------*/
    var headerSticky = function () {
        const customHeaderCategory = () => {
            const header = document.querySelector(".tf-header");

            if (!header || !header.classList.contains("has-by-category")) {
                return null;
            }

            const headerBottom = header.querySelector(".header-bottom_wrap");
            const btnOpen = header.querySelector(".btn-open-header-bottom");

            if (!headerBottom || !btnOpen) return null;

            btnOpen.addEventListener("click", () => {
                headerBottom.classList.toggle("hide");
            });

            return {
                hideHeaderBottom: () => headerBottom.classList.add("hide"),
                showHeaderBottom: () => headerBottom.classList.remove("hide"),
            };
        };

        const S3 = customHeaderCategory();

        let lastScrollTop = 0;
        let delta = 5;
        let navbarHeight = $("header").outerHeight();
        let didScroll = false;

        $(window).scroll(function () {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                let st = $(window).scrollTop();
                navbarHeight = $("header").outerHeight();

                if (st > navbarHeight) {

                    if (st > lastScrollTop + delta) {

                        $("header").css("top", `-${navbarHeight}px`);
                        $(".sticky-top").css("top", "15px");

                        if (S3) S3.hideHeaderBottom();

                    } else if (st < lastScrollTop - delta) {

                        if ($("header").hasClass("header-abs")) {
                            $("header").css("top", "15px");
                        } else {
                            $("header").css("top", "0");
                        }

                        $("header").addClass("header-sticky");
                        $(".sticky-top").css("top", `${30 + navbarHeight}px`);

                    }

                } else {

                    $("header").css("top", "unset");
                    $("header").removeClass("header-sticky");
                    $(".sticky-top").css("top", "15px");

                    if (S3) S3.showHeaderBottom();
                }

                lastScrollTop = st;
                didScroll = false;
            }
        }, 250);
    };

    /* Auto Popup
    -------------------------------------------------------------------------*/
    var autoPopup = function () {
        if ($(".auto-popup").length > 0) {
            let showPopup = sessionStorage.getItem("showPopup");
            if (!JSON.parse(showPopup)) {
                setTimeout(function () {
                    $(".auto-popup").modal("show");
                }, 2000);
            }
        }
        $(".btn-hide-popup").on("click", function () {
            sessionStorage.setItem("showPopup", true);
        });
    };

    /* Total Price Variant
    -------------------------------------------------------------------------*/
    var totalPriceVariant = function () {
        $(".tf-product-info-wrap").each(function () {
            var productItem = $(this);
            var priceEl = productItem.find(".price-on-sale");
            var quantityInput = productItem.find(".quantity-product");
            if (!priceEl.data("price")) {
                var initialPrice = parseFloat(priceEl.text().replace("$", "").replace(/,/g, ""));
                priceEl.data("price", initialPrice);
            }
            productItem.find(".size-btn").on("click", function () {
                var rawPrice = $(this).attr("data-price");
                var newPrice = parseFloat(rawPrice.replace(/,/g, "")) || basePrice;
                quantityInput.val(1);
                productItem.find(".price-on-sale")
                    .text(`$${newPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`)
                    .data("price", newPrice);
                updateTotalPrice(newPrice, productItem);
            });

            productItem.find(".btn-increase").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                quantityInput.val(currentQuantity + 1);
                updateTotalPrice(null, productItem);
            });

            productItem.find(".btn-decrease").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                if (currentQuantity > 1) {
                    quantityInput.val(currentQuantity - 1);
                    updateTotalPrice(null, productItem);
                }
            });

            function updateTotalPrice(price, scope) {
                var currentPrice = price || parseFloat(scope.find(".price-on-sale").data("price"));
                var quantity = parseInt(scope.find(".quantity-product").val(), 10);
                var totalPrice = currentPrice * quantity;
                scope.find(".price-add").text(`$${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
            }
            updateTotalPrice(null, productItem);
        });
    };
    /* Handle Progress
    -------------------------------------------------------------------------*/
    var handleProgress = function () {
        if ($(".progress-cart").length > 0) {
            var progressValue = $(".progress-cart .value").data("progress");
            setTimeout(function () {
                $(".progress-cart .value").css("width", progressValue + "%");
            }, 800);
        }

        function handleProgressBar(showEvent, hideEvent, target) {
            $(target).on(hideEvent, function () {
                $(".tf-progress-bar .value").css("width", "0%");
            });

            $(target).on(showEvent, function () {
                setTimeout(function () {
                    var progressValue = $(".tf-progress-bar .value").data("progress");
                    $(".tf-progress-bar .value").css("width", progressValue + "%");
                }, 600);
            });
        }

        if ($(".popup-shopping-cart").length > 0) {
            handleProgressBar("show.bs.offcanvas", "hide.bs.offcanvas", ".popup-shopping-cart");
        }

        if ($(".popup-shopping-cart").length > 0) {
            handleProgressBar("show.bs.modal", "hide.bs.modal", ".popup-shopping-cart");
        }
    };

    /* Handle Footer
    -------------------------------------------------------------------------*/
    var handleFooter = function () {
        var footerAccordion = function () {
            var args = { duration: 250 };
            $(".footer-heading-mobile").on("click", function () {
                var $parent = $(this).parent(".footer-col-block");
                var $content = $(this).next();

                $parent.toggleClass("open");

                if (!$parent.hasClass("open")) {
                    $content.slideUp(args);
                } else {
                    $content.slideDown(args);
                }
            });
        };

        function handleAccordion() {
            if (window.matchMedia("only screen and (max-width: 575px)").matches) {
                if (!$(".footer-heading-mobile").data("accordion-initialized")) {
                    footerAccordion();
                    $(".footer-heading-mobile").data("accordion-initialized", true);
                }
            } else {
                $(".footer-heading-mobile")
                    .off("click")
                    .removeData("accordion-initialized")
                    .each(function () {
                        $(this).parent(".footer-col-block").removeClass("open").end().next().removeAttr("style");
                    });
            }
        }

        handleAccordion();
        $(window).on("resize", handleAccordion);
    };

    /* Infinite Slide 
    -------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        if ($(".infiniteSlide").length > 0) {
            $(".infiniteSlide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 2;
                var speed = $this.data("speed") || 50;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                });
            });
        }
    };

    /* Add Wishlist
    -------------------------------------------------------------------------*/
    var addWishList = function () {
        $(".btn-add-wishlist,.btn-wishlist, .card-product .wishlist").on("click", function (e) {
            e.preventDefault();
            let $this = $(this);
            let icon = $this.find(".icon");
            let tooltip = $this.find(".tooltip");

            $this.toggleClass("addwishlist");

            if ($this.hasClass("addwishlist")) {
                icon.removeClass("icon-heart").addClass("icon-trash");
                tooltip.text("Remove Wishlist");
            } else {
                icon.removeClass("icon-trash").addClass("icon-heart");
                tooltip.text("Add to Wishlist");
            }
        });
    };

    /* Handle Sidebar Filter 
    -------------------------------------------------------------------------*/
    var handleSidebarFilter = function () {
        $("#filterShop,.sidebar-btn").on("click", function () {
            if ($(window).width() <= 1200) {
                $(".sidebar-filter,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter,.overlay-filter").on("click", function () {
            $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };
    /* Estimate Shipping
    -------------------------------------------------------------------------*/
    var estimateShipping = function () {
        if ($(".estimate-shipping").length) {
            const $countrySelect = $("#shipping-country-form");
            const $provinceSelect = $("#shipping-province-form");
            const $zipcodeInput = $("#zipcode");
            const $zipcodeMessage = $("#zipcode-message");
            const $zipcodeSuccess = $("#zipcode-success");
            const $shippingForm = $("#shipping-form");

            function updateProvinces() {
                const selectedCountry = $countrySelect.val();
                const $selectedOption = $countrySelect.find("option:selected");
                const provincesData = $selectedOption.attr("data-provinces");

                const provinces = JSON.parse(provincesData);
                $provinceSelect.empty();

                if (provinces.length === 0) {
                    $provinceSelect.append($("<option>").text("------"));
                } else {
                    provinces.forEach(function (province) {
                        $provinceSelect.append($("<option>").val(province[0]).text(province[1]));
                    });
                }
            }

            $countrySelect.on("change", updateProvinces);

            function validateZipcode(zipcode, country) {
                let regex;

                switch (country) {
                    case "Australia":
                    case "Austria":
                    case "Belgium":
                    case "Denmark":
                        regex = /^\d{4}$/;
                        break;
                    case "Canada":
                        regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
                        break;
                    case "Czech Republic":
                    case "Finland":
                    case "France":
                    case "Germany":
                    case "Mexico":
                    case "South Korea":
                    case "Spain":
                    case "Italy":
                        regex = /^\d{5}$/;
                        break;
                    case "United States":
                        regex = /^\d{5}(-\d{4})?$/;
                        break;
                    case "United Kingdom":
                        regex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/;
                        break;
                    case "India":
                    case "Vietnam":
                        regex = /^\d{6}$/;
                        break;
                    case "Japan":
                        regex = /^\d{3}-\d{4}$/;
                        break;
                    default:
                        return true;
                }

                return regex.test(zipcode);
            }

            $shippingForm.on("submit", function (event) {
                const zipcode = $zipcodeInput.val().trim();
                const country = $countrySelect.val();

                if (!validateZipcode(zipcode, country)) {
                    $zipcodeMessage.show();
                    $zipcodeSuccess.hide();
                    event.preventDefault();
                } else {
                    $zipcodeMessage.hide();
                    $zipcodeSuccess.show();
                    event.preventDefault();
                }
            });

            $(window).on("load", updateProvinces);
        }
    };

    /* Coupon Copy
    -------------------------------------------------------------------------*/
    var textCopy = function () {
        $(".coupon-copy-wrap,.btn-coppy-text").on("click", function () {
            const couponCode = $(this).find(".coupon-code,.coppyText").text().trim();

            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(couponCode)
                    .then(function () {
                        alert("Copied! " + couponCode);
                    })
                    .catch(function (err) {
                        alert("Unable to copy: " + err);
                    });
            } else {
                const tempInput = $("<input>");
                $("body").append(tempInput);
                tempInput.val(couponCode).select();
                document.execCommand("copy");
                tempInput.remove();
                alert("Copied! " + couponCode);
            }
        });
    };

    /* Parallaxie 
    -------------------------------------------------------------------------*/
    var parallaxie = function () {
        var $window = $(window);

        if ($(".parallaxie").length) {
            function initParallax() {
                if ($(".parallaxie").length && $window.width() > 991) {
                    $(".parallaxie").parallaxie({
                        speed: 0.55,
                        offset: 0,
                    });
                }
            }

            initParallax();

            $window.on("resize", function () {
                if ($window.width() > 991) {
                    initParallax();
                }
            });
        }
    };

    /* Update Compare Empty
    -------------------------------------------------------------------------*/
    var tableCompareRemove = function () {
        $(".remove").on("click", function () {
            let $clickedCol = $(this).closest(".compare-col");
            let colIndex = $clickedCol.index();
            let $rows = $(".compare-row");
            let visibleCols = $(".compare-row:first .compare-col:visible").length;

            if (visibleCols > 4) {
                $rows.each(function () {
                    $(this).find(".compare-col").eq(colIndex).fadeOut(300);
                });
            } else {
                $rows.each(function () {
                    let $cols = $(this).find(".compare-col");
                    let $colToMove = $cols.eq(colIndex);

                    $colToMove.children().fadeOut(300, function () {
                        let $parentRow = $(this).closest(".compare-row");
                        $colToMove.appendTo($parentRow);
                    });
                });
            }
        });
    };

    /* Delete Wishlist
    -------------------------------------------------------------------------*/
    var deleteWishList = function () {
        function checkEmpty() {
            var $wishlistInner = $(".wrapper-wishlist");
            var $product = $(".wrapper-wishlist .card-product");
            var productCount = $(".wrapper-wishlist .card-product").length;

            if (productCount <= 8) {
                $(".wrapper-wishlist .wd-full").hide();
                $product.css("display", "flex");
            } else {
                $(".wrapper-wishlist .wd-full").show();
                $product.slice(0, 8).css("display", "flex");
                $product.slice(8).hide();
            }

            if (productCount === 0) {
                $wishlistInner.append(`
          <div class="tf-wishlist-empty text-center wd-full">
            <p class="text-notice cl-text-2 mb-20">No products were added to the wishlist.</p>
            <a href="index.html" class="tf-btn animate-btn">Back To Shopping</a>
          </div>
        `);
            } else {
                $wishlistInner.find(".tf-compare-empty").remove();
            }
        }

        $(".wrapper-wishlist .card-product .remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".card-product").remove();
            checkEmpty();
        });

        checkEmpty();
    };

    /* Click Active 
    -------------------------------------------------------------------------*/
    var clickActive = function () {
        function isAllowed($container) {
            return !$container.hasClass("active-1600") || window.innerWidth < 1600;
        }

        let previousWidth = window.innerWidth;

        $(window).on("resize", function () {
            const currentWidth = window.innerWidth;

            const crossedBreakpoint = (previousWidth < 1600 && currentWidth >= 1600) || (previousWidth >= 1600 && currentWidth < 1600);

            if (crossedBreakpoint) {
                $(".main-action-active").each(function () {
                    $(this).find(".btn-active, .active-item").removeClass("active");
                });

                if (previousWidth < 1600 && currentWidth >= 1600) {
                    $(".main-action-active.active-1600").each(function () {
                        const $container = $(this);
                        const $btn = $container.find(".btn-active");
                        const $item = $container.find(".active-item");

                        $btn.addClass("active");
                        $item.addClass("active");
                    });
                }
            }

            previousWidth = currentWidth;
        });

        $(".btn-active").on("click", function (event) {
            const $container = $(this).closest(".main-action-active");

            if (!isAllowed($container)) return;

            event.stopPropagation();

            const $activeItem = $container.find(".active-item");
            const isResponsive = $container.hasClass("active-1600") && window.innerWidth < 1600;

            if (isResponsive) {
                $(".main-action-active").each(function () {
                    if (this !== $container[0]) {
                        $(this).find(".btn-active, .active-item").removeClass("active");
                    }
                });
            } else {
                $(".main-action-active").each(function () {
                    const $other = $(this);
                    if (this !== $container[0] && (!$other.hasClass("active-1600") || window.innerWidth < 1600)) {
                        $other.find(".btn-active, .active-item").removeClass("active");
                    }
                });
            }

            $(this).toggleClass("active");
            $activeItem.toggleClass("active");
        });

        $(document).on("click", function (event) {
            const isMobile = window.innerWidth < 1600;

            $(".main-action-active").each(function () {
                const $container = $(this);
                const is1600 = $container.hasClass("active-1600");

                if ((is1600 && isMobile) || !is1600) {
                    if (!$(event.target).closest($container).length) {
                        $container.find(".btn-active, .active-item").removeClass("active");
                    }
                }
            });
        });

        $(".choose-option-item").on("click", function () {
            const $container = $(this).closest(".main-action-active");
            if (!isAllowed($container)) return;

            $(this).closest(".choose-option-list").find(".select-option").removeClass("select-option");
            $(this).addClass("select-option");
        });
    };

    /* Handle Mobile Menu
    -------------------------------------------------------------------------*/
    var handleMobileMenu = function () {
        const $desktopMenu = $(".box-nav-menu:not(.not-append)").clone();
        $desktopMenu.find(".list-ver, .list-hor, .mn-none").remove();

        const $mobileMenu = $('<ul class="nav-ul-mb"></ul>');
        const $iconArrow = "ic-custom";
        const $iconArrow2 = "icon-CaretDown";



        $desktopMenu.find("> li.menu-item").each(function (i, menuItem) {
            const $item = $(menuItem);
            const $topLink = $item.find("> a.item-link").first();

            const text = $topLink
                .find(".text, .cus-text")
                .first()
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim();

            const submenu = $item.find("> .sub-menu");
            const id = "dropdown-menu-" + i;

            const isTopActive = $topLink.hasClass("active");
            const topActiveClass = isTopActive ? "active" : "";

            if (!submenu.length) {
                const href = $topLink.attr("href") || "#";
                $mobileMenu.append(`
        <li class="nav-mb-item">
          <a href="${href}" class="mb-menu-link ${topActiveClass}">
            <span>${text}</span>
          </a>
        </li>
      `);
                return;
            }

            const $liMb = $(`
      <li class="nav-mb-item">
        <a href="#${id}" class="collapsed mb-menu-link ${topActiveClass}" data-bs-toggle="collapse"
           aria-expanded="false" aria-controls="${id}">
          <span>${text}</span>
          <span class="icon ${$iconArrow}"></span>
        </a>
        <div id="${id}" class="collapse"></div>
      </li>
    `);

            const $subNav = $('<ul class="sub-nav-menu"></ul>');
            const $groups = submenu.find(".mega-menu-item.menu-lv-2");
            const $homeDemos = submenu.find(".demo-item a.demo-name");

            if ($homeDemos.length) {
                $homeDemos.each(function () {
                    const $a = $(this);
                    const href = $a.attr("href") || "#";
                    const text = $a.text().trim();

                    if (text) {
                        $subNav.append(`
                <li>
                    <a href="${href}" class="sub-nav-link">
                        ${text}
                    </a>
                </li>
            `);
                    }
                });
            }

            if ($groups.length) {
                $groups.each(function (j) {
                    const $groupWrap = $(this);
                    const heading = $groupWrap.find(".menu-heading").first().text().trim();
                    if (!heading) return;

                    const subId = `${id}-group-${j}`;

                    const hasActiveChild = $groupWrap.find(".sub-menu_link.active").length > 0;
                    const groupActiveClass = hasActiveChild ? "active" : "";

                    const $group = $(`
    <li>
      <a href="#${subId}" class="collapsed sub-nav-link ${groupActiveClass}"
         data-bs-toggle="collapse" aria-expanded="false" aria-controls="${subId}">
        <span>${heading}</span>
        <span class="icon ${$iconArrow2}"></span>
      </a>
      <div id="${subId}" class="collapse">
        <ul class="sub-nav-menu sub-menu-level-2"></ul>
      </div>
    </li>
  `);

                    $groupWrap.find(".sub-menu_list > li > a.sub-menu_link").each(function () {
                        const $a = $(this);
                        const href = $a.attr("href") || "#";
                        const html = $a.html();
                        const activeClass = $a.hasClass("active") ? "active" : "";

                        if (html && html.trim()) {
                            $group
                                .find(".sub-menu-level-2")
                                .append(`<li><a href="${href}" class="sub-nav-link ${activeClass}">${html}</a></li>`);
                        }
                    });

                    $subNav.append($group);
                });


            } else {
                submenu.find(".sub-menu_list > li > a.sub-menu_link").each(function () {
                    const $a = $(this);
                    const href = $a.attr("href") || "#";
                    const html = $a.html();
                    const isActive = $a.hasClass("active");
                    const activeClass = isActive ? "active" : "";

                    if (html && html.trim()) {
                        $subNav.append(`<li><a href="${href}" class="sub-nav-link ${activeClass}">${html}</a></li>`);
                    }
                });
            }

            $liMb.find(`#${id}`).append($subNav);
            $mobileMenu.append($liMb);
        });

        $("#wrapper-menu-navigation").empty().append($mobileMenu);
    };

    /* Color Swatch Product
    -------------------------------------------------------------------------*/
    var swatchColor = function () {
        if ($(".card-product, .banner-card_product").length > 0) {
            $(".color-swatch").on("click mouseover", function () {
                var $swatch = $(this);
                var swatchColor = $swatch.find("img:not(.swatch-img)").attr("src");
                var imgProduct = $swatch.closest(".card-product, .banner-card_product").find(".img-product");
                var colorLabel = $swatch.find(".color-label").text().trim();
                imgProduct.attr("src", swatchColor);
                $swatch.closest(".card-product, .banner-card_product").find(".quickadd-variant-color .variant-value").text(colorLabel);
                $swatch.closest(".card-product, .banner-card_product").find(".color-swatch.active").removeClass("active");
                $swatch.addClass("active");
            });
        }
    };

    /* Custom Dropdown
    -------------------------------------------------------------------------*/
    var customDropdown = function () {
        $(".dropdown-custom").each(function () {
            const $dropdown = $(this);

            const originalClass = $dropdown.hasClass("dropend")
                ? "dropend"
                : $dropdown.hasClass("dropstart")
                    ? "dropstart"
                    : "";

            function updateDropdownClass() {
                if ($(window).width() <= 991) {
                    $dropdown.removeClass("dropstart dropend").addClass("dropup");
                } else {
                    $dropdown.removeClass("dropup").addClass(originalClass);
                }
            }

            updateDropdownClass();
            $(window).on("resize", updateDropdownClass);
        });
    };

    /* Bottom Sticky
    -------------------------------------------------------------------------*/
    var scrollBottomSticky = function () {
        if ($(".tf-sticky-btn-atc").length > 0) {
            $(window).on("scroll", function () {
                var scrollPosition = $(this).scrollTop();
                var myElement = $(".tf-sticky-btn-atc");
                var footerOffset = $("footer").offset().top;
                var productMainOffset = $(".section-product-single").offset().top;
                var windowHeight = $(window).height();

                if (scrollPosition >= 500 && scrollPosition + windowHeight < footerOffset) {
                    myElement.addClass("show");
                } else {
                    myElement.removeClass("show");
                }
            });
        }
    };

    /* Show Password 
    -------------------------------------------------------------------------*/
    var showPassword = function () {
        $(".toggle-pass").on("click", function () {
            const wrapper = $(this).closest(".password-wrapper");
            const input = wrapper.find(".password-field");
            const icon = $(this);

            if (input.attr("type") === "password") {
                input.attr("type", "text");
                icon.removeClass("icon-EyeSlash").addClass("icon-Eye");
            } else {
                input.attr("type", "password");
                icon.removeClass("icon-Eye").addClass("icon-EyeSlash");
            }
        });
    };

    /* Change Image Dashboard 
    -------------------------------------------------------------------------*/
    var changeImageDash = function () {
        if ($(".avatarPreview").length > 0) {
            const fileInput = document.getElementById("fileInput");
            const fileName = document.getElementById("fileName");
            const avatarPreview = document.getElementById("avatarPreview");
            fileInput.addEventListener("change", function () {
                const file = this.files[0];

                if (file) {
                    fileName.textContent = file.name;
                    fileName.style.color = "#333";

                    const reader = new FileReader();
                    reader.onload = function (e) {
                        avatarPreview.src = e.target.result;
                        avatarPreview.style.display = "block";
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileName.textContent = "No File Choose";
                    avatarPreview.style.display = "none";
                }
            });
        }
    };

    /* Select Category
    -------------------------------------------------------------------------*/
    var customSelectCate = function () {
        $("select#product_cate").each(function () {
            var $this = $(this),
                selectOptions = $(this).children("option").length;
            $this.addClass("hide-select");
            $this.after('<div class="tf-select-custom"></div>');
            var $customSelect = $this.next("div.tf-select-custom");
            $customSelect.text($this.children("option").eq(0).text());
            var $optionlist = $(
                '<ul class="select-options" /><div class="header-select-option"><span>Select Categories</span><span class="close-option"><i class="icon-X2"></i></div>'
            ).insertAfter($customSelect);
            for (var i = 0; i < selectOptions; i++) {
                var value = $this.children("option").eq(i).val();
                var text = $this.children("option").eq(i).text();

                var link = (value === "all")
                    ? "collection.html"
                    : "shop-default.html";

                var $li = $("<li />", {
                    "data-value": value
                });

                var $a = $("<a />", {
                    href: link,
                    text: text
                });

                $li.append($a).appendTo($optionlist);
            }
            var $optionlistItems = $optionlist.children("li");
            $customSelect.click(function (e) {
                e.stopPropagation();
                $("div.tf-select-custom.active")
                    .not(this)
                    .each(function () {
                        $(this).removeClass("active").next("ul.select-options").hide();
                    });
                $(this).toggleClass("active").next("ul.select-options").slideToggle();
            });
            $optionlistItems.click(function (e) {
                e.stopPropagation();
                $customSelect.text($(this).text()).removeClass("active");
                $this.val($(this).attr("rel"));
                $optionlist.hide();
            });
            $(document).click(function () {
                $customSelect.removeClass("active");
                $optionlist.hide();
            });
            $(".close-option").click(function () {
                $customSelect.removeClass("active");
                $optionlist.hide();
            });
        });
    };

    /* Hover Pin
    -------------------------------------------------------------------------*/
    var hoverPin = function () {
        $(".tf-lookbook-hover").each(function () {
            const $container = $(this);

            $container.find(".bundle-pin-item").on("mouseover", function () {
                const $hoverWrap = $container.find(".bundle-hover-wrap");
                $hoverWrap.addClass("has-hover");

                const $el = $container.find("." + this.id).show();
                $hoverWrap.find(".bundle-hover-item").not($el).addClass("no-hover");
            });

            $container.find(".bundle-pin-item").on("mouseleave", function () {
                const $hoverWrap = $container.find(".bundle-hover-wrap");
                $hoverWrap.removeClass("has-hover");
                $hoverWrap.find(".bundle-hover-item").removeClass("no-hover");
            });
        });
    };

    /* Rate Click
    -------------------------------------------------------------------------*/
    var rateClick = () => {
        const stars = document.querySelectorAll(".rate-click .icon");
        let selectedRating = 0;

        stars.forEach((star, idx) => {
            star.addEventListener("mouseenter", () => {
                resetHover();
                for (let i = 0; i <= idx; i++) {
                    stars[i].classList.add("hover");
                }
            });

            star.addEventListener("mouseleave", () => {
                resetHover();
            });
            star.addEventListener("click", () => {
                selectedRating = idx + 1;
                resetActive();
                for (let i = 0; i < selectedRating; i++) {
                    stars[i].classList.add("active");
                }
            });
        });

        function resetHover() {
            stars.forEach(s => s.classList.remove("hover"));
        }

        function resetActive() {
            stars.forEach(s => s.classList.remove("active"));
        }
    }

    /* Check Box Transfer Checkout Page
    -------------------------------------------------------------------------*/
    var checkOut = function () {
        $("#checkout-btn").on("click", function () {
            if ($("#checkOutAgree").is(":checked")) {
                window.location.href = "checkout.html";
            } else {
                alert("Please agree to the Terms and Conditions before continuing.");
            }
        });
    };

    /* Counter Odo
    -------------------------------------------------------------------------*/
    var counterOdo = () => {
        function isElementInViewport($el) {
            var top = $el.offset().top;
            var bottom = top + $el.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return bottom > viewportTop && top < viewportBottom;
        }

        function runCounterIfInView() {
            $(".couter-side").each(function () {
                var $counter = $(this);
                if (
                    isElementInViewport($counter) &&
                    !$counter.hasClass("counted")
                ) {
                    $counter.addClass("counted");
                    var targetNumber = $counter
                        .find(".odometer")
                        .data("number");

                    setTimeout(function () {
                        $counter.find(".odometer").text(targetNumber);
                    }, 200);
                }
            });
        }

        if ($(".counter-scroll").length > 0) {
            runCounterIfInView();

            $(window).on("scroll", function () {
                runCounterIfInView();
            });
        }
    };
    /* Couter
        -------------------------------------------------------------------------------------*/
    var counter = function () {
        $(".view-counter").each(function () {
            $(this).data('counted', false);
        });

        var checkCounters = function () {
            $(".view-counter").each(function () {
                var $counter = $(this);

                if ($counter.data('counted')) {
                    return;
                }

                var counterTop = $counter.offset().top;
                var counterBottom = counterTop + $counter.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                var isInViewport = counterTop < viewportBottom && counterBottom > viewportTop;

                if (isInViewport) {
                    if ($().countTo) {
                        $counter.find(".number").each(function () {
                            var to = $(this).data("to"),
                                speed = $(this).data("speed");
                            $(this).countTo({
                                to: to,
                                speed: speed,
                            });
                        });
                    }
                    $counter.data('counted', true);
                }
            });
        };

        checkCounters();

        $(window).scroll(checkCounters);
    };

    /* Update Bundle Total 
    -------------------------------------------------------------------------*/
    var updateBundleTotal = function () {
        var $bundleItems = $(".list-bundle-prd .order-item");

        var updateBundleTotal = function () {
            var totalPrice = 0;
            $bundleItems.each(function () {
                var $this = $(this);
                if ($this.find(".tf-check").prop("checked")) {
                    var newPrice = parseFloat($this.find(".quantity-price").text().replace(/[$,]/g, "")) || 0;

                    totalPrice += newPrice;
                }
            });

            $(".total-price-bundle").text(`$${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
        };

        updateBundleTotal();

        $(".tf-check").on("change", function () {
            updateBundleTotal();
        });
    };

    /* filterIsotope
    -------------------------------------------------------------------------------------*/
    var filterIsotope = function () {
        if ($().isotope) {
            var $container = $('.demo-filter');
            $container.imagesLoaded(function () {
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s'
                });
            });
            $(".posttype-filter a").on("click", function () {
                var selector = $(this).attr("data-filter");
                $(".posttype-filter a").removeClass("active");
                $(this).addClass("active");
                $container.isotope({ filter: selector });
                return false;
            });
        };
    };


    /* Preloader
    -------------------------------------------------------------------------*/
    function preloader() {
        setTimeout(function () {
            $("#preload").fadeOut(300, function () {
                $(this).remove();
            });
        }, 300);
    }
    /* Reveal
    -------------------------------------------------------------------------*/
    const reveal = () => {
        const $reveals = $(".reveal");

        if ($reveals.length === 0) {
            console.log("Reveal is not working because no items found.");
            return;
        } else {
            console.log("Reveal is working");
        }

        if ($(window).width() > 768) {
            $(window).on("scroll", function () {
                $reveals.each(function () {
                    const $el = $(this);
                    const windowHeight = $(window).height();
                    const revealTop = this.getBoundingClientRect().top;
                    const elHeight = $el.outerHeight();
                    const revealPoint = 150;
                    const posPoint = 20;

                    // Parent styles
                    $el.parent().css({
                        perspective: "700px",
                        transformStyle: "preserve-3d",
                        perspectiveOrigin: "100% 0%",
                    });

                    // Node styles
                    $el.css({
                        transformOrigin: "50% 0",
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transition: "all .35s ease",
                    });

                    if (revealTop > windowHeight - revealPoint) {
                        $el.css({
                            opacity: "0",
                            transform: `rotateX(-${posPoint}deg)`,
                        });
                    }

                    if (revealTop < windowHeight - revealPoint) {
                        if (revealTop > -50) {
                            const schemas = Math.abs(1 - revealTop / elHeight);
                            const opacity = Math.min(Math.abs(1 - (revealTop - 350) / elHeight), 1);
                            const rotate = Math.min(posPoint * schemas - (posPoint - 10), 0);

                            $el.css({
                                opacity: opacity,
                                transform: `translate3d(0px,0px,0px) rotateX(${rotate}deg)`,
                            });
                        } else {
                            $el.css({
                                transform: `translate(0,0)`,
                            });
                        }
                    }
                });
            });
        }
    };

    // Dom Ready
    $(function () {
        headerSticky();
        dropdownSelect();
        btnQuantity();
        deleteFile();
        deleteWishList();
        goTop();
        variantPicker();
        sidebarMobile();
        staggerWrap();
        clickModalSecond();
        autoPopup();
        totalPriceVariant();
        handleProgress();
        handleFooter();
        infiniteSlide();
        addWishList();
        handleSidebarFilter();
        estimateShipping();
        textCopy();
        parallaxie();
        tableCompareRemove();
        clickActive();
        handleMobileMenu();
        swatchColor();
        customDropdown();
        scrollBottomSticky();
        showPassword();
        changeImageDash();
        customSelectCate();
        hoverPin();
        rateClick();
        checkOut();
        counterOdo();
        counter();
        updateBundleTotal();
        filterIsotope();
        reveal();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function () {
                preloader();
            });
        } else {
            preloader();
        }
    });
})(jQuery);
