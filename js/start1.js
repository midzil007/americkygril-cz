function supports_history_api() {
    return !(!window.history || !history.pushState)
}

function showBlock() {
    return ele = $("#galleryStrip"), "hidden" == ele.css("overflow") ? (ele.css("overflow", "visible"), $("#allPhoto").html("Zobrazit jen 3 fotografie")) : (ele.css("overflow", "hidden"), $("#allPhoto").html("Zobrazit celou galerii")), !1
}

function showLog(e, a, t, o) {
    return console.log("d"), block = $("#" + e), t = $("#" + t), "none" == block.css("display") ? ($(".upArr1").css("display", "inline"), $(".downArr1").css("display", "none")) : ($(".upArr1").css("display", "none"), $(".downArr1").css("display", "inline")), block.toggle(), !1
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
$(function() {
	 $(".navbar-submenu").click(function() {
	 	$(".toggle-submenu").toggle();
	      
	 });     
	 
        $(".navbar-toggle").click(function() {
            $(".nav").toggle()
        }), $("#autocomplete").autocomplete({
            source: function(e, a) {
                $.ajax({
                    url: "?autocomplete=1",
                    data: {
                        searchText: e.term,
                        maxResults: 10
                    },
                    dataType: "json",
                    success: function(e) {
                        a($.map(e, function(e) {
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
            select: function(e, a) {
                return window.location.href = a.item.path, !1
            }
        }).data("ui-autocomplete")._renderItem = function(e, a) {
            var t = '<img width="31" height="31" src="' + a.avatar + '"><span class="searchText">' + a.label + '</span><br><span class="searchPrice">' + a.price + "</span>";
            return $("<li></li>").data("item.autocomplete", a).append(t).appendTo(e)
        }, $("#autocomplete-mini").length && ($("#autocomplete-mini").autocomplete({
            source: function(e, a) {
                $.ajax({
                    url: "?autocomplete=1",
                    data: {
                        searchText: e.term,
                        maxResults: 10
                    },
                    dataType: "json",
                    success: function(e) {
                        a($.map(e, function(e) {
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
            select: function(e, a) {
                return window.location.href = a.item.path, !1
            }
        }).data("ui-autocomplete")._renderItem = function(e, a) {
            var t = '<img width="31" height="31" src="' + a.avatar + '"><span class="searchText">' + a.label + '</span><br><span class="searchPrice">' + a.price + "</span>";
            return $("<li></li>").data("item.autocomplete", a).append(t).appendTo(e)
        })
    }), $(document).ready(function() {
        window.matchMedia && window.matchMedia("(min-width: 768px)").matches && ($body = $(document.body), $body.css("background-image", $body.attr("data-scr")))
    }), $(document).ready(function() {
    					$('#setCooksiesa').click(function() {
    var date = new Date();   
    date.setFullYear(date.getFullYear() + 10);
    document.cookie = 'eu-cookises=1; path=/; expires=' + date.toGMTString();
    $('#cookies').hide();  
});	          
            $(".simple-ajax-popup").magnificPopup({
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
                        url: "/",
                        dataType: "json",
                        data: "loginEmail=" + $("#loginEmail").val(),
                        success: function(e) {
                            $("#email").val(e.email), $("#fullname").val(e.fu_jmeno), $("#telefon").val(e.fu_phone), $("#mesto").val(e.fu_mesto), $("#ulice").val(e.fu_ulice), $("#psc").val(e.fu_psc), $("#firma").val(e.fu_firma), $("#dic").val(e.fu_dic), $("#ico").val(e.fu_ico), e.ulice && ($("#ffullname").val(e.fu_jmeno + " " + e.firstname), $("#ffirma").val(e.firma), $("#fulice").val(e.ulice), $("#fpsc").val(e.psc), $("#ftelefon").val(e.phone), $("#fMesto").val(e.mesto), $("#otherAdress").fadeIn(400), $(".downArr").css("display", "none"), $(".upArr").css("display", "inline"), $(".rozCont").css("display", "inline"))
                        }
                    }), e.preventDefault()
                })
            }), $(document).ready(function() {
                $(".second-search-show").click(function() {
                    $("#second-menu").css("display", "none"), $(".second-search").toggle();
                    	$(".nav-stacked").css("display", "none");    
                })
            });  
            $( window ).resize(function() { 
            	   $("#left-column .navbar-default").css("width",$("#left-column").width());     
            });     
            $(window).scroll(function() {
                var height = $(window).scrollTop();
                windowWinth  = $( window ).width();            
                if (height > 1) {          
                 $("#header").css({     
                            "height": "91px"                     
                       });                       
                    if(windowWinth  > 549){
                         $("#header > .flags ").css({  
                            "position": "fixed"     
                        });     
                    }
                     
                    else{  
                         $("#header").css({  
                            "display": "none"}); 
                    } ;     
                    
                        $("#left-column .navbar-default").css("width",$("#left-column").width());       
                       $("#left-column .navbar-default").css({  
                        "position": "fixed"  });         
                            
                } else {   
                    $("#header > .flags").css({    
                        "position": "relative"
                    });     
                     $("#header").css({       
                            "height": "122px"            
                        });  
                          $("#header").css({  
                             "display": "block"
                         });      
                       $("#left-column .navbar-default").css({  
                        "position": "relative"
                    }); 
                }
            });
            });  