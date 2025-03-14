jQuery(function(e){if("undefined"==typeof wc_checkout_params)return!1;e.blockUI.defaults.overlayCSS.cursor="default";var t={updateTimer:!1,dirtyInput:!1,selectedPaymentMethod:!1,xhr:!1,$order_review:e("#order_review"),$checkout_form:e("form.checkout"),init:function(){e(document.body).on("update_checkout",this.update_checkout),e(document.body).on("init_checkout",this.init_checkout),this.$checkout_form.on("click",'input[name="payment_method"]',this.payment_method_selected),e(document.body).hasClass("woocommerce-order-pay")&&(this.$order_review.on("click",'input[name="payment_method"]',this.payment_method_selected),this.$order_review.on("submit",this.submitOrder),this.$order_review.attr("novalidate","novalidate")),this.$checkout_form.attr("novalidate","novalidate"),this.$checkout_form.on("submit",this.submit),this.$checkout_form.on("input validate change",".input-text, select, input:checkbox",this.validate_field),this.$checkout_form.on("update",this.trigger_update_checkout),this.$checkout_form.on("change",'select.shipping_method, input[name^="shipping_method"], #ship-to-different-address input, .update_totals_on_change select, .update_totals_on_change input[type="radio"], .update_totals_on_change input[type="checkbox"]',this.trigger_update_checkout),this.$checkout_form.on("change",".address-field select",this.input_changed),this.$checkout_form.on("change",".address-field input.input-text, .update_totals_on_change input.input-text",this.maybe_input_changed),this.$checkout_form.on("keydown",".address-field input.input-text, .update_totals_on_change input.input-text",this.queue_update_checkout),this.$checkout_form.on("change","#ship-to-different-address input",this.ship_to_different_address),this.$checkout_form.find("#ship-to-different-address input").trigger("change"),this.init_payment_methods(),"1"===wc_checkout_params.is_checkout&&e(document.body).trigger("init_checkout"),"yes"===wc_checkout_params.option_guest_checkout&&e("input#createaccount").on("change",this.toggle_create_account).trigger("change")},init_payment_methods:function(){var o=e(".woocommerce-checkout").find('input[name="payment_method"]');1===o.length&&o.eq(0).hide(),t.selectedPaymentMethod&&e("#"+t.selectedPaymentMethod).prop("checked",!0),0===o.filter(":checked").length&&o.eq(0).prop("checked",!0);var c=o.filter(":checked").eq(0).prop("id");o.length>1&&e('div.payment_box:not(".'+c+'")').filter(":visible").slideUp(0),o.filter(":checked").eq(0).trigger("click")},get_payment_method:function(){return t.$checkout_form.find('input[name="payment_method"]:checked').val()},payment_method_selected:function(o){if(o.stopPropagation(),e(".payment_methods input.input-radio").length>1){var c=e("div.payment_box."+e(this).attr("ID")),i=e(this).is(":checked");i&&!c.is(":visible")&&(e("div.payment_box").filter(":visible").slideUp(230),i&&c.slideDown(230))}else e("div.payment_box").show();e(this).data("order_button_text")?e("#place_order").text(e(this).data("order_button_text")):e("#place_order").text(e("#place_order").data("value"));var r=e('.woocommerce-checkout input[name="payment_method"]:checked').attr("id");r!==t.selectedPaymentMethod&&e(document.body).trigger("payment_method_selected"),t.selectedPaymentMethod=r},toggle_create_account:function(){e("div.create-account").hide(),e(this).is(":checked")&&(e("#account_password").val("").trigger("change"),e("div.create-account").slideDown())},init_checkout:function(){e(document.body).trigger("update_checkout")},maybe_input_changed:function(e){t.dirtyInput&&t.input_changed(e)},input_changed:function(e){t.dirtyInput=e.target,t.maybe_update_checkout()},queue_update_checkout:function(e){if(9===(e.keyCode||e.which||0))return!0;t.dirtyInput=this,t.reset_update_checkout_timer(),t.updateTimer=setTimeout(t.maybe_update_checkout,"1000")},trigger_update_checkout:function(o){t.reset_update_checkout_timer(),t.dirtyInput=!1,e(document.body).trigger("update_checkout",{current_target:o?o.currentTarget:null})},maybe_update_checkout:function(){var o=!0;if(e(t.dirtyInput).length){var c=e(t.dirtyInput).closest("div").find(".address-field.validate-required");c.length&&c.each(function(){""===e(this).find("input.input-text").val()&&(o=!1)})}o&&t.trigger_update_checkout()},ship_to_different_address:function(){e("div.shipping_address").hide(),e(this).is(":checked")&&e("div.shipping_address").slideDown()},reset_update_checkout_timer:function(){clearTimeout(t.updateTimer)},is_valid_json:function(e){try{var t=JSON.parse(e);return t&&"object"==typeof t}catch(o){return!1}},validate_field:function(t){var o=e(this),c=o.closest(".form-row"),i=!0,r=c.is(".validate-required"),n=c.is(".validate-email"),a=c.is(".validate-phone"),u="",d=t.type;"input"===d&&c.removeClass("woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone woocommerce-validated"),"validate"!==d&&"change"!==d||(r&&("checkbox"!==o.attr("type")||o.is(":checked")?""===o.val()&&(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-required-field"),i=!1):(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-required-field"),i=!1)),n&&o.val()&&((u=new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i)).test(o.val())||(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-email woocommerce-invalid-phone"),i=!1)),a&&(u=new RegExp(/[\s\#0-9_\-\+\/\(\)\.]/g),0<o.val().replace(u,"").length&&(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-phone"),i=!1)),i&&c.removeClass("woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone").addClass("woocommerce-validated"))},update_checkout:function(e,o){t.reset_update_checkout_timer(),t.updateTimer=setTimeout(t.update_checkout_action,"5",o)},update_checkout_action:function(o){if(t.xhr&&t.xhr.abort(),0!==e("form.checkout").length){o=void 0!==o?o:{update_shipping_method:!0};var c=e("#billing_country").val(),i=e("#billing_state").val(),r=e(":input#billing_postcode").val(),n=e("#billing_city").val(),a=e(":input#billing_address_1").val(),u=e(":input#billing_address_2").val(),d=c,s=i,m=r,l=n,h=a,p=u,_=e(t.$checkout_form).find(".address-field.validate-required:visible"),g=!0;_.length&&_.each(function(){""===e(this).find(":input").val()&&(g=!1)}),e("#ship-to-different-address").find("input").is(":checked")&&(d=e("#shipping_country").val(),s=e("#shipping_state").val(),m=e(":input#shipping_postcode").val(),l=e("#shipping_city").val(),h=e(":input#shipping_address_1").val(),p=e(":input#shipping_address_2").val());var f={security:wc_checkout_params.update_order_review_nonce,payment_method:t.get_payment_method(),country:c,state:i,postcode:r,city:n,address:a,address_2:u,s_country:d,s_state:s,s_postcode:m,s_city:l,s_address:h,s_address_2:p,has_full_address:g,post_data:e("form.checkout").serialize()};if(!1!==o.update_shipping_method){var v={};e('select.shipping_method, input[name^="shipping_method"][type="radio"]:checked, input[name^="shipping_method"][type="hidden"]').each(function(){v[e(this).data("index")]=e(this).val()}),f.shipping_method=v}e(".woocommerce-checkout-payment, .woocommerce-checkout-review-order-table").block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),t.xhr=e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","update_order_review"),data:f,success:function(c){if(c&&!0===c.reload)window.location.reload();else{e(".woocommerce-NoticeGroup-updateOrderReview").remove();var i=e("#terms").prop("checked"),r={};if(e(".payment_box :input").each(function(){var t=e(this).attr("id");t&&(-1!==e.inArray(e(this).attr("type"),["checkbox","radio"])?r[t]=e(this).prop("checked"):r[t]=e(this).val())}),c&&c.fragments&&(e.each(c.fragments,function(o,c){t.fragments&&t.fragments[o]===c||e(o).replaceWith(c),e(o).unblock()}),t.fragments=c.fragments),i&&e("#terms").prop("checked",!0),e.isEmptyObject(r)||e(".payment_box :input").each(function(){var t=e(this).attr("id");t&&(-1!==e.inArray(e(this).attr("type"),["checkbox","radio"])?e(this).prop("checked",r[t]).trigger("change"):-1!==e.inArray(e(this).attr("type"),["select"])?e(this).val(r[t]).trigger("change"):null!==e(this).val()&&0===e(this).val().length&&e(this).val(r[t]).trigger("change"))}),c&&"failure"===c.result){var n=e("form.checkout");e(".woocommerce-error, .woocommerce-message, .is-error, .is-success").remove(),c.messages?n.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-updateOrderReview">'+c.messages+"</div>"):n.prepend(c),n.find(".input-text, select, input:checkbox").trigger("validate").trigger("blur"),t.scroll_to_notices()}t.init_payment_methods(),c&&"success"===c.result&&o.current_target&&-1!==o.current_target.id.indexOf("shipping_method")&&document.getElementById(o.current_target.id).focus(),e(document.body).trigger("updated_checkout",[c])}}})}},handleUnloadEvent:function(e){return-1===navigator.userAgent.indexOf("MSIE")&&!document.documentMode||(e.preventDefault(),undefined)},attachUnloadEventsOnSubmit:function(){e(window).on("beforeunload",this.handleUnloadEvent)},detachUnloadEventsOnSubmit:function(){e(window).off("beforeunload",this.handleUnloadEvent)},blockOnSubmit:function(e){1!==e.data("blockUI.isBlocked")&&e.block({message:null,overlayCSS:{background:"#fff",opacity:.6}})},submitOrder:function(){t.blockOnSubmit(e(this))},submit:function(){t.reset_update_checkout_timer();var o=e(this);return!o.is(".processing")&&(!1!==o.triggerHandler("checkout_place_order",[t])&&!1!==o.triggerHandler("checkout_place_order_"+t.get_payment_method(),[t])&&(o.addClass("processing"),t.blockOnSubmit(o),t.attachUnloadEventsOnSubmit(),e.ajaxSetup({dataFilter:function(e,o){if("json"!==o)return e;if(t.is_valid_json(e))return e;var c=e.match(/{"result.*}/);return null===c?console.log("Unable to fix malformed JSON #1"):t.is_valid_json(c[0])?(console.log("Fixed malformed JSON. Original:"),console.log(e),e=c[0]):console.log("Unable to fix malformed JSON #2"),e}}),e.ajax({type:"POST",url:wc_checkout_params.checkout_url,data:o.serialize(),dataType:"json",success:function(c){t.detachUnloadEventsOnSubmit();try{if("success"!==c.result||!1===o.triggerHandler("checkout_place_order_success",[c,t]))throw"failure"===c.result?"Result failure":"Invalid response";-1===c.redirect.indexOf("https://")||-1===c.redirect.indexOf("http://")?window.location=c.redirect:window.location=decodeURI(c.redirect)}catch(i){if(!0===c.reload)return void window.location.reload();!0===c.refresh&&e(document.body).trigger("update_checkout"),c.messages?t.submit_error(c.messages):t.submit_error('<div class="woocommerce-error">'+wc_checkout_params.i18n_checkout_error+"</div>")}},error:function(e,o,c){t.detachUnloadEventsOnSubmit();var i=c;"object"==typeof wc_checkout_params&&null!==wc_checkout_params&&wc_checkout_params.hasOwnProperty("i18n_checkout_error")&&"string"==typeof wc_checkout_params.i18n_checkout_error&&""!==wc_checkout_params.i18n_checkout_error.trim()&&(i=wc_checkout_params.i18n_checkout_error),t.submit_error('<div class="woocommerce-error">'+i+"</div>")}})),!1)},submit_error:function(o){e(".woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message, .is-error, .is-success").remove(),t.$checkout_form.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">'+o+"</div>"),t.$checkout_form.removeClass("processing").unblock(),t.$checkout_form.find(".input-text, select, input:checkbox").trigger("validate").trigger("blur"),t.scroll_to_notices(),e(document.body).trigger("checkout_error",[o])},scroll_to_notices:function(){var t=e(".woocommerce-NoticeGroup-updateOrderReview, .woocommerce-NoticeGroup-checkout");t.length||(t=e("form.checkout")),e.scroll_to_notices(t)}},o={init:function(){e(document.body).on("click","a.showcoupon",this.show_coupon_form),e(document.body).on("click",".woocommerce-remove-coupon",this.remove_coupon),e("form.checkout_coupon").hide().on("submit",this.submit)},show_coupon_form:function(){return e(".checkout_coupon").slideToggle(400,function(){e(".checkout_coupon").find(":input:eq(0)").trigger("focus")}),!1},submit:function(){var o=e(this);if(o.is(".processing"))return!1;o.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}});var c={security:wc_checkout_params.apply_coupon_nonce,coupon_code:o.find('input[name="coupon_code"]').val(),billing_email:t.$checkout_form.find('input[name="billing_email"]').val()};return e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","apply_coupon"),data:c,success:function(t){e(".woocommerce-error, .woocommerce-message, .is-error, .is-success").remove(),o.removeClass("processing").unblock(),t&&(o.before(t),o.slideUp(),e(document.body).trigger("applied_coupon_in_checkout",[c.coupon_code]),e(document.body).trigger("update_checkout",{update_shipping_method:!1}))},dataType:"html"}),!1},remove_coupon:function(t){t.preventDefault();var o=e(this).parents(".woocommerce-checkout-review-order"),c=e(this).data("coupon");o.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}});var i={security:wc_checkout_params.remove_coupon_nonce,coupon:c};e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","remove_coupon"),data:i,success:function(t){e(".woocommerce-error, .woocommerce-message, .is-error, .is-success").remove(),o.removeClass("processing").unblock(),t&&(e("form.woocommerce-checkout").before(t),e(document.body).trigger("removed_coupon_in_checkout",[i.coupon]),e(document.body).trigger("update_checkout",{update_shipping_method:!1}),e("form.checkout_coupon").find('input[name="coupon_code"]').val(""))},error:function(e){wc_checkout_params.debug_mode&&console.log(e.responseText)},dataType:"html"})}},c={init:function(){e(document.body).on("click","a.showlogin",this.show_login_form)},show_login_form:function(){return e("form.login, form.woocommerce-form--login").slideToggle(),!1}},i={init:function(){e(document.body).on("click","a.woocommerce-terms-and-conditions-link",this.toggle_terms)},toggle_terms:function(){if(e(".woocommerce-terms-and-conditions").length)return e(".woocommerce-terms-and-conditions").slideToggle(function(){var t=e(".woocommerce-terms-and-conditions-link");e(".woocommerce-terms-and-conditions").is(":visible")?(t.addClass("woocommerce-terms-and-conditions-link--open"),t.removeClass("woocommerce-terms-and-conditions-link--closed")):(t.removeClass("woocommerce-terms-and-conditions-link--open"),t.addClass("woocommerce-terms-and-conditions-link--closed"))}),!1}};t.init(),o.init(),c.init(),i.init()});