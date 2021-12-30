/**
 * @license
 lg-thumbnail - v1.1.0 - 2017-08-08
 http://sachinchoolur.github.io/lightGallery
 Copyright (c) 2017 Sachin N; Licensed GPLv3  Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 Licensed under the MIT License (LICENSE.txt).

 Version: 3.1.12

 Requires: jQuery 1.2.2+
*/
'use strict';
/**
 * @param {?} el
 * @param {number} margin
 * @return {undefined}
 */
function smoothScrollTo(el, margin) {
  if (!margin) {
    /** @type {number} */
    margin = 0;
  }
  /** @type {number} */
  var top = 0;
  top = $(el).offset().top;
  $("html, body").animate({
    scrollTop : top - margin
  }, 550);
}
/**
 * @param {?} module
 * @return {undefined}
 */
function refreshSepet(module) {
  var translate = $("#scriptTemplateGlobalSepetUrun").html();
  var init;
  var self;
  if (translate !== undefined) {
    /**
     * @param {?} data
     * @return {undefined}
     */
    init = function(data) {
      var $donutData;
      var firstNames;
      var opts;
      if (memberCart = data.cart, $(".CartProductInner").html(Handlebars.compile(translate)(data.cart)), $("#spnUstSepetToplamTutar").html(data.cart.tAmount), $("#spnTopSepetToplamTutar").html(data.cart.tAmount), $("#spnTopSepetToplamUrun").html(data.cart.pCount), $("#snpMobilSepetUrunSayisi").html(data.cart.pCount), $("#divSepetblock").length > 0) {
        if (data.cart.products.length <= 0) {
          $("#divSolBlokSepetUrunyok").show();
          $("#SepetBlockGenelTotal").hide();
          $("#divSepetSolBlok").hide();
          $("#divSepetSolBlok").html("");
          $("#divBlokSepetGenelToplam").html("");
        } else {
          if ($("#divSepetSolBlok").html(Handlebars.compile($("#scriptTemplateSepetUrun").html())(data.cart)), $("#divBlokSepetGenelToplam").html(Handlebars.compile($("#scriptTemplateGenelToplam").html())(data.cart)), $("#divSepetSolBlok").show(), $("#divSolBlokSepetUrunyok").hide(), $("#SepetBlockGenelTotal").show(), siteSettings.magazaModulu.magazaStokSatis.aktif && siteSettings.magazaModulu.magazaStokSatis.magazaTemsilciAyar.aktif && localStorage.sepetHazirlayan && siteSettings.magazaModulu.magazaStokSatis.magazaTemsilciAyar.sepetBloktaGoster) {
            /** @type {*} */
            var exam = JSON.parse(localStorage.sepetHazirlayan);
            /** @type {number} */
            var val = exam.puan > 0 ? exam.puan / exam.puanVerenSayisi : 0;
            /** @type {string} */
            var miss_badge = "<div class='hazirlayanMesaj'>" + siteSettings.magazaModulu.magazaStokSatis.magazaTemsilciAyar.sepetMesaj.replace("{ISIM}", exam.isim).replace("{SOYISIM}", exam.soyisim) + "</div>";
            /** @type {string} */
            miss_badge = miss_badge + ("<div class='hazirlayanKisi'><div class='hazirlayanIsim'>" + exam.isim + " " + exam.soyisim + "</div>");
            /** @type {string} */
            miss_badge = miss_badge + ("<div class='hazirlayanMagaza'>" + exam.magaza + "</div>");
            /** @type {string} */
            miss_badge = miss_badge + ("<div class='hazirlayanPuan'>" + exam.puan + "</div>");
            /** @type {string} */
            miss_badge = miss_badge + ("<div class='hazirlayanResim'><img src='" + exam.resim + "'/></div></div>");
            $("#sepetBlokHazirlayanBilgisi").html(miss_badge);
            $("#sepetBlokHazirlayanBilgisi .hazirlayanPuan").rateYo({
              rating : val,
              readOnly : true,
              starWidth : "20px"
            });
            $("#sepetBlokHazirlayanBilgisi").show();
          }
        }
      }
      if (typeof sepetBindRefresh != "undefined") {
        sepetBindRefresh(data);
      }
      if (typeof cartCallBack != "undefined") {
        cartCallBack(data);
      }
      if (typeof updateInsiderCart != "undefined") {
        updateInsiderCart(data);
      }
      if (typeof module != "undefined") {
        $donutData = data.cart.products.filter(function(data) {
          return data.vId === module.UrunId;
        })[0];
        remarketingAddToCart($donutData);
      }
      InitInCart();
      if (siteSettings.personaClickAktif && typeof personaclick != "undefined") {
        personaclick("track", "cart", data.cart.products.map(function(data) {
          return {
            id : data.pId,
            amount : data.piece
          };
        }));
        if (globalModel.member != null && globalModel.member.memberId > 0) {
          firstNames = globalModel.member.memberName.split(" ");
          opts = {
            id : globalModel.member.memberId,
            email : globalModel.member.memberEMail,
            first_name : firstNames[0],
            last_name : firstNames.length > 1 ? firstNames[1] : "",
            phone : globalModel.member.memberGSMPhone
          };
          if (globalModel.member.memberGender == 1) {
            /** @type {string} */
            opts.gender = "m";
          } else {
            if (globalModel.member.memberGender == 0) {
              /** @type {string} */
              opts.gender = "f";
            }
          }
          personaclick("profile", "set", opts);
        }
      }
      if (typeof productDetailModel != "undefined" && productDetailModel.productVariantData == null) {
        kampanyaHesapla(productDetailModel.productId, productDetailModel.mainVariantId, productDetailModel.productPriceKDVIncluded);
      }
    };
    self = getCartLocalStorage();
    if (self !== null && (new Date(self.expiry)).addHours(1) > new Date && self.language === globalModel.languageCode && self.currency === globalModel.currency) {
      init(self.cart);
    } else {
      ticimaxApi.cart.getLite(null, function(cfiParser) {
        addCartLocalStorage(cfiParser);
        init(cfiParser);
      });
    }
  }
}
/**
 * @param {!Object} data
 * @return {undefined}
 */
function remarketingAddToCart(data) {
  if (typeof ga == "function") {
    ga("ec:addProduct", {
      id : data.pId,
      name : data.name,
      price : data.priceValue,
      quantity : data.piece
    });
    ga("ec:setAction", "add");
    ga("send", "event", "UX", "click", "sepete ekleme");
  }
}
/**
 * @param {number} cond
 * @param {number} t
 * @param {number} i
 * @param {number} id
 * @param {number} deps
 * @param {string} d
 * @param {boolean} e
 * @param {!Object} result
 * @param {string} type
 * @param {boolean} h
 * @param {boolean} c
 * @param {number} s
 * @param {string} addr
 * @param {string} normalized
 * @return {undefined}
 */
function sepeteEkle(cond, t, i, id, deps, d, e, result, type, h, c, s, addr, normalized) {
  if (AddToCartParams.ProductId = s, AddToCartParams.VariantId = parseInt(cond), AddToCartParams.Piece = parseInt(t), AddToCartParams.CampaignId = i, AddToCartParams.CampaignConnectedProductId = id, AddToCartParams.AssortmentProductId = deps, AddToCartParams.SpecialNote = d, AddToCartParams.OpenCart = e, AddToCartParams.SuccessCallBack = result, AddToCartParams.FormId = type, AddToCartParams.Notify = h, AddToCartParams.PopupClose = c, AddToCartParams.IsSuite = addr, AddToCartParams.IsCombine = normalized, 
  siteSettings.magazaModulu.magazaStokSatis.aktif) {
    if (magazaBolgeSecimi == null) {
      showMagazaAyarPopup();
      return;
    }
    if (siteSettings.magazaModulu.magazaStokSatis.magazaTemsilciAyar.aktif && !localStorage.sepetHazirlayan) {
      ticimaxApi.cart.getShopAgent(null, function(ignores) {
        if (ignores.id > 0) {
          /** @type {string} */
          localStorage.sepetHazirlayan = JSON.stringify(ignores);
        }
      });
    }
  }
  if (!siteSettings.tamamlayiciUrunAktif || deps > 0 && cond === 0) {
    sepeteEkleSubFunc(cond, t, i, id, deps, d, e, result, type, h, c, s, addr, normalized);
  } else {
    /** @type {!Array} */
    var newNodeLists = [];
    if (addr) {
      newNodeLists = window.Suite.Model.suite.products.filter(function(sender) {
        return sender.isSelected === true;
      }).map(function(line) {
        return {
          VariantId : line.variantId,
          Quantity : line.quantity
        };
      });
    } else {
      if (normalized) {
        newNodeLists = window.ProductCombine.ProductsToAdd.map(function(item) {
          return {
            VariantId : item.VariantId,
            Quantity : item.Quantity
          };
        });
      } else {
        newNodeLists.push({
          VariantId : parseInt(cond),
          Quantity : t
        });
      }
    }
    $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Urun/TamamlayiciUrunler.html", function(script) {
      ticimaxApi.cart.controlProductIntegral({
        Variants : newNodeLists
      }, function(Model) {
        if (window.Integral.Model = Model, Model.integrals.length <= 0) {
          sepeteEkleSubFunc(cond, t, i, id, deps, d, e, result, type, h, c, s, addr, normalized);
        } else {
          var require = Handlebars.compile(script);
          var model = require(Model);
          $.fancybox.open(model, {
            width : "500px",
            autoHeight : true,
            autoWidth : true,
            beforeShow : function() {
              $("body").css({
                "overflow-y" : "hidden"
              });
            },
            afterClose : function() {
              $("body").css({
                "overflow-y" : "visible"
              });
            }
          });
        }
      });
    });
  }
}
/**
 * @param {number} c
 * @param {number} f
 * @param {number} i
 * @param {number} t
 * @param {number} a
 * @param {string} item
 * @param {string} fn
 * @param {!Object} type
 * @param {string} name
 * @param {boolean} d
 * @param {?} e
 * @param {number} b
 * @param {string} v
 * @param {string} val
 * @return {undefined}
 */
function sepeteEkleSubFunc(c, f, i, t, a, item, fn, type, name, d, e, b, v, val) {
  var accDx;
  var entrytwo;
  var newNodeLists;
  var data;
  var i;
  if (d = typeof d == "undefined" ? true : d, e = typeof e == "undefined" ? false : e, name = typeof name != "undefined" ? name : 0, b = typeof b != "undefined" ? b : 0, accDx = document.getElementById("fuUrunSiparisDosya") != null ? document.getElementById("fuUrunSiparisDosya").files.length > 0 || false : false, a > 0 && c == 0) {
    entrytwo = {
      AsortiUrunKartId : a,
      KampanyaId : i,
      BagliUrunId : t,
      UrunKartId : b,
      UrunId : c,
      Adet : f,
      UrunNot : item,
      FormId : name
    };
    ticimaxApi.cart.add(entrytwo, function(tilesPerTexture) {
      clearCartLocalStorage();
      sepetEklemeCevap(tilesPerTexture, accDx, fn, type, d, e, c);
    });
  } else {
    if (v || val) {
      /** @type {!Array} */
      newNodeLists = [];
      /** @type {!Array} */
      data = [];
      data = v ? window.Suite.Model.suite.products.filter(function(sender) {
        return sender.isSelected === true;
      }) : window.ProductCombine.ProductsToAdd.map(function(product) {
        return {
          variantId : product.VariantId,
          quantity : product.Quantity
        };
      });
      /** @type {number} */
      i = 0;
      for (; i < data.length; i++) {
        newNodeLists.push({
          AsortiUrunKartId : 0,
          KampanyaId : 0,
          UrunKartId : b,
          UrunId : data[i].variantId,
          BagliUrunId : 0,
          Adet : data[i].quantity,
          UrunNot : item,
          FormId : ""
        });
      }
      ticimaxApi.cart.addToCartProducts({
        CartProducts : newNodeLists
      }, function(example) {
        clearCartLocalStorage();
        if (example.isError) {
          TiciNoty.Show({
            message : "Sepete eklenemeyen \u00fcr\u00fcnleriniz </br>" + example.errorMessage,
            type : "info"
          });
          refreshSepet();
        } else {
          sepetYonlendirme(d, fn, e);
          TiciNoty.Show({
            message : translateIt("GlobalMasterPage_UyariSepeteEklendi"),
            type : "info"
          });
          refreshSepet();
        }
      });
      return;
    }
    t = t == undefined ? 0 : t;
    entrytwo = {
      AsortiUrunKartId : a,
      KampanyaId : i,
      BagliUrunId : t,
      UrunKartId : b,
      UrunId : c,
      Adet : f,
      UrunNot : item,
      FormId : name
    };
    ticimaxApi.cart.addV2(entrytwo, function(trigger) {
      clearCartLocalStorage();
      if (typeof sepeteEkleUrunluUyariAktif != "undefined") {
        UrunluUyari(c, f, i, t, a, item, fn, type, name, d, e, b, v, val, trigger);
      } else {
        sepetEklemeCevap(trigger.errorCode, accDx, fn, type, d, e, c, b, f);
      }
      if (typeof productDetailModel != "undefined") {
        /** @type {boolean} */
        otomatikSepeteEkle = false;
      }
    });
  }
}
/**
 * @param {number} t
 * @param {number} n
 * @param {number} c
 * @param {number} result
 * @param {number} instance
 * @param {string} track
 * @param {string} container
 * @param {!Object} enumType
 * @param {string} value
 * @param {boolean} units
 * @param {?} width
 * @param {number} right
 * @param {string} height
 * @param {string} pos
 * @param {!Object} action
 * @return {undefined}
 */
function UrunluUyari(t, n, c, result, instance, track, container, enumType, value, units, width, right, height, pos, action) {
  $.ajax({
    type : "GET",
    url : siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "Sepet/Ekle/UrunluUyari.html",
    success : function(FeedbackTemplate) {
      refreshSepet({
        UrunKartiId : parseInt(right),
        UrunId : parseInt(t),
        Adet : parseFloat(n)
      });
      action.cart.products = action.cart.products.filter(function(edititem) {
        return edititem.variantId == t;
      });
      var results = createProductFilterModel();
      /** @type {number} */
      results.filter.RelatedProductId = right;
      ticimaxApi.product.getProductList({
        FilterJson : JSON.stringify(results.filter),
        PagingJson : JSON.stringify(results.paging),
        CreateFilter : false
      }, function(bestbuyBody) {
        var transaction = {
          cart : action.cart,
          relatedProducts : bestbuyBody.products
        };
        var query = Handlebars.compile(FeedbackTemplate)(transaction);
        createModal({
          id : "sepetEkleModal",
          className : "",
          content : query,
          width : ""
        });
        $(".divAltUrunlerList.owl-carousel").owlCarousel({
          loop : false,
          margin : 10,
          nav : false,
          autoplay : false,
          responsive : {
            0 : {
              items : 2
            },
            768 : {
              items : 3
            }
          }
        });
        setTimeout(function() {
          $("#sepetEkleModal").addClass("transForm");
        }, 100);
      });
    }
  });
}
/**
 * @param {string} n
 * @param {?} acc
 * @param {string} elem
 * @param {!Object} c
 * @param {boolean} f
 * @param {?} m
 * @param {number} v
 * @param {number} w
 * @param {number} d
 * @return {?}
 */
function sepetEklemeCevap(n, acc, elem, c, f, m, v, w, d) {
  var fm;
  var q;
  var e;
  var r;
  var item;
  var maxString;
  var dbName;
  var operator;
  if (n.length === 0) {
    if (c) {
      c();
      return;
    }
    return (fm = true, $(window).width() < 641 && siteSettings.mobildeSepeteGitAktif ? fm = false : $(window).width() > 641 && siteSettings.sepeteEkleSepeteYonlendir ? fm = false : siteSettings.urunSepetAtPopup && $(window).width() > 641 && (fm = false), fm && f && TiciNoty.Show({
      message : translateIt("GlobalMasterPage_UyariSepeteEklendi"),
      type : "success",
      autoclose : false,
      cancelButtonText : translateIt("Sepet_AlisveriseDevamEt"),
      confirmButtonText : translateIt("Sepet_AlisverisiTamamla"),
      customDialogClass : "dialogSiparis"
    }, function() {
      /** @type {string} */
      location.href = "/Sepetim";
    }), typeof AddToCartCallback != "undefined" && AddToCartCallback(), refreshSepet({
      UrunKartiId : parseInt(w),
      UrunId : parseInt(v),
      Adet : parseFloat(d)
    }), acc) ? (uploadCartFiles(v), false) : (sepetYonlendirme(f, elem, m), true);
  }
  return n == "stok-hata" ? TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariStokYok"),
    type : "danger"
  }) : n.indexOf("min-adet") > -1 ? (q = n.split("|")[1], r = n.split("|")[2], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariMinAlim").replace("{0}", q).replace("{1}", r),
    type : "danger"
  })) : n.indexOf("max-adet") > -1 ? (e = n.split("|")[1], r = n.split("|")[2], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariMaksAlim").replace("{0}", e).replace("{1}", r),
    type : "danger"
  })) : n.indexOf("yetersiz-sepet-tutari") > -1 ? (item = n.split("|")[1], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariMinSepetTutari").replace("{0}", item),
    type : "danger"
  })) : n.indexOf("max-urunkampanya-adedi") > -1 ? (maxString = n.split("|")[1], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariMaksUrunAdedi").replace("{0}", maxString),
    type : "danger"
  })) : n.indexOf("max-kampanyaliurun-adedi") > -1 ? (dbName = n.split("|")[1], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariMaksKampanyaUrunAdedi").replace("{0}", dbName),
    type : "danger"
  })) : n.indexOf("kademe-hata") > -1 ? (operator = n.split("|")[1], TiciNoty.Show({
    message : translateIt("GlobalMasterPage_UyariArtisKademesi").replace("{0}", operator),
    type : "danger"
  })) : n.indexOf("urun-limit-hata") > -1 && TiciNoty.Show({
    message : translateIt("Sepet_UrunUyariLimiti").replace("{0}", siteSettings.sepetAyarlari.sepetUrunLimit),
    type : "danger",
    closetime : 5E3
  }), false;
}
/**
 * @param {number} key
 * @return {undefined}
 */
function uploadCartFiles(key) {
  /** @type {!FormData} */
  var fd = new FormData;
  var files;
  var i;
  var xhr;
  fd.append("VariantId", key);
  files = document.getElementById("fuUrunSiparisDosya").files;
  /** @type {number} */
  i = 0;
  for (; i < files.length; i++) {
    fd.append("Image" + i, files[i]);
  }
  /** @type {!XMLHttpRequest} */
  xhr = new XMLHttpRequest;
  xhr.addEventListener("load", function() {
    if (siteSettings.urunSepetAtPopup) {
      openSepetPopup();
    }
  });
  xhr.open("POST", "/api/cart/SaveCartProductFile");
  xhr.send(fd);
}
/**
 * @param {string} feature
 * @param {string} elem
 * @param {?} className
 * @return {undefined}
 */
function sepetYonlendirme(feature, elem, className) {
  if (feature) {
    sepetEkleConfig.onAfterSepetEkle();
  }
  if ($(window).width() < 641 && siteSettings.mobildeSepeteGitAktif && ($(window).width() < 641 ? true : !siteSettings.urunSepetAtPopup)) {
    setTimeout(function() {
      /** @type {string} */
      window.location.href = "/Sepetim";
    }, 1E3);
  } else {
    if ($(window).width() > 641 && siteSettings.sepeteEkleSepeteYonlendir && !siteSettings.urunSepetAtPopup) {
      setTimeout(function() {
        /** @type {string} */
        window.location.href = "/Sepetim";
      }, 1E3);
    } else {
      if (siteSettings.urunSepetAtPopup && sepetEkleConfig.openPopup && feature && elem) {
        openSepetPopup();
      }
    }
  }
  if (className) {
    $.fancybox.close();
  }
}
/**
 * @param {?} loopNode
 * @param {?} variableNode
 * @param {?} i
 * @param {boolean} value
 * @return {undefined}
 */
function sepettenCikar(loopNode, variableNode, i, value) {
  if (siteSettings.tamamlayiciUrunAktif && i) {
    TiciNoty.Show({
      message : translateIt("Global_TamamlayiciUrunSepeteGit"),
      type : "warning",
      autoclose : false,
      cancelButtonText : translateIt("Global_Tamam"),
      confirmButtonText : translateIt("BlokModul_SepetBlok_Sepetim")
    }, function() {
      /** @type {string} */
      location.href = "/Sepetim";
    });
  } else {
    ticimaxApi.cart.remove({
      ProductId : loopNode,
      CampaignId : variableNode
    }, function() {
      if (typeof value == "undefined" || value) {
        generateNotify(translateIt("GlobalMasterPage_UyariSepettenCikarildi"), "information");
      }
      clearCartLocalStorage();
      refreshSepet();
      if (typeof liteCartActive != "undefined") {
        bindLiteCart();
      }
    });
  }
}
/**
 * @param {?} recordsOrIds
 * @param {?} state
 * @param {boolean} force
 * @return {undefined}
 */
function sepettenCikarV2(recordsOrIds, state, force) {
  ticimaxApi.cart.remove({
    ProductId : recordsOrIds,
    CampaignId : state
  }, function() {
    if (typeof force == "undefined" || force) {
      generateNotify(translateIt("GlobalMasterPage_UyariSepettenCikarildi"), "information");
    }
    clearCartLocalStorage();
    refreshSepet();
    bindLiteCart();
  });
}
/**
 * @return {undefined}
 */
function openSepetPopup() {
  var n = $(parent.window).width();
  if (n > 640) {
    top.$.fancybox.open({
      width : 1E3,
      padding : 10,
      href : "/SepetimPopup.aspx",
      type : "iframe",
      wrapCSS : "SepetPopupWrap"
    });
  }
}
/**
 * @param {string} messageText
 * @param {string} type
 * @return {undefined}
 */
function generateNotify(messageText, type) {
  TiciNoty.Show({
    message : messageText,
    type : type
  });
}
/**
 * @param {!Object} n
 * @return {undefined}
 */
function closeNotify(n) {
  setTimeout(function() {
    $.noty.close(n.options.id);
  }, 2E3);
}
/**
 * @param {number} result
 * @param {number} def
 * @param {string} format
 * @param {number} a
 * @param {number} b
 * @param {!Node} tag
 * @return {undefined}
 */
function productFavoritesProcess(result, def, format, a, b, tag) {
  var e;
  var GET_AUTH_URL_TIMEOUT;
  var hash;
  var artistTrack;
  if (result === -1 && (result = parseInt(tag.getAttribute("data-action"))), !globalModel.isAuthenticated) {
    if (siteSettings.uyeGirisPopupAktif) {
      GirisKontrol(0);
    } else {
      /** @type {string} */
      window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
    }
    return;
  }
  if (result === 0) {
    /** @type {number} */
    e = parseInt(a) || 0;
    GET_AUTH_URL_TIMEOUT = {
      GroupId : -1,
      FavoriteProductId : -1,
      ProductId : format,
      VariantId : e
    };
    ticimaxApi.member.removeFavoriteGroupProduct(GET_AUTH_URL_TIMEOUT, function(item) {
      UpdateFavoriler();
      if (def === 2) {
        callBackAddUrunListeFavori(format, a, result);
      }
      if (typeof favoriUyariAktif == "undefined" ? true : favoriUyariAktif) {
        TiciNoty.Show({
          message : translateIt("GlobalMasterPage_UyariFavoriCikarildi"),
          type : "warning"
        });
      }
      if (typeof visiLab != "undefined") {
        visiLab = new Visilabs;
        visiLab.AddParameter("OM.pf", a);
        visiLab.AddParameter("OM.pfu", "-1");
        visiLab.AddParameter("OM.pfr", item ? parseFloat(item.salePrice).toFixed(2) : 0);
        visiLab.Collect();
      }
      if (siteSettings.personaClickAktif) {
        personaclick("track", "remove_wish", format);
      }
    });
  } else {
    if (siteSettings.siteYonetimAyar.urunFavoriListeAktif) {
      /** @type {string} */
      hash = "?productId=" + format + "&variantId=" + a + "&sourceType=" + def + "&piece=" + b;
      $.fancybox({
        href : siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Urun/UrunFavori.html" + hash,
        type : "iframe",
        fitToView : false,
        width : "320",
        openEffect : "none",
        closeEffect : "none",
        iframe : {
          scrolling : "auto",
          preload : true
        }
      });
    } else {
      artistTrack = {
        GroupId : -1,
        ProductId : format,
        VariantId : a,
        Quantity : b
      };
      ticimaxApi.member.addFavoriteProduct(artistTrack, function(item) {
        UpdateFavoriler();
        TiciDonusumKodlari.FacebookFavori(format, item ? parseFloat(item.salePrice).toFixed(2) : 0);
        if (def === 1) {
          callbackFavoriGrupUrun(1);
        } else {
          if (def === 2) {
            callBackAddUrunListeFavori(format, a, result);
          }
        }
        if (typeof visiLab != "undefined") {
          visiLab = new Visilabs;
          visiLab.AddParameter("OM.pf", a);
          visiLab.AddParameter("OM.pfu", "1");
          visiLab.AddParameter("OM.pfr", item ? parseFloat(item.salePrice).toFixed(2) : 0);
          visiLab.Collect();
        }
        if (siteSettings.personaClickAktif) {
          personaclick("track", "wish", format);
        }
      });
    }
  }
}
/**
 * @param {string} fn
 * @param {number} t
 * @param {number} arr1
 * @return {undefined}
 */
function callBackAddUrunListeFavori(fn, t, arr1) {
  var $target = $(".favoriContent-" + fn + "-" + t).find("a.favoriteslist");
  if (arr1) {
    $target.attr("data-action", 0);
    $target.removeClass("listfavoriPasif");
    $target.addClass("listfavoriAktif");
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.attr("title", translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.html(translateIt("Favorilerim_FavorilerdenKaldir"));
  } else {
    $target.attr("data-action", 1);
    $target.removeClass("listfavoriAktif");
    $target.addClass("listfavoriPasif");
    $target.attr("title", translateIt("Favorilerim_FavorilerimeEkle"));
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerimeEkle"));
    $target.html(translateIt("Favorilerim_FavorilerimeEkle"));
  }
  if (arr1 === 1 && (typeof favoriUyariAktif == "undefined" ? true : favoriUyariAktif)) {
    TiciNoty.Show({
      message : translateIt("GlobalMasterPage_UyariFavoriEklendi"),
      type : "info"
    });
  }
  if (typeof FavoriIslemCallback != "undefined") {
    FavoriIslemCallback();
  }
}
/**
 * @param {string} txtNameId
 * @return {?}
 */
function GetControlValue(txtNameId) {
  return $(txtNameId).val();
}
/**
 * @param {?} $field
 * @return {?}
 */
function validatePhone($field) {
  return $field.intlTelInput("isValidNumber");
}
/**
 * @return {undefined}
 */
function closeCerezUyarisi() {
  localStorage.setItem("CerezUyariGosterildi", true);
  $("#cerekKullanimUyari").hide();
}
/**
 * @return {undefined}
 */
function productlistChangeImage() {
  $(".productSliderImage").on("mousemove", function(event) {
    var o = this;
    var jField = $(event.currentTarget);
    var size = $(event.currentTarget).width();
    var n = jField.closest(".productItem").find(".owl-item").not(".cloned").length;
    /** @type {number} */
    var ms = event.pageX - $(event.currentTarget).offset().left;
    /** @type {number} */
    var s = size / n;
    /** @type {number} */
    var index = Math.floor(ms / s);
    /** @type {number} */
    index = index < 0 ? 0 : index;
    jField.closest(".productItem").find(".owl-dot").eq(index).click();
  });
}
/**
 * @return {undefined}
 */
function readySmartBanner() {
  /** @type {!Element} */
  var script = document.createElement("script");
  /** @type {string} */
  script.type = "text/javascript";
  /** @type {string} */
  script.src = "/Scripts/jquery/jquery.smartbanner/jquery.smartbanner.js";
  /**
   * @return {undefined}
   */
  script.onload = function() {
    $.smartbanner({
      icon : siteSettings.mobilUygulamaBilgileri.bannerLogo + "?v=1",
      title : siteSettings.mobilUygulamaBilgileri.uygulamaBaslik,
      author : siteSettings.mobilUygulamaBilgileri.author
    });
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * @return {undefined}
 */
function magazaStokSatisSayfadaGoster() {
  $("body").on("click", ".teslimatSaatiRow .teslimatSaatiCol", function() {
    var n = $(".teslimatSaatiRow .teslimatSaatiCol").index(this);
    $(".teslimatSaatiTabRow .satirTab").hide();
    $(".teslimatSaatiRow .teslimatSaatiCol").removeClass("active");
    $(this).addClass("active");
    $(".teslimatSaatiTabRow .satirTab:eq(" + n + ")").show();
  });
}
/**
 * @param {!Event} event
 * @return {?}
 */
function ProductSeachTopOnKeyPress(event) {
  if (event.keyCode === 13) {
    return OnSearchTopProduct(), false;
  }
}
/**
 * @return {?}
 */
function ProductSearchTop() {
  return OnSearchTopProduct(), false;
}
/**
 * @param {!Node} $modal
 * @return {undefined}
 */
function OnSelectTopProductItem($modal) {
  window.location.href = $modal.getAttribute("data-url");
}
/**
 * @return {undefined}
 */
function prepareMemberControl() {
  var b;
  var peers;
  var data;
  if (siteSettings.uyeAyar.uyelikSistemiAktif) {
    b = {
      googleLoginActive : siteSettings.googleLoginAktif,
      facebookLoginActive : siteSettings.facebookLoginAktif,
      twitterLoginAktif : siteSettings.twitterLoginAktif,
      memberName : globalModel.member.memberName,
      IsAuthenticated : globalModel.isAuthenticated
    };
    /** @type {(Element|null)} */
    peers = document.getElementById("divMemberWelcomeContent");
    if (peers) {
      data = window.ticimaxStorage.getToJson("ticimax-headerMemberContent");
      if (data !== null && (new Date(data.expiry)).addHours(1) > new Date && data.version == globalModel.version) {
        peers.innerHTML = Handlebars.compile(data.data)(b);
      } else {
        $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Uye/HeaderUyeAlan.html", function(a) {
          peers.innerHTML = Handlebars.compile(a)(b);
          window.ticimaxStorage.add("ticimax-headerMemberContent", JSON.stringify({
            data : a,
            expiry : new Date,
            version : globalModel.version
          }));
        });
      }
    }
    if (siteSettings.mobilSiteActive) {
      $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Uye/MobilUygulamaMenu.html", function(a) {
        $(Handlebars.compile(a)(b)).insertAfter("#divTopProductSearch");
      });
    }
  }
}
/**
 * @return {undefined}
 */
function bildirimRed() {
  $(".bildirimIzin").slideUp("slow");
  var n = TiciCookie.getObj("ticiPushNotification") || {};
  /** @type {boolean} */
  n.chromePush = false;
  TiciCookie.setObj("ticiPushNotification", n, 365);
}
/**
 * @return {undefined}
 */
function bildirimKabul() {
  var dir;
  var t;
  var _ddoc;
  $(".bildirimIzin").slideUp("slow");
  dir = TiciCookie.getObj("ticiPushNotification") || null;
  if (isChrome && (!dir || dir === null)) {
    /** @type {number} */
    t = screen.width / 2 - 200;
    /** @type {number} */
    _ddoc = screen.height / 2 - 200;
    window.open("https://" + window.location.hostname + "/BildirimIzin.aspx", "", "width=400, height=400, left=" + t + ", top= " + _ddoc + "");
  }
}
/**
 * @return {undefined}
 */
function AdminPopupControl() {
  var localStorageObject = createTeklifCookie();
  /** @type {!Date} */
  var semiannualPing = new Date(localStorageObject.ilkZiyaret);
  /** @type {number} */
  var i = Math.round(((new Date).getTime() - semiannualPing.getTime()) / 1E3);
  /** @type {number} */
  var r = Math.round(((new Date).getTime() - sayfayiIlkZiyaret.getTime()) / 1E3);
  var resp = {
    YonlendirenUrl : globalModel.urlReferrer,
    Url : window.location.pathname + window.location.search,
    SitedeGecirdigiSaniye : i,
    SayfadaGecirdigiSaniye : r
  };
  popupKontrolleri(resp);
}
/**
 * @param {!Object} data
 * @return {undefined}
 */
function popupKontrolleri(data) {
  /**
   * @param {!Array} e
   * @return {?}
   */
  function success(e) {
    if (window.popupControlResponse = e, !e && window.popupControlResponse) {
      e = window.popupControlResponse;
    } else {
      if (!e && window.popupControlResponse) {
        return false;
      }
    }
    /** @type {!Array} */
    var ext = e;
    ext = ext.filter(function(cur) {
      return cur.YonlendirenUrl === "" ? true : cur.YonlendirenUrl === data.YonlendirenUrl;
    });
    ext = ext.filter(function(target) {
      return target.Url === data.Url;
    });
    ext = ext.filter(function(value) {
      return value.SitedeGecirdigiSaniye <= data.SitedeGecirdigiSaniye;
    });
    ext = ext.filter(function(value) {
      return value.SayfadaGecirdigiSaniye <= data.SayfadaGecirdigiSaniye;
    });
    ext = ext.filter(function(accountInformation) {
      return (new Date(accountInformation.BaslangicTarihi)).getTime() < (new Date).getTime() && (new Date(accountInformation.BitisTarihi)).getTime() > (new Date).getTime();
    });
    popupKontrolSayisi++;
    if (ext.length > 0) {
      buSayfaPopup = ext[0];
      AdminPopupControlContent();
    } else {
      if (popupKontrolSayisi < teklifSorgulamaSiniri) {
        setTimeout(AdminPopupControl, popupKontrolTimer);
      }
    }
  }
  if (window.popupControlResponse) {
    success(window.popupControlResponse);
  } else {
    $.getJSON("/Uploads/popupTeklifler.json", {
      _ : (new Date).getTime()
    }, function(lang) {
      success(lang);
    });
  }
}
/**
 * @return {undefined}
 */
function AdminPopupControlContent() {
  if (buSayfaPopup !== null) {
    var n = createPopUpCookie(buSayfaPopup.ID);
    if (n) {
      $("#divAdminPopupText").html(buSayfaPopup.Icerik);
      $.fancybox($("#divAdminPopupContent").html());
    } else {
      if (popupKontrolSayisi < teklifSorgulamaSiniri) {
        setTimeout(AdminPopupControl, popupKontrolTimer);
      }
    }
  }
}
/**
 * @param {?} e
 * @return {?}
 */
function createPopUpCookie(e) {
  /** @type {boolean} */
  var o = true;
  var fibEntry = {
    GosterilenPopUp : []
  };
  return TiciCookie.getObj("popupGosterim") !== null ? (fibEntry = TiciCookie.getObj("popupGosterim"), fibEntry.GosterilenPopUp.indexOf(e) < 0 ? (fibEntry.GosterilenPopUp.push(e), o = true) : o = false) : fibEntry.GosterilenPopUp.push(e), TiciCookie.setObj("popupGosterim", fibEntry, 365), o;
}
/**
 * @param {number} first
 * @return {undefined}
 */
function kampanyaTeklifleri(first) {
  first = first || 0;
  var localStorageObject = createTeklifCookie();
  /** @type {!Date} */
  var semiannualPing = new Date(localStorageObject.ilkZiyaret);
  /** @type {number} */
  var r = Math.round(((new Date).getTime() - semiannualPing.getTime()) / 1E3);
  /** @type {number} */
  var u = Math.round(((new Date).getTime() - sayfayiIlkZiyaret.getTime()) / 1E3);
  var resp = {
    YonlendirenUrl : globalModel.urlReferrer,
    Url : window.location.pathname,
    Kategori : null,
    SitedeGecirdigiSaniye : r,
    SayfadaGecirdigiSaniye : u,
    UrunId : null,
    IlgilenmedigimTeklifler : localStorageObject.ilgilenmedigimTeklifler,
    IlgilendigimTeklifler : localStorageObject.ilgilendigimTeklifler,
    AtananTeklifler : localStorageObject.atananTeklifler,
    CikisScript : first
  };
  teklifleriKontrolEt(resp);
}
/**
 * @param {!Object} data
 * @return {undefined}
 */
function teklifleriKontrolEt(data) {
  $.getJSON("/Uploads/kampanyaTeklifler.json", {
    _ : (new Date).getTime()
  }, function(cind) {
    /** @type {!Array} */
    var i = cind;
    i = i.filter(function(cur) {
      return cur.YonlendirenUrl === "" ? true : cur.YonlendirenUrl === data.YonlendirenUrl;
    });
    i = i.filter(function(target) {
      return target.Url === data.Url;
    });
    i = i.filter(function(previousData) {
      return previousData.CikisScriptAktif === data.CikisScript;
    });
    if (data.CikisScript !== 1) {
      i = i.filter(function(value) {
        return value.SitedeGecirdigiSaniye <= data.SitedeGecirdigiSaniye;
      });
      i = i.filter(function(value) {
        return value.SayfadaGecirdigiSaniye <= data.SayfadaGecirdigiSaniye;
      });
    }
    i = i.filter(function(accountInformation) {
      return (new Date(accountInformation.BaslangicTarihi)).getTime() < (new Date).getTime() && (new Date(accountInformation.BitisTarihi)).getTime() > (new Date).getTime();
    });
    i = i.filter(function(eventArgs) {
      return data.IlgilendigimTeklifler.indexOf(eventArgs.ID) < 0 && data.IlgilenmedigimTeklifler.indexOf(eventArgs.ID) < 0 && data.AtananTeklifler.indexOf(eventArgs.ID) < 0;
    });
    teklifKontrolSayisi++;
    if (i.length > 0) {
      mevcutTeklif = i[0];
      teklifPopupGoster();
    } else {
      if (teklifKontrolSayisi < teklifSorgulamaSiniri) {
        setTimeout(kampanyaTeklifleri, teklifKontrolTimer);
      }
    }
  });
}
/**
 * @return {undefined}
 */
function teklifPopupGoster() {
  if (mevcutTeklif != null) {
    $("#divKampanyaTeklifText").html(mevcutTeklif.Icerik);
    $.fancybox($("#divKampanyaTeklifContent").html());
  }
}
/**
 * @return {undefined}
 */
function teklifPopupKapat() {
  $("#divKampanyaTeklifText").html("");
  $("#divKampanyaTeklifContent").hide();
  /** @type {null} */
  mevcutTeklif = null;
  $.fancybox.close();
}
/**
 * @return {undefined}
 */
function teklifKabul() {
  if (mevcutTeklif != null) {
    ticimaxApi.campaign.acceptOffer({
      OfferId : mevcutTeklif.ID
    }, function(n) {
      if (n.kampanyaOlusturuldu) {
        kampanyaTeklifiAtandi(n.teklifId);
      } else {
        kampanyaTeklifiIleIlgileniyorum(n.teklifId);
      }
      teklifPopupKapat();
      setTimeout(kampanyaTeklifleri, teklifKontrolTimer);
    });
  }
}
/**
 * @return {undefined}
 */
function teklifRed() {
  if (mevcutTeklif != null) {
    kampanyaTeklifiIleIlgilenmiyorum(mevcutTeklif.ID);
    teklifPopupKapat();
    setTimeout(kampanyaTeklifleri, teklifKontrolTimer);
  }
}
/**
 * @param {?} n
 * @return {?}
 */
function createTeklifCookie(n) {
  var e = {
    ilkZiyaret : new Date,
    ilgilenmedigimTeklifler : [],
    ilgilendigimTeklifler : [],
    atananTeklifler : []
  };
  var copy;
  var r;
  return TiciCookie.getObjEncode("kampanyaTeklifleri") ? n ? e = n : (e.ilkZiyaret = new Date(TiciCookie.getObjEncode("kampanyaTeklifleri").ilkZiyaret), e.ilgilenmedigimTeklifler = TiciCookie.getObjEncode("kampanyaTeklifleri").ilgilenmedigimTeklifler ? TiciCookie.getObjEncode("kampanyaTeklifleri").ilgilenmedigimTeklifler : [], e.ilgilendigimTeklifler = TiciCookie.getObjEncode("kampanyaTeklifleri").ilgilendigimTeklifler, e.atananTeklifler = TiciCookie.getObjEncode("kampanyaTeklifleri").atananTeklifler) : 
  n && (e = n), copy = new Date, r = 120, copy.setTime(copy.getTime() + r * 6E4), TiciCookie.setObj("kampanyaTeklifleri", e, 365), TiciCookie.getObjEncode("kampanyaTeklifleri");
}
/**
 * @param {?} aircraftId
 * @return {undefined}
 */
function kampanyaTeklifiIleIlgileniyorum(aircraftId) {
  var t = TiciCookie.getObjEncode("kampanyaTeklifleri");
  if (t.ilgilendigimTeklifler.indexOf(aircraftId) < 0) {
    t.ilgilendigimTeklifler.push(aircraftId);
  }
  createTeklifCookie(t);
}
/**
 * @param {?} aircraftId
 * @return {undefined}
 */
function kampanyaTeklifiIleIlgilenmiyorum(aircraftId) {
  var t = TiciCookie.getObjEncode("kampanyaTeklifleri");
  if (t.ilgilenmedigimTeklifler.indexOf(aircraftId) < 0) {
    t.ilgilenmedigimTeklifler.push(aircraftId);
  }
  createTeklifCookie(t);
}
/**
 * @param {?} aircraftId
 * @return {undefined}
 */
function kampanyaTeklifiAtandi(aircraftId) {
  var t = TiciCookie.getObjEncode("kampanyaTeklifleri");
  if (t.atananTeklifler.indexOf(aircraftId) < 0) {
    t.atananTeklifler.push(aircraftId);
  }
  createTeklifCookie(t);
}
/**
 * @return {undefined}
 */
function clearTeklifCookie() {
  TiciCookie.remove("kampanyaTeklifleri");
}
/**
 * @return {undefined}
 */
function saveNewsletter() {
  var email = $("#txtbxNewsletterMail").val();
  if (email == "") {
    TiciNoty.Show({
      message : translateIt("Validation_MailGiriniz"),
      type : "danger"
    });
    return;
  }
  if (!validateEmail(email)) {
    TiciNoty.Show({
      message : translateIt("Validation_MailKontrolEdiniz"),
      type : "danger"
    });
    return;
  }
  ticimaxApi.member.saveNewsletter({
    Email : email
  }, function(result) {
    if (result.isError) {
      TiciNoty.Show({
        message : result.errorMessage,
        type : "warning"
      });
    } else {
      TiciNoty.Show({
        message : translateIt("BlokModul_MailListesi_BilgilerinizKaydedildi"),
        type : "success"
      });
      if (siteSettings.personaClickAktif) {
        personaclick("segment", "add", {
          email : email,
          segment_id : siteSettings.personaClickEBultenSegmentId
        });
      }
    }
  });
}
/**
 * @return {undefined}
 */
function SosyalGirisKontrol() {
  /** @type {number} */
  var type = 0;
  var auth = getQueryStringByName("app");
  var titleSuffix = getQueryStringByName("code");
  var orderedParameters = getQueryStringByName("oauth_token");
  var view = getQueryStringByName("oauth_verifier");
  if (titleSuffix) {
    /** @type {number} */
    type = auth != null && auth.indexOf("fb") > -1 ? 1 : 3;
  } else {
    if (orderedParameters) {
      /** @type {number} */
      type = 2;
    }
  }
  if (type > 0) {
    ticimaxApi.member.socialLoginResult({
      Type : type,
      LoginCode : titleSuffix,
      OauthToken : orderedParameters,
      OauthVerifier : view
    }, function(result) {
      if (result.isError) {
        TiciNoty.Show({
          message : result.errorMessage,
          type : "warning"
        });
      } else {
        /** @type {string} */
        var backTo = getCookie("socialLoginReturnUrl") ? decodeURIComponent(getCookie("socialLoginReturnUrl")) : "/";
        createCookie("socialLoginReturnUrl", "", -5);
        /** @type {string} */
        window.location.href = backTo;
      }
    });
  }
}
/**
 * @return {undefined}
 */
function GetBlockModule() {
}
/**
 * @return {undefined}
 */
function ResetSliders() {
  $(".jCarouselLite ul").each(function() {
    var n = $(this);
    var id;
    if (n.find(".owl-stage .owl-item").length > 0) {
      n.trigger("destroy.owl.carousel");
      /** @type {string} */
      id = "";
      n.find(".owl-stage .owl-item").each(function() {
        id = id + $(this).html();
      });
      n.html(id).removeClass("owl-loaded").removeClass("owl-carousel");
    }
  });
  if (typeof urunListCallback != "undefined") {
    urunListCallback();
  }
}
/**
 * @param {?} version
 * @param {?} t
 * @param {!Object} params
 * @param {?} value_in_code
 * @return {undefined}
 */
function fncLoadCategoryProducts(version, t, params, value_in_code) {
  var artistTrack;
  var detectedValue;
  var defaultProgress;
  if (siteSettings.sayfalamaSecenek == 2 || siteSettings.sayfalamaSecenek == 3 ? (filterModel.paging.PageNumber = params.currentPage, $("#ProductPageProductList").append(t(params)), $("#divUrunYok").length > 0 && $("#divUrunYok").remove(), params.currentPage != 1 && categoryListProduct.push(params)) : $("#ProductPageProductList").html(t(params)), productsModel.newTransitionOrder = params.transitionOrder, $("#scriptTemplateUrunSayfalama").length > 0) {
    if (productLoadCompleted = true, params.currentPage * params.productCountPerPage >= params.totalProductCount ? $("#divNextProduct").hide() : $(".divNextProductCount").html(params.totalProductCount - params.currentPage * params.productCountPerPage), $(".categoryOverlay").hide(), $(window).width() < 1025 && $(".mobilFilterOpenBtn").show(), artistTrack = Object.create(params.products).map(function(item) {
      return {
        productId : item.productId,
        name : item.name,
        category : item.category,
        brand : item.brand
      };
    }), urunListeEntegrasyon(artistTrack), detectedValue = params.totalProductCount, productsModel.transitionActive && $(".FiltrelemeUrunAdet span").hide(), $(".FiltrelemeUrunAdet span").html(detectedValue + " " + translateIt("GlobalMasterPage_SepetUrun")), typeof netTotalItems != "undefined" && (netTotalItems = detectedValue), value_in_code && createFilterBlock(params.strProductIds), defaultProgress = params.productCountPerPage, detectedValue > 0) {
      ProductPager = GetPager(detectedValue, filterModel.paging.PageNumber, defaultProgress);
      var source_passwords = $("#scriptTemplateUrunSayfalama").html();
      var quizTemplate = Handlebars.compile(source_passwords);
      /** @type {string} */
      var questionWrapper = siteSettings.sayfalamaSecenek == 3 ? "#divSayfalamaAlt .pageNumber" : ".pageNumber";
      $(questionWrapper).html(quizTemplate(ProductPager));
    } else {
      $(".pageNumber").html("");
    }
  }
  initProductList();
}
/**
 * @return {undefined}
 */
function getProducts() {
  var level = $("#scriptTemplateUrunListesi").html();
  var newp = Handlebars.compile(level);
  var old_value = productsModel.filterSettings != null ? productsModel.filterSettings.filtreyiYenidenOlusturAktif : false;
  ticimaxApi.product.getProductList({
    FilterJson : JSON.stringify(filterModel.filter),
    PagingJson : JSON.stringify(filterModel.paging),
    CreateFilter : old_value,
    TransitionOrder : productsModel.transitionOrder,
    PageType : productsModel.pageType,
    PageId : productsModel.targetId
  }, function(ezfbInitParams) {
    fncLoadCategoryProducts(level, newp, ezfbInitParams, old_value);
  });
}
/**
 * @return {undefined}
 */
function InitInCart() {
  var actions;
  var a;
  var n;
  if (typeof ShowListProductInCart != "undefined") {
    /** @type {!Array} */
    actions = [];
    $(".CartProduct .SProduct li").each(function() {
      actions.push({
        productId : parseInt($(this).find("input[name='hddProductId']").val()),
        piece : parseInt($(this).find(".SepetTopAdet").text().replace("x", ""))
      });
    });
    $(".productItem").each(function() {
      var link = $(this).find(".btnAddToCart");
      var STATE_MACHINE = link.data("productid");
      var a = actions.filter(function(maybeTransformed) {
        return maybeTransformed.productId == STATE_MACHINE ? maybeTransformed : null;
      });
      var sloc;
      var i;
      if (a.length > 0) {
        /** @type {number} */
        sloc = 0;
        /** @type {number} */
        i = 0;
        for (; i < a.length; i++) {
          sloc = sloc + a[i].piece;
        }
        link.text("(" + sloc + ") " + translateIt("UrunListesi_Sepette"));
        link.addClass("in-cart");
      } else {
        link.text(translateIt("UrunListesi_SepeteEkle"));
        link.removeClass("in-cart");
      }
    });
    if ($(".ProductDetailMain").length > 0) {
      /** @type {!Array<?>} */
      a = actions.filter(function(device) {
        return device.productId == productDetailModel.productId ? device : null;
      });
      n = $(".BasketBtn .basketBtn input");
      if (a.length > 0) {
        n.val("(" + a[0].piece + ") " + translateIt("UrunListesi_Sepette"));
        n.addClass("in-cart");
      } else {
        n.val(translateIt("UrunListesi_SepeteEkle"));
        n.removeClass("in-cart");
      }
    }
  }
}
/**
 * @param {!Event} event
 * @return {undefined}
 */
function productListPrevPage(event) {
  event.preventDefault();
  if (filterModel.paging.PageNumber > 1) {
    ProductPager.setPage(filterModel.paging.PageNumber - 1);
    getProducts();
    backToTop();
    optimizeSeo(filterModel.paging.PageNumber - 1);
  }
}
/**
 * @param {!Event} event
 * @param {number} torrentGroup
 * @return {undefined}
 */
function productListSetPage(event, torrentGroup) {
  event.preventDefault();
  if (filterModel.paging.PageNumber != torrentGroup) {
    /** @type {number} */
    filterModel.paging.PageNumber = torrentGroup;
    getProducts();
    setFilterUrl(filterModel, extraFilterObject.Sortings);
    backToTop();
    optimizeSeo(torrentGroup);
  }
  saveVisitPage();
}
/**
 * @return {undefined}
 */
function saveVisitPage() {
  var n = {
    FullPath : location.href,
    PathName : location.pathname,
    Search : location.search
  };
}
/**
 * @param {!Event} event
 * @return {undefined}
 */
function productListNextPage(event) {
  event.preventDefault();
  if (filterModel.paging.PageNumber < ProductPager.totalPages) {
    ProductPager.setPage(filterModel.paging.PageNumber + 1);
    getProducts();
    backToTop();
    optimizeSeo(filterModel.paging.PageNumber);
  }
}
/**
 * @return {?}
 */
function GetProductItemClass() {
  return globalBlokModel == 1 ? siteSettings.siteYonetimAyar.globalBlokModel1.urunListe : globalBlokModel == 2 ? siteSettings.siteYonetimAyar.globalBlokModel2.urunListe : globalBlokModel == 3 ? siteSettings.siteYonetimAyar.globalBlokModel3.urunListe : globalBlokModel == 4 ? siteSettings.siteYonetimAyar.globalBlokModel4.urunListe : void 0;
}
/**
 * @param {number} s
 * @param {number} min
 * @param {!Object} value
 * @param {!Object} option
 * @param {!Object} text
 * @param {number} val
 * @param {undefined} e
 * @param {string} name
 * @param {!Object} force
 * @return {undefined}
 */
function urunListeSepeteEkle(s, min, value, option, text, val, e, name, force) {
  if (typeof value == "string") {
    /** @type {boolean} */
    value = value === "True";
  }
  if (typeof option == "string") {
    /** @type {boolean} */
    option = option === "True";
  }
  if (typeof text == "string") {
    /** @type {boolean} */
    text = text === "True";
  }
  if (typeof force == "string") {
    /** @type {boolean} */
    force = force === "True";
  }
  if (value || option || text || force) {
    /** @type {string} */
    window.location.href = name;
  } else {
    sepeteEkle(val > 0 ? 0 : min, e, 0, 0, val > 0 ? s : 0, "", true, undefined, undefined, undefined, undefined, s);
  }
}
/**
 * @param {number} n
 * @param {number} pageSize
 * @param {number} totalRows
 * @param {undefined} url
 * @param {string} u
 * @param {number} test_color
 * @return {undefined}
 */
function productListAddToCart(n, pageSize, totalRows, url, u, test_color) {
  if (test_color === 1) {
    /** @type {string} */
    window.location.href = u;
  } else {
    sepeteEkle(totalRows > 0 ? 0 : pageSize, url, 0, 0, totalRows > 0 ? n : 0, "", true, undefined, undefined, undefined, undefined, n);
  }
}
/**
 * @param {?} n
 * @param {?} froot
 * @param {number} optionalMessagesOrFilters
 * @param {string} filters
 * @return {undefined}
 */
function GetProductVariantImages(n, froot, optionalMessagesOrFilters, filters) {
  var filteredView = $(n).parents(".productItem");
  ticimaxApi.product.getProductVariantImages({
    ProductId : froot,
    VariantId : optionalMessagesOrFilters
  }, function(options) {
    if (!options.isError && options.imagePath != null) {
      filteredView.find(".resimOrginal").attr("src", options.imagePath);
      if (typeof filteredView.find(".resimOrginal").attr("data-second") != "undefined") {
        filteredView.find(".resimOrginal").attr("data-second", options.imagePath2);
      }
      var name = filteredView.find(".examineIcon a").attr("href");
      var idx = name.indexOf("?");
      var username = idx > -1 ? name.substr(0, idx) : name;
      /** @type {string} */
      var syntaxURL = username + "?eksecenekid=" + filters;
      filteredView.find(".examineIcon a").attr("href", syntaxURL);
      filteredView.find(".productImage a").attr("href", syntaxURL);
      $(n).attr("href", syntaxURL);
    }
  });
}
/**
 * @return {undefined}
 */
function InitTimers() {
  $(".productTimer[init='false']").each(function() {
    var editor = $(this);
    var stringConstructorEndTime;
    var initializeCheckTimer;
    editor.attr("init", "true");
    /** @type {!Date} */
    stringConstructorEndTime = new Date(parseInt(editor.attr("date2")));
    /** @type {number} */
    initializeCheckTimer = setInterval(function() {
      /** @type {number} */
      var candidatesWidth = stringConstructorEndTime - TicimxServerDate;
      /** @type {number} */
      var rut = Math.floor(candidatesWidth / 864E5);
      /** @type {number} */
      var eRounded = Math.floor(candidatesWidth / 36E5 % 24);
      /** @type {number} */
      var centsValue = Math.floor(candidatesWidth / 6E4 % 60);
      /** @type {number} */
      var stringToPad = Math.floor(candidatesWidth / 1E3 % 60);
      editor.find(".productTimerDay").html(("0" + rut).slice(-2));
      editor.find(".productTimerHour").html(("0" + eRounded).slice(-2));
      editor.find(".productTimerMinute").html(("0" + centsValue).slice(-2));
      editor.find(".productTimerSecond").html(("0" + stringToPad).slice(-2));
      if (candidatesWidth <= 1) {
        editor.hide();
        clearInterval(initializeCheckTimer);
      }
    }, 1E3);
  });
}
/**
 * @param {string} value
 * @param {string} key
 * @param {string} prefix
 * @return {?}
 */
function updateQueryStringParameter(value, key, prefix) {
  /** @type {!RegExp} */
  var url = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  /** @type {string} */
  var foo = value.indexOf("?") !== -1 ? "&" : "?";
  return value.match(url) ? value.replace(url, "$1" + key + "=" + prefix + "$2") : value + foo + key + "=" + prefix;
}
/**
 * @return {?}
 */
function GetVisitInfo() {
  var ws = {
    lastVisitPages : [],
    lastVisitProduct : [],
    lastVisitCustomPage : []
  };
  var data;
  try {
    data = localStorage.getItem("lastVisitInfo");
    if (data != null) {
      /** @type {*} */
      ws = JSON.parse(data);
    }
    if (ws.lastVisitPages.length <= 0) {
      ws.lastVisitPages.push("/");
    }
    if (ws.lastVisitProduct.length <= 0) {
      ws.lastVisitProduct.push("/");
    }
    if (ws.lastVisitCustomPage.length <= 0) {
      ws.lastVisitCustomPage.push("/");
    }
  } catch (i) {
    console.log("localStorage ayarlar\u0131n\u0131 d\u00fczenleyin.");
  }
  return ws;
}
/**
 * @param {string} result
 * @param {string} value
 * @param {!Object} el
 * @param {?} is_init_cache
 * @return {?}
 */
function SetVisitInfo(result, value, el, is_init_cache) {
  var state;
  var state_file_data;
  var line;
  var localPlotType;
  var id;
  var noteName;
  var week;
  var dint;
  try {
    if (is_init_cache) {
      localStorage.removeItem("lastVisitInfo");
    }
    state = {
      lastVisitPages : [],
      lastVisitProduct : [],
      lastVisitCustomPage : []
    };
    state_file_data = localStorage.getItem("lastVisitInfo");
    if (state_file_data != null) {
      /** @type {*} */
      state = JSON.parse(state_file_data);
    }
    if (result != null) {
      line = typeof result == "object" ? result.href.replace(result.origin, "") : result;
      if (state.lastVisitPages.length > 0) {
        localPlotType = state.lastVisitPages[state.lastVisitPages.length - 1];
        if (localPlotType != null && localPlotType != line) {
          state.lastVisitPages.push(line);
        }
      } else {
        state.lastVisitPages.push(line);
      }
    }
    if (value != null) {
      id = typeof value == "object" ? value.href.replace(value.origin, "") : value;
      if (state.lastVisitProduct.length > 0) {
        noteName = state.lastVisitProduct[state.lastVisitProduct.length - 1];
        if (noteName != null && noteName != id) {
          state.lastVisitProduct.push(id);
        }
      } else {
        state.lastVisitProduct.push(id);
      }
    }
    if (el != null) {
      week = typeof el == "object" ? el.href.replace(el.origin, "") : el;
      if (state.lastVisitCustomPage.length > 0) {
        dint = state.lastVisitCustomPage[state.lastVisitCustomPage.length - 1];
        if (dint != null && dint != week) {
          state.lastVisitCustomPage.push(week);
        }
      } else {
        state.lastVisitCustomPage.push(week);
      }
    }
    if (state.lastVisitPages.length > 10) {
      /** @type {!Array<?>} */
      state.lastVisitPages = state.lastVisitPages.slice(5, state.lastVisitPages.length);
    }
    if (state.lastVisitProduct.length > 10) {
      /** @type {!Array<?>} */
      state.lastVisitProduct = state.lastVisitProduct.slice(5, state.lastVisitProduct.length);
    }
    if (state.lastVisitCustomPage.length > 10) {
      /** @type {!Array<?>} */
      state.lastVisitCustomPage = state.lastVisitCustomPage.slice(5, state.lastVisitCustomPage.length);
    }
    localStorage.setItem("lastVisitInfo", JSON.stringify(state));
  } catch (a) {
    return console.log("localStorage ayarlar\u0131n\u0131 d\u00fczenleyin."), {
      lastVisitPages : [],
      lastVisitProduct : [],
      lastVisitCustomPage : []
    };
  }
}
/**
 * @param {string} element
 * @return {undefined}
 */
function showMagazaAyarPopup(element) {
  if (!siteSettings.adresAyarlari.semtAktif || siteSettings.magazaModulu.magazaStokSatis.gonderimTipi < 4) {
    $("#divMagazaBolgeSemt").hide();
  }
  if (siteSettings.magazaModulu.magazaStokSatis.gonderimTipi < 3) {
    $("#divMagazaBolgeIlce").hide();
  }
  if (siteSettings.magazaModulu.magazaStokSatis.gonderimTipi < 2) {
    $("#divMagazaBolgeSehir").hide();
  }
  if (siteSettings.magazaModulu.magazaStokSatis.adresGoster && magazaBolgeAdresleri == null && globalModel.isAuthenticated) {
    $(".divMagazaBolgeAdres").show();
    ticimaxApi.member.getMemberAddress({
      ExcludeStoreRegion : true
    }, function(adapterInfo) {
      magazaBolgeAdresleri = adapterInfo.addresses;
      getMagazaUlke(element);
    });
  } else {
    getMagazaUlke(element);
  }
}
/**
 * @param {string} val
 * @return {undefined}
 */
function getMagazaUlke(val) {
  ticimaxApi.member.getCountry(null, function(data) {
    var countries;
    var miss_badge;
    var i;
    if (!data.isError) {
      countries = data.countries;
      /** @type {string} */
      miss_badge = "<option value='0'>" + translateIt("AdresDefterim_UlkeSeciniz") + "</option>";
      /** @type {number} */
      i = 0;
      for (; i < countries.length; i++) {
        /** @type {string} */
        miss_badge = miss_badge + ("<option value='" + countries[i].countryId + "'>" + countries[i].countryName + "</option>");
      }
      $("#selectMagazaBolgeUlke").html(miss_badge);
      if (siteSettings.magazaModulu.magazaStokSatis.ulkeSecimAktif) {
        if (magazaBolgeSecimi != null) {
          $("#selectMagazaBolgeUlke").val(magazaBolgeSecimi.UlkeID);
          getMagazaSehir();
        }
      } else {
        $("#divMagazaBolgeUlke").hide();
        $("#selectMagazaBolgeUlke").val(siteSettings.ulkeId);
        getMagazaSehir();
      }
      $.fancybox.open({
        href : "#divMagazaBolge",
        padding : 10,
        wrapCSS : "MagazaBolgeSemtWrap",
        modal : val
      });
    }
  });
}
/**
 * @return {undefined}
 */
function getMagazaSehir() {
  if (siteSettings.magazaModulu.magazaStokSatis.gonderimTipi >= 2) {
    $("#divMagazaBolgeUlke").removeClass("zorunluSecimBorder");
    $("#selectMagazaBolgeSehir").html("<option value='0'>" + translateIt("AdresDefterim_SehirSeciniz") + "</option>");
    $("#selectMagazaBolgeIlce").html("<option value='0'>" + translateIt("AdresDefterim_IlceSeciniz") + "</option>");
    $("#selectMagazaBolgeSemt").html("<option value='0'>" + translateIt("AdresDefterim_SemtSeciniz") + "</option>");
    filterMemberAddress();
    /** @type {number} */
    var n = parseInt($("#selectMagazaBolgeUlke").val());
    if (n > 0) {
      ticimaxApi.member.getCity({
        CountryId : n
      }, function(_cityCategory) {
        var cityArray;
        var miss_badge;
        var i;
        if (!_cityCategory.isError) {
          cityArray = _cityCategory.cities;
          /** @type {string} */
          miss_badge = "<option value='0'>" + translateIt("AdresDefterim_SehirSeciniz") + "</option>";
          /** @type {number} */
          i = 0;
          for (; i < cityArray.length; i++) {
            /** @type {string} */
            miss_badge = miss_badge + ("<option value='" + cityArray[i].cityId + "'>" + cityArray[i].cityName + "</option>");
          }
          $("#selectMagazaBolgeSehir").html(miss_badge);
          if (siteSettings.magazaModulu.magazaStokSatis.ilSecimAktif) {
            if (magazaBolgeSecimi != null && magazaBolgeSecimi.UlkeID == n) {
              $("#selectMagazaBolgeSehir").val(magazaBolgeSecimi.SehirID);
              getMagazaIlce();
            }
          } else {
            $("#divMagazaBolgeSehir").hide();
            $("#selectMagazaBolgeSehir").val(siteSettings.sehirId);
            getMagazaIlce();
          }
        }
      });
    }
  } else {
    filterMemberAddress();
    magazaBolgeKargoKontrol();
  }
}
/**
 * @return {undefined}
 */
function getMagazaIlce() {
  if (siteSettings.magazaModulu.magazaStokSatis.gonderimTipi >= 3) {
    $("#divMagazaBolgeSehir").removeClass("zorunluSecimBorder");
    $("#selectMagazaBolgeIlce").html("<option value='0'>" + translateIt("AdresDefterim_IlceSeciniz") + "</option>");
    $("#selectMagazaBolgeSemt").html("<option value='0'>" + translateIt("AdresDefterim_SemtSeciniz") + "</option>");
    filterMemberAddress();
    /** @type {number} */
    var n = parseInt($("#selectMagazaBolgeSehir").val());
    if (n > 0) {
      ticimaxApi.member.getDistrict({
        CityId : n
      }, function(self) {
        var itemsToUpdate;
        var miss_badge;
        var i;
        if (!self.isError) {
          itemsToUpdate = self.districts;
          /** @type {string} */
          miss_badge = "<option value='0'>" + translateIt("AdresDefterim_IlceSeciniz") + "</option>";
          /** @type {number} */
          i = 0;
          for (; i < itemsToUpdate.length; i++) {
            /** @type {string} */
            miss_badge = miss_badge + ("<option value='" + itemsToUpdate[i].districtId + "'>" + itemsToUpdate[i].districtName + "</option>");
          }
          $("#selectMagazaBolgeIlce").html(miss_badge);
          if (magazaBolgeSecimi != null && magazaBolgeSecimi.SehirID == n) {
            $("#selectMagazaBolgeIlce").val(magazaBolgeSecimi.IlceID);
            getMagazaSemt();
          }
        }
      });
    }
  } else {
    filterMemberAddress();
    magazaBolgeKargoKontrol();
  }
}
/**
 * @return {undefined}
 */
function getMagazaSemt() {
  if (siteSettings.adresAyarlari.semtAktif && siteSettings.magazaModulu.magazaStokSatis.gonderimTipi >= 4) {
    $("#divMagazaBolgeIlce").removeClass("zorunluSecimBorder");
    $("#selectMagazaBolgeSemt").html("<option value='0'>" + translateIt("AdresDefterim_SemtSeciniz") + "</option>");
    filterMemberAddress();
    /** @type {number} */
    var n = parseInt($("#selectMagazaBolgeIlce").val());
    if (n > 0) {
      ticimaxApi.member.getZone({
        DistrictId : n
      }, function(options) {
        var data;
        var miss_badge;
        var i;
        if (!options.isError) {
          data = options.zones;
          /** @type {string} */
          miss_badge = "<option value='0'>" + translateIt("AdresDefterim_SemtSeciniz") + "</option>";
          /** @type {number} */
          i = 0;
          for (; i < data.length; i++) {
            /** @type {string} */
            miss_badge = miss_badge + ("<option value='" + data[i].zoneId + "'>" + data[i].zoneName + "</option>");
          }
          $("#selectMagazaBolgeSemt").html(miss_badge);
          if (magazaBolgeSecimi != null && magazaBolgeSecimi.IlceID == n) {
            $("#selectMagazaBolgeSemt").val(magazaBolgeSecimi.SemtID);
          }
        }
      });
    }
  } else {
    filterMemberAddress();
    magazaBolgeKargoKontrol();
  }
}
/**
 * @return {undefined}
 */
function magazaSemtChanged() {
  filterMemberAddress();
  magazaBolgeKargoKontrol();
}
/**
 * @return {undefined}
 */
function filterMemberAddress() {
  var stros2;
  var t;
  var obj;
  if (magazaBolgeAdresleri != null && magazaBolgeAdresleri.length > 0) {
    /** @type {!Array} */
    var c = [];
    /** @type {number} */
    var count = parseInt($("#selectMagazaBolgeUlke").val());
    /** @type {number} */
    var i = parseInt($("#selectMagazaBolgeSehir").val());
    /** @type {number} */
    var check = parseInt($("#selectMagazaBolgeIlce").val());
    /** @type {number} */
    var e = parseInt($("#selectMagazaBolgeSemt").val());
    if (count > 0 && (c = magazaBolgeAdresleri.filter(function(result) {
      return result.countryId === count;
    })), i > 0 && (c = magazaBolgeAdresleri.filter(function(options) {
      return options.cityId === i;
    })), check > 0 && (c = magazaBolgeAdresleri.filter(function(fx) {
      return fx.provinceId === check;
    })), e > 0 && (c = magazaBolgeAdresleri.filter(function(n) {
      return n.zoneId === e;
    })), stros2 = "", c.length > 0) {
      /** @type {number} */
      t = 0;
      for (; t < c.length; t++) {
        obj = c[t];
        /** @type {string} */
        stros2 = stros2 + "<li>";
        /** @type {string} */
        stros2 = stros2 + ("    <input type='radio' name='kargoAdresi' onchange='setMagazaBolgeAdres(" + obj.addressId + ")' />");
        /** @type {string} */
        stros2 = stros2 + "    <div>";
        /** @type {string} */
        stros2 = stros2 + ("        <span class='AdresTanim'>" + obj.addressDescription + "</span>");
        /** @type {string} */
        stros2 = stros2 + ("        <span class='AdresAdSoyad'>" + obj.companyName + "</span>");
        /** @type {string} */
        stros2 = stros2 + ("        <span class='AdresAdres'>" + obj.address + " " + (siteSettings.adresAyarlari.semtAktif ? obj.zone + "/" : "") + obj.province + "/" + obj.city + "</span>");
        /** @type {string} */
        stros2 = stros2 + "    </div>";
        /** @type {string} */
        stros2 = stros2 + "</li>";
      }
    } else {
      /** @type {string} */
      stros2 = "<li>" + translateIt("Magazalarimiz_SonucBulunamadi") + "</li>";
    }
    $(".divMagazaBolgeAdres ul").html(stros2);
  }
}
/**
 * @param {?} Inbox
 * @return {undefined}
 */
function setMagazaBolgeAdres(Inbox) {
  var postData;
  var i;
  if (magazaBolgeAdresleri != null && magazaBolgeAdresleri.length > 0) {
    postData = magazaBolgeAdresleri.filter(function($scope) {
      return $scope.addressId === Inbox;
    })[0];
    if (postData) {
      i = {
        CountryId : postData.countryId,
        CityId : postData.cityId,
        DistrictId : postData.provinceId,
        ZoneId : postData.zoneId
      };
      localStorage.removeItem("sepetHazirlayan");
      ticimaxApi.content.setStoreRegion(i, function(result) {
        if (result.isError) {
          TiciNoty.Show({
            message : result.errorMessage,
            type : "info",
            closetime : 1E4
          });
        } else {
          /** @type {string} */
          window.location = location.href;
        }
      });
    }
  }
}
/**
 * @return {undefined}
 */
function magazaBolgeKargoKontrol() {
  /** @type {number} */
  var n = parseInt($("#selectMagazaBolgeSehir").val());
  /** @type {number} */
  var whiteRating = parseInt($("#selectMagazaBolgeIlce").val());
  /** @type {number} */
  var pageInd = parseInt($("#selectMagazaBolgeSemt").val());
  ticimaxApi.content.isStoreRegionAvailable({
    CityId : n,
    DistrictId : whiteRating,
    ZoneId : pageInd
  }, function(n) {
    if (n) {
      $(".MgzSelectUyari").hide();
    } else {
      $(".MgzSelectUyari").show();
    }
  });
}
/**
 * @return {undefined}
 */
function magazaBolgeSec() {
  var artistTrack;
  $("#divMagazaBolgeUlke").removeClass("zorunluSecimBorder");
  $("#divMagazaBolgeSehir").removeClass("zorunluSecimBorder");
  $("#divMagazaBolgeIlce").removeClass("zorunluSecimBorder");
  $("#divMagazaBolgeSemt").removeClass("zorunluSecimBorder");
  /** @type {number} */
  var n = parseInt($("#selectMagazaBolgeUlke").val());
  /** @type {number} */
  var whiteRating = parseInt($("#selectMagazaBolgeSehir").val());
  /** @type {number} */
  var pageInd = parseInt($("#selectMagazaBolgeIlce").val());
  /** @type {number} */
  var num_subrows = parseInt($("#selectMagazaBolgeSemt").val());
  if (n <= 0) {
    $("#divMagazaBolgeUlke").addClass("zorunluSecimBorder");
    return;
  }
  if (whiteRating <= 0 && siteSettings.magazaModulu.magazaStokSatis.gonderimTipi == 2) {
    $("#divMagazaBolgeSehir").addClass("zorunluSecimBorder");
    return;
  }
  if (pageInd <= 0 && siteSettings.magazaModulu.magazaStokSatis.gonderimTipi == 3) {
    $("#divMagazaBolgeIlce").addClass("zorunluSecimBorder");
    return;
  }
  if (siteSettings.adresAyarlari.semtAktif && siteSettings.magazaModulu.magazaStokSatis.gonderimTipi == 4 && num_subrows <= 0) {
    $("#divMagazaBolgeSemt").addClass("zorunluSecimBorder");
    return;
  }
  artistTrack = {
    CountryId : n,
    CityId : whiteRating,
    DistrictId : pageInd,
    ZoneId : num_subrows
  };
  localStorage.removeItem("sepetHazirlayan");
  ticimaxApi.content.setStoreRegion(artistTrack, function(result) {
    if (result.isError) {
      TiciNoty.Show({
        message : result.errorMessage,
        type : "info",
        closetime : 1E4
      });
    } else {
      /** @type {string} */
      window.location = location.href;
    }
  });
}
/**
 * @return {undefined}
 */
function UpdateFavoriler() {
  if (globalModel.isAuthenticated) {
    /** @type {!Array} */
    var sku = [];
    ticimaxApi.member.getFavoriteProducts({
      GroupId : -1,
      GetProductDetail : false
    }, function(suiteContainer) {
      /** @type {number} */
      var i = 0;
      for (; i < suiteContainer.favoriteProducts.length; i++) {
        sku.push({
          favoriteProductId : suiteContainer.favoriteProducts[i].favoriteProductId,
          groupId : suiteContainer.favoriteProducts[i].groupId,
          groupName : suiteContainer.favoriteProducts[i].groupName,
          quantity : suiteContainer.favoriteProducts[i].quantity,
          productId : suiteContainer.favoriteProducts[i].productId,
          variantId : suiteContainer.favoriteProducts[i].variantId
        });
      }
      SetFavoriListe(sku);
    });
  }
}
/**
 * @return {undefined}
 */
function UpdateStokAlarm() {
  if (globalModel.isAuthenticated) {
    /** @type {!Array} */
    var actions = [];
    ticimaxApi.member.getStockAlertSummaryResponse({}, function(suiteContainer) {
      /** @type {number} */
      var i = 0;
      for (; i < suiteContainer.stockAlerts.length; i++) {
        actions.push({
          productId : suiteContainer.stockAlerts[i].productId,
          variantId : suiteContainer.stockAlerts[i].variantId,
          stockAlertId : suiteContainer.stockAlerts[i].stockAlertId,
          variantOptionId : suiteContainer.stockAlerts[i].variantOptionId
        });
      }
      SetStokBilgilendirme(actions);
    });
  }
}
/**
 * @param {?} row
 * @param {?} id
 * @param {?} to
 * @param {number} topspeed
 * @return {undefined}
 */
function IsFavoriControl(row, id, to, topspeed) {
  var edit = $(row);
  var successRates;
  var expRecords;
  if (!globalModel.isAuthenticated && topspeed == 1) {
    $(row).hide();
    return;
  }
  if (successRates = GetFavoriListe(), successRates.length > 0) {
    if (expRecords = successRates.filter(function(data) {
      return data.productId == id && data.variantId == to;
    }), expRecords.length > 0 ? topspeed == 0 : topspeed == 1) {
      $(row).hide();
      return;
    }
  } else {
    if (topspeed == 1) {
      $(row).hide();
      return;
    }
  }
  $(row).show();
  return;
}
/**
 * @param {number} n
 * @param {number} froot
 * @param {?} fext
 * @return {undefined}
 */
function getTeslimatSaatList(n, froot, fext) {
  ticimaxApi.content.getDeliveryTimeList({
    CargoId : fext,
    DistrictId : n,
    ZoneId : froot
  }, function(inwin) {
    $.fancybox.open({
      type : "html",
      content : inwin.content
    });
  });
}
/**
 * @return {undefined}
 */
function kampanyaBannerSayac() {
  if ($(".Sayac").length > 0) {
    $(".Sayac").each(function() {
      $(this).countdown({
        until : $(this).attr("rel").toDateFromAspNet(),
        compact : true,
        description : ""
      });
    });
  }
}
/**
 * @param {number} derivedKeyType
 * @param {string} key
 * @return {undefined}
 */
function GirisKontrol(derivedKeyType, key) {
  if (!globalModel.isAuthenticated && siteSettings.uyeAyar.uyelikSistemiAktif) {
    if (siteSettings.uyeGirisPopupAktif && window.location.href.toLowerCase().indexOf("uyegiris.aspx") == -1) {
      /** @type {string} */
      window.mem.returnUrl = key;
      if (derivedKeyType == 0) {
        window.mem.init.bind("login");
      } else {
        if (derivedKeyType == 1) {
          window.mem.init.bind("quickmembership");
        } else {
          if (derivedKeyType == 2) {
            window.mem.init.bind("forgotpassword");
          }
        }
      }
    } else {
      /** @type {string} */
      var s = "";
      if (derivedKeyType == 2) {
        /** @type {string} */
        s = "/SifremiUnuttum";
      } else {
        /** @type {string} */
        s = derivedKeyType == 0 ? "/UyeGiris" : "/UyeOl";
        if (typeof key != "undefined") {
          /** @type {string} */
          s = s + ("?ReturnUrl=" + key);
        }
      }
      /** @type {string} */
      window.location.href = s;
    }
  } else {
    if (typeof key != "undefined") {
      /** @type {string} */
      window.location.href = key;
    }
  }
}
/**
 * @param {string} type
 * @return {undefined}
 */
function doSocialLogin(type) {
  ticimaxApi.member.socialLogin({
    Type : type
  }, function(options) {
    if (!options.isError) {
      /** @type {string} */
      var p = location.pathname + location.search;
      var view = getQueryStringByName("ReturnUrl");
      if (view != null) {
        p = view;
      }
      createCookie("socialLoginReturnUrl", encodeURIComponent(p));
      window.location.href = options.redirectUrl;
    }
  }, function() {
  });
}
/**
 * @return {undefined}
 */
function preparaLangContainer() {
  var s;
  var code;
  var c;
  var index;
  var t;
  var url;
  var uri;
  var i;
  var l;
  var cn;
  var country;
  var newCurrency;
  var a;
  if (globalModel.langModel.currencyContainerActive || globalModel.langModel.languageContainerActive || globalModel.langModel.countryContainerActive) {
    if (s = "", s = globalModel.langModel.currencyContainerActive || globalModel.langModel.languageContainerActive || !globalModel.langModel.countryContainerActive ? globalModel.langModel.languageContainerActive ? "flag flag-" + globalModel.langModel.languageCode : "currency-" + globalModel.langModel.currencyISOCode : "flag flag-" + globalModel.langModel.countryAlpha2Code.toLowerCase(), code = "", code = code + "<div id='langHover'>", code = code + ('<div id="lang" class="' + s + '">'), code = code + 
    "<span>", code = code + (globalModel.langModel.selectedLanguage || ""), code = code + "</span>", code = code + "</div>", code = code + "</div>", c = siteSettings.siteYonetimAyar.gbpbGizle && globalModel.userAgentIsGoogleBot ? false : true, c) {
      if (code = code + '<div id="lang-detail" style="display: none;">', globalModel.langModel.languageContainerActive) {
        /** @type {string} */
        code = code + '<div class="language" id="divAvailableLanguages">';
        /** @type {string} */
        code = code + ("<p>" + translateIt("Global_DilDegistir") + "</p>");
        /** @type {number} */
        index = 0;
        for (; index < globalModel.langModel.availableLanguages.length; index++) {
          if (typeof productsModel != "undefined" && productsModel.urlList.length > 0) {
            t = productsModel.urlList.filter(function(n) {
              return n.dil == globalModel.langModel.availableLanguages[index].language;
            })[0];
            if (typeof t != "undefined" && t != null) {
              globalModel.langModel.availableLanguages[index].pageUrl = t.sayfaAdresi;
            }
            if (productsModel.pageType === 10) {
              globalModel.langModel.availableLanguages[index].pageUrl += "?kelime=" + getQueryStringByName("kelime");
            }
          }
          /** @type {string} */
          code = code + ('<a class="flag flag-' + globalModel.langModel.availableLanguages[index].language + (globalModel.langModel.availableLanguages[index].selected ? " active" : "") + '" href="' + (globalModel.langModel.availableLanguages[index].selected ? "javascript:void(0);" : globalModel.langModel.availableLanguages[index].pageUrl) + '" >' + globalModel.langModel.availableLanguages[index].languageNativeName + "</a>");
        }
        /** @type {string} */
        code = code + '<div class="clear-both"></div>';
        /** @type {string} */
        code = code + "</div>";
      }
      if (globalModel.langModel.currencyContainerActive) {
        /** @type {string} */
        code = code + '<div class="currency" id="divAvailableCurrencies">';
        /** @type {string} */
        code = code + ("<p>" + translateIt("Global_ParaBirimiDegistir") + "</p>");
        /** @type {string} */
        url = location.href;
        if (location.search.length > 0) {
          url = removeURLParameter(url, "currency");
        }
        /** @type {!URL} */
        uri = new URL(url);
        /** @type {number} */
        i = 0;
        for (; i < globalModel.langModel.availableCurrencies.length; i++) {
          /** @type {string} */
          l = "/" + (uri.pathname + uri.search).substr(1) + (uri.search !== "" ? "&" : "?");
          /** @type {string} */
          code = code + ('<a class="currency-' + globalModel.langModel.availableCurrencies[i].currency + (globalModel.langModel.availableCurrencies[i].selected ? " active" : "") + '" href="' + l + "currency=" + globalModel.langModel.availableCurrencies[i].currency + '">');
          /** @type {string} */
          code = code + (' <i class="fa fa-' + globalModel.langModel.availableCurrencies[i].currency + (globalModel.langModel.availableCurrencies[i].selected ? " active" : "") + '"></i >');
          /** @type {string} */
          code = code + ("<em>" + globalModel.langModel.availableCurrencies[i].currencyUpper + "</em>");
          /** @type {string} */
          code = code + "</a>";
        }
        /** @type {string} */
        code = code + '<div class="clear-both"></div>';
        /** @type {string} */
        code = code + "</div>";
      }
      if (globalModel.langModel.countryContainerActive) {
        /** @type {string} */
        code = code + '<div class="country" id="divAvailableCountries">';
        /** @type {string} */
        code = code + '<div id="teslimatUlkeSec">';
        /** @type {string} */
        code = code + ("<p>" + translateIt("Global_TeslimatUlkesiDegistir") + "</p>");
        /** @type {string} */
        code = code + ('<input id="txtHeaderSeciliUlke" type="text" autocomplete="new-password" value="' + (globalModel.langModel.countryName != null ? globalModel.langModel.countryName : "") + '" />');
        /** @type {string} */
        code = code + '<ul class="teslimatUlkeSecUl" id="ulTeslimatUlkeler">';
        /** @type {number} */
        cn = 0;
        for (; cn < globalModel.langModel.availableCountries.length; cn++) {
          country = globalModel.langModel.availableCountries[cn];
          /** @type {string} */
          code = code + ('<li class="flag flag-' + country.alpha2Code.toLowerCase() + '" data-country-code="' + country.alpha2Code + '" data-country-name="' + country.name + '">' + country.name + "</li>");
        }
        /** @type {string} */
        code = code + "</ul>";
        /** @type {string} */
        code = code + '<div class="clear-both"></div>';
        /** @type {string} */
        code = code + "</div>";
        /** @type {string} */
        code = code + "</div>";
      }
      /** @type {string} */
      code = code + "</div>";
      /** @type {string} */
      newCurrency = document.getElementsByTagName("body")[0].getAttribute("data-currency");
      if (newCurrency && newCurrency != globalModel.currency) {
        window.location.reload();
      }
    }
    /** @type {(Element|null)} */
    a = document.getElementById("lang_flag_container");
    if (a) {
      /** @type {string} */
      document.getElementById("lang_flag_container").innerHTML = code;
      $("#txtHeaderSeciliUlke").click(function() {
        $(this).addClass("active");
        $(this).data("value", $(this).val());
        $(this).val("");
        searchDeliveryCountry();
      });
      $("#txtHeaderSeciliUlke").blur(function() {
        $(this).val($(this).data("value"));
      });
      $("#txtHeaderSeciliUlke").keyup(searchDeliveryCountry);
      $(".teslimatUlkeSecUl li").click(function() {
        var country = $(this).data("country-code");
        var artistTrack = $(this).data("country-name");
        setDeliveryCountry(country, artistTrack);
      });
    }
  }
}
/**
 * @param {!Object} $target
 * @param {?} type
 * @return {undefined}
 */
function urunfavoriKontrol($target, type) {
  /** @type {boolean} */
  var r = false;
  var successRates;
  var expRecords;
  if (globalModel.isAuthenticated) {
    successRates = GetFavoriListe();
    if (successRates.length > 0) {
      expRecords = successRates.filter(function(port) {
        return port.productId === type;
      });
      /** @type {boolean} */
      r = expRecords.length > 0;
    }
    $target = $($target);
    $target.attr("init", true);
    if (r) {
      $target.attr("data-action", 0);
      $target.removeClass("listfavoriPasif");
      $target.addClass("listfavoriAktif");
      $target.attr("data-original-title", translateIt("Favorilerim_FavorilerdenKaldir"));
      $target.attr("title", translateIt("Favorilerim_FavorilerdenKaldir"));
      $target.html(translateIt("Favorilerim_FavorilerdenKaldir"));
    } else {
      $target.attr("data-action", 1);
      $target.removeClass("listfavoriAktif");
      $target.addClass("listfavoriPasif");
      $target.attr("title", translateIt("Favorilerim_FavorilerimeEkle"));
      $target.attr("data-original-title", translateIt("Favorilerim_FavorilerimeEkle"));
      $target.html(translateIt("Favorilerim_FavorilerimeEkle"));
    }
  }
}
/**
 * @param {!Object} n
 * @param {string} type
 * @param {boolean} noQualityRestore
 * @return {undefined}
 */
function playProductVideo(n, type, noQualityRestore) {
  try {
    var f = $(".urunVideo_" + type);
    var audio_element = f.get(0);
    /** @type {number} */
    var r = parseInt(f.attr("data-blokmoduleid")) || 0;
    if (r > 0) {
      $(".blockID-" + r + " video").not(".urunVideo_" + type).trigger("pause");
      $(".blockID-" + r + " video").not(".urunVideo_" + type).prop("currentTime", 0);
      $(".blockID-" + r + " .urunListeVideoPlay").html('<i class="fa fa-play-circle-o" aria-hidden="true"></i>');
      $(".blockID-" + r + " .productDetail").addClass("videoAutoPlayFalse").removeClass("videoAutoPlayTrue");
    } else {
      if (typeof productsModel != "undefined" && productsModel.autoPlayVideo == 0) {
        $("#ProductPageProductList video").not(".urunVideo_" + type).trigger("pause");
        $("#ProductPageProductList video").not(".urunVideo_" + type).prop("currentTime", 0);
        $("#ProductPageProductList .urunListeVideoPlay").html('<i class="fa fa-play-circle-o" aria-hidden="true"></i>');
        $("#ProductPageProductList .productDetail").addClass("videoAutoPlayFalse").removeClass("videoAutoPlayTrue");
      }
    }
    if (n == null) {
      n = $("#urunListeVideoPlay_" + type);
    }
    if (audio_element.paused) {
      if (!noQualityRestore) {
        audio_element.play();
      }
      /** @type {string} */
      n.innerHTML = '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
    } else {
      /** @type {string} */
      n.innerHTML = '<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
      if (!noQualityRestore) {
        audio_element.pause();
      }
    }
  } catch (e) {
    console.log("ERROR PLAY");
  }
}
/**
 * @param {number} n
 * @param {boolean} elem
 * @param {boolean} i
 * @return {undefined}
 */
function showQuickView(n, elem, i) {
  var view;
  var wrap;
  var img;
  var langClass;
  if (siteSettings.urunAyar.hizliBakisGorunumAyar.tip != 0 || i) {
    if (siteSettings.urunAyar.hizliBakisGorunumAyar.tip == 1 || i) {
      /** @type {string} */
      langClass = "";
      if (i) {
        /** @type {string} */
        langClass = "liveShopping";
      }
      $("body").append("<div id='fake-modal' class='modal'></div>");
      ticimaxApi.product.getProductDetail({
        ProductId : n,
        IsQuickView : true
      }, function(event) {
        $("#fake-modal").remove();
        var source_passwords = getHandlebarTemplate("ticimax-HizliBakisV2");
        var setStatus = Handlebars.compile(source_passwords);
        var markerInfo = setStatus(event.detail);
        if (elem) {
          $("#quickViewV2 .modal-content-html").html(markerInfo);
        } else {
          createModal({
            id : "quickViewV2",
            className : langClass,
            content : markerInfo,
            width : "50%"
          });
        }
        window.productDetailModel = event.detailModel;
        initUrunDetay();
        if (typeof initUrunDetayCallback != "undefined") {
          initUrunDetayCallback();
        }
        if (typeof UrunHizliBakisCallback != "undefined") {
          UrunHizliBakisCallback();
        }
        if (typeof urunListCallback != "undefined") {
          urunListCallback();
        }
        if (typeof urunSliderBlok != "undefined") {
          urunSliderBlok();
        }
        if (typeof urunDetay_varyasyonSecili != "undefined" && urunDetay_varyasyonSecili || siteSettings.urunAyar.urunDetayVaryasyonOtomatikSec) {
          $("#divUrunEkSecenekV2 .ekSecenekGrup .ekSecenekValues").not(".nostok").first().click();
        }
        lazyLoad();
        $("#quickViewV2 #imgUrunResim").removeAttr("onclick");
      });
    }
  } else {
    /** @type {!Array} */
    img = [];
    $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Urun/HizliBakis.html", function(selector) {
      view = Handlebars.compile(selector);
      $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Urun/HizliBakisAltBolum.html", function(node) {
        /**
         * @param {string} sel_open_end
         * @return {undefined}
         */
        function hookUserHistory(sel_open_end) {
          $(sel_open_end + " .jCarouselLite ul").each(function() {
            if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) {
              $(this).owlCarousel({
                autoplay : false,
                loop : true,
                autoplayTimeout : 2E3,
                navClass : ["ProductListprev", "ProductListnext"],
                autoplaySpeed : 2E3,
                autoplayHoverPause : true,
                margin : 30,
                nav : true,
                responsive : {
                  0 : {
                    items : 2,
                    nav : true,
                    loop : false
                  },
                  768 : {
                    items : globalBlokModel == 1 ? 2 : globalBlokModel == 2 ? 2 : globalBlokModel == 3 ? 2 : globalBlokModel == 4 ? 2 : 2,
                    nav : true,
                    loop : false
                  },
                  992 : {
                    items : globalBlokModel == 1 ? 3 : globalBlokModel == 2 ? 3 : globalBlokModel == 3 ? 3 : globalBlokModel == 4 ? 3 : 3,
                    nav : true,
                    loop : false
                  },
                  1200 : {
                    items : globalBlokModel == 1 ? 3 : globalBlokModel == 2 ? 2 : globalBlokModel == 3 ? 3 : globalBlokModel == 4 ? 4 : 4,
                    nav : true,
                    loop : false
                  }
                }
              });
            }
          });
          setTimeout(function() {
            InitTimers();
          }, 1E3);
        }
        /**
         * @return {undefined}
         */
        function success() {
          ticimaxApi.product.getProductCategoryBreadCrumb({
            CategoryId : window.FastPreview.Model.product.categoryId
          }, function(settings) {
            $("#ulBreadcrumb").html(settings.breadCrumb);
          });
        }
        wrap = Handlebars.compile(node);
        window.FastPreview = {};
        window.FastPreview.Model = {};
        /**
         * @param {?} n
         * @return {undefined}
         */
        window.FastPreview.QuantityDown = function(n) {
          azalt(n);
          /** @type {number} */
          window.FastPreview.Model.product.quantity = parseFloat($("#txtHizliBakisAdet").val());
        };
        /**
         * @param {?} n
         * @return {undefined}
         */
        window.FastPreview.QuantityUp = function(n) {
          artir(n);
          /** @type {number} */
          window.FastPreview.Model.product.quantity = parseFloat($("#txtHizliBakisAdet").val());
        };
        /**
         * @param {(Node|Window)} n
         * @param {?} text
         * @return {undefined}
         */
        window.FastPreview.AddToCart = function(n, text) {
          var params;
          var product;
          var donationReward;
          text = typeof text != "undefined" ? text : true;
          /** @type {null} */
          params = null;
          product = window.FastPreview.Model.product;
          if (product.variantTypes.length > 0) {
            if (product.variantTypes.length == product.selectedVariantTypeValues.length) {
              params = product.variants.filter(function(historyReadResult) {
                return historyReadResult.variantPropertyIDs.toString() === product.selectedVariantTypeValues.toString();
              })[0];
            } else {
              window.FastPreview.VariantAlert(n);
            }
          } else {
            params = product.variants[0];
          }
          if (params != null) {
            /** @type {boolean} */
            siteSettings.sepeteEkleSepeteYonlendir = false;
            /** @type {boolean} */
            siteSettings.urunSepetAtPopup = false;
            /** @type {number} */
            donationReward = parseFloat($("#txtHizliBakisAdet").val());
            sepeteEkle(params.variantId, donationReward, 0, 0, 0, "", false, null, 0, text, false);
          }
        };
        /**
         * @param {string} index
         * @return {undefined}
         */
        window.FastPreview.ThumbImageChange = function(index) {
          /** @type {string} */
          window.FastPreview.Model.product.selectedImage = index;
          $("#hizliBakis").html(view(window.FastPreview.Model));
          if (typeof UrunHizliBakisCallback != "undefined") {
            UrunHizliBakisCallback();
          }
        };
        ticimaxApi.product.getProductPreview({
          ProductId : n
        }, function(ticket) {
          var product = ticket.product;
          var params;
          product.selectedImage = product.productImages.length > 0 ? product.productImages[0].imagePath : "/Scripts/images/resimyok_ufak.jpg";
          product.quantity = product.productQuantityBoxDefaultValue;
          /** @type {!Array} */
          product.selectVariantTypes = [];
          /** @type {!Array} */
          product.selectedVariantTypeValues = [];
          img = product.productImages;
          if (product.variantTypes.length > 0) {
            product.selectVariantTypes.push({
              index : 0,
              listType : product.variantTypes[0].listType,
              name : product.variantTypes[0].name,
              order : product.variantTypes[0].order,
              variantTypeId : product.variantTypes[0].variantTypeId,
              selectVariantTypeValues : product.variantTypes[0].variantTypeValues
            });
          }
          window.FastPreview.Model = {
            settings : {
              showBreadcrumb : siteSettings.urunAyar.hizliBakisGorunumAyar.breadcrumbGoster,
              showProductNew : siteSettings.urunAyar.hizliBakisGorunumAyar.yeniUrunGoster && product.newProduct,
              showBrand : siteSettings.urunAyar.hizliBakisGorunumAyar.markaGoster,
              showBrandLogo : siteSettings.urunAyar.hizliBakisGorunumAyar.markaLogoGoster,
              showShortDescription : siteSettings.urunAyar.hizliBakisGorunumAyar.onYaziGoster,
              showSalesUnit : siteSettings.urunAyar.hizliBakisGorunumAyar.satisBirimiGoster,
              showQuantityBox : true,
              showAddFavorites : siteSettings.urunAyar.hizliBakisGorunumAyar.favorilereEkleGoster,
              showProductTab : siteSettings.urunAyar.hizliBakisGorunumAyar.urunTabGoster,
              showProductTabDescription : siteSettings.urunAyar.hizliBakisGorunumAyar.urunTabUrunOzelliklerGoster,
              showRelatedProduct : siteSettings.urunAyar.hizliBakisGorunumAyar.ilgiliUrunGoster,
              showSimilarProduct : siteSettings.urunAyar.hizliBakisGorunumAyar.benzerUrunGoster,
              showEstimatedDeliveryTime : siteSettings.urunAyar.hizliBakisGorunumAyar.tahminiTeslimSuresiGoster,
              showDiscountRate : siteSettings.urunAyar.hizliBakisGorunumAyar.indirimOraniGoster && product.discountRate > 0,
              showStockCode : siteSettings.urunAyar.hizliBakisGorunumAyar.stokKoduGoster,
              showDetailButton : siteSettings.urunAyar.hizliBakisGorunumAyar.detayaGitButonGoster
            },
            product : product,
            relatedProducts : ticket.relatedProducts,
            similarProducts : ticket.similarProducts
          };
          window.FastPreview.SetPrice(product);
          window.FastPreview.SetVariantClass();
          var vroot = view(window.FastPreview.Model);
          /** @type {string} */
          var emptyPath = "<div id='hizliBakis'>" + vroot + "</div>";
          var readMap = wrap(window.FastPreview.Model);
          /** @type {string} */
          emptyPath = emptyPath + ("<div id='hizliBakisAltAlan'>" + readMap + "</div>");
          $.fancybox.open(emptyPath, {
            width : 768,
            autoHeight : true,
            autoWidth : true,
            beforeShow : function() {
              $("body").css({
                "overflow-y" : "hidden"
              });
            },
            afterClose : function() {
              $("body").css({
                "overflow-y" : "visible"
              });
            }
          });
          if (typeof UrunHizliBakisCallback != "undefined") {
            UrunHizliBakisCallback();
          }
          params = product.variants.filter(function(n) {
            return n.isMainVariant;
          })[0];
          window.FastPreview.Model.product.stockCode = params.stockCode;
          window.FastPreview.FavoritesControl(product.productId, params.variantId);
          if (window.FastPreview.Model.settings.showBreadcrumb) {
            setTimeout(function() {
              success();
            }, 500);
          }
          if (typeof urunListCallback != "undefined") {
            urunListCallback();
          }
          if (typeof urunSliderBlok != "undefined") {
            urunSliderBlok();
          }
          setTimeout(function() {
            hookUserHistory("#divHizliBakisIlgiliUrun");
          }, 300);
          if (typeof urunListCallback != "undefined") {
            urunListCallback();
          }
          if (typeof urunSliderBlok != "undefined") {
            urunSliderBlok();
          }
          setTimeout(function() {
            hookUserHistory("#divHizliBakisBenzerUrun");
          }, 300);
          window.FastPreview.BindTahminiTeslimSuresi(product.variants[0]);
          if (typeof urunDetay_varyasyonSecili != "undefined" && urunDetay_varyasyonSecili || siteSettings.urunAyar.urunDetayVaryasyonOtomatikSec) {
            $(".divKombinEksecenekTipi .size_box").not(".nostok").first().click();
          }
        });
        /**
         * @param {?} n
         * @param {?} m
         * @return {undefined}
         */
        window.FastPreview.FavoritesControl = function(n, m) {
          /** @type {boolean} */
          var event = false;
          var successRates;
          var expRecords;
          if (globalModel.isAuthenticated) {
            successRates = GetFavoriListe();
            if (successRates.length > 0) {
              expRecords = successRates.filter(function(action) {
                return action.productId === n && action.variantId === m;
              });
              /** @type {boolean} */
              event = expRecords.length > 0;
            }
          }
          $(event ? "#aHizliBakisFavoriCikar" : "#aHizliBakisFavoriEkle").show();
          $(event ? "#aHizliBakisFavoriEkle" : "#aHizliBakisFavoriCikar").hide();
        };
        /**
         * @param {?} n
         * @param {number} froot
         * @return {undefined}
         */
        window.FastPreview.FavoritesAddRemove = function(n, froot) {
          var $stateParams;
          var product;
          var artistTrack;
          if (!globalModel.isAuthenticated) {
            if (siteSettings.uyeGirisPopupAktif) {
              window.mem.init.bind("login");
            } else {
              /** @type {string} */
              parent.window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
            }
            return;
          }
          if ($stateParams = null, product = window.FastPreview.Model.product, product.variantTypes.length > 0) {
            if (product.variantTypes.length === product.selectedVariantTypeValues.length) {
              $stateParams = product.variants.filter(function(historyReadResult) {
                return historyReadResult.variantPropertyIDs.toString() === product.selectedVariantTypeValues.toString();
              })[0];
            } else {
              window.FastPreview.VariantAlert($(".hizliBakisSepeteEkle"));
              return;
            }
          } else {
            $stateParams = product.variants[0];
          }
          var id = $stateParams.variantId;
          var retakeNumber = $stateParams.productId;
          if (froot === 0) {
            artistTrack = {
              GroupId : -1,
              FavoriteProductId : -1,
              ProductId : retakeNumber
            };
            ticimaxApi.member.removeFavoriteGroupProduct(artistTrack, function(item) {
              UpdateFavoriler();
              if (typeof favoriUyariAktif == "undefined" ? true : favoriUyariAktif) {
                generateNotify(translateIt("GlobalMasterPage_UyariFavoriCikarildi"), "warning");
              }
              $("#aHizliBakisFavoriEkle").show();
              $("#aHizliBakisFavoriCikar").hide();
              if (typeof visiLab != "undefined") {
                visiLab = new Visilabs;
                visiLab.AddParameter("OM.pf", id);
                visiLab.AddParameter("OM.pfu", "-1");
                visiLab.AddParameter("OM.pfr", item ? parseFloat(item.salePrice).toFixed(2) : 0);
                visiLab.Collect();
              }
              if (typeof getFavoriGrup != "undefined") {
                getFavoriGrup();
              }
            });
          } else {
            ticimaxApi.member.getFavoriteGroup({
              VariantId : -1
            }, function(suiteContainer) {
              /** @type {string} */
              var destination = '<div id="divFastPreviewModal" class="galeri-modal" style="display:block;">';
              var i;
              var options;
              /** @type {string} */
              destination = destination + '<div class="galeri-modal-content" id="divGaleriCropModalContent" style="width:400px">';
              /** @type {string} */
              destination = destination + '<a href="#"  onclick="FastPreview.CloseFavoritesPopup()"><i class="fa fa-times"></i></a>';
              /** @type {number} */
              i = 0;
              for (; i < suiteContainer.favoriteGroups.length; i++) {
                options = suiteContainer.favoriteGroups[i];
                /** @type {string} */
                destination = destination + ("<div class='detayFavoriListItem'>" + options.definition + "");
                /** @type {string} */
                destination = destination + ("<button type='button' onclick='FastPreview.AddToProductFavorites(" + $stateParams.productId + "," + $stateParams.variantId + "," + options.groupId + ")'>Ekle</button>");
                /** @type {string} */
                destination = destination + "</div>";
              }
              /** @type {string} */
              destination = destination + "</div>";
              /** @type {string} */
              destination = destination + "</div>";
              $("body").append(destination);
            });
          }
        };
        /**
         * @param {number} $ionicHistory
         * @param {number} mmCoreSplitViewBlock
         * @param {?} $state
         * @return {undefined}
         */
        window.FastPreview.AddToProductFavorites = function($ionicHistory, mmCoreSplitViewBlock, $state) {
          var expectedRoleSecurityGroup = {
            GroupId : $state,
            ProductId : $ionicHistory,
            VariantId : mmCoreSplitViewBlock,
            Quantity : window.FastPreview.Model.product.productQuantityBoxDefaultValue
          };
          ticimaxApi.member.addFavoriteProduct(expectedRoleSecurityGroup, function(item) {
            parent.UpdateFavoriler();
            if (typeof visiLab != "undefined") {
              visiLab = new Visilabs;
              visiLab.AddParameter("OM.pf", mmCoreSplitViewBlock);
              visiLab.AddParameter("OM.pfu", "1");
              visiLab.AddParameter("OM.pfr", item ? parseFloat(item.salePrice).toFixed(2) : 0);
              visiLab.Collect();
            }
            $("#aHizliBakisFavoriCikar").show();
            $("#aHizliBakisFavoriEkle").hide();
            window.FastPreview.CloseFavoritesPopup();
            if (typeof favoriUyariAktif == "undefined" ? true : favoriUyariAktif) {
              TiciNoty.Show({
                message : translateIt("GlobalMasterPage_UyariFavoriEklendi"),
                type : "info"
              });
            }
          });
        };
        /**
         * @return {undefined}
         */
        window.FastPreview.CloseFavoritesPopup = function() {
          $("#divFastPreviewModal").remove();
        };
        /**
         * @return {undefined}
         */
        window.FastPreview.SetVariantClass = function() {
          var target;
          var e;
          var item;
          var model = window.FastPreview.Model.product;
          /** @type {number} */
          var i = 0;
          for (; i < model.selectVariantTypes.length; i++) {
            target = model.selectVariantTypes[i];
            /** @type {number} */
            e = 0;
            for (; e < target.selectVariantTypeValues.length; e++) {
              item = target.selectVariantTypeValues[e];
              /** @type {string} */
              item.cssClass = "size_box " + (item.stockAmount < 1 ? " nostok" : "") + (item.selected ? " selected" : "");
            }
          }
        };
        /**
         * @param {!Object} code
         * @return {undefined}
         */
        window.FastPreview.BindTahminiTeslimSuresi = function(code) {
          if (code.showEstimatedDeliveryTime) {
            $("#hizliBakisTahminiTeslimatSuresi").show();
            if (code.estimatedDeliveryTimeSameDay) {
              $("#spnHizliBakisTahminiTeslimSuresi").html(translateIt("Global_AyniGun"));
            } else {
              if (code.estimatedDeliveryTime > 0) {
                if (siteSettings.urunAyar.urunDetayAyar.tahminiTeslimSuresiGosterimTipi === 1) {
                  $("#spnHizliBakisTahminiTeslimSuresi").html(code.estimatedDeliveryTimeDate);
                } else {
                  $("#spnHizliBakisTahminiTeslimSuresi").html(code.estimatedDeliveryTime + " " + translateIt("Global_Gun"));
                }
              }
            }
          } else {
            $("#hizliBakisTahminiTeslimatSuresi").hide();
          }
        };
        /**
         * @param {?} words
         * @param {?} rel
         * @param {number} key
         * @return {undefined}
         */
        window.FastPreview.SelectVariant = function(words, rel, key) {
          var params;
          var i = key + 1;
          var data = window.FastPreview.Model.product;
          var client;
          var crossfilterable_layers;
          var layer_i;
          var resizedObj;
          if (data.selectVariantTypes[key].selectVariantTypeValues.map(function(cbCollection) {
            /** @type {boolean} */
            cbCollection.selected = false;
          }), data.selectVariantTypes[key].selectVariantTypeValues.filter(function(link) {
            return link.variantTypeValueId === rel;
          })[0].selected = true, data.selectedVariantTypeValues.length = key, data.selectedVariantTypeValues.push(rel), data.variantTypes.length > i) {
            /** @type {!Array} */
            client = [];
            crossfilterable_layers = data.variants.filter(function(cbCollection) {
              return cbCollection.variantPropertyIDs.slice(0, i).toString() === data.selectedVariantTypeValues.toString();
            });
            /** @type {number} */
            layer_i = 0;
            for (; layer_i < crossfilterable_layers.length; layer_i++) {
              resizedObj = crossfilterable_layers[layer_i];
              client.push({
                colorCode : resizedObj.variantPropertyDetail[i].colorCode,
                image : resizedObj.variantPropertyDetail[i].image,
                name : resizedObj.variantPropertyDetail[i].name,
                order : resizedObj.variantPropertyDetail[i].order,
                stockAmount : resizedObj.variantPropertyDetail[i].stockAmount,
                variantId : resizedObj.variantPropertyDetail[i].variantId,
                variantTypeId : resizedObj.variantPropertyDetail[i].variantTypeId,
                variantTypeName : resizedObj.variantPropertyDetail[i].variantTypeName,
                variantTypeValueId : resizedObj.variantPropertyDetail[i].variantTypeValueId
              });
            }
            data.selectVariantTypes.length = i;
            data.selectVariantTypes.push({
              index : i,
              listType : data.variantTypes[i].listType,
              name : data.variantTypes[i].name,
              order : data.variantTypes[i].order,
              variantTypeId : data.variantTypes[i].variantTypeId,
              selectVariantTypeValues : client.sort(function(correctResponse, t) {
                return parseInt(correctResponse.order) - parseInt(t.order);
              })
            });
          } else {
            params = data.variants.filter(function(historyReadResult) {
              return historyReadResult.variantPropertyIDs.toString() === data.selectedVariantTypeValues.toString();
            })[0];
            window.FastPreview.SetPrice(data, params);
            window.FastPreview.Model.product.productImages = img.filter(function(job) {
              return job.variantId === params.variantId || job.variantId == 0;
            });
            if (window.FastPreview.Model.product.productImages.length > 0) {
              window.FastPreview.Model.product.selectedImage = window.FastPreview.Model.product.productImages[0].bigImagePath;
            }
          }
          window.FastPreview.SetVariantClass();
          if (typeof UrunHizliBakisEkSecenekCallback != "undefined") {
            UrunHizliBakisEkSecenekCallback();
          }
          $("#hizliBakis").html(view(window.FastPreview.Model));
          if (params) {
            window.FastPreview.Model.product.stockCode = params.stockCode;
            window.FastPreview.FavoritesControl(words, params.variantId);
            window.FastPreview.BindTahminiTeslimSuresi(params);
          }
        };
        /**
         * @param {!Object} type
         * @param {!Object} options
         * @return {undefined}
         */
        window.FastPreview.SetPrice = function(type, options) {
          options = typeof options != "undefined" ? options : type.variants[0];
          var item = {
            currencySymbol : options.currencyFormat.formatDescriptionShow ? options.currency : options.currencyFormat.symbol,
            currencySymbolLocation : options.currencyFormat.iconLocation,
            decimalPlaces : options.currencyFormat.salesDecimalDigital,
            decimalChar : options.currencyFormat.decimalSeparator
          };
          window.FastPreview.Model.product.price = options.originalProductPrice.numFormat(item);
          window.FastPreview.Model.product.sellingPrice = options.sellingPrice.numFormat(item);
          window.FastPreview.Model.product.discountRate = options.discountRate;
          window.FastPreview.Model.settings.showDiscountRate = siteSettings.urunAyar.hizliBakisGorunumAyar.indirimOraniGoster && options.discountRate > 0;
          window.FastPreview.Model.product.vatIncluded = options.vatIncluded;
          window.FastPreview.Model.product.vatIncludedPrice = (options.originalProductPrice + options.originalProductPriceVat).numFormat(item);
          window.FastPreview.Model.product.vatIncludedSellingPrice = (options.sellingPrice + options.sellingPriceVat).numFormat(item);
          $("#hizliBakis").html(view(window.FastPreview.Model));
          window.FastPreview.BindTahminiTeslimSuresi(options);
        };
        /**
         * @param {(Node|Window)} e
         * @return {undefined}
         */
        window.FastPreview.VariantAlert = function(e) {
          $("body").addClass("kombinurunsecbody");
          $(".kombinurunsecbody .kombinContent .urunsecoverlay").fadeIn();
          $(e).parent().find("#divKombinUrunEkSecenek").addClass("kombinEksecenekUyari");
          $(e).parent().find("#divKombinUrunEkSecenek").append("<div class='tooltipp'>L\u00fctfen Se\u00e7im Yap\u0131n\u0131z<i></i></div>");
          $(".urunsecoverlay").click(function() {
            $(".kombinContent #divKombinUrunEkSecenek").removeClass("kombinEksecenekUyari");
            $(".urunsecoverlay").fadeOut();
            $(".tooltipp").remove();
            $("body").removeClass("urunsecbody");
          });
          $(".kombinurunsecbody #divKombinUrunEkSecenek").click(function() {
            $(this).removeClass("kombinEksecenekUyari");
            $(".urunsecoverlay").fadeOut();
            $(".tooltipp").remove();
            $("body").removeClass("urunsecbody");
          });
        };
        /**
         * @param {?} txtNameId
         * @return {undefined}
         */
        window.FastPreview.QuantityChange = function(txtNameId) {
          /** @type {number} */
          window.FastPreview.Model.product.quantity = parseFloat($(txtNameId).val());
        };
      });
    });
  }
}
/**
 * @param {string} notMessage
 * @return {undefined}
 */
function showUIBlock(notMessage) {
  $.blockUI({
    message : notMessage
  });
}
/**
 * @return {undefined}
 */
function hideUIBlock() {
  $.unblockUI();
}
/**
 * @param {?} template
 * @param {string} idx
 * @param {?} radius
 * @param {string} textureId
 * @param {string} u
 * @return {undefined}
 */
function showTabDetail(template, idx, radius, textureId, u) {
  var log = $("#divAnasayfatab" + idx);
  var solved;
  log.find(".ulHeadItem li").removeClass("tabUrunActive");
  log.find(".divAnasayfaTabAlt").removeClass("tabUrunActive");
  log.find(".ulHeadItem .ItemIndex" + u).addClass("tabUrunActive");
  log.find("div.ItemIndex" + u).addClass("tabUrunActive");
  /** @type {boolean} */
  solved = $(template).attr("data-load") == "true";
  if (!solved) {
    if (typeof window.ProductTab.ProductTemplate == "undefined") {
      $.get("/Templates/100/Bloklar/TabUrun.html", function(n) {
        window.ProductTab.ProductTemplate = n;
        BindProductTab(idx, radius, textureId, u);
      });
    } else {
      BindProductTab(idx, radius, textureId, u);
    }
    $(template).attr("data-load", true);
  }
}
/**
 * @param {string} path
 * @param {?} cur
 * @param {string} id
 * @return {undefined}
 */
function BindProductTab(path, cur, id) {
  var eCfgEl = window.ProductTab["Model" + path];
  var state = eCfgEl.filter(function(q) {
    return q.Id === id;
  })[0];
  var results = createProductFilterModel();
  var newid;
  results.filter = state.productFilter.Filter;
  results.paging = state.productFilter.Paging;
  $("#divAnasayfatab" + path + " .tabContent" + id).html(state.description);
  /** @type {string} */
  newid = "divTabProductContent" + path + id;
  ticimaxApi.product.getProductList({
    FilterJson : JSON.stringify(results.filter),
    PagingJson : JSON.stringify(results.paging)
  }, function(self) {
    self.block = {};
    self.block.listType = window.ProductTab.blockSettings.ListType;
    var t = Handlebars.compile(window.ProductTab.ProductTemplate);
    $("#" + newid).html(t(self));
    setTimeout(function() {
      if (typeof urunListCallback != "undefined") {
        urunListCallback();
      }
    }, 100);
    if (siteSettings.uyeAyar.uyelikSistemiAktif) {
      $(".favoriteslist[init='false']").trigger("onload");
    }
  });
}
/**
 * @return {undefined}
 */
function uyeCikisYap() {
  clearCartLocalStorage();
}
/**
 * @param {string} key
 * @return {undefined}
 */
function setDeliveryCountry(key) {
  location = updateQueryStringParameter(location.href, "country", key);
}
/**
 * @return {undefined}
 */
function searchDeliveryCountry() {
  var n = $("#txtHeaderSeciliUlke").val();
  if (n && n.length > 0) {
    $(".teslimatUlkeSecUl li").each(function() {
      if ($(this).text().indexOf(n) > -1 || $(this).text().toLowerCase().indexOf(n.toLowerCase()) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  } else {
    $(".teslimatUlkeSecUl li").show();
  }
}
/**
 * @return {undefined}
 */
function bindInstaStories() {
  if (document.getElementById("instaStories") != null) {
    ticimaxApi.content.getInstagramStories(null, function(data) {
      var r;
      /** @type {!Array} */
      var res = [];
      /** @type {number} */
      var i = 0;
      for (; i < data.stories.length; i++) {
        res.push({
          id : "99",
          photo : "/Uploads/Instagram/story_picture.png",
          name : data.userName,
          link : "",
          lastUpdated : "",
          seen : false,
          items : [{
            id : data.stories[i].id,
            type : data.stories[i].mediaType == "VIDEO" ? "video" : "photo",
            length : 3,
            src : data.stories[i].mediaUrl,
            preview : data.stories[i].previewImage,
            link : data.stories[i].redirectUrl,
            linkText : data.stories[i].shortDesc,
            time : Math.floor(new Date(data.stories[i].publishTime) / 1E3),
            seen : false
          }]
        });
      }
      r = new Zuck("instaStories", {
        backNative : true,
        previousTap : true,
        skin : "Snapgram",
        autoFullScreen : false,
        avatars : true,
        paginationArrows : true,
        list : false,
        cubeEffect : true,
        localStorage : true,
        stories : res,
        language : {
          unmute : "Durdurmak i\u00e7in t\u0131klay\u0131n",
          keyboardTip : "Sonrakini g\u00f6rmek i\u00e7in bo\u015fluk tu\u015funa bas\u0131n",
          visitLink : "Linki ziyaret edin",
          time : {
            ago : "\u00f6nce",
            hour : "saat",
            hours : "saatler",
            minute : "dakika",
            minutes : "dakika",
            fromnow : "\u015fu andan itibaren",
            seconds : "saniye",
            yesterday : "d\u00fcn",
            tomorrow : "yar\u0131n",
            days : "g\u00fcn"
          }
        }
      });
    });
  }
}
/**
 * @param {?} saveNotifs
 * @return {undefined}
 */
function openNewsletterPopup(saveNotifs) {
  $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Bloklar/EBultenPopup.html", function(result) {
    var value = {
      showEMail : siteSettings.siteYonetimAyar.eBultenAyar.emailGoster,
      showEMailRequired : siteSettings.siteYonetimAyar.eBultenAyar.emailZorunlu,
      showName : siteSettings.siteYonetimAyar.eBultenAyar.isimSoyisimGoster,
      showNameRequired : siteSettings.siteYonetimAyar.eBultenAyar.isimSoyisimZorunlu,
      showPhone : siteSettings.siteYonetimAyar.eBultenAyar.telefonGoster,
      showPhoneRequired : siteSettings.siteYonetimAyar.eBultenAyar.telefonZorunlu
    };
    if (!(value.showEMail || value.showPhone)) {
      /** @type {boolean} */
      value.showEMail = true;
    }
    ticimaxApi.content.getConstantContent({
      ContentId : 21
    }, function(article_data) {
      value.content = article_data.constantContent.content;
      var u = Handlebars.compile(result)(value);
      $.fancybox.open(u, {
        width : 768,
        autoHeight : true,
        autoWidth : true,
        beforeShow : function() {
          $("body").css({
            "overflow-y" : "hidden"
          });
        },
        afterClose : function() {
          $("body").css({
            "overflow-y" : "visible"
          });
        }
      });
      if (saveNotifs) {
        saveNotifs();
      }
    });
  });
}
/**
 * @param {?} n
 * @return {undefined}
 */
function getRelatedProducts(n) {
  ticimaxApi.product.getRelatedProducts({
    ProductId : n
  }, function(enrollments) {
    var _$rapyd$_Iter18;
    var summaryHTML;
    var _$rapyd$_Index18;
    var symbol;
    if (!enrollments.isError) {
      if (typeof productListRelatedProductCB != "undefined") {
        productListRelatedProductCB(enrollments);
      } else {
        _$rapyd$_Iter18 = enrollments.relatedProducts;
        /** @type {string} */
        summaryHTML = "<div class='divRelatedProductsPopup'><h3>" + translateIt("Urunler_IlgiliUrunler") + "</h3>";
        /** @type {string} */
        summaryHTML = summaryHTML + "<ul class='ulRelatedProducts'>";
        /** @type {number} */
        _$rapyd$_Index18 = 0;
        for (; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
          symbol = _$rapyd$_Iter18[_$rapyd$_Index18];
          /** @type {string} */
          summaryHTML = summaryHTML + ("<li><a href='" + symbol.url + "'><img src='" + symbol.imageThumbPath + "' /><span>" + symbol.name + "</span></a></li>");
        }
        /** @type {string} */
        summaryHTML = summaryHTML + "</ul></div>";
        createModal({
          id : "relatedProduct",
          content : summaryHTML,
          width : "50%"
        });
      }
    }
  });
}
/**
 * @return {undefined}
 */
function cancelThemePreview() {
  ticimaxApi.content.cancelThemePreview({}, function() {
    /** @type {string} */
    location = location.href;
  });
}
/**
 * @return {undefined}
 */
function productlistOwlCarousel() {
  var items = $(".productList-Image-Owl");
  items.on("initialized.owl.carousel", function(instruction) {
    var t = instruction.target;
    $(t).trigger("refresh.owl.carousel");
    if ($(t).width() >= $(t).find(".owl-item").width() + 10 || $(t).width() <= $(t).find(".owl-item").width() - 10) {
      $(t).trigger("refresh.owl.carousel");
    }
  });
  items.owlCarousel({
    loop : false,
    nav : false,
    margin : 0,
    items : 1,
    dots : true,
    mouseDrag : true,
    mouseNav : true,
    animateOut : "fadeOut",
    animateIn : "fadeIn",
    autoplay : false,
    lazyLoad : true
  });
}
/**
 * @param {string} zoomAware
 * @return {undefined}
 */
function initProductList(zoomAware) {
  setTimeout(function() {
    if (typeof urunListCallback != "undefined") {
      urunListCallback();
    }
    InitInCart();
    /** @type {boolean} */
    isProductsLoaded = true;
    if (siteSettings.uyeAyar.uyelikSistemiAktif) {
      $(".favoriteslist[init='false']").trigger("onload");
    }
    lazyLoad();
    if (siteSettings.siteYonetimAyar.urunListeImageSliderAktif || zoomAware) {
      productlistOwlCarousel();
      productlistChangeImage();
    }
  }, 100);
  setTimeout(function() {
    InitTimers();
  }, 1500);
}
/**
 * @param {number} asyncFunction
 * @param {string} extraAsyncArgs
 * @return {undefined}
 */
function getProductListDetail(asyncFunction, extraAsyncArgs) {
  ticimaxApi.product.getProductListDetail({
    ProductId : asyncFunction
  }, function(ans) {
    var message = getHandlebarTemplate("ticimax-urunItemV3");
    var resolve = Handlebars.compile(message);
    var title = resolve(ans.model);
    var elem = $(title);
    var classesLine = elem.attr("data-unique");
    $(".productItemV3[data-unique='" + extraAsyncArgs + "']").html(elem.html());
    $(".productItemV3[data-unique='" + extraAsyncArgs + "']").attr("data-unique", classesLine);
    initProductList(true);
  });
}
/**
 * @return {?}
 */
function createCacheKey() {
  /** @type {number} */
  var e = isMobileDevice() ? 1 : 0;
  var ii = globalModel.languageCode;
  var tbm = globalModel.currency;
  var _ = globalModel.member.priceType;
  var i = globalModel.langModel.countryPriceType;
  /** @type {number} */
  var d = globalModel.isAuthenticated ? 1 : 0;
  return ii + tbm + i + _ + d + e;
}
/**
 * @param {?} eltarget
 * @return {undefined}
 */
function productListVariantClick(eltarget) {
  /** @type {!Array} */
  var cgc = [];
  var $oElemDragged = $(eltarget);
  var target = $(eltarget);
  var f = target.parent();
  var elem = target.parents("[element-variantSelection=1]");
  /** @type {number} */
  var whiteRating = parseInt(target.attr("data-id"));
  /** @type {number} */
  var pageInd = parseInt(target.attr("data-parent-id"));
  var l = elem.attr("data-unique");
  /** @type {number} */
  var min_numeric_date = 0;
  var name;
  var id;
  var i;
  for (;;) {
    if ($oElemDragged = $oElemDragged.parent(), $oElemDragged.attr("data-id")) {
      cgc.push(parseInt($oElemDragged.attr("data-id")));
    } else {
      break;
    }
  }
  /** @type {string} */
  name = ".ekSecenekGrup[data-parent-id!=0]";
  /** @type {string} */
  id = ".ekSecenekGrup";
  /** @type {number} */
  i = 0;
  for (; i < cgc.length; i++) {
    /** @type {string} */
    name = name + ("[data-parent-id!=" + cgc[i] + "]");
    /** @type {string} */
    id = id + ("[data-id!=" + cgc[i] + "]");
  }
  elem.find(name).hide();
  elem.find(id).removeClass("selected");
  f.addClass("selected");
  f.find("[data-parent-id=" + whiteRating + "]").show();
  if (f.children().length == 1) {
    /** @type {number} */
    min_numeric_date = parseInt(target.attr("data-variantId"));
  }
  $("[element-addToCart=1][data-unique='" + l + "']").attr("data-variantId", min_numeric_date);
}
/**
 * @param {?} a
 * @param {number} b
 * @param {string} variableNames
 * @param {number} bindingRecords
 * @return {undefined}
 */
function productListAddToCartV3(a, b, variableNames, bindingRecords) {
  var currentElem = $(a);
  /** @type {number} */
  var top = parseInt(currentElem.attr("data-mainVariantId"));
  /** @type {number} */
  var w = parseInt(currentElem.attr("data-variantId"));
  /** @type {number} */
  var ch = parseInt(currentElem.attr("data-productId"));
  var o = currentElem.attr("data-unique");
  var nameArgs = GetControlValue(".txtSepetAdet" + o);
  /** @type {boolean} */
  var width = $("[element-variantSelection=1][data-unique='" + o + "']").length > 0;
  if (!width) {
    /** @type {number} */
    w = top;
  }
  if (bindingRecords === 1) {
    /** @type {string} */
    window.location.href = variableNames;
  } else {
    if (w > 0 || !width) {
      sepeteEkle(b > 0 ? 0 : w, nameArgs, 0, 0, b > 0 ? ch : 0, "", true, undefined, undefined, undefined, undefined, ch);
    } else {
      alert("Varyasyon se\u00e7iniz");
    }
  }
}
/**
 * @return {undefined}
 */
function bindLiteCart() {
  ticimaxApi.cart.getv2({}, function(cart) {
    var id = getHandlebarTemplate("ticimax-SepetMini");
    var service = {
      isAuthenticated : globalModel.isAuthenticated,
      cart : cart
    };
    /** @type {boolean} */
    var u = $("body #globalLiteCart").length > 0;
    var results;
    if (u) {
      var render = Handlebars.compile(id);
      var children = render(service);
      var formattedChosenQuestion = $(children).find(".miniCartRigth").html();
      $("body #divCartMiniContent .miniCartRigth").html(formattedChosenQuestion);
    } else {
      results = createProductFilterModel();
      /** @type {boolean} */
      results.filter.IsCashRegisterOffers = true;
      /** @type {number} */
      results.paging.PageItemCount = 100;
      ticimaxApi.product.getProductList({
        FilterJson : JSON.stringify(results.filter),
        PagingJson : JSON.stringify(results.paging),
        CreateFilter : false
      }, function(data) {
        var require;
        var object;
        var t;
        var u;
        if (data.products.length > 0) {
          service.products = data.products;
        }
        require = Handlebars.compile(id);
        object = require(service);
        createModal({
          id : "globalLiteCart",
          content : object,
          width : "50%"
        });
        setTimeout(function() {
          $("#divCartMiniContent").addClass("transForm");
          $(".miniCartRigth").addClass("active");
        }, 100);
        setTimeout(function() {
          $(".miniCartLeftProduct").addClass("active");
        }, 600);
        /** @type {boolean} */
        t = false;
        $(".miniCartRigthScroll").scroll(function() {
          if (u) {
            return u = false;
          }
          $(".miniCartLeftProduct").scrollTop($(this).scrollTop());
          /** @type {boolean} */
          t = true;
        });
        /** @type {boolean} */
        u = false;
        $(".miniCartLeftProduct").scroll(function() {
          if (t) {
            return t = false;
          }
          $(".miniCartRigthScroll").scrollTop($(this).scrollTop());
          /** @type {boolean} */
          u = true;
        });
      });
    }
  });
}
/**
 * @return {undefined}
 */
function v() {
  /**
   * @return {undefined}
   */
  v = function() {
  };
  if (!u.Symbol) {
    /** @type {function(string): ?} */
    u.Symbol = A;
  }
}
/**
 * @param {string} text
 * @return {?}
 */
function A(text) {
  return "jscomp_symbol_" + (text || "") + B++;
}
/**
 * @return {undefined}
 */
function initUrunDetay() {
  var n;
  var el_form_group;
  var selectvgw;
  var bcofl_checkbox;
  var i;
  var boxChild;
  var helpHAct;
  if (window.zoom = {}, window.zoom.isMobile = isMobileDevice() && $(window).width() < (typeof urunDetayZoomCozunurluk == "undefined" ? 992 : urunDetayZoomCozunurluk), window.zoom.V1 = {}, window.zoom.V1.createVideo = function() {
    var track = productDetailModel.videoSettings;
    var video;
    var source;
    var audio;
    if (track.videoLink !== "") {
      if (track.videoTagTipi === "video") {
        if ($("#vdUrunVideo").length <= 0) {
          /** @type {!Element} */
          video = document.createElement("video");
          /** @type {!Element} */
          source = document.createElement("source");
          source.src = track.videoLink;
          /** @type {string} */
          source.type = "video/mp4";
          /** @type {string} */
          video.style.width = "100%";
          video.appendChild(source);
          video.controls = track.urunDetayVideoAyar.tumKontrolleriGoster;
          video.poster = window.zoom.previewImage.bigImagePath;
          /** @type {string} */
          video.id = "vdUrunVideo";
          video.loop = track.urunDetayVideoAyar.videoYenidenBaslasin;
          video.autoPlay = track.urunDetayVideoAyar.otomatikOynat;
          if (!track.urunDetayVideoAyar.videoSesAktif) {
            /** @type {string} */
            video.muted = "muted";
          }
          video.setAttribute("webkit-playsinline", "webkit-playsinline");
          video.setAttribute("playsinline", "playsinline");
          $("#vdUrunVideo").remove();
          $("#divVideoGoruntulemeAlan").css("width", $(".imageZoomPreview").width());
          $("#divVideoGoruntulemeAlan").append(video);
        }
      } else {
        if ($("#ifrmUrunVideo").length <= 0) {
          /** @type {!Element} */
          audio = document.createElement("iframe");
          audio.setAttribute("id", "ifrmUrunVideo");
          audio.setAttribute("src", track.videoLink);
          $("#divVideoGoruntulemeAlan").append(audio);
        }
      }
    }
  }, window.zoom.V1.initPreviewImage = function() {
    var el = $("#imgUrunResim");
    /** @type {number} */
    var n = parseInt(siteSettings.urunDetayZoom.zoomPozisyon);
    /** @type {string} */
    var ch = "";
    var barMenuParentTop;
    if (n === 17) {
      /** @type {string} */
      ch = ', zoomPosition: "inside", zoomOffsetX:0';
    } else {
      if (n === 18) {
        /** @type {string} */
        ch = ", disableZoom : true ";
      } else {
        if (n !== 16) {
          /** @type {string} */
          ch = ", zoomPosition: " + n + ", zoomOffsetX:0";
        }
      }
    }
    el.attr("data-cloudzoom", "easeTime : 0 , galleryFade : false,animationTime : 0 , zoomImage:'" + window.zoom.previewImage.bigImagePath + "', zoomSizeMode : 'image' " + ch);
    el.attr("src", window.zoom.previewImage.imagePath);
    barMenuParentTop = $("#imgUrunResim").data("CloudZoom");
    if (barMenuParentTop) {
      barMenuParentTop.destroy();
    }
  }, window.zoom.V1.clickPreviweImage = function() {
    $.fancybox.open($("#imgUrunResim").data("CloudZoom").getGalleryList());
  }, window.zoom.V1.initMobileSlider = function(errorCode, type, data) {
    var i;
    var divel;
    var currentEstimate;
    var expandel;
    if ($("#divThumbList").html(""), type) {
      /** @type {number} */
      i = 0;
      for (; i < data.length; i++) {
        if (data[i].video != null) {
          /** @type {number} */
          data[i].imageOrder = 99999;
        }
      }
    }
    if (divel = $("#divMobileImageList"), typeof divel.data("lightGallery") != "undefined" && divel.data("lightGallery").destroy(true), $("#divMobileImageList").show(), $(".imageZoomPreview").hide(), $("#divThumbList").hide(), currentEstimate = {
      product : {
        images : data
      }
    }, $("#divMobileImageList").html(Handlebars.compile($("#scriptTemplateStandartMobile").html())(currentEstimate)), $("#divMobileImageList").trigger("destroy.owl.carousel").removeClass("owl-carousel owl-loaded"), $("#divMobileImageList").find(".owl-stage-outer").children().unwrap(), expandel = $("#divMobileImageList").owlCarousel({
      loop : false,
      dots : true,
      singleItem : true,
      items : 1,
      margin : 0
    }), productDetailModel.videoSettings.videoLink !== "" && productDetailModel.videoSettings.videoTagTipi === "video") {
      expandel.on("changed.owl.carousel", function(treeElement) {
        var i = treeElement.property.value;
        var expRecords;
        if ($.isNumeric(i)) {
          expRecords = $(".mobileImageSlider .owl-item").eq(i).find("#vdMobileUrunVideo");
          if (expRecords && expRecords.length > 0) {
            document.getElementById("vdMobileUrunVideo").play();
          } else {
            document.getElementById("vdMobileUrunVideo").pause();
          }
        }
      });
    }
    $("#divMobileImageList").lightGallery({
      selector : ".lightItem",
      download : false,
      getCaptionFromTitleOrAlt : false,
      thumbnail : true,
      animateThumb : true,
      showThumbByDefault : false
    });
  }, window.zoom.V1.clickThumb = function() {
    $(".imageZoomPreview").show();
    $("#divVideoGoruntulemeAlan").hide();
    $("#divUcBoyut").removeClass("active");
    $("#imgUrunResim").show();
    CloudZoom.quickStart();
    if (productDetailModel.videoSettings.videoLink !== "" && productDetailModel.videoSettings.videoTagTipi === "video") {
      document.getElementById("vdUrunVideo").pause();
    }
  }, window.zoom.V1.clickThumbVideo = function() {
    if (productDetailModel.videoSettings.videoTagTipi === "video" && $("#vdUrunVideo").length > 0) {
      document.getElementById("vdUrunVideo").play();
    }
    $(".imageZoomPreview").hide();
    $("#divVideoGoruntulemeAlan").show();
    $("#divUcBoyut").removeClass("active");
    $("#imgUrunResim").hide();
  }, window.zoom.V1.clickThumb3D = function() {
    if ($("#divUcBoyut").addClass("active"), $("#imgUrunResim").hide(), $("#divVideoGoruntulemeAlan").hide(), $(".imageZoomPreview").show(), productDetailModel.image360Type == 1 && initStandart360Image(), productDetailModel.image360Type == 3) {
      try {
        keyshotXR.Ua(370, 500);
      } catch (deprecationWarning) {
        console.warn(deprecationWarning);
      }
    }
  }, window.zoom.V1.initThumb = function(value) {
    $("#divThumbList").html(Handlebars.compile($("#scriptTemplateZoomStandartThumb").html())(value));
  }, window.zoom.V1.init = function(cb, id, nodes) {
    var dnode = {
      product : {
        images : nodes
      }
    };
    var $scope = productDetailModel.videoSettings;
    if (window.zoom.isMobile) {
      window.zoom.V1.initMobileSlider(cb, id, nodes);
    } else {
      window.zoom.previewImage = nodes.filter(function(options) {
        return options.imageType !== 3;
      }).sort(function(_pointB, _pointM) {
        return _pointB.imageOrder - _pointM.imageOrder;
      })[0];
      if (!window.zoom.previewImage) {
        window.zoom.previewImage = nodes[0];
      }
      window.zoom.V1.createVideo();
      window.zoom.V1.initPreviewImage();
      if (id) {
        window.zoom.V1.initThumb(dnode);
      }
      if ($scope.videoLink !== "" && $scope.videoTagTipi === "video" && ($scope.urunDetayVideoAyar.otomatikOynat || $scope.urunDetayVideoAyar.ilkSiradaGoster)) {
        window.zoom.V1.clickThumbVideo();
      } else {
        if (window.zoom.previewImage.imageType === 3 && $scope.videoLink === "") {
          window.zoom.V1.clickThumb3D();
        }
      }
      CloudZoom.quickStart();
    }
  }, window.zoom.V2 = {}, window.zoom.V2.init = function() {
    var expandel = $("#divProductImageCarousel").owlCarousel({
      items : 1,
      dots : true,
      slideSpeed : 3E3,
      nav : true
    });
    var divel;
    var norm;
    if (productDetailModel.videoSettings.videoLink !== "" && productDetailModel.videoSettings.videoTagTipi === "video") {
      expandel.on("changed.owl.carousel", function(treeElement) {
        var i = treeElement.property.value;
        var expRecords;
        if ($.isNumeric(i)) {
          expRecords = $("#divZoom2VideoContainer").eq(i).find("#videoZoom2");
          if (expRecords && expRecords.length > 0) {
            document.getElementById("videoZoom2").play();
          } else {
            document.getElementById("videoZoom2").pause();
          }
        }
      });
    }
    divel = $("#divProductImageCarousel");
    if (typeof divel.data("lightGallery") != "undefined") {
      divel.data("lightGallery").destroy(true);
    }
    norm = {
      selector : ".lightItem",
      download : false,
      getCaptionFromTitleOrAlt : false,
      thumbnail : true,
      animateThumb : true,
      showThumbByDefault : !window.zoom.isMobile
    };
    $("#divProductImageCarousel").lightGallery(norm);
    if (window.zoom.isMobile) {
      $("#divProductGalleryThumb").hide();
    } else {
      window.zoom.V2.initDrift();
    }
  }, window.zoom.V2.setActiveSlide = function(track, event) {
    var $player = $("#divProductImageCarousel").owlCarousel();
    $player.trigger("to.owl.carousel", [track, 300]);
    if (event === "video") {
      document.getElementById("videoZoom2").play();
    }
  }, window.zoom.V2.initDrift = function() {
    var reason;
    /** @type {!NodeList<Element>} */
    var rules = document.querySelectorAll(".wm-zoom-default-img");
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var rulesCount = rules.length;
    for (; i < rulesCount; i++) {
      /** @type {!Element} */
      reason = rules[i];
      new Drift(reason, {
        paneContainer : document.querySelector("#div-drift-container"),
        inlinePane : 500,
        inlineOffsetY : -85,
        containInline : true,
        hoverBoundingBox : true
      });
    }
    var u = $("#divProductImageCarousel");
    var stubobject = $("#div-drift-container");
    var top = u.height();
    stubobject.width(u.width());
    stubobject.height(top);
    stubobject.css("left", $(".gallery-container").outerWidth() + 20);
    $(".wm-zoom-default-img").mouseenter(function() {
      $(".drift-container").addClass("drift-index");
    }).mouseleave(function() {
      $(".drift-container").removeClass("drift-index");
    });
  }, window.zoom.init = function(target, x) {
    var elements;
    var cur;
    var r;
    if (siteSettings.urunAyar.urunDetayZoom.zoomTipi == 0) {
      elements = productDetailModel.productImages.filter(function($stateParams) {
        return $stateParams.variantId === 0;
      });
      if (target == 0 && elements.length <= 0 && productDetailModel.productImages.length > 0) {
        elements.push(productDetailModel.productImages[0]);
      }
      if (target > 0) {
        elements.pushArray(productDetailModel.productImages.filter(function(call) {
          return call.variantId === target;
        }));
      } else {
        if (target <= 0 && elements.length == 0) {
          elements.pushArray(productDetailModel.productImages.filter(function(n) {
            return n.isShowCase === 1;
          }));
        }
      }
      if (elements.length == 0) {
        elements.push(productDetailModel.productImages[0]);
      }
      if (isMobileDevice() && productDetailModel.videoSettings.videoLink != null && productDetailModel.videoSettings.videoTagTipi == "video" && elements.filter(function(widthSpecs) {
        return widthSpecs.video != null;
      }).length == 0) {
        cur = productDetailModel.productImages.filter(function(widthSpecs) {
          return widthSpecs.video != null;
        })[0];
        if (cur != null && productDetailModel.videoSettings.urunDetayVideoAyar.ilkSiradaGoster) {
          elements.unshift(cur);
        } else {
          if (cur != null) {
            elements.push(cur);
          }
        }
      }
      window.zoom.V1.init(target, x, elements);
    } else {
      if (siteSettings.urunAyar.urunDetayZoom.zoomTipi == 1) {
        window.zoom.V2.init();
        if (x) {
          r = $('#divProductImageCarousel div[data-variant="' + target + '"] img');
          if (r.length <= 0) {
            r = $('#divProductImageCarousel div[data-variant="0"] img');
          }
          r.first().click();
          if (r.length > 0) {
            $("#divProductGalleryThumb .thumb-list").animate({
              scrollTop : r.offset().top
            }, "slow");
          }
        }
        if (productDetailModel.videoSettings.videoLink != "" && productDetailModel.videoSettings.urunDetayVideoAyar.otomatikOynat) {
          window.zoom.V2.setActiveSlide(0, "video");
        }
      }
    }
  }, window.Suite = {}, window.Suite.Model = {}, window.Suite.Model.suite = productDetailModel.suite, window.Suite.bindSuite = function() {
    $.get(sablonYolu + "UrunDetay/UrunTakimAlt.html", function(FeedbackTemplate) {
      var quizTemplate = Handlebars.compile(FeedbackTemplate);
      $("#divUrunTakimAlt").html(quizTemplate(window.Suite.Model));
    });
    $.get(sablonYolu + "UrunDetay/UrunTakimUst.html", function(FeedbackTemplate) {
      var quizTemplate = Handlebars.compile(FeedbackTemplate);
      $("#divUrunTakimAlan").html(quizTemplate(window.Suite.Model));
    });
  }, window.Suite.reBind = function(el, func) {
    var s;
    var artistTrack;
    var file = productDetailModel.currencies.filter(function(n) {
      return n.dovizKodu === siteSettings.defaultCurrency.toUpperCase();
    })[0];
    var participant = productDetailModel.currencies.filter(function(n) {
      return n.dovizKodu === productDetailModel.product.paraBirimiKodu.toUpperCase();
    })[0];
    var c = {
      Tanim : file.tanim,
      FormatTanimGoster : file.formatTanimGoster,
      DilKodu : file.dilKodu,
      Format : file.format,
      DovizKodu : file.dovizKodu
    };
    var options = {
      Tanim : participant.tanim,
      FormatTanimGoster : participant.formatTanimGoster,
      DilKodu : participant.dilKodu,
      Format : participant.format,
      DovizKodu : participant.dovizKodu
    };
    /** @type {number} */
    var ret = 0;
    /** @type {number} */
    var segment = 0;
    /** @type {number} */
    var i = 0;
    for (; i < window.Suite.Model.suite.products.length; i++) {
      if (window.Suite.Model.suite.products[i].id === el) {
        if (func === 1) {
          /** @type {boolean} */
          window.Suite.Model.suite.products[i].isSelected = true;
        } else {
          if (func === 2) {
            s = window.Suite.Model.suite.products.filter(function(sender) {
              return sender.isSelected === true;
            });
            if (s.length > 1) {
              /** @type {boolean} */
              window.Suite.Model.suite.products[i].isSelected = false;
            }
          }
        }
      }
      if (window.Suite.Model.suite.products[i].isSelected) {
        window.Suite.Model.suite.products[i].quantity = parseInt($("#inptSuiteQuantity" + window.Suite.Model.suite.products[i].id).val()) || window.Suite.Model.suite.products[i].quantity;
        /** @type {number} */
        window.Suite.Model.suite.products[i].totalPrice = window.Suite.Model.suite.products[i].price * window.Suite.Model.suite.products[i].quantity;
        window.Suite.Model.suite.products[i].totalPriceStr = fiyatFormat(window.Suite.Model.suite.products[i].totalPrice, options);
        /** @type {number} */
        window.Suite.Model.suite.products[i].totalSellProductPrice = window.Suite.Model.suite.products[i].sellPrice * window.Suite.Model.suite.products[i].quantity;
        window.Suite.Model.suite.products[i].totalSellProductPriceStr = fiyatFormat(window.Suite.Model.suite.products[i].totalSellProductPrice, options);
      }
      if (window.Suite.Model.suite.products[i].isSelected) {
        ret = ret + window.Suite.Model.suite.products[i].totalPrice;
        segment = segment + window.Suite.Model.suite.products[i].totalSellProductPrice;
      }
    }
    window.Suite.Model.suite.totalProductPrice = ret;
    window.Suite.Model.suite.totalProductPriceStr = fiyatFormat(ret, options);
    window.Suite.Model.suite.totalSellProductPrice = segment;
    window.Suite.Model.suite.totalSellProductPriceStr = fiyatFormat(segment, options);
    artistTrack = {
      CampaignId : productDetailModel.suite.campaignId,
      SuiteProducts : window.Suite.Model.suite.products.filter(function(sender) {
        return sender.isSelected === true;
      })
    };
    ticimaxApi.product.suiteCalculatePrice(artistTrack, function(value) {
      var observable;
      var e_total;
      if ($("#fiyat .spanFiyat").length > 0) {
        $("#fiyat .spanFiyat").html(window.Suite.Model.suite.totalSellProductPriceStr);
      } else {
        $("#divIndirimsizFiyat .spanFiyat").html(window.Suite.Model.suite.totalSellProductPriceStr);
      }
      observable = fiyatFormat(value, options);
      $("#spnTakimUrunlerToplamTutar").html(observable);
      $("#indirimliFiyat .spanFiyat").html(observable);
      if (value < window.Suite.Model.suite.totalSellProductPrice) {
        $(".PiyasafiyatiContent").show();
        if ($("#fiyat .spanFiyat").length <= 0) {
          $("#divIndirimsizFiyat .spanFiyat").html(observable);
        }
      } else {
        $(".PiyasafiyatiContent").hide();
      }
      /** @type {number} */
      e_total = 100 - value * 100 / window.Suite.Model.suite.totalSellProductPrice;
      $(".indirimliOrani #ltrIndirimOrani").html(e_total.toFixed(0));
      $("#divTaksitAciklama .spnMiniumumTaksitTutari").html(fiyatFormat(value / productDetailModel.maxInstallment, options));
      /** @type {number} */
      urunTaksitSecenekParams.fiyat = value;
      if (havaleIndirimi > 0) {
        $("#ltrHavaleFiyati").html(fiyatFormat(value * ((100 - havaleIndirimi) / 100), options));
      } else {
        $("#ltrHavaleFiyati").html(fiyatFormat(value, options));
      }
      $("#ltrTekCekim").html(fiyatFormat(value, options));
      $("#ltrKapidaOdemeFiyati").html(fiyatFormat(value, options));
      $("#ltrKapidaOdemeKKFiyati").html(fiyatFormat(value, options));
      GetProductInstallment(value, productDetailModel.maxInstallment, options.DovizKodu);
      if (typeof suiteCallBack != "undefined") {
        suiteCallBack();
      }
    });
    window.Suite.bindSuite();
  }, window.Suite.quantityReduce = function(n) {
    azalt(n);
    window.Suite.reBind();
  }, window.Suite.quantityToIncrease = function(n) {
    artir(n);
    window.Suite.reBind();
  }, socialAppMessage = encodeURIComponent(productDetailModel.productName) + " - " + encodeURIComponent(window.location.href), fiyatTemplate = $("#scriptTemplateFiyat").html(), urunTaksitSecenekParams = {
    fiyat : productDetailModel.product.urunFiyatiOrjinal + productDetailModel.product.urunFiyatiOrjinalKDV,
    maksTaksit : productDetailModel.maxInstallment,
    dovizKodu : siteSettings.paraBirimiAktif ? productDetailModel.product.paraBirimiKodu : siteSettings.defaultCurrency.toUpperCase()
  }, fiyatObj = {
    settings : {
      IndirimOraniGoster : productDetailModel.indirimOraniGoster,
      showPrice : productDetailModel.fiyatGoster
    },
    product : {
      discountRate : 0,
      isDiscountedProduct : 0,
      productSellPrice : 2,
      discountedPrice : 1,
      vatIncludedProductSellPrice : 3,
      showLocalPrice : productDetailModel.showLocalPrice,
      localSellPrice : 1,
      productPriceKDVIncluded : productDetailModel.productPriceKDVIncluded
    }
  }, SetVisitInfo(window.location, window.location, null), SetSonZiyaretEdilenUrun(), tahminiTeslimSuresi(productDetailModel.product), $("#fuUrunSiparisDosya").length > 0) {
    try {
      $("#fuUrunSiparisDosya").jfilestyle({
        text : translateIt("DosyaSec")
      });
    } catch (c) {
      console.warn("ErrorFile");
    }
  }
  if (siteSettings.magazaModulu != null && siteSettings.magazaModuluAktif) {
    $("#divMagazaStok").show();
  }
  urunKartID = productDetailModel.productId;
  isASorti = productDetailModel.productIsAsorti;
  initEkData = productDetailModel.productVariantData || [];
  havaleIndirimi = productDetailModel.moneyOrderDiscount;
  kurlar = productDetailModel.currencies;
  urunOrjinalFiyati = productDetailModel.productPriceKDVIncluded;
  urunOrjinalFiyatiKdvHaric = productDetailModel.productPrice;
  urunOrjinalParaBirimi = productDetailModel.productCurrency;
  orjinalUrun = productDetailModel.product;
  urunDetayKapidaOdemeTutari = productDetailModel.productPayAtTheDoorPrice;
  urunDetayKapidaOdemeKKTutari = productDetailModel.productPayAtTheDoorWithCardPrice;
  boolOpenSepetPopup = productDetailModel.openCartPopup;
  kombinUrun = productDetailModel.productCombineActive;
  kombinUrunSatinAlinabilir = productDetailModel.productCombinePurchase;
  if (kombinUrun && !kombinUrunSatinAlinabilir) {
    $("#divSatinAl").remove();
    $("#divStokYok").remove();
  }
  if (siteSettings.urunDetayAdetTipi === 1) {
    $(".urunDetayAdetArttirma").hide();
  }
  $("#linkUrunDuzenle").prop("href", "/Admin/UrunIslemleri.aspx?ID=" + productDetailModel.productId);
  $("#linkUrunResimleri").prop("href", "/Admin/UrunResimleri.aspx?UrunID=0&KartID=" + productDetailModel.productId);
  $("#linkUrunVaryasyonlari").prop("href", "/Admin/VaryasyonYonetimi.aspx?ID=" + productDetailModel.productId);
  funcFavoriUrunKontrol(productDetailModel.mainVariantId);
  /** @type {number} */
  n = productDetailModel.product.stokAdedi - productDetailModel.product.eksiStokAdedi;
  if (n <= productDetailModel.memberCriticalStock && n > 0) {
    $("#divKritikStok").show();
  } else {
    $("#divKritikStok").hide();
  }
  if (siteSettings.siteYonetimAyar.outputCacheAktif) {
    ticimaxApi.product.getTotalStockAmount({
      productId : urunKartID
    }, function(tilesPerTexture) {
      try {
        if (tilesPerTexture <= 0 || !siteSettings.urunFiyatGoster || !productDetailModel.productActive) {
          productNoStockCallback(tilesPerTexture);
        } else {
          $("#divSatinAl").show();
          $("#divAdetCombo").show();
          $("#divStokYok").hide();
          $("#divTelefonSiparis").show();
          $(".UGelinceHaberVer").hide();
        }
      } catch (t) {
        productNoStockCallback(tilesPerTexture);
      }
    });
  } else {
    if (productDetailModel.totalStockAmount <= 0 || !siteSettings.urunFiyatGoster || !productDetailModel.productActive) {
      productNoStockCallback(productDetailModel.totalStockAmount);
    } else {
      $("#divSatinAl").show();
      $("#divAdetCombo").show();
      $("#divStokYok").hide();
      $("#divTelefonSiparis").show();
      $(".UGelinceHaberVer").hide();
    }
  }
  var view = getQueryStringByName("eksecenekid");
  var src = typeof urunDetay_varyasyonOtoSecili != "undefined" ? urunDetay_varyasyonOtoSecili : siteSettings.urunAyar.urunDetayVaryasyonOtomatikSec;
  var s = $("#imgUrunResim");
  if (src && s.length > 0 && s.attr("src", ""), initEkData.length > 0 && !isASorti && (ekSecenekListesiOlustur(), typeof urunDetay_varyasyonSecili != "undefined" && urunDetay_varyasyonSecili)) {
    if (el_form_group = $("div.eksecenekLine").has("span.size_box").not(".nostok"), el_form_group.length > 0) {
      $("span.size_box").not(".nostok").first().trigger(clickEvent);
    } else {
      if (el_form_group = $("div.eksecenekLine").has("select.eksecenekSelect"), selectvgw = 1, el_form_group.length > 0) {
        bcofl_checkbox = el_form_group.find("select.eksecenekSelect option");
        /** @type {number} */
        i = 1;
        for (; i < bcofl_checkbox.length; i++) {
          if (typeof $(bcofl_checkbox[i]).attr("noStock") == "undefined") {
            /** @type {number} */
            selectvgw = i;
            break;
          }
          /** @type {number} */
          selectvgw = 0;
        }
        /** @type {number} */
        $("select.eksecenekSelect:eq(0)")[0].selectedIndex = selectvgw;
        if (selectvgw > 0) {
          $("select.eksecenekSelect:eq(0)").change();
        }
      }
    }
  }
  if ($("#linkOncekiSayfa").click(function() {
    oncekiSayfa();
  }), $("#aTakimDegistir").click(function() {
    return $("html, body").animate({
      scrollTop : $($(this).attr("href")).offset().top - 80
    }, 500), false;
  }), $(".urunOzellik li:eq(0)").addClass("active"), setTimeout(function() {
    $(".urunOzellik li:eq(0) a:first").click();
  }, 500), ((productDetailModel.productIsAsorti ? false : initEkData.length > 0) && productDetailModel.totalStockAmount > 0 ? view != null || !(!src || productDetailModel.totalStockAmount <= 0) || typeof urunDetay_varyasyonSecili != "undefined" && urunDetay_varyasyonSecili && $("div.eksecenekLine").length == 1 : false) || window.zoom.init(0, false), GetAssortmentQuantities(), typeof visiLab != "undefined" && (visiLab = new Visilabs, visiLab.AddParameter("OM.pv", productDetailModel.mainVariantId), 
  visiLab.AddParameter("OM.pn", productDetailModel.productName), visiLab.AddParameter("OM.inv", productDetailModel.totalStockAmount), visiLab.AddParameter("OM.ppr", parseFloat(productDetailModel.productPriceKDVIncluded.toFixed(2))), visiLab.AddParameter("OM.pv.1", productDetailModel.brandName), visiLab.AddParameter("OM.pv.2", productDetailModel.product.urunKartiId), visiLab.Collect(), visiLab.SuggestActions()), prepareStarRaiting(), setRaingValue(), setPanelLink(), setstokBilgilendirme(), !isMobileDevice() || 
  globalModel.isAndroidDevice || globalModel.isiosDevice || (boxChild = document.getElementById("divwhatsap"), boxChild && (boxChild.style.display = "block"), helpHAct = document.getElementById("divtelegram"), helpHAct && (helpHAct.style.display = "block")), siteSettings.urunVideoAktif && siteSettings.urunVideoEkranDisinaCikincaDurdur && productDetailModel.videoSettings.videoLink != "" && productDetailModel.videoSettings.videoTagTipi == "video" && $(window).scroll(function() {
    /** @type {string} */
    var t = isMobileDevice() ? "#vdMobileUrunVideo" : "#vdUrunVideo";
    var myAudio;
    if (!$(t).is(":in-viewport")) {
      myAudio = $(t).get(0);
      myAudio.pause();
      $(myAudio).trigger("pause");
    }
  }), productDetailModel.productCombineActive && productDetailModel.productCombineType === 1 && KombinGoster(productDetailModel.productId), productlistOwlCarousel(), productlistChangeImage(), window.yorumFiltre = {
    productId : productDetailModel.productId,
    ages : [],
    ratings : [],
    order : 1,
    page : 1
  }, isMobileDevice()) {
    $(document).on("mouseenter touchstart", ".size_box.nostok", function() {
      $(".size_box.nostok .btnnostok").hide();
      $(this).find(".btnnostok").show();
    });
    $(document).on("mouseenter touchstart", "body", function(n) {
      if (!n.target.classList.contains("nostok")) {
        $(".size_box.nostok .btnnostok").hide();
      }
    });
  }
  $("body").on("click", ".ratingFiltre a", function() {
    var element = $(this).parent();
    var itemActiveCss = element.hasClass("active");
    /** @type {number} */
    var t = parseInt(element.attr("data-rating"));
    if (itemActiveCss) {
      yorumFiltre.ratings = yorumFiltre.ratings.filter(function(annotationtype) {
        return annotationtype != t;
      });
    } else {
      yorumFiltre.ratings.push(t);
    }
    element.toggleClass("active");
    TabGetComments(true);
  });
  $("body").on("click", ".yasFiltre a", function() {
    var element = $(this).parent();
    var itemActiveCss = element.hasClass("active");
    /** @type {number} */
    var t = parseInt(element.attr("data-id"));
    if (itemActiveCss) {
      yorumFiltre.ages = yorumFiltre.ages.filter(function(annotationtype) {
        return annotationtype != t;
      });
    } else {
      yorumFiltre.ages.push(t);
    }
    element.toggleClass("active");
    TabGetComments(true);
  });
  $("body").on("click", ".siralamaFiltre a", function() {
    var element = $(this).parent();
    var itemActiveCss = element.hasClass("active");
    /** @type {number} */
    var index = parseInt(element.attr("data-id"));
    if (!itemActiveCss) {
      $(".siralamaFiltre li").removeClass("active");
      /** @type {number} */
      yorumFiltre.order = index;
      element.toggleClass("active");
      TabGetComments(true);
    }
  });
  $("body").on("click", ".btnCommentPreviousPage", function() {
    yorumFiltre.page -= 1;
    TabGetComments(true);
  });
  $("body").on("click", ".btnCommentGoToPage", function() {
    /** @type {number} */
    yorumFiltre.page = parseInt($(this).attr("data-page"));
    TabGetComments(true);
  });
  $("body").on("click", ".btnCommentNextPage", function() {
    yorumFiltre.page += 1;
    TabGetComments(true);
  });
}
/**
 * @param {number} data
 * @return {undefined}
 */
function getProductDetail(data) {
  ticimaxApi.product.getProductDetail({
    ProductId : data
  }, function(raw) {
    var selector = getHandlebarTemplate("ticimax-UrunDetay");
    var expect = Handlebars.compile(selector);
    var con = expect(raw.detail);
    var u;
    $(".ProductDetail").html(con);
    productDetailModel = raw.detailModel;
    /** @type {string} */
    u = window.location.protocol + "//" + window.location.host + raw.detail.base.productUrl;
    $("#hddnUrunID").val(raw.detail.base.selectedVariantId);
    initUrunDetay();
    lazyLoad();
    if (typeof initUrunDetayCallback != "undefined") {
      initUrunDetayCallback();
    }
    initLang();
  });
}
/**
 * @return {undefined}
 */
function setstokBilgilendirme() {
  var eCfgEl = GetStokBilgilendirme();
  var expRecords = eCfgEl.filter(function(p) {
    return p.productId === productDetailModel.productId;
  }) || [];
  var jQHeader = $("#aGelinceHaberVer");
  if (expRecords.length > 0) {
    jQHeader.attr("data-haber", 1);
    jQHeader.html("<span class='box1 tipL' title='" + translateIt("UrunDetay_HaberVerIptal") + "'><i class='fa fa-mail-forward' aria-hidden='true'></i>" + translateIt("UrunDetay_HaberVerIptal") + "</span>");
  } else {
    jQHeader.attr("data-haber", 0);
    jQHeader.html("<span class='box1 tipL' title='" + translateIt("UrunDetay_GelinceHaberVer") + "'><i class='fa fa-mail-reply' aria-hidden='true'></i>" + translateIt("UrunDetay_GelinceHaberVer") + "</span>");
  }
}
/**
 * @param {!Function} n
 * @return {undefined}
 */
function setFiyatBilgilendirme(n) {
  setTimeout(function() {
    /** @type {number} */
    var id = (isASorti ? parseInt(productDetailModel.mainVariantId) : parseInt($("#hddnUrunID").val())) || 0;
    ticimaxApi.product.isPriceInformationProduct({
      productCardId : productDetailModel.productId,
      productId : id
    }, function(appid) {
      var $target = $("#aFiyatAlarmEkleBtn").length > 0 ? $("#aFiyatAlarmEkleBtn") : $("#aFiyatAlarmCikarBtn");
      if (appid) {
        $target.attr("id", "aFiyatAlarmCikarBtn");
        $target.attr("data-action", 0);
        $target.attr("title", translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.attr("data-original-title", translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.find("span").html('<i class="fa fa-arrow-down" aria-hidden="true"></i>' + translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.addClass("ButtonAktif");
        if (siteSettings.personaClickAktif) {
          personaclick("subscribe_trigger", "product_price_decrease", {
            email : globalModel.member.memberEMail,
            item : urunKartID,
            price : urunOrjinalFiyatiKdvHaric
          });
          if (siteSettings.personaClickWebPushAktif) {
            personaclick("subscribe_trigger", "product_price_decrease", {
              popup : "webpush",
              item : urunKartID,
              price : urunOrjinalFiyatiKdvHaric
            });
          }
        }
      } else {
        $target.removeClass("ButtonAktif");
        $target.attr("id", "aFiyatAlarmEkleBtn");
        $target.attr("data-action", 1);
        $target.attr("data-original-title", translateIt("UrunDetay_FiyatDusunceHaberVer"));
        $target.attr("title", translateIt("UrunDetay_FiyatDusunceHaberVer"));
        $target.find("span").html('<i class="fa fa-arrow-down" aria-hidden="true"></i>' + translateIt("UrunDetay_FiyatDusunceHaberVer"));
      }
      if (typeof n != "undefined") {
        n(appid);
      }
    });
  }, 100);
}
/**
 * @return {undefined}
 */
function setRaingValue() {
  var timeline_items = $("#stars li").parent().children("li.star");
  /** @type {number} */
  i = 0;
  for (; i < productDetailModel.rating; i++) {
    $(timeline_items[i]).addClass("selected");
  }
}
/**
 * @return {undefined}
 */
function prepareStarRaiting() {
  $("#stars li").on("mouseover", function() {
    /** @type {number} */
    var n = parseInt($(this).data("value"), 10);
    $(this).parent().children("li.star").each(function(hits) {
      if (hits < n) {
        $(this).addClass("hover");
      } else {
        $(this).removeClass("hover");
      }
    });
  }).on("mouseout", function() {
    $(this).parent().children("li.star").each(function() {
      $(this).removeClass("hover");
    });
  });
  $("#stars li").on("click", function() {
    var point;
    var bcofl_checkbox;
    var colorred;
    if (!globalModel.isAuthenticated) {
      if (siteSettings.uyeGirisPopupAktif) {
        window.mem.init.bind("login");
      } else {
        /** @type {string} */
        window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
      }
      return;
    }
    /** @type {number} */
    point = parseInt($(this).data("value"), 10);
    bcofl_checkbox = $(this).parent().children("li.star");
    /** @type {number} */
    i = 0;
    for (; i < bcofl_checkbox.length; i++) {
      $(bcofl_checkbox[i]).removeClass("selected");
    }
    /** @type {number} */
    i = 0;
    for (; i < point; i++) {
      $(bcofl_checkbox[i]).addClass("selected");
    }
    /** @type {number} */
    colorred = parseInt($("#stars li.selected").last().data("value"), 10);
    ticimaxApi.product.saveProductRate({
      Point : point,
      ProductId : productDetailModel.productId
    }, function(options) {
      if (!options.isError) {
        TiciNoty.Show({
          message : translateIt("UrunePuanVerdiniz").format(colorred.toString()),
          type : "success"
        });
      }
    });
  });
}
/**
 * @return {undefined}
 */
function blocksLoaded() {
}
/**
 * @param {number} n
 * @return {undefined}
 */
function productNoStockCallback(n) {
  $("#divSatinAl").hide();
  $("#divAdetCombo").hide();
  if (n > 0 && !siteSettings.urunFiyatGoster && productDetailModel.productActive) {
    $("#divStokYok").html(translateIt("Favorilerim_FiyatSorun"));
    $("#divUrunEkSecenek").hide();
  }
  $("#divStokYok").show();
  $("#divTelefonSiparis").hide();
  $(".UGelinceHaberVer").show();
}
/**
 * @param {?} items
 * @return {undefined}
 */
function ekSecenekListesiOlustur(items) {
  var a;
  var o;
  var h;
  var c;
  var r;
  var j;
  var user;
  var mean;
  var isSelected;
  var idColumn;
  var item;
  var me;
  $("#hddnUrunID").val("0");
  if (typeof items != "undefined") {
    $(items).nextAll().remove();
  }
  /** @type {!Array} */
  selectedIDList = [];
  $("div.eksecenekLine").each(function() {
    if ($(this).find("select").length > 0) {
      if ($(this).find("select").val() != "undefined" || $(this).find("select").val() != "-1") {
        selectedIDList.push({
          ekSecenekId : parseInt($(this).find("select").val()),
          tipId : parseInt($(this).find("select :selected").attr("tipId")),
          urunList : $(this).find("select :selected").data("urunList")
        });
      }
    } else {
      if ($(this).find("span.size_box.selected").length > 0) {
        selectedIDList.push({
          ekSecenekId : parseInt($(this).find("span.size_box.selected").attr("rel")),
          tipId : parseInt($(this).find("span.size_box.selected").attr("tipId")),
          urunList : $(this).find("span.size_box.selected").data("urunList")
        });
      }
    }
  });
  var n = selectedIDList[selectedIDList.length - 1];
  var bottom = selectedIDList.length > 0 ? initEkData.filter(function(updated) {
    return n.ekSecenekId === updated.id && n.urunList.map(function(timeline_mode) {
      return timeline_mode.id;
    }).indexOf(updated.urunID) > -1;
  }) : initEkData;
  var level = selectedIDList.length > 0 ? initEkData.filter(function(setting) {
    return bottom.map(function(n) {
      return n.urunID;
    }).indexOf(setting.urunID) > -1 && selectedIDList.map(function(n) {
      return n.tipId;
    }).indexOf(setting.tipID) < 0;
  }) : bottom;
  var input = ekSecenekGrupla(level);
  if (input.length > 0) {
    if (a = input[0], o = $("<div/>").addClass("eksecenekLine"), $("<span/>").addClass("left_line").html(a.tanim).appendTo(o), $("<span>:</span>").addClass("center_line").appendTo(o), h = $("<span/>").addClass("right_line"), a.ekSecenekListeTipi === 1) {
      o.addClass("selectvaryasyon");
      c = $("<select/>").attr("name", "ddlEkSecenek" + $(".eksecenekSelect").length).addClass("eksecenekSelect");
      r = $("<option/>").attr("value", "-1").html(translateIt("Urunler_Seciniz"));
      r.appendTo(c);
      /** @type {number} */
      j = 0;
      for (; j < a.ekSecenekList.length; j++) {
        user = a.ekSecenekList[j];
        /** @type {number} */
        mean = 0;
        user.urunList.map(function(result) {
          return mean = mean + result.stokAdedi;
        });
        r = mean > 0 ? $("<option/>").data("urunList", user.urunList).attr("tipId", a.id).attr("value", user.id).html(user.tanim) : $("<option/>").html(user.tanim + " " + translateIt("UrunListesi_Tukendi")).prop("disabled", true).attr("noStock", true);
        r.appendTo(c);
      }
      c.change(function() {
        if ($(this).val() != "-1") {
          ekSecenekListesiOlustur($(this).parent().parent());
        } else {
          $("#hddnUrunID").val("0");
          $(this).parent().parent().nextAll().remove();
        }
      });
      c.appendTo(h);
    } else {
      if (a.ekSecenekListeTipi === 2) {
        o.addClass("kutuluvaryasyon");
        /** @type {number} */
        j = 0;
        for (; j < a.ekSecenekList.length; j++) {
          user = a.ekSecenekList[j];
          /** @type {number} */
          mean = 0;
          user.urunList.map(function(result) {
            return mean = mean + result.stokAdedi;
          });
          r = $("<span/>").addClass("size_box").data("urunList", user.urunList).attr("data-stock", mean).attr("rel", user.id).attr("tipId", a.id).html(user.tanim);
          if (!(mean > 0)) {
            r.addClass("nostok");
            isSelected = globalModel.isAuthenticated ? user.stokBilgilendir : false;
            if (user.urunList.length > 1) {
              r.append("<span class='btnnostok " + (isSelected ? "selected" : "") + "' style='display:none;' onclick='varyasyonGelinceHaberVer(this)' data-kart-id='" + user.urunKartId + "' data-urun-id='0' data-eksecenek-id='" + user.id + "'>" + translateIt("UrunDetay_GelinceHaberinOlsun") + " <i class='fa " + (isSelected ? "fa-check-circle" : "fa-circle-thin") + "' aria-hidden='true'></i></span>");
            } else {
              r.append("<span class='btnnostok " + (isSelected ? "selected" : "") + "' style='display:none;' onclick='varyasyonGelinceHaberVer(this)' data-kart-id='" + user.urunKartId + "' data-urun-id='" + user.urunList[0].id + "' data-eksecenek-id='0'>" + translateIt("UrunDetay_GelinceHaberinOlsun") + " <i class='fa " + (isSelected ? "fa-check-circle" : "fa-circle-thin") + "' aria-hidden='true'></i></span>");
            }
          }
          r.appendTo(h);
        }
      } else {
        if (a.ekSecenekListeTipi === 3) {
          o.addClass("resimlivaryasyon");
          /** @type {number} */
          j = 0;
          for (; j < a.ekSecenekList.length; j++) {
            user = a.ekSecenekList[j];
            /** @type {number} */
            mean = 0;
            user.urunList.map(function(result) {
              return mean = mean + result.stokAdedi;
            });
            r = $("<span/>").addClass("size_box").data("urunList", user.urunList).attr("data-stock", mean).attr("rel", user.id).attr("tipId", a.id).attr("title", user.tanim).html($("<img/>").attr("src", "/Uploads/VaryasyonResim/" + user.resim).attr("alt", user.tanim));
            if (!(mean > 0)) {
              r.addClass("nostok");
              isSelected = globalModel.isAuthenticated ? user.stokBilgilendir : false;
              if (user.urunList.length > 1) {
                r.append("<span class='btnnostok " + (isSelected ? "selected" : "") + "' style='display:none;' onclick='varyasyonGelinceHaberVer(this)' data-kart-id='" + user.urunKartId + "' data-urun-id='0' data-eksecenek-id='" + user.id + "'>" + translateIt("UrunDetay_GelinceHaberinOlsun") + " <i class='fa " + (isSelected ? "fa-check-circle" : "fa-circle-thin") + "' aria-hidden='true'></i></span>");
              } else {
                r.append("<span class='btnnostok " + (isSelected ? "selected" : "") + "' style='display:none;' onclick='varyasyonGelinceHaberVer(this)' data-kart-id='" + user.urunKartId + "' data-urun-id='" + user.urunList[0].id + "' data-eksecenek-id='0'>" + translateIt("UrunDetay_GelinceHaberinOlsun") + " <i class='fa " + (isSelected ? "fa-check-circle" : "fa-circle-thin") + "' aria-hidden='true'></i></span>");
              }
            }
            r.appendTo(h);
          }
        }
      }
    }
    h.appendTo(o);
    o.appendTo($("#divUrunEkSecenek"));
    if (typeof ekSecenekListesiOlusturCallback != "undefined") {
      ekSecenekListesiOlusturCallback(a.ekSecenekListeTipi);
    }
  } else {
    $(items).nextAll().remove();
    idColumn = n.urunList[0].id;
    item = productDetailModel.products.filter(function(column) {
      return column.id === idColumn;
    })[0];
    $("#hddnUrunID").val(item.id);
    if (otomatikVaryasyonFavoriEkle && GetFavoriListe().filter(function(context) {
      return context.variantId === item.id;
    }).length === 0) {
      /** @type {boolean} */
      otomatikVaryasyonFavoriEkle = false;
      FavoriUrunDetay(true);
    }
    if (otomatikVaryasyonIstekEkle) {
      /** @type {boolean} */
      otomatikVaryasyonIstekEkle = false;
      IstekListemeEkle();
    }
    bindUrunBilgileri(item);
    if (otomatikVaryasyonFiyatAlarmEkle) {
      /** @type {boolean} */
      otomatikVaryasyonFiyatAlarmEkle = false;
      setFiyatBilgilendirme(function(n) {
        if (n) {
          TiciNoty.Show({
            message : translateIt("GlobalMasterPage_UyariFiyatAlarmEklendi"),
            type : "info"
          });
        } else {
          FiyatAlarmListeUrunDetay();
        }
      });
    } else {
      setFiyatBilgilendirme();
    }
    console.log(otomatikSepeteEkle + new Date);
    if (otomatikSepeteEkle) {
      sepeteEkleUrunDetay(function() {
        /** @type {boolean} */
        otomatikSepeteEkle = false;
      });
    }
    window.zoom.init(item.id, true);
    funcFavoriUrunKontrol(item.id);
    funcIstekUrunKontrol(item.id);
    if (typeof ekSecenekListesiCallBack != "undefined") {
      ekSecenekListesiCallBack();
    }
  }
  if (siteSettings.dinamikForm.formSistemiAktif && siteSettings.dinamikForm.urunDetayFormAktif && siteSettings.dinamikForm.urunDetayFiyatCarpanAktif && productDetailModel.formId > 0) {
    me = $("#fspricemultiplier input");
    if (me.length > 0) {
      me.trigger("keyup");
    }
  }
}
/**
 * @param {number} j
 * @return {undefined}
 */
function ekSecenekListesiOlusturCallback(j) {
  var arg = getQueryStringByName("eksecenekid");
  var P = typeof urunDetay_varyasyonOtoSecili != "undefined" ? urunDetay_varyasyonOtoSecili : siteSettings.urunAyar.urunDetayVaryasyonOtomatikSec;
  var k;
  var n;
  var destIndex;
  var r;
  var i;
  var last_in_row_index;
  if (arg || P) {
    if (k = $("div.eksecenekLine").has("*").length, j == 1) {
      if (n = 0, destIndex = $("select.eksecenekSelect").length, k == 1 && arg) {
        $("select[name='ddlEkSecenek0']").val(arg).change();
      } else {
        r = $("select[name='ddlEkSecenek" + (destIndex - 1) + "'] option");
        /** @type {number} */
        i = 1;
        for (; i < r.length; i++) {
          if (typeof $(r[i]).attr("noStock") == "undefined") {
            /** @type {number} */
            n = i;
            break;
          }
        }
        r.eq(n).prop("selected", true).change();
      }
    } else {
      if (j > 1) {
        last_in_row_index = $("div.eksecenekLine").has("span.size_box").length;
        if (k == 1 && arg) {
          $("span.size_box[rel='" + arg + "']").trigger(clickEvent);
        } else {
          $("div.eksecenekLine").has("span.size_box").eq(last_in_row_index - 1).find("span.size_box").not(".nostok").first().trigger(clickEvent);
        }
      }
    }
  }
}
/**
 * @param {!Object} e
 * @return {undefined}
 */
function bindUrunBilgileri(e) {
  var s;
  var w;
  var shared;
  var right;
  var c;
  var make_gene_data_object;
  var gene_data_object;
  var photoText;
  var classesLine;
  /** @type {!Object} */
  orjinalUrun = e;
  if (e.stokKodu != "") {
    s = $("#divUrunKodu");
    s.html("(" + e.stokKodu + ")");
    s.attr("content", "mpn:" + e.stokKodu);
  }
  if (e.barkod != "") {
    $("#divBarkod").show();
    $("#spnBarkod").html(e.barkod);
  } else {
    $("#divBarkod").hide();
  }
  var h = e.paraBirimiKodu;
  var file = productDetailModel.currencies.filter(function(n) {
    return n.dovizKodu == h.toUpperCase();
  })[0];
  var submitForgotPass = {
    Tanim : file.tanim,
    FormatTanimGoster : file.formatTanimGoster,
    DilKodu : file.dilKodu,
    Format : file.format,
    DovizKodu : file.dovizKodu
  };
  var participant = productDetailModel.currencies.filter(function(n) {
    return n.dovizKodu == siteSettings.defaultCurrency.toUpperCase();
  })[0];
  var abCD = {
    Tanim : participant.tanim,
    FormatTanimGoster : participant.formatTanimGoster,
    DilKodu : participant.dilKodu,
    Format : participant.format,
    DovizKodu : participant.dovizKodu
  };
  var StringFce = productDetailModel.currencies.filter(function(n) {
    return n.dovizKodu == globalModel.currency.toUpperCase();
  })[0];
  var a = {
    Tanim : StringFce.tanim,
    FormatTanimGoster : StringFce.formatTanimGoster,
    DilKodu : StringFce.dilKodu,
    Format : StringFce.format,
    DovizKodu : StringFce.dovizKodu
  };
  /** @type {({DilKodu: ?, DovizKodu: ?, Format: ?, FormatTanimGoster: ?, Tanim: ?})} */
  var type = siteSettings.paraBirimiAktif ? a : submitForgotPass;
  /** @type {({DilKodu: ?, DovizKodu: ?, Format: ?, FormatTanimGoster: ?, Tanim: ?})} */
  var ab = siteSettings.paraBirimiAktif ? a : abCD;
  if (e.spotResimYolu.length > 0) {
    $("#imgUrunResim").attr("src", e.spotResimYolu);
  }
  $("#divUrunStokAdediIcerik").html(e.stokAdedi);
  /** @type {number} */
  w = e.stokAdedi - e.eksiStokAdedi;
  if (w <= productDetailModel.memberCriticalStock && w > 0) {
    $("#divKritikStok").show();
  } else {
    $("#divKritikStok").hide();
  }
  /** @type {string} */
  shared = e.kdvOrani > 0 ? "(" + translateIt("Global_KdvDahil") + ")" : "";
  right = e.kdvOrani > 0 ? translateIt("GlobalArtiKDV") : "";
  fiyatObj.product.discountRate = e.indirimOrani;
  fiyatObj.product.showVatIncludedPrice = !e.kdvDahil && siteSettings.urunAyar.urunDetayAyar.kdvDahilFiyatGoster;
  c = $("#ltrIndirimOrani");
  if (c.length > 0) {
    c.html(fiyatObj.product.discountRate);
  }
  urunOrjinalFiyatiKdvHaric = e.urunFiyatiOrjinal;
  fiyatObj.product.productPriceKDVIncluded = e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV;
  /** @type {string} */
  fiyatObj.product.productSellPrice = "<span class='spanFiyat'>" + e.satisFiyatiStr + "</span>";
  if (e.kdvOrani > 0) {
    fiyatObj.product.productSellPrice += "<span class='spanKdv'>" + (e.kdvDahil ? shared : right) + "</span>";
  }
  /** @type {string} */
  fiyatObj.product.discountedPrice = "<span class='spanFiyat'>" + e.urunFiyatiOrjinalKurHaricStr + "</span>";
  if (e.kdvOrani > 0) {
    fiyatObj.product.discountedPrice += "<span class='spanKdv'>" + (e.kdvDahil ? shared : right) + "</span>";
  }
  /** @type {string} */
  fiyatObj.product.localSellPrice = "<span class='spanFiyat'>" + fiyatFormat(e.urunSepetFiyati + e.urunSepetFiyatiKDV, ab) + "</span>";
  if (e.kdvOrani > 0) {
    fiyatObj.product.localSellPrice += "<span class='spanKdv'>" + shared + "</span>";
  }
  /** @type {string} */
  fiyatObj.product.vatIncludedProductSellPrice = "<span class='spanFiyat'>" + fiyatFormat(e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV, ab) + "</span>";
  /** @type {boolean} */
  fiyatObj.product.showLocalPrice = siteSettings.paraBirimiAktif || e.paraBirimiKodu == "TRY" ? false : true;
  if (e.urunFiyatiOrjinalKurHaric != e.satisFiyati) {
    /** @type {boolean} */
    fiyatObj.product.isDiscountedProduct = true;
    $("#divIndirimliUrun").show();
  } else {
    /** @type {boolean} */
    fiyatObj.product.isDiscountedProduct = false;
    $("#divIndirimliUrun").hide();
  }
  /** @type {boolean} */
  fiyatObj.settings.showDiscountRate = e.indirimOrani > 0 ? true : false;
  make_gene_data_object = Handlebars.compile(fiyatTemplate);
  gene_data_object = make_gene_data_object(fiyatObj);
  $("#divFiyatAlanlari").html(gene_data_object);
  if (havaleIndirimi > 0) {
    $("#ltrHavaleFiyati").html(fiyatFormat((e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal) * ((100 - havaleIndirimi) / 100), ab));
  } else {
    $("#ltrHavaleFiyati").html(fiyatFormat(e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal, ab));
  }
  $("#ltrTekCekim").html(fiyatFormat(e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal, ab));
  $("#ltrKapidaOdemeFiyati").html(fiyatFormat((e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal) + urunDetayKapidaOdemeTutari, ab));
  $("#ltrKapidaOdemeKKFiyati").html(fiyatFormat((e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal) + urunDetayKapidaOdemeKKTutari, ab));
  $("#ltrHavaleFiyati").html(fiyatFormat((e.kdvDahil ? e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV : e.urunFiyatiOrjinal) - (e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV) / 100 * siteSettings.odemeAyarlari.havaleIndirimYuzde, ab));
  if (e.kdvDahil) {
    $("#divHavaleFiyati span.spanKdv,#divTekCekimFiyati span.spanKdv,#divKapidaOdemeKKFiyati span.spanKdv,#divKapidaOdemeFiyati span.spanKdv,#divKDVDahilFiyat").hide();
  } else {
    /** @type {string} */
    photoText = '<span class="spanKdv">' + right + "</span>";
    $("#divTekCekimFiyati span.spanKdv").remove();
    $("#divHavaleFiyati span.spanKdv").remove();
    $("#divKapidaOdemeFiyati span.spanKdv").remove();
    $("#divTekCekimFiyati").append(photoText);
    $("#divHavaleFiyati").append(photoText);
    $("#divKapidaOdemeFiyati").append(photoText);
    $("#divKapidaOdemeKKFiyati").append(photoText);
    $("#divTekCekimFiyati span.spanKdv,#divHavaleFiyati span.spanKdv,#divKapidaOdemeFiyati span.spanKdv,#divKDVDahilFiyat").show();
  }
  if ($(".printBtn").length > 0) {
    /** @type {string} */
    classesLine = "/Print/UrunDetay.aspx?UrunKod=" + productDetailModel.productId + "&PBDK=" + submitForgotPass.DovizKodu + "&UrunId=" + e.id;
    $(".printBtn").attr("href", classesLine);
  }
  tahminiTeslimSuresi(e);
  urunTaksitSecenekParams.fiyat = e.urunSepetFiyati + e.urunSepetFiyatiKDV;
  urunTaksitSecenekParams.maksTaksit = productDetailModel.maxInstallment;
  urunTaksitSecenekParams.dovizKodu = ab.DovizKodu;
  GetProductInstallment(urunTaksitSecenekParams.fiyat, urunTaksitSecenekParams.maksTaksit, urunTaksitSecenekParams.dovizKodu);
  if (typeof visiLab != "undefined") {
    visiLab = new Visilabs;
    visiLab.AddParameter("OM.pv", e.id);
    visiLab.AddParameter("OM.pn", productDetailModel.productName);
    visiLab.AddParameter("OM.inv", productDetailModel.totalStockAmount);
    visiLab.AddParameter("OM.ppr", parseFloat(productDetailModel.productPriceKDVIncluded.toFixed(2)));
    visiLab.AddParameter("OM.pv.1", productDetailModel.brandName);
    visiLab.AddParameter("OM.pv.2", productDetailModel.product.urunKartiId);
    visiLab.AddParameter("OM.variant", true);
    visiLab.Collect();
    visiLab.SuggestActions();
  }
  kampanyaHesapla(e.urunKartiId, e.id, e.urunFiyatiOrjinal + e.urunFiyatiOrjinalKDV);
}
/**
 * @param {!Object} instance
 * @return {undefined}
 */
function tahminiTeslimSuresi(instance) {
  if (instance.tahminiTeslimSuresiGoster) {
    $("#divTahminiTeslimatSuresi").show();
    if (instance.tahminiTeslimSuresiAyniGun) {
      $("#spnTahminiTeslimSuresi").html(translateIt("Global_AyniGun"));
    } else {
      if (productDetailModel.estimatedDeliveryTimeShowType === 2) {
        $("#spnTahminiTeslimSuresi").html(instance.tahminiTeslimSuresiTarihi);
      } else {
        if (instance.tahminiTeslimSuresi > 0) {
          if (productDetailModel.estimatedDeliveryTimeShowType === 1) {
            $("#spnTahminiTeslimSuresi").html(instance.tahminiTeslimSuresiTarihi);
          } else {
            $("#spnTahminiTeslimSuresi").html(instance.tahminiTeslimSuresi + " " + translateIt("Global_Gun"));
          }
        }
      }
    }
  } else {
    $("#divTahminiTeslimatSuresi").hide();
  }
}
/**
 * @return {?}
 */
function kendinTasarlaClick() {
  if ($("#hddnUrunID").val() == "0") {
    return varyasyonUyari(), false;
  }
  var val = $("#imgUrunResim").attr("src");
  if (val == "") {
    val = $("#divMobileImageList .owl-item.active .lightItem img").attr("src");
  }
  if (siteSettings.cdnAyar.statikCdnAktif) {
    val = val.replace(siteSettings.cdnAyar.statikCdnUrl, "");
  }
  fabric.Image.fromURL(val, function(size) {
    canvas.setHeight(size.height);
    canvas.setWidth(size.width);
    canvas.calcOffset();
    canvas.renderAll();
    canvas.setBackgroundImage(val, canvas.renderAll.bind(canvas), {
      scaleX : 1,
      scaleY : 1
    });
  });
  $.fancybox({
    href : "#divKendinTasarla",
    titleShow : false,
    transitionIn : "elastic",
    transitionOut : "elastic"
  });
}
/**
 * @return {undefined}
 */
function varyasyonUyari() {
  yenialert();
}
/**
 * @return {undefined}
 */
function yenialert() {
  $("body").addClass("urunsecbody");
  $(".urunsecbody .urunsecoverlay").fadeIn();
  $("#divUrunEkSecenek").append("<div class='tooltipp'>" + translateIt("Validation_LutfenSecimYapin") + "<i></i></div>");
  setTimeout(function() {
    smoothScrollTo($("#divUrunEkSecenek"), 100);
  }, 200);
}
/**
 * @return {?}
 */
function validateProductFile() {
  var r;
  var value;
  var y;
  var t;
  var msg_obj;
  var fileList = document.getElementById("fuUrunSiparisDosya").files;
  /** @type {number} */
  var i = 0;
  for (; i < fileList.length; i++) {
    if (r = fileList[i].size / 1048576, r > 5) {
      TiciNoty.Show({
        message : "Y\u00fckledi\u011finiz dosya(lar) i\u00e7erisinde 5MB a\u015fan dosyalar bulunmaktad\u0131r.",
        type : "danger"
      });
      return;
    }
  }
  if (fileList.length <= 0 && productDetailModel.productFileUploadIsRequire) {
    TiciNoty.Show({
      message : "L\u00fctfen \u00fcr\u00fcne dosya y\u00fckleyiniz.",
      type : "danger"
    });
    return;
  }
  if (fileList.length > productDetailModel.productFileUploadMaxSize) {
    TiciNoty.Show({
      message : "Maximum " + productDetailModel.productFileUploadMaxSize + " dosya y\u00fckleyebilirsiniz.",
      type : "danger"
    });
    return;
  }
  if (fileList.length > 0) {
    /** @type {!Array} */
    value = ["gif", "png", "jpeg", "jpg", "doc", "docx", "xls", "pdf", "zip", "rar"];
    /** @type {number} */
    i = 0;
    for (; i < fileList.length; i++) {
      if (y = fileList[i].name.substring(fileList[i].name.lastIndexOf(".") + 1, fileList[i].name.length).toLowerCase(), t = value.filter(function(x_or_y) {
        return x_or_y === y;
      }), t.length <= 0) {
        return msg_obj = "Dosya tipi desteklenmemektedir. Dosya sipari\u015finize eklenmeyecektir, l\u00fctfen y\u00fcklediniz dosya(lar\u0131) kontrol ediniz. Desteklenen dosya tipleri " + value.toString(), TiciNoty.Show({
          message : msg_obj,
          type : "danger"
        }), false;
      }
    }
    return true;
  }
  return true;
}
/**
 * @param {string} n$jscomp$229
 * @return {?}
 */
function sepeteEkleUrunDetay(n$jscomp$229) {
  var i$jscomp$100;
  var r$jscomp$68;
  var t$jscomp$136;
  var u$jscomp$60;
  if (isASorti) {
    var f$jscomp$40 = $("#txtbxurunSiparisAdedi").length > 0 ? $("#txtbxurunSiparisAdedi").val() : $("#ddlUrunSiparisAdedi").val();
    var e$jscomp$41 = $("#txtbxUrunKisiselNot").length > 0 ? $("#txtbxUrunKisiselNot").val() : "";
    /** @type {*} */
    var s$jscomp$21 = eval($("input.urunuEtkileyenKampanyaSecenek:checked").val());
    var o$jscomp$24 = typeof sepeteEkleUyariAktif == "undefined" ? true : sepeteEkleUyariAktif;
    sepeteEkle(0, f$jscomp$40, 0, 0, urunKartID, e$jscomp$41, boolOpenSepetPopup, n$jscomp$229, undefined, o$jscomp$24, undefined, urunKartID);
  } else {
    if (parseInt($("#hddnUrunID").val()) !== 0) {
      if (siteSettings.urunDosyaYuklemeAktif && productDetailModel.productFileUploadActive && !validateProductFile()) {
        return false;
      }
      if (siteSettings.dinamikForm.formSistemiAktif && siteSettings.dinamikForm.urunDetayFormAktif && productDetailModel.formId > 0) {
        if (i$jscomp$100 = $("#ngFormController").scope(), r$jscomp$68 = i$jscomp$100.formValid, siteSettings.dinamikForm.urunDetayFiyatCarpanAktif && (t$jscomp$136 = i$jscomp$100.$parent.fields.filter(function(verifiedEvent) {
          return verifiedEvent.type === "pricemultiplier";
        }), t$jscomp$136.length > 0 && (t$jscomp$136 = t$jscomp$136[0], u$jscomp$60 = t$jscomp$136.options.filter(function(n) {
          return n.value !== "" && n.value !== null && n.value !== 0;
        }), u$jscomp$60.length > 0 && t$jscomp$136.options.length !== u$jscomp$60.length && (r$jscomp$68 = false))), r$jscomp$68) {
          angular.element(document.getElementById("ngFormController")).scope().Save(true, n$jscomp$229);
          angular.element(document.getElementById("ngFormController")).scope().$apply();
        } else {
          return angular.element(document.getElementById("ngFormController")).scope().Save(false), angular.element(document.getElementById("ngFormController")).scope().$apply(), TiciNoty.Show({
            message : translateIt("LutfenFormAlanlariniDoldurunuz"),
            type : "danger"
          }), false;
        }
      } else {
        ekleRes = OnUrunDetaySepeteEkleCallBack(0, n$jscomp$229);
      }
    } else {
      varyasyonUyari();
      /** @type {boolean} */
      ekleRes = false;
      /** @type {boolean} */
      otomatikSepeteEkle = true;
    }
  }
  return ekleRes;
}
/**
 * @param {!Function} upgrade
 * @param {!Object} t
 * @return {?}
 */
function OnUrunDetaySepeteEkleCallBack(upgrade, t) {
  console.log(new Date);
  /** @type {number} */
  var b_t = parseFloat($("#txtbxurunSiparisAdedi").length > 0 ? $("#txtbxurunSiparisAdedi").val() : $("#ddlUrunSiparisAdedi").val());
  var r = $("#txtbxUrunKisiselNot").length > 0 ? $("#txtbxUrunKisiselNot").val() : "";
  var task_descr_h = typeof sepeteEkleUyariAktif == "undefined" ? true : sepeteEkleUyariAktif;
  return ekleRes = sepeteEkle(parseInt($("#hddnUrunID").val()), b_t, 0, 0, 0, r, boolOpenSepetPopup, t, upgrade, task_descr_h, undefined, urunKartID, productDetailModel.isSuite), $("#txtbxUrunKisiselNot").length > 0 && $("#txtbxUrunKisiselNot").val(""), setTimeout(function() {
  }, 1E3), ekleRes;
}
/**
 * @param {boolean} littleEndian
 * @return {undefined}
 */
function FavoriUrunDetay(littleEndian) {
  var QueryLanguageComponent;
  if (!globalModel.isAuthenticated) {
    if (siteSettings.uyeGirisPopupAktif) {
      window.mem.init.bind("login");
    } else {
      /** @type {string} */
      window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
    }
    return;
  }
  var $target = $("#aFavoriEkleBtn").length > 0 ? $("#aFavoriEkleBtn") : $("#aFavroriCikarBtn");
  /** @type {number} */
  var currentPosition = (isASorti ? parseInt(productDetailModel.mainVariantId) : parseInt($("#hddnUrunID").val())) || 0;
  /** @type {number} */
  var direction = 0;
  /** @type {number} */
  direction = littleEndian ? GetFavoriListe().filter(function($stateParams) {
    return $stateParams.variantId === currentPosition;
  }).length == 0 ? 1 : 0 : parseInt($target.attr("data-action"));
  if (direction === 1 ? currentPosition > 0 : true) {
    /** @type {number} */
    QueryLanguageComponent = parseFloat($("#txtbxurunSiparisAdedi").length > 0 ? $("#txtbxurunSiparisAdedi").val() : $("#ddlUrunSiparisAdedi").val()) || 1;
    productFavoritesProcess(direction, 1, productDetailModel.productId, currentPosition, QueryLanguageComponent);
    if (direction === 1) {
      $target.attr("id", "aFavroriCikarBtn");
      $target.attr("data-action", 0);
      $target.attr("title", translateIt("Favorilerim_FavorilerdenKaldir"));
      $target.attr("data-original-title", translateIt("Favorilerim_FavorilerdenKaldir"));
      $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerdenKaldir"));
    } else {
      $target.attr("id", "aFavoriEkleBtn");
      $target.attr("data-action", 1);
      $target.attr("data-original-title", translateIt("Favorilerim_FavorilerimeEkle"));
      $target.attr("title", translateIt("Favorilerim_FavorilerimeEkle"));
      $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerimeEkle"));
    }
    if (typeof FavoriIslemCallback != "undefined") {
      FavoriIslemCallback();
    }
  } else {
    /** @type {boolean} */
    otomatikVaryasyonFavoriEkle = true;
    varyasyonUyari();
  }
}
/**
 * @return {undefined}
 */
function IstekListemeEkle() {
  /** @type {number} */
  var proxy_pair = isASorti ? parseInt(productDetailModel.mainVariantId) : parseInt($("#hddnUrunID").val());
  var t;
  if (proxy_pair > 0) {
    if (!globalModel.isAuthenticated) {
      if (siteSettings.uyeGirisPopupAktif) {
        window.mem.init.bind("login");
      } else {
        /** @type {string} */
        window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
      }
      return;
    }
    /** @type {boolean} */
    t = $("#aIstekListeEkle").length > 0;
    if (t) {
      ticimaxApi.product.saveProductWish({
        VaryantId : proxy_pair,
        ProcessType : 1
      }, function(result) {
        if (result.isError) {
          TiciNoty.Show({
            message : result.errorMessage,
            type : "danger"
          });
        } else {
          $("#aIstekListeEkle").attr("title", translateIt("UrunDetay_IstekListeCikar"));
          $("#aIstekListeEkle").attr("data-original-title", translateIt("UrunDetay_IstekListeCikar"));
          $("#aIstekListeEkle").find("span").html('<i class="fa fa-shopping-basket" aria-hidden="true"></i>' + translateIt("UrunDetay_IstekListeCikar"));
          $("#aIstekListeEkle").attr("id", "aIstekListeCikar");
          productDetailModel.memberWishList.push(proxy_pair);
          TiciDonusumKodlari.FacebookFavori(productDetailModel.productId, productDetailModel.productPrice);
          TiciNoty.Show({
            message : translateIt("UrunDetay_IstekListesineEklendi"),
            type : "info"
          });
        }
      });
    } else {
      ticimaxApi.product.saveProductWish({
        VaryantId : proxy_pair,
        ProcessType : 2
      }, function(options) {
        if (!options.isError) {
          if ($("#aIstekListeCikar").attr("title", translateIt("UrunDetay_IstekListemeEkle")), $("#aIstekListeCikar").attr("data-original-title", translateIt("UrunDetay_IstekListemeEkle")), $("#aIstekListeCikar").find("span").html('<i class="fa fa-shopping-basket" aria-hidden="true"></i>' + translateIt("UrunDetay_IstekListemeEkle")), $("#aIstekListeCikar").attr("id", "aIstekListeEkle"), productDetailModel.memberWishList.length > 0) {
            const existingProxyIndex = productDetailModel.memberWishList.indexOf(proxy_pair);
            if (existingProxyIndex > -1) {
              productDetailModel.memberWishList.splice(existingProxyIndex, 1);
            }
          }
          TiciNoty.Show({
            message : translateIt("UrunDetay_IstekListesindenCikarildi"),
            type : "warning"
          });
        }
      });
    }
  } else {
    /** @type {boolean} */
    otomatikVaryasyonIstekEkle = true;
    varyasyonUyari();
  }
}
/**
 * @return {undefined}
 */
function FiyatAlarmListeUrunDetay() {
  var artistTrack;
  if (!globalModel.isAuthenticated) {
    window.mem.init.bind("login", encodeURI(window.location.pathname));
    return;
  }
  var $target = $("#aFiyatAlarmEkleBtn").length > 0 ? $("#aFiyatAlarmEkleBtn") : $("#aFiyatAlarmCikarBtn");
  /** @type {number} */
  var _index = (isASorti ? parseInt(productDetailModel.mainVariantId) : parseInt($("#hddnUrunID").val())) || 0;
  /** @type {number} */
  var index = parseInt($target.attr("data-action"));
  if (index === 1 ? _index > 0 : true) {
    artistTrack = {
      ProductCardId : urunKartID,
      ProductId : _index,
      ProductPrice : urunOrjinalFiyatiKdvHaric
    };
    if (index === 1) {
      ticimaxApi.member.saveProductPriceNotifications(artistTrack, function() {
        $target.attr("id", "aFiyatAlarmCikarBtn");
        $target.attr("data-action", 0);
        $target.attr("title", translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.attr("data-original-title", translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.find("span").html('<i class="fa fa-arrow-down" aria-hidden="true"></i>' + translateIt("UrunDetay_FiyatAlarmListeCikar"));
        $target.addClass("ButtonAktif");
        TiciNoty.Show({
          message : translateIt("GlobalMasterPage_UyariFiyatAlarmEklendi"),
          type : "info"
        });
        TiciDonusumKodlari.FacebookFavori(urunKartID, urunOrjinalFiyatiKdvHaric);
      });
      if (siteSettings.personaClickAktif) {
        personaclick("subscribe_trigger", "product_price_decrease", {
          email : globalModel.member.memberEMail,
          item : urunKartID,
          price : urunOrjinalFiyatiKdvHaric
        });
        if (siteSettings.personaClickWebPushAktif) {
          personaclick("subscribe_trigger", "product_price_decrease", {
            popup : "webpush",
            item : urunKartID,
            price : urunOrjinalFiyatiKdvHaric
          });
        }
      }
    } else {
      ticimaxApi.member.removeAmountInformation(artistTrack, function() {
        $target.removeClass("ButtonAktif");
        $target.attr("id", "aFiyatAlarmEkleBtn");
        $target.attr("data-action", 1);
        $target.attr("data-original-title", translateIt("UrunDetay_FiyatDusunceHaberVer"));
        $target.attr("title", translateIt("UrunDetay_FiyatDusunceHaberVer"));
        $target.find("span").html('<i class="fa fa-arrow-down" aria-hidden="true"></i>' + translateIt("UrunDetay_FiyatDusunceHaberVer"));
        TiciNoty.Show({
          message : translateIt("GlobalMasterPage_UyariFiyatAlarmCikarildi"),
          type : "info"
        });
      });
    }
  } else {
    /** @type {boolean} */
    otomatikVaryasyonFiyatAlarmEkle = true;
    varyasyonUyari();
  }
}
/**
 * @return {?}
 */
function hemenAl() {
  return sepeteEkleUrunDetay(function() {
    /** @type {string} */
    window.location.href = "/Sepetim";
  }), false;
}
/**
 * @return {?}
 */
function oncekiSayfa() {
  return history.back(), false;
}
/**
 * @param {?} n
 * @return {undefined}
 */
function gelinceHaberVer(n) {
  if (!globalModel.isAuthenticated) {
    if (siteSettings.uyeGirisPopupAktif) {
      window.mem.init.bind("login");
    } else {
      /** @type {string} */
      window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
    }
    return;
  }
  /** @type {number} */
  var whiteRating = parseInt($(n).attr("data-haber"));
  if (whiteRating === 0) {
    ticimaxApi.member.saveStockAlert({
      ProductId : urunKartID
    }, function() {
      $(n).attr("data-haber", 1);
      $(n).html("<span class='box1 box1Hover tipL' title='" + translateIt("UrunDetay_HaberVerIptal") + "'><i class='fa fa-mail-reply' aria-hidden='true'></i>" + translateIt("UrunDetay_HaberVerIptal") + "</span>");
      UpdateStokAlarm();
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariStokBekleyenlerEklendi"),
        type : "info"
      });
      TiciDonusumKodlari.FacebookFavori(urunKartID, urunOrjinalFiyatiKdvHaric);
    });
    if (siteSettings.personaClickAktif) {
      personaclick("subscribe_trigger", "product_available", {
        email : globalModel.member.memberEMail,
        item : urunKartID
      });
      if (siteSettings.personaClickWebPushAktif) {
        personaclick("subscribe_trigger", "product_available", {
          item : urunKartID,
          popup : "webpush"
        });
      }
    }
  } else {
    ticimaxApi.member.removeStockAlert({
      ProductId : urunKartID
    }, function() {
      $(n).attr("data-haber", 0);
      $(n).html("<span class='box1 box1Hover tipL' title='" + translateIt("UrunDetay_GelinceHaberVer") + "'><i class='fa fa-mail-reply' aria-hidden='true'></i>" + translateIt("UrunDetay_GelinceHaberVer") + "</span>");
      UpdateStokAlarm();
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariStokBekleyenlerCikarildi"),
        type : "info"
      });
    });
  }
}
/**
 * @param {?} slide
 * @return {undefined}
 */
function varyasyonGelinceHaberVer(slide) {
  if (!globalModel.isAuthenticated) {
    if (siteSettings.uyeGirisPopupAktif) {
      window.mem.init.bind("login");
    } else {
      /** @type {string} */
      window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
    }
    return;
  }
  /** @type {number} */
  var whiteRating = parseInt($(slide).attr("data-kart-id"));
  /** @type {number} */
  var pageInd = parseInt($(slide).attr("data-urun-id"));
  /** @type {number} */
  var num_subrows = parseInt($(slide).attr("data-eksecenek-id"));
  if ($(slide).hasClass("selected")) {
    ticimaxApi.member.removeStockAlert({
      ProductId : whiteRating,
      VariantId : pageInd,
      VariantOptionId : num_subrows
    }, function() {
      $(slide).removeClass("selected");
      $(slide).html($(slide).html().replace("fa-check-circle", "fa-circle-thin"));
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariStokBekleyenlerCikarildi"),
        type : "info"
      });
    });
  } else {
    ticimaxApi.member.saveStockAlert({
      ProductId : whiteRating,
      VariantId : pageInd,
      VariantOptionId : num_subrows
    }, function() {
      $(slide).addClass("selected");
      $(slide).html($(slide).html().replace("fa-circle-thin", "fa-check-circle"));
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariStokBekleyenlerEklendi"),
        type : "info"
      });
    });
    if (siteSettings.personaClickAktif) {
      personaclick("subscribe_trigger", "product_available", {
        email : globalModel.member.memberEMail,
        item : urunKartID
      });
      if (siteSettings.personaClickWebPushAktif) {
        personaclick("subscribe_trigger", "product_available", {
          item : urunKartID,
          popup : "webpush"
        });
      }
    }
  }
}
/**
 * @param {?} n
 * @return {undefined}
 */
function fiyatDusunceHaberVer(n) {
  if (!globalModel.isAuthenticated) {
    if (siteSettings.uyeGirisPopupAktif) {
      window.mem.init.bind("login");
    } else {
      /** @type {string} */
      window.location.href = "/UyeGiris?ReturnUrl=" + encodeURI(window.location.pathname);
    }
    return;
  }
  if ($(n).attr("data-haber") == "0") {
    var artistTrack = {
      ProductId : urunKartID,
      ProductPrice : urunOrjinalFiyatiKdvHaric
    };
    ticimaxApi.member.saveProductPriceNotifications(artistTrack, function() {
      $(n).addClass("ButtonAktif");
      $(n).attr("data-haber", "1");
      $(n).html("<span class='box1 box1Hover'><i class='fa fa-arrow-down' aria-hidden='true'></i>" + translateIt("UrunDetay_FiyatAlarmListeCikar"));
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariFiyatAlarmEklendi"),
        type : "info"
      });
    });
    if (siteSettings.personaClickAktif) {
      personaclick("subscribe_trigger", "product_price_decrease", {
        email : globalModel.member.memberEMail,
        item : urunKartID,
        price : urunOrjinalFiyatiKdvHaric
      });
      if (siteSettings.personaClickWebPushAktif) {
        personaclick("subscribe_trigger", "product_price_decrease", {
          popup : "webpush",
          item : urunKartID,
          price : urunOrjinalFiyatiKdvHaric
        });
      }
    }
  } else {
    ticimaxApi.member.removeAmountInformation({
      ProductId : urunKartID
    }, function() {
      $(n).removeClass("ButtonAktif");
      $(n).attr("data-haber", "0");
      $(n).html("<span class='box1 box1Hover'><i class='fa fa-arrow-down' aria-hidden='true'></i>" + translateIt("UrunDetay_FiyatDusunceHaberVer"));
      TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariFiyatAlarmCikarildi"),
        type : "info"
      });
    });
  }
}
/**
 * @return {undefined}
 */
function getUrunAksesuar() {
  if (siteSettings.urunAksesuarAktif) {
    var source_passwords = $("#scriptTemplateUrunAksesuar").html();
    var modal_template = Handlebars.compile(source_passwords);
    ticimaxApi.product.getProductAccessories({
      ProductId : productDetailModel.productId
    }, function(context) {
      if (!context.isError) {
        $("#UrunAksesuarDiv").html(modal_template(context));
        if (typeof urunListCallback != "undefined") {
          urunListCallback();
        }
        if (typeof urunSliderBlok != "undefined") {
          urunSliderBlok();
        }
      }
      getBenzerUrunlerStokOlmayan();
    });
  } else {
    getBenzerUrunlerStokOlmayan();
  }
}
/**
 * @return {undefined}
 */
function getBenzerUrunlerStokOlmayan() {
  if (siteSettings.stokOlmayanUrunBenzerGoster) {
    var source_passwords = $("#scriptTemplateStokOlmayanUrunBenzerGoster").html();
    var modal_template = Handlebars.compile(source_passwords);
    var results = createProductFilterModel();
    results.filter.CategoryIdList.push(productDetailModel.productCategoryId);
    /** @type {number} */
    results.paging.PageItemCount = 5;
    results.filter.StrProductIDNotEqual = productDetailModel.productId.toString();
    ticimaxApi.product.getProductList({
      FilterJson : JSON.stringify(results.filter),
      PagingJson : JSON.stringify(results.paging)
    }, function(context) {
      if (!context.isError) {
        if (context.totalProductCount <= 0) {
          $("#divBenzerUrunStokOlmayan").hide();
        }
        $("#divBenzerUrunStokOlmayan").html(modal_template(context));
        if (typeof urunListCallback != "undefined") {
          urunListCallback();
        }
        if (typeof urunSliderBlok != "undefined") {
          urunSliderBlok();
        }
      }
    });
  }
}
/**
 * @return {undefined}
 */
function getBenzerUrun() {
  if (siteSettings.urunDetayBenzerUrunGoster) {
    var source_passwords = $("#scriptTemplateBenzerUrun").html();
    var modal_template = Handlebars.compile(source_passwords);
    var results = createProductFilterModel();
    /** @type {boolean} */
    results.filter.IsSimilarProduct = true;
    results.filter.CategoryIdList.push(productDetailModel.productCategoryId);
    results.filter.StrProductIds = productDetailModel.productId;
    /** @type {number} */
    results.paging.PageItemCount = 5;
    ticimaxApi.product.getProductList({
      FilterJson : JSON.stringify(results.filter),
      PagingJson : JSON.stringify(results.paging)
    }, function(context) {
      if (!context.isError) {
        $("#BenzerUrunDiv").html(modal_template(context));
        if (typeof urunListCallback != "undefined") {
          urunListCallback();
        }
        if (typeof urunSliderBlok != "undefined") {
          urunSliderBlok();
        }
      }
      getUrunAksesuar();
    });
  } else {
    getUrunAksesuar();
  }
}
/**
 * @return {undefined}
 */
function getIlgiliUrun() {
  var source_passwords = $("#scriptTemplateIlgiliUrun").html();
  var modal_template = Handlebars.compile(source_passwords);
  var results = createProductFilterModel();
  if (typeof urunDetayIlgiliUrunSayisi != "undefined") {
    results.paging.PageItemCount = urunDetayIlgiliUrunSayisi;
  }
  results.filter.RelatedProductId = productDetailModel.productId;
  ticimaxApi.product.getProductList({
    FilterJson : JSON.stringify(results.filter),
    PagingJson : JSON.stringify(results.paging)
  }, function(context) {
    if (!context.isError) {
      $("#IlgiliUrunDiv").html(modal_template(context));
      if (typeof urunListCallback != "undefined") {
        urunListCallback();
      }
      if (typeof urunSliderBlok != "undefined") {
        urunSliderBlok();
      }
    }
    getBenzerUrun();
  });
}
/**
 * @param {number} amount
 * @param {string} session
 * @param {?} session_factory
 * @return {undefined}
 */
function GetProductInstallment(amount, session, session_factory) {
  var r;
  var artistTrack;
  if (siteSettings.payTR.aktif && siteSettings.payTR.token && siteSettings.payTR.merchantId > 0) {
    $(".taksitMain").html("<div id='paytr_taksit_tablosu' style='margin-top:10px;'></div>");
    if ($("#scriptPayTRTaksit").length > 0) {
      $("#scriptPayTRTaksit").remove();
    }
    r = $("<script/>");
    r.attr("id", "scriptPayTRTaksit");
    r.attr("src", "https://www.paytr.com/odeme/taksit-tablosu/v2?token=" + siteSettings.payTR.token + "&resp=1&merchant_id=" + siteSettings.payTR.merchantId + "&amount=" + parseFloat(amount.toFixed(2)) + "&taksit=" + session + "&tumu=1");
    $("head").append(r);
  } else {
    artistTrack = {
      Amount : amount,
      MaxInstallment : session,
      CurrencyCode : session_factory
    };
    $.get(sablonYolu + "UrunDetay/BankaTaksitleri.html", function(FeedbackTemplate) {
      var t = Handlebars.compile(FeedbackTemplate);
      ticimaxApi.bank.getBankInstallments(artistTrack, function(obj) {
        var response;
        var v;
        var n;
        var url;
        var photoText;
        if (!obj.isError) {
          $(".taksitMain").html(t(obj));
          response = obj.bankInstallments.filter(function(n) {
            return n.default;
          })[0];
          if (response) {
            v = response.installments.filter(function(n) {
              return n.installment === 1;
            })[0];
            if (v) {
              n = v.totalAmount;
              if (!orjinalUrun.kdvDahil) {
                /** @type {number} */
                n = n / (orjinalUrun.kdvOrani / 100 + 1);
              }
              $("#ltrTekCekim").html(n.numFormat());
              if (orjinalUrun.kdvDahil) {
                $("#ltrTekCekim span.spanKdv").hide();
              } else {
                url = orjinalUrun.kdvOrani > 0 ? translateIt("GlobalArtiKDV") : "";
                /** @type {string} */
                photoText = '<span class="spanKdv"> ' + url + "</span>";
                if (!document.getElementById("divTekCekimFiyati").innerHTML.includes(url)) {
                  $("#ltrTekCekim").append(photoText);
                }
              }
            }
          }
        }
      });
    });
  }
}
/**
 * @return {undefined}
 */
function GetAssortmentQuantities() {
  if (productDetailModel.productIsAsorti) {
    $(".asortiItem").show();
    var n = {
      AssortmentGroupId : productDetailModel.assortmentGroupId
    };
    var source_passwords = $("#scriptTemplateUrunAsorti").html();
    var modal_template = Handlebars.compile(source_passwords);
    ticimaxApi.product.getAssortmentQuantities(n, function(context) {
      if (!context.isError) {
        $(".asortiItem").html(modal_template(context));
      }
    });
  } else {
    $(".asortiItem").hide();
  }
}
/**
 * @return {undefined}
 */
function GetOdemeSecenekleri() {
  GetProductInstallment(urunTaksitSecenekParams.fiyat, urunTaksitSecenekParams.maksTaksit, urunTaksitSecenekParams.dovizKodu);
}
/**
 * @return {undefined}
 */
function thumbVideoAltImage() {
  if (productDetailModel.videoSettings.videoTagTipi === "video" && $("#vdUrunVideo").length > 0) {
    document.getElementById("vdUrunVideo").play();
  }
  $(".imageZoomPreview").hide();
  $("#divVideoGoruntulemeAlan").show();
  $("#divUcBoyut").removeClass("active");
  $("#imgUrunResim").hide();
}
/**
 * @return {undefined}
 */
function show3DImage() {
  if ($("#divUcBoyut").addClass("active"), $("#imgUrunResim").hide(), $("#divVideoGoruntulemeAlan").hide(), $(".imageZoomPreview").show(), productDetailModel.image360Type == 1 && initStandart360Image(), productDetailModel.image360Type == 3) {
    try {
      keyshotXR.Ua(370, 500);
    } catch (deprecationWarning) {
      console.warn(deprecationWarning);
    }
  }
}
/**
 * @return {undefined}
 */
function showProductImage() {
  $(".imageZoomPreview").show();
  $("#divVideoGoruntulemeAlan").hide();
  $("#divUcBoyut").removeClass("active");
  $("#imgUrunResim").show();
  CloudZoom.quickStart();
  if (productDetailModel.videoSettings.videoLink !== "" && productDetailModel.videoSettings.videoTagTipi === "video") {
    StopVideo();
  }
}
/**
 * @return {undefined}
 */
function StopVideo() {
  var unloadedImgElement = $("#vdUrunVideo").get(0);
  $(unloadedImgElement).trigger("pause");
}
/**
 * @return {undefined}
 */
function StartVideo() {
  document.getElementById("vdUrunVideo").play();
}
/**
 * @return {undefined}
 */
function StopMobileVideo() {
  var unloadedImgElement = $("#vdMobileUrunVideo").get(0);
  $(unloadedImgElement).trigger("pause");
}
/**
 * @return {undefined}
 */
function StartMobileVideo() {
  document.getElementById("vdMobileUrunVideo").play();
}
/**
 * @param {number} array
 * @param {!Object} value
 * @return {?}
 */
function fiyatFormat(array, value) {
  return numFormatDefaults.currencySymbol = value.Format.formatTanimGoster ? value.Tanim : value.Format.simge, numFormatDefaults.currencySymbolLocation = value.Format.simgeKonum, numFormatDefaults.decimalPlaces = value.Format.satisOndalikBasamak, numFormatDefaults.decimalChar = value.Format.ondalikAyraci, array.numFormat();
}
/**
 * @param {?} followings
 * @return {undefined}
 */
function funcFavoriUrunKontrol(followings) {
  /** @type {boolean} */
  var r = false;
  var successRates;
  var expRecords;
  var $target;
  if (globalModel.isAuthenticated) {
    successRates = GetFavoriListe();
    if (successRates.length > 0) {
      expRecords = successRates.filter(function($stateParams) {
        return $stateParams.productId == productDetailModel.productId && $stateParams.variantId == followings;
      });
      /** @type {boolean} */
      r = expRecords.length > 0;
    }
  }
  $target = $("#aFavoriEkleBtn").length > 0 ? $("#aFavoriEkleBtn") : $("#aFavroriCikarBtn");
  if (r) {
    $target.attr("id", "aFavroriCikarBtn");
    $target.attr("data-action", 0);
    $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.attr("title", translateIt("Favorilerim_FavorilerdenKaldir"));
  } else {
    $target.attr("id", "aFavoriEkleBtn");
    $target.attr("data-action", 1);
    $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerimeEkle"));
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerimeEkle"));
    $target.attr("title", translateIt("Favorilerim_FavorilerimeEkle"));
  }
}
/**
 * @param {?} n
 * @return {undefined}
 */
function funcIstekUrunKontrol(n) {
  var successRates;
  var i;
  var expRecords;
  if (globalModel.isAuthenticated) {
    successRates = productDetailModel.memberWishList;
    /** @type {boolean} */
    i = false;
    if (successRates.length > 0) {
      expRecords = successRates.filter(function(special) {
        return special == n;
      });
      /** @type {boolean} */
      i = expRecords.length > 0;
    }
    if (i) {
      $("#aIstekListeEkle").attr("title", translateIt("UrunDetay_IstekListeCikar"));
      $("#aIstekListeEkle").attr("data-original-title", translateIt("UrunDetay_IstekListeCikar"));
      $("#aIstekListeEkle").find("span").html('<i class="fa fa-shopping-basket" aria-hidden="true"></i>' + translateIt("UrunDetay_IstekListeCikar"));
      $("#aIstekListeEkle").attr("id", "aIstekListeCikar");
    } else {
      $("#aIstekListeCikar").attr("title", translateIt("UrunDetay_IstekListemeEkle"));
      $("#aIstekListeCikar").attr("data-original-title", translateIt("UrunDetay_IstekListemeEkle"));
      $("#aIstekListeCikar").find("span").html('<i class="fa fa-shopping-basket" aria-hidden="true"></i>' + translateIt("UrunDetay_IstekListemeEkle"));
      $("#aIstekListeCikar").attr("id", "aIstekListeEkle");
    }
  }
}
/**
 * @param {number} zoomAware
 * @return {undefined}
 */
function callbackFavoriGrupUrun(zoomAware) {
  var $target = $("#aFavoriEkleBtn").length > 0 ? $("#aFavoriEkleBtn") : $("#aFavroriCikarBtn");
  if (zoomAware === 1) {
    $target.attr("id", "aFavroriCikarBtn");
    $target.attr("data-action", 0);
    $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerdenKaldir"));
    $target.attr("title", translateIt("Favorilerim_FavorilerdenKaldir"));
  } else {
    $target.attr("id", "aFavoriEkleBtn");
    $target.attr("data-action", 1);
    $target.find("span").html('<i class="fa fa-heart" aria-hidden="true"></i>' + translateIt("Favorilerim_FavorilerimeEkle"));
    $target.attr("data-original-title", translateIt("Favorilerim_FavorilerimeEkle"));
    $target.attr("title", translateIt("Favorilerim_FavorilerimeEkle"));
  }
  if (typeof favoriUyariAktif == "undefined" ? true : favoriUyariAktif) {
    TiciNoty.Show({
      message : translateIt("GlobalMasterPage_UyariFavoriEklendi"),
      type : "info"
    });
  }
}
/**
 * @return {undefined}
 */
function SetSonZiyaretEdilenUrun() {
  setTimeout(function() {
    var mr_last_hash = getCookie("SonZiyaretEdilenUrunler");
    var queryString = getQueryStringByName("strUrunID", "?" + mr_last_hash);
    var view = getQueryStringByName("strKategoriID", "?" + mr_last_hash);
    var n = queryString != null ? queryString.split(",") : [];
    var t = view != null ? view.split(",") : [];
    var crud_page;
    if (n.indexOf(productDetailModel.productId + "") > -1) {
      n.splice(n.indexOf(productDetailModel.productId + ""), 1);
    }
    n.push(productDetailModel.productId + "");
    if (t.indexOf(productDetailModel.productCategoryId + "") == -1) {
      t.push(productDetailModel.productCategoryId + "");
    }
    crud_page = "strUrunID=" + n.toString() + "&strKategoriID=" + t.toString();
    createCookie("SonZiyaretEdilenUrunler", crud_page, 7);
  }, 1);
}
/**
 * @return {?}
 */
function SaveOnerilenler() {
  var output;
  if (!TiciValidation(".frmUrunOneriler")) {
    return false;
  }
  /** @type {!Array} */
  var n = [];
  /** @type {(Element|null)} */
  var focusNewTabNotification = document.getElementById("chkAciklamaYetersiz");
  /** @type {(Element|null)} */
  var breakDesktopNotification = document.getElementById("chkBilgiHatali");
  /** @type {(Element|null)} */
  var breakNewTabNotification = document.getElementById("chkResimKalitesiz");
  /** @type {(Element|null)} */
  var radioTwo = document.getElementById("chkTeknikProblem");
  /** @type {(Element|null)} */
  var cUseHighlight = document.getElementById("chkFiyatHatali");
  /** @type {(Element|null)} */
  var unflagCheckbox = document.getElementById("chkUrunPahali");
  /** @type {(Element|null)} */
  var body = document.getElementById("txtOneriMail");
  /** @type {(Element|null)} */
  var check = document.getElementById("txtOneriNot");
  /** @type {string} */
  var tt = "<ul>";
  if (focusNewTabNotification.checked && (n.push(1), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_AciklamaYetersiz") + "</li>")), breakDesktopNotification.checked && (n.push(2), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_BilgiHatali") + "</li>")), breakNewTabNotification.checked && (n.push(3), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_ResimKalitesiz") + "</li>")), radioTwo.checked && (n.push(4), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_TeknikProblem") + 
  "</li>")), cUseHighlight.checked && (n.push(5), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_FiyatHatali") + "</li>")), unflagCheckbox.checked && (n.push(6), tt = tt + ("<li>" + translateIt("UrunDetay_UrunOnerileri_UrunPahali") + "</li>")), tt = tt + "</ul>", n.length <= 0) {
    TiciNoty.Show({
      message : translateIt("LutfenOneriSecin"),
      type : "warning"
    });
    return;
  }
  if (!validateEmail(body.value)) {
    TiciNoty.Show({
      message : translateIt("Validation_MailKontrolEdiniz"),
      type : "warning"
    });
    return;
  }
  output = {
    ProductName : productDetailModel.productName,
    Email : body.value,
    Notes : check.value,
    ProductUrl : window.location.origin + window.location.pathname,
    ProductId : productDetailModel.productId,
    VariantId : parseInt($("#hddnUrunID").val()),
    Recommendations : n.toString(),
    MailContent : tt
  };
  ticimaxApi.product.saveProductSuggestion(output, function(result) {
    if (result.isError) {
      TiciNoty.Show({
        message : result.errorMessage,
        type : "warning"
      });
    } else {
      TiciNoty.Show({
        message : translateIt("UrunDetay_OnerinizKaydedildi"),
        type : "success"
      });
      /** @type {boolean} */
      focusNewTabNotification.checked = false;
      /** @type {boolean} */
      breakDesktopNotification.checked = false;
      /** @type {boolean} */
      breakNewTabNotification.checked = false;
      /** @type {boolean} */
      radioTwo.checked = false;
      /** @type {boolean} */
      cUseHighlight.checked = false;
      /** @type {boolean} */
      unflagCheckbox.checked = false;
      /** @type {string} */
      body.value = "";
      /** @type {string} */
      check.value = "";
    }
  });
}
/**
 * @return {undefined}
 */
function addToCompare() {
  var variantId = parseInt($("#hddnUrunID").val()) ? parseInt($("#hddnUrunID").val()) : productDetailModel.mainVariantId;
  var productId = productDetailModel.productId;
  var ports = TiciCookie.getObj("productComparison") !== null ? TiciCookie.getObj("productComparison") : [];
  var $constraint = ports.filter(function(p) {
    if (p.productId === productId) {
      return p;
    }
  });
  var res;
  var results;
  var i;
  if ($constraint === undefined || $constraint.length <= 0) {
    ports.push({
      productId : productId,
      variantId : variantId
    });
  }
  if (ports.length > 4) {
    TiciNoty.Show("Maksimum 4 Adet \u00dcr\u00fcn Ekleyebilirsiniz");
  } else {
    TiciCookie.setObj("productComparison", ports, 7);
  }
  /** @type {!Array} */
  res = [];
  results = parent.createProductFilterModel();
  /** @type {number} */
  i = 0;
  for (; i < ports.length; i++) {
    res.push(ports[i].productId);
  }
  /** @type {string} */
  results.filter.StrProductIds = res.join();
  ticimaxApi.product.getProductList({
    FilterJson : JSON.stringify(results.filter),
    PagingJson : JSON.stringify(results.paging)
  }, function(n) {
    $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Urun/Karsilastirma.html", function(ast) {
      var t = Handlebars.compile(ast)(n);
      $.fancybox.open(t, {
        width : 1E3,
        height : 550,
        autoSize : false,
        beforeShow : function() {
          $("body").css({
            "overflow-y" : "hidden"
          });
        },
        afterClose : function() {
          $("body").css({
            "overflow-y" : "visible"
          });
        }
      });
    });
  });
}
/**
 * @return {undefined}
 */
function KarsilastirmaListesineEkle() {
  var variantId = parseInt($("#hddnUrunID").val()) ? parseInt($("#hddnUrunID").val()) : productDetailModel.mainVariantId;
  var productId = productDetailModel.productId;
  var actions = TiciCookie.getObj("productComparison") !== null ? TiciCookie.getObj("productComparison") : [];
  var $constraint = actions.filter(function(p) {
    if (p.productId === productId) {
      return p;
    }
  });
  if ($constraint === undefined || $constraint.length <= 0) {
    actions.push({
      productId : productId,
      variantId : variantId
    });
  }
  if (actions.length > 4) {
    TiciNoty.Show("Maksimum 4 Adet \u00dcr\u00fcn Ekleyebilirsiniz");
  } else {
    TiciCookie.setObj("productComparison", actions, 7);
  }
  $.fancybox({
    href : sablonYolu + "/Urun/Karsilastirma.html",
    type : "iframe",
    width : 1E3,
    padding : 10,
    autoHeight : true,
    autoWidth : true,
    beforeShow : function() {
      $("body").css({
        "overflow-y" : "hidden"
      });
    },
    afterClose : function() {
      $("body").css({
        "overflow-y" : "visible"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function TelefonlaSiparisGoster() {
  $.fancybox({
    href : "/UrunDetayPopup.aspx?formType=telefonsiparis",
    type : "iframe",
    width : 320,
    padding : 10,
    autoHeight : true,
    autoWidth : true,
    beforeShow : function() {
      $("body").css({
        "overflow-y" : "hidden"
      });
    },
    afterClose : function() {
      $("body").css({
        "overflow-y" : "visible"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function TavsiyeGoster() {
  $.fancybox({
    href : "/UrunDetayPopup.aspx?formType=tavsiye",
    type : "iframe",
    width : 320,
    padding : 10,
    autoHeight : true,
    autoWidth : true,
    beforeShow : function() {
      $("body").css({
        "overflow-y" : "hidden"
      });
    },
    afterClose : function() {
      $("body").css({
        "overflow-y" : "visible"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function MagazaStokGoster() {
  $.fancybox({
    href : "/UrunDetayPopup.aspx?formType=magazastok",
    type : "iframe",
    width : 450,
    padding : 10,
    autoHeight : true,
    autoWidth : true,
    beforeShow : function() {
      $("body").css({
        "overflow-y" : "hidden"
      });
    },
    afterClose : function() {
      $("body").css({
        "overflow-y" : "visible"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function YorumYazGoster() {
  $.get(sablonYolu + "UrunDetay/YorumYaz.html", function(FeedbackTemplate) {
    var formioTranslate = Handlebars.compile(FeedbackTemplate);
    var xAxisLabelsEnabled = $(".urunTabAlt").html();
    var tooltip = {
      IsAuthenticated : globalModel.isAuthenticated,
      ProductDetailModel : typeof productDetailModel != "undefined" ? productDetailModel : "",
      ProductDescription : typeof xAxisLabelsEnabled != "undefined" ? xAxisLabelsEnabled : ""
    };
    createModal({
      id : "yorumYaz",
      content : formioTranslate(tooltip)
    });
    if (globalModel.isAuthenticated) {
      setTimeout(function() {
        $("#txtbxYorumIsim").val(globalModel.member.memberName);
      }, 500);
      $(".detayYorumFormRating .rating i").click(function() {
        var currentDataItemIdentifyingStr = $(this).attr("class");
        var classesLine = currentDataItemIdentifyingStr.split("-")[1];
        $(this).parent().attr("data-rating", classesLine);
      });
      if (typeof productDetailModel != "undefined" && productDetailModel.m169804) {
        if (typeof cities == "undefined" || cities.length == 0) {
          ticimaxApi.member.getCity({
            countryId : 1
          }, function(data) {
            cities = data.cities;
            FillCitiesInYorum();
          });
        } else {
          FillCitiesInYorum();
        }
      }
    }
  });
}
/**
 * @return {undefined}
 */
function FillCitiesInYorum() {
  var i;
  var option;
  if (typeof cities != "undefined" && cities.length > 0) {
    /** @type {number} */
    i = 0;
    for (; i < cities.length; i++) {
      /** @type {!Option} */
      option = new Option(cities[i].cityName, cities[i].cityId);
      $(option).html(cities[i].cityName);
      $("#selectCity").append(option);
    }
  }
}
/**
 * @param {?} n
 * @return {undefined}
 */
function KombinGoster(n) {
  /** @type {string} */
  var wrap = "";
  $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/UrunDetay/KombinUrunler.html", function(node) {
    wrap = Handlebars.compile(node);
    window.ProductCombine = {};
    /** @type {!Array} */
    window.ProductCombine.ProductsToAdd = [];
    window.ProductCombine.Model = {};
    /**
     * @param {?} type
     * @param {string} index
     * @return {undefined}
     */
    window.ProductCombine.ThumbImageChange = function(type, index) {
      var gallery = window.ProductCombine.Model.products.filter(function(port) {
        return port.productId === type;
      })[0];
      /** @type {string} */
      gallery.selectedImage = index;
      $("#kombinUrunler").html(wrap(window.ProductCombine.Model));
    };
    /**
     * @return {undefined}
     */
    window.ProductCombine.SetVariantClass = function() {
      var symbol;
      var j;
      var neuron;
      var k;
      var tile;
      var _$rapyd$_Iter18 = window.ProductCombine.Model.products.filter(function(suiteContainer) {
        return suiteContainer.variantTypes.length > 0;
      });
      /** @type {number} */
      var _$rapyd$_Index18 = 0;
      for (; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
        symbol = _$rapyd$_Iter18[_$rapyd$_Index18];
        /** @type {number} */
        j = 0;
        for (; j < symbol.selectVariantTypes.length; j++) {
          neuron = symbol.selectVariantTypes[j];
          /** @type {number} */
          k = 0;
          for (; k < neuron.selectVariantTypeValues.length; k++) {
            tile = neuron.selectVariantTypeValues[k];
            /** @type {string} */
            tile.cssClass = "size_box " + (tile.stockAmount < 1 ? " nostok" : "") + (tile.selected ? " selected" : "");
          }
        }
      }
    };
    /**
     * @param {?} sku
     * @param {?} name
     * @param {number} key
     * @return {undefined}
     */
    window.ProductCombine.SelectVariant = function(sku, name, key) {
      var i = key + 1;
      var res = window.ProductCombine.Model.products.filter(function(cartItem) {
        return cartItem.productId === sku;
      })[0];
      var client;
      var crossfilterable_layers;
      var layer_i;
      var relatedAssociations;
      var c;
      if (res.selectVariantTypes[key].selectVariantTypeValues.map(function(cbCollection) {
        /** @type {boolean} */
        cbCollection.selected = false;
      }), res.selectVariantTypes[key].selectVariantTypeValues.filter(function(functionImport) {
        return functionImport.variantTypeValueId === name;
      })[0].selected = true, res.selectedVariantTypeValues.length = key, res.selectedVariantTypeValues.push(name), res.variantTypes.length > i) {
        /** @type {!Array} */
        client = [];
        crossfilterable_layers = res.variants.filter(function(cbCollection) {
          return cbCollection.variantPropertyIDs.slice(0, i).toString() === res.selectedVariantTypeValues.toString();
        });
        /** @type {number} */
        layer_i = 0;
        for (; layer_i < crossfilterable_layers.length; layer_i++) {
          relatedAssociations = crossfilterable_layers[layer_i];
          client.push({
            colorCode : relatedAssociations.variantPropertyDetail[i].colorCode,
            image : relatedAssociations.variantPropertyDetail[i].image,
            name : relatedAssociations.variantPropertyDetail[i].name,
            order : relatedAssociations.variantPropertyDetail[i].order,
            stockAmount : relatedAssociations.variantPropertyDetail[i].stockAmount,
            variantId : relatedAssociations.variantPropertyDetail[i].variantId,
            variantTypeId : relatedAssociations.variantPropertyDetail[i].variantTypeId,
            variantTypeName : relatedAssociations.variantPropertyDetail[i].variantTypeName,
            variantTypeValueId : relatedAssociations.variantPropertyDetail[i].variantTypeValueId
          });
        }
        /** @type {!Array<?>} */
        client = client.sort(function(a, b) {
          return a.order - b.order;
        });
        res.selectVariantTypes.length = i;
        res.selectVariantTypes.push({
          index : i,
          listType : res.variantTypes[i].listType,
          name : res.variantTypes[i].name,
          order : res.variantTypes[i].order,
          variantTypeId : res.variantTypes[i].variantTypeId,
          selectVariantTypeValues : client
        });
      } else {
        c = res.variants.filter(function(historyReadResult) {
          return historyReadResult.variantPropertyIDs.toString() === res.selectedVariantTypeValues.toString();
        })[0];
        window.ProductCombine.SetPrice(res, c);
      }
      window.ProductCombine.SetVariantClass();
      $("#kombinUrunler").html(wrap(window.ProductCombine.Model));
    };
    /**
     * @param {!Object} item
     * @param {string} context
     * @return {undefined}
     */
    window.ProductCombine.SetPrice = function(item, context) {
      context = typeof context != "undefined" ? context : item.variants[0];
      item.price = context.originalProductPrice.numFormat();
      item.vatIncluded = context.vatIncluded;
      item.vatIncludedPriceValue = context.originalProductPrice + context.originalProductPriceVat;
      item.vatIncludedPrice = item.vatIncludedPriceValue.numFormat();
      item.sellingPrice = context.sellingPriceStr;
      $("#kombinUrunler").html(wrap(window.ProductCombine.Model));
      window.ProductCombine.SetTotalPrice();
    };
    /**
     * @return {undefined}
     */
    window.ProductCombine.SetTotalPrice = function() {
      if (window.ProductCombine.Model.products) {
        /** @type {number} */
        var value = 0;
        window.ProductCombine.Model.products.map(function(width) {
          return value = value + width.vatIncludedPriceValue;
        });
        window.ProductCombine.Model.totalProductPrice = value.numFormat();
        /** @type {number} */
        window.ProductCombine.Model.discountRate = parseInt(100 - window.ProductCombine.Model.settings.combineCampaignPrice * 100 / value);
      }
    };
    /**
     * @param {(Node|Window)} e
     * @return {undefined}
     */
    window.ProductCombine.VariantAlert = function(e) {
      $("body").addClass("kombinurunsecbody");
      $(".kombinurunsecbody .kombinContent .urunsecoverlay").fadeIn();
      $(e).parent().find("#divKombinUrunEkSecenek").addClass("kombinEksecenekUyari");
      $(e).parent().find("#divKombinUrunEkSecenek").append("<div class='tooltipp'>L\u00fctfen Se\u00e7im Yap\u0131n\u0131z<i></i></div>");
      $(".urunsecoverlay").click(function() {
        $(".kombinContent #divKombinUrunEkSecenek").removeClass("kombinEksecenekUyari");
        $(".urunsecoverlay").fadeOut();
        $(".tooltipp").remove();
        $("body").removeClass("urunsecbody");
      });
      $(".kombinurunsecbody #divKombinUrunEkSecenek").click(function() {
        $(this).removeClass("kombinEksecenekUyari");
        $(".urunsecoverlay").fadeOut();
        $(".tooltipp").remove();
        $("body").removeClass("urunsecbody");
      });
    };
    /**
     * @param {?} n
     * @param {(Node|Window)} e
     * @param {boolean} h
     * @param {boolean} isPanel
     * @return {undefined}
     */
    window.ProductCombine.AddToCart = function(n, e, h, isPanel) {
      var params;
      var scope;
      var tree;
      h = typeof h != "undefined" ? h : true;
      /** @type {null} */
      params = null;
      scope = window.ProductCombine.Model.products.filter(function(action) {
        return action.productId === n;
      })[0];
      if (scope.variantTypes.length > 0) {
        if (scope.variantTypes.length == scope.selectedVariantTypeValues.length) {
          params = scope.variants.filter(function(historyReadResult) {
            return historyReadResult.variantPropertyIDs.toString() === scope.selectedVariantTypeValues.toString();
          })[0];
        } else {
          window.ProductCombine.VariantAlert(e);
        }
      } else {
        params = scope.variants[0];
      }
      if (params != null) {
        tree = scope.productQuantityBoxDefaultValue;
        if (isPanel) {
          window.ProductCombine.ProductsToAdd.push({
            VariantId : params.variantId,
            Quantity : tree
          });
        } else {
          sepeteEkle(params.variantId, tree, 0, 0, 0, "", true, null, 0, h, false);
        }
      }
    };
    /**
     * @return {undefined}
     */
    window.ProductCombine.AddToCartAll = function() {
      var dataHasAbsolutePath;
      var error;
      var r;
      var i;
      var product;
      /** @type {!Array} */
      window.ProductCombine.ProductsToAdd = [];
      /** @type {boolean} */
      dataHasAbsolutePath = true;
      /** @type {string} */
      error = "";
      /** @type {number} */
      i = 0;
      for (; i < window.ProductCombine.Model.products.length; i++) {
        if (product = window.ProductCombine.Model.products[i], product.totalStockAmount > 0) {
          if (r = null, product.variantTypes.length > 0) {
            if (product.variantTypes.length === product.selectedVariantTypeValues.length) {
              r = product.variants.filter(function(historyReadResult) {
                return historyReadResult.variantPropertyIDs.toString() === product.selectedVariantTypeValues.toString();
              })[0];
            } else {
              /** @type {boolean} */
              dataHasAbsolutePath = false;
              window.ProductCombine.VariantAlert(document.getElementsByClassName("divKombinUrunEkSecenek")[i]);
              break;
            }
          } else {
            r = product.variants[0];
          }
          if (r.stockNumber <= 0) {
            /** @type {string} */
            error = error + (product.productName + " " + translateIt("GlobalMasterPage_UyariStokYok"));
          }
        } else {
          /** @type {string} */
          error = error + (product.productName + " " + translateIt("GlobalMasterPage_UyariStokYok"));
        }
      }
      if (dataHasAbsolutePath && error === "") {
        /** @type {boolean} */
        var task_descr_h = false;
        /** @type {boolean} */
        var e = false;
        /** @type {boolean} */
        var o = true;
        /** @type {number} */
        i = 0;
        for (; i < window.ProductCombine.Model.products.length; i++) {
          if (i === window.ProductCombine.Model.products.length - 1) {
            /** @type {boolean} */
            e = true;
            /** @type {boolean} */
            task_descr_h = true;
            /** @type {boolean} */
            o = true;
          }
          product = window.ProductCombine.Model.products[i];
          window.ProductCombine.AddToCart(product.productId, document.getElementsByClassName("divKombinUrunEkSecenek")[i], task_descr_h, true);
        }
        sepeteEkle(0, 0, 0, 0, 0, "", false, null, 0, task_descr_h, true, 0, false, true);
        $.fancybox.close();
      } else {
        if (error != "") {
          TiciNoty.Show({
            message : error,
            type : "warning"
          });
        }
      }
    };
    ticimaxApi.product.getProductCombine({
      CombineProductId : n
    }, function(state) {
      var tab;
      var time;
      /** @type {number} */
      var i = 0;
      for (; i < state.products.length; i++) {
        tab = state.products[i];
        tab.selectedImage = tab.productImages.length > 0 ? tab.productImages[0].thumbImagePath : "/Scripts/images/resimyok_ufak.jpg";
        /** @type {!Array} */
        tab.selectVariantTypes = [];
        /** @type {!Array} */
        tab.selectedVariantTypeValues = [];
        if (tab.variantTypes.length > 0) {
          tab.selectVariantTypes.push({
            index : 0,
            listType : tab.variantTypes[0].listType,
            name : tab.variantTypes[0].name,
            order : tab.variantTypes[0].order,
            variantTypeId : tab.variantTypes[0].variantTypeId,
            selectVariantTypeValues : tab.variantTypes[0].variantTypeValues
          });
        }
        window.ProductCombine.SetPrice(tab);
      }
      window.ProductCombine.Model = {
        settings : {
          bulkPurchase : productDetailModel.productCombineBulkPurchase,
          combineCampaignPrice : state.compineCampaignPrice,
          combineCampaignPriceStr : state.compineCampaignPriceStr
        },
        products : state.products
      };
      window.ProductCombine.SetVariantClass();
      window.ProductCombine.SetTotalPrice();
      time = wrap(window.ProductCombine.Model);
      /** @type {string} */
      time = "<div id='kombinUrunler'>" + time + "</div>";
      if (productDetailModel.productCombineType === 1) {
        $("#divUrunDetayKombin").html(time);
        if (window.ProductCombine.Model.settings.combineCampaignPrice != 0) {
          $("#pnlFiyatlar").hide();
        }
      } else {
        $.fancybox.open(time);
      }
      if (typeof urunDetay_varyasyonSecili != "undefined" && urunDetay_varyasyonSecili || siteSettings.urunAyar.urunDetayVaryasyonOtomatikSec) {
        $("#kombinUrunler .kombinItem").each(function() {
          $(this).find(".divKombinEksecenekTipi .size_box").not(".nostok").first().click();
        });
      }
      if (typeof productDetailCombineBindCallback != "undefined") {
        productDetailCombineBindCallback();
      }
    });
  });
}
/**
 * @param {!NodeList} array
 * @param {number} key
 * @return {?}
 */
function groupBy(array, key) {
  var expRecords;
  /** @type {!Array} */
  var results = [];
  /** @type {number} */
  var i = 0;
  for (; i < array.length; i++) {
    /** @type {!Array<?>} */
    expRecords = results.filter(function(registryHost) {
      return registryHost[key] === array[i][key];
    });
    if (expRecords.length < 1) {
      results.push(array[i]);
    }
  }
  return results;
}
/**
 * @param {!NodeList} tabs
 * @return {?}
 */
function ekSecenekGrupla(tabs) {
  var performersWithGenres;
  var lookedUpFile;
  var loadedAddons;
  var eVideoJSON;
  var biomes;
  /** @type {!Array} */
  var syncTargets = [];
  /** @type {number} */
  var i = 0;
  for (; i < tabs.length; i++) {
    /** @type {!Array<?>} */
    performersWithGenres = syncTargets.filter(function(timeline_mode) {
      return timeline_mode.id === tabs[i].tipID;
    });
    if (performersWithGenres.length < 1) {
      syncTargets.push({
        id : tabs[i].tipID,
        tanim : tabs[i].ekSecenekTipiTanim,
        ekSecenekListeTipi : tabs[i].ekSecenekListeTipi,
        ekSecenekList : [{
          id : tabs[i].id,
          tanim : tabs[i].tanim,
          resim : tabs[i].resim,
          stokBilgilendir : tabs[i].stokBilgilendir,
          urunKartId : tabs[i].urunKartID,
          urunList : [{
            id : tabs[i].urunID,
            stokAdedi : tabs[i].stokAdedi
          }]
        }]
      });
    } else {
      lookedUpFile = performersWithGenres[0];
      loadedAddons = lookedUpFile.ekSecenekList.filter(function(opLyrInfo) {
        return opLyrInfo.id === tabs[i].id;
      });
      if (loadedAddons.length < 1) {
        lookedUpFile.ekSecenekList.push({
          id : tabs[i].id,
          tanim : tabs[i].tanim,
          resim : tabs[i].resim,
          stokBilgilendir : tabs[i].stokBilgilendir,
          urunKartId : tabs[i].urunKartID,
          urunList : [{
            id : tabs[i].urunID,
            stokAdedi : tabs[i].stokAdedi
          }]
        });
      } else {
        eVideoJSON = loadedAddons[0];
        biomes = eVideoJSON.urunList.filter(function(timeline_mode) {
          return timeline_mode.id === tabs[i].urunID;
        });
        if (biomes.length < 1) {
          eVideoJSON.urunList.push({
            id : tabs[i].urunID,
            stokAdedi : tabs[i].stokAdedi
          });
        }
      }
    }
  }
  return syncTargets;
}
/**
 * @param {number} total
 * @param {number} page
 * @param {number} limit
 * @return {?}
 */
function GetCommentPager(total, page, limit) {
  var totalPages;
  var startPage;
  var end;
  page = page || 1;
  limit = limit || 10;
  /** @type {number} */
  totalPages = Math.ceil(total / limit);
  if (totalPages <= 10) {
    /** @type {number} */
    startPage = 1;
    /** @type {number} */
    end = totalPages;
  } else {
    if (page <= 6) {
      /** @type {number} */
      startPage = 1;
      /** @type {number} */
      end = 10;
    } else {
      if (page + 4 >= totalPages) {
        /** @type {number} */
        startPage = totalPages - 9;
        /** @type {number} */
        end = totalPages;
      } else {
        /** @type {number} */
        startPage = page - 5;
        end = page + 4;
      }
    }
  }
  /** @type {number} */
  var start = (page - 1) * limit;
  /** @type {number} */
  var endIndex = Math.min(start + limit - 1, total - 1);
  var height = page * limit >= total ? total : page * limit;
  var arr = createArrayOfRange(startPage, end);
  return {
    totalItems : total,
    currentItems : height,
    currentPercent : total > 0 ? parseInt(height * 100 / total) : 0,
    currentPage : page,
    previousPage : page - 1,
    nextPage : page + 1,
    pageSize : limit,
    totalPages : totalPages,
    startPage : startPage,
    endPage : end,
    startIndex : start,
    endIndex : endIndex,
    pages : arr
  };
}
/**
 * @param {!Object} item
 * @return {undefined}
 */
function TabCommentSetFilter(item) {
  /** @type {number} */
  var i = 0;
  for (; i < item.ratings.length; i++) {
    $(".ratingFiltre li[data-rating=" + item.ratings[i] + "]").addClass("active");
  }
  /** @type {number} */
  i = 0;
  for (; i < item.ages.length; i++) {
    $(".yasFiltre li[data-id=" + item.ages[i] + "]").addClass("active");
  }
  $(".siralamaFiltre li[data-id=" + item.order + "]").addClass("active");
  $(".commentPager .SelectedSayfa").removeClass("butonDisabled SelectedSayfa");
  $(".commentPager a[data-page=" + item.page + "]").addClass("butonDisabled SelectedSayfa");
}
/**
 * @param {boolean} zoomAware
 * @return {undefined}
 */
function TabGetComments(zoomAware) {
  $.get(sablonYolu + "UrunDetay/YorumList.html", function(value) {
    var curr = Handlebars.compile(value);
    ticimaxApi.product.getComments(yorumFiltre, function(obj) {
      /** @type {boolean} */
      obj.isEmpty = !zoomAware && obj.totalCommentCount == 0;
      var paging_opts = GetCommentPager(obj.totalCommentCount, yorumFiltre.page, 10);
      obj.paging = paging_opts;
      $("#divYorumSayisi").html("(" + obj.totalCommentCount + ")");
      $(".tabYorumlar").html(curr(obj));
      TabCommentSetFilter(yorumFiltre);
    });
  });
}
/**
 * @return {undefined}
 */
function TabGetRecommendations() {
  $.get(sablonYolu + "UrunDetay/Oneriler.html", function(FeedbackTemplate) {
    var createMonthHTML = Handlebars.compile(FeedbackTemplate);
    var date = {
      EMail : globalModel.member.memberEMail
    };
    $(".tabUrunOneriler").html(createMonthHTML(date));
  });
}
/**
 * @return {undefined}
 */
function SaveYorum() {
  var n = $("input[name=rdTavsiye]:checked").val();
  var i = $("input[name=rdYas]:checked").val();
  var value = $(".detayYorumFormRating .rating").attr("data-rating");
  var data;
  if (TiciValidation(".frmUrunDetayYorumYaz") && typeof n != "undefined" && typeof value != "undefined") {
    data = {
      Title : $("#txtbxYorumBaslik").val(),
      Name : $("#txtbxYorumIsim").val(),
      Rating : parseInt(value),
      Recommended : parseInt(n) == 1,
      Message : $("#txtbxYorumMesaj").val(),
      Age : i,
      ProductId : parent.productDetailModel.productId,
      ShowName : $("#chkIsimGoster").is(":checked")
    };
    ticimaxApi.product.saveProductComment(data, function(result) {
      if (result.isError) {
        parent.TiciNoty.Show({
          message : result.errorMessage,
          type : "error"
        });
      } else {
        TabGetComments();
        parent.TiciNoty.Show({
          message : translateIt("UrunDetay_YorumKaydedildi"),
          type : "success"
        });
        $("#yorumYaz .modal-close").click();
      }
    });
  } else {
    if (typeof n == "undefined" && $(".detyaYorumFormOneri .tici-valid-error").length == 0) {
      $(".detyaYorumFormOneri").append('<span class="tici-valid-error alert alert-danger">Bu Alan Zorunludur</span>');
    }
    if (typeof value == "undefined" && $(".detayYorumFormRating .tici-valid-error").length == 0) {
      $(".detayYorumFormRating").append('<span class="tici-valid-error alert alert-danger">Bu Alan Zorunludur</span>');
    }
  }
}
/**
 * @return {undefined}
 */
function yorumOnizleme() {
  var value = $(".detayYorumFormRating .rating").attr("data-rating");
  var total_pageviews_raw = $("input[name=rdTavsiye]:checked").val();
  var spacingStr = $("input[name=rdBedenTavsiye]:checked").val();
  var durationVal = $("input[name=rdDegerlendirmeOkudunuzMu]:checked").val();
  var i = $("input[name=rdYas]:checked").val();
  var highest_i = $("input[name=rdNeredenSatinAldiniz]:checked").val();
  var val = $("#selectCity").val();
  if (typeof value != "undefined") {
    commentRequest = {
      Title : $("#txtbxYorumBaslik").val(),
      Name : $("#txtbxYorumIsim").val().trim(),
      Rating : parseInt(value),
      Recommended : parseInt(total_pageviews_raw) == 1,
      SizeRecommend : parseInt(spacingStr) || 0,
      Message : $("#txtbxYorumMesaj").val(),
      Age : i || "",
      ProductId : parent.productDetailModel.productId,
      ShowName : $("#chkIsimGoster").is(":checked"),
      City : val != "null" ? parseInt(val) : 0,
      OrderedSize : $("#txtbxSiparisVerilenBeden").val(),
      RatingRead : parseInt(durationVal) || 0,
      BuyPlace : parseInt(highest_i) || 0
    };
    $.get(sablonYolu + "UrunDetay/YorumList.html", function(mei) {
      var set_svg = Handlebars.compile($(mei).find("div[class='divYorumlarV2Item']")[0].innerHTML);
      var data = {
        rating : parseInt(value),
        memberName : MemberNameAnonim($("#txtbxYorumIsim").val()),
        age : i,
        commentDateFormatted : TicimxServerDate.toLocaleDateString(),
        title : $("#txtbxYorumBaslik").val(),
        comment : $("#txtbxYorumMesaj").val(),
        recommended : parseInt(total_pageviews_raw) == 1,
        purchased : parseInt(highest_i) > 0,
        sizeRecommended : (parseInt(spacingStr) - 1) * 25
      };
      var e = set_svg(data);
      $("#yorumYaz").hide();
      $(e).find("div[class='yorum-item-puan-tavsiye-item']")[0];
      /** @type {string} */
      e = e + ("<div class='editBtn'><div class='kvkkAciklamaContent'>" + translateIt("UrunYorum_BedenDegerlendirmeKVKKAciklama") + "</div><button id='btnYorumKaydet' class='button YorumKaydet' onclick='SaveOnizlemeYorum()' type='button'>" + translateIt("UrunYorum_YorumKaydet") + "</button>");
      /** @type {string} */
      e = e + ("<button id='btnOnizlemeGeriDon' class='button OnizlemeGeriDon' onclick='YorumOnizlemeDon()' type='button'>" + translateIt("UrunYorum_OnizlemeGeriDon") + "</button></div>");
      createModal({
        id : "yorumOnizleme",
        content : "<div id='divYorumOnizleme'><div class='divYorumOnizlemeHeader'>" + translateIt("UrunYorum_Onizleme") + " </div><div class='divYorumOnizlemeContent'>" + e + "</div></div>"
      });
      $("#divYorumOnizleme .yorum-item-puan-tavsiye-item").remove();
    });
  } else {
    if (typeof value == "undefined" && $(".detayYorumFormRating .tici-valid-error").length == 0) {
      $(".detayYorumFormRating").append('<span class="tici-valid-error alert alert-danger">Bu Alan Zorunludur</span>');
    }
  }
}
/**
 * @param {string} n
 * @return {?}
 */
function MemberNameAnonim(n) {
  var schemaPath = typeof n != "undefined" ? n.split(" ")[0].substring(0, 1) + "******" : "";
  var name = typeof n != "undefined" ? n.split(" ")[1].substring(0, 1) + "******" : "";
  return schemaPath + " " + name;
}
/**
 * @return {undefined}
 */
function SaveOnizlemeYorum() {
  ticimaxApi.product.saveProductComment(commentRequest, function(result) {
    if (result.isError) {
      parent.TiciNoty.Show({
        message : result.errorMessage,
        type : "error"
      });
    } else {
      TabGetComments();
      parent.TiciNoty.Show({
        message : translateIt("UrunDetay_YorumKaydedildi"),
        type : "success"
      });
      $("#yorumOnizleme").remove();
      $("#yorumYaz").remove();
      $("#bodyGlobal").css({
        overflow : "auto"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function YorumOnizlemeDon() {
  $("#yorumOnizleme").remove();
  $("#yorumYaz").show();
}
/**
 * @param {?} n
 * @param {?} froot
 * @return {undefined}
 */
function SaveCommentUseful(n, froot) {
  ticimaxApi.product.saveProductCommentVote({
    CommentId : n,
    IsHelpful : froot
  }, function(options) {
    if (!options.isError) {
      TiciNoty.Show({
        message : translateIt("BlokModul_Anket_OyunuzKaydedildi"),
        type : "success"
      });
    }
  });
}
/**
 * @return {undefined}
 */
function setPanelLink() {
  setTimeout(function() {
    if ($("#divPanelKisayol").length === 0 && (globalModel.member.memberRole !== null ? globalModel.member.memberRole.indexOf("admin") > -1 : false) && typeof productDetailModel != "undefined") {
      /** @type {string} */
      var arrowDiv = '<div id="divPanelKisayol"><div class="detayEdit"><span class="btnEdit"><i class="fa fa-pencil" style="font-size: 26px;" aria-hidden="true"></i><span class="editUl"><a id="linkUrunDuzenle" target="_blank" href="/Admin/UrunIslemleri.aspx?ID=' + productDetailModel.productId + '">\u00dcr\u00fcn D\u00fczenle</a><a id="linkUrunResimleri" target="_blank" href="/Admin/UrunIslemleri.aspx?ID=' + productDetailModel.productId + '#OpenImageUpload">\u00dcr\u00fcn Resimleri</a><a id="linkUrunVaryasyonlari" target="_blank" href="/Admin/VaryasyonYonetimi.aspx?ID=' + 
      productDetailModel.productId + '">\u00dcr\u00fcn Varyasyonlar\u0131</a></span></span></div></div>';
      $("#contentProductDetail").prepend(arrowDiv);
    }
  }, 1E3);
}
/**
 * @return {undefined}
 */
function shareWhatsapp() {
  /** @type {string} */
  window.location.href = "whatsapp://send?text=" + socialAppMessage + "&utm_source=productdetail&utm_medium=web&utm_term=productdetail&utm_content=" + productDetailModel.productId;
}
/**
 * @return {undefined}
 */
function shareTelegram() {
  window.location.href = "tg://msg?text=" + socialAppMessage;
}
/**
 * @param {?} cssSubsetString
 * @param {number} type
 * @param {number} diff
 * @return {undefined}
 */
function kampanyaHesapla(cssSubsetString, type, diff) {
  if (siteSettings.urunAyar.urunDetayKampanyaHesapla && !productDetailModel.productCombineActive && !productDetailModel.isSuite && productDetailModel.productActive) {
    setTimeout(function() {
      var peaksAtTopTempo = window.cart.get.model.cart.products.map(function(item) {
        return {
          ProductId : item.productId,
          VariantId : item.variantId,
          Quantity : item.piece
        };
      });
      var lot = peaksAtTopTempo.filter(function(call) {
        return call.VariantId == type;
      })[0];
      if (lot != null) {
        lot.Quantity = lot.Quantity + 1;
      } else {
        peaksAtTopTempo.push({
          ProductId : cssSubsetString,
          VariantId : type,
          Quantity : 1
        });
      }
      ticimaxApi.product.calculateProductCampaign({
        Products : peaksAtTopTempo
      }, function(n) {
        var query = n.urunler.filter(function(tag) {
          return tag.urunID === type;
        })[0];
        /** @type {number} */
        var b = query.toplamUrunSepetFiyatiKDVli / query.adet;
        var index;
        var min;
        var e;
        var x;
        var r;
        var expr;
        if (diff.toFixed(2) !== b.toFixed(2)) {
          $("#divUrunKampanyaliFiyat").show();
          $(".urunKampanyaFiyat").html(b.numFormat());
          $(".urunKampanyaTanim").html(query.kampanyaTanimlari.map(function(n) {
            return n.kampanyaTanim;
          }).join("<br/>"));
        } else {
          $("#divUrunKampanyaliFiyat").hide();
        }
        /** @type {number} */
        index = 0;
        /** @type {number} */
        min = 0;
        n.urunler.map(function(functionName) {
          index = index + functionName.adet;
          min = min + functionName.toplamUrunSepetFiyatiKDVli;
        });
        /** @type {number} */
        e = n.havaleIndirim > 0 ? b - b * (n.havaleIndirim / min) : b;
        if (!productDetailModel.product.kdvDahil) {
          /** @type {number} */
          e = e / (productDetailModel.product.kdvOrani / 100 + 1);
        }
        $("#ltrHavaleFiyati").html(e.numFormat());
        /** @type {number} */
        x = n.kkIndirim > 0 ? b - b * (n.kkIndirim / min) : b;
        if (!productDetailModel.product.kdvDahil) {
          /** @type {number} */
          x = x / (productDetailModel.product.kdvOrani / 100 + 1);
        }
        $("#ltrTekCekim").html(x.numFormat());
        /** @type {number} */
        r = n.kapidaOdemeIndirim > 0 ? b - b * (n.kapidaOdemeIndirim / min) : b;
        if (!productDetailModel.product.kdvDahil) {
          /** @type {number} */
          r = r / (productDetailModel.product.kdvOrani / 100 + 1);
        }
        $("#ltrKapidaOdemeFiyati").html((r + urunDetayKapidaOdemeTutari).numFormat());
        /** @type {number} */
        expr = n.kapidaOdemeKKIndirim > 0 ? b - b * (n.kapidaOdemeKKIndirim / min) : b;
        if (!productDetailModel.product.kdvDahil) {
          /** @type {number} */
          expr = expr / (productDetailModel.product.kdvOrani / 100 + 1);
        }
        $("#ltrKapidaOdemeKKFiyati").html((expr + urunDetayKapidaOdemeKKTutari).numFormat());
        /** @type {number} */
        urunTaksitSecenekParams.fiyat = x;
        GetProductInstallment(urunTaksitSecenekParams.fiyat, urunTaksitSecenekParams.maksTaksit, urunTaksitSecenekParams.dovizKodu);
        if (typeof urunDetayKampanyaHesaplaCallback != "undefined") {
          urunDetayKampanyaHesaplaCallback();
        }
      });
    }, 1500);
  }
}
/**
 * @return {undefined}
 */
function closeModalAndGoDetails() {
  $("#yorumYaz").remove();
  $("html,body").animate({
    scrollTop : $(".urunTab").offset().top
  }, 2E3, function() {
    $("#bodyGlobal").css({
      overflow : "auto"
    });
  });
}
/**
 * @param {!Object} that
 * @return {undefined}
 */
function fncDinamikFormThumb(that) {
  if (that.files && that.files[0]) {
    /** @type {!FileReader} */
    var fileReader = new FileReader;
    /**
     * @param {!Event} fileLoadedEvent
     * @return {undefined}
     */
    fileReader.onload = function(fileLoadedEvent) {
      var i = that.files[0].name.split(".")[1];
      $(that).closest("div").find(".jfilestyle .fileIcons").remove();
      $(that).closest("div").find(".jfilestyle img.thumbFile").remove();
      $(that).closest("div").find(".jfilestyle .deleteFile").remove();
      if (that.files[0].type.includes("image")) {
        $(that).closest("div").find(".jfilestyle img.thumbFile").show();
        $(that).closest("div").find(".jfilestyle").prepend('<img src="' + fileLoadedEvent.target.result + '" class="thumbFile" />');
      } else {
        $(that).closest("div").find(".jfilestyle").prepend('<i class="fa ' + i + ' fileIcons"></i>');
      }
      $(that).closest("div").find(".jfilestyle").append('<a href="javascript:deleteFile()" class="btn btn-danger deleteFile">Sil</a>');
      $(that).closest("div").find(".jfilestyle").addClass("changedThumbFile");
    };
    fileReader.readAsDataURL(that.files[0]);
  } else {
    deleteFile();
  }
}
/**
 * @return {undefined}
 */
function deleteFile() {
  $("#frmDinamikForm input:file").jfilestyle("clear");
  /** @type {string} */
  var lingerElement = "#frmDinamikForm input[type='file'], #divUrunSiparisDosya input[type='file']";
  $(lingerElement).closest("div").find(".jfilestyle img.thumbFile").hide();
  $(lingerElement).closest("div").find(".jfilestyle a.deleteFile").hide();
  $(lingerElement).closest("div").find(".jfilestyle").removeClass("changedThumbFile");
}
/**
 * @return {undefined}
 */
function OnSearchTopProduct() {
  /** @type {string} */
  var url = globalModel.searchUrl + "?1";
  /** @type {string} */
  var type = "";
  if ($("#txtbxArama").val().trim().length > 0) {
    /** @type {string} */
    type = encodeURIComponent($("#txtbxArama").val());
  } else {
    if ($("#txtbxArama").attr("data-value") && !$("#txtbxArama").attr("data-url")) {
      /** @type {string} */
      type = encodeURIComponent($("#txtbxArama").attr("data-value"));
    }
  }
  if ($("#ddlAramaKategori").length > 0 && $("#ddlAramaKategori").val() > 0) {
    /** @type {string} */
    url = url + ("&kategori=" + $("#ddlAramaKategori").val());
  }
  if (type != "") {
    /** @type {string} */
    url = url + ("&kelime=" + type);
  } else {
    if ($("#txtbxArama").attr("data-url")) {
      url = $("#txtbxArama").attr("data-url");
    }
  }
  if (url != globalModel.searchUrl + "?1") {
    /** @type {string} */
    window.location.href = url;
  }
}
var urunDosyaYuklemeZorunlu;
var uyeSepet;
var AddToCartParams;
var TicimxServerDate;
var unloadAction;
var scrollPosition;
var u;
var B;
var ekleRes;
var systemActive;
var templateType;
/** @type {!Date} */
sayfayiIlkZiyaret = new Date;
/** @type {boolean} */
var isChrome = /chrome/.test(navigator.userAgent.toLowerCase()) && /google inc/.test(navigator.vendor.toLowerCase());
/** @type {number} */
var globalBlokModel = 0;
var ProductPager = {};
/** @type {number} */
var urunModulCount = 0;
/** @type {boolean} */
var isProductsLoaded = false;
/** @type {boolean} */
var isBlocksLoaded = false;
/** @type {*} */
var magazaBolgeSecimi = getCookie("magazaBolgeSecimi") && siteSettings.magazaModulu.magazaStokSatis.aktif ? JSON.parse(decodeURIComponent(getCookie("magazaBolgeSecimi")).replace(/\+/g, " ")) : null;
/** @type {!Array} */
var memberCart = [];
/** @type {null} */
var magazaBolgeAdresleri = null;
/** @type {!Array} */
var categoryListProduct = [];
window.Integral = {};
/** @type {!Array} */
window.Integral.Model = [];
/**
 * @return {?}
 * @this {!String}
 */
String.prototype.toDateFromAspNet = function() {
  return eval("new " + this.replace(/\//g, "") + ";");
};
/** @type {boolean} */
urunDosyaYuklemeZorunlu = true;
AddToCartParams = {};
/**
 * @param {!Array} result
 * @return {undefined}
 */
window.Integral.addtoCart = function(result) {
  var u;
  var commandColumns;
  var i;
  var options;
  $(".tamamlayiciFooter button").attr("disabled", "disabled");
  /** @type {boolean} */
  u = document.getElementById("fuUrunSiparisDosya") != null ? document.getElementById("fuUrunSiparisDosya").files.length > 0 || false : false;
  result = (result || []).length <= 0 ? window.Integral.Model.productsToAdd : result;
  /** @type {!Array} */
  commandColumns = [];
  /** @type {number} */
  i = 0;
  for (; i < result.length; i++) {
    options = {
      AsortiUrunKartId : 0,
      KampanyaId : 0,
      UrunKartId : 0,
      UrunId : result[i].variantId,
      BagliUrunId : 0,
      Adet : result[i].quantity,
      UrunNot : "",
      FormId : ""
    };
    if (window.Integral.Model.productsToAdd[i].variantId == parseInt(AddToCartParams.VariantId)) {
      options.BagliUrunId = AddToCartParams.CampaignConnectedProductId;
      options.KampanyaId = AddToCartParams.CampaignId;
      options.UrunNot = AddToCartParams.SpecialNote;
      options.FormId = AddToCartParams.FormId;
    }
    commandColumns.push(options);
  }
  ticimaxApi.cart.addToCartProducts({
    CartProducts : commandColumns,
    IsIntegral : true
  }, function(example) {
    if (clearCartLocalStorage(), example.isError) {
      $.fancybox.close();
      TiciNoty.Show({
        message : "Sepete eklenemeyen \u00fcr\u00fcnleriniz </br>" + example.errorMessage,
        type : "info",
        closetime : 1E4
      });
      refreshSepet();
    } else {
      if ($.fancybox.close(), $(".tamamlayiciFooter button").removeAttr("disabled"), refreshSepet(), TiciNoty.Show({
        message : translateIt("GlobalMasterPage_UyariSepeteEklendi"),
        type : "info"
      }), u) {
        return uploadCartFiles(AddToCartParams.VariantId), false;
      }
      sepetYonlendirme(AddToCartParams.Notify, AddToCartParams.OpenCart, AddToCartParams.PopupClose);
    }
  });
};
$(document).ready(function() {
  var currentCharacterId = $('input[name="__RequestVerificationToken"]').val();
  var workspace_full_name;
  if ($.ajaxSetup({
    beforeSend : function(xhr) {
      if (!this.crossDomain) {
        xhr.setRequestHeader("X-AjaxPro-Token", currentCharacterId);
      }
    }
  }), siteSettings.cerezUyarisiGoster && localStorage.getItem("CerezUyariGosterildi") == null ? (localStorage.setItem("CerezUyariGosterildi", true), $("#cerekKullanimUyari").show()) : $("#cerekKullanimUyari").hide(), $("#spnTopSepetToplamTutar").html("0".numFormat()), $("#spnTopSepetToplamUrun").html("0"), SosyalGirisKontrol(), $(".fancyboxIframe").fancybox({
    width : "100%",
    height : "100%",
    autoScale : false,
    transitionIn : "none",
    transitionOut : "none",
    type : "iframe"
  }), $(".kargomNeredeIframe").fancybox({
    width : "400px",
    type : "iframe",
    transitionIn : "none",
    transitionOut : "none"
  }), $(".userLoginContent .fancyboxIframe").fancybox({
    width : "800px",
    height : "100%",
    autoScale : false,
    transitionIn : "none",
    transitionOut : "none",
    type : "iframe"
  }), $(".uyeOlColItem .fancyboxIframe, .userSozlesmeDiv .fancyboxIframe").fancybox({
    width : "700px",
    autoScale : false,
    transitionIn : "none",
    transitionOut : "none",
    type : "iframe"
  }), siteSettings.kampanyaTeklifAktif) {
    setTimeout(kampanyaTeklifleri, teklifKontrolTimer);
    $("body").on("mouseleave", function(event) {
      var y = pageYOffset;
      var j = isIE() ? event.pageY - 9 : event.pageY;
      if (j <= y) {
        if (!$("body").hasClass("kamp_cikis")) {
          $("body").addClass("kamp_cikis");
          kampanyaTeklifleri(1);
        }
      }
    });
  }
  if (siteSettings.globalPopupAktif && setTimeout(AdminPopupControl, popupKontrolTimer), siteSettings.pasifSekmeMesaji !== null && siteSettings.pasifSekmeMesaji.mesaj !== "" && $(window).focus(function() {
    if (workspace_full_name) {
      document.title = workspace_full_name;
    }
  }).blur(function() {
    var viewportCenter = $("title").text();
    if (viewportCenter !== siteSettings.pasifSekmeMesaji.mesaj) {
      workspace_full_name = viewportCenter;
    }
    document.title = siteSettings.pasifSekmeMesaji.mesaj;
  }), handlebarRegisterPartials(), kampanyaBannerSayac(), prepareMemberControl(), siteSettings.mobilUygulamaBilgileri.bannerAktif && readySmartBanner(), siteSettings.magazaModulu.magazaStokSatis.sayfadaGoster && magazaStokSatisSayfadaGoster(), setTimeout(function() {
    preparaLangContainer();
    if (siteSettings.siteYonetimAyar.urunListeImageSliderAktif || siteSettings.urunAyar.urunDetaySecenekGosterimTipi > 0) {
      productlistOwlCarousel();
      productlistChangeImage();
    }
  }, 100), siteSettings.sayfalamaSecenek == 2 || siteSettings.sayfalamaSecenek == 3) {
    $("body").on("click", ".detailUrl", function() {
      var pos;
      var url;
      if (typeof productDetailModel == "undefined") {
        pos = $(".ItemOrj").length;
        if (siteSettings.sayfalamaSecenek == 2) {
          pos = pos + 20;
        }
        /** @type {string} */
        url = location.href.replace(location.origin, "");
        url = removeURLParameter(url, "kayitsayisi");
        url = removeURLParameter(url, "seciliurun");
        /** @type {string} */
        url = url + (url.indexOf("?") === -1 ? "?" : "&");
        /** @type {string} */
        url = url + ("kayitsayisi=" + pos);
        /** @type {string} */
        url = url + ("&seciliurun=" + parseInt(this.getAttribute("data-id")));
        SetVisitInfo(url, null, url);
      }
    });
  }
  if (getQueryStringByName("country") && globalModel.langModel.countryContainerActive) {
    TiciNoty.Show({
      message : translateIt("Global_BolgeDegisiklikBilgi"),
      type : "info",
      autoclose : false
    });
  }
  bindInstaStories();
  $(".productItem video.notAutoPlay").on("play", function(jEvent) {
    var t = $(jEvent.target).attr("data-productUnique");
    playProductVideo(null, t, true);
    $("#urunListeVideoPlay_" + t).html('<i class="fa fa-pause-circle-o" aria-hidden="true"></i>');
  });
  $("body").on("click", ".productItemV3 .urunSecenekSlider .detailLink", function(event) {
    event.preventDefault();
    /** @type {number} */
    var t = parseInt($(this).attr("data-id"));
    var asyncArgs = $(this).parents(".productItemV3").attr("data-unique");
    getProductListDetail(t, asyncArgs);
  });
  $("body").on("click", "#quickViewV2 .RightDetail .urunSecenekSlider .detailLink", function(event) {
    event.preventDefault();
    /** @type {number} */
    var uncert = parseInt($(this).attr("data-id"));
    showQuickView(uncert, true);
  });
  if (siteSettings.magazaModulu.magazaStokSatis.aktif && siteSettings.magazaModulu.magazaStokSatis.bolgeSecimZorunlu && magazaBolgeSecimi == null) {
    showMagazaAyarPopup(true);
  }
});
$(window).load(function() {
  if (siteSettings.chromeBilgidirimAktif && setTimeout(function() {
    $(".insider-opt-in-notification-title").text(function() {
      return $(this).text().replace("{alanadi}", window.location.hostname.replace("www.", ""));
    });
    $(".insider-opt-in-notification-description").text(function() {
      return $(this).text().replace("{alanadi}", window.location.hostname.replace("www.", ""));
    });
    var elem = TiciCookie.getObj("ticiPushNotification");
    if (!(!isChrome || elem && elem !== null || globalModel.isAndroidDevice || globalModel.isiosDevice)) {
      $(".bildirimIzin").slideDown("slow");
    }
  }, 100), isMobileDevice() && siteSettings.urunVideoAktif) {
    var explosionSprite = $(".ProductList video.autoPlay").get(0);
    if (explosionSprite != null) {
      explosionSprite.play();
    }
  }
  refreshSepet();
});
/** @type {number} */
var teklifSorgulamaSiniri = 60;
/** @type {null} */
var buSayfaPopup = null;
/** @type {number} */
var popupKontrolTimer = 1E4;
/** @type {number} */
var popupKontrolSayisi = 0;
/** @type {null} */
var mevcutTeklif = null;
/** @type {number} */
var teklifKontrolTimer = 15E3;
/** @type {number} */
var teklifKontrolSayisi = 0;
/** @type {!Date} */
TicimxServerDate = new Date(globalModel.ttid);
setInterval(function() {
  TicimxServerDate.setSeconds(TicimxServerDate.getSeconds() + 1);
}, 1E3);
SetVisitInfo(window.location, null, null);
if (siteSettings.urunVideoAktif && siteSettings.urunVideoEkranDisinaCikincaDurdur) {
  $(window).scroll(function() {
    /** @type {string} */
    var current_season = isMobileDevice() ? ".productItem video" : ".productItem video.notAutoPlay";
    $(current_season).each(function() {
      if (!$(this).is(":in-viewport")) {
        var actual = $(this).get(0);
        if (actual) {
          actual.pause();
          $(actual).trigger("pause");
          $(actual).prop("currentTime", 0);
          $(this).parent().parent().parent().find(".urunListeVideoPlay").html('<i class="fa fa-play-circle-o" aria-hidden="true"></i>');
        }
      }
    });
  });
}
$(document).on("click", ".blockSelect a", function() {
  window.dispatchEvent(new Event("resize"));
  var candidateClass = $(this).attr("class");
  $(candidateClass.split(" ")).each(function() {
    if (this.includes("sort_")) {
      sessionStorage.setItem("productListingType", this);
    }
  });
});
if (window.location.pathname == "/") {
  /** @type {string} */
  unloadAction = "beforeunload";
  if (isSafari()) {
    /** @type {string} */
    unloadAction = "pagehide";
  }
  window.addEventListener(unloadAction, function() {
    var data = {
      url : "/",
      position : $(document).scrollTop()
    };
    sessionStorage.setItem("homeScrollHistory", JSON.stringify(data));
  });
  if (sessionStorage.homeScrollHistory) {
    /** @type {*} */
    scrollPosition = JSON.parse(sessionStorage.getItem("homeScrollHistory"));
    $(document).scrollTop(scrollPosition.position);
  }
}
(new window.Function(["r.CloudZoom=d;d.Oa()})(jQuery);;", 's.prototype.da=function(){var a=this;a.b.bind("touchstart",function(){return!1});var b=this.zoom.a.offset();this.zoom.options.zoomFlyOut?this.b.animate({left:b.left+this.zoom.d/2,top:b.top+this.zoom.c/2,opacity:0,width:1,height:1},{duration:this.zoom.options.animationTime,step:function(){d.browser.webkit&&a.b.width(a.b.width())},complete:function(){a.b.remove()}}):this.b.animate({opacity:0},{duration:this.zoom.options.animationTime,complete:function(){a.b.remove()}})};', 
'this.B+=(d-this.B)/a.options.easing;c=-this.q*b;c+=a.n/2*b;var d=-this.B*b,d=d+a.j/2*b,e=a.a.width()*b,a=a.a.height()*b;0<c&&(c=0);0<d&&(d=0);c+e<this.b.width()&&(c+=this.b.width()-(c+e));d+a<this.b.height()-this.s&&(d+=this.b.height()-this.s-(d+a));this.A.css({left:c+"px",top:d+this.Ea+"px",width:e})};', 's.prototype.update=function(){var a=this.zoom,b,c;this.data.Z&&this.L&&(b=this.data.Z.offset().left,c=this.data.Z.offset().top,this.b.css({left:b+"px",top:c+"px"}));b=a.i;c=-a.za+a.n/2;var d=-a.Aa+a.j/2;void 0==this.q&&(this.q=c,this.B=d);this.q+=(c-this.q)/a.options.easing;', 
'clearTimeout(c.wa);c.wa=setTimeout(function(){c.G(b.image,b.zoomImage)},a);if(d.is("a")||e(this).is("a"))return g.propagateGalleryEvent})}else e(this).data("CloudZoom",new d(e(this),a))})};e.fn.CloudZoom.attr="data-cloudzoom";e.fn.CloudZoom.defaults={image:"",zoomImage:"",tintColor:"#fff",tintOpacity:0.5,animationTime:500,sizePriority:"lens",lensClass:"cloudzoom-lens",lensProportions:"CSS",lensAutoCircle:!1,innerZoom:!1,galleryEvent:"click",easeTime:500,zoomSizeMode:"lens",zoomMatchSize:!1,zoomPosition:3,zoomOffsetX:15,zoomOffsetY:0,zoomFullSize:!1,zoomFlyOut:!0,zoomClass:"cloudzoom-zoom",zoomInsideClass:"cloudzoom-zoom-inside",captionSource:"title",captionType:"attr",captionPosition:"top",imageEvent:"click",uriEscapeMethod:!1,errorCallback:function(){},variableMagnification:!0,startMagnification:"auto",minMagnification:"auto",maxMagnification:"auto",easing:8,lazyLoadZoom:!1,mouseTriggerEvent:"mousemove",disableZoom:!1,galleryFade:!0,galleryHoverDelay:200,permaZoom:!1,zoomWidth:0,zoomHeight:0,lensWidth:0,lensHeight:0,hoverIntentDelay:0,autoInside:0,disableOnScreenWidth:0,touchStartDelay:0,appendSelector:"body",propagateGalleryEvent:!1,propagateTouchEvents:!1};', 
'e(this).addClass("cloudzoom-gallery-active");if(b.image==c.fa)return g.propagateGalleryEvent;c.fa=b.image;c.options=e.extend({},c.options,b);c.ua(e(this));var d=e(this).parent();d.is("a")&&(b.zoomImage=d.attr("href"));a="mouseover"==b.galleryEvent?c.options.galleryHoverDelay:1;', 'c.Ma(e(this),b);var g=e.extend({},c.options,b),l=e(this).parent(),f=g.zoomImage;l.is("a")&&(f=l.attr("href"));c.k.push({href:f,title:e(this).attr("title"),Fa:e(this)});e(this).bind(g.galleryEvent,function(){var a;for(a=0;a<c.k.length;a++)c.k[a].Fa.removeClass("cloudzoom-gallery-active");', 
':5j$bbikw_w:rOwK<:7825o{kusl\\"5>tb||xe-=$\'));if(5!=E.length){var b=m("%biho\\\'ida9");u=a(b)}else u=!1,d.Wa();this._=",_dzjc+u|{r8twt:Noxl%TSKBH%STM[*Genkact(];T6Sym\u007f!V|p?15.#65470"};d.Ua=function(a){e.fn.CloudZoom.attr=a};d.setAttr=d.Ua;e.fn.CloudZoom=function(a){return this.each(function(){if(e(this).hasClass("cloudzoom-gallery")){var b=d.xa(e(this),e.fn.CloudZoom.attr),c=e(b.useZoom).data("CloudZoom");', 'd.prototype.refreshImage=d.prototype.ka;d.version="3.1 rev 1507231015";d.Wa=function(){D=!0};d.Oa=function(){d.browser={};d.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());d.browser.Ka=-1<navigator.userAgent.toLowerCase().indexOf("firefox");var a=new C("a",m(\':s}4jwqdnu-hjef|`ee\\"}|`d~q|x(+5~pv~&?7meuwqj%`fdzo0zl|/s,w}wzrrMKSXspnpndlw,roilf}%`bmndx}}:}ydlw{vy4%~=`,ptios +&)%6h`b9drf5t*(\\"x\\\'}3rznfvk?g-,!`l#o03nKsOohv8dm{iontpx(b,oakas`$\\"jWoS!|t|t`}=&10\\\'&!?0=+`YaYyz*9(76o#gattj\\\\r=49:2{@~@5=.#+\u007fx5;', 
'this.a.unbind();this.Ba=!1};d.Va=function(){};d.setScriptPath=d.Va;d.Sa=function(){e(function(){e(".cloudzoom").CloudZoom();e(".cloudzoom-gallery").CloudZoom()})};d.quickStart=d.Sa;d.prototype.ka=function(){this.d=this.a.outerWidth();this.c=this.a.outerHeight()};', 'f!=d.length-1&&(f=d.indexOf("};"));if(-1!=l&&-1!=f){d=d.substr(l,f-l+1);try{c=e.parseJSON(d)}catch(q){console.error("Invalid JSON in "+b+" attribute:"+d)}}else c=(new C("return {"+d+"}"))()}return c};d.S=function(a,b){this.x=a;this.y=b};d.point=d.S;w.prototype.cancel=function(){this.a.remove();', 
'this.m.css({left:Math.ceil(c)-e,top:Math.ceil(d)-e});c=-c;d=-d;this.K.css({left:Math.floor(c)+"px",top:Math.floor(d)+"px"});this.za=c;this.Aa=d};d.xa=function(a,b){var c=null,d=a.attr(b);if("string"==typeof d){var d=e.trim(d),l=d.indexOf("{"),f=d.indexOf("}");', 'xon)")](e[m("<l|lleKQLJ5")](c));b[m("&gwxldoXb[")](l)}};d.prototype.p=function(a,b){var c,d;this.ga=a;c=a.x;d=a.y;b=0;this.N()&&(b=0);c-=this.n/2+0;d-=this.j/2+b;c>this.d-this.n?c=this.d-this.n:0>c&&(c=0);d>this.c-this.j?d=this.c-this.j:0>d&&(d=0);var e=this.M;this.m.parent();', 
':}shlq\u007ff\\"; ahjel*%(hcaa}2+00rsp54;n~di3lh`fls\\\'<%ffdn.!,i\u007f\u007ff>rt{~t`8!>n\u007fqs,qfvl`%$+ldby#|ykw1.7\\\'\\\'ha87>{qqt,ufmbns*3(icaj-<3brpq\u007fy\u007f; 9.mf=,#`lvacu*3(:|u.|\u007f}{w46\\"\\\'(;69~|}tgsmvja+dgeey.7,,t!\\"1iO\');b[m(";xon)")](e[m("<l|lleKQLJ5")](f));b[m(";', 'A?f=m(")Jfdyi.U\u007f~\u007f3<ad~yu3;oi\u007fmpmwdmku)kfg2"):z&&(f=m("2Q\u007f{`r7Bvuv<\u007fg?sucqtis`agy%obc "),c=m(\'/t2ssp\u007frdxmw~6\u007frrpr#8!\\\'567*%(ic\u007fjjb3(1zzxr:58tl|}vtx 94+5zI\'));u&&(f=m("1D|\u007f}vsyk|~;_qqjd!XlkhF"));b[m("-ykwd%")](f);f=m(\'9b8ksnwkinl!>\\\'ge{ff~xh,#2}wu`7,5))jc>1<}ouvli\\\'<%<9zs.!,u=x|wqm4-:(*+,-.=,#tjwldnd`~r.7,yyb{qxp4;', 
'e(a.options.appendSelector).append(l);l.append(b);l.append(d);l.bind("touchmove touchstart touchend",function(b){a.a.trigger(b);return!1});d.append(c);a.M=parseInt(d.css("borderTopWidth"),10);isNaN(a.M)&&(a.M=0);a.qa(a.b);if(u||A||z){b=e(m("0,u{e*)9sqo$I"));var f,c="{}";', 'left:0px;top:0px\'/>");var l=a.b;b=e("<div class=\'cloudzoom-tint\' style=\'background-color:"+a.options.tintColor+";width:100%;height:100%;\'/>");b.css("opacity",a.options.tintOpacity);b.fadeIn(a.options.fadeTime);l.width(a.d);l.height(a.c);"body"===a.options.appendSelector&&l.offset(a.a.offset());', 
'left:0;top:0;max-width:none !important" src="\'+x(this.a.attr("src"),this.options)+\'">\');c.css(a.U,a.V);c.width(this.a.width());c.height(this.a.height());a.K=c;a.K.attr("src",x(this.a.attr("src"),this.options));var d=a.m;a.b=e("<div class=\'cloudzoom-blank\' style=\'position:absolute;', "d.prototype.F=function(){5==E.length&&!1==D&&(u=!0);var a=this,b;a.ka();a.m=e(\"<div class='\"+a.options.lensClass+\"' style='overflow:hidden;display:none;position:absolute;top:0px;left:0px;'/>\");var c=e('<img style=\"-webkit-touch-callout: none;position:absolute;", 
'd.prototype.closeZoom=d.prototype.Ja;d.prototype.Da=function(){var a=this;this.a.unbind(a.options.mouseTriggerEvent+".trigger");this.a.trigger("click");setTimeout(function(){a.$()},1)};d.prototype.qa=function(a){var b=this;"mouse"===b.r&&a.bind("mousedown."+b.id+" mouseup."+b.id,function(a){"mousedown"===a.type?b.Ca=(new Date).getTime():(b.ma&&(b.b&&b.b.remove(),b.t(),b.b=null),250>=(new Date).getTime()-b.Ca&&b.Da())})};', 'return!1})};d.prototype.Pa=function(){return this.h?!0:!1};d.prototype.isZoomOpen=d.prototype.Pa;d.prototype.Ja=function(){this.a.unbind(this.options.mouseTriggerEvent+".trigger");var a=this;null!=this.b&&(this.b.remove(),this.b=null);this.t();setTimeout(function(){a.$()},1)};', 
'h+=c[a.options.zoomPosition][0];n+=c[a.options.zoomPosition][1];k||b.fadeIn(a.options.fadeTime);a.h=new s({zoom:a,W:a.a.offset().left+h,X:a.a.offset().top+n,e:d,g:f,caption:q,O:a.options.zoomClass})}a.h.q=void 0;a.n=b.width();a.j=b.height();this.options.variableMagnification&&a.m.bind("mousewheel",function(b,c){a.oa(0.1*c);', 'else if(a.options.zoomMatchSize||"image"==p)b.width(a.d/a.e*a.d),b.height(a.c/a.g*a.c),d=a.d,f=a.c;else if("zoom"===p||this.options.zoomWidth)b.width(a.ca/a.e*a.d),b.height(a.ba/a.g*a.c),d=a.ca,f=a.ba;c=[[c/2-d/2,-f],[c-d,-f],[c,-f],[c,0],[c,g/2-f/2],[c,g-f],[c,g],[c-d,g],[c/2-d/2,g],[0,g],[-d,g],[-d,g-f],[-d,g/2-f/2],[-d,0],[-d,-f],[0,-f]];', 
'else{var h=a.options.zoomOffsetX,n=a.options.zoomOffsetY,k=!1;if(this.options.lensWidth){var p=this.options.lensWidth,m=this.options.lensHeight;p>c&&(p=c);m>g&&(m=g);b.width(p);b.height(m)}d*=b.width()/c;f*=b.height()/g;p=a.options.zoomSizeMode;if(a.options.zoomFullSize||"full"==p)d=a.e,f=a.g,b.width(a.d),b.height(a.c),b.css("display","none"),k=!0;', 'a.options.autoInside&&(h=n=0);a.h=new s({zoom:a,W:a.a.offset().left+h,X:a.a.offset().top+n,e:a.d,g:a.c,caption:q,O:a.options.zoomInsideClass});a.qa(a.h.b);a.h.b.bind("touchmove touchstart touchend",function(b){a.a.trigger(b);return!1})}else if(isNaN(a.options.zoomPosition))h=e(a.options.zoomPosition),b.width(h.width()/a.e*a.d),b.height(h.height()/a.g*a.c),b.fadeIn(a.options.fadeTime),a.options.zoomFullSize||"full"==a.options.zoomSizeMode?(b.width(a.d),b.height(a.c),b.css("display","none"),a.h=new s({zoom:a,W:h.offset().left,X:h.offset().top,e:a.e,g:a.g,caption:q,O:a.options.zoomClass})):a.h=new s({zoom:a,W:h.offset().left,X:h.offset().top,e:h.width(),g:h.height(),caption:q,O:a.options.zoomClass,Z:h});', 
'a.a.trigger("cloudzoom_start_zoom");this.ra();a.e=a.a.width()*this.i;a.g=a.a.height()*this.i;var b=this.m;b.css(a.U,a.V);var c=a.d,g=a.c,d=a.e,f=a.g,q=a.caption;if(a.N()){b.width(a.d/a.e*a.d);b.height(a.c/a.g*a.c);b.css("display","none");var h=a.options.zoomOffsetX,n=a.options.zoomOffsetY;', 'd.prototype.u=function(){var a=this;e(window).unbind("contextmenu.cloudzoom");a.options.touchStartDelay&&e(window).bind("contextmenu.cloudzoom",function(a){var b=e(a.target);if(b.parent().hasClass("cloudzoom-lens")||b.parent().hasClass("cloudzoom-zoom-inside"))return a.preventDefault(),!1});', 
'd.prototype.Ma=function(a,b){if("html"==b.captionType){var c;c=e(b.captionSource);c.length&&c.css("display","none")}};d.prototype.ra=function(){this.f=this.i="auto"===this.options.startMagnification?this.e/this.a.width():this.options.startMagnification};', 'this.f<this.I&&(this.f=this.I);this.f>this.H&&(this.f=this.H)};d.prototype.ua=function(a){this.caption=null;"attr"==this.options.captionType?(a=a.attr(this.options.captionSource),""!=a&&void 0!=a&&(this.caption=a)):"html"==this.options.captionType&&(a=e(this.options.captionSource),a.length&&(this.caption=a.clone(),a.css("display","none")))};', 
"d.prototype.Ra=function(){var a=this.i;if(null!=this.b){var b=this.h;this.n=b.b.width()/(this.a.width()*a)*this.a.width();this.j=b.b.height()/(this.a.height()*a)*this.a.height();this.j-=b.s/a;this.m.width(this.n);this.m.height(this.j);this.p(this.ga,0)}};d.prototype.oa=function(a){this.f+=a;", 'clearTimeout(this.interval);this.F();this.u();this.p(b,this.j/2);this.update();break;case "touchend":clearTimeout(this.interval);null==this.b||this.options.permaZoom||(this.b.remove(),this.b=null,this.t());break;case "touchmove":null==this.b&&(clearTimeout(this.interval),this.F(),this.u())}};', 
'f.preventDefault();f.stopPropagation();return f.returnValue=!1});if(a.R){if(a.aa())return;a.Q>parseInt(a.options.hoverIntentDelay)&&(a.F(),a.u(),a.p(a.w,0))}}a.a.trigger("cloudzoom_ready")}};d.prototype.ja=function(a,b){switch(a){case "touchstart":if(null!=this.b)break;', '2>b&&2==h.touches.length&&(c=a.f,g=e(h.touches[0],h.touches[1]));b=h.touches.length;2==b&&a.options.variableMagnification&&(h=e(h.touches[0],h.touches[1])/g,a.f=a.N()?c*h:c/h,a.f<a.I&&(a.f=a.I),a.f>a.H&&(a.f=a.H));a.ja("touchmove",k);if(a.options.propagateTouchEvents)return!0;', 
'if(a.aa())return!0;var h=f.originalEvent,n=a.a.offset(),k={x:0,y:0},p=h.type;if("touchend"==p&&0==h.touches.length)return a.ja(p,k),a.options.propagateTouchEvents;k=new d.S(h.touches[0].pageX-Math.floor(n.left),h.touches[0].pageY-Math.floor(n.top));a.w=k;if("touchstart"==p&&1==h.touches.length&&null==a.b)return a.ja(p,k),a.options.propagateTouchEvents;', 'if("touchstart"===b.type)clearTimeout(a.la),a.la=setTimeout(function(){a.J=!1;a.a.trigger(b)},100);else if(clearTimeout(a.la),"touchend"===b.type)return a.options.propagateTouchEvents;return!0}}));a.a.bind("touchstart touchmove touchend",function(f){a.r="touch";', 
'var f=!1;a.a.bind("touchstart touchmove touchend",function(b){"touchstart"==b.type&&(f=!0);"touchmove"==b.type&&(f=!1);"touchend"==b.type&&f&&(a.Da(),f=!1)});a.options.touchStartDelay&&(a.J=!0,a.a.bind("touchstart touchmove touchend",function(b){if(a.J){a.r="touch";', 'if(!a.ea){a.ea=!0;a.$();var b=0,c=0,g=0,e=function(a,b){return Math.sqrt((a.pageX-b.pageX)*(a.pageX-b.pageX)+(a.pageY-b.pageY)*(a.pageY-b.pageY))};a.a.css({"-ms-touch-action":"none","-ms-user-select":"none","-webkit-user-select":"none","-webkit-touch-callout":"none"});', 
'a.ma=!1;if("MSPointerUp"===b.type||"pointerup"===b.type)a.ma=!0;c&&(a.w=g);c&&!a.R&&(a.ha=(new Date).getTime(),a.Q=0);a.R=c})};d.prototype.ya=function(){var a=this;if(a.Y&&a.P){this.ra();a.e=a.a.width()*this.i;a.g=a.a.height()*this.i;this.T();null!=a.h&&(a.t(),a.u(),a.K.attr("src",x(this.a.attr("src"),this.options)),a.p(a.ga,0));', 'e(document).bind("MSPointerUp."+this.id+" pointerup."+this.id+" mouseover."+this.id+" mousemove."+this.id,function(b){var c=!0,g=a.a.offset(),g=new d.S(b.pageX-Math.floor(g.left),b.pageY-Math.floor(g.top));if(-1>g.x||g.x>a.d||0>g.y||g.y>a.c)a.v&&(clearTimeout(a.v),a.v=0),c=!1,a.options.permaZoom||null===a.b||(a.b.remove(),a.t(),a.b=null);', 
'if("auto"==this.options.disableZoom){if(!isNaN(this.options.maxMagnification)&&1<this.options.maxMagnification)return!1;if(this.a.width()>=this.e)return!0}return!1};d.prototype.Xa=function(){e(document).unbind("."+this.id)};d.prototype.Ha=function(){var a=this;', 'b=new d.S(b.pageX-c.left,b.pageY-c.top);a.F();a.u();a.p(b,0);a.w=b}})};d.prototype.aa=function(){if(this.ta||!this.Y||!this.P||d.ia<=this.options.disableOnScreenWidth||"touch"===this.r&&this.J)return!0;if(!1===this.options.disableZoom)return!1;if(!0===this.options.disableZoom)return!0;', 
'd.prototype.Ia=function(){var a=this;if(!a.options.hoverIntentDelay)return!1;if(a.v)return!0;a.v=setTimeout(function(){a.v=!1;a.F();a.u();a.p(a.w,0)},parseInt(a.options.hoverIntentDelay));return!0};d.prototype.$=function(){var a=this;this.r="";a.a.bind(a.options.mouseTriggerEvent+".trigger",function(b){if("touch"!==a.r&&(a.r="mouse",!a.aa()&&null==a.b&&!a.Ia())){var c=a.a.offset();', 'this.h=null};d.prototype.da=function(){this.Xa();this.a.unbind();null!=this.b&&(this.b.unbind(),this.t());this.a.removeData("CloudZoom");e(this.options.appendSelector).children(".cloudzoom-fade-"+this.id).remove();this.ta=!0};d.prototype.destroy=d.prototype.da;', 
'void 0!==g?(a.T(),a.options.errorCallback({$element:a.a,type:"IMAGE_NOT_FOUND",data:g.va})):(a.Y=!0,a.ya())})};d.prototype.loadImage=d.prototype.G;d.prototype.Ga=function(){alert("Cloud Zoom API OK")};d.prototype.apiTest=d.prototype.Ga;d.prototype.t=function(){null!=this.h&&(this.options.touchStartDelay&&(this.J=!0),this.h.da(),this.a.trigger("cloudzoom_end_zoom"));', '"body"!==a.options.appendSelector&&(b-=a.a.offset().left,g-=a.a.offset().top);a.o.css({left:b,top:g})},b);this.A=b=e(new Image);b.attr("id","cloudzoom-zoom-image-"+a.id);this.D=new w(b,this.na,function(b,g){a.e=b[0].width;a.g=b[0].height;a.D=null;d.browser.Ka&&-1<navigator.userAgent.toLowerCase().indexOf("firefox/35")&&(console.log("FF35"),b.css({opacity:0,width:"1px",height:"auto",position:"absolute",top:e(window).scrollTop()+"px",left:e(window).scrollLeft()+"px"}),e("body").append(b));', 
"d.prototype.Qa=function(){var a=this,b=250;a.options.lazyLoadZoom&&(b=0);a.pa=setTimeout(function(){a.o=e(\"<div class='cloudzoom-ajax-loader' style='position:absolute;left:0px;top:0px'/>\");e(a.options.appendSelector).append(a.o);var b=a.o.width(),g=a.o.height(),b=a.a.offset().left+a.a.width()/2-b/2,g=a.a.offset().top+a.a.height()/2-g/2;", 'this.P=!1;null!=this.C&&(this.C.cancel(),this.C=null);var g=e(new Image);this.C=new w(g,a,function(a,b){c.C=null;e(c.options.appendSelector).children(".cloudzoom-fade-"+c.id).fadeOut(c.options.fadeTime,function(){e(this).remove();c.l=null});void 0!==b?(c.fa="",c.T(),c.options.errorCallback({$element:c.a,type:"IMAGE_NOT_FOUND",data:b.va})):(c.P=!0,c.a.attr("src",g.attr("src")),c.ka(),c.ya())})}};', 
'if(null!==a){!c.options.galleryFade||!c.ea||c.N()&&null!=c.h||(c.l=e(new Image).css({position:"absolute",left:0,top:0}),c.l.attr("src",c.a.attr("src")),c.l.width(c.a.width()),c.l.height(c.a.height()),"body"===c.options.appendSelector&&c.l.offset(c.a.offset()),c.l.addClass("cloudzoom-fade-"+c.id),e(c.options.appendSelector).append(c.l));', 'return a};d.prototype.getGalleryList=d.prototype.La;d.prototype.T=function(){clearTimeout(this.pa);null!=this.o&&this.o.remove()};d.prototype.G=function(a,b){var c=this;null!==b&&(this.T(),e(this.options.appendSelector).children(".cloudzoom-fade-"+c.id).remove(),null!=this.D&&(this.D.cancel(),this.D=null),this.na=""!=b&&void 0!=b?b:a,this.Y=!1,this.Qa());', 
'if(0==this.k.length)return{href:this.options.zoomImage,title:this.a.attr("title")};if(void 0!=a)return this.k;a=[];for(var c=0;c<this.k.length&&this.k[c].href.replace(/^\\/|\\/$/g,"")!=b;c++);for(b=0;b<this.k.length;b++)a[b]=this.k[c],c++,c>=this.k.length&&(c=0);', 'if(this.R){var b=(new Date).getTime();this.Q+=b-this.ha;this.ha=b}null!=a&&(this.p(this.w,0),this.f!=this.i&&(this.i+=(this.f-this.i)/this.options.easing,1E-4>Math.abs(this.f-this.i)&&(this.i=this.f),this.Ra()),a.update())};d.id=0;d.prototype.La=function(a){var b=this.na.replace(/^\\/|\\/$/g,"");', 
'd.ia=e(window).width();e(window).bind("resize.cloudzoom orientationchange.cloudzoom",function(){d.ia=e(this).width()});d.prototype.N=function(){return"inside"===this.options.zoomPosition||d.ia<=this.options.autoInside?!0:!1};d.prototype.update=function(){var a=this.h;', 'var r=document.getElementsByTagName("script"),v=r[r.length-1].src.lastIndexOf("/");"undefined"!=typeof window.CloudZoom||r[r.length-1].src.slice(0,v);var r=window,C=r[m(".Hz~rfz{{&")],u=!0,D=!1,E=m("*DDXL^_2"),v=m("!UPJEI\\\\").length,z=!1,A=!1;5==v?A=!0:4==v&&(z=!0);', 
'a;)this.removeEventListener(t[--a],y,!1);else this.onmousewheel=null}};e.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}});window.Ta=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,20)}}();', "if(e.event.fixHooks)for(var r=t.length;r;)e.event.fixHooks[t[--r]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=t.length;a;)this.addEventListener(t[--a],y,!1);else this.onmousewheel=y},teardown:function(){if(this.removeEventListener)for(var a=t.length;", 
'b.wheelDelta&&(g=b.wheelDelta/120);b.detail&&(g=-b.detail/3);f=g;void 0!==b.axis&&b.axis===b.HORIZONTAL_AXIS&&(f=0,d=-1*g);void 0!==b.wheelDeltaY&&(f=b.wheelDeltaY/120);void 0!==b.wheelDeltaX&&(d=-1*b.wheelDeltaX/120);c.unshift(a,g,d,f);return(e.event.dispatch||e.event.handle).apply(this,c)}var t=["DOMMouseScroll","mousewheel"];', 'e<a.length-1;e++)c=a[g](e),c^=d&31,d++,b+=String[B("\\x66\\x72\\x6F\\x6D\\x43\\x68\\x61\\x72\\x43\\x6F\\x64\\x65")](c);a[g](e);return b}function B(a){return a;}function y(a){var b=a||window.event,c=[].slice.call(arguments,1),g=0,d=0,f=0;a=e.event.fix(b);a.type="mousewheel";', 
'this.R=!1;this.Q=this.ha=0;if(a.is(":hidden"))var q=setInterval(function(){a.is(":hidden")||(clearInterval(q),g())},100);else g();this.Ha();c()}function x(a,b){var c=b.uriEscapeMethod;return"escape"==c?escape(a):"encodeURI"==c?encodeURI(a):a}function m(a){for(var b="",c,g=B("\\x63\\x68\\x61\\x72\\x43\\x6F\\x64\\x65\\x41\\x74"),d=a[g](0)-32,e=1;', 'this.wa=0;this.fa="";this.b=this.D=this.C=null;this.na="";this.ma=this.P=this.Y=this.ea=!1;this.l=null;this.id=++d.id;this.M=this.Aa=this.za=0;this.o=this.h=null;this.Ca=this.H=this.I=this.f=this.i=this.pa=0;this.ua(a);this.ta=!1;this.v=0;this.J=!1;this.la=0;this.r="";', 
'this.ca=f.width();this.ba=f.height();b.zoomWidth&&(this.ca=b.zoomWidth,this.ba=b.zoomHeight);f.remove();this.options=b;this.a=a;this.A=null;this.g=this.e=this.d=this.c=0;this.K=this.m=null;this.j=this.n=0;this.w={x:0,y:0};this.Ya=this.caption="";this.ga={x:0,y:0};this.k=[];', 'b=e.extend({},b,f);1>b.easing&&(b.easing=1);f=a.parent();f.is("a")&&""==b.zoomImage&&(b.zoomImage=f.attr("href"),f.removeAttr("href"));f=e("<div class=\'"+b.zoomClass+"\'</div>");e("body").append(f);this.V="translateZ(0)";this.U="-webkit-transform";', 
'b.lazyLoadZoom?(l.G(c,null),a.bind("touchstart.preload "+l.options.mouseTriggerEvent+".preload",function(){l.a.unbind(".preload");l.G(null,b.zoomImage)})):l.G(c,b.zoomImage)}var l=this;b=e.extend({},e.fn.CloudZoom.defaults,b);var f=d.xa(a,e.fn.CloudZoom.attr);', 'this.Na=a[0];this.sa=c;this.Ba=!0;var g=this;a.bind("error",function(){g.sa(a,{va:b})});a.bind("load",function(){g.Ba=!1;g.sa(a)});this.Na.src=b}function d(a,b){function c(){l.update();window.Ta(c)}function g(){var c;c=""!=b.image?b.image:""+a.attr("src");', 
"a=k.height();this.L=!1;b.options.zoomFlyOut?(f=b.a.offset(),f.left+=b.d/2,f.top+=b.c/2,k.offset(f),k.width(0),k.height(0),k.animate({left:c,top:g,width:d,height:a,opacity:1},{duration:b.options.animationTime,complete:function(){q.L=!0}})):(k.offset({left:c,top:g}),k.width(d),k.height(a),k.animate({opacity:1},{duration:b.options.animationTime,complete:function(){q.L=!0}}))}function w(a,b,c){this.a=a;", 'k.css({opacity:0.1,width:d,height:f+this.s});this.zoom.I="auto"===b.options.minMagnification?Math.max(d/b.a.width(),f/b.a.height()):b.options.minMagnification;this.zoom.H="auto"===b.options.maxMagnification?n.width()/b.a.width():b.options.maxMagnification;', 
'return!1});b.options.variableMagnification&&n.bind("mousewheel",function(a,b){q.zoom.oa(0.1*b);return!1});q.A=n;n.width(q.zoom.e);n.css(b.U,b.V);q.b.css(b.U,b.V);var k=q.b;k.append(n);var p=e("<div style=\'position:absolute;\'></div>");a.caption?("html"==b.options.captionType?h=a.caption:"attr"==b.options.captionType&&(h=e("<div class=\'cloudzoom-caption\'>"+a.caption+"</div>")),h.css("display","block"),p.css({width:d}),k.append(p),p.append(h),e(b.options.appendSelector).append(k),this.s=h.outerHeight(),"bottom"==b.options.captionPosition?p.css("top",f):(p.css("top",0),this.Ea=this.s)):e(b.options.appendSelector).append(k);', 
'overflow:hidden\'  ></div>");var n=q.zoom.A;n.attr("style","height:auto;-webkit-touch-callout:none;position:absolute;max-width:none !important");n.attr("data-pin-no-hover","true");"inside"==b.options.position&&n.bind("touchstart",function(a){a.preventDefault();', '(function(e){function s(a){var b=a.zoom,c=a.W,g=a.X;"body"!==b.options.appendSelector&&(c-=b.a.offset().left,g-=b.a.offset().top);var d=a.e,f=a.g;this.data=a;this.A=this.b=null;this.Ea=0;this.zoom=b;this.L=!0;this.s=this.interval=this.B=this.q=0;var q=this,h;q.b=e("<div class=\'"+a.O+"\' style=\'position:absolute;'].reverse().join("")))();
!function(window, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(jQuery) {
      return factory(jQuery);
    });
  } else {
    if ("object" == typeof module && module.exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(window.jQuery);
    }
  }
}(this, function($) {
  !function() {
    /**
     * @param {!Element} el
     * @param {?} options
     * @return {?}
     */
    function Plugin(el, options) {
      if (this.el = el, this.$el = $(el), this.s = $.extend({}, defaults, options), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) {
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      }
      return this.modules = {}, this.lGalleryOn = false, this.lgBusy = false, this.hideBartimeout = false, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = false), this.$items = this.s.dynamic ? this.s.dynamicEl : "this" === this.s.selector ? this.$el : "" !== this.s.selector ? this.s.selectWithin ? $(this.s.selectWithin).find(this.s.selector) : this.$el.find($(this.s.selector)) : this.$el.children(), this.$slide = "", this.$outer = 
      "", this.init(), this;
    }
    var defaults = {
      mode : "lg-slide",
      cssEasing : "ease",
      easing : "linear",
      speed : 600,
      height : "100%",
      width : "100%",
      addClass : "",
      startClass : "lg-start-zoom",
      backdropDuration : 150,
      hideBarsDelay : 6E3,
      useLeft : false,
      closable : true,
      loop : true,
      escKey : true,
      keyPress : true,
      controls : true,
      slideEndAnimatoin : true,
      hideControlOnEnd : false,
      mousewheel : true,
      getCaptionFromTitleOrAlt : true,
      appendSubHtmlTo : ".lg-sub-html",
      subHtmlSelectorRelative : false,
      preload : 1,
      showAfterLoad : true,
      selector : "",
      selectWithin : "",
      nextHtml : "",
      prevHtml : "",
      index : false,
      iframeMaxWidth : "100%",
      download : true,
      counter : true,
      appendCounterTo : ".lg-toolbar",
      swipeThreshold : 50,
      enableSwipe : true,
      enableDrag : true,
      dynamic : false,
      dynamicEl : [],
      galleryId : 1
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.init = function() {
      var _this = this;
      var from;
      if (_this.s.preload > _this.$items.length) {
        _this.s.preload = _this.$items.length;
      }
      /** @type {string} */
      from = window.location.hash;
      if (from.indexOf("lg=" + this.s.galleryId) > 0) {
        /** @type {number} */
        _this.index = parseInt(from.split("&slide=")[1], 10);
        $("body").addClass("lg-from-hash");
        if (!$("body").hasClass("lg-on")) {
          setTimeout(function() {
            _this.build(_this.index);
          });
          $("body").addClass("lg-on");
        }
      }
      if (_this.s.dynamic) {
        _this.$el.trigger("onBeforeOpen.lg");
        _this.index = _this.s.index || 0;
        if (!$("body").hasClass("lg-on")) {
          setTimeout(function() {
            _this.build(_this.index);
            $("body").addClass("lg-on");
          });
        }
      } else {
        _this.$items.on("click.lgcustom", function(event) {
          try {
            event.preventDefault();
            event.preventDefault();
          } catch (n) {
            /** @type {boolean} */
            event.returnValue = false;
          }
          _this.$el.trigger("onBeforeOpen.lg");
          _this.index = _this.s.index || _this.$items.index(this);
          if (!$("body").hasClass("lg-on")) {
            _this.build(_this.index);
            $("body").addClass("lg-on");
          }
        });
      }
    };
    /**
     * @param {string} key
     * @return {undefined}
     */
    Plugin.prototype.build = function(key) {
      var _this = this;
      _this.structure();
      $.each($.fn.lightGallery.modules, function(key) {
        _this.modules[key] = new $.fn.lightGallery.modules[key](_this.el);
      });
      _this.slide(key, false, false, false);
      if (_this.s.keyPress) {
        _this.keyPress();
      }
      if (_this.$items.length > 1) {
        _this.arrow();
        setTimeout(function() {
          _this.enableDrag();
          _this.enableSwipe();
        }, 50);
        if (_this.s.mousewheel) {
          _this.mousewheel();
        }
      } else {
        _this.$slide.on("click.lg", function() {
          _this.$el.trigger("onSlideClick.lg");
        });
      }
      _this.counter();
      _this.closeGallery();
      _this.$el.trigger("onAfterOpen.lg");
      _this.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
        _this.$outer.removeClass("lg-hide-items");
        clearTimeout(_this.hideBartimeout);
        /** @type {number} */
        _this.hideBartimeout = setTimeout(function() {
          _this.$outer.addClass("lg-hide-items");
        }, _this.s.hideBarsDelay);
      });
      _this.$outer.trigger("mousemove.lg");
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.structure = function() {
      var photoText;
      /** @type {string} */
      var pix_color = "";
      /** @type {string} */
      var annotation = "";
      /** @type {number} */
      var i = 0;
      /** @type {string} */
      var pid = "";
      var _this = this;
      var $inner;
      $("body").append('<div class="lg-backdrop"></div>');
      $(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms");
      /** @type {number} */
      i = 0;
      for (; i < this.$items.length; i++) {
        /** @type {string} */
        pix_color = pix_color + '<div class="lg-item"></div>';
      }
      if (this.s.controls && this.$items.length > 1 && (annotation = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (pid = '<div class="lg-sub-html"></div>'), photoText = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + 
      pix_color + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + annotation + pid + "</div></div>", $("body").append(photoText), this.$outer = $(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), _this.setTop(), $(window).on("resize.lg orientationchange.lg", function() {
        setTimeout(function() {
          _this.setTop();
        }, 100);
      }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
        $inner = this.$outer.find(".lg-inner");
        $inner.css("transition-timing-function", this.s.cssEasing);
        $inner.css("transition-duration", this.s.speed + "ms");
      }
      setTimeout(function() {
        $(".lg-backdrop").addClass("in");
      });
      setTimeout(function() {
        _this.$outer.addClass("lg-visible");
      }, this.s.backdropDuration);
      if (this.s.download) {
        this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
      }
      this.prevScrollTop = $(window).scrollTop();
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.setTop = function() {
      if ("100%" !== this.s.height) {
        var y = $(window).height();
        /** @type {number} */
        var pos1 = (y - parseInt(this.s.height, 10)) / 2;
        var s = this.$outer.find(".lg");
        if (y >= parseInt(this.s.height, 10)) {
          s.css("top", pos1 + "px");
        } else {
          s.css("top", "0px");
        }
      }
    };
    /**
     * @return {?}
     */
    Plugin.prototype.doCss = function() {
      return !!function() {
        /** @type {!Array} */
        var transition = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"];
        /** @type {!Element} */
        var root = document.documentElement;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        i = 0;
        for (; i < transition.length; i++) {
          if (transition[i] in root.style) {
            return true;
          }
        }
      }();
    };
    /**
     * @param {string} src
     * @param {number} index
     * @return {?}
     */
    Plugin.prototype.isVideo = function(src, index) {
      var i;
      if (i = this.s.dynamic ? this.s.dynamicEl[index].html : this.$items.eq(index).attr("data-html"), !src) {
        return i ? {
          html5 : true
        } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), false);
      }
      var do_embed_youtube_videos = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-_%]+)/i);
      var do_embed_vimeo_videos = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
      var do_embed_dailymotion_videos = src.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
      var vk = src.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
      return do_embed_youtube_videos ? {
        youtube : do_embed_youtube_videos
      } : do_embed_vimeo_videos ? {
        vimeo : do_embed_vimeo_videos
      } : do_embed_dailymotion_videos ? {
        dailymotion : do_embed_dailymotion_videos
      } : vk ? {
        vk : vk
      } : void 0;
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.counter = function() {
      if (this.s.counter) {
        $(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>");
      }
    };
    /**
     * @param {!Object} index
     * @return {undefined}
     */
    Plugin.prototype.addHtml = function(index) {
      var subHtmlUrl;
      var $currentEle;
      /** @type {null} */
      var subHtml = null;
      var mask;
      if (!(this.s.dynamic ? this.s.dynamicEl[index].subHtmlUrl ? subHtmlUrl = this.s.dynamicEl[index].subHtmlUrl : subHtml = this.s.dynamicEl[index].subHtml : ($currentEle = this.$items.eq(index)).attr("data-sub-html-url") ? subHtmlUrl = $currentEle.attr("data-sub-html-url") : (subHtml = $currentEle.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !subHtml && (subHtml = $currentEle.attr("title") || $currentEle.find("img").first().attr("alt"))), subHtmlUrl)) {
        if (null != subHtml) {
          mask = subHtml.substring(0, 1);
          if (!("." !== mask && "#" !== mask)) {
            subHtml = this.s.subHtmlSelectorRelative && !this.s.dynamic ? $currentEle.find(subHtml).html() : $(subHtml).html();
          }
        } else {
          /** @type {string} */
          subHtml = "";
        }
      }
      if (".lg-sub-html" === this.s.appendSubHtmlTo) {
        if (subHtmlUrl) {
          this.$outer.find(this.s.appendSubHtmlTo).load(subHtmlUrl);
        } else {
          this.$outer.find(this.s.appendSubHtmlTo).html(subHtml);
        }
      } else {
        if (subHtmlUrl) {
          this.$slide.eq(index).load(subHtmlUrl);
        } else {
          this.$slide.eq(index).append(subHtml);
        }
      }
      if (null != subHtml) {
        if ("" === subHtml) {
          this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html");
        } else {
          this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html");
        }
      }
      this.$el.trigger("onAfterAppendSubHtml.lg", [index]);
    };
    /**
     * @param {number} index
     * @return {undefined}
     */
    Plugin.prototype.preload = function(index) {
      /** @type {number} */
      var i = 1;
      /** @type {number} */
      var j = 1;
      /** @type {number} */
      i = 1;
      for (; i <= this.s.preload && !(i >= this.$items.length - index); i++) {
        this.loadContent(index + i, false, 0);
      }
      /** @type {number} */
      j = 1;
      for (; j <= this.s.preload && !(index - j < 0); j++) {
        this.loadContent(index - j, false, 0);
      }
    };
    /**
     * @param {?} index
     * @param {boolean} callback
     * @param {number} data
     * @return {undefined}
     */
    Plugin.prototype.loadContent = function(index, callback, data) {
      var _$img;
      var _src;
      var poster;
      var _srcset;
      var _sizes;
      var _html;
      var _this = this;
      /** @type {boolean} */
      var rawDataIsList = false;
      /**
       * @param {!NodeList} srcItms
       * @return {undefined}
       */
      var getResponsiveSrc = function(srcItms) {
        var match;
        var tomax;
        var j;
        /** @type {!Array} */
        var u = [];
        /** @type {!Array} */
        var src = [];
        /** @type {number} */
        var i = 0;
        for (; i < srcItms.length; i++) {
          match = srcItms[i].split(" ");
          if ("" === match[0]) {
            match.splice(0, 1);
          }
          src.push(match[0]);
          u.push(match[1]);
        }
        tomax = $(window).width();
        /** @type {number} */
        j = 0;
        for (; j < u.length; j++) {
          if (parseInt(u[j], 10) > tomax) {
            _src = src[j];
            break;
          }
        }
      };
      var rawDataIsArray;
      var _isVideo;
      var t;
      if (_this.s.dynamic ? ((_this.s.dynamicEl[index].poster && (rawDataIsList = true, poster = _this.s.dynamicEl[index].poster), _html = _this.s.dynamicEl[index].html, _src = _this.s.dynamicEl[index].src, _this.s.dynamicEl[index].responsive) && getResponsiveSrc(_this.s.dynamicEl[index].responsive.split(",")), _srcset = _this.s.dynamicEl[index].srcset, _sizes = _this.s.dynamicEl[index].sizes) : ((_this.$items.eq(index).attr("data-poster") && (rawDataIsList = true, poster = _this.$items.eq(index).attr("data-poster")), 
      _html = _this.$items.eq(index).attr("data-html"), _src = _this.$items.eq(index).attr("href") || _this.$items.eq(index).attr("data-src"), _this.$items.eq(index).attr("data-responsive")) && getResponsiveSrc(_this.$items.eq(index).attr("data-responsive").split(",")), _srcset = _this.$items.eq(index).attr("data-srcset"), _sizes = _this.$items.eq(index).attr("data-sizes")), rawDataIsArray = false, _this.s.dynamic ? _this.s.dynamicEl[index].iframe && (rawDataIsArray = true) : "true" === _this.$items.eq(index).attr("data-iframe") && 
      (rawDataIsArray = true), _isVideo = _this.isVideo(_src, index), !_this.$slide.eq(index).hasClass("lg-loaded")) {
        if (rawDataIsArray ? _this.$slide.eq(index).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>') : rawDataIsList ? (t = "", t = _isVideo && _isVideo.youtube ? "lg-has-youtube" : _isVideo && _isVideo.vimeo ? "lg-has-vimeo" : "lg-has-html5", _this.$slide.eq(index).prepend('<div class="lg-video-cont ' + t + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + 
        poster + '" /></div></div>')) : _isVideo ? (_this.$slide.eq(index).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), _this.$el.trigger("hasVideo.lg", [index, _src, _html])) : _this.$slide.eq(index).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + _src + '" /></div>'), _this.$el.trigger("onAferAppendSlide.lg", [index]), _$img = _this.$slide.eq(index).find(".lg-object"), _sizes && _$img.attr("sizes", _sizes), _srcset) {
          _$img.attr("srcset", _srcset);
          try {
            picturefill({
              elements : [_$img[0]]
            });
          } catch (n) {
            console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.");
          }
        }
        if (".lg-sub-html" !== this.s.appendSubHtmlTo) {
          _this.addHtml(index);
        }
        _this.$slide.eq(index).addClass("lg-loaded");
      }
      _this.$slide.eq(index).find(".lg-object").on("load.lg error.lg", function() {
        /** @type {number} */
        var done = 0;
        if (data && !$("body").hasClass("lg-from-hash")) {
          /** @type {number} */
          done = data;
        }
        setTimeout(function() {
          _this.$slide.eq(index).addClass("lg-complete");
          _this.$el.trigger("onSlideItemLoad.lg", [index, data || 0]);
        }, done);
      });
      if (_isVideo && _isVideo.html5 && !rawDataIsList) {
        _this.$slide.eq(index).addClass("lg-complete");
      }
      if (true === callback) {
        if (_this.$slide.eq(index).hasClass("lg-complete")) {
          _this.preload(index);
        } else {
          _this.$slide.eq(index).find(".lg-object").on("load.lg error.lg", function() {
            _this.preload(index);
          });
        }
      }
    };
    /**
     * @param {string} index
     * @param {boolean} fromTouch
     * @param {boolean} fromThumb
     * @param {string} direction
     * @return {undefined}
     */
    Plugin.prototype.slide = function(index, fromTouch, fromThumb, direction) {
      var _prevIndex = this.$outer.find(".lg-current").index();
      var _this = this;
      var _length;
      var ngiScroll_timeout;
      var classesLine;
      var touchPrev;
      var i;
      if (!(_this.lGalleryOn && _prevIndex === index)) {
        _length = this.$slide.length;
        ngiScroll_timeout = _this.lGalleryOn ? this.s.speed : 0;
        if (!_this.lgBusy) {
          if (this.s.download) {
            if (classesLine = _this.s.dynamic ? false !== _this.s.dynamicEl[index].downloadUrl && (_this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src) : "false" !== _this.$items.eq(index).attr("data-download-url") && (_this.$items.eq(index).attr("data-download-url") || _this.$items.eq(index).attr("href") || _this.$items.eq(index).attr("data-src"))) {
              $("#lg-download").attr("href", classesLine);
              _this.$outer.removeClass("lg-hide-download");
            } else {
              _this.$outer.addClass("lg-hide-download");
            }
          }
          if (this.$el.trigger("onBeforeSlide.lg", [_prevIndex, index, fromTouch, fromThumb]), _this.lgBusy = true, clearTimeout(_this.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
            _this.addHtml(index);
          }, ngiScroll_timeout), this.arrowDisable(index), direction || (index < _prevIndex ? direction = "prev" : index > _prevIndex && (direction = "next")), fromTouch) {
            this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
            if (_length > 2) {
              /** @type {number} */
              touchPrev = index - 1;
              i = index + 1;
              if (0 === index && _prevIndex === _length - 1) {
                /** @type {number} */
                i = 0;
                /** @type {number} */
                touchPrev = _length - 1;
              } else {
                if (index === _length - 1 && 0 === _prevIndex) {
                  /** @type {number} */
                  i = 0;
                  /** @type {number} */
                  touchPrev = _length - 1;
                }
              }
            } else {
              /** @type {number} */
              touchPrev = 0;
              /** @type {number} */
              i = 1;
            }
            if ("prev" === direction) {
              _this.$slide.eq(i).addClass("lg-next-slide");
            } else {
              _this.$slide.eq(touchPrev).addClass("lg-prev-slide");
            }
            _this.$slide.eq(index).addClass("lg-current");
          } else {
            _this.$outer.addClass("lg-no-trans");
            this.$slide.removeClass("lg-prev-slide lg-next-slide");
            if ("prev" === direction) {
              this.$slide.eq(index).addClass("lg-prev-slide");
              this.$slide.eq(_prevIndex).addClass("lg-next-slide");
            } else {
              this.$slide.eq(index).addClass("lg-next-slide");
              this.$slide.eq(_prevIndex).addClass("lg-prev-slide");
            }
            setTimeout(function() {
              _this.$slide.removeClass("lg-current");
              _this.$slide.eq(index).addClass("lg-current");
              _this.$outer.removeClass("lg-no-trans");
            }, 50);
          }
          if (_this.lGalleryOn) {
            setTimeout(function() {
              _this.loadContent(index, true, 0);
            }, this.s.speed + 50);
            setTimeout(function() {
              /** @type {boolean} */
              _this.lgBusy = false;
              _this.$el.trigger("onAfterSlide.lg", [_prevIndex, index, fromTouch, fromThumb]);
            }, this.s.speed);
          } else {
            _this.loadContent(index, true, _this.s.backdropDuration);
            /** @type {boolean} */
            _this.lgBusy = false;
            _this.$el.trigger("onAfterSlide.lg", [_prevIndex, index, fromTouch, fromThumb]);
          }
          /** @type {boolean} */
          _this.lGalleryOn = true;
          if (this.s.counter) {
            $("#lg-counter-current").text(index + 1);
          }
        }
        /** @type {string} */
        _this.index = index;
      }
    };
    /**
     * @param {boolean} fromTouch
     * @return {undefined}
     */
    Plugin.prototype.goToNextSlide = function(fromTouch) {
      var _this = this;
      var ddtl = _this.s.loop;
      if (fromTouch && _this.$slide.length < 3) {
        /** @type {boolean} */
        ddtl = false;
      }
      if (!_this.lgBusy) {
        if (_this.index + 1 < _this.$slide.length) {
          _this.index++;
          _this.$el.trigger("onBeforeNextSlide.lg", [_this.index]);
          _this.slide(_this.index, fromTouch, false, "next");
        } else {
          if (ddtl) {
            /** @type {number} */
            _this.index = 0;
            _this.$el.trigger("onBeforeNextSlide.lg", [_this.index]);
            _this.slide(_this.index, fromTouch, false, "next");
          } else {
            if (_this.s.slideEndAnimatoin && !fromTouch) {
              _this.$outer.addClass("lg-right-end");
              setTimeout(function() {
                _this.$outer.removeClass("lg-right-end");
              }, 400);
            }
          }
        }
      }
    };
    /**
     * @param {boolean} fromTouch
     * @return {undefined}
     */
    Plugin.prototype.goToPrevSlide = function(fromTouch) {
      var _this = this;
      var ddtl = _this.s.loop;
      if (fromTouch && _this.$slide.length < 3) {
        /** @type {boolean} */
        ddtl = false;
      }
      if (!_this.lgBusy) {
        if (_this.index > 0) {
          _this.index--;
          _this.$el.trigger("onBeforePrevSlide.lg", [_this.index, fromTouch]);
          _this.slide(_this.index, fromTouch, false, "prev");
        } else {
          if (ddtl) {
            /** @type {number} */
            _this.index = _this.$items.length - 1;
            _this.$el.trigger("onBeforePrevSlide.lg", [_this.index, fromTouch]);
            _this.slide(_this.index, fromTouch, false, "prev");
          } else {
            if (_this.s.slideEndAnimatoin && !fromTouch) {
              _this.$outer.addClass("lg-left-end");
              setTimeout(function() {
                _this.$outer.removeClass("lg-left-end");
              }, 400);
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.keyPress = function() {
      var _this = this;
      if (this.$items.length > 1) {
        $(window).on("keyup.lg", function(event) {
          if (_this.$items.length > 1) {
            if (37 === event.keyCode) {
              event.preventDefault();
              _this.goToPrevSlide();
            }
            if (39 === event.keyCode) {
              event.preventDefault();
              _this.goToNextSlide();
            }
          }
        });
      }
      $(window).on("keydown.lg", function(event) {
        if (true === _this.s.escKey && 27 === event.keyCode) {
          event.preventDefault();
          if (_this.$outer.hasClass("lg-thumb-open")) {
            _this.$outer.removeClass("lg-thumb-open");
          } else {
            _this.destroy();
          }
        }
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.arrow = function() {
      var el = this;
      this.$outer.find(".lg-prev").on("click.lg", function() {
        el.goToPrevSlide();
      });
      this.$outer.find(".lg-next").on("click.lg", function() {
        el.goToNextSlide();
      });
    };
    /**
     * @param {number} index
     * @return {undefined}
     */
    Plugin.prototype.arrowDisable = function(index) {
      if (!this.s.loop && this.s.hideControlOnEnd) {
        if (index + 1 < this.$slide.length) {
          this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled");
        } else {
          this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled");
        }
        if (index > 0) {
          this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled");
        } else {
          this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled");
        }
      }
    };
    /**
     * @param {!Object} $el
     * @param {number} value
     * @param {number} x
     * @return {undefined}
     */
    Plugin.prototype.setTranslate = function($el, value, x) {
      if (this.s.useLeft) {
        $el.css("left", value);
      } else {
        $el.css({
          transform : "translate3d(" + value + "px, " + x + "px, 0px)"
        });
      }
    };
    /**
     * @param {number} startCoords
     * @param {number} endCoords
     * @return {undefined}
     */
    Plugin.prototype.touchMove = function(startCoords, endCoords) {
      /** @type {number} */
      var distance = endCoords - startCoords;
      if (Math.abs(distance) > 15) {
        this.$outer.addClass("lg-dragging");
        this.setTranslate(this.$slide.eq(this.index), distance, 0);
        this.setTranslate($(".lg-prev-slide"), -this.$slide.eq(this.index).width() + distance, 0);
        this.setTranslate($(".lg-next-slide"), this.$slide.eq(this.index).width() + distance, 0);
      }
    };
    /**
     * @param {number} distance
     * @return {undefined}
     */
    Plugin.prototype.touchEnd = function(distance) {
      var _this = this;
      if ("lg-slide" !== _this.s.mode) {
        _this.$outer.addClass("lg-slide");
      }
      this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0");
      setTimeout(function() {
        _this.$outer.removeClass("lg-dragging");
        if (distance < 0 && Math.abs(distance) > _this.s.swipeThreshold) {
          _this.goToNextSlide(true);
        } else {
          if (distance > 0 && Math.abs(distance) > _this.s.swipeThreshold) {
            _this.goToPrevSlide(true);
          } else {
            if (Math.abs(distance) < 5) {
              _this.$el.trigger("onSlideClick.lg");
            }
          }
        }
        _this.$slide.removeAttr("style");
      });
      setTimeout(function() {
        if (!(_this.$outer.hasClass("lg-dragging") || "lg-slide" === _this.s.mode)) {
          _this.$outer.removeClass("lg-slide");
        }
      }, _this.s.speed + 100);
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.enableSwipe = function() {
      var _this = this;
      /** @type {number} */
      var startCoords = 0;
      /** @type {number} */
      var endCoords = 0;
      /** @type {boolean} */
      var r = false;
      if (_this.s.enableSwipe && _this.doCss()) {
        _this.$slide.on("touchstart.lg", function(event) {
          if (!(_this.$outer.hasClass("lg-zoomed") || _this.lgBusy)) {
            event.preventDefault();
            _this.manageSwipeClass();
            startCoords = event.originalEvent.targetTouches[0].pageX;
          }
        });
        _this.$slide.on("touchmove.lg", function(event) {
          if (!_this.$outer.hasClass("lg-zoomed")) {
            event.preventDefault();
            endCoords = event.originalEvent.targetTouches[0].pageX;
            _this.touchMove(startCoords, endCoords);
            /** @type {boolean} */
            r = true;
          }
        });
        _this.$slide.on("touchend.lg", function() {
          if (!_this.$outer.hasClass("lg-zoomed")) {
            if (r) {
              /** @type {boolean} */
              r = false;
              _this.touchEnd(endCoords - startCoords);
            } else {
              _this.$el.trigger("onSlideClick.lg");
            }
          }
        });
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.enableDrag = function() {
      var _this = this;
      /** @type {number} */
      var startCoords = 0;
      /** @type {number} */
      var endCoords = 0;
      /** @type {boolean} */
      var i = false;
      /** @type {boolean} */
      var f = false;
      if (_this.s.enableDrag && _this.doCss()) {
        _this.$outer.on("mousedown.lg", function(e) {
          if (!(_this.$outer.hasClass("lg-zoomed") || _this.lgBusy || $(e.target).text())) {
            e.preventDefault();
            _this.manageSwipeClass();
            startCoords = e.pageX;
            /** @type {boolean} */
            i = true;
            _this.$outer.scrollLeft += 1;
            _this.$outer.scrollLeft -= 1;
            _this.$outer.removeClass("lg-grab").addClass("lg-grabbing");
            _this.$el.trigger("onDragstart.lg");
          }
        });
        $(window).on("mousemove.lg", function(e) {
          if (i) {
            /** @type {boolean} */
            f = true;
            endCoords = e.pageX;
            _this.touchMove(startCoords, endCoords);
            _this.$el.trigger("onDragmove.lg");
          }
        });
        $(window).on("mouseup.lg", function(jEvent) {
          if (f) {
            /** @type {boolean} */
            f = false;
            _this.touchEnd(endCoords - startCoords);
            _this.$el.trigger("onDragend.lg");
          } else {
            if ($(jEvent.target).hasClass("lg-object") || $(jEvent.target).hasClass("lg-video-play")) {
              _this.$el.trigger("onSlideClick.lg");
            }
          }
          if (i) {
            /** @type {boolean} */
            i = false;
            _this.$outer.removeClass("lg-grabbing").addClass("lg-grab");
          }
        });
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.manageSwipeClass = function() {
      var index = this.index + 1;
      /** @type {number} */
      var touchPrev = this.index - 1;
      if (this.s.loop && this.$slide.length > 2) {
        if (0 === this.index) {
          /** @type {number} */
          touchPrev = this.$slide.length - 1;
        } else {
          if (this.index === this.$slide.length - 1) {
            /** @type {number} */
            index = 0;
          }
        }
      }
      this.$slide.removeClass("lg-next-slide lg-prev-slide");
      if (touchPrev > -1) {
        this.$slide.eq(touchPrev).addClass("lg-prev-slide");
      }
      this.$slide.eq(index).addClass("lg-next-slide");
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.mousewheel = function() {
      var _this = this;
      _this.$outer.on("mousewheel.lg", function(event) {
        if (event.deltaY) {
          if (event.deltaY > 0) {
            _this.goToPrevSlide();
          } else {
            _this.goToNextSlide();
          }
          event.preventDefault();
        }
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.closeGallery = function() {
      var self = this;
      /** @type {boolean} */
      var i = false;
      this.$outer.find(".lg-close").on("click.lg", function() {
        self.destroy();
      });
      if (self.s.closable) {
        self.$outer.on("mousedown.lg", function(jEvent) {
          /** @type {boolean} */
          i = !!($(jEvent.target).is(".lg-outer") || $(jEvent.target).is(".lg-item ") || $(jEvent.target).is(".lg-img-wrap"));
        });
        self.$outer.on("mousemove.lg", function() {
          /** @type {boolean} */
          i = false;
        });
        self.$outer.on("mouseup.lg", function(jEvent) {
          if ($(jEvent.target).is(".lg-outer") || $(jEvent.target).is(".lg-item ") || $(jEvent.target).is(".lg-img-wrap") && i) {
            if (!self.$outer.hasClass("lg-dragging")) {
              self.destroy();
            }
          }
        });
      }
    };
    /**
     * @param {string} s
     * @return {undefined}
     */
    Plugin.prototype.destroy = function(s) {
      var _this = this;
      if (!s) {
        _this.$el.trigger("onBeforeClose.lg");
        $(window).scrollTop(_this.prevScrollTop);
      }
      if (s) {
        if (!_this.s.dynamic) {
          this.$items.off("click.lg click.lgcustom");
        }
        $.removeData(_this.el, "lightGallery");
      }
      this.$el.off(".lg.tm");
      $.each($.fn.lightGallery.modules, function(index) {
        if (_this.modules[index]) {
          _this.modules[index].destroy();
        }
      });
      /** @type {boolean} */
      this.lGalleryOn = false;
      clearTimeout(_this.hideBartimeout);
      /** @type {boolean} */
      this.hideBartimeout = false;
      $(window).off(".lg");
      $("body").removeClass("lg-on lg-from-hash");
      if (_this.$outer) {
        _this.$outer.removeClass("lg-visible");
      }
      $(".lg-backdrop").removeClass("in");
      setTimeout(function() {
        if (_this.$outer) {
          _this.$outer.remove();
        }
        $(".lg-backdrop").remove();
        if (!s) {
          _this.$el.trigger("onCloseAfter.lg");
        }
      }, _this.s.backdropDuration + 50);
    };
    /**
     * @param {!Object} options
     * @return {?}
     */
    $.fn.lightGallery = function(options) {
      return this.each(function() {
        if ($.data(this, "lightGallery")) {
          try {
            $(this).data("lightGallery").init();
          } catch (n) {
            console.error("lightGallery has not initiated properly");
          }
        } else {
          $.data(this, "lightGallery", new Plugin(this, options));
        }
      });
    };
    $.fn.lightGallery.modules = {};
  }();
}), function(addedRenderer, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(jQuery) {
      return factory(jQuery);
    });
  } else {
    if ("object" == typeof exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }
}(0, function($) {
  !function() {
    var key;
    var val;
    var defaults = {
      scale : 1,
      zoom : true,
      actualSize : true,
      enableZoomAfter : 300,
      useLeftForZoom : (key = false, val = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./), val && parseInt(val[2], 10) < 54 && (key = true), key)
    };
    /**
     * @param {?} e
     * @return {?}
     */
    var Zoom = function(e) {
      return this.core = $(e).data("lightGallery"), this.core.s = $.extend({}, defaults, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = false, this.pageX = $(window).width() / 2, this.pageY = $(window).height() / 2 + $(window).scrollTop()), this;
    };
    /**
     * @return {undefined}
     */
    Zoom.prototype.init = function() {
      var _this = this;
      /** @type {string} */
      var param = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
      if (_this.core.s.actualSize) {
        /** @type {string} */
        param = param + '<span id="lg-actual-size" class="lg-icon"></span>';
      }
      if (_this.core.s.useLeftForZoom) {
        _this.core.$outer.addClass("lg-use-left-for-zoom");
      } else {
        _this.core.$outer.addClass("lg-use-transition-for-zoom");
      }
      this.core.$outer.find(".lg-toolbar").append(param);
      _this.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(i, _thumb_index, delay) {
        var time = _this.core.s.enableZoomAfter + delay;
        if ($("body").hasClass("lg-from-hash") && delay) {
          /** @type {number} */
          time = 0;
        } else {
          $("body").removeClass("lg-from-hash");
        }
        /** @type {number} */
        _this.zoomabletimeout = setTimeout(function() {
          _this.core.$slide.eq(_thumb_index).addClass("lg-zoomable");
        }, time + 30);
      });
      /** @type {number} */
      var scale = 1;
      /**
       * @param {number} h
       * @return {undefined}
       */
      var zoom = function(h) {
        var $image = _this.core.$outer.find(".lg-current .lg-image");
        /** @type {number} */
        var lastX = ($(window).width() - $image.prop("offsetWidth")) / 2;
        var y = ($(window).height() - $image.prop("offsetHeight")) / 2 + $(window).scrollTop();
        /** @type {number} */
        var value = (h - 1) * (_this.pageX - lastX);
        /** @type {number} */
        var scrollTop = (h - 1) * (_this.pageY - y);
        $image.css("transform", "scale(" + h + ")").attr("data-scale", h);
        if (_this.core.s.useLeftForZoom) {
          $image.parent().css({
            left : -value + "px",
            top : -scrollTop + "px"
          }).attr("data-x", value).attr("data-y", scrollTop);
        } else {
          $image.parent().css("transform", "translate3d(-" + value + "px, -" + scrollTop + "px, 0)").attr("data-x", value).attr("data-y", scrollTop);
        }
      };
      /**
       * @return {undefined}
       */
      var callScale = function() {
        if (scale > 1) {
          _this.core.$outer.addClass("lg-zoomed");
        } else {
          _this.resetZoom();
        }
        if (scale < 1) {
          /** @type {number} */
          scale = 1;
        }
        zoom(scale);
      };
      /**
       * @param {!Object} event
       * @param {!Object} $image
       * @param {?} index
       * @param {boolean} fromIcon
       * @return {undefined}
       */
      var actualSize = function(event, $image, index, fromIcon) {
        var _num1;
        var _num2 = $image.prop("offsetWidth");
        _num1 = _this.core.s.dynamic ? _this.core.s.dynamicEl[index].width || $image[0].naturalWidth || _num2 : _this.core.$items.eq(index).attr("data-width") || $image[0].naturalWidth || _num2;
        if (_this.core.$outer.hasClass("lg-zoomed")) {
          /** @type {number} */
          scale = 1;
        } else {
          if (_num1 > _num2) {
            /** @type {number} */
            scale = _num1 / _num2 || 2;
          }
        }
        if (fromIcon) {
          /** @type {number} */
          _this.pageX = $(window).width() / 2;
          _this.pageY = $(window).height() / 2 + $(window).scrollTop();
        } else {
          _this.pageX = event.pageX || event.originalEvent.targetTouches[0].pageX;
          _this.pageY = event.pageY || event.originalEvent.targetTouches[0].pageY;
        }
        callScale();
        setTimeout(function() {
          _this.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
        }, 10);
      };
      /** @type {boolean} */
      var _takingTooLongTimeout = false;
      _this.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(n, index) {
        var $image = _this.core.$slide.eq(index).find(".lg-image");
        $image.on("dblclick", function(event) {
          actualSize(event, $image, index);
        });
        $image.on("touchstart", function(event) {
          if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
            /** @type {null} */
            _takingTooLongTimeout = null;
            actualSize(event, $image, index);
          } else {
            /** @type {number} */
            _takingTooLongTimeout = setTimeout(function() {
              /** @type {null} */
              _takingTooLongTimeout = null;
            }, 300);
          }
          event.preventDefault();
        });
      });
      $(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
        /** @type {number} */
        _this.pageX = $(window).width() / 2;
        _this.pageY = $(window).height() / 2 + $(window).scrollTop();
        zoom(scale);
      });
      $("#lg-zoom-out").on("click.lg", function() {
        if (_this.core.$outer.find(".lg-current .lg-image").length) {
          /** @type {number} */
          scale = scale - _this.core.s.scale;
          callScale();
        }
      });
      $("#lg-zoom-in").on("click.lg", function() {
        if (_this.core.$outer.find(".lg-current .lg-image").length) {
          scale = scale + _this.core.s.scale;
          callScale();
        }
      });
      $("#lg-actual-size").on("click.lg", function(event) {
        actualSize(event, _this.core.$slide.eq(_this.core.index).find(".lg-image"), _this.core.index, true);
      });
      _this.core.$el.on("onBeforeSlide.lg.tm", function() {
        /** @type {number} */
        scale = 1;
        _this.resetZoom();
      });
      _this.zoomDrag();
      _this.zoomSwipe();
    };
    /**
     * @return {undefined}
     */
    Zoom.prototype.resetZoom = function() {
      this.core.$outer.removeClass("lg-zoomed");
      this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y");
      this.core.$slide.find(".lg-image").removeAttr("style data-scale");
      /** @type {number} */
      this.pageX = $(window).width() / 2;
      this.pageY = $(window).height() / 2 + $(window).scrollTop();
    };
    /**
     * @return {undefined}
     */
    Zoom.prototype.zoomSwipe = function() {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      /** @type {boolean} */
      var u = false;
      /** @type {boolean} */
      var allowX = false;
      /** @type {boolean} */
      var allowY = false;
      _this.core.$slide.on("touchstart.lg", function(event) {
        if (_this.core.$outer.hasClass("lg-zoomed")) {
          var $image = _this.core.$slide.eq(_this.core.index).find(".lg-object");
          /** @type {boolean} */
          allowY = $image.prop("offsetHeight") * $image.attr("data-scale") > _this.core.$outer.find(".lg").height();
          if ((allowX = $image.prop("offsetWidth") * $image.attr("data-scale") > _this.core.$outer.find(".lg").width()) || allowY) {
            event.preventDefault();
            startCoords = {
              x : event.originalEvent.targetTouches[0].pageX,
              y : event.originalEvent.targetTouches[0].pageY
            };
          }
        }
      });
      _this.core.$slide.on("touchmove.lg", function(event) {
        if (_this.core.$outer.hasClass("lg-zoomed")) {
          var ffleft;
          var orig_top;
          var _$el = _this.core.$slide.eq(_this.core.index).find(".lg-img-wrap");
          event.preventDefault();
          /** @type {boolean} */
          u = true;
          endCoords = {
            x : event.originalEvent.targetTouches[0].pageX,
            y : event.originalEvent.targetTouches[0].pageY
          };
          _this.core.$outer.addClass("lg-zoom-dragging");
          /** @type {number} */
          orig_top = allowY ? -Math.abs(_$el.attr("data-y")) + (endCoords.y - startCoords.y) : -Math.abs(_$el.attr("data-y"));
          /** @type {number} */
          ffleft = allowX ? -Math.abs(_$el.attr("data-x")) + (endCoords.x - startCoords.x) : -Math.abs(_$el.attr("data-x"));
          if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            if (_this.core.s.useLeftForZoom) {
              _$el.css({
                left : ffleft + "px",
                top : orig_top + "px"
              });
            } else {
              _$el.css("transform", "translate3d(" + ffleft + "px, " + orig_top + "px, 0)");
            }
          }
        }
      });
      _this.core.$slide.on("touchend.lg", function() {
        if (_this.core.$outer.hasClass("lg-zoomed") && u) {
          /** @type {boolean} */
          u = false;
          _this.core.$outer.removeClass("lg-zoom-dragging");
          _this.touchendZoom(startCoords, endCoords, allowX, allowY);
        }
      });
    };
    /**
     * @return {undefined}
     */
    Zoom.prototype.zoomDrag = function() {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      /** @type {boolean} */
      var u = false;
      /** @type {boolean} */
      var o = false;
      /** @type {boolean} */
      var allowX = false;
      /** @type {boolean} */
      var allowY = false;
      _this.core.$slide.on("mousedown.lg.zoom", function(event) {
        var $image = _this.core.$slide.eq(_this.core.index).find(".lg-object");
        /** @type {boolean} */
        allowY = $image.prop("offsetHeight") * $image.attr("data-scale") > _this.core.$outer.find(".lg").height();
        /** @type {boolean} */
        allowX = $image.prop("offsetWidth") * $image.attr("data-scale") > _this.core.$outer.find(".lg").width();
        if (_this.core.$outer.hasClass("lg-zoomed") && $(event.target).hasClass("lg-object") && (allowX || allowY)) {
          event.preventDefault();
          startCoords = {
            x : event.pageX,
            y : event.pageY
          };
          /** @type {boolean} */
          u = true;
          _this.core.$outer.scrollLeft += 1;
          _this.core.$outer.scrollLeft -= 1;
          _this.core.$outer.removeClass("lg-grab").addClass("lg-grabbing");
        }
      });
      $(window).on("mousemove.lg.zoom", function(event) {
        if (u) {
          var ffleft;
          var orig_top;
          var _$el = _this.core.$slide.eq(_this.core.index).find(".lg-img-wrap");
          /** @type {boolean} */
          o = true;
          endCoords = {
            x : event.pageX,
            y : event.pageY
          };
          _this.core.$outer.addClass("lg-zoom-dragging");
          /** @type {number} */
          orig_top = allowY ? -Math.abs(_$el.attr("data-y")) + (endCoords.y - startCoords.y) : -Math.abs(_$el.attr("data-y"));
          /** @type {number} */
          ffleft = allowX ? -Math.abs(_$el.attr("data-x")) + (endCoords.x - startCoords.x) : -Math.abs(_$el.attr("data-x"));
          if (_this.core.s.useLeftForZoom) {
            _$el.css({
              left : ffleft + "px",
              top : orig_top + "px"
            });
          } else {
            _$el.css("transform", "translate3d(" + ffleft + "px, " + orig_top + "px, 0)");
          }
        }
      });
      $(window).on("mouseup.lg.zoom", function(event) {
        if (u) {
          /** @type {boolean} */
          u = false;
          _this.core.$outer.removeClass("lg-zoom-dragging");
          if (!(!o || startCoords.x === endCoords.x && startCoords.y === endCoords.y)) {
            endCoords = {
              x : event.pageX,
              y : event.pageY
            };
            _this.touchendZoom(startCoords, endCoords, allowX, allowY);
          }
          /** @type {boolean} */
          o = false;
        }
        _this.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
      });
    };
    /**
     * @param {!Object} startCoords
     * @param {!Object} endCoords
     * @param {boolean} allowX
     * @param {boolean} allowY
     * @return {undefined}
     */
    Zoom.prototype.touchendZoom = function(startCoords, endCoords, allowX, allowY) {
      var _this = this;
      var _$el = _this.core.$slide.eq(_this.core.index).find(".lg-img-wrap");
      var $image = _this.core.$slide.eq(_this.core.index).find(".lg-object");
      /** @type {number} */
      var distanceX = -Math.abs(_$el.attr("data-x")) + (endCoords.x - startCoords.x);
      /** @type {number} */
      var distanceY = -Math.abs(_$el.attr("data-y")) + (endCoords.y - startCoords.y);
      /** @type {number} */
      var minY = (_this.core.$outer.find(".lg").height() - $image.prop("offsetHeight")) / 2;
      /** @type {number} */
      var maxY = Math.abs($image.prop("offsetHeight") * Math.abs($image.attr("data-scale")) - _this.core.$outer.find(".lg").height() + minY);
      /** @type {number} */
      var minX = (_this.core.$outer.find(".lg").width() - $image.prop("offsetWidth")) / 2;
      /** @type {number} */
      var maxX = Math.abs($image.prop("offsetWidth") * Math.abs($image.attr("data-scale")) - _this.core.$outer.find(".lg").width() + minX);
      if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
        if (allowY) {
          if (distanceY <= -maxY) {
            /** @type {number} */
            distanceY = -maxY;
          } else {
            if (distanceY >= -minY) {
              /** @type {number} */
              distanceY = -minY;
            }
          }
        }
        if (allowX) {
          if (distanceX <= -maxX) {
            /** @type {number} */
            distanceX = -maxX;
          } else {
            if (distanceX >= -minX) {
              /** @type {number} */
              distanceX = -minX;
            }
          }
        }
        if (allowY) {
          _$el.attr("data-y", Math.abs(distanceY));
        } else {
          /** @type {number} */
          distanceY = -Math.abs(_$el.attr("data-y"));
        }
        if (allowX) {
          _$el.attr("data-x", Math.abs(distanceX));
        } else {
          /** @type {number} */
          distanceX = -Math.abs(_$el.attr("data-x"));
        }
        if (_this.core.s.useLeftForZoom) {
          _$el.css({
            left : distanceX + "px",
            top : distanceY + "px"
          });
        } else {
          _$el.css("transform", "translate3d(" + distanceX + "px, " + distanceY + "px, 0)");
        }
      }
    };
    /**
     * @return {undefined}
     */
    Zoom.prototype.destroy = function() {
      var _this = this;
      _this.core.$el.off(".lg.zoom");
      $(window).off(".lg.zoom");
      _this.core.$slide.off(".lg.zoom");
      _this.core.$el.off(".lg.tm.zoom");
      _this.resetZoom();
      clearTimeout(_this.zoomabletimeout);
      /** @type {boolean} */
      _this.zoomabletimeout = false;
    };
    /** @type {function(?): ?} */
    $.fn.lightGallery.modules.zoom = Zoom;
  }();
});
!function(EMSarray, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(jQuery) {
      return factory(jQuery);
    });
  } else {
    if ("object" == typeof exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }
}(this, function($) {
  !function() {
    var defaults = {
      thumbnail : true,
      animateThumb : true,
      currentPagerPosition : "middle",
      thumbWidth : 100,
      thumbHeight : "80px",
      thumbContHeight : 100,
      thumbMargin : 5,
      exThumbImage : false,
      showThumbByDefault : true,
      toogleThumb : true,
      pullCaptionUp : true,
      enableThumbDrag : true,
      enableThumbSwipe : true,
      swipeThreshold : 50,
      loadYoutubeThumbnail : true,
      youtubeThumbSize : 1,
      loadVimeoThumbnail : true,
      vimeoThumbSize : "thumbnail_small",
      loadDailymotionThumbnail : true
    };
    /**
     * @param {?} element
     * @return {?}
     */
    var Thumbnail = function(element) {
      return this.core = $(element).data("lightGallery"), this.core.s = $.extend({}, defaults, this.core.s), this.$el = $(element), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this;
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.init = function() {
      var _this = this;
      if (this.core.s.thumbnail && this.core.$items.length > 1) {
        if (this.core.s.showThumbByDefault) {
          setTimeout(function() {
            _this.core.$outer.addClass("lg-thumb-open");
          }, 700);
        }
        if (this.core.s.pullCaptionUp) {
          this.core.$outer.addClass("lg-pull-caption-up");
        }
        this.build();
        if (this.core.s.animateThumb && this.core.doCss()) {
          if (this.core.s.enableThumbDrag) {
            this.enableThumbDrag();
          }
          if (this.core.s.enableThumbSwipe) {
            this.enableThumbSwipe();
          }
          /** @type {boolean} */
          this.thumbClickable = false;
        } else {
          /** @type {boolean} */
          this.thumbClickable = true;
        }
        this.toogle();
        this.thumbkeyPress();
      }
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.build = function() {
      /**
       * @param {string} src
       * @param {string} thumb
       * @param {number} index
       * @return {undefined}
       */
      function getThumb(src, thumb, index) {
        var thumbImg;
        var isVideo = _this.core.isVideo(src, index) || {};
        /** @type {string} */
        var current_tag_name = "";
        if (isVideo.youtube || isVideo.vimeo || isVideo.dailymotion) {
          if (isVideo.youtube) {
            thumbImg = _this.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + isVideo.youtube[1] + "/" + _this.core.s.youtubeThumbSize + ".jpg" : thumb;
          } else {
            if (isVideo.vimeo) {
              if (_this.core.s.loadVimeoThumbnail) {
                /** @type {string} */
                thumbImg = "//i.vimeocdn.com/video/error_" + th_field + ".jpg";
                current_tag_name = isVideo.vimeo[1];
              } else {
                /** @type {string} */
                thumbImg = thumb;
              }
            } else {
              if (isVideo.dailymotion) {
                thumbImg = _this.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + isVideo.dailymotion[1] : thumb;
              }
            }
          }
        } else {
          /** @type {string} */
          thumbImg = thumb;
        }
        scrolltable = scrolltable + ('<div data-vimeo-id="' + current_tag_name + '" class="lg-thumb-item" style="width:' + _this.core.s.thumbWidth + "px; height: " + _this.core.s.thumbHeight + "; margin-right: " + _this.core.s.thumbMargin + 'px"><img src="' + thumbImg + '" /></div>');
        /** @type {string} */
        current_tag_name = "";
      }
      var result;
      var _this = this;
      /** @type {string} */
      var scrolltable = "";
      /** @type {string} */
      var th_field = "";
      var i;
      switch(this.core.s.vimeoThumbSize) {
        case "thumbnail_large":
          /** @type {string} */
          th_field = "640";
          break;
        case "thumbnail_medium":
          /** @type {string} */
          th_field = "200x150";
          break;
        case "thumbnail_small":
          /** @type {string} */
          th_field = "100x75";
      }
      if (_this.core.$outer.addClass("lg-has-thumb"), _this.core.$outer.find(".lg").append('<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>'), _this.$thumbOuter = _this.core.$outer.find(".lg-thumb-outer"), _this.thumbOuterWidth = _this.$thumbOuter.width(), _this.core.s.animateThumb && _this.core.$outer.find(".lg-thumb").css({
        width : _this.thumbTotalWidth + "px",
        position : "relative"
      }), this.core.s.animateThumb && _this.$thumbOuter.css("height", _this.core.s.thumbContHeight + "px"), _this.core.s.dynamic) {
        /** @type {number} */
        i = 0;
        for (; i < _this.core.s.dynamicEl.length; i++) {
          getThumb(_this.core.s.dynamicEl[i].src, _this.core.s.dynamicEl[i].thumb, i);
        }
      } else {
        _this.core.$items.each(function(i) {
          if (_this.core.s.exThumbImage) {
            getThumb($(this).attr("href") || $(this).attr("data-src"), $(this).attr(_this.core.s.exThumbImage), i);
          } else {
            getThumb($(this).attr("href") || $(this).attr("data-src"), $(this).find("img").attr("src"), i);
          }
        });
      }
      _this.core.$outer.find(".lg-thumb").html(scrolltable);
      result = _this.core.$outer.find(".lg-thumb-item");
      result.each(function() {
        var $this = $(this);
        var vimeoVideoId = $this.attr("data-vimeo-id");
        if (vimeoVideoId) {
          $.getJSON("//www.vimeo.com/api/v2/video/" + vimeoVideoId + ".json?callback=?", {
            format : "json"
          }, function(data) {
            $this.find("img").attr("src", data[0][_this.core.s.vimeoThumbSize]);
          });
        }
      });
      result.eq(_this.core.index).addClass("active");
      _this.core.$el.on("onBeforeSlide.lg.tm", function() {
        result.removeClass("active");
        result.eq(_this.core.index).addClass("active");
      });
      result.on("click.lg touchend.lg", function() {
        var currentCalItem = $(this);
        setTimeout(function() {
          if (!((!_this.thumbClickable || _this.core.lgBusy) && _this.core.doCss())) {
            _this.core.index = currentCalItem.index();
            _this.core.slide(_this.core.index, false, true, false);
          }
        }, 50);
      });
      _this.core.$el.on("onBeforeSlide.lg.tm", function() {
        _this.animateThumb(_this.core.index);
      });
      $(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
        setTimeout(function() {
          _this.animateThumb(_this.core.index);
          _this.thumbOuterWidth = _this.$thumbOuter.width();
        }, 200);
      });
    };
    /**
     * @param {number} value
     * @return {undefined}
     */
    Thumbnail.prototype.setTranslate = function(value) {
      this.core.$outer.find(".lg-thumb").css({
        transform : "translate3d(-" + value + "px, 0px, 0px)"
      });
    };
    /**
     * @param {?} index
     * @return {undefined}
     */
    Thumbnail.prototype.animateThumb = function(index) {
      var $thumb = this.core.$outer.find(".lg-thumb");
      var position;
      if (this.core.s.animateThumb) {
        switch(this.core.s.currentPagerPosition) {
          case "left":
            /** @type {number} */
            position = 0;
            break;
          case "middle":
            /** @type {number} */
            position = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
            break;
          case "right":
            /** @type {number} */
            position = this.thumbOuterWidth - this.core.s.thumbWidth;
        }
        /** @type {number} */
        this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * index - 1 - position;
        if (this.left > this.thumbTotalWidth - this.thumbOuterWidth) {
          /** @type {number} */
          this.left = this.thumbTotalWidth - this.thumbOuterWidth;
        }
        if (this.left < 0) {
          /** @type {number} */
          this.left = 0;
        }
        if (this.core.lGalleryOn) {
          if (!$thumb.hasClass("on")) {
            this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms");
          }
          if (!this.core.doCss()) {
            $thumb.animate({
              left : -this.left + "px"
            }, this.core.s.speed);
          }
        } else {
          if (!this.core.doCss()) {
            $thumb.css("left", -this.left + "px");
          }
        }
        this.setTranslate(this.left);
      }
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.enableThumbDrag = function() {
      var _this = this;
      /** @type {number} */
      var startCoords = 0;
      /** @type {number} */
      var endCoords = 0;
      /** @type {boolean} */
      var r = false;
      /** @type {boolean} */
      var n = false;
      /** @type {number} */
      var tempLeft = 0;
      _this.$thumbOuter.addClass("lg-grab");
      _this.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          e.preventDefault();
          startCoords = e.pageX;
          /** @type {boolean} */
          r = true;
          _this.core.$outer.scrollLeft += 1;
          _this.core.$outer.scrollLeft -= 1;
          /** @type {boolean} */
          _this.thumbClickable = false;
          _this.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing");
        }
      });
      $(window).on("mousemove.lg.thumb", function(e) {
        if (r) {
          tempLeft = _this.left;
          /** @type {boolean} */
          n = true;
          endCoords = e.pageX;
          _this.$thumbOuter.addClass("lg-dragging");
          /** @type {number} */
          tempLeft = tempLeft - (endCoords - startCoords);
          if (tempLeft > _this.thumbTotalWidth - _this.thumbOuterWidth) {
            /** @type {number} */
            tempLeft = _this.thumbTotalWidth - _this.thumbOuterWidth;
          }
          if (tempLeft < 0) {
            /** @type {number} */
            tempLeft = 0;
          }
          _this.setTranslate(tempLeft);
        }
      });
      $(window).on("mouseup.lg.thumb", function() {
        if (n) {
          /** @type {boolean} */
          n = false;
          _this.$thumbOuter.removeClass("lg-dragging");
          _this.left = tempLeft;
          if (Math.abs(endCoords - startCoords) < _this.core.s.swipeThreshold) {
            /** @type {boolean} */
            _this.thumbClickable = true;
          }
        } else {
          /** @type {boolean} */
          _this.thumbClickable = true;
        }
        if (r) {
          /** @type {boolean} */
          r = false;
          _this.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab");
        }
      });
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.enableThumbSwipe = function() {
      var _this = this;
      /** @type {number} */
      var startCoords = 0;
      /** @type {number} */
      var endCoords = 0;
      /** @type {boolean} */
      var u = false;
      /** @type {number} */
      var tempLeft = 0;
      _this.core.$outer.find(".lg-thumb").on("touchstart.lg", function(event) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          event.preventDefault();
          startCoords = event.originalEvent.targetTouches[0].pageX;
          /** @type {boolean} */
          _this.thumbClickable = false;
        }
      });
      _this.core.$outer.find(".lg-thumb").on("touchmove.lg", function(event) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          event.preventDefault();
          endCoords = event.originalEvent.targetTouches[0].pageX;
          /** @type {boolean} */
          u = true;
          _this.$thumbOuter.addClass("lg-dragging");
          tempLeft = _this.left;
          /** @type {number} */
          tempLeft = tempLeft - (endCoords - startCoords);
          if (tempLeft > _this.thumbTotalWidth - _this.thumbOuterWidth) {
            /** @type {number} */
            tempLeft = _this.thumbTotalWidth - _this.thumbOuterWidth;
          }
          if (tempLeft < 0) {
            /** @type {number} */
            tempLeft = 0;
          }
          _this.setTranslate(tempLeft);
        }
      });
      _this.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth && u) {
          /** @type {boolean} */
          u = false;
          _this.$thumbOuter.removeClass("lg-dragging");
          if (Math.abs(endCoords - startCoords) < _this.core.s.swipeThreshold) {
            /** @type {boolean} */
            _this.thumbClickable = true;
          }
          _this.left = tempLeft;
        } else {
          /** @type {boolean} */
          _this.thumbClickable = true;
        }
      });
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.toogle = function() {
      var _this = this;
      if (_this.core.s.toogleThumb) {
        _this.core.$outer.addClass("lg-can-toggle");
        _this.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>');
        _this.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
          _this.core.$outer.toggleClass("lg-thumb-open");
        });
      }
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.thumbkeyPress = function() {
      var _this = this;
      $(window).on("keydown.lg.thumb", function(event) {
        if (38 === event.keyCode) {
          event.preventDefault();
          _this.core.$outer.addClass("lg-thumb-open");
        } else {
          if (40 === event.keyCode) {
            event.preventDefault();
            _this.core.$outer.removeClass("lg-thumb-open");
          }
        }
      });
    };
    /**
     * @return {undefined}
     */
    Thumbnail.prototype.destroy = function() {
      if (this.core.s.thumbnail && this.core.$items.length > 1) {
        $(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb");
        this.$thumbOuter.remove();
        this.core.$outer.removeClass("lg-has-thumb");
      }
    };
    /** @type {function(?): ?} */
    $.fn.lightGallery.modules.Thumbnail = Thumbnail;
  }();
});
u = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
/** @type {number} */
B = 0;
!function(url) {
  /**
   * @param {string} i
   * @return {?}
   */
  function t(i) {
    if (newValue[i]) {
      return newValue[i].T;
    }
    var data = newValue[i] = {
      ja : i,
      fa : false,
      T : {}
    };
    return url[i].call(data.T, data, data.T, t), data.fa = true, data.T;
  }
  var newValue = {};
  /** @type {!Array} */
  t.u = url;
  t.h = newValue;
  /**
   * @param {string} c
   * @param {string} n
   * @param {!Function} s
   * @return {undefined}
   */
  t.c = function(c, n, s) {
    if (!t.g(c, n)) {
      Object.defineProperty(c, n, {
        enumerable : true,
        get : s
      });
    }
  };
  /**
   * @param {!Object} row
   * @return {undefined}
   */
  t.r = function(row) {
    v();
    v();
    if ("undefined" != typeof Symbol && Symbol.toStringTag) {
      v();
      Object.defineProperty(row, Symbol.toStringTag, {
        value : "Module"
      });
    }
    Object.defineProperty(row, "__esModule", {
      value : true
    });
  };
  /**
   * @param {string} data
   * @param {number} server
   * @return {?}
   */
  t.m = function(data, server) {
    var d;
    var s;
    if ((1 & server && (data = t(data)), 8 & server) || 4 & server && "object" == typeof data && data && data.ba) {
      return data;
    }
    if (d = Object.create(null), t.r(d), Object.defineProperty(d, "default", {
      enumerable : true,
      value : data
    }), 2 & server && "string" != typeof data) {
      for (s in data) {
        t.c(d, s, function(unbracketed) {
          return data[unbracketed];
        }.bind(null, s));
      }
    }
    return d;
  };
  /**
   * @param {!Object} data
   * @return {?}
   */
  t.i = function(data) {
    /** @type {function(): ?} */
    var n = data && data.ba ? function() {
      return data.default;
    } : function() {
      return data;
    };
    return t.c(n, "a", n), n;
  };
  /**
   * @param {string} t
   * @param {string} input
   * @return {?}
   */
  t.g = function(t, input) {
    return Object.prototype.hasOwnProperty.call(t, input);
  };
  /** @type {string} */
  t.o = "";
  t(t.v = 0);
}([function(bodyStyle, round, elem) {
  /**
   * @param {!Object} c
   * @param {!Object} node
   * @return {undefined}
   */
  function test(c, node) {
    if (node = void 0 === node ? {} : node, this.h = c, this.g = this.g.bind(this), !toArray(this.h)) {
      throw new TypeError("`new Drift` requires a DOM element as its first argument.");
    }
    c = node.namespace || null;
    var P = node.showWhitespaceAtEdges || false;
    var d3_time_parseHour12 = node.containInline || false;
    var NUMBER = node.inlineOffsetX || 0;
    var d3_time_parseMilliseconds = node.inlineOffsetY || 0;
    var val = node.inlineContainer || document.body;
    var R = node.sourceAttribute || "data-zoom";
    var buildDeleteShipmentRequest = node.zoomFactor || 3;
    var methods = void 0 === node.paneContainer ? document.body : node.paneContainer;
    var action = node.inlinePane || 375;
    /** @type {boolean} */
    var content = !("handleTouch" in node) || !!node.handleTouch;
    var octahedron = node.onShow || null;
    var N = node.onHide || null;
    /** @type {boolean} */
    var da = !("injectBaseStyles" in node) || !!node.injectBaseStyles;
    var read_file_name = node.hoverDelay || 0;
    var A = node.touchDelay || 0;
    var iDayOfWeek = node.hoverBoundingBox || false;
    var G = node.touchBoundingBox || false;
    if (node = node.boundingBoxContainer || document.body, true !== action && !toArray(methods)) {
      throw new TypeError("`paneContainer` must be a DOM element when `inlinePane !== true`");
    }
    if (!toArray(val)) {
      throw new TypeError("`inlineContainer` must be a DOM element");
    }
    this.a = {
      j : c,
      P : P,
      I : d3_time_parseHour12,
      K : NUMBER,
      L : d3_time_parseMilliseconds,
      w : val,
      R : R,
      f : buildDeleteShipmentRequest,
      ga : methods,
      ea : action,
      C : content,
      O : octahedron,
      N : N,
      da : da,
      F : read_file_name,
      A : A,
      D : iDayOfWeek,
      G : G,
      H : node
    };
    if (this.a.da && !document.querySelector(".drift-base-styles")) {
      /** @type {string} */
      (node = document.createElement("style")).type = "text/css";
      node.classList.add("drift-base-styles");
      node.appendChild(document.createTextNode(".drift-bounding-box,.drift-zoom-pane{position:absolute;pointer-events:none}@keyframes noop{0%{zoom:1}}@-webkit-keyframes noop{0%{zoom:1}}.drift-zoom-pane.drift-open{display:block}.drift-zoom-pane.drift-closing,.drift-zoom-pane.drift-opening{animation:noop 1ms;-webkit-animation:noop 1ms}.drift-zoom-pane{overflow:hidden;width:100%;height:100%;top:0;left:0}.drift-zoom-pane-loader{display:none}.drift-zoom-pane img{position:absolute;display:block;max-width:none;max-height:none}"));
      (c = document.head).insertBefore(node, c.firstChild);
    }
    this.v();
    this.u();
  }
  /**
   * @param {!Object} key
   * @return {undefined}
   */
  function init(key) {
    key = void 0 === key ? {} : key;
    this.h = this.h.bind(this);
    this.g = this.g.bind(this);
    this.m = this.m.bind(this);
    /** @type {boolean} */
    this.s = false;
    var USE_CHAR_CODE = void 0 === key.J ? null : key.J;
    var buildDeleteShipmentRequest = void 0 === key.f ? check() : key.f;
    var uid = void 0 === key.U ? check() : key.U;
    var j = void 0 === key.j ? null : key.j;
    var P = void 0 === key.P ? check() : key.P;
    var d3_time_parseHour12 = void 0 === key.I ? check() : key.I;
    this.a = {
      J : USE_CHAR_CODE,
      f : buildDeleteShipmentRequest,
      U : uid,
      j : j,
      P : P,
      I : d3_time_parseHour12,
      K : void 0 === key.K ? 0 : key.K,
      L : void 0 === key.L ? 0 : key.L,
      w : void 0 === key.w ? document.body : key.w
    };
    this.o = this.i("open");
    this.Y = this.i("opening");
    this.u = this.i("closing");
    this.v = this.i("inline");
    this.V = this.i("loading");
    this.ha();
  }
  /**
   * @param {!Object} fn
   * @return {undefined}
   */
  function update(fn) {
    var exports;
    fn = void 0 === fn ? {} : fn;
    this.m = this.m.bind(this);
    this.B = this.B.bind(this);
    this.g = this.g.bind(this);
    this.c = this.c.bind(this);
    /** @type {!Object} */
    exports = fn;
    fn = void 0 === exports.b ? check() : exports.b;
    var thisLeft = void 0 === exports.l ? check() : exports.l;
    var R = void 0 === exports.R ? check() : exports.R;
    var content = void 0 === exports.C ? check() : exports.C;
    var octahedron = void 0 === exports.O ? null : exports.O;
    var N = void 0 === exports.N ? null : exports.N;
    var NUMBER = void 0 === exports.F ? 0 : exports.F;
    var A = void 0 === exports.A ? 0 : exports.A;
    var iDayOfWeek = void 0 === exports.D ? check() : exports.D;
    var G = void 0 === exports.G ? check() : exports.G;
    var j = void 0 === exports.j ? null : exports.j;
    var buildDeleteShipmentRequest = void 0 === exports.f ? check() : exports.f;
    exports = void 0 === exports.H ? check() : exports.H;
    this.a = {
      b : fn,
      l : thisLeft,
      R : R,
      C : content,
      O : octahedron,
      N : N,
      F : NUMBER,
      A : A,
      D : iDayOfWeek,
      G : G,
      j : j,
      f : buildDeleteShipmentRequest,
      H : exports
    };
    if (this.a.D || this.a.G) {
      this.o = new main({
        j : this.a.j,
        f : this.a.f,
        S : this.a.H
      });
    }
    /** @type {boolean} */
    this.enabled = true;
    this.M();
  }
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  function main(data) {
    /** @type {boolean} */
    this.s = false;
    var j = void 0 === data.j ? null : data.j;
    var buildDeleteShipmentRequest = void 0 === data.f ? check() : data.f;
    data = void 0 === data.S ? check() : data.S;
    this.a = {
      j : j,
      f : buildDeleteShipmentRequest,
      S : data
    };
    this.c = this.g("open");
    this.h();
  }
  /**
   * @param {!Object} source
   * @return {?}
   */
  function toArray(source) {
    return elementObjects ? source instanceof HTMLElement : source && "object" == typeof source && null !== source && 1 === source.nodeType && "string" == typeof source.nodeName;
  }
  /**
   * @param {!Element} c
   * @param {!Array} r
   * @return {undefined}
   */
  function write(c, r) {
    r.forEach(function(t) {
      c.classList.add(t);
    });
  }
  /**
   * @param {!Element} response
   * @param {!Array} ids
   * @return {undefined}
   */
  function apply(response, ids) {
    ids.forEach(function(fieldValueItem) {
      response.classList.remove(fieldValueItem);
    });
  }
  /**
   * @return {?}
   */
  function check() {
    throw Error("Missing parameter");
  }
  var elementObjects;
  var req;
  elem.r(round);
  /** @type {boolean} */
  elementObjects = "object" == typeof HTMLElement;
  /**
   * @param {string} i
   * @return {?}
   */
  main.prototype.g = function(i) {
    /** @type {!Array} */
    var whereArray = ["drift-" + i];
    var j = this.a.j;
    return j && whereArray.push(j + "-" + i), whereArray;
  };
  /**
   * @return {undefined}
   */
  main.prototype.h = function() {
    /** @type {!Element} */
    this.b = document.createElement("div");
    write(this.b, this.g("bounding-box"));
  };
  /**
   * @param {number} time
   * @param {number} dist
   * @return {undefined}
   */
  main.prototype.show = function(time, dist) {
    /** @type {boolean} */
    this.s = true;
    this.a.S.appendChild(this.b);
    var dns = this.b.style;
    /** @type {string} */
    dns.width = Math.round(time / this.a.f) + "px";
    /** @type {string} */
    dns.height = Math.round(dist / this.a.f) + "px";
    write(this.b, this.c);
  };
  /**
   * @return {undefined}
   */
  main.prototype.W = function() {
    if (this.s) {
      this.a.S.removeChild(this.b);
    }
    /** @type {boolean} */
    this.s = false;
    apply(this.b, this.c);
  };
  /**
   * @param {number} x
   * @param {number} i
   * @param {!Object} p
   * @return {undefined}
   */
  main.prototype.setPosition = function(x, i, p) {
    /** @type {number} */
    var px = window.pageXOffset;
    /** @type {number} */
    var offset = window.pageYOffset;
    /** @type {number} */
    x = p.left + x * p.width - this.b.clientWidth / 2 + px;
    /** @type {number} */
    i = p.top + i * p.height - this.b.clientHeight / 2 + offset;
    if (x < p.left + px) {
      x = p.left + px;
    } else {
      if (x + this.b.clientWidth > p.left + p.width + px) {
        /** @type {number} */
        x = p.left + p.width - this.b.clientWidth + px;
      }
    }
    if (i < p.top + offset) {
      i = p.top + offset;
    } else {
      if (i + this.b.clientHeight > p.top + p.height + offset) {
        /** @type {number} */
        i = p.top + p.height - this.b.clientHeight + offset;
      }
    }
    /** @type {string} */
    this.b.style.left = x + "px";
    /** @type {string} */
    this.b.style.top = i + "px";
  };
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  update.prototype.i = function(data) {
    data.preventDefault();
  };
  /**
   * @param {!Object} arg
   * @return {undefined}
   */
  update.prototype.u = function(arg) {
    if (!(this.a.A && this.V(arg) && !this.s)) {
      arg.preventDefault();
    }
  };
  /**
   * @param {!Object} source
   * @return {?}
   */
  update.prototype.V = function(source) {
    return !!source.touches;
  };
  /**
   * @return {undefined}
   */
  update.prototype.M = function() {
    this.a.b.addEventListener("mouseenter", this.g, false);
    this.a.b.addEventListener("mouseleave", this.B, false);
    this.a.b.addEventListener("mousemove", this.c, false);
    if (this.a.C) {
      this.a.b.addEventListener("touchstart", this.g, false);
      this.a.b.addEventListener("touchend", this.B, false);
      this.a.b.addEventListener("touchmove", this.c, false);
    } else {
      this.a.b.addEventListener("touchstart", this.i, false);
      this.a.b.addEventListener("touchend", this.i, false);
      this.a.b.addEventListener("touchmove", this.i, false);
    }
  };
  /**
   * @return {undefined}
   */
  update.prototype.ca = function() {
    this.a.b.removeEventListener("mouseenter", this.g, false);
    this.a.b.removeEventListener("mouseleave", this.B, false);
    this.a.b.removeEventListener("mousemove", this.c, false);
    if (this.a.C) {
      this.a.b.removeEventListener("touchstart", this.g, false);
      this.a.b.removeEventListener("touchend", this.B, false);
      this.a.b.removeEventListener("touchmove", this.c, false);
    } else {
      this.a.b.removeEventListener("touchstart", this.i, false);
      this.a.b.removeEventListener("touchend", this.i, false);
      this.a.b.removeEventListener("touchmove", this.i, false);
    }
  };
  /**
   * @param {!Object} value
   * @return {undefined}
   */
  update.prototype.g = function(value) {
    this.u(value);
    /** @type {!Object} */
    this.h = value;
    if ("mouseenter" == value.type && this.a.F) {
      /** @type {number} */
      this.v = setTimeout(this.m, this.a.F);
    } else {
      if (this.a.A) {
        /** @type {number} */
        this.v = setTimeout(this.m, this.a.A);
      } else {
        this.m();
      }
    }
  };
  /**
   * @return {undefined}
   */
  update.prototype.m = function() {
    if (this.enabled) {
      var i = this.a.O;
      if (i && "function" == typeof i) {
        i();
      }
      this.a.l.show(this.a.b.getAttribute(this.a.R), this.a.b.clientWidth, this.a.b.clientHeight);
      if (this.h && ((i = this.h.touches) && this.a.G || !i && this.a.D)) {
        this.o.show(this.a.l.b.clientWidth, this.a.l.b.clientHeight);
      }
      this.c();
    }
  };
  /**
   * @param {number} e
   * @return {undefined}
   */
  update.prototype.B = function(e) {
    if (e) {
      this.u(e);
    }
    /** @type {null} */
    this.h = null;
    if (this.v) {
      clearTimeout(this.v);
    }
    if (this.o) {
      this.o.W();
    }
    if ((e = this.a.N) && "function" == typeof e) {
      e();
    }
    this.a.l.W();
  };
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  update.prototype.c = function(e) {
    if (e) {
      this.u(e);
      /** @type {!Object} */
      this.h = e;
    } else {
      if (!this.h) {
        return;
      }
      e = this.h;
    }
    if (e.touches) {
      var x = (e = e.touches[0]).clientX;
      var y = e.clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    /** @type {number} */
    x = (x - (e = this.a.b.getBoundingClientRect()).left) / this.a.b.clientWidth;
    /** @type {number} */
    y = (y - e.top) / this.a.b.clientHeight;
    if (this.o) {
      this.o.setPosition(x, y, e);
    }
    this.a.l.setPosition(x, y, e);
  };
  u.Object.defineProperties(update.prototype, {
    s : {
      configurable : true,
      enumerable : true,
      get : function() {
        return this.a.l.s;
      }
    }
  });
  /** @type {!CSSStyleDeclaration} */
  bodyStyle = document.createElement("div").style;
  /** @type {boolean} */
  req = "undefined" != typeof document && ("animation" in bodyStyle || "webkitAnimation" in bodyStyle);
  /**
   * @param {string} name
   * @return {?}
   */
  init.prototype.i = function(name) {
    /** @type {!Array} */
    var r = ["drift-" + name];
    var n = this.a.j;
    return n && r.push(n + "-" + name), r;
  };
  /**
   * @return {undefined}
   */
  init.prototype.ha = function() {
    /** @type {!Element} */
    this.b = document.createElement("div");
    write(this.b, this.i("zoom-pane"));
    /** @type {!Element} */
    var b = document.createElement("div");
    write(b, this.i("zoom-pane-loader"));
    this.b.appendChild(b);
    /** @type {!Element} */
    this.c = document.createElement("img");
    this.b.appendChild(this.c);
  };
  /**
   * @param {?} string
   * @return {undefined}
   */
  init.prototype.X = function(string) {
    this.c.setAttribute("src", string);
  };
  /**
   * @param {number} d
   * @param {number} date
   * @return {undefined}
   */
  init.prototype.Z = function(d, date) {
    /** @type {string} */
    this.c.style.width = d * this.a.f + "px";
    /** @type {string} */
    this.c.style.height = date * this.a.f + "px";
  };
  /**
   * @param {number} x
   * @param {number} i
   * @param {!Object} options
   * @return {undefined}
   */
  init.prototype.setPosition = function(x, i, options) {
    var right = this.c.offsetWidth;
    var s = this.c.offsetHeight;
    var containerWidth = this.b.offsetWidth;
    var width = this.b.offsetHeight;
    /** @type {number} */
    var r = containerWidth / 2 - right * x;
    /** @type {number} */
    var percent = width / 2 - s * i;
    /** @type {number} */
    var d = containerWidth - right;
    /** @type {number} */
    var left = width - s;
    /** @type {boolean} */
    var p = 0 < d;
    /** @type {boolean} */
    var l = 0 < left;
    /** @type {number} */
    s = p ? d / 2 : 0;
    /** @type {number} */
    right = l ? left / 2 : 0;
    /** @type {number} */
    d = p ? d / 2 : d;
    /** @type {number} */
    left = l ? left / 2 : left;
    if (this.b.parentElement === this.a.w) {
      /** @type {number} */
      l = window.pageXOffset;
      /** @type {number} */
      p = window.pageYOffset;
      x = options.left + x * options.width - containerWidth / 2 + this.a.K + l;
      i = options.top + i * options.height - width / 2 + this.a.L + p;
      if (this.a.I) {
        if (x < options.left + l) {
          x = options.left + l;
        } else {
          if (x + containerWidth > options.left + options.width + l) {
            /** @type {number} */
            x = options.left + options.width - containerWidth + l;
          }
        }
        if (i < options.top + p) {
          i = options.top + p;
        } else {
          if (i + width > options.top + options.height + p) {
            /** @type {number} */
            i = options.top + options.height - width + p;
          }
        }
      }
      /** @type {string} */
      this.b.style.left = x + "px";
      /** @type {string} */
      this.b.style.top = i + "px";
    }
    if (!this.a.P) {
      if (r > s) {
        /** @type {number} */
        r = s;
      } else {
        if (r < d) {
          /** @type {number} */
          r = d;
        }
      }
      if (percent > right) {
        /** @type {number} */
        percent = right;
      } else {
        if (percent < left) {
          /** @type {number} */
          percent = left;
        }
      }
    }
    /** @type {string} */
    this.c.style.transform = "translate(" + r + "px, " + percent + "px)";
    /** @type {string} */
    this.c.style.webkitTransform = "translate(" + r + "px, " + percent + "px)";
  };
  /**
   * @return {undefined}
   */
  init.prototype.M = function() {
    this.b.removeEventListener("animationend", this.h, false);
    this.b.removeEventListener("animationend", this.g, false);
    this.b.removeEventListener("webkitAnimationEnd", this.h, false);
    this.b.removeEventListener("webkitAnimationEnd", this.g, false);
    apply(this.b, this.o);
    apply(this.b, this.u);
  };
  /**
   * @param {?} tn
   * @param {undefined} data
   * @param {undefined} i
   * @return {undefined}
   */
  init.prototype.show = function(tn, data, i) {
    this.M();
    /** @type {boolean} */
    this.s = true;
    write(this.b, this.o);
    if (this.c.getAttribute("src") != tn) {
      write(this.b, this.V);
      this.c.addEventListener("load", this.m, false);
      this.X(tn);
    }
    this.Z(data, i);
    if (this.ia) {
      this.aa();
    } else {
      this.$();
    }
    if (req) {
      this.b.addEventListener("animationend", this.h, false);
      this.b.addEventListener("webkitAnimationEnd", this.h, false);
      write(this.b, this.Y);
    }
  };
  /**
   * @return {undefined}
   */
  init.prototype.aa = function() {
    this.a.w.appendChild(this.b);
    write(this.b, this.v);
  };
  /**
   * @return {undefined}
   */
  init.prototype.$ = function() {
    this.a.J.appendChild(this.b);
  };
  /**
   * @return {undefined}
   */
  init.prototype.W = function() {
    this.M();
    /** @type {boolean} */
    this.s = false;
    if (req) {
      this.b.addEventListener("animationend", this.g, false);
      this.b.addEventListener("webkitAnimationEnd", this.g, false);
      write(this.b, this.u);
    } else {
      apply(this.b, this.o);
      apply(this.b, this.v);
    }
  };
  /**
   * @return {undefined}
   */
  init.prototype.h = function() {
    this.b.removeEventListener("animationend", this.h, false);
    this.b.removeEventListener("webkitAnimationEnd", this.h, false);
    apply(this.b, this.Y);
  };
  /**
   * @return {undefined}
   */
  init.prototype.g = function() {
    this.b.removeEventListener("animationend", this.g, false);
    this.b.removeEventListener("webkitAnimationEnd", this.g, false);
    apply(this.b, this.o);
    apply(this.b, this.u);
    apply(this.b, this.v);
    this.b.setAttribute("style", "");
    if (this.b.parentElement === this.a.J) {
      this.a.J.removeChild(this.b);
    } else {
      if (this.b.parentElement === this.a.w) {
        this.a.w.removeChild(this.b);
      }
    }
  };
  /**
   * @return {undefined}
   */
  init.prototype.m = function() {
    this.c.removeEventListener("load", this.m, false);
    apply(this.b, this.V);
  };
  u.Object.defineProperties(init.prototype, {
    ia : {
      configurable : true,
      enumerable : true,
      get : function() {
        var i = this.a.U;
        return true === i || "number" == typeof i && window.innerWidth <= i;
      }
    }
  });
  /**
   * @return {undefined}
   */
  test.prototype.v = function() {
    this.l = new init({
      J : this.a.ga,
      f : this.a.f,
      P : this.a.P,
      I : this.a.I,
      U : this.a.ea,
      j : this.a.j,
      K : this.a.K,
      L : this.a.L,
      w : this.a.w
    });
  };
  /**
   * @return {undefined}
   */
  test.prototype.u = function() {
    this.c = new update({
      b : this.h,
      l : this.l,
      C : this.a.C,
      O : this.a.O,
      N : this.a.N,
      R : this.a.R,
      F : this.a.F,
      A : this.a.A,
      D : this.a.D,
      G : this.a.G,
      j : this.a.j,
      f : this.a.f,
      H : this.a.H
    });
  };
  /**
   * @param {?} e
   * @return {undefined}
   */
  test.prototype.M = function(e) {
    this.l.X(e);
  };
  /**
   * @return {undefined}
   */
  test.prototype.i = function() {
    /** @type {boolean} */
    this.c.enabled = false;
  };
  /**
   * @return {undefined}
   */
  test.prototype.m = function() {
    /** @type {boolean} */
    this.c.enabled = true;
  };
  /**
   * @return {undefined}
   */
  test.prototype.g = function() {
    this.c.B();
    this.c.ca();
  };
  u.Object.defineProperties(test.prototype, {
    s : {
      configurable : true,
      enumerable : true,
      get : function() {
        return this.l.s;
      }
    },
    f : {
      configurable : true,
      enumerable : true,
      get : function() {
        return this.a.f;
      },
      set : function(value) {
        /** @type {number} */
        this.a.f = value;
        /** @type {number} */
        this.l.a.f = value;
        /** @type {number} */
        this.c.a.f = value;
        /** @type {number} */
        this.o.a.f = value;
      }
    }
  });
  Object.defineProperty(test.prototype, "isShowing", {
    get : function() {
      return this.s;
    }
  });
  Object.defineProperty(test.prototype, "zoomFactor", {
    get : function() {
      return this.f;
    },
    set : function(val) {
      /** @type {number} */
      this.f = val;
    }
  });
  /** @type {function(?): undefined} */
  test.prototype.setZoomImageURL = test.prototype.M;
  /** @type {function(): undefined} */
  test.prototype.disable = test.prototype.i;
  /** @type {function(): undefined} */
  test.prototype.enable = test.prototype.m;
  /** @type {function(): undefined} */
  test.prototype.destroy = test.prototype.g;
  /** @type {function(!Object, !Object): undefined} */
  window.Drift = test;
}]);
!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("object" == typeof exports) {
      /** @type {function(!Object): undefined} */
      module.exports = factory;
    } else {
      factory(jQuery);
    }
  }
}(function($) {
  /**
   * @param {!Object} e
   * @return {?}
   */
  function b(e) {
    var g = e || window.event;
    /** @type {!Array<?>} */
    var h = slice.call(arguments, 1);
    /** @type {number} */
    var j = 0;
    /** @type {number} */
    var l = 0;
    /** @type {number} */
    var m = 0;
    /** @type {number} */
    var n = 0;
    /** @type {number} */
    var offsetX = 0;
    /** @type {number} */
    var offsetY = 0;
    var q;
    var r;
    var offset;
    if (e = $.event.fix(g), e.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
      return 1 === g.deltaMode ? (q = $.data(this, "mousewheel-line-height"), j = j * q, m = m * q, l = l * q) : 2 === g.deltaMode && (r = $.data(this, "mousewheel-page-height"), j = j * r, m = m * r, l = l * r), (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f = f / 40)), d(g, n) && (j = j / 40, l = l / 40, m = m / 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), special.settings.normalizeOffset && 
      this.getBoundingClientRect) && (offset = this.getBoundingClientRect(), offsetX = e.clientX - offset.left, offsetY = e.clientY - offset.top), e.deltaX = l, e.deltaY = m, e.deltaFactor = f, e.offsetX = offsetX, e.offsetY = offsetY, e.deltaMode = 0, h.unshift(e, j, l, m), timeout && clearTimeout(timeout), timeout = setTimeout(checkChanges, 200), ($.event.dispatch || $.event.handle).apply(this, h);
    }
  }
  /**
   * @return {undefined}
   */
  function checkChanges() {
    /** @type {null} */
    f = null;
  }
  /**
   * @param {!Object} a
   * @param {number} b
   * @return {?}
   */
  function d(a, b) {
    return special.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 == 0;
  }
  var timeout;
  var f;
  /** @type {!Array} */
  var toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"];
  /** @type {!Array} */
  var toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = Array.prototype.slice;
  var i;
  var special;
  if ($.event.fixHooks) {
    /** @type {number} */
    i = toFix.length;
    for (; i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }
  special = $.event.special.mousewheel = {
    version : "3.1.12",
    setup : function() {
      if (this.addEventListener) {
        /** @type {number} */
        var i = toBind.length;
        for (; i;) {
          this.addEventListener(toBind[--i], b, false);
        }
      } else {
        /** @type {function(!Object): ?} */
        this.onmousewheel = b;
      }
      $.data(this, "mousewheel-line-height", special.getLineHeight(this));
      $.data(this, "mousewheel-page-height", special.getPageHeight(this));
    },
    teardown : function() {
      if (this.removeEventListener) {
        /** @type {number} */
        var i = toBind.length;
        for (; i;) {
          this.removeEventListener(toBind[--i], b, false);
        }
      } else {
        /** @type {null} */
        this.onmousewheel = null;
      }
      $.removeData(this, "mousewheel-line-height");
      $.removeData(this, "mousewheel-page-height");
    },
    getLineHeight : function(elem) {
      var $elem = $(elem);
      var d = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
      return d.length || (d = $("body")), parseInt(d.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16;
    },
    getPageHeight : function(elem) {
      return $(elem).height();
    },
    settings : {
      adjustOldDeltas : true,
      normalizeOffset : true
    }
  };
  $.fn.extend({
    mousewheel : function(fn) {
      return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    unmousewheel : function(fn) {
      return this.unbind("mousewheel", fn);
    }
  });
});
/** @type {number} */
var urunKartID = 0;
/** @type {boolean} */
var isASorti = false;
/** @type {string} */
var urlPath = window.location.href;
/** @type {!Array} */
var initEkData = [];
/** @type {!Array} */
var selectedIDList = [];
/** @type {number} */
var havaleIndirimi = 0;
/** @type {!Array} */
var kurlar = [];
/** @type {number} */
var urunOrjinalFiyati = 0;
/** @type {number} */
var urunOrjinalFiyatiKdvHaric = 0;
/** @type {string} */
var urunOrjinalParaBirimi = "TL";
/** @type {null} */
var orjinalUrun = null;
/** @type {number} */
var urunDetayKapidaOdemeTutari = 0;
/** @type {number} */
var urunDetayKapidaOdemeKKTutari = 0;
/** @type {!Array} */
var kampanyaListesi = [];
/** @type {boolean} */
var boolOpenSepetPopup = false;
/** @type {boolean} */
var kombinUrun = false;
/** @type {boolean} */
var kombinUrunSatinAlinabilir = false;
var sablonYolu = siteSettings.siteYonetimAyar.sablonAyar.sablonYolu;
/** @type {string} */
var socialAppMessage = "";
/** @type {boolean} */
var otomatikVaryasyonFavoriEkle = false;
/** @type {boolean} */
var otomatikVaryasyonIstekEkle = false;
/** @type {boolean} */
var otomatikVaryasyonFiyatAlarmEkle = false;
/** @type {boolean} */
var otomatikSepeteEkle = false;
var cities = undefined;
var commentRequest = {};
var urunTaksitSecenekParams = {};
/** @type {string} */
var fiyatTemplate = "";
var fiyatObj = {};
/** @type {string} */
var clickEvent = "click";
if (isEventSupported("touchend")) {
  /** @type {string} */
  clickEvent = "touchend";
}
$(document).ready(function() {
  if ($("#contentProductDetail").length > 0) {
    initUrunDetay();
    $("body").on("click", ".urunTab ul li a", function() {
      var n = $(".urunTab ul li a").index(this);
      var prev_form = $(this);
      $(".urunDetayPanel").hide();
      $(".urunOzellik li").removeClass("active");
      prev_form.parent().addClass("active");
      $(".urunDetayPanel:eq(" + n + ")").show();
    });
    $("body").on("click", "#divThumpVideo", function() {
      thumbVideoAltImage();
    });
    if (siteSettings.urunAyar.urunDetaySecenekGosterimTipi > 0) {
      /** @type {string} */
      var customPlayerControls = siteSettings.urunAyar.urunDetayZoom.zoomTipi == 0 ? "#imgUrunResim" : "#divProductImageCarousel .owl-item.active img";
      var srcAngle = $(customPlayerControls).attr("src");
      if (siteSettings.urunAyar.urunDetaySecenekSayfadaKal) {
        $("body").on("click", ".RightDetail .urunSecenekSlider .detailLink", function(event) {
          event.preventDefault();
          /** @type {number} */
          var t = parseInt($(this).attr("data-id"));
          getProductDetail(t);
        });
      }
    }
  }
});
/**
 * @param {!Object} media
 * @return {undefined}
 */
window.onpopstate = function(media) {
  if ($("#contentProductDetail").length > 0) {
    if (media.state != null) {
      getProductDetail(media.state.productId);
    } else {
      if (window.location.href.indexOf("?") > -1) {
        window.location.href = media.path[0].location.href;
      }
    }
  }
};
$(document).on(clickEvent, "#divUrunEkSecenek .size_box", function() {
  if (parseInt($(this).attr("data-stock")) <= 0) {
    return false;
  }
  $("#hddnUrunID").val("0");
  $(this).siblings("span.size_box").removeClass("selected");
  $(this).addClass("selected");
  ekSecenekListesiOlustur($(this).parent().parent());
});
$(document).on(clickEvent, ".urunsecoverlay", function() {
  if (!draggingTouchEvent) {
    $(".urunsecoverlay").fadeOut();
    $(".tooltipp").remove();
    $("body").removeClass("urunsecbody");
  }
});
$(document).on(clickEvent, ".urunsecbody #divUrunEkSecenek", function() {
  if (!draggingTouchEvent) {
    $(".urunsecoverlay").fadeOut();
    $(".tooltipp").remove();
    $("body").removeClass("urunsecbody");
  }
});
/** @type {boolean} */
ekleRes = true;
Handlebars.registerHelper("setProductDetailVideoSettings", function(isConstructor, canCreateDiscussions, useAID, noBubble) {
  /** @type {string} */
  var id = "";
  return isConstructor && (id = id + " controls"), canCreateDiscussions || (id = id + " muted "), useAID && (id = id + " loop "), noBubble && (id = id + " autoPlay "), id;
});
Handlebars.registerHelper("trimDescription", function(n) {
  /** @type {string} */
  var th_field = "";
  return typeof n != "undefined" && n.length > 150 && (th_field = n.substring(0, 150) + (" ...<a class='aUrunYorumAciklamaGoster' href='javascript:closeModalAndGoDetails()'>" + translateIt("UrunYorum_TumDetaylariGoster") + "</a>")), th_field;
});
Handlebars.registerHelper("concat", function(n) {
  return "UrunYorum_BedenTavsiye" + n;
});
$(document).on(clickEvent, ".btnAddBasketOnDetail", function() {
  if (!draggingTouchEvent) {
    sepeteEkleUrunDetay();
  }
});
$(document).on(clickEvent, "#btnHemenAl", function() {
  if (!draggingTouchEvent) {
    hemenAl();
  }
});
$(document).on("change", "#frmDinamikForm input[type='file'], #divUrunSiparisDosya input[type='file']", function() {
  fncDinamikFormThumb(this);
});
window.mem = {};
window.mem.init = {};
window.mem.form = {};
window.mem.init.outParams = {
  type : "login",
  openingType : "popup",
  loginRenderElement : "#divUyeGirisForm",
  quickmembershipRenderElement : "#divHizliUyelikAlan",
  forgotPasswordRenderElement : "#divSifremiUnuttumContent",
  fancybox : {
    width : typeof uyegirisWidth != "undefined" ? uyegirisWidth : 390,
    padding : 30,
    autoHeight : true,
    autoWidth : true,
    wrapCSS : "uyegirisPopup",
    clickOutside : "",
    beforeShow : function() {
      $("body").css({
        "overflow-y" : "hidden"
      });
    },
    afterClose : function() {
      $("body").css({
        "overflow-y" : "visible"
      });
    },
    helpers : {
      overlay : {
        closeClick : false
      }
    }
  }
};
window.mem.returnUrl = getQueryStringByName("ReturnUrl") || getQueryStringByName("returnUrl") || undefined;
/**
 * @return {?}
 */
window.mem.isCompleteOrder = function() {
  return typeof window.mem.returnUrl != "undefined" && window.mem.returnUrl != null && window.mem.returnUrl.toLowerCase().indexOf("siparistamamla") > -1;
};
/**
 * @param {string} type
 * @param {string} data
 * @return {undefined}
 */
window.mem.redirectToFormType = function(type, data) {
  /** @type {string} */
  var output = "";
  if (type == "forgotpassword") {
    /** @type {string} */
    output = "/SifremiUnuttum";
  } else {
    /** @type {string} */
    output = type == "login" ? "/UyeGiris" : "/UyeOl";
    if (typeof data != "undefined") {
      /** @type {string} */
      output = output + ("?ReturnUrl=" + data);
    }
  }
  /** @type {string} */
  window.location.href = output;
};
/**
 * @param {string} type
 * @param {string} data
 * @return {undefined}
 */
window.mem.init.bind = function(type, data) {
  /** @type {string} */
  window.mem.init.outParams.openingType = "popup";
  /** @type {string} */
  window.mem.init.outParams.type = type;
  if (typeof data != "undefined") {
    /** @type {string} */
    window.mem.returnUrl = data;
  }
  if (globalModel.isAuthenticated) {
    if (typeof data != "undefined") {
      /** @type {string} */
      window.location.href = data;
    }
  } else {
    if (siteSettings.uyeGirisPopupAktif && window.location.href.toLowerCase().indexOf("uyegiris") == -1 && window.location.href.toLowerCase().indexOf("uyeol") == -1) {
      if (siteSettings.hizliUyelikAktif || type != "quickmembership") {
        window.mem.init._bind(type, "popup");
      } else {
        window.mem.redirectToFormType(type, data);
      }
    } else {
      window.mem.redirectToFormType(type, data);
    }
  }
};
/**
 * @param {string} type
 * @param {string} name
 * @return {undefined}
 */
window.mem.init._bind = function(type, name) {
  /** @type {string} */
  window.mem.init.outParams.openingType = name;
  /** @type {string} */
  window.mem.init.outParams.type = type;
  if (type == "login") {
    window.mem.init.login();
  } else {
    if (type == "quickmembership") {
      window.mem.init.signUp();
    } else {
      if (type == "forgotpassword") {
        window.mem.init.forgotPassword();
      }
    }
  }
};
/**
 * @return {undefined}
 */
window.mem.init.login = function() {
  window.mem.getTemplate("login", function(value) {
    var cellOptions = {
      googleLoginActive : siteSettings.googleLoginAktif,
      facebookLoginActive : siteSettings.facebookLoginAktif,
      twitterLoginAktif : siteSettings.twitterLoginAktif,
      memberName : globalModel.member.memberName,
      IsAuthenticated : globalModel.isAuthenticated,
      continueWithoutMembership : siteSettings.uyeliksizAlisverisAktif && window.mem.isCompleteOrder(),
      isPopupActive : window.mem.init.outParams.openingType == "popup"
    };
    window.mem.init.renderTemplate("login", value, cellOptions, function(usersLayoutTemplate) {
      if (window.mem.init.outParams.openingType == "popup") {
        $.fancybox.open('<div class="userLeftBox"><div id="divPopupUyeGiris">' + usersLayoutTemplate + "</div></div>", window.mem.init.outParams.fancybox);
      } else {
        var $dse = $(window.mem.init.outParams.loginRenderElement);
        if ($dse.length > 0) {
          $dse.html(usersLayoutTemplate);
        }
      }
      if (siteSettings.telefonLogin.aktif) {
        $("#txtUyeGirisEmail").attr("placeholder", translateIt("UyeGiris_MailTelefon"));
      }
      setTimeout(function() {
        if (globalModel.xidActive) {
          $(".xIDDiv").show();
          $(".xIDDiv #imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
        }
      }, 500);
    });
  });
};
/**
 * @return {undefined}
 */
window.mem.init.signUp = function() {
  if (siteSettings.uyelikSayfaParametre.dinamikFormAktif && siteSettings.uyelikSayfaParametre.dinamikFormId > 0) {
    /** @type {string} */
    window.location.href = "/UyeOl";
    return;
  }
  var n = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
    return n.alanAdi === "CepTelefonu";
  })[0];
  window.mem.getTemplate("quickmembership", function(value) {
    var cellOptions = {
      googleLoginActive : siteSettings.googleLoginAktif,
      facebookLoginActive : siteSettings.facebookLoginAktif,
      twitterLoginAktif : siteSettings.twitterLoginAktif,
      memberName : globalModel.member.memberName,
      IsAuthenticated : globalModel.isAuthenticated,
      continueWithoutMembership : siteSettings.uyeliksizAlisverisAktif && window.mem.isCompleteOrder(),
      phoneActive : n.goster,
      phoneIsRequired : n.zorunlu,
      isPopupActive : window.mem.init.outParams.openingType == "popup"
    };
    window.mem.init.renderTemplate("quickmembership", value, cellOptions, function(usersLayoutTemplate) {
      var r;
      var $itemDesc;
      var f;
      var u;
      var b_components;
      if (window.mem.init.outParams.openingType == "popup" ? ($.fancybox.open('<div class="userLeftBox"><div id="divPopupHizliUyelik">' + usersLayoutTemplate + "</div></div>", window.mem.init.outParams.fancybox), $.fancybox.update()) : (r = $(window.mem.init.outParams.quickmembershipRenderElement), r.length > 0 && r.html(usersLayoutTemplate)), initLang(), $("#txtQuickTel").intlTelInput({
        initialCountry : siteSettings.ulkeGosterme ? siteSettings.ulkeKodu : globalModel.countryCode,
        onlyCountries : siteSettings.ulkeGosterme ? [siteSettings.ulkeKodu] : [],
        utilsScript : "/Scripts/formatPhoneV2/js/utils.min.js"
      }), document.getElementById("chkSozlesme").checked = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
        return n.alanAdi === "UyelikSozlesmeSecim";
      })[0].deger, document.getElementById("chkMailPermission").checked = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
        return n.alanAdi === "KampanyaEmailSecim";
      })[0].deger, document.getElementById("chkSmsPermission").checked = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
        return n.alanAdi === "KampanyaSmsSecim";
      })[0].deger, setTimeout(function() {
        if (globalModel.xidActive) {
          $(".xIDDiv").show();
          $(".xIDDiv #imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
        }
      }, 500), $itemDesc = $(window.mem.init.outParams.openingType == "popup" ? "#divPopupHizliUyelik" : window.mem.init.outParams.quickmembershipRenderElement), $itemDesc) {
        $("#txtQuickName").on("input", function() {
          if ($("#txtQuickName").val().length > 2) {
            $itemDesc.find(".nameDiv > .isRequired").hide();
          } else {
            $itemDesc.find(".nameDiv > .isRequired").show();
          }
        });
        $("#txtQuickLastName").on("input", function() {
          if ($("#txtQuickLastName").val().length > 2) {
            $itemDesc.find(".lastDiv > .isRequired").hide();
          } else {
            $itemDesc.find(".lastDiv > .isRequired").show();
          }
        });
        $("#txtQuickEmail").on("input", function() {
          if ($("#txtQuickEmail").val().length > 0 && validateEmail($("#txtQuickEmail").val())) {
            $itemDesc.find(".emailDiv > .isRequired").hide();
          } else {
            $itemDesc.find(".emailDiv > .isRequired").show();
          }
        });
        f = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
          return n.alanAdi == "CepTelefonu";
        })[0];
        $("#txtQuickTel").on("input", function() {
          if ($("#txtQuickTel").intlTelInput("isValidNumber")) {
            $itemDesc.find(".telDiv > .isRequired").hide();
          } else {
            $itemDesc.find(".telDiv > .isRequired").show();
          }
        });
        u = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
          return n.alanAdi === "UyelikSozlesmeSecim";
        })[0];
        $("#chkSozlesme").on("input", function() {
          if ($("#chkSozlesme").prop("checked") == true && u.zorunlu) {
            $itemDesc.find(".spnSozlesmeValidation").hide();
          } else {
            $itemDesc.find(".spnSozlesmeValidation").show();
          }
        });
        b_components = siteSettings.uyeAyar.sifreAyar;
        $("#txtQuickPass").on("input", function() {
          if ($("#txtQuickPass").val().length > b_components.maksimumUzunluk || $("#txtQuickPass").val().length < b_components.minimumUzunluk) {
            $itemDesc.find(".passDiv .isRequired").html(translateIt("Validation_SifreMinimumMinimumDegerKontrol").replace("{0}", b_components.minimumUzunluk).replace("{1}", b_components.maksimumUzunluk));
            $itemDesc.find(".passDiv .isRequired").show();
          } else {
            $itemDesc.find(".passDiv .isRequired").hide();
          }
          /** @type {string} */
          var value = "";
          if (b_components.buyukHarfZorunlu && !/[A-Z]/.test($("#txtQuickPass").val())) {
            /** @type {string} */
            value = value + (" " + translateIt("Global_BuyukHarf").toLowerCase() + ",");
          } else {
            if (b_components.harfZorunlu && !/[A-Z-a-z]/.test($("#txtQuickPass").val())) {
              /** @type {string} */
              value = value + (" " + translateIt("Global_Harf").toLowerCase() + ",");
            }
          }
          if (b_components.rakamZorunlu && !/[0-9]/.test($("#txtQuickPass").val())) {
            /** @type {string} */
            value = value + (" " + translateIt("Global_Rakam").toLowerCase() + ",");
          }
          if (b_components.ozelKarakterZorunlu && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($("#txtQuickPass").val())) {
            /** @type {string} */
            value = value + (" " + translateIt("Global_OzelKarakter").toLowerCase() + ",");
          }
          if (value !== "") {
            /** @type {string} */
            value = value.substring(0, value.length - 1);
            $itemDesc.find(".passDiv .isRequired").html(translateIt("Validation_Sifresnizde0Bulunmalidir").replace("{0}", value));
            $itemDesc.find(".passDiv .isRequired").show();
          }
        });
      }
    });
  });
};
/**
 * @return {undefined}
 */
window.mem.init.forgotPassword = function() {
  window.mem.getTemplate("forgotpassword", function(value) {
    var cellOptions = {
      googleLoginActive : siteSettings.googleLoginAktif,
      facebookLoginActive : siteSettings.facebookLoginAktif,
      twitterLoginAktif : siteSettings.twitterLoginAktif,
      memberName : globalModel.member.memberName,
      IsAuthenticated : globalModel.isAuthenticated,
      isPopupActive : window.mem.init.outParams.openingType == "popup"
    };
    window.mem.init.renderTemplate("forgotpassword", value, cellOptions, function(usersLayoutTemplate) {
      if (window.mem.init.outParams.openingType == "popup") {
        $.fancybox.open('<div class="userLeftBox"><div id="divSifremiUnuttum">' + usersLayoutTemplate + "</div></div>", window.mem.init.outParams.fancybox);
        $.fancybox.update();
      } else {
        var $dse = $(window.mem.init.outParams.forgotPasswordRenderElement);
        if ($dse.length > 0) {
          $dse.html(usersLayoutTemplate);
        }
      }
      initLang();
      $(".xIDDiv").show();
      $(".xIDDiv #imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
    });
  });
};
/**
 * @param {string} state
 * @param {?} template
 * @param {?} options
 * @param {!Function} callback
 * @return {undefined}
 */
window.mem.init.renderTemplate = function(state, template, options, callback) {
  var args = Handlebars.compile(template)(options);
  callback(args);
};
/**
 * @return {undefined}
 */
window.mem.init.refreshXId = function() {
  $(".xIDDiv #imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
};
/**
 * @param {boolean} data
 * @return {undefined}
 */
window.mem.form.loading = function(data) {
  if (data) {
    $(".userLeftBox").addClass("sayfaYukleniyor");
    $(".userRightBox").addClass("sayfaYukleniyor");
    $(".newuserForm").addClass("sayfaYukleniyor");
  } else {
    $(".userLeftBox").removeClass("sayfaYukleniyor");
    $(".userRightBox").removeClass("sayfaYukleniyor");
    $(".newuserForm").removeClass("sayfaYukleniyor");
  }
};
/**
 * @return {?}
 */
window.mem.form.validation = function() {
  var data = {
    isError : false
  };
  var u;
  var f;
  var self;
  var r;
  var inputValue;
  if (window.mem.init.outParams.type == "login") {
    self = $(window.mem.init.outParams.openingType == "popup" ? "#divPopupUyeGiris" : window.mem.init.outParams.loginRenderElement);
    data.userName = $("#txtUyeGirisEmail").val();
    data.password = $("#txtUyeGirisPassword").val();
    data.otp = $("#txtUyeGirisOtp").val();
    data.xIDCode = $("#txtGuvenlikKodu").val();
    self.find(".isRequired").hide();
    self.find(".mailRequired").hide();
    self.find(".userNameLengt").hide();
    self.find(".onlyNumber").hide();
    self.find(".passDiv .isRequired").hide();
    self.find(".emailDiv .isRequired").hide();
    self.find(".emailDiv .userNameLengthNotValid").hide();
    self.find(".emailDiv .onlyNumber").hide();
    self.find(".emailDiv .mailRequired").hide();
    if (data.password.length <= 0) {
      self.find(".passDiv .isRequired").show();
      /** @type {boolean} */
      data.isError = true;
    }
    if (data.userName.length == 0) {
      self.find(".emailDiv .isRequired").show();
      /** @type {boolean} */
      data.isError = true;
    }
    if (globalModel.xidActive && data.xIDCode.length == 0) {
      self.find(".xIDDiv .isRequired").show();
      self.find(".xIDDiv .isRequired").html(translateIt("UrunDetay_HataliGuvenlikKodu"));
      /** @type {boolean} */
      data.isError = true;
    }
    if (siteSettings.telefonLogin.aktif) {
      if (data.userName.indexOf("@") != -1) {
        if (!validateEmail(data.userName)) {
          self.find(".emailDiv .mailRequired").show();
          /** @type {boolean} */
          data.isError = true;
        }
      } else {
        if (data.userName.length != siteSettings.telefonLogin.karakterSayisi) {
          self.find(".emailDiv .userNameLengthNotValid").show();
          /** @type {boolean} */
          data.isError = true;
        }
        if (IsNumberWord(data.userName)) {
          self.find(".emailDiv .onlyNumber").show();
          /** @type {boolean} */
          data.isError = true;
        }
      }
    } else {
      if (!validateEmail(data.userName)) {
        self.find(".emailDiv .mailRequired").show();
        /** @type {boolean} */
        data.isError = true;
      }
    }
  } else {
    if (window.mem.init.outParams.type == "quickmembership") {
      if (self = $(window.mem.init.outParams.openingType == "popup" ? "#divPopupHizliUyelik" : window.mem.init.outParams.quickmembershipRenderElement), data.groupElement = self, data.name = self.find("#txtQuickName").val(), data.lastName = self.find("#txtQuickLastName").val(), data.email = self.find("#txtQuickEmail").val(), data.password = self.find("#txtQuickPass").val(), data.phone = self.find("#txtQuickTel").val(), data.mailPermission = self.find("#chkMailPermission").prop("checked") || false, 
      data.smsPermission = self.find("#chkSmsPermission").prop("checked") || false, data.membershipContract = self.find("#chkSozlesme").prop("checked") || false, data.xID = self.find("#txtGuvenlikKodu").val(), self.find(".isRequired").hide(), self.find(".mailRequired").hide(), data.name.length < 2 && (self.find(".nameDiv > .isRequired").show(), data.isError = true), data.lastName.length < 2 && (self.find(".lastDiv > .isRequired").show(), data.isError = true), data.email.length == 0 ? (self.find(".emailDiv > .isRequired").show(), 
      data.isError = true) : validateEmail(data.email) || (self.find(".emailDiv .mailRequired").show(), data.isError = true), u = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
        return n.alanAdi == "CepTelefonu";
      })[0], u.zorunlu ? $("#txtQuickTel").intlTelInput("isValidNumber") ? self.find(".telDiv .isRequired").hide() : (self.find(".telDiv .isRequired").show(), data.isError = true) : self.find(".telDiv .isRequired").hide(), data.password.length <= 0 && (self.find(".passDiv .isRequired").html(translateIt("Validation_SifreGiriniz")), self.find(".passDiv .isRequired").show(), data.isError = true), f = siteSettings.uyelikSayfaParametre.alanParametre.filter(function(n) {
        return n.alanAdi === "UyelikSozlesmeSecim";
      })[0], !data.membershipContract && f.zorunlu ? (self.find(".spnSozlesmeValidation").show(), data.isError = true) : self.find(".spnSozlesmeValidation").hide(), r = siteSettings.uyeAyar.sifreAyar, data.password.length > r.maksimumUzunluk || data.password.length < r.minimumUzunluk) {
        return self.find(".passDiv .isRequired").html(translateIt("Validation_SifreMinimumMinimumDegerKontrol").replace("{0}", r.minimumUzunluk).replace("{1}", r.maksimumUzunluk)), self.find(".passDiv .isRequired").show(), data.isError = true, data;
      }
      if (inputValue = "", r.buyukHarfZorunlu && !/[A-Z]/.test(data.password) ? inputValue = inputValue + (" " + translateIt("Global_BuyukHarf").toLowerCase() + ",") : r.harfZorunlu && !/[A-Z-a-z]/.test(data.password) && (inputValue = inputValue + (" " + translateIt("Global_Harf").toLowerCase() + ",")), r.rakamZorunlu && !/[0-9]/.test(data.password) && (inputValue = inputValue + (" " + translateIt("Global_Rakam").toLowerCase() + ",")), r.ozelKarakterZorunlu && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(data.password) && 
      (inputValue = inputValue + (" " + translateIt("Global_OzelKarakter").toLowerCase() + ",")), inputValue !== "") {
        return inputValue = inputValue.substring(0, inputValue.length - 1), self.find(".passDiv .isRequired").html(translateIt("Validation_Sifresnizde0Bulunmalidir").replace("{0}", inputValue)), self.find(".passDiv .isRequired").show(), data.isError = true, data;
      }
      if (globalModel.xidActive && data.xID == "") {
        self.find(".xIDDiv label.isRequired").show();
        /** @type {boolean} */
        data.isError = true;
      }
    } else {
      if (window.mem.init.outParams.type == "forgotpassword") {
        self = $(window.mem.init.outParams.openingType == "popup" ? "#divSifremiUnuttum" : window.mem.init.outParams.forgotPasswordRenderElement);
        data.groupElement = self;
        data.userName = self.find("#txtSifremiUnuttumEmail").val();
        self.find(".isRequired").hide();
        self.find(".mailRequired").hide();
        self.find(".userNameLengt").hide();
        self.find(".onlyNumber").hide();
        data.xID = self.find(".divSifreminiUnuttumIDDiv #txtGuvenlikKodu").val();
        if (data.xID == "") {
          $(".divSifreminiUnuttumIDDiv label.isRequired").show();
          /** @type {boolean} */
          data.isError = true;
        }
        if (data.userName.length == 0) {
          self.find(".emailDiv > .isRequired").show();
          /** @type {boolean} */
          data.isError = true;
        }
        if (siteSettings.telefonLogin.aktif) {
          if (data.userName.indexOf("@") != -1) {
            if (!validateEmail(data.userName)) {
              self.find(".emailDiv .mailRequired").show();
              /** @type {boolean} */
              data.isError = true;
            }
          } else {
            if (data.userName.length != siteSettings.telefonLogin.karakterSayisi) {
              self.find(".emailDiv .userNameLengthNotValid").show();
              /** @type {boolean} */
              data.isError = true;
            }
            if (IsNumberWord(data.userName)) {
              self.find(".emailDiv .onlyNumber").show();
              /** @type {boolean} */
              data.isError = true;
            }
          }
        } else {
          if (!validateEmail(data.userName)) {
            self.find(".emailDiv .mailRequired").show();
            /** @type {boolean} */
            data.isError = true;
          }
        }
      } else {
        if (window.mem.init.outParams.type == "changepassword") {
          if (self = $(window.mem.init.outParams.openingType == "popup" ? "#divSifreDegistir" : window.mem.init.outParams.quickmembershipRenderElement), data.groupElement = self, data.password = self.find("#mainHolder_txtbxSifre").val(), data.passwordAgain = self.find("#mainHolder_txtbxSifre2").val(), data.xID = self.find("#txtGuvenlikKodu").val(), self.find(".passwordRequired").hide(), self.find(".passwordRequiredAgain").hide(), self.find(".passwordDoesNotMatch").hide(), data.password.length == 
          0 && (self.find(".newPassword .passwordRequired").html(translateIt("Validation_SifreGiriniz")), self.find(".newPassword .passwordRequired").show(), data.isError = true), data.passwordAgain.length == 0 && (self.find(".newPasswordAgain .passwordRequiredAgain").show(), data.isError = true), data.isError) {
            return data;
          }
          if (r = siteSettings.uyeAyar.sifreAyar, data.password.length > r.maksimumUzunluk || data.password.length < r.minimumUzunluk) {
            return self.find(".newPassword .passwordRequired").html(translateIt("Validation_SifreMinimumMinimumDegerKontrol").replace("{0}", r.minimumUzunluk).replace("{1}", r.maksimumUzunluk)), self.find(".newPassword .passwordRequired").show(), data.isError = true, data;
          }
          if (inputValue = "", r.buyukHarfZorunlu && !/[A-Z]/.test(data.password) ? inputValue = inputValue + (" " + translateIt("Global_BuyukHarf").toLowerCase() + ",") : r.harfZorunlu && !/[A-Z-a-z]/.test(data.password) && (inputValue = inputValue + (" " + translateIt("Global_Harf").toLowerCase() + ",")), r.rakamZorunlu && !/[0-9]/.test(data.password) && (inputValue = inputValue + (" " + translateIt("Global_Rakam").toLowerCase() + ",")), r.ozelKarakterZorunlu && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(data.password) && 
          (inputValue = inputValue + (" " + translateIt("Global_OzelKarakter").toLowerCase() + ",")), inputValue !== "") {
            return inputValue = inputValue.substring(0, inputValue.length - 1), self.find(".newPassword .passwordRequired").html(translateIt("Validation_Sifresnizde0Bulunmalidir").replace("{0}", inputValue)), self.find(".newPassword .passwordRequired").show(), data.isError = true, data;
          }
          if (data.password != data.passwordAgain) {
            self.find(".newPasswordAgain .passwordDoesNotMatch").show();
            /** @type {boolean} */
            data.isError = true;
          }
          if (data.xID == "") {
            self.find(".xIDDiv label.isRequired").show();
            /** @type {boolean} */
            data.isError = true;
          }
        }
      }
    }
  }
  return data;
};
/**
 * @param {string} n
 * @param {string} froot
 * @return {?}
 */
window.mem.form.getAdmUrl = function(n, froot) {
  var view = getQueryStringByName("adminlang", n);
  return view == null ? (n + (n.indexOf("?") == -1 ? "?adminlang=" + froot : "&adminlang=" + froot)).replace("://", "") : n;
};
/**
 * @param {boolean} values
 * @return {undefined}
 */
window.mem.form.login = function(values) {
  var opts;
  var self;
  /** @type {string} */
  window.mem.init.outParams.type = "login";
  opts = window.mem.form.validation("login");
  if (!opts.isError) {
    self = {
      Username : opts.userName,
      Password : opts.password,
      NotMember : 0,
      Otp : opts.otp,
      XID : opts.xIDCode,
      IsAdmin : typeof values == "undefined" ? false : values
    };
    window.mem.form.loading(true);
    ticimaxApi.member.login(self, function(data) {
      var match;
      var index;
      var i;
      var href;
      if (data.isError) {
        if (data.xidActive) {
          /** @type {boolean} */
          globalModel.xidActive = true;
          $(".xIDDiv").show();
          $("#txtGuvenlikKodu").val("");
          if ($(".ticimaxCaptcha").length > 0) {
            $(".ticimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
          } else {
            $("#imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
          }
        }
        window.mem.form.loading(false);
        TiciNoty.Show({
          message : data.errorMessage,
          type : "warning"
        });
        if (data.isRedirect) {
          window.location.href = data.redirectUrl;
        }
      } else {
        if (data.otpRequired) {
          window.mem.form.loading(false);
          $(".otpDiv").show();
        } else {
          if (match = TiciCookie.getObjEncode("kampanyaTeklifleri") || null, index = match !== null ? match.ilgilendigimTeklifler.length : 0, match !== null) {
            /** @type {number} */
            i = 0;
            for (; i < match.ilgilendigimTeklifler.length; i++) {
              ticimaxApi.campaign.acceptOffer({
                OfferId : match.ilgilendigimTeklifler[i]
              }, function() {
              });
            }
          }
          SetStokBilgilendirme(data.stockAlerts);
          SetFavoriListe(data.favoritesProduct);
          clearCartLocalStorage();
          if (typeof visiLab != "undefined") {
            visiLab = new Visilabs;
            visiLab.AddParameter("OM.exVisitorID", self.Username);
            visiLab.AddParameter("OM.b_login", "1");
            visiLab.Collect();
          }
          href = typeof window.mem.returnUrl != "undefined" ? window.mem.returnUrl : window.location.href.replace(window.location.origin, "");
          if (values && siteSettings.siteYonetimAyar.panelDilAktif) {
            setTimeout(function() {
              var text = window.mem.form.getAdmUrl(decodeURIComponent(window.mem.returnUrl), data.managementDefaultLang);
              window.location.href = text != null ? text.replace("://", "") : href ? href.replace("://", "") : "/";
            }, index * 100);
          } else {
            setTimeout(function() {
              window.location.href = href ? href.replace("://", "") : "/";
            }, index * 100);
          }
        }
      }
    });
  }
};
/**
 * @return {undefined}
 */
window.mem.form.signUp = function() {
  var self;
  var result;
  /** @type {string} */
  window.mem.init.outParams.type = "quickmembership";
  self = window.mem.form.validation("quickmembership");
  var boxInput = self.smsPermission;
  var hparent = self.mailPermission;
  if (siteSettings.siteYonetimAyar.iysApiAyar.iysYoluAktif) {
    /** @type {boolean} */
    boxInput = false;
    /** @type {boolean} */
    hparent = false;
  }
  /** @type {string} */
  window.mem.init.outParams.type = "quickmembership";
  self = window.mem.form.validation("quickmembership");
  if (!self.isError) {
    result = {
      Name : self.name,
      LastName : self.lastName,
      Telephone : self.phone,
      EMail : self.email,
      CellPhone : self.phone,
      Password : self.password,
      PasswordUpdate : false,
      CountryId : 0,
      CityId : 0,
      DistrictId : 0,
      EducationStatusId : 0,
      DateOfBirth : "01.01.1900",
      GenderId : 2,
      SmsAllowed : boxInput,
      EmailAllowed : hparent,
      MemberTypeId : 1,
      MemberSource : $(window).width() < 992 ? globalModel.isiosDevice || globalModel.isAndroidDevice ? 2 : 1 : 0,
      XID : self.xID
    };
    window.mem.form.loading(true);
    ticimaxApi.member.saveMemberAndLogin(result, function(response) {
      if (response.isError) {
        if (response.xidActive) {
          /** @type {boolean} */
          globalModel.xidActive = true;
          $(".xIDDiv").show();
          $(".xIDDiv #imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
        }
        window.mem.form.loading(false);
        TiciNoty.Show({
          message : response.errorMessage,
          type : "warning"
        });
      } else {
        if (typeof visiLab != "undefined" && (visiLab = new Visilabs, visiLab.AddParameter("OM.exVisitorID", result.EMail), visiLab.AddParameter("OM.b_sgnp", "1"), visiLab.Collect()), siteSettings.personaClickAktif) {
          var data = {
            id : response.memberId,
            email : result.EMail,
            first_name : result.Name,
            last_name : result.LastName,
            phone : result.CellPhone
          };
          if (result.GenderId == 1) {
            /** @type {string} */
            data.gender = "m";
          } else {
            if (result.GenderId == 0) {
              /** @type {string} */
              data.gender = "f";
            }
          }
          personaclick("profile", "set", data);
          personaclick("subscription", "manage", {
            email : result.EMail,
            phone : result.CellPhone,
            email_bulk : result.EmailAllowed,
            email_chain : result.EmailAllowed,
            email_transactional : result.EmailAllowed,
            sms_bulk : result.SmsAllowed,
            sms_chain : result.SmsAllowed,
            sms_transactional : result.SmsAllowed
          });
          personaclick("segment", "add", {
            email : result.EMail,
            phone : result.CellPhone,
            segment_id : siteSettings.personaClickUyeSegmentId
          });
        }
        if (response.isError && response.errorCode != "Err-Login-003" && response.errorCode != "Err-Login-004") {
          window.mem.form.loading(false);
          TiciNoty.Show({
            message : response.errorMessage,
            type : "warning"
          });
        } else {
          SetStokBilgilendirme(response.stockAlerts);
          SetFavoriListe(response.favoritesProduct);
          if (siteSettings.siteYonetimAyar.iysApiAyar.iysYoluAktif && (self.smsPermission || self.mailPermission)) {
            if (self.mailPermission) {
              response.redirectUrl += "&mper=true";
            }
            if (self.smsPermission) {
              response.redirectUrl += "&sper=true";
            }
          }
          window.mem.form.loading(false);
          parent.window.location.href = siteSettings.uyelikYoneticiOnayiAktif || siteSettings.uyelikMailOnayiAktif ? response.redirectUrl : window.mem.returnUrl != null ? window.mem.returnUrl.replace("://", "") : response.redirectUrl == "" ? "/" : response.redirectUrl;
        }
      }
    });
  }
};
/**
 * @return {undefined}
 */
window.mem.form.forgotPassword = function() {
  /** @type {string} */
  window.mem.init.outParams.type = "forgotpassword";
  var self = window.mem.form.validation("forgotpassword");
  if (!self.isError) {
    ticimaxApi.member.forgotPassword({
      EMail : self.userName,
      XID : self.xID
    }, function(result) {
      if (result.isError) {
        self.groupElement.find(".divSifreminiUnuttumIDDiv").show();
        self.groupElement.find(".divSifreminiUnuttumIDDiv #txtGuvenlikKodu").val("");
        self.groupElement.find(".divSifreminiUnuttumIDDiv #imgTicimaxCaptcha").attr("src", "handlers/TicimaxCaptcha.ashx?v=" + (new Date).getTime());
        TiciNoty.Show({
          message : result.errorMessage,
          type : "danger"
        });
      } else {
        TiciNoty.Show({
          message : translateIt("Message_IslerimizBasarili"),
          type : "success"
        });
        if (typeof forgotPasswordCallBack != "undefined") {
          forgotPasswordCallBack();
        }
        parent.$.fancybox.close();
      }
    });
  }
};
/**
 * @return {undefined}
 */
window.mem.form.changePassword = function() {
  /** @type {string} */
  window.mem.init.outParams.type = "changepassword";
  var self = window.mem.form.validation("changepassword");
  if (!self.isError) {
    ticimaxApi.member.changePassword({
      Password : self.password,
      PasswordAgain : self.passwordAgain,
      XID : self.xID,
      Key : location.href.split("/").pop()
    }, function(data) {
      if (data.isError) {
        self.groupElement.find("#txtGuvenlikKodu").val("");
        self.groupElement.find("#imgTicimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
        TiciNoty.Show({
          message : data.errorMessage,
          type : "danger"
        });
      } else {
        location.href = data.redirectUrl;
      }
    });
  }
};
/**
 * @return {undefined}
 */
window.mem.form.continueWithoutMembership = function() {
  /** @type {string} */
  window.location.href = "/SiparisTamamla";
};
/**
 * @param {?} obj
 * @param {string} elem
 * @param {string} i
 * @return {undefined}
 */
window.mem.form.maskPasswordIn = function(obj, elem, i) {
  /** @type {string} */
  document.getElementById(obj).type = "text";
  $("#" + elem).css("display", "none");
  $("#" + i).css("display", "inherit");
};
/**
 * @param {?} obj
 * @param {string} elem
 * @param {string} i
 * @return {undefined}
 */
window.mem.form.maskPasswordOut = function(obj, elem, i) {
  /** @type {string} */
  document.getElementById(obj).type = "password";
  $("#" + elem).css("display", "inherit");
  $("#" + i).css("display", "none");
};
/**
 * @param {string} type
 * @param {!Function} callback
 * @return {undefined}
 */
window.mem.getTemplate = function(type, callback) {
  var data;
  var values;
  if (type === "login") {
    data = window.ticimaxStorage.getToJson("ticimax-m-lgn");
    if (data !== null && (new Date(data.expiry)).addHours(1) > new Date && data.version == globalModel.version) {
      callback(data.data);
    } else {
      $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Uye/UyeGiris.html?v=" + siteSettings.yazilimVersiyon, function(request) {
        window.ticimaxStorage.add("ticimax-m-lgn", JSON.stringify({
          data : request,
          expiry : new Date,
          version : globalModel.version
        }));
        callback(request);
      });
    }
  } else {
    if (type === "quickmembership") {
      values = window.ticimaxStorage.getToJson("ticimax-m-quick");
      if (values !== null && (new Date(values.expiry)).addHours(1) > new Date && values.version == globalModel.version) {
        callback(values.data);
      } else {
        $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Uye/HizliUyelik.html?v=" + siteSettings.yazilimVersiyon, function(request) {
          window.ticimaxStorage.add("ticimax-m-quick", JSON.stringify({
            data : request,
            expiry : new Date,
            version : globalModel.version
          }));
          callback(request);
        });
      }
    } else {
      if (type === "forgotpassword") {
        values = window.ticimaxStorage.getToJson("ticimax-m-fp");
        if (values !== null && (new Date(values.expiry)).addHours(1) > new Date && values.version == globalModel.version) {
          callback(values.data);
        } else {
          $.get(siteSettings.siteYonetimAyar.sablonAyar.sablonYolu + "/Uye/SifremiUnuttum.html?v=" + siteSettings.yazilimVersiyon, function(request) {
            window.ticimaxStorage.add("ticimax-m-fp", JSON.stringify({
              data : request,
              expiry : new Date,
              version : globalModel.version
            }));
            callback(request);
          });
        }
      }
    }
  }
};
$(window).load(function() {
  $((window.mem.init.outParams.openingType == "popup" ? "#divPopupUyeGiris" : window.mem.init.outParams.loginRenderElement) + " input").on("keypress", function(event) {
    if (event.which == 13) {
      window.mem.form.login();
    }
  });
  $((window.mem.init.outParams.openingType == "popup" ? "#divPopupHizliUyelik" : window.mem.init.outParams.loginRenderElement) + " input").on("keypress", function(event) {
    if (event.which == 13) {
      window.mem.form.signUp();
    }
  });
  $((window.mem.init.outParams.openingType == "popup" ? "#divSifremiUnuttum" : window.mem.init.outParams.loginRenderElement) + " input").on("keypress", function(event) {
    if (event.which == 13) {
      window.mem.form.forgotPassword();
    }
  });
  if (globalModel.xidActive) {
    $(".xIDDiv").show();
    $(".xIDDiv .ticimaxCaptcha").attr("src", "/api/Captcha/GetCaptcha?v=" + (new Date).getTime());
  }
  if (jQuery().intlTelInput) {
    $("#txtQuickTel").intlTelInput({
      initialCountry : siteSettings.ulkeGosterme ? siteSettings.ulkeKodu : globalModel.countryCode,
      onlyCountries : siteSettings.ulkeGosterme ? [siteSettings.ulkeKodu] : [],
      utilsScript : "/Scripts/formatPhoneV2/js/utils.min.js"
    });
  }
});
window.cart = {};
window.cart.settings = {
  isMobileWidth : undefined
};
/**
 * @return {?}
 */
window.cart.settings.isMobile = function() {
  return isMobileDevice() && (window.cart.settings.isMobileWidth != undefined ? $(window).width() < window.cart.settings.isMobileWidth : false);
};
window.cart.add = {};
window.cart.add.model = {
  ProductId : 0,
  VariantId : 0,
  Piece : 1,
  CampaignId : 0,
  CampaignConnectedProductId : 0,
  AssortmentProductId : 0,
  SpecialNote : "",
  SuccessCallBack : function() {
  },
  FormId : 0,
  IsSuite : false,
  IsCombine : false,
  ProductUnique : "",
  ProductUrl : "",
  Files : null
};
window.cart.add.settings = {
  disabledPopup : false,
  disabledAllNotification : false
};
/**
 * @return {undefined}
 */
window.cart.add.product = function() {
  if (siteSettings.magazaModulu.magazaStokSatis.aktif) {
    if (magazaBolgeSecimi == null) {
      showMagazaAyarPopup();
      return;
    }
    if (siteSettings.magazaModulu.magazaStokSatis.magazaTemsilciAyar.aktif && !localStorage.sepetHazirlayan) {
      ticimaxApi.cart.getShopAgent(null, function(ignores) {
        if (ignores.id > 0) {
          /** @type {string} */
          localStorage.sepetHazirlayan = JSON.stringify(ignores);
        }
      });
    }
  }
  if (!siteSettings.tamamlayiciUrunAktif || window.cart.add.model.AssortmentProductId > 0 && window.cart.add.model.VariantId === 0) {
    window.cart.add.productAdding();
  } else {
    window.cart.add.integral();
  }
};
/**
 * @return {undefined}
 */
window.cart.add.integral = function() {
  /** @type {!Array} */
  var newNodeLists = [];
  if (window.cart.add.model.IsSuite) {
    newNodeLists = window.Suite.Model.suite.products.filter(function(sender) {
      return sender.isSelected === true;
    }).map(function(line) {
      return {
        VariantId : line.variantId,
        Quantity : line.quantity
      };
    });
  } else {
    if (window.cart.add.model.IsCombine) {
      newNodeLists = window.ProductCombine.ProductsToAdd.map(function(item) {
        return {
          VariantId : item.VariantId,
          Quantity : item.Quantity
        };
      });
    } else {
      newNodeLists.push({
        VariantId : parseInt(urunID),
        Quantity : adet
      });
    }
  }
  ticimaxApi.cart.controlProductIntegral({
    Variants : newNodeLists
  }, function(time) {
    if (window.Integral.Model = time, time.integrals.length > 0) {
      var source_passwords = getHandlebarTemplate("ticimax-Integral");
      var snap = Handlebars.compile(source_passwords);
      var marker = snap(time);
      createModal({
        id : "ticimax-",
        content : marker,
        width : "50%"
      });
    } else {
      window.cart.add.productAdding();
    }
  });
};
/**
 * @return {undefined}
 */
window.cart.add.productAdding = function() {
  var listCol;
  var products;
  var i;
  var entrytwo;
  if (window.cart.add.model.AssortmentProductId > 0 && window.cart.add.model.VariantId == 0) {
    entrytwo = {
      AsortiUrunKartId : window.cart.add.model.AssortmentProductId,
      KampanyaId : window.cart.add.model.CampaignId,
      BagliUrunId : window.cart.add.model.CampaignConnectedProductId,
      UrunKartId : window.cart.add.model.ProductId,
      UrunId : window.cart.add.model.VariantId,
      Adet : window.cart.add.model.Piece,
      UrunNot : window.cart.add.model.SpecialNote,
      FormId : window.cart.add.model.FormId
    };
    ticimaxApi.cart.add(entrytwo, function() {
    });
  } else {
    if (window.cart.add.model.IsSuite || window.cart.add.model.IsCombine) {
      listCol = {};
      /** @type {!Array} */
      listCol.CartProducts = [];
      /** @type {!Array} */
      products = [];
      products = window.cart.add.model.IsSuite ? window.Suite.Model.suite.products.filter(function(sender) {
        return sender.isSelected === true;
      }) : window.ProductCombine.ProductsToAdd.map(function(product) {
        return {
          variantId : product.VariantId,
          quantity : product.Quantity
        };
      });
      /** @type {number} */
      i = 0;
      for (; i < products.length; i++) {
        listCol.CartProducts.push({
          AsortiUrunKartId : 0,
          KampanyaId : 0,
          UrunKartId : window.cart.add.model.ProductId,
          UrunId : products[i].variantId,
          BagliUrunId : 0,
          Adet : products[i].quantity,
          UrunNot : window.cart.add.model.SpecialNote,
          FormId : ""
        });
      }
      ticimaxApi.cart.addToCartProducts(listCol, function(tilesPerTexture) {
        window.cart.add.productAddResponse(tilesPerTexture);
      });
    } else {
      entrytwo = {
        AsortiUrunKartId : window.cart.add.model.AssortmentProductId,
        KampanyaId : window.cart.add.model.CampaignId,
        BagliUrunId : window.cart.add.model.CampaignConnectedProductId,
        UrunKartId : window.cart.add.model.ProductId,
        UrunId : window.cart.add.model.VariantId,
        Adet : window.cart.add.model.Piece,
        UrunNot : window.cart.add.model.SpecialNote,
        FormId : window.cart.add.model.FormId
      };
      ticimaxApi.cart.addV2(entrytwo, function(tilesPerTexture) {
        window.cart.add.productAddResponse(tilesPerTexture);
      });
    }
  }
};
/**
 * @param {!Object} n
 * @return {undefined}
 */
window.cart.add.productAddResponse = function(n) {
  window.cart.add.clearCache();
  if (n.isError) {
    TiciNoty.Show({
      message : n.errorMessage,
      type : "danger"
    });
  } else {
    window.cart.add.model.SuccessCallBack();
    if (typeof AddToCartCallback != "undefined") {
      AddToCartCallback();
    }
    if (siteSettings.urunDosyaYuklemeAktif) {
      window.cart.add.file(function() {
        window.cart.add.diagram(n);
      });
    } else {
      window.cart.add.diagram(n);
    }
  }
};
/**
 * @return {undefined}
 */
window.cart.add.diagram = function() {
  var SERVER = window.cart.settings.isMobile();
  var e = siteSettings.siteYonetimAyar.sepetDiagram[SERVER ? "mobile" : "web"];
  var i_rrd_data = siteSettings.siteYonetimAyar.sepetDiagram.mobil.filter(function(timeline_mode) {
    return timeline_mode.id == 1;
  })[0];
  var grunttask;
  var enable_keys;
  var relid1;
  var ngiScroll_timeout;
  if (i_rrd_data != undefined) {
    /** @type {boolean} */
    enable_keys = false;
    if (siteSettings.urunDosyaYuklemeAktif && document.getElementById("fuUrunSiparisDosya")) {
      /** @type {(Element|null)} */
      grunttask = document.getElementById("fuUrunSiparisDosya");
      /** @type {boolean} */
      enable_keys = grunttask != null ? grunttask.files.length > 0 || false : false;
    }
    TiciNoty.Show({
      message : translateIt("GlobalMasterPage_UyariSepeteEklendi") + (enable_keys ? translateIt("GlobalMasterPage_UyariDosyaYukleniyor") : ""),
      type : "success",
      autoclose : false,
      cancelButtonText : translateIt("Sepet_AlisveriseDevamEt"),
      confirmButtonText : translateIt("Sepet_AlisverisiTamamla"),
      customDialogClass : "dialogSiparis",
      autoclose : i_rrd_data.DiagramDegerAyar.UyariAyar.OtomatikKapat,
      closetime : i_rrd_data.DiagramDegerAyar.UyariAyar.Zaman * 1E3
    }, function() {
      /** @type {string} */
      location.href = "/Sepetim.aspx";
    });
  }
  relid1 = siteSettings.siteYonetimAyar.sepetDiagram.mobil.filter(function(timeline_mode) {
    return timeline_mode.id == 2;
  })[0];
  if (relid1 != undefined) {
    /** @type {number} */
    ngiScroll_timeout = (i_rrd_data != undefined ? i_rrd_data != i_rrd_data.DiagramDegerAyar.UyariAyar.Zaman : 3) * 1E3;
    setTimeout(function() {
      /** @type {string} */
      location.href = "/Sepetim.aspx";
    }, ngiScroll_timeout);
  }
};
/**
 * @return {undefined}
 */
window.cart.add.clearCache = function() {
  clearCartLocalStorage();
};
/**
 * @param {!Function} successCallback
 * @return {undefined}
 */
window.cart.add.file = function(successCallback) {
  /** @type {(Element|null)} */
  var zipEntries = document.getElementById("fuUrunSiparisDosya");
  /** @type {boolean} */
  var e = zipEntries != null ? zipEntries.files.length > 0 || false : false;
  var fd;
  var files;
  var i;
  var xhr;
  if (e) {
    /** @type {!FormData} */
    fd = new FormData;
    fd.append("VariantId", window.cart.add.model.VariantId);
    files = zipEntries.files;
    /** @type {number} */
    i = 0;
    for (; i < files.length; i++) {
      fd.append("Image" + i, files[i]);
    }
    /** @type {!XMLHttpRequest} */
    xhr = new XMLHttpRequest;
    xhr.addEventListener("load", function() {
      successCallback();
    });
    xhr.open("POST", "/api/cart/SaveCartProductFile");
    xhr.send(fd);
  } else {
    successCallback();
  }
};
systemActive = siteSettings.siteYonetimAyar.generalSearch.design.systemActive && !siteSettings.personaClickAramaAktif;
window.tSearch = {
  v1 : {},
  v2 : {},
  v3 : {},
  v4 : {}
};
if (systemActive) {
  templateType = siteSettings.siteYonetimAyar.generalSearch.design.template;
  window.tSearch.template = {};
  window.tSearch.model = {
    service : {},
    mobileWidth : 801,
    searchKeyword : ""
  };
  window.tSearch.model.isMobile = isMobileDevice() || $(window).width() < window.tSearch.model.mobileWidth;
  if (!window.tSearch.model.isMobile) {
    document.addEventListener("scroll", function() {
      /** @type {(Element|null)} */
      var filterDiv = document.getElementById("divAramaAlani");
      if (!filterDiv) {
        /** @type {(Element|null)} */
        filterDiv = document.getElementById("divAramaSonuc");
      }
      if (filterDiv && filterDiv.style.display == "") {
        /** @type {string} */
        filterDiv.style.display = "none";
      }
    });
  }
  $(document).ready(function() {
    if (siteSettings.hizliAramaAyar.siteSesliAramaAktif) {
      if (document.getElementById("start_button") !== null) {
        initSpeechReg();
      }
    } else {
      try {
        /** @type {string} */
        document.getElementById("start_button").style.display = "none";
      } catch (n) {
      }
    }
    setTimeout(function() {
      window.tSearch.init();
    }, 1500);
    window.tSearch.setAutoComplate();
    $(document).on("click", ".ticimaxSearchInput", function(event) {
      window.tSearch.clickSearchBox(event.currentTarget);
    });
    $(document).on("click", ".topAutocompleteActive", function() {
      window.tSearch.close();
    });
  });
  /**
   * @return {undefined}
   */
  window.tSearch.close = function() {
    if (!window.tSearch.model.isMobile) {
      $("body").removeClass("topAutocompleteActive");
      $("#divAramaAlani").hide();
      $("#divAramaSonuc").hide();
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.clearSearchControl = function() {
    $("#txtbxArama").val("");
  };
  /**
   * @return {undefined}
   */
  window.tSearch.clearFocus = function() {
    $("#txtbxArama").blur();
  };
  /**
   * @return {undefined}
   */
  window.tSearch.setAutoComplate = function() {
    $(".ticimaxSearchInput").ticiAutoComplete(function() {
      var keyword = this.value;
      if (keyword.length >= 2) {
        window.tSearch.model.searchKeyword = keyword;
        window.tSearch.onSearch(keyword);
      } else {
        window.tSearch.close();
      }
    }, 1E3);
  };
  /**
   * @return {undefined}
   */
  window.tSearch.init = function() {
    window.tSearch.initTemplate();
    if (templateType == 0) {
      window.tSearch.v1.init();
    } else {
      if (templateType == 1) {
        window.tSearch.v2.init();
      } else {
        if (templateType == 2) {
          window.tSearch.v3.init();
        } else {
          if (templateType == 3) {
            window.tSearch.v4.init();
          }
        }
      }
    }
  };
  /**
   * @param {?} keyword
   * @return {undefined}
   */
  window.tSearch.onSearch = function(keyword) {
    ticimaxApi.product.search({
      Keyword : keyword
    }, function(dap) {
      var kbi;
      var l;
      /** @type {!Object} */
      window.tSearch.model.service = dap;
      window.tSearch.render();
      if (window.tSearch.model.isMobile) {
        /** @type {(Element|null)} */
        kbi = document.querySelector(".ticimax-search-content .ticimaxSearchInput");
        if (kbi) {
          l = kbi.value.length;
          kbi.focus();
          kbi.setSelectionRange(l, l);
        }
      }
    });
  };
  /**
   * @return {undefined}
   */
  window.tSearch.render = function() {
    if (templateType == 0) {
      window.tSearch.v1.render();
    } else {
      if (templateType == 1) {
        window.tSearch.v2.render();
      } else {
        if (templateType == 2) {
          window.tSearch.v3.render();
        } else {
          if (templateType == 3) {
            window.tSearch.v4.render();
          }
        }
      }
    }
  };
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  window.tSearch.clickSearchBox = function(event) {
    if (!(templateType != 0 || $(event.currentTarget).hasClass("searchInputTemplateV2"))) {
      if (window.tSearch.model.service.categories && window.tSearch.model.service.categories.length > 0 && $(".ticimaxSearchInput").val().length >= 2) {
        $("#divAramaAlani").show();
      }
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.initTemplate = function() {
    if (templateType == 0) {
      /** @type {string} */
      window.tSearch.template.content = document.getElementById("scriptSearchV1Content").innerHTML;
      /** @type {string} */
      window.tSearch.template.categoryProducts = document.getElementById("scriptSearchV1CategoryProducts").innerHTML;
      Handlebars.registerPartial("searchCategoryProducts", window.tSearch.template.categoryProducts);
    } else {
      if (templateType == 1) {
        /** @type {string} */
        window.tSearch.template.content = document.getElementById("scriptSearchV2Content").innerHTML;
        Handlebars.registerPartial("searchV2Products", document.getElementById("scriptSearchV2Products").innerHTML);
        Handlebars.registerPartial("searchV2Categories", document.getElementById("scriptSearchV2Categories").innerHTML);
        Handlebars.registerPartial("searchV2Others", document.getElementById("scriptSearchV2Other").innerHTML);
      } else {
        if (templateType == 2) {
          /** @type {string} */
          window.tSearch.template.content = document.getElementById("scriptSearchV3Content").innerHTML;
        } else {
          if (templateType == 3) {
            /** @type {string} */
            window.tSearch.template.content = document.getElementById("scriptSearchV4Content").innerHTML;
          }
        }
      }
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v1.init = function() {
  };
  /**
   * @param {?} switcherWindowId
   * @return {undefined}
   */
  window.tSearch.v1.initCategoryProduct = function(switcherWindowId) {
    var button2 = window.tSearch.model.service.categories.filter(function(currentWindow) {
      return currentWindow.id == switcherWindowId;
    })[0];
    var button = Handlebars.compile(window.tSearch.template.categoryProducts)(button2);
    $("#divSearchProducts").html(button);
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v1.render = function() {
    var t;
    var n;
    var formattedChosenQuestion;
    if (window.tSearch.model.service.categories.length <= 0) {
      n = $("#divAramaAlani");
      if (window.tSearch.model.isMobile) {
        n.find(".ticimax-search-sidebar").remove();
        n.find(".ticimax-search-products").remove();
        if (n.find(".noRecordsFound").length <= 0) {
          n.find(".isMobilInputContent").after('<div class="noRecordsFound">' + translateIt("Magazalarimiz_SonucBulunamadi") + "<div>");
        }
      } else {
        n.empty();
        n.hide();
      }
    } else {
      window.tSearch.v1.createElement();
      t = Handlebars.compile(tSearch.template.content)(window.tSearch.model);
      n = $("#divAramaAlani");
      if (window.tSearch.model.isMobile) {
        n.find(".noRecordsFound").remove();
        if (n.find(".quickSearchContent").length > 0) {
          formattedChosenQuestion = $("<div>" + t + "</div>").find(".quickSearchContent").html();
          n.find(".quickSearchContent").html(formattedChosenQuestion);
        } else {
          n.html(t);
          n.show();
        }
        window.tSearch.setAutoComplate();
        window.tSearch.clearFocus();
        $("body").addClass("topAutocompleteActive");
      } else {
        n.html(t);
        n.show();
        window.tSearch.setAutoComplate();
      }
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v1.createElement = function() {
    var tiltBar;
    if (document.getElementById("divAramaAlani") == null) {
      /** @type {!Element} */
      tiltBar = document.createElement("div");
      /** @type {string} */
      tiltBar.id = "divAramaAlani";
      tiltBar.classList.add("ticimax-search-content");
      document.body.appendChild(tiltBar);
    }
    /** @type {number} */
    var i = 800;
    var triggerEle = $("#txtbxArama");
    var me = $("#divAramaAlani");
    var aw = $(window).width();
    var position = $(triggerEle).offset();
    var windowheight = triggerEle.get(0).offsetHeight;
    var x = $("#divTopProductSearch").get(0).offsetWidth;
    if (me.css("top", 1 + (position.top + window.scrollY + windowheight)), position.left < i / 2) {
      me.css("left", position.left);
    } else {
      if (position.left + i + x > aw) {
        me.css("left", position.left + x - i);
      } else {
        /** @type {string} */
        var j = "center";
        var outLength = $(window).width();
        var width = $(triggerEle).parent().outerWidth();
        /** @type {number} */
        var offset = 800;
        var data = {
          right : position.left,
          center : position.left - offset / 2 + width / 2,
          left : position.left + width - offset
        };
        if ("right" == j) {
          if (data[j] + offset >= outLength) {
            /** @type {number} */
            data[j] = data.center;
          }
        } else {
          if ("left" == j && data[j] <= 0) {
            /** @type {number} */
            data[j] = data.center;
          }
        }
        if (data[j] == data.center && (data.center <= 0 || data.center + offset >= outLength)) {
          /** @type {number} */
          data[j] = outLength / 2 - offset / 2;
        }
        me.css("left", data[j]);
      }
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v1.close = function() {
    $("body").removeClass("topAutocompleteActive");
    var rebaseBtn = $("#divAramaAlani");
    if (window.tSearch.model.isMobile) {
      rebaseBtn.remove();
      window.tSearch.clearSearchControl();
    } else {
      rebaseBtn.hide();
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v2.init = function() {
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v2.render = function() {
    var bar;
    var fields;
    var i;
    var data;
    var formattedChosenQuestion;
    if (window.tSearch.model.service.products.length <= 0 && window.tSearch.model.service.categories.length <= 0 && window.tSearch.model.service.brands.length <= 0 && window.tSearch.model.service.suppliers.length <= 0 && window.tSearch.model.service.labels.length <= 0) {
      bar = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        bar.find(".ticimax-search-products").remove();
        if (bar.find(".noRecordsFound").length <= 0) {
          bar.find(".isMobilInputContent").after('<div class="noRecordsFound">' + translateIt("Magazalarimiz_SonucBulunamadi") + "<div>");
        }
      } else {
        bar.empty();
        bar.hide();
      }
    } else {
      window.tSearch.v2.createElement();
      /** @type {!Array} */
      window.tSearch.model.render = [];
      fields = siteSettings.siteYonetimAyar.generalSearch.structural.fields;
      /** @type {number} */
      i = 0;
      for (; i < fields.length; i++) {
        data = {
          type : fields[i].type,
          order : fields[i].settings.order
        };
        if (fields[i].type == 1 && window.tSearch.model.service.products.length > 0) {
          data.text = translateIt("Global_Urunler");
          data.data = window.tSearch.model.service.products;
        } else {
          if (fields[i].type == 2 && window.tSearch.model.service.categories.length > 0) {
            data.text = translateIt("Arama_IlgiliKategoriler");
            data.data = window.tSearch.model.service.categories;
          } else {
            if (fields[i].type == 3 && window.tSearch.model.service.brands.length > 0) {
              data.text = translateIt("Arama_IlgiliMarka");
              data.data = window.tSearch.model.service.brands;
            } else {
              if (fields[i].type == 4 && window.tSearch.model.service.labels.length > 0) {
                data.text = translateIt("Arama_IlgiliEtiketler");
                data.data = window.tSearch.model.service.labels;
              } else {
                if (fields[i].type == 5 && window.tSearch.model.service.suppliers.length > 0) {
                  data.text = translateIt("Arama_IlgiliTedarikciler");
                  data.data = window.tSearch.model.service.suppliers;
                }
              }
            }
          }
        }
        window.tSearch.model.render.push(data);
      }
      var settings = {
        searchKeyword : window.tSearch.model.searchKeyword,
        service : window.tSearch.model.render,
        isMobile : window.tSearch.model.isMobile
      };
      var data = Handlebars.compile(tSearch.template.content)(settings);
      bar = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        bar.find(".noRecordsFound").remove();
        if (bar.find(".quickSearchContent").length > 0) {
          formattedChosenQuestion = $("<div>" + data + "</div>").find(".quickSearchContent").html();
          bar.find(".quickSearchContent").html(formattedChosenQuestion);
        } else {
          bar.html(data);
        }
        bar.show();
        window.tSearch.clearFocus();
      } else {
        bar.html(data);
        bar.show();
      }
      window.tSearch.setAutoComplate();
      $("body").addClass("topAutocompleteActive");
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v2.createElement = function() {
    if (document.getElementById("divAramaSonuc") == null) {
      $("#divArama").append('<div id="divAramaSonuc" class="searchV2"></div>');
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v2.close = function() {
    $("body").removeClass("topAutocompleteActive");
    var error_element = $("#divAramaSonuc");
    error_element.html("");
    error_element.hide();
    window.tSearch.clearSearchControl();
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v3.init = function() {
    window.tSearch.v3.createElement();
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v3.render = function() {
    var t;
    var n;
    var formattedChosenQuestion;
    if (window.tSearch.model.service.products.length <= 0) {
      n = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        n.find(".products").remove();
        if (n.find(".noRecordsFound").length <= 0) {
          n.find(".isMobilInputContent").after('<div class="noRecordsFound">' + translateIt("Magazalarimiz_SonucBulunamadi") + "<div>");
        }
      } else {
        n.empty();
        n.hide();
      }
    } else {
      window.tSearch.v3.createElement();
      t = Handlebars.compile(tSearch.template.content)(window.tSearch.model);
      n = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        n.find(".noRecordsFound").remove();
        if (n.find(".quickSearchContent").length > 0) {
          formattedChosenQuestion = $("<div>" + t + "</div>").find(".quickSearchContent").html();
          n.find(".quickSearchContent").html(formattedChosenQuestion);
        } else {
          n.html(t);
          window.tSearch.setAutoComplate();
        }
        n.show();
        window.tSearch.clearFocus();
      } else {
        n.html(t);
        n.show();
      }
      window.tSearch.setAutoComplate();
    }
    $("body").addClass("topAutocompleteActive");
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v3.createElement = function() {
    if (document.getElementById("divAramaSonuc") == null) {
      $("#divArama").append('<div id="divAramaSonuc" class="searchV3"></div>');
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v3.close = function() {
    $("body").removeClass("topAutocompleteActive");
    var error_element = $("#divAramaSonuc");
    error_element.html("");
    error_element.hide();
    window.tSearch.clearSearchControl();
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v4.init = function() {
    window.tSearch.v4.createElement();
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v4.render = function() {
    var t;
    var n;
    var formattedChosenQuestion;
    if (window.tSearch.model.service.products.length <= 0) {
      n = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        n.find(".ticimax-search-products").remove();
        if (n.find(".noRecordsFound").length <= 0) {
          n.find(".isMobilInputContent").after('<div class="noRecordsFound">' + translateIt("Magazalarimiz_SonucBulunamadi") + "<div>");
        }
      } else {
        n.empty();
        n.hide();
      }
    } else {
      window.tSearch.v4.createElement();
      t = Handlebars.compile(tSearch.template.content)(window.tSearch.model);
      n = $("#divAramaSonuc");
      if (window.tSearch.model.isMobile) {
        n.find(".noRecordsFound").remove();
        if (n.find(".quickSearchContent").length > 0) {
          formattedChosenQuestion = $("<div>" + t + "</div>").find(".quickSearchContent").html();
          n.find(".quickSearchContent").html(formattedChosenQuestion);
        } else {
          n.html(t);
          window.tSearch.setAutoComplate();
        }
        n.show();
        window.tSearch.clearFocus();
      } else {
        n.html(t);
        n.show();
      }
      window.tSearch.setAutoComplate();
    }
    $("body").addClass("topAutocompleteActive");
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v4.createElement = function() {
    if (document.getElementById("divAramaSonuc") == null) {
      $("#divArama").append('<div id="divAramaSonuc" class="searchV4"></div>');
    }
  };
  /**
   * @return {undefined}
   */
  window.tSearch.v4.close = function() {
    $("body").removeClass("topAutocompleteActive");
    var error_element = $("#divAramaSonuc");
    error_element.html("");
    error_element.hide();
    window.tSearch.clearSearchControl();
  };
}
/**
 * @param {!Event} event
 * @return {?}
 */
window.tSearch.goToSearchPage = function(event) {
  return $("#txtbxArama").val($(event.target).val()), event.keyCode === 13 ? (OnSearchTopProduct(), false) : void 0;
};
