function supports_history_api() {
    return !(!window.history || !history.pushState)
}

function showBlock() {
    return ele = $("#galleryStrip"), "hidden" == ele.css("overflow") ? (ele.css("overflow", "visible"), $("#allPhoto").html("Zobrazit jen 3 fotografie")) : (ele.css("overflow", "hidden"), $("#allPhoto").html("Zobrazit celou galerii")), !1
}

function showLog(e, t, i, o) {
    return console.log("d"), block = $("#" + e), i = $("#" + i), "none" == block.css("display") ? ($(".upArr1").css("display", "inline"), $(".downArr1").css("display", "none")) : ($(".upArr1").css("display", "none"), $(".downArr1").css("display", "inline")), block.toggle(), !1
}

function sendCalculator() {
    $.ajax({
        type: "POST",
        url: location.host + "/?calculator=1",
        data: $("#cofis").serialize(),
        success: function(e) {
            $(".popup").html(e)
        }
    })
}

function openView360(e, t) {
    var i = new View360;
    i.setMode("lightbox-responsive"), i.setNavigationConfig({
        btnWidth: 30,
        btnHeight: 30,
        turnSpeed: 1
    }), i.setImagesPattern("image_%ROW_%COL.jpg"), i.setFitMode("fit"), i.setNavigationConfig({
        type: "round",
        btnImageSize: "80%"
    }), i.setConfig({
        imagesNumbering: 1,
        imagesNumberingUpDown: 1,
        width: 960,
        height: 540,
        oneTurnOnStartUp: !1,
        rows: 1,
        columns: e,
        xAxisSensitivity: 10,
        yAxisSensitivity: 10
    }), i.setImagesDirectory("/images/3d/" + t), i.start(document.getElementById("view360"))
}
$(function() {
    
    $(".navbar-submenu").click(function() {
        $(".toggle-submenu").toggle()
    }), $(".navbar-toggle").click(function() {
        $(".nav").toggle(), $(".rev").toggle()
    }), $("#autocomplete").autocomplete({
        source: function(e, t) {
            $.ajax({
                url: "?autocomplete=1",
                data: {
                    searchText: e.term,
                    maxResults: 10
                },
                dataType: "json",
                success: function(e) {
                    t($.map(e, function(e) {
                        return console.log(e), {
                            label: e.title,
                            avatar: e.photo,
                            price: e.price,
                            path: e.path
                        }
                    }))
                }
            })
        },
        select: function(e, t) {
            return window.location.href = t.item.path, !1
        }
    }).data("ui-autocomplete")._renderItem = function(e, t) {
        var i = '<img width="31" height="31" src="' + t.avatar + '"><span class="searchText">' + t.label + '</span><br><span class="searchPrice">' + t.price + "</span>";
        return $("<li></li>").data("item.autocomplete", t).append(i).appendTo(e)
    }, $("#autocomplete-mini").length && ($("#autocomplete-mini").autocomplete({
        source: function(e, t) {
            $.ajax({
                url: "?autocomplete=1",
                data: {
                    searchText: e.term,
                    maxResults: 10
                },
                dataType: "json",
                success: function(e) {
                    t($.map(e, function(e) {
                        return console.log(e), {
                            label: e.title,
                            avatar: e.photo,
                            price: e.price,
                            path: e.path
                        }
                    }))
                }
            })
        },
        select: function(e, t) {
            return window.location.href = t.item.path, !1
        }
    }).data("ui-autocomplete")._renderItem = function(e, t) {
        var i = '<img width="31" height="31" src="' + t.avatar + '"><span class="searchText">' + t.label + '</span><br><span class="searchPrice">' + t.price + "</span>";
        return $("<li></li>").data("item.autocomplete", t).append(i).appendTo(e)
    })
}), $(document).ready(function() {
    window.matchMedia && window.matchMedia("(min-width: 768px)").matches && ($body = $(document.body), $body.css("background-image", $body.attr("data-scr")))
}), $(document).ready(function() {
    function e() {
        setTimeout(function() {
            $("#effect").removeAttr("style").hide().fadeIn()
        }, 1e3)
    }
    $("#setCooksiesa").click(function() {
        var e = new Date;
        e.setFullYear(e.getFullYear() + 10), document.cookie = "eu-cookises=1; path=/; expires=" + e.toGMTString(), $("#cookies").hide()
    }), $(".simple-ajax-popup").magnificPopup({
        type: "ajax"
    }), $(function() {
        url = $(location).attr("href"), pieces = $(location).attr("href").split("#"), ints = 0, pieces[1] && (arIndex = pieces[1].split("-"), ints = arIndex[1] - 1), $(".mini-photos").each(function(e) {
            $(this).click(function() {
                $(".mb").each(function(e) {
                    $(this).css("display", "none")
                }), $(".photo" + e).css("display", "inline-block")
            })
        }), $("#log").click(function(e) {
            $.ajax({
                type: "POST",
                url: "/jura",
                dataType: "json",
                data: "loginEmail=" + $("#loginEmail").val(),
                success: function(e) {
                    $("#telefon").val(""), $("#mesto").val(""), $("#ulice").val(""), $("#psc").val(""), $("#firma").val(""), $("#ico").val(""), $("#ffirma").val(""), $("#ffullname").val(""), $("#fulice").val(""), $("#ftelefon").val(""), $("#fMesto").val(""), $("#fpsc").val(""), $("#email").val(e.email), $("#fullname").val(e.fu_jmeno), $("#telefon").val(e.fu_phone), $("#mesto").val(e.fu_mesto), $("#ulice").val(e.fu_ulice), $("#psc").val(e.fu_psc), $("#firma").val(e.fu_firma), $("#dic").val(e.fu_dic), $("#ico").val(e.fu_ico), e.ulice && ($("#ffullname").val(e.fu_jmeno + " " + e.firstname), $("#ffirma").val(e.firma), $("#fulice").val(e.ulice), $("#fpsc").val(e.psc), $("#ftelefon").val(e.phone), $("#fMesto").val(e.mesto), $("#otherAdress").fadeIn(400), $(".downArr").css("display", "none"), $(".upArr").css("display", "inline"), $(".rozCont").css("display", "inline"))
                }
            }), e.preventDefault()
        })
    }), $(document).ready(function() {
        $(".second-search-show").click(function() {
            $("#second-menu").css("display", "none"), $(".second-search").toggle(), $(".nav-stacked").css("display", "none")
        })
    }), $(window).resize(function() {
        $("#left-column .navbar-default").css("width", $("#left-column").width())
    }), $(window).scroll(function() {
        var t = $(window).scrollTop();
        windowWinth = $(window).width(), headerHeight = $("#header").height(), console.log(headerHeight);
        var i = {};
        t > 1 ? windowWinth > 840 ? ( $("#header > .flags ").css({
            position: "fixed"
        })          
        , $(".corona").css({
            display: "none"
        })) : ($("#right-column").css("margin-top", "50px"), $("#header").hide("blind", i, 300, e), $("#left-column .navbar-default").css({
            position: "fixed"
        }), $(".corona").css({
            display: "block"
        })) : ($("#header > .flags").css({
            position: "static"      
        }), $(".corona").css({     
            display: "block"
        }), $("#header").show("blind", i, 300, e), $("#right-column").css("margin-top", "0px"), $("#left-column .navbar-default").css({
            position: "static"
        }))
    })
})
function showSubmenu(th,ele)
{
    $(".menu-link"+ele).toggle();      
    $(".plus-"+ele).toggle();          
    $(".minus-"+ele).toggle();             
}  