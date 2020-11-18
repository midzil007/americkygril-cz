"use strict";

$(document).ready(function () {
  $.fn.isInViewport = function () {
    if ($("#zoom-icon").length) {
      var elementTop = $("#zoom-icon").offset().top;
    }

    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop;
  };

  $(window).scroll(function () {
    if (!$(".t-l-f").isInViewport() && $(window).width() > 842) {
      $(".t-l-f").css({
        "width": $(".t-l-f").width()
      });
      $(".t-l-f").addClass("roll");
      $(".top-nav").css({
        "display": "block"
      });
    } else {
      $(".t-l-f").removeClass("roll");
      $(".top-nav").css({
        "display": "none"
      });
    }

    $(".top-nav").click(function () {
      $(".t-l-f").removeClass("roll");
      $(".top-nav").css({
        "display": "none"
      });
      $('body').scrollTo('#m-div');
    });
  });
  $(".tabik").click(function () {
    event.preventDefault();
    var target = $(this).attr('href');

    if (target == '#') {
      $('html, body').animate({
        scrollTop: 0
      }, 600);
    } else {
      if ($("#roller").hasClass("roll")) {
        $('html, body').animate({
          scrollTop: $(target).offset().top - 150
        });
      } else {
        $('html, body').animate({
          scrollTop: $(target).offset().top - 200
        });
      }
    }
  });
});