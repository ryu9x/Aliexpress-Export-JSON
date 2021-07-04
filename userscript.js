// ==UserScript==
// @name         Aliexpress-Export-JSON
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       You
// @match        https://www.aliexpress.com/item/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js
// @require https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// @resource bootstrap https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css
// @resource html      https://raw.githubusercontent.com/ryu9x/Aliexpress-Export-JSON/master/index.html
// @resource style     https://raw.githubusercontent.com/ryu9x/Aliexpress-Export-JSON/master/custom.css
// @grant        GM_addStyle
// @grant  GM_getResourceText

//
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.$;

    GM_addStyle(GM_getResourceText("bootstrap"));
    GM_addStyle(GM_getResourceText("style"));
    $("body").append(GM_getResourceText("html"));

    $(document).ready(function(){
        getData();
        $("#btnRefresh").click(function(){
            getData();
        })
        skuImage();
        $("#btnGetDescImage").click(function(){
            var img_url_list = "" ;
            $("#product-description img").each(function(){
                img_url_list += $(this).attr("src") +"\n";
            })
            $("#txt_descimage").val(img_url_list);
        })



    })

    function getData(){
        var id = unsafeWindow.runParams.data.actionModule.productId;
        var title = unsafeWindow.runParams.data.titleModule.subject;
        var url = unsafeWindow.runParams.data.pageModule.itemDetailUrl;
        var carrier = $(".product-shipping-info").text();
        var shippingfee = $(".product-shipping-price").text().match(/[\d]/g) == null ? "0" : $(".product-shipping-price").text().match(/[\d]/g).join("");
        var price = $(".product-price-value").first().text().match(/[\d]/g).join("");
        var tagid = "@"+(Math.random() + 1).toString(36).substr(2,6).toUpperCase();
        var excelData = tagid + "\t" + title + "\t" + id + "\t" + url + "\t" +carrier + "\t" + shippingfee + "\t" + price;
        $("#json-data-text").val(JSON.stringify(unsafeWindow.runParams.data));
        $("#excel-data-text").val(excelData);

    }
    function skuImage(){
        var img_url_list = "" ;
        unsafeWindow.runParams.data.skuModule.productSKUPropertyList[0].skuPropertyValues.forEach(function(data){
            img_url_list += $(data)[0].skuPropertyImagePath +"\n";
            $("#img_list_skuimage").append("<img src="+$(data)[0].skuPropertyImagePath+" widtht='50' height='50' />");
        })
        $("#txt_skuimage").val(img_url_list);

    }
})();