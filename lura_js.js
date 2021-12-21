'use strict';
/** @type {number} */
var urunDuzeniTipi = 0;
/** @type {number} */
var mobilBlokCozunurluk = 768;
/** @type {number} */
var sliderZoomCozunurluk = 768;
/** @type {boolean} */
var isHoverCartProduct = false;
/** @type {boolean} */
var kategoriMenuAcikGetir = true;
/** @type {number} */
var urunDetayZoomCozunurluk = 768;
/** @type {number} */
var windowidth = document.documentElement.clientWidth;
/** @type {boolean} */
var urunDetay_varyasyonSecili = true;

$(document).ready(function() {


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

  // console.log("divTopProductSearch html: " + $('#divTopProductSearch').html());
  //$('#divTopProductSearch').text()
  var tttttttest = "<div id='divTopProductSearch' style='margin-top: 2rem'>" + $('#divTopProductSearch').html() + "</div>";
  $('.headerContent').prepend(tttttttest);

  
  $('.arabtn').remove();
  $('#btnKelimeAra').hide();
  // $('.arabtn').setAttribute("id", "search_btn_id");
  // $('#divTopProductSearch').addClass('searchContent');
  // $('#divTopProductSearch').hide();

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


  // Footer end area
  // $('#divTicimaxCopyrightContent').html(
  //   '<div id="divTicimaxCopyrightContent" align="center">' +
  //     '<a class="mobilTicimaxLogo" href="https://ferisoft.com/" title="Ferisoft" target="_blank"></a>' +
  //     '<p id="ticimaxCopyright" class="ticimax_link_main" style="color: #000; margin: 15px 0; display: block !important;">' +
  //         'Bu site Ferisoft<sup>®</sup> Gelişmiş <a href="https://ferisoft.com/" style="color: #0066CC;" target="_blank" class="ticimax_link" title="Ferisoft"> E-Ticaret </a> sistemleri ile hazırlanmıştır.' +
  //     '</p>' +
  //   '</div>'
  // );

  // Category title text ali
  $('.iletisimLeft .iletisimLeftFirmaAdi').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftAdres').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftTelefon').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftFaks').attr('style', 'text-align: center;');
  $('.iletisimLeft .iletisimLeftEposta').attr('style', 'text-align: center;');

  

  if ($("#divSayfalamaUst").length > 0) {
    KategoriIslemleri();
  } else {
    if (globalModel.pageType == "productdetail") {
      UrunDetayIslemleri();
    } else {
      if (globalModel.pageType == "cart" || globalModel.pageType == "ordercomplete" || globalModel.pageType == "payment" || globalModel.pageType == "ordercompleted") {
        SepetEkrani();
      }
    }
  }
  if ($(".pageContainer").length > 0) {
    $("body").addClass("SayfaIcerik");
  }
  if ($(".magazalarContent").length > 0) {
    $("body").addClass("Magazalar");
  }
  GlobalIslemler();
});
setTimeout(function() {
  loadStyle("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap&subset=latin-ext", function() {
  });
}, 250);
/**
 * @return {undefined}
 */
function GlobalIslemler() {
  if (!pageInitialized) {
    if (windowidth > 767) {
      $(".htop").insertBefore(".headerContent");
    }
    $(".mycart").after('');
    if (windowidth < 768) {
      $(".arabtn").insertBefore("#logo");
    }
    $(".arabtn").on("click", function() {
      $(".searchContent").toggleClass("active");
    });
    $("body").on("click", function(evt) {
      if (!$(evt.target).is(".arabtn,.arabtn i,.searchContent,.searchContent *")) {
        $(".searchContent").removeClass("active");
      }
    });
  }
  $("#instaStories").insertAfter(".arabtn");
  sayfaTasarim();
}
/**
 * @return {undefined}
 */
function sayfaTasarim() {
  if ($("#mainHolder_divDesign").length > 0) {
    urunDon();
  }
}
/**
 * @return {undefined}
 */
function urunDon() {
  $(".productItem").find("video").parent().addClass("Videolu");
  $(".productItem").find(".TukendiIco").parent().addClass("StokYok");
  $(".productPrice").find(".regularPrice").parent().addClass("IndirimVar");
  $(".sliderBannerContainer .productItem").find("video").parent().addClass("Videolu");
  $(".productItem").each(function(index) {
    if ($(this).find(".divVideoPlayButton").length > 0) {
      $(this).find(".divVideoPlayButton").insertAfter($(this).find(".productDetail"));
    }
  });
  if (typeof InitTimers != "undefined") {
    InitTimers();
  }
}
/**
 * @return {undefined}
 */
function KategoriIslemleri() {
  $(".categoryTitle .categoryTitleText").prependTo(".categoryContainer");
  if (windowidth > 1041) {
    $(".leftBlock .category-vertical-filters .panel .panel-heading").on("click", function(event) {
      $(this).parent().find(".list-group, .slider-range, .amount").slideToggle();
      $(this).toggleClass("active");
    });
  }
}
/**
 * @return {undefined}
 */
function UrunDetayIslemleri() {
  if (productDetailModel.totalStockAmount < 1) {
    $(".RightDetail").addClass("StokYok");
  }
  if (!pageInitialized) {
    $(".ProductDetailMain").prepend('<div class="TopDet"></div>');
    $(".ProductDetail > .categoryTitle").insertBefore("#divIcerik");
    $(".leftImage").appendTo(".TopDet");
    $(".RightDetail").appendTo(".TopDet");
    $(".RightDetail").prepend('<div class="TopList"></div>');
    $(".PriceList").prependTo(".TopList");
    $(".ProductName").prependTo(".TopList");
    $(".TopList").after('<div class="MiddleList"></div>');
    $("#divSatinAl").appendTo(".MiddleList");
    $("#divUrunEkSecenek").prependTo(".MiddleList");
    $("#divStokYok").prependTo(".MiddleList");
    $(".MiddleList").after('<div class="BottomList"></div>');
    $(".ProductIcon").appendTo(".BottomList");
    $(".ProductIcon2 ").appendTo(".BottomList");
    $("#divEkstraBilgiler").appendTo(".BottomList");
    $(".product_social_icon_wrapper").appendTo(".BottomList");
    $(".markaresmi").insertBefore(".ProductName");
    $("#divOnyazi").insertAfter(".ProductName");
    $("#divMagazaStok").insertAfter(".ProductName");
    $("#divTahminiTeslimatSuresi").insertAfter(".ProductName");
    $("#divIndirimOrani").insertAfter(".ProductName");
    $("#divParaPuan").insertAfter(".ProductName");
    $("#divToplamStokAdedi").insertAfter(".ProductName");
    $("#divUrunStokAdedi").insertAfter(".ProductName");
    $("#divTedarikci").insertAfter(".ProductName");
    $("#divBarkod").insertAfter(".ProductName");
    $(".puanVer").insertAfter(".ProductName");
    $("#divMarka").insertAfter(".ProductName");
    $("#divUrunKodu").insertAfter(".ProductName");
    $(".riSingle .riUp").html('<i class="far fa-plus"></i>');
    $(".riSingle .riDown").html('<i class="far fa-minus"></i>');
    $(".buyfast").insertAfter(".basketBtn");
    $("#divAdetCombo").insertBefore(".basketBtn");
    $("#divTaksitAciklama").insertAfter("#pnlFiyatlar");
    $(".UWhatsApp").insertAfter(".product_social_icon_wrapper li:last-child");
    $("#divKombinSatinAl").insertAfter(".basketBtn");
    $("#divIndirimOrani").insertAfter("#pnlFiyatlar");
    $("#divTaksitAciklama").insertAfter(".PriceList");
    $("#divMarka").insertAfter(".PriceList");
    if (windowidth > 767) {
      $(".UFavorilerimeEkle").insertAfter(".basketBtn");
    } else {
      $("#divUrunKodu").insertAfter(".PriceList");
      $(".UFavorilerimeEkle").appendTo(".leftImage");
      $(".basketBtn,.UFavorilerimeEkle a").on("click", function() {
        if ($("#hddnUrunID").val() == "0") {
          $("html,body").animate({
            scrollTop : $("#divUrunEkSecenek").offset().top - 110
          }, "slow");
        }
      });
    }
    setTimeout(function() {
      tooltips();
    }, 1500);
    $(".FiyatHaberVer a").on("click", function() {
      setTimeout(function() {
        tooltips();
      }, 100);
    });
  }
}
/**
 * @return {undefined}
 */
function topMenuCallback() {
  if ($(".homeHeader").length > 0) {
    $("body").addClass("homeBody");
  }
  HeaderFixed();
  $(".navUl li").each(function() {
    if ($(this).find("ul").length > 0) {
      $(this).addClass("ulVar");
    }
  });
  var menuwidth = $(".navigation").width();
  if (menuwidth > 1000 || $(".navigation .navUl > li").length > 8 || windowidth < 1250) {
    mobileMenu();
  } else {
    $(".navigation .navUl > li.ulVar").each(function() {
      $(this).find("> ul").wrapAll('<div class="Flexscroll"></div>');
    });
  }
}
/**
 * @return {undefined}
 */
function blockCompleteCallback() {
  if (globalModel.pageType == "homepage") {
  }
  if ($("#divSayfalamaUst").length > 0) {
  }
  if (globalModel.pageType == "productdetail") {
    UrunDetayPaylas();
    $("#linkOncekiSayfa").appendTo("ul.breadcrumb");
    if (!pageInitialized) {
      $("#linkOncekiSayfa").appendTo("ul.breadcrumb");
      if (windowidth < 768) {
        var columns = $(".urunTab ul li");
        var bcofl_checkbox = $(".urunDetayPanel");
        /** @type {number} */
        var i = 0;
        for (; i <= columns.length; i++) {
          /** @type {number} */
          i = 0;
          for (; i <= bcofl_checkbox.length; i++) {
            $(bcofl_checkbox[i]).appendTo(columns[i]);
          }
        }
        $(".urunDetayPanel").hide();
        $(".urunTab").removeAttr("class").addClass("mobilTab");
        $("#linkOncekiSayfa").appendTo(".leftImage");
      }
    }
    $(".mobilTab >ul>li>a").on("click", function() {
      var $this = $(this);
      if ($(this).parent().hasClass("active")) {
        $(".mobilTab >ul>li>a").parent().removeClass("active");
      } else {
        $(".mobilTab >ul>li>a").parent().removeClass("active");
        $(this).parent().addClass("active");
      }
      var getdate = $this.attr("data-tab") || "";
      if (getdate === "Commets") {
        TabGetComments();
      } else {
        if (getdate === "recommendations") {
          TabGetRecommendations();
        }
      }
    });
  }
}
/**
 * @return {undefined}
 */
function urunListCallback() {
  if (globalBlokModel == 1) {
    if (urunDuzeniTipi == 0) {
      /** @type {number} */
      urunDuzeniTipi = 3;
    }
    $(".leftBlock").removeClass().addClass("leftBlock LeftMiddle");
    $(".centerCount").removeClass().addClass("centerCount LeftMiddle");
  } else {
    if (globalBlokModel == 2) {
      if (urunDuzeniTipi == 0) {
        /** @type {number} */
        urunDuzeniTipi = 2;
      }
      $(".leftBlock").removeClass().addClass("leftBlock LeftMiddleRight");
      $(".rightBlock").removeClass().addClass("rightBlock LeftMiddleRight");
      $(".centerCount").removeClass().addClass("centerCount LeftMiddleRight");
    } else {
      if (globalBlokModel == 3) {
        if (urunDuzeniTipi == 0) {
          /** @type {number} */
          urunDuzeniTipi = 4;
        }
        $(".rightBlock").removeClass().addClass("rightBlock MiddleRight");
        $(".centerCount").removeClass().addClass("centerCount MiddleRight");
      } else {
        if (globalBlokModel == 4) {
          if (urunDuzeniTipi == 0) {
            /** @type {number} */
            urunDuzeniTipi = 3;
          }
          $(".centerCount").removeClass().addClass("centerCount Middle");
        }
      }
    }
  }
  if ($(".blockSelect").length > 0) {
    $("body").on("click", ".blockSelect .sort_hrz", function() {
      /** @type {number} */
      urunDuzeniTipi = 1;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_2", function() {
      /** @type {number} */
      urunDuzeniTipi = 2;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_3", function() {
      /** @type {number} */
      urunDuzeniTipi = 3;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_4", function() {
      /** @type {number} */
      urunDuzeniTipi = 4;
      urunDuzeni(urunDuzeniTipi);
    });
    $("body").on("click", ".blockSelect .sort_5", function() {
      /** @type {number} */
      urunDuzeniTipi = 5;
      urunDuzeni(urunDuzeniTipi);
    });
  }
  $(".sliderBannerContainer:not(.NoSlider, .SliderYan, .OzelSlider,.YatayUrun) .jCarouselLite ul").each(function() {
    if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
      $(this).owlCarousel({
        autoplay : false,
        loop : false,
        autoplayTimeout : 2000,
        navClass : ["ProductListprev", "ProductListnext"],
        autoplaySpeed : 800,
        autoplayHoverPause : true,
        margin : 20,
        nav : true,
        lazyLoad : true,
        responsive : {
          0 : {
            items : 2,
            autoplay : false,
            loop : true,
            margin : 5
          },
          768 : {
            items : 3
          },
          1025 : {
            items : 3
          },
          1042 : {
            items : 4
          },
          1200 : {
            items : 4
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
  if (globalModel.pageType == "homepage") {
  }
  if ($("#divSayfalamaUst").length > 0) {
  }
  if (globalModel.pageType == "productdetail") {
    if ($("#divSatinAl").css("display") == "none") {
      $(".RightDetail").addClass("StokYok");
    }
    $(".centerCount .detaySliderContainer:not(#divIlgiliUrunler) .jCarouselLite ul").each(function() {
      if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
        $(this).owlCarousel({
          autoplay : false,
          loop : false,
          autoplayTimeout : 2000,
          navClass : ["ProductListprev", "ProductListnext"],
          autoplaySpeed : 800,
          autoplayHoverPause : true,
          margin : 20,
          nav : true,
          lazyLoad : true,
          responsive : {
            0 : {
              items : 2,
              autoplay : true,
              loop : true,
              margin : 5
            },
            768 : {
              items : 3
            },
            1025 : {
              items : 3
            },
            1042 : {
              items : 4
            },
            1200 : {
              items : 4
            }
          }
        });
      }
    });
    $("#IlgiliUrunDiv").insertBefore("#divUrunEkSecenek");
    if ($(".resimlivaryasyon").length > 0) {
      $(".TopDet #IlgiliUrunDiv .JKatAdi .bold .satir1").html($("#divUrunEkSecenek .eksecenekLine.resimlivaryasyon .left_line").text());
    }
  }
  urunDon();
}
/**
 * @param {number} canCreateDiscussions
 * @return {undefined}
 */
function urunDuzeni(canCreateDiscussions) {
  if ($("#divSayfalamaUst").length > 0) {
    if ($(".blockSelect .sort_5").length == 0) {
      $(".blockSelect .sort_4").after('<a href="javascript:;" class="sort_5"><i class="fas fa-th"></i></a>');
    }
    if ($(".blockSelect .sort_2").length == 0) {
      $(".blockSelect .sort_3").before('<a href="javascript:;" class="sort_2"><i class="fas fa-th-large"></i></a>');
    }
    if ($(".brandlistselection select").length > 0) {
      $("#divSayfalamaUst").addClass("Slct");
    }
    $(".sort_hrz").removeClass("Active");
    $(".sort_2").removeClass("Active");
    $(".sort_3").removeClass("Active");
    $(".sort_4").removeClass("Active");
    $(".sort_5").removeClass("Active");
    if (canCreateDiscussions == 1) {
      $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_hrz");
      $(".ItemOrj").removeClass().addClass("ItemOrj col-12");
      $(".blockSelect .sort_hrz").addClass("Active");
      lazyLoad();
    } else {
      if (canCreateDiscussions == 2) {
        $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_2");
        $(".ItemOrj").removeClass().addClass("ItemOrj col-6");
        $(".blockSelect .sort_2").addClass("Active");
        lazyLoad();
      } else {
        if (canCreateDiscussions == 3) {
          $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_3");
          $(".ItemOrj").removeClass().addClass("ItemOrj col-4");
          $(".blockSelect .sort_3").addClass("Active");
          lazyLoad();
        } else {
          if (canCreateDiscussions == 4) {
            $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_4");
            $(".ItemOrj").removeClass().addClass("ItemOrj col-3");
            $(".blockSelect .sort_4").addClass("Active");
            lazyLoad();
          } else {
            if (canCreateDiscussions == 5) {
              $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_5");
              $(".ItemOrj").removeClass().addClass("ItemOrj col-5li");
              $(".blockSelect .sort_5").addClass("Active");
              lazyLoad();
            } else {
              if (canCreateDiscussions == 6) {
                $(".ProductList:not(.markaSlider)").removeClass().addClass("ProductList PlSc_6");
                $(".ItemOrj").removeClass().addClass("ItemOrj col-2");
                lazyLoad();
              }
            }
          }
        }
      }
    }
    if (windowidth < 1042) {
      if ($(".FiltreUst").length == 0) {
        $("body #divSayfalamaUst .category-vertical-filters.top-filters").prepend('<div class="tukgo"><a onclick="sortingClick(1000)" class="filterOrderInStock">' + translateIt("Urunler_Stoktakiler") + "</a></div>");
        $("body #divSayfalamaUst .category-vertical-filters.top-filters").prepend('<div class="FiltreUst"><div class="closeFilt"><i class="fal fa-times"></i></div><span>' + translateIt("UrunFiltreleme_Filtreleme") + '</span><a onclick="clearAllFilters()"><i class="fal fa-trash-alt"></i></a></div>');
        if ($(".moreNum").length == 0) {
          $("#divSayfalamaUst .category-vertical-filters.top-filters .panel").find(".panel-heading").append('<div class="moreNum"></div>');
        }
        $(".mobilFilterBtn").on("click", function(event) {
          $(".mobilaf").addClass("acik");
          $("#divSayfalamaUst .filterBlock").addClass("active");
        });
        $(".closeFilt").on("click", function(event) {
          $(".mobilaf").removeClass("acik");
          $("#divSayfalamaUst .filterBlock").removeClass("active");
        });
        $("#divSayfalamaUst .category-vertical-filters.top-filters .panel").each(function(index, canCreateDiscussions) {
          if ($(this).find("li").hasClass("selected")) {
            var formattedChosenQuestion = $(this).find("li.selected").length;
            $(this).addClass("more");
            $(this).find(".moreNum").html(formattedChosenQuestion);
          } else {
            $(this).removeClass("more");
            $(this).find(".moreNum").html("");
          }
        });
        $("#divSayfalamaUst .category-vertical-filters.top-filters .panel").each(function(index, canCreateDiscussions) {
          if ($("#divSayfalamaUst .category-vertical-filters.top-filters .panel").hasClass("more")) {
            $(".FiltreUst a").addClass("active");
            return false;
          } else {
            $(".FiltreUst a").removeClass("active");
          }
        });
        if ($(".sortingContent .filterOrderInStock").hasClass("selected")) {
          $(".tukgo .filterOrderInStock").addClass("selected");
        } else {
          $(".tukgo .filterOrderInStock").removeClass("selected");
        }
        if ($(".sortingContent .sortingButton").length > 0) {
          if ($('.sortingContent .sortingButton > a[onclick="sortingClick(1000)"]').hasClass("selected")) {
            $(".tukgo .filterOrderInStock").addClass("selected");
          } else {
            $(".tukgo .filterOrderInStock").removeClass("selected");
          }
        }
      }
    }
  }
  if (globalModel.pageType == "productdetail") {
    if ($("#divUrunKodu span").length == 0) {
      $("#divUrunKodu").append("<span>" + translateIt("Global_StokKodu") + "</span>");
    }
  }
}
/**
 * @return {undefined}
 */
function ekSecenekListesiCallBack() {
  if (globalModel.pageType == "productdetail") {
    if ($("#divUrunKodu span").length == 0) {
      $("#divUrunKodu").append("<span>" + translateIt("Global_StokKodu") + "</span>");
    }
  }
}
/**
 * @return {undefined}
 */
function mobileMenu() {
  if (windowidth > 767) {
    $("#header,body").addClass("MoreMenu");
  }
  var menuKopya = $(".navigation").html();
  $(".navigation").remove();
  $(".headerContent").prepend('<div class="mobilMenuAcButton"><span>MENU</span><i class="fal fa-bars"></i></div>');
  $("body").prepend('<div class="mobilaf"></div>');
  if (windowidth < 768) {
    $(".headerContent").prepend('<div class="mycartClick"><i class="fal fa-shopping-cart"></i></div>');
    $("#divIcerik").on("touchend", function() {
      $(".welcome").removeClass("active");
      $(".searchContent").removeClass("active");
    });
    $("body").on("click", ".searchClick", function() {
      $(".searchContent").toggleClass("active");
      $(".mobilMenu").removeClass("acik");
      $(".altMenu").removeClass("active");
      $(".ResimliMenu1AltUl").removeClass("active");
      $(".mobilMenu .KatMenu1 > li ul").removeClass("active");
      $(".mobilMenu .navUl ul").removeClass("active");
      $(".mobilMenu .lfMenuAltContent").removeClass("active");
      $(".mobilAcilirMenu").html('<i class="fal fa-angle-right"></i>');
      $(".CartProduct").removeClass("animated");
      $(".welcome").removeClass("active");
      $("#lang_flag_container").removeClass("selector");
      $("#txtbxArama").focus();
    });
    $("body").on("click", ".welcomeOpen", function() {
      $(".welcome").toggleClass("active");
      $(".mobilMenu").removeClass("acik");
      $(".altMenu").removeClass("active");
      $(".ResimliMenu1AltUl").removeClass("active");
      $(".mobilMenu .KatMenu1 > li ul").removeClass("active");
      $(".mobilMenu .navUl ul").removeClass("active");
      $(".mobilMenu .lfMenuAltContent").removeClass("active");
      $(".mobilAcilirMenu").html('<i class="fal fa-angle-right"></i>');
      $(".CartProduct").removeClass("animated");
      $(".searchContent").removeClass("active");
      $("#lang_flag_container").removeClass("selector");
    });
  }
  $("body").on("click", ".mobilMenuAcButton", function() {
    if ($(".mobilMenu").length == 0) {
      $("body").prepend('<div class="mobilMenu"><div class="menuUstBolum"><div class="mobilMenuBT"><i class="fal fa-bars"></i><span>MENU</span></div><div class="CloseBtnMenu"><i class="far fa-times"></i></div></div><div class="menuIcerikAlan">' + menuKopya + "</div>");
      if ($(".HeaderMenu2").length > 0) {
        $(".mobilMenu .HeaderMenu2 > li > ul").closest("li").append('<div class="ResimsizDown"><i class="fal fa-angle-right"></i></div>');
        $(".mobilMenu .HeaderMenu2 > li > ul li ul").closest("li").append('<div class="ResimsizDown2"><i class="fal fa-angle-right"></i></div>');
        $("body").on("click", ".ResimsizDown", function() {
          if ($(this).find(".fal").hasClass("fa-angle-right")) {
            $(this).closest("li").find("> ul").addClass("active");
          } else {
            $(this).closest("li").find("> ul").removeClass("active");
          }
        });
        $("body").on("click", ".ResimsizDown2", function() {
          if ($(this).find(".fal").hasClass("fa-angle-right")) {
            $(this).closest("li").find("> ul").addClass("active");
            $(this).closest("ul").addClass("over");
          } else {
            $(this).closest("li").find("> ul").removeClass("active");
            $(this).closest("ul").removeClass("over");
          }
        });
        $(".ResimsizDown").each(function(index, canCreateDiscussions) {
          var Down1 = $(this).parent("li").find(">a").text();
          $(this).closest("li").find("> ul").prepend('<span><div class="NoiBack"><i class="fal fa-long-arrow-left"></i></div> <span>' + Down1 + "</span></span>");
        });
        $(".ResimsizDown2").each(function(index, canCreateDiscussions) {
          var Down2 = $(this).parent("li").find(">a").text();
          $(this).closest("li").find("> ul").prepend('<span><div class="NoiBack2"><i class="fal fa-long-arrow-left"></i></div> <span>' + Down2 + "</span></span>");
        });
        $("body").on("click", ".NoiBack2", function() {
          $(this).parent().parent().removeClass("active");
          $(this).closest(".over").removeClass("over");
          $(".mobilMenu .navUl > li > ul").animate({
            scrollTop : 0
          }, 100);
          $(".menuIcerikAlan").animate({
            scrollTop : 0
          }, 100);
        });
        $("body").on("click", ".NoiBack", function() {
          $(".mobilMenu .navUl > li > ul").removeClass("active");
          $(".menuIcerikAlan").animate({
            scrollTop : 0
          }, 100);
        });
      }
    }
    $("body").addClass("overflow transform");
    setTimeout(function() {
      $(".mobilMenu").addClass("acik");
    }, 25);
    $(".mobilaf").addClass("acik").removeAttr("style");
    $(".CartProduct").removeClass("animated");
    $(".welcome").removeClass("active");
    $(".searchContent").removeClass("active");
    $("#lang_flag_container").removeClass("selector");
  });
  $("body").on("click", ".mobilaf,.CloseBtnMenu", function() {
    $("body").removeClass("overflow transform");
    $(".mobilMenu").removeClass("acik");
    $(".altMenu").removeClass("active");
    $(".ResimliMenu1AltUl").removeClass("active");
    $(".mobilMenu .KatMenu1 > li ul").removeClass("active");
    $(".mobilMenu .navUl ul").removeClass("active");
    $(".mobilMenu .lfMenuAltContent").removeClass("active");
    $(".mobilAcilirMenu").html('<i class="fal fa-angle-right"></i>');
    $(".mobilaf").removeClass("acik").removeAttr("style");
    $(".searchContent").removeClass("active");
    $(".welcome").removeClass("active");
    $(".CartProduct").removeClass("animated");
    $("#lang_flag_container").removeClass("selector");
    $("body #divSayfalamaUst .filterBlock").removeClass("active");
  });
  $("body").on("click", ".mobilMenuBT", function() {
    $(".mobilMenu .navUl > li").find("ul").removeClass("active over");
  });
  if (windowidth > 361 && windowidth < 768) {
    bottomHead();
  }
}
/** @type {boolean} */
var mobtmScrollCtrl = false;
/**
 * @return {undefined}
 */
function bottomHead() {
  if (!mobtmScrollCtrl && $(".bottomHead").length == 0) {
    $("body:not(.sepetimBody)").append('<div class="bottomHead"> <ul> <li class="homeC"> <a href="/"><i class="fal fa-home"></i><span>' + translateIt("GlobalMasterPage_Anasayfa") + '</span></a> </li> <li class="favoC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fal fa-heart"></i><span>' + translateIt("Favorilerim_Baslik") + '</span><div class="favNum"></div></a> </li> <li class="cartC"> <a href="/sepetim.aspx"><i class="fal fa-shopping-cart"></i><span>' + translateIt("GlobalMasterPage_Sepetim") + 
    '</span></a> </li> <li class="welcC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fal fa-user"></i><span>' + translateIt("GlobalMasterPage_MobilUyeGirisi") + "</span></a> </li> </ul> </div>");
    if (siteSettings.isAuthenticated == true) {
      $(".welcC a").attr("href", "/hesabim.aspx");
      $(".favoC a").attr("href", "/Hesabim.aspx/#/Favorilerim");
      $(".welcC span").html(translateIt("GlobalMasterPage_MobilHesabim"));
    }
    /** @type {boolean} */
    var mobtmScrollCtrl = true;
  }
}
/**
 * @return {undefined}
 */
function SepetEkrani() {
  $(".navigation .navUl").wrapAll("<div></div>");
  $(".Mic").insertAfter(".navUl");
  setTimeout(function() {
    var wle = $(".welcome").html();
    $(".welcome").html("");
    $(".welcome").append("<div>" + wle + "</div>");
  }, 1500);
  if ($(".sepett").find("div").length > 0) {
    $(".mycart").addClass("more");
  }
  if ($(".BasketDetailCargo").length > 0) {
    $(".mycart").addClass("more");
  }
  if ($(".odemeMenuContent").length > 0) {
    $(".mycart").addClass("more");
  }
  urunDon();
}
/**
 * @return {undefined}
 */
function HesabimTakip() {
  $("body").addClass("HesabimTakip");
}
/**
 * @return {undefined}
 */
function Iletisimaspx() {
  $("body").addClass("Iletisimaspx");
  var propName = globalModel.member.memberName;
  var classesLine = globalModel.member.memberEMail;
  $("#mainHolder_txtbxAdSoyad").attr("value", propName);
  $("#mainHolder_txtbxMail").attr("value", classesLine);
  $(".iletisimLeft,.iletisimRight").wrapAll('<div class="AdBan"></div>');
  $(".iletisimForm").insertAfter(".AdBan");
  $(".iletisimLeftAdres").insertAfter(".iletisimLeftFirmaAdi");
}
/**
 * @return {undefined}
 */
function UrunDetayPaylas() {
  var classifyName = $(".ProductName h1 span").text();
  /** @type {string} */
  var url = window.location.href;
  /** @type {string} */
  var properURL = "http://" + location.host + "" + $(".Images #imgUrunResim").attr("src") + "";
  /** @type {string} */
  var th_field = "";
  $(".product_social_icons").on("click", function() {
    if ($(this).attr("content") == "facebook") {
      if (isMobileDevice()) {
        window.open("http://m.facebook.com/sharer.php?u=" + url + "");
      } else {
        window.open("http://www.facebook.com/sharer.php?s=100&p[medium]=100&p[title]=" + $.trim(classifyName) + "&p[images][0]=" + properURL + "&p[url]=" + url + "&p[summary]=" + $.trim(classifyName) + "&t=" + $.trim(classifyName) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
      }
    } else {
      if ($(this).attr("content") == "twitter") {
        window.open("http://twitter.com/intent/tweet?text=" + $.trim(classifyName) + "&url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
      } else {
        if ($(this).attr("content") == "googleplus") {
          window.open("https://plus.google.com/share?url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else {
          if ($(this).attr("content") == "pinterest") {
            window.open("http://pinterest.com/pin/create/button/?url=" + url + "&media=" + properURL + "&description=" + $.trim(classifyName) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
          }
        }
      }
    }
  });
}
/**
 * @param {?} data
 * @return {undefined}
 */
function sepetBindRefresh(data) {
  if (typeof data.cart.products != "undefined") {
    if (data.cart.products.length > 0) {
      $(".mycart").addClass("more");
      $(".CartProduct").addClass("more");
      $(".SepetBlock").addClass("more");
    } else {
      $(".mycart").removeClass("more");
      $(".CartProduct").removeClass("more");
      $(".SepetBlock").removeClass("more");
    }
  }
  if (windowidth < 768) {
    $(".mycart > a").removeAttr("href");
    if ($(".SepetUst").length == 0) {
      $(".CartProduct").prepend('<div class="SepetUst"><div class="seClose"><i class="fal fa-times"></i></div><span>' + translateIt("GlobalMasterPage_Sepetim") + "</span></div>");
    }
  }
  if ($(".CartProduct span").hasClass("spanustSepetteUrunYok")) {
    $(".CartProduct").addClass("SepetBos");
  }
  $("body").on("click", ".mycartClick,.mycart .sepetUrunSayisi", function() {
    $(".mobilMenu").removeClass("acik");
    $(".CartProduct").addClass("animated");
    $(".mobilMenu").removeClass("acik");
    $(".altMenu").removeClass("active");
    $(".ResimliMenu1AltUl").removeClass("active");
    $(".mobilMenu .KatMenu1 > li ul").removeClass("active");
    $(".mobilMenu .navUl ul").removeClass("active");
    $(".mobilMenu .lfMenuAltContent").removeClass("active");
    $(".mobilAcilirMenu").html('<i class="fal fa-angle-right"></i>');
    $(".searchContent").removeClass("active");
    $(".welcome").removeClass("active");
    $("#lang_flag_container").removeClass("selector");
  });
}
$(document).on("click", ".seClose", function() {
  $("body").removeClass("overflow transform");
  $(".mobilMenu").removeClass("acik");
  $(".altMenu").removeClass("active");
  $(".ResimliMenu1AltUl").removeClass("active");
  $(".mobilMenu .KatMenu1 > li ul").removeClass("active");
  $(".mobilMenu .navUl ul").removeClass("active");
  $(".mobilMenu .lfMenuAltContent").removeClass("active");
  $(".mobilAcilirMenu").html('<i class="fal fa-angle-right"></i>');
  $(".mobilaf").removeClass("acik").removeAttr("style");
  $(".searchContent").removeClass("active");
  $(".welcome").removeClass("active");
  $(".CartProduct").removeClass("animated");
  $("#lang_flag_container").removeClass("selector");
  $("body #divSayfalamaUst .filterBlock").removeClass("active");
});
$(window).on("load", function() {
  if ($(".hesabimBolumuTutucu").length > 0) {
    HesabimTakip();
  }
  if ($(".iletisimContent").length > 0) {
    Iletisimaspx();
  }
});
$(window).on("scroll", function() {
  if (windowidth < 361) {
    bottomHead();
  }
  if ($(".ebultenGelecek #divNewsLetter").length == 0) {
    $("#divNewsLetter").prependTo(".ebultenGelecek");
  }
  mobilFooter();
});
$(document).ajaxComplete(function() {
  FavoriIslemCallback();
});
/**
 * @return {undefined}
 */
function FavoriIslemCallback() {
  var onewayCount = GetFavoriListe().length;
  if (windowidth > 767) {
    $(".favi span").text(onewayCount);
  } else {
    $(".favNum").text(onewayCount);
  }
}
/**
 * @return {undefined}
 */
function HeaderFixed() {
  if ($(".sepetimBody").length == 0) {
    $(window).on("scroll", function() {
      if (windowidth > 767) {
        if ($(this).scrollTop() > 40) {
          $("#header").addClass("fixed");
          $("body").addClass("margin");
        } else {
          $("#header").removeClass("fixed");
          $("body").removeClass("margin");
        }
      } else {
        if (globalModel.pageType == "homepage") {
          if ($(this).scrollTop() > 115) {
            $("#header").addClass("touched");
          } else {
            $("#header").removeClass("touched");
          }
        }
      }
    });
  }
}
/**
 * @return {undefined}
 */
function tooltips() {
  $(".ProductIcon > div > a").attr("SC_toolTip", "SC_toolTip");
  $(".ProductIcon > div > a").attr("data-placement", "bottom");
  $(".ProductIcon > div > a").each(function(index, canCreateDiscussions) {
    if ($(this).attr("SC_toolTip") == "SC_toolTip" && $(this).find(".tooltip").length == 0) {
      var successToast = $(this).attr("title");
      var placement = $(this).attr("data-placement");
      $(this).append('<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + successToast + "</div></div>");
      $(this).find(".tooltip").addClass(placement);
      var thisheight = $(this).find(".tooltip").height();
      var thiswidth = $(this).find(".tooltip").width();
      if ($(".tooltip").hasClass("right") || $(".tooltip").hasClass("left")) {
        $(this).find(".tooltip").css("margin-top", -thisheight / 2);
      }
      if ($(".tooltip").hasClass("top") || $(".tooltip").hasClass("bottom")) {
        $(this).find(".tooltip").css("margin-left", -thiswidth / 2);
      }
    }
  });
  $(".ProductIcon > div > a").on("mouseenter", function(event) {
    $(this).find(".tooltip").addClass("in");
  });
  $(".ProductIcon > div > a").on("mouseleave", function(event) {
    $(this).find(".tooltip").removeClass("in");
  });
}
/** @type {boolean} */
var mobFtrScrollCtrl = false;
/**
 * @return {undefined}
 */
function mobilFooter() {
  /** @type {boolean} */
  window.blockMenuHeaderScroll = false;
  $(window).on("touchstart", function(e) {
    if ($(e.target).closest(".owl-grab").length == 1) {
      /** @type {boolean} */
      blockMenuHeaderScroll = true;
    }
  });
  $(window).on("touchend", function() {
    /** @type {boolean} */
    blockMenuHeaderScroll = false;
  });
  $(window).on("touchmove", function(event) {
    if (blockMenuHeaderScroll) {
      event.preventDefault();
    }
  });
  if (windowidth < 768 && !mobFtrScrollCtrl) {
    $(".linkler .blink > ul > li > span").append('<div class="ackapabtn"><i class="fal fa-plus"></i></div>');
    $(".linkler .blink > ul > li > span").on("click", function() {
      if ($(this).find(".fal").hasClass("fa-plus")) {
        $(".linkler .blink > ul > li").find("> ul").slideUp("fast");
        $(".linkler .blink > ul > li").find(".ebultenDiv").slideUp("fast");
        $(".linkler .blink > ul > li .ackapabtn").html('<i class="fal fa-plus"></i>');
        $(this).closest("li").find(">ul").slideDown("fast");
        $(this).closest("li").find(".ebultenDiv").slideDown("fast");
        $(this).find(".ackapabtn").html('<i class="fal fa-minus"></i>');
      } else {
        $(this).find(".ackapabtn").html('<i class="fal fa-plus"></i>');
        $(this).closest("li").find("> ul").slideUp("fast");
        $(this).closest("li").find(".ebultenDiv").slideUp("fast");
      }
    });
    /** @type {boolean} */
    mobFtrScrollCtrl = true;
  }
};