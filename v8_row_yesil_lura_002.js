'use strict';
/** @type {boolean} */
var urunDetay_varyasyonSecili = false;
/** @type {number} */
var urunDuzeniTipi = 0;
/**
 * @return {undefined}
 */
function topMenuCallback() {
  setTimeout(mobilMenu, 600);
  $(".navigation").dropDiv({
    newSource : "headerContent",
    after : true
  });
  $(".HeaderMenu2 li").each(function() {
    if ($(this).find("ul").length > 0) {
      $(this).addClass("ulVar");
    }
  });
}
(function($) {
  /**
   * @param {?} change
   * @return {?}
   */
  $.fn.dropDiv = function(change) {
    var opt = {
      newSource : "",
      newHtml : "",
      after : false,
      before : false
    };
    change = $.extend(opt, change);
    return this.each(function() {
      var showCrudsButton = change.newHtml;
      var html = this.outerHTML;
      /** @type {string} */
      var element = "";
      if ($("." + change.newSource + "").length > 0) {
        /** @type {string} */
        element = ".";
      } else {
        if ($("#" + change.newSource + "").length > 0) {
          /** @type {string} */
          element = "#";
        } else {
          if (true) {
            /** @type {string} */
            element = "";
          }
        }
      }
      if (change.after == false && change.before == false) {
        if (showCrudsButton == "") {
          $("" + element + "" + change.newSource + "").append(html);
          $(this).remove();
        } else {
          $("" + element + "" + change.newSource + "").append(showCrudsButton);
        }
      } else {
        if (change.after == true) {
          if (showCrudsButton == "") {
            $("" + element + "" + change.newSource + "").after(html);
            $(this).remove();
          } else {
            $("" + element + "" + change.newSource + "").after(showCrudsButton);
          }
        } else {
          if (change.before == true) {
            if (showCrudsButton == "") {
              $("" + element + "" + change.newSource + "").before(html);
              $(this).remove();
            } else {
              $("" + element + "" + change.newSource + "").before(showCrudsButton);
            }
          }
        }
      }
    });
  };
})(jQuery);
/**
 * @return {undefined}
 */
function blockCompleteCallback() {
  setTimeout(function() {
    $(".KatMenu1 li").each(function() {
      if ($(this).find("ul").length > 0) {
        $(this).addClass("ulVar");
      }
    });
  }, 500);
}
/**
 * @param {number} canCreateDiscussions
 * @return {undefined}
 */
function urunDuzeni(canCreateDiscussions) {
  $(".sort_hrz").removeClass("Active");
  $(".sort_3").removeClass("Active");
  $(".sort_4").removeClass("Active");
  if (canCreateDiscussions == 1) {
    $(".centerCount .ProductList").removeClass().addClass("ProductList pr_hrz");
    $(".centerCount .ItemOrj").removeClass().addClass("ItemOrj col-xs-12");
    $(".sort_hrz").addClass("Active");
  } else {
    if (canCreateDiscussions == 2) {
      $(".centerCount .ProductList").removeClass().addClass("ProductList sort_3");
      $(".centerCount .ItemOrj").removeClass().addClass("ItemOrj col-lg-4 col-md-6 col-sm-6 col-xs-6");
      $(".sort_3").addClass("Active");
    } else {
      if (canCreateDiscussions == 3) {
        $(".centerCount .ProductList").removeClass().addClass("ProductList sort_4");
        $(".centerCount .ItemOrj").removeClass().addClass("ItemOrj col-lg-3 col-md-3 col-sm-4 col-xs-6");
        $(".blockSelect .sort_4").addClass("Active");
      } else {
        if (canCreateDiscussions == 4) {
          $(".centerCount .ProductList").removeClass().addClass("ProductList sort_3");
          $(".centerCount .ItemOrj").removeClass().addClass("ItemOrj col-lg-4 col-md-4 col-sm-6 col-xs-6");
          $(".sort_3").addClass("Active");
        } else {
          if (canCreateDiscussions == 5) {
            $(".centerCount .ProductList").removeClass().addClass("ProductList sort_4");
            $(".centerCount .ItemOrj").removeClass().addClass("ItemOrj col-lg-3 col-md-3 col-sm-6 col-xs-6");
            $(".sort_4").addClass("Active");
          }
        }
      }
    }
  }
  lazyLoad();
}
/**
 * @return {undefined}
 */
function getGalleryImagesCallback() {
  $(".Marquee .owl-carousel").owlCarousel({
    loop : false,
    margin : 0,
    navClass : ["ProductListprev", "ProductListnext"],
    nav : true,
    lazyLoad : true,
    responsive : {
      0 : {
        items : 2
      },
      600 : {
        items : 3
      },
      1E3 : {
        items : 6
      }
    }
  });
}
/**
 * @return {undefined}
 */
function urunListCallback() {
  if (globalBlokModel == 1) {
    if (urunDuzeniTipi == 0) {
      /** @type {number} */
      urunDuzeniTipi = 4;
    }
    $(".rightBlock").css("display", "none");
    $(".leftBlock").addClass("col-md-3 col-lg-3 col-xs-12 col-sm-12");
    $(".centerCount").addClass("solYadaSagAcik col-md-9 col-lg-9 col-xs-12 col-sm-12");
    $(".leftImage").addClass("col-xs-4 col-md-5 col-sm-5");
    $(".RightDetail").addClass("col-xs-8 col-md-7 col-sm-7");
    $(".urunOzellik, #divIlgiliUrunler, #divBenzerUrun").addClass("col-sm-12");
    $("body").on("click", ".blockSelect .sort_hrz", function() {
      /** @type {number} */
      urunDuzeniTipi = 1;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_3", function() {
      /** @type {number} */
      urunDuzeniTipi = 4;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_4", function() {
      /** @type {number} */
      urunDuzeniTipi = 3;
      urunDuzeni(urunDuzeniTipi);
    });
  }
  if (globalBlokModel == 2) {
    $(".sort_hrz").hide();
    $(".sort_3").hide();
    $(".sort_4").hide();
    $(".rightBlock").addClass("col-md-3 col-lg-3 col-xs-12 col-sm-12");
    $(".centerCount").addClass("solSagBlokAcik col-md-6 col-lg-6 col-xs-12 col-sm-12");
    $(".leftBlock").addClass("col-md-3 col-lg-3 col-xs-12 col-sm-12");
  }
  if (globalBlokModel == 3) {
    if (urunDuzeniTipi == 0) {
      /** @type {number} */
      urunDuzeniTipi = 4;
    }
    $(".sort_4").hide();
    $(".leftBlock").css("display", "none");
    $(".rightBlock").addClass("col-md-3 col-lg-3 col-xs-12 col-sm-12");
    $(".centerCount").addClass("solYadaSagAcik col-md-9 col-lg-9 col-xs-12 col-sm-12");
    $(".leftImage").addClass("col-xs-4 col-md-5 col-sm-5");
    $(".RightDetail").addClass("col-xs-8 col-md-7 col-sm-7");
    $(".urunOzellik, #divIlgiliUrunler, #divBenzerUrun").addClass("col-sm-12");
    $("body").on("click", ".blockSelect .sort_hrz", function() {
      /** @type {number} */
      urunDuzeniTipi = 1;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_3", function() {
      /** @type {number} */
      urunDuzeniTipi = 4;
      urunDuzeni(urunDuzeniTipi);
    });
  }
  if (globalBlokModel == 4) {
    if (urunDuzeniTipi == 0) {
      /** @type {number} */
      urunDuzeniTipi = 3;
    }
    $(".centerCount").addClass("col-md-12 col-lg-12 col-xs-12 col-sm-12");
    $(".leftImage").addClass("col-xs-12 col-md-5 col-sm-5");
    $(".RightDetail").addClass("col-xs-12 col-md-7 col-sm-7");
    $(".urunOzellik, #divIlgiliUrunler, #divBenzerUrun").addClass("col-sm-12");
    $("body").on("click", ".blockSelect .sort_hrz", function() {
      /** @type {number} */
      urunDuzeniTipi = 1;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_3", function() {
      /** @type {number} */
      urunDuzeniTipi = 4;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_4", function() {
      /** @type {number} */
      urunDuzeniTipi = 5;
      urunDuzeni(urunDuzeniTipi);
    });
  }
  $(".ticiTopBlockContent .jCarouselLite ul, .ticiBottomBlockContent .jCarouselLite ul").each(function() {
    if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
      $(this).owlCarousel({
        autoplay : true,
        loop : true,
        autoplayTimeout : 2000,
        navClass : ["ProductListprev", "ProductListnext"],
        autoplaySpeed : 2000,
        autoplayHoverPause : true,
        margin : 30,
        nav : true,
        lazyLoad : true,
        responsive : {
          0 : {
            items : 2,
            margin : 10,
            nav : true
          },
          768 : {
            items : 4,
            nav : true
          },
          992 : {
            items : 4,
            nav : true
          },
          1200 : {
            items : 6,
            nav : true
          }
        }
      });
    }
  });
  $(".centerCount .jCarouselLite ul").each(function() {
    if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
      $(this).owlCarousel({
        autoplay : true,
        loop : false,
        autoplayTimeout : 2000,
        navClass : ["ProductListprev", "ProductListnext"],
        autoplaySpeed : 2000,
        autoplayHoverPause : true,
        margin : 30,
        nav : true,
        lazyLoad : true,
        responsive : {
          0 : {
            items : 2,
            margin : 10,
            nav : true
          },
          768 : {
            items : globalBlokModel == 1 ? 2 : globalBlokModel == 2 ? 2 : globalBlokModel == 3 ? 2 : globalBlokModel == 4 ? 2 : 2,
            nav : true
          },
          992 : {
            items : globalBlokModel == 1 ? 3 : globalBlokModel == 2 ? 3 : globalBlokModel == 3 ? 3 : globalBlokModel == 4 ? 3 : 3,
            nav : true
          },
          1200 : {
            items : globalBlokModel == 1 ? 3 : globalBlokModel == 2 ? 2 : globalBlokModel == 3 ? 3 : globalBlokModel == 4 ? 4 : 4,
            nav : true
          }
        }
      });
    }
  });
  $(".leftBlock .jCarouselLite ul").each(function() {
    if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
      $(this).owlCarousel({
        loop : false,
        autoplay : true,
        autoplayTimeout : 2000,
        autoplaySpeed : 2000,
        navClass : ["ProductListprev", "ProductListnext"],
        autoplayHoverPause : true,
        margin : 1,
        nav : true,
        lazyLoad : true,
        responsive : {
          0 : {
            items : 1
          }
        }
      });
    }
  });
  $(".rightBlock .jCarouselLite ul").each(function() {
    if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
      $(this).owlCarousel({
        loop : false,
        autoplay : true,
        autoplayTimeout : 2000,
        navClass : ["ProductListprev", "ProductListnext"],
        autoplaySpeed : 2000,
        autoplayHoverPause : true,
        margin : 1,
        nav : true,
        lazyLoad : true,
        responsive : {
          0 : {
            items : 1
          }
        }
      });
    }
  });
  urunDuzeni(urunDuzeniTipi);
}
$(document).ready(function() {

    // Site title | Semih SAHIN - FERISOFT
  $('title').text('Lura');
  $('body').prepend('<div id="mist_div"></div>');

  // homepage navbar in top the basket
  $('#header').prepend(
    '<div id="navbar-like-fakir">' +
      '<ul>' +
        '<li><a href="/siparis-takip">Sipariş Takip</a></li>' +
        '<li><a href="/destek">Destek</a></li>' +
        '<li><a href="/kurumsal">Kurumsal</a></li>' +
        '<li><a href="/deneyim">Deneyim</a></li>' +
      '</ul>' +
    '</div>'
  );

  // Flexscroll div fade in (drop-down menu)
  $('.Flexscroll').addClass('fade-in-ferisoft');

  // Flexscroll image removed
  // $('.Flexscroll').append('<img src="https://lura.ticimaxeticaret.com/Uploads/UrunResimleri/buyuk/lura-temizlik-robotu-f-488f.jpg" style="height: 350px; float: right;">');

  // Drop-down menu link icon ---------------------------------------------------------------------------
  var dropdownSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">' +
                      '<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>' +
                    '</svg>'
    
  // console.log($('.ulVar a').first().text());
  $('.ulVar a').first().html($('.ulVar a').first().text() + '&nbsp;&nbsp;' + dropdownSvg)
  // ----------------------------------------------------------------------------------------------------

  $('.ulVar').hover(function () {
    // Site mist | Semih SAHIN - FERISOFT
    $('#mist_div').toggleClass('mist_div');
  });

  // Searchbox | Semih SAHIN - FERISOFT
  $('#divArama').html(
    '<div class="search-box">' +
      '<div class="search-icon">' +

      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">' +
        '<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>' +
      '</svg>' +

      '</div>' +
      '<input name="ct100$txtbxArama" type="text" id="txtbxArama" style="color: #000;" tabindex="-1" onkeypress="return ProductSeachTopOnKeyPress(event)" inputmode="search" placeholder="Ara..." autocomplete="off">' +
      '<input type="button" name="" onclick="ProductSearchTop()" id="btnKelimeAra" class="rsbButton" value="Ara" title="Ara">' +
      '<svg class="search-border" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" viewBox="0 0 671 111" style="enable-background:new 0 0 671 111;" xml:space="preserve">' +
        '<path class="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280"/>' +
        '<path class="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280"/>' +
      '</svg>' +
      '<div class="go-icon"><i class="fa fa-arrow-right"></i></div>' +
    '</div>'
  );

  // For the searchbox to appear first | Semih SAHIN - FERISOFT
  $('.headerContent').prepend("<div id='divTopProductSearch' style='margin-top: 2rem'>" + $('#divTopProductSearch').html() + "</div>");

  // Removed those related to the previous searchbox | Semih SAHIN - FERISOFT
  $('.searchContent').remove();
  $('.arabtn').remove();
  $('#btnKelimeAra').hide();

  // New searchbox attrs | Semih SAHIN - FERISOFT
  $("#txtbxArama").focus(function() {
    $(".search-box").addClass("border-searching");
    $(".search-icon").addClass("si-rotate");
  });
  $("#txtbxArama").blur(function() {
    $(".search-box").removeClass("border-searching");
    $(".search-icon").removeClass("si-rotate");
  });
  $("#txtbxArama").keyup(function() {
      if($(this).val().length > 0) {
        $(".go-icon").addClass("go-in");
      }
      else {
        $(".go-icon").removeClass("go-in");
      }
  });
  $(".go-icon").click(function(){
    ProductSearchTop();
  });


  // // Footer end area | Semih SAHIN - FERISOFT
  // $('#divTicimaxCopyrightContent').html(
  //   '<div id="divTicimaxCopyrightContent" align="center">' +
  //     '<a class="mobilTicimaxLogo" href="https://ferisoft.com/" title="Ferisoft" target="_blank"></a>' +
  //     '<p id="ticimaxCopyright" class="ticimax_link_main" style="color: #000; margin: 15px 0; display: block !important;">' +
  //         'Bu site Ferisoft<sup>®</sup> Gelişmiş <a href="https://ferisoft.com/" style="color: #0066CC;" target="_blank" class="ticimax_link" title="Ferisoft"> E-Ticaret </a> sistemleri ile hazırlanmıştır.' +
  //     '</p>' +
  //   '</div>'
  // );

  // Category title text align | Semih SAHIN - FERISOFT
  $('.iletisimLeft .iletisimLeftFirmaAdi').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftAdres').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftTelefon').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftFaks').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftEposta').attr('style', 'text-align: center;');

  $("#header").prepend("<div class='headerTop'></div>");
  $(window).on("scroll", function() {
    var winds = $(window).width();
    if (winds > 960) {
      if ($(this).scrollTop() > 100) {
        $(".navigation").addClass("fixed");
        $(".searchContent").css("opacity", "0");
      } else {
        $(".navigation").removeClass("fixed");
        $(".searchContent").css("opacity", "1");
      }
    }
  });
  $("#linkOncekiSayfa").dropDiv({
    newSource : "proCategoryTitle "
  });
});
/** @type {boolean} */
var isHoverCartProduct = false;
$(document).ready(function() {
  HoverControl();
});
/**
 * @return {undefined}
 */
function HoverControl() {
  $(".CartProduct").hover(function() {
    /** @type {boolean} */
    isHoverCartProduct = true;
  }, function() {
    /** @type {boolean} */
    isHoverCartProduct = false;
    CartProductClose();
  });
}
/** @type {boolean} */
sepetEkleConfig.openPopup = false;
/**
 * @return {undefined}
 */
sepetEkleConfig.onAfterSepetEkle = function() {
  $("body").addClass("with-menu");
  $(".CartProduct").addClass("cartFixed ");
  setTimeout(function() {
    HoverControl();
    if (!isHoverCartProduct) {
      CartProductClose();
    }
  }, 3000);
};
/**
 * @return {undefined}
 */
function CartProductClose() {
  /** @type {boolean} */
  isHoverCartProduct = false;
  $("body").removeClass("with-menu");
  $(".CartProduct").removeClass("cartFixed");
  console.log(isHoverCartProduct + "Kapatma");
}
/**
 * @return {undefined}
 */
function mobilMenu() {
  if (!pageInitialized) {
    $("body").append("<div class='menu-overlay'></div>");
    $("body").append('<div class="side-bar"><ul class="menu-kapat-ul"><li><a href="/">ANASAYFA</a></li><li><a href="javascript:;" class="mobilnav-button"><i class="fa fa-times"></i></a></li></ul><ul class="mobil-menu-tasi"></ul></div>');
    $(".menu-overlay").click(function() {
      $(".side-bar").removeClass("translate-reset");
      $(".menu-overlay").css("display", "none");
      $(".kategoriFiltreSidebar").removeClass("kategoriFiltreSidebar-ac");
    });
    $(".navigation ul.HeaderMenu2").before("<div class='nav-mobil-menu'><span></span><a href='javascript:;' class='mobilnav-button'><i class='fa fa-bars'></i></a></div>");
    $("ul.HeaderMenu2 > li").each(function() {
      $(this).clone().appendTo(".side-bar > ul.mobil-menu-tasi");
    });
  }
  $(".navigation .mobilnav-button").click(function() {
    $(".side-bar").toggleClass("translate-reset");
    $(".menu-overlay").css("display", "block");
    $("#divIcerik,#footer,.menu-kapat-ul > li > .mobilnav-button").click(function() {
      $(".side-bar").removeClass("translate-reset");
      $(".menu-overlay").css("display", "none");
    });
  });
  $(".side-bar > ul.mobil-menu-tasi li").append("<span class='mobilAcilirMenu'><i class='fa fa-chevron-circle-down'></i></span>");
  $(".mobilAcilirMenu").click(function(event) {
    if ($(this).find(">.fa").hasClass("fa-chevron-circle-down")) {
      $(this).closest("li").find("> ul").slideDown();
      $(this).html('<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>');
    } else {
      $(this).html('<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>');
      $(this).closest("li").find("> ul").slideUp();
    }
  });
  /** @type {number} */
  var rtWidth = window.innerWidth;
  if (rtWidth < 768) {
    $(".Addtobasket").click(function() {
      $("html,body").animate({
        scrollTop : $("#divUrunEkSecenek").offset().top - 110
      }, "slow");
    });
  }
}
$(window).on("load", function() {
  /** @type {number} */
  var rtWidth = window.innerWidth;
  if (rtWidth < 768) {
    $(".ProductDetailMainRow").parents("body").addClass("detayBody");
    if ($(".detayBody").length > 0) {
      $(".detayBody").animate({
        scrollTop : $(".ProductDetailMainRow").offset().top - 0
      }, "slow");
    }
  }
});
