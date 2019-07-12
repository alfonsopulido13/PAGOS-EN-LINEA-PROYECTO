"use strict";

function PaymentezForm(elem) {
    this.elem = jQuery(elem);
    const current_data = this.elem.children("div");
    this.cardType = "", this.numberBin = "", this.nip = "", this.USE_OTP = !1, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? this.USE_VIRTUAL_KEYBOARD = !1 : this.USE_VIRTUAL_KEYBOARD = !0, this.captureEmail = !!this.elem.data("capture-email") && this.elem.data("capture-email"), this.captureCellPhone = !!this.elem.data("capture-cellphone") && this.elem.data("capture-cellphone"), this.captureName = !!this.elem.data("capture-name") && this.elem.data("capture-name"), this.iconColour = !!this.elem.data("icon-colour") && this.elem.data("icon-colour"), this.EXPIRY_USE_DROPDOWNS = !!this.elem.data("use-dropdowns") && this.elem.data("use-dropdowns"), this.cvcLenght = 3, this.nipLenght = 4, this.initEmailInput(), this.initCellPhoneInput(), this.initNameInput(), this.initCardNumberInput(), this.initExpiryMonthInput(), this.initExpiryYearInput(), this.initCvcInput(), this.elem.empty(), this.setupEmailInput(), this.setupCellPhoneInput(), this.setupNameInput(), this.setupCardNumberInput(), this.setupExpiryInput(), this.setupCvcInput(), this.elem.append(current_data), this.iconColour && this.setIconColour(this.iconColour), this.refreshCreditCardType()
}

function Paymentez() {}! function($) {
    var methods = {
        init: function() {
            console.log("si entra")
            return this.data("paymentezform", new PaymentezForm(this)), this
        },
        card: function() {
            return this.data("paymentezform").getCard()
        },
        cardNumber: function() {
            return this.data("paymentezform").getCardNumber()
        },
        cardType: function() {
            return this.data("paymentezform").getCardType()
        },
        name: function() {
            return this.data("paymentezform").getName()
        },
        expiryMonth: function() {
            return this.data("paymentezform").getExpiryMonth()
        },
        expiryYear: function() {
            return this.data("paymentezform").getExpiryYear()
        },
        cvc: function() {
            return this.data("paymentezform").getCvc()
        },
        fiscalNumber: function() {
            return this.data("paymentezform").getFiscalNumber()
        },
        validationOption: function() {
            return this.data("paymentezform").getValidationOption()
        }
    };
    $.fn.PaymentezForm = function(methodOrOptions) {
        return methods[methodOrOptions] ? methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof methodOrOptions && methodOrOptions ? void $.error("Method " + methodOrOptions + " does not exist on jQuery.Paymentez") : methods.init.apply(this, arguments)
    }
}(jQuery), $(function() {
        $(".paymentez-form").not(".checkout").each(function(i, obj) {
            $(obj).PaymentezForm()
        })
    }), PaymentezForm.prototype.constructor = PaymentezForm, PaymentezForm.KEYS = {
        0: 48,
        9: 57,
        NUMPAD_0: 96,
        NUMPAD_9: 105,
        DELETE: 46,
        BACKSPACE: 8,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        HOME: 36,
        END: 35,
        TAB: 9,
        A: 65,
        X: 88,
        C: 67,
        V: 86
    }, PaymentezForm.prototype.creditCardNumberMask = "XXXX XXXX XXXX XXXX", PaymentezForm.prototype.cvcMask = "XXX", PaymentezForm.EXPIRY_MASK = "XX / XX", PaymentezForm.CREDIT_CARD_NUMBER_PLACEHOLDER = "NÃºmero de tarjeta", PaymentezForm.NAME_PLACEHOLDER = "Nombre del titular", PaymentezForm.EMAIL_PLACEHOLDER = "E-mail", PaymentezForm.CELLPHONE_PLACEHOLDER = "Celular", PaymentezForm.FISCAL_NUMBER_PLACEHOLDER = "Documento de IdentificaciÃ³n", PaymentezForm.EXPIRY_PLACEHOLDER = "MM / YY", PaymentezForm.EXPIRY_NUMBER_OF_YEARS = 10, PaymentezForm.AUTH_CVC = "AUTH_CVC", PaymentezForm.AUTH_NIP = "AUTH_NIP", PaymentezForm.AUTH_OTP = "AUTH_OTP", PaymentezForm.CVC_PLACEHOLDER = "CVC", PaymentezForm.NIP_PLACEHOLDER = "Clave Tuya", PaymentezForm.OTP_PLACEHOLDER_ADD = "No tengo o no recuerdo mi clave", PaymentezForm.OTP_PLACEHOLDER_CHECKOUT = "Continuar compra sin clave", PaymentezForm.OTP_EXPLICATION_ADD = "Escogiendo esta opciÃ³n se va a generar una Clave Temporal Ãºnica, con la que validarÃ¡s tu tarjeta. Haz clic en â€œGuardarâ€ para continuar con el proceso.", PaymentezForm.OTP_EXPLICATION_CHECKOUT = "Escogiendo esta opciÃ³n se va a generar una Clave Temporal Ãºnica, con la que validarÃ¡s tu compra.", PaymentezForm.CELLPHONE_SVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="17px" x="0px" y="0px" viewBox="0 0 27.442 27.442" style="enable-background:new 0 0 27.442 27.442;" xmlns:xlink="http://www.w3.org/1999/xlink"> <g> <path class="svg" d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z M19.995,21.1H7.448V3.373h12.547V21.1z"/> </g> </svg>', PaymentezForm.CREDIT_CARD_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <g> <path class="svg" d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"/> <rect class="svg" x="50.643" y="104.285" width="20.857" height="10.429"/> <rect class="svg" x="81.929" y="104.285" width="31.286" height="10.429"/> </g> </svg>', PaymentezForm.LOCK_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <path class="svg" d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"/></svg>', PaymentezForm.CALENDAR_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <path class="svg" d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"/> </svg>', PaymentezForm.USER_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <g> <path class="svg" d="M107.999,73c8.638,0,16.011-3.056,22.12-9.166c6.111-6.11,9.166-13.483,9.166-22.12c0-8.636-3.055-16.009-9.166-22.12c-6.11-6.11-13.484-9.165-22.12-9.165c-8.636,0-16.01,3.055-22.12,9.165c-6.111,6.111-9.166,13.484-9.166,22.12c0,8.637,3.055,16.01,9.166,22.12C91.99,69.944,99.363,73,107.999,73z"/> <path class="svg" d="M165.07,106.037c-0.191-2.743-0.571-5.703-1.141-8.881c-0.57-3.178-1.291-6.124-2.16-8.84c-0.869-2.715-2.037-5.363-3.504-7.943c-1.466-2.58-3.15-4.78-5.052-6.6s-4.223-3.272-6.965-4.358c-2.744-1.086-5.772-1.63-9.085-1.63c-0.489,0-1.63,0.584-3.422,1.752s-3.815,2.472-6.069,3.911c-2.254,1.438-5.188,2.743-8.799,3.909c-3.612,1.168-7.237,1.752-10.877,1.752c-3.639,0-7.264-0.584-10.876-1.752c-3.611-1.166-6.545-2.471-8.799-3.909c-2.254-1.439-4.277-2.743-6.069-3.911c-1.793-1.168-2.933-1.752-3.422-1.752c-3.313,0-6.341,0.544-9.084,1.63s-5.065,2.539-6.966,4.358c-1.901,1.82-3.585,4.02-5.051,6.6s-2.634,5.229-3.503,7.943c-0.869,2.716-1.589,5.662-2.159,8.84c-0.571,3.178-0.951,6.137-1.141,8.881c-0.19,2.744-0.285,5.554-0.285,8.433c0,6.517,1.983,11.664,5.948,15.439c3.965,3.774,9.234,5.661,15.806,5.661h71.208c6.572,0,11.84-1.887,15.806-5.661c3.966-3.775,5.948-8.921,5.948-15.439C165.357,111.591,165.262,108.78,165.07,106.037z"/> </g> </svg>', PaymentezForm.MAIL_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <path class="svg" d="M177.171,19.472c-2.553-2.553-5.622-3.829-9.206-3.829H48.036c-3.585,0-6.654,1.276-9.207,3.829C36.276,22.025,35,25.094,35,28.679v88.644c0,3.585,1.276,6.652,3.829,9.205c2.553,2.555,5.622,3.83,9.207,3.83h119.929c3.584,0,6.653-1.275,9.206-3.83c2.554-2.553,3.829-5.621,3.829-9.205V28.679C181,25.094,179.725,22.025,177.171,19.472zM170.57,117.321c0,0.706-0.258,1.317-0.774,1.833s-1.127,0.773-1.832,0.773H48.035c-0.706,0-1.317-0.257-1.833-0.773c-0.516-0.516-0.774-1.127-0.774-1.833V54.75c1.738,1.955,3.612,3.748,5.622,5.377c14.557,11.189,26.126,20.368,34.708,27.538c2.77,2.336,5.024,4.155,6.762,5.459s4.087,2.62,7.047,3.951s5.744,1.995,8.351,1.995H108h0.081c2.606,0,5.392-0.664,8.351-1.995c2.961-1.331,5.311-2.647,7.049-3.951c1.737-1.304,3.992-3.123,6.762-5.459c8.582-7.17,20.15-16.349,34.707-27.538c2.01-1.629,3.885-3.422,5.621-5.377V117.321z M170.57,30.797v0.896c0,3.204-1.262,6.776-3.787,10.713c-2.525,3.938-5.256,7.075-8.188,9.41c-10.484,8.257-21.373,16.865-32.672,25.827c-0.326,0.271-1.277,1.073-2.852,2.403c-1.574,1.331-2.824,2.351-3.748,3.056c-0.924,0.707-2.131,1.562-3.625,2.566s-2.865,1.752-4.114,2.24s-2.417,0.732-3.503,0.732H108h-0.082c-1.086,0-2.253-0.244-3.503-0.732c-1.249-0.488-2.621-1.236-4.114-2.24c-1.493-1.004-2.702-1.859-3.625-2.566c-0.923-0.705-2.173-1.725-3.748-3.056c-1.575-1.33-2.526-2.132-2.852-2.403c-11.297-8.962-22.187-17.57-32.67-25.827c-7.985-6.3-11.977-14.013-11.977-23.138c0-0.706,0.258-1.317,0.774-1.833c0.516-0.516,1.127-0.774,1.833-0.774h119.929c0.434,0.244,0.814,0.312,1.141,0.204c0.326-0.11,0.57,0.094,0.732,0.61c0.163,0.516,0.312,0.76,0.448,0.733c0.136-0.027,0.218,0.312,0.245,1.019c0.025,0.706,0.039,1.061,0.039,1.061V30.797z"/> </svg>', PaymentezForm.INFORMATION_SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"> <g> <path class="svg" d="M97.571,41.714h20.859c1.411,0,2.633-0.516,3.666-1.548c1.031-1.031,1.547-2.254,1.547-3.666V20.857c0-1.412-0.516-2.634-1.549-3.667c-1.031-1.031-2.254-1.548-3.666-1.548H97.571c-1.412,0-2.634,0.517-3.666,1.548c-1.032,1.032-1.548,2.255-1.548,3.667V36.5c0,1.412,0.516,2.635,1.548,3.666C94.937,41.198,96.159,41.714,97.571,41.714z"/><path class="svg" d="M132.523,111.048c-1.031-1.032-2.254-1.548-3.666-1.548h-5.215V62.571c0-1.412-0.516-2.634-1.547-3.666c-1.033-1.032-2.255-1.548-3.666-1.548H87.143c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666V73c0,1.412,0.516,2.635,1.548,3.666c1.032,1.032,2.254,1.548,3.666,1.548h5.215V109.5h-5.215c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666v10.429c0,1.412,0.516,2.635,1.548,3.668c1.032,1.03,2.254,1.547,3.666,1.547h41.714c1.412,0,2.634-0.517,3.666-1.547c1.031-1.033,1.547-2.256,1.547-3.668v-10.429C134.07,113.302,133.557,112.08,132.523,111.048z"/> </g> </svg>', PaymentezForm.keyCodeFromEvent = function(e) {
        return e.which || e.keyCode
    }, PaymentezForm.keyIsCommandFromEvent = function(e) {
        return e.ctrlKey || e.metaKey
    }, PaymentezForm.keyIsNumber = function(e) {
        return PaymentezForm.keyIsTopNumber(e) || PaymentezForm.keyIsKeypadNumber(e)
    }, PaymentezForm.keyIsTopNumber = function(e) {
        var keyCode = PaymentezForm.keyCodeFromEvent(e);
        return keyCode >= PaymentezForm.KEYS[0] && keyCode <= PaymentezForm.KEYS[9]
    }, PaymentezForm.keyIsKeypadNumber = function(e) {
        var keyCode = PaymentezForm.keyCodeFromEvent(e);
        return keyCode >= PaymentezForm.KEYS.NUMPAD_0 && keyCode <= PaymentezForm.KEYS.NUMPAD_9
    }, PaymentezForm.keyIsDelete = function(e) {
        return PaymentezForm.keyCodeFromEvent(e) == PaymentezForm.KEYS.DELETE
    }, PaymentezForm.keyIsBackspace = function(e) {
        return PaymentezForm.keyCodeFromEvent(e) == PaymentezForm.KEYS.BACKSPACE
    }, PaymentezForm.keyIsDeletion = function(e) {
        return PaymentezForm.keyIsDelete(e) || PaymentezForm.keyIsBackspace(e)
    }, PaymentezForm.keyIsArrow = function(e) {
        var keyCode = PaymentezForm.keyCodeFromEvent(e);
        return keyCode >= PaymentezForm.KEYS.ARROW_LEFT && keyCode <= PaymentezForm.KEYS.ARROW_DOWN
    }, PaymentezForm.keyIsNavigation = function(e) {
        var keyCode = PaymentezForm.keyCodeFromEvent(e);
        return keyCode == PaymentezForm.KEYS.HOME || keyCode == PaymentezForm.KEYS.END
    }, PaymentezForm.keyIsKeyboardCommand = function(e) {
        var keyCode = PaymentezForm.keyCodeFromEvent(e);
        return PaymentezForm.keyIsCommandFromEvent(e) && (keyCode == PaymentezForm.KEYS.A || keyCode == PaymentezForm.KEYS.X || keyCode == PaymentezForm.KEYS.C || keyCode == PaymentezForm.KEYS.V)
    }, PaymentezForm.keyIsTab = function(e) {
        return PaymentezForm.keyCodeFromEvent(e) == PaymentezForm.KEYS.TAB
    }, PaymentezForm.copyAllElementAttributes = function(source, destination) {
        $.each(source[0].attributes, function(idx, attr) {
            destination.attr(attr.nodeName, attr.nodeValue)
        })
    }, PaymentezForm.numbersOnlyString = function(string) {
        for (var numbersOnlyString = "", i = 0; i < string.length; i++) {
            var currentChar = string.charAt(i);
            !isNaN(parseInt(currentChar)) && (numbersOnlyString += currentChar)
        }
        return numbersOnlyString
    }, PaymentezForm.applyFormatMask = function(string, mask) {
        for (var formattedString = "", numberPos = 0, j = 0; j < mask.length; j++) {
            var currentMaskChar = mask[j];
            if ("X" == currentMaskChar) {
                if (!string.charAt(numberPos)) break;
                formattedString += string.charAt(numberPos), numberPos++
            } else formattedString += currentMaskChar
        }
        return formattedString
    }, PaymentezForm.prototype.cardTypeFromNumberBin = function(number) {
        var number_bin = number.replace(" ", "").substring(0, 6);
        number >= 6 && this.numberBin != number_bin && (this.numberBin = number_bin, Paymentez.getBinInformation(number_bin, this, this.successCallback, this.erroCallback))
    }, PaymentezForm.prototype.successCallback = function(objResponse, form) {
        form.cardType = objResponse.card_type, $(".card-type-icon").css("background", "url(" + objResponse.url_logo + ")"), form.creditCardNumberMask = objResponse.card_mask, form.cardNumberInput.attr("maxlength", objResponse.card_mask.length), form.setInstallmentsOptions(objResponse.installments_options), form.USE_OTP = objResponse.otp, "sx" == form.cardType || "vr" == form.cardType ? (form.removeTuyaChanges(), form.addFiscalNumber()) : "ex" == form.cardType || "ak" == form.cardType ? form.addTuyaChanges() : (form.removeTuyaChanges(), form.cvcLenght = objResponse.cvv_length, form.cvcInput.attr("maxlength", form.cvcLenght), form.cvcMask = "X".repeat(form.cvcLenght))
    }, PaymentezForm.prototype.erroCallback = function(objResponse) {}, PaymentezForm.prototype.setInstallmentsOptions = function(installments) {
        var selectInstallments = $(".installments");
        selectInstallments.empty(), $.each(installments, function(option, value) {
            selectInstallments.append($("<option></option>").attr("value", value).text(value))
        })
    }, PaymentezForm.caretStartPosition = function(element) {
        return "number" == typeof element.selectionStart && element.selectionStart
    }, PaymentezForm.caretEndPosition = function(element) {
        return "number" == typeof element.selectionEnd && element.selectionEnd
    }, PaymentezForm.setCaretPosition = function(element, caretPos) {
        if (null != element)
            if (element.createTextRange) {
                var range = element.createTextRange();
                range.move("character", caretPos), range.select()
            } else element.selectionStart ? (element.focus(), element.setSelectionRange(caretPos, caretPos)) : element.focus()
    }, PaymentezForm.normaliseCaretPosition = function(mask, caretPosition) {
        var numberPos = 0;
        if (caretPosition < 0 || caretPosition > mask.length) return 0;
        for (var i = 0; i < mask.length; i++) {
            if (i == caretPosition) return numberPos;
            "X" == mask[i] && numberPos++
        }
        return numberPos
    }, PaymentezForm.denormaliseCaretPosition = function(mask, caretPosition) {
        var numberPos = 0;
        if (caretPosition < 0 || caretPosition > mask.length) return 0;
        for (var i = 0; i < mask.length; i++) {
            if (numberPos == caretPosition) return i;
            "X" == mask[i] && numberPos++
        }
        return mask.length
    }, PaymentezForm.filterNumberOnlyKey = function(e) {
        var isNumber = PaymentezForm.keyIsNumber(e),
            isDeletion = PaymentezForm.keyIsDeletion(e),
            isArrow = PaymentezForm.keyIsArrow(e),
            isNavigation = PaymentezForm.keyIsNavigation(e),
            isKeyboardCommand = PaymentezForm.keyIsKeyboardCommand(e),
            isTab = PaymentezForm.keyIsTab(e);
        isNumber || isDeletion || isArrow || isNavigation || isKeyboardCommand || isTab || e.preventDefault()
    }, PaymentezForm.digitFromKeyCode = function(keyCode) {
        return keyCode >= PaymentezForm.KEYS[0] && keyCode <= PaymentezForm.KEYS[9] ? keyCode - PaymentezForm.KEYS[0] : keyCode >= PaymentezForm.KEYS.NUMPAD_0 && keyCode <= PaymentezForm.KEYS.NUMPAD_9 ? keyCode - PaymentezForm.KEYS.NUMPAD_0 : null
    }, PaymentezForm.handleMaskedNumberInputKey = function(e, mask) {
        PaymentezForm.filterNumberOnlyKey(e);
        var keyCode = e.which || e.keyCode,
            element = e.target,
            caretStart = PaymentezForm.caretStartPosition(element),
            caretEnd = PaymentezForm.caretEndPosition(element),
            normalisedStartCaretPosition = PaymentezForm.normaliseCaretPosition(mask, caretStart),
            normalisedEndCaretPosition = PaymentezForm.normaliseCaretPosition(mask, caretEnd),
            newCaretPosition = caretStart,
            isNumber = PaymentezForm.keyIsNumber(e),
            isDelete = PaymentezForm.keyIsDelete(e),
            isBackspace = PaymentezForm.keyIsBackspace(e);
        if (isNumber || isDelete || isBackspace) {
            e.preventDefault();
            var rawText = $(element).val(),
                numbersOnly = PaymentezForm.numbersOnlyString(rawText),
                digit = PaymentezForm.digitFromKeyCode(keyCode),
                rangeHighlighted = normalisedEndCaretPosition > normalisedStartCaretPosition;
            rangeHighlighted && (numbersOnly = numbersOnly.slice(0, normalisedStartCaretPosition) + numbersOnly.slice(normalisedEndCaretPosition)), caretStart != mask.length && (isNumber && rawText.length <= mask.length && (numbersOnly = numbersOnly.slice(0, normalisedStartCaretPosition) + digit + numbersOnly.slice(normalisedStartCaretPosition), newCaretPosition = Math.max(PaymentezForm.denormaliseCaretPosition(mask, normalisedStartCaretPosition + 1), PaymentezForm.denormaliseCaretPosition(mask, normalisedStartCaretPosition + 2) - 1)), isDelete && (numbersOnly = numbersOnly.slice(0, normalisedStartCaretPosition) + numbersOnly.slice(normalisedStartCaretPosition + 1))), 0 != caretStart && isBackspace && !rangeHighlighted && (numbersOnly = numbersOnly.slice(0, normalisedStartCaretPosition - 1) + numbersOnly.slice(normalisedStartCaretPosition), newCaretPosition = PaymentezForm.denormaliseCaretPosition(mask, normalisedStartCaretPosition - 1)), $(element).val(PaymentezForm.applyFormatMask(numbersOnly, mask)), PaymentezForm.setCaretPosition(element, newCaretPosition)
        }
    }, PaymentezForm.handleCreditCardNumberKey = function(e, cardMask) {
        PaymentezForm.handleMaskedNumberInputKey(e, cardMask)
    }, PaymentezForm.handleCreditCardNumberChange = function(e) {}, PaymentezForm.handleExpiryKey = function(e) {
        PaymentezForm.handleMaskedNumberInputKey(e, PaymentezForm.EXPIRY_MASK)
    }, PaymentezForm.generateRandoms = function() {
        var i, j, k, myArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (i = myArray.length; i; i--) j = Math.floor(Math.random() * i), k = myArray[i - 1], myArray[i - 1] = myArray[j], myArray[j] = k;
        return myArray
    }, PaymentezForm.prototype.getCardNumber = function() {
        return this.cardNumberInput.val()
    }, PaymentezForm.prototype.isValidData = function() {
        var is_date_valid = this.refreshExpiryMonthValidation(),
            is_cvc_valid = this.refreshCvcValidation(),
            is_card_holder_valid = this.refreshCardHolderNameValidation(),
            is_email_valid = this.refreshEmailValidation(),
            is_cellphone_valid = this.refreshCellPhoneValidation(),
            is_card_number_valid = this.refreshCardNumberValidation(),
            is_fiscal_number_valid = this.refreshFiscalNumberValidation(),
            is_nip_valid = this.refreshNipValidation();
        return is_date_valid && is_cvc_valid && is_card_holder_valid && is_card_number_valid && is_email_valid && is_cellphone_valid && is_fiscal_number_valid && is_nip_valid
    }, PaymentezForm.prototype.refreshCvcValidation = function() {
        return this.isCvcValid() ? (this.cvcInput.parent().removeClass("has-error"), !0) : (this.cvcInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshCardHolderNameValidation = function() {
        return this.isCardHolderNameValid() ? (this.nameInput.parent().removeClass("has-error"), !0) : (this.nameInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshEmailValidation = function() {
        return this.isEmailValid() ? (this.emailInput.parent().removeClass("has-error"), !0) : (this.emailInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshCellPhoneValidation = function() {
        return this.isCellPhoneValid() ? (this.cellPhoneInput.parent().removeClass("has-error"), !0) : (this.cellPhoneInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshCardNumberValidation = function() {
        return this.isCardNumberValid() ? (this.cardNumberInput.parent().removeClass("has-error"), !0) : (this.cardNumberInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshFiscalNumberValidation = function() {
        return this.fiscalNumberAdded() && this.isFiscalNumberValid() ? (this.fiscalNumberInput.parent().removeClass("has-error"), !0) : !(this.fiscalNumberAdded() && !this.isFiscalNumberValid()) || (this.fiscalNumberInput.parent().addClass("has-error"), !1)
    }, PaymentezForm.prototype.refreshNipValidation = function() {
        return !this.nipWrapperAdded() || (this.isNipValid() ? (this.nipInput.parent().removeClass("has-error"), !0) : (this.nipInput.parent().addClass("has-error"), !1))
    }, PaymentezForm.prototype.refreshValidationOption = function() {
        this.getValidationOption() == PaymentezForm.AUTH_OTP ? (this.addValidationMessage(), this.removeNip(), this.removeVirtualKeyboard()) : this.getValidationOption() == PaymentezForm.AUTH_NIP && (this.removeValidationMessage(), this.addNip())
    }, PaymentezForm.prototype.addValueToNip = function(value, key) {
        if (this.nipWrapperAdded() && this.nipInput.val().length < this.nipLenght) {
            var newValue = this.nipInput.val() + value;
            this.nipInput.val(newValue);
            var newNip = this.nip + key;
            this.nip = newNip
        }
    }, PaymentezForm.prototype.cleanNipInput = function() {
        this.nipWrapperAdded() && this.nipInput.val(""), this.nip = ""
    }, PaymentezForm.prototype.isCvcValid = function() {
        return this.getValidationOption() != PaymentezForm.AUTH_CVC || null != this.getCvc() && this.getCvc().trim().length == this.cvcLenght
    }, PaymentezForm.prototype.isCardHolderNameValid = function() {
        return !this.captureName || null != this.getName() && this.getName().length >= 5
    }, PaymentezForm.prototype.isEmailValid = function() {
        if (this.captureEmail) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return null != this.getEmail() && this.getEmail().length >= 5 && re.test(this.getEmail())
        }
        return !0
    }, PaymentezForm.prototype.isCellPhoneValid = function() {
        return !this.captureCellPhone || null != this.getCellPhone() && this.getCellPhone().length >= 5
    }, PaymentezForm.prototype.isCardNumberValid = function() {
        var value = this.getCardNumber(),
            type = this.cardType;
        if ("ex" == type || "ak" == type) return !0;
        if ("" == value) return !1;
        if (/[^0-9-\s]+/.test(value)) return !1;
        var nCheck = 0,
            nDigit = 0,
            bEven = !1;
        value = value.replace(/\D/g, "");
        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);
            bEven && (nDigit *= 2) > 9 && (nDigit -= 9), nCheck += nDigit, bEven = !bEven
        }
        return nCheck % 10 == 0
    }, PaymentezForm.prototype.isNipValid = function() {
        return this.getValidationOption() != PaymentezForm.AUTH_NIP || null != this.getNip() && this.getNip().trim().length == this.nipLenght
    }, PaymentezForm.prototype.isFiscalNumberValid = function() {
        return !this.fiscalNumberAdded() || null != this.getFiscalNumber() && this.getFiscalNumber().length >= 6
    }, PaymentezForm.prototype.fiscalNumberAdded = function() {
        return this.elem.find(".fiscal-number-wrapper").length >= 1
    }, PaymentezForm.prototype.expiryContainerAdded = function() {
        return this.elem.find(".expiry-container").length >= 1
    }, PaymentezForm.prototype.cvcContainerAdded = function() {
        return this.elem.find(".cvc-container").length >= 1
    }, PaymentezForm.prototype.nipWrapperAdded = function() {
        return this.elem.find(".nip-wrapper").length >= 1
    }, PaymentezForm.prototype.otpWrapperAdded = function() {
        return this.elem.find(".otp-wrapper").length >= 1
    }, PaymentezForm.prototype.validationMessageAdded = function() {
        return this.elem.find(".validation-message").length >= 1
    }, PaymentezForm.prototype.virtualKeyboardAdded = function() {
        return this.elem.find(".keyboard-wrapper").length >= 1
    }, PaymentezForm.prototype.getCard = function() {
        var data = null;
        if (this.isValidData()) {
            var today = new Date,
                currentYear = (today.getMonth(), "" + today.getFullYear()),
                year = this.getExpiryYear();
            2 == ("" + year).length && (year = currentYear.substring(0, 2) + "" + this.getExpiryYear()), data = {
                card: {
                    number: this.getCardNumber().split(" ").join(""),
                    holder_name: this.getName(),
                    expiry_year: Number(year),
                    expiry_month: Number(this.getExpiryMonth()),
                    type: this.cardType,
                    cvc: this.getCvc(),
                    nip: this.getNip(),
                    card_auth: this.getValidationOption()
                }
            }
        }
        return data
    }, PaymentezForm.prototype.getCardType = function() {
        return PaymentezForm.cardTypeFromNumber(this.getCardNumber())
    }, PaymentezForm.prototype.getName = function() {
        return this.nameInput.val()
    }, PaymentezForm.prototype.getEmail = function() {
        return this.emailInput.val()
    }, PaymentezForm.prototype.getCellPhone = function() {
        return this.cellPhoneInput.val()
    }, PaymentezForm.prototype.getExpiryMonth = function() {
        return this.expiryMonthInput.val()
    }, PaymentezForm.prototype.getExpiryYear = function() {
        return this.expiryYearInput.val()
    }, PaymentezForm.prototype.getFiscalNumber = function() {
        return this.fiscalNumberAdded() ? this.fiscalNumberInput.val() : ""
    }, PaymentezForm.prototype.getValidationOption = function() {
        PaymentezForm.AUTH_CVC;
        return "ex" == this.cardType || "ak" == this.cardType ? this.USE_OTP && this.otpValidation.is(":checked") ? PaymentezForm.AUTH_OTP : PaymentezForm.AUTH_NIP : PaymentezForm.AUTH_CVC
    }, PaymentezForm.prototype.getCvc = function() {
        return this.getValidationOption() == PaymentezForm.AUTH_CVC ? this.cvcInput.val() : ""
    }, PaymentezForm.prototype.getNip = function() {
        return this.getValidationOption() == PaymentezForm.AUTH_NIP ? (this.nipWrapperAdded() && !this.USE_VIRTUAL_KEYBOARD && (this.nip = this.nipInput.val()), this.nip) : ""
    }, PaymentezForm.prototype.setIconColour = function(colour) {
        this.elem.find(".icon .svg").css({
            fill: colour
        })
    }, PaymentezForm.prototype.refreshCreditCardType = function() {
        var number = PaymentezForm.numbersOnlyString(this.getCardNumber());
        number.length >= 6 && this.cardTypeFromNumberBin(number)
    }, PaymentezForm.prototype.refreshCreditCardNumberFormat = function() {
        var numbersOnly = PaymentezForm.numbersOnlyString($(this.cardNumberInput).val()),
            formattedNumber = PaymentezForm.applyFormatMask(numbersOnly, this.creditCardNumberMask);
        $(this.cardNumberInput).val(formattedNumber)
    }, PaymentezForm.prototype.refreshExpiryMonthYearInput = function() {
        var numbersOnly = PaymentezForm.numbersOnlyString($(this.expiryMonthYearInput).val()),
            formattedNumber = PaymentezForm.applyFormatMask(numbersOnly, PaymentezForm.EXPIRY_MASK);
        $(this.expiryMonthYearInput).val(formattedNumber)
    }, PaymentezForm.prototype.refreshCvc = function() {
        var numbersOnly = PaymentezForm.numbersOnlyString($(this.cvcInput).val()),
            formattedNumber = PaymentezForm.applyFormatMask(numbersOnly, this.creditCardNumberMask);
        $(this.cvcInput).val(formattedNumber)
    }, PaymentezForm.prototype.refreshNip = function() {
        var numbersOnly = PaymentezForm.numbersOnlyString($(this.nipInput).val()),
            formattedNumber = PaymentezForm.applyFormatMask(numbersOnly, this.creditCardNumberMask);
        $(this.nipInput).val(formattedNumber)
    }, PaymentezForm.prototype.addFiscalNumber = function() {
        this.fiscalNumberAdded() || (this.initFiscalNumberInput(), this.setupFiscalNumberInput(), this.setIconColour(this.iconColour))
    }, PaymentezForm.prototype.removeFiscalNumber = function() {
        this.fiscalNumberAdded() && this.elem.find(".fiscal-number-wrapper").remove()
    }, PaymentezForm.prototype.addExpiryContainer = function() {
        this.expiryContainerAdded() || (this.initExpiryMonthInput(), this.initExpiryYearInput(), this.setupExpiryInput(), this.setIconColour(this.iconColour))
    }, PaymentezForm.prototype.removeExpiryContainer = function() {
        this.expiryContainerAdded() && this.elem.find(".expiry-container").remove()
    }, PaymentezForm.prototype.addCvcContainer = function() {
        this.cvcContainerAdded() || (this.initCvcInput(), this.setupCvcInput(), this.setIconColour(this.iconColour))
    }, PaymentezForm.prototype.removeCvcContainer = function() {
        this.cvcContainerAdded() && this.elem.find(".cvc-container").remove()
    }, PaymentezForm.prototype.addNip = function() {
        this.otpWrapperAdded() ? this.getValidationOption() != PaymentezForm.AUTH_NIP || this.nipWrapperAdded() || (this.initNipInput(), this.setupNipInput(), this.setIconColour(this.iconColour)) : this.nipWrapperAdded() || (this.initNipInput(), this.setupNipInput(), this.setIconColour(this.iconColour))
    }, PaymentezForm.prototype.removeNip = function() {
        this.nipWrapperAdded() && this.elem.find(".nip-wrapper").remove()
    }, PaymentezForm.prototype.addOtpValidation = function() {
        !this.otpWrapperAdded() && this.USE_OTP && (this.initOtpValidation(), this.setupOtpValidation())
    }, PaymentezForm.prototype.removeOtpValidation = function() {
        this.otpWrapperAdded() && this.elem.find(".otp-wrapper").remove()
    }, PaymentezForm.prototype.addVirtualKeyboard = function() {
        this.virtualKeyboardAdded() || this.getValidationOption() != PaymentezForm.AUTH_NIP || this.setupVirtualKeyboard()
    }, PaymentezForm.prototype.removeVirtualKeyboard = function() {
        this.virtualKeyboardAdded() && this.elem.find(".keyboard-wrapper").remove()
    }, PaymentezForm.prototype.addValidationMessage = function() {
        this.validationMessageAdded() || this.setupValidationMessage()
    }, PaymentezForm.prototype.removeValidationMessage = function() {
        this.validationMessageAdded() && this.elem.find(".validation-message").remove()
    }, PaymentezForm.prototype.addTuyaChanges = function() {
        this.addFiscalNumber(), this.addNip(), this.addOtpValidation(), this.removeExpiryContainer(), this.removeCvcContainer()
    }, PaymentezForm.prototype.removeTuyaChanges = function() {
        this.addExpiryContainer(), this.addCvcContainer(), this.removeFiscalNumber(), this.removeNip(), this.removeOtpValidation(), this.removeVirtualKeyboard(), this.removeValidationMessage()
    }, PaymentezForm.prototype.initCardNumberInput = function() {
        this.cardNumberInput = PaymentezForm.detachOrCreateElement(this.elem, ".card-number", "<input class='card-number' />"), PaymentezForm.elementHasAttribute(this.cardNumberInput, "name") || this.cardNumberInput.attr("name", "card-number"), PaymentezForm.elementHasAttribute(this.cardNumberInput, "placeholder") || this.cardNumberInput.attr("placeholder", PaymentezForm.CREDIT_CARD_NUMBER_PLACEHOLDER), this.cardNumberInput.attr("type", "tel"), this.cardNumberInput.attr("maxlength", this.creditCardNumberMask.length), this.cardNumberInput.attr("x-autocompletetype", "cc-number"), this.cardNumberInput.attr("autocompletetype", "cc-number"), this.cardNumberInput.attr("autocorrect", "off"), this.cardNumberInput.attr("spellcheck", "off"), this.cardNumberInput.attr("autocapitalize", "off")
    }, PaymentezForm.prototype.initNameInput = function() {
        this.captureName || (this.captureName = null != this.elem.find(".name")[0]), this.nameInput = PaymentezForm.detachOrCreateElement(this.elem, ".name", "<input class='name' />"), PaymentezForm.elementHasAttribute(this.nameInput, "name") || this.nameInput.attr("name", "card-holder"), PaymentezForm.elementHasAttribute(this.nameInput, "placeholder") || this.nameInput.attr("placeholder", PaymentezForm.NAME_PLACEHOLDER)
    }, PaymentezForm.prototype.initEmailInput = function() {
        this.captureEmail || (this.captureEmail = null != this.elem.find(".email")[0]), this.emailInput = PaymentezForm.detachOrCreateElement(this.elem, ".email", "<input class='email' />"), PaymentezForm.elementHasAttribute(this.emailInput, "name") || this.emailInput.attr("name", "email"), PaymentezForm.elementHasAttribute(this.emailInput, "placeholder") || this.emailInput.attr("placeholder", PaymentezForm.EMAIL_PLACEHOLDER), this.emailInput.attr("type", "email"), this.emailInput.attr("autocorrect", "off"), this.emailInput.attr("spellcheck", "off"), this.emailInput.attr("autocapitalize", "off")
    }, PaymentezForm.prototype.initCellPhoneInput = function() {
        this.captureCellPhone || (this.captureCellPhone = null != this.elem.find(".cellphone")[0]), this.cellPhoneInput = PaymentezForm.detachOrCreateElement(this.elem, ".cellphone", "<input class='cellphone' />"), PaymentezForm.elementHasAttribute(this.cellPhoneInput, "name") || this.cellPhoneInput.attr("name", "cellphone"), PaymentezForm.elementHasAttribute(this.cellPhoneInput, "placeholder") || this.cellPhoneInput.attr("placeholder", PaymentezForm.CELLPHONE_PLACEHOLDER), this.cellPhoneInput.attr("type", "tel"), this.cellPhoneInput.attr("autocorrect", "off"), this.cellPhoneInput.attr("spellcheck", "off"), this.cellPhoneInput.attr("autocapitalize", "off")
    }, PaymentezForm.prototype.initExpiryMonthInput = function() {
        this.expiryMonthInput = PaymentezForm.detachOrCreateElement(this.elem, ".expiry-month", "<input class='expiry-month' />")
    }, PaymentezForm.prototype.initExpiryYearInput = function() {
        this.expiryYearInput = PaymentezForm.detachOrCreateElement(this.elem, ".expiry-year", "<input class='expiry-year' />")
    }, PaymentezForm.prototype.initCvcInput = function() {
        this.cvcInput = PaymentezForm.detachOrCreateElement(this.elem, ".cvc", "<input class='cvc' />"), PaymentezForm.elementHasAttribute(this.cvcInput, "placeholder") || this.cvcInput.attr("placeholder", PaymentezForm.CVC_PLACEHOLDER), this.cvcInput.attr("type", "tel"), this.cvcInput.attr("maxlength", this.cvcLenght), this.cvcInput.attr("x-autocompletetype", "cc-csc"), this.cvcInput.attr("autocompletetype", "cc-csc"), this.cvcInput.attr("autocorrect", "off"), this.cvcInput.attr("spellcheck", "off"), this.cvcInput.attr("autocapitalize", "off")
    }, PaymentezForm.prototype.initFiscalNumberInput = function() {
        this.fiscalNumberInput = PaymentezForm.detachOrCreateElement(this.elem, ".fiscal-number", "<input class='fiscal-number' />"), PaymentezForm.elementHasAttribute(this.fiscalNumberInput, "name") || this.fiscalNumberInput.attr("name", "fiscal-number"), PaymentezForm.elementHasAttribute(this.fiscalNumberInput, "placeholder") || this.fiscalNumberInput.attr("placeholder", PaymentezForm.FISCAL_NUMBER_PLACEHOLDER), this.fiscalNumberInput.attr("type", "tel"), this.fiscalNumberInput.attr("pattern", "[0-9]*"), this.fiscalNumberInput.attr("inputmode", "numeric"), this.fiscalNumberInput.attr("x-autocompletetype", "cc-csc"), this.fiscalNumberInput.attr("autocompletetype", "cc-csc"), this.fiscalNumberInput.attr("autocorrect", "off"), this.fiscalNumberInput.attr("spellcheck", "off"), this.fiscalNumberInput.attr("autocapitalize", "off")
    }, PaymentezForm.prototype.initNipInput = function() {
        this.nipInput = PaymentezForm.detachOrCreateElement(this.elem, ".nip", "<input class='nip' />"), PaymentezForm.elementHasAttribute(this.nipInput, "placeholder") || this.nipInput.attr("placeholder", PaymentezForm.NIP_PLACEHOLDER), this.nipInput.attr("type", "tel"), this.nipInput.attr("pattern", "[0-9]*"), this.nipInput.attr("inputmode", "numeric"), this.nipInput.attr("maxlength", this.nipLenght), this.nipInput.attr("x-autocompletetype", "cc-csc"), this.nipInput.attr("autocompletetype", "cc-csc"), this.nipInput.attr("autocorrect", "off"), this.nipInput.attr("spellcheck", "off"), this.nipInput.attr("autocapitalize", "off"), this.USE_VIRTUAL_KEYBOARD && this.nipInput.attr("disabled", "disabled")
    }, PaymentezForm.prototype.initOtpValidation = function() {
        this.otpValidation = PaymentezForm.detachOrCreateElement(this.elem, ".otp", "<input class='otp' />"), this.otpValidation.attr("type", "checkbox"), this.otpValidation.attr("id", "otp-option")
    }, PaymentezForm.prototype.setupCardNumberInput = function() {
        this.elem.append("<div class='card-number-wrapper'></div>");
        var wrapper = this.elem.find(".card-number-wrapper");
        wrapper.append(this.cardNumberInput), wrapper.append("<div class='card-type-icon'></div>"), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.CREDIT_CARD_SVG);
        var $this = this;
        this.cardNumberInput.keydown(function(e) {
            PaymentezForm.handleCreditCardNumberKey(e, $this.creditCardNumberMask)
        }), this.cardNumberInput.keyup(function() {
            $this.refreshCreditCardType()
        }), this.cardNumberInput.on("paste", function() {
            setTimeout(function() {
                $this.refreshCreditCardNumberFormat(), $this.refreshCreditCardType()
            }, 1)
        }), this.cardNumberInput.blur(function() {
            $this.refreshCardNumberValidation()
        })
    }, PaymentezForm.prototype.setupNameInput = function() {
        if (this.captureName) {
            this.elem.append("<div class='name-wrapper'></div>");
            var wrapper = this.elem.find(".name-wrapper");
            wrapper.append(this.nameInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.USER_SVG);
            var $this = this;
            this.nameInput.blur(function() {
                $this.refreshCardHolderNameValidation()
            })
        }
    }, PaymentezForm.prototype.setupEmailInput = function() {
        if (this.captureEmail) {
            this.elem.append("<div class='email-container'><div class='email-wrapper'></div></div>");
            var wrapper = this.elem.find(".email-wrapper");
            wrapper.append(this.emailInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.MAIL_SVG);
            var $this = this;
            this.emailInput.blur(function() {
                $this.refreshEmailValidation()
            })
        }
    }, PaymentezForm.prototype.setupCellPhoneInput = function() {
        if (this.captureCellPhone) {
            this.elem.append("<div class='cellphone-container'><div class='cellphone-wrapper'></div></div>");
            var wrapper = this.elem.find(".cellphone-wrapper");
            wrapper.append(this.cellPhoneInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.CELLPHONE_SVG);
            var $this = this;
            this.cellPhoneInput.blur(function() {
                $this.refreshCellPhoneValidation()
            })
        }
    }, PaymentezForm.prototype.setupExpiryInput = function() {
        this.elem.append("<div class='expiry-container'><div class='expiry-wrapper'></div></div>");
        var expiryInput, wrapper = this.elem.find(".expiry-wrapper");
        if (this.EXPIRY_USE_DROPDOWNS) {
            expiryInput = $("<div></div>");
            var expiryMonthNew = $("<select><option value='any' selected='' hidden=''>MM</option><option value='1'>01</option><option value='2'>02</option><option value='3'>03</option><option value='4'>04</option><option value='5'>05</option><option value='6'>06</option><option value='7'>07</option><option value='8'>08</option><option value='9'>09</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select>"),
                expiryMonthOld = this.expiryMonthInput;
            PaymentezForm.copyAllElementAttributes(expiryMonthOld, expiryMonthNew), this.expiryMonthInput.remove(), this.expiryMonthInput = expiryMonthNew;
            for (var expiryYearNew = $("<select><option value='any' selected='' hidden=''>YY</option></select>"), currentYear = parseInt((new Date).getFullYear().toString().substring(2, 4)), i = 0; i < PaymentezForm.EXPIRY_NUMBER_OF_YEARS; i++) expiryYearNew.append("<option value='" + currentYear + "'>" + currentYear + "</option>"), currentYear = (currentYear + 1) % 100;
            var expiryYearOld = this.expiryYearInput;
            PaymentezForm.copyAllElementAttributes(expiryYearOld, expiryYearNew), this.expiryYearInput.remove(), this.expiryYearInput = expiryYearNew, expiryInput.append(this.expiryMonthInput), expiryInput.append(this.expiryYearInput)
        } else {
            expiryInput = $("<div></div>"), "hidden" != this.expiryMonthInput.attr("type") && this.expiryMonthInput.attr("type", "hidden"), "hidden" != this.expiryYearInput.attr("type") && this.expiryYearInput.attr("type", "hidden"), this.expiryMonthYearInput = PaymentezForm.detachOrCreateElement(this.elem, ".expiry", "<input class='expiry' />"), PaymentezForm.elementHasAttribute(this.expiryMonthYearInput, "placeholder") || this.expiryMonthYearInput.attr("placeholder", PaymentezForm.EXPIRY_PLACEHOLDER), this.expiryMonthYearInput.attr("type", "tel"), this.expiryMonthYearInput.attr("maxlength", PaymentezForm.EXPIRY_MASK.length), this.expiryMonthYearInput.attr("x-autocompletetype", "cc-exp"), this.expiryMonthYearInput.attr("autocompletetype", "cc-exp"), this.expiryMonthYearInput.attr("autocorrect", "off"), this.expiryMonthYearInput.attr("spellcheck", "off"), this.expiryMonthYearInput.attr("autocapitalize", "off");
            var $this = this;
            this.expiryMonthYearInput.keydown(function(e) {
                PaymentezForm.handleExpiryKey(e);
                var val = $this.expiryMonthYearInput.val();
                1 == val.length && parseInt(val) > 1 && PaymentezForm.keyIsNumber(e) && $this.expiryMonthYearInput.val(PaymentezForm.applyFormatMask("0" + val, PaymentezForm.EXPIRY_MASK)), $this.EXPIRY_USE_DROPDOWNS || null == $this.expiryMonthYearInput || ($this.expiryMonthInput.val($this.expiryMonth()), $this.expiryYearInput.val(7 == val.length ? val.substr(5, 2) : null))
            }), this.expiryMonthYearInput.blur(function() {
                $this.refreshExpiryMonthValidation()
            }), this.expiryMonthYearInput.on("paste", function() {
                setTimeout(function() {
                    $this.refreshExpiryMonthYearInput()
                }, 1)
            }), expiryInput.append(this.expiryMonthYearInput), expiryInput.append(this.expiryMonthInput), expiryInput.append(this.expiryYearInput)
        }
        wrapper.append(expiryInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.CALENDAR_SVG)
    }, PaymentezForm.prototype.setupCvcInput = function() {
        this.elem.append("<div class='cvc-container'><div class='cvc-wrapper'></div></div>");
        var wrapper = this.elem.find(".cvc-wrapper");
        wrapper.append(this.cvcInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.LOCK_SVG);
        var $this = this;
        this.cvcInput.keydown(PaymentezForm.filterNumberOnlyKey), this.cvcInput.blur(function() {
            $this.refreshCvcValidation()
        }), this.cvcInput.on("paste", function() {
            setTimeout(function() {
                $this.refreshCvc()
            }, 1)
        })
    }, PaymentezForm.prototype.setupFiscalNumberInput = function() {
        this.elem.find(".card-number-wrapper").after("<div class='fiscal-number-wrapper'></div>");
        var wrapper = this.elem.find(".fiscal-number-wrapper");
        wrapper.append(this.fiscalNumberInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.USER_SVG);
        var $this = this;
        this.fiscalNumberInput.keydown(PaymentezForm.filterNumberOnlyKey), this.fiscalNumberInput.blur(function() {
            $this.refreshFiscalNumberValidation()
        })
    }, PaymentezForm.prototype.setupNipInput = function() {
        this.elem.find(".fiscal-number-wrapper").after("<div class='nip-wrapper'></div>");
        var wrapper = this.elem.find(".nip-wrapper");
        wrapper.append(this.nipInput), wrapper.append("<div class='icon'></div>"), wrapper.find(".icon").append(PaymentezForm.LOCK_SVG);
        var $this = this;
        wrapper.click(function() {
            $this.virtualKeyboardAdded() ? $this.removeVirtualKeyboard() : !$this.virtualKeyboardAdded() && $this.USE_VIRTUAL_KEYBOARD && $this.addVirtualKeyboard()
        }), this.nipInput.keydown(PaymentezForm.filterNumberOnlyKey), this.nipInput.on("paste", function() {
            setTimeout(function() {
                $this.refreshNip()
            }, 1)
        }), this.nipInput.blur(function() {
            $this.refreshNipValidation()
        })
    }, PaymentezForm.prototype.setupOtpValidation = function() {
        var wrapper = PaymentezForm.detachOrCreateElement(this.elem, ".otp-wrapper", "<div class='otp-wrapper'></div>"),
            label = PaymentezForm.detachOrCreateElement(this.elem, ".otp-label", "<label class='otp-label'></label>");
        label.attr("for", "otp-option"), Paymentez.isCheckout() ? label.append(PaymentezForm.OTP_PLACEHOLDER_CHECKOUT) : label.append(PaymentezForm.OTP_PLACEHOLDER_ADD), wrapper.append(this.otpValidation), wrapper.append(label), this.elem.append(wrapper);
        var $this = this;
        this.otpValidation.click(function(e) {
            $this.refreshValidationOption()
        })
    }, PaymentezForm.prototype.setupVirtualKeyboard = function() {
        var array = PaymentezForm.generateRandoms();
        if (this.USE_OTP) var beforeWrapper = this.elem.find(".otp-wrapper");
        else var beforeWrapper = this.elem.find(".nip-wrapper");
        for (var wrapper = PaymentezForm.detachOrCreateElement(this.elem, ".keyboard-wrapper", "<div class='keyboard-wrapper'></div>"), $this = this, i = 0; i < array.length; i++) {
            var keyContainer = document.createElement("div");
            keyContainer.setAttribute("class", "key-container");
            var button = document.createElement("button");
            button.setAttribute("class", "key");
            var value = i + 1;
            i + 1 <= 9 ? button.setAttribute("value", value) : button.setAttribute("value", 0);
            var span = document.createElement("span"),
                key = document.createTextNode(array[i]);
            span.append(key), button.append(span), button.addEventListener("click", function(e) {
                $this.addValueToNip(this.value, this.firstChild.innerHTML), e.preventDefault()
            }), keyContainer.append(button), wrapper.append(keyContainer)
        }
        var cleanContainer = document.createElement("div");
        cleanContainer.setAttribute("class", "clean-container");
        var cleanButton = document.createElement("button");
        cleanButton.setAttribute("class", "clean");
        var cleanKey = document.createTextNode("Borrar");
        cleanButton.append(cleanKey), cleanButton.addEventListener("click", function(e) {
            $this.cleanNipInput(), e.preventDefault()
        }), cleanContainer.append(cleanButton), wrapper.append(cleanContainer), beforeWrapper.after(wrapper)
    }, PaymentezForm.prototype.setupValidationMessage = function() {
        var wrapper = PaymentezForm.detachOrCreateElement(this.elem, ".validation-message", "<div class='validation-message'></div>");
        wrapper.addClass("paymentez_dialog_success"), Paymentez.isCheckout() ? wrapper.text(PaymentezForm.OTP_EXPLICATION_CHECKOUT) : wrapper.text(PaymentezForm.OTP_EXPLICATION_ADD), this.validationMessage = wrapper, this.elem.append(wrapper)
    }, PaymentezForm.prototype.expiryMonth = function() {
        if (!this.EXPIRY_USE_DROPDOWNS && null != this.expiryMonthYearInput) {
            var val = this.expiryMonthYearInput.val();
            return val.length >= 2 ? parseInt(val.substr(0, 2)) : null
        }
        return null
    }, PaymentezForm.prototype.refreshExpiryMonthValidation = function() {
        return !this.expiryContainerAdded() || (PaymentezForm.isExpiryValid(this.getExpiryMonth(), this.getExpiryYear()) ? (this.setExpiryMonthAsValid(), !0) : (this.setExpiryMonthAsInvalid(), !1))
    }, PaymentezForm.prototype.setExpiryMonthAsValid = function() {
        this.EXPIRY_USE_DROPDOWNS ? this.expiryMonthInput.parent().removeClass("has-error") : this.expiryMonthYearInput.parent().removeClass("has-error")
    }, PaymentezForm.prototype.setExpiryMonthAsInvalid = function() {
        this.EXPIRY_USE_DROPDOWNS ? this.expiryMonthInput.parent().addClass("has-error") : this.expiryMonthYearInput.parent().addClass("has-error")
    }, PaymentezForm.elementHasAttribute = function(element, attributeName) {
        var attr = $(element).attr(attributeName);
        return void 0 !== attr && !1 !== attr
    }, PaymentezForm.detachOrCreateElement = function(parentElement, selector, html) {
        var element = parentElement.find(selector);
        return element[0] ? element.detach() : element = $(html), element
    }, PaymentezForm.isValidMonth = function(expiryMonth) {
        return expiryMonth >= 1 && expiryMonth <= 12
    }, PaymentezForm.isExpiryValid = function(month, year) {
        var today = new Date,
            currentMonth = today.getMonth() + 1,
            currentYear = "" + today.getFullYear();
        return 2 == ("" + year).length && (year = currentYear.substring(0, 2) + "" + year), currentMonth = parseInt(currentMonth), currentYear = parseInt(currentYear), month = parseInt(month), year = parseInt(year), PaymentezForm.isValidMonth(month) && (year > currentYear || year == currentYear && month >= currentMonth)
    }, Paymentez.prototype.constructor = Paymentez, Paymentez.ENV_MODE = "", Paymentez.TEST_MODE = !0, Paymentez.PAYMENTEZ_CLIENT_APP_CODE = "", Paymentez.PAYMENTEZ_CLIENT_APP_KEY = "", Paymentez.MERCHANT_ID = 500005, Paymentez.KOUNT_ENVIRONMENT = "", Paymentez.KOUN_TEST_ENVIRONMENT = "https://tst.kaptcha.com/", Paymentez.KOUN_PROD_ENVIRONMENT = "https://ssl.kaptcha.com/", Paymentez.SERVER_LOCAL_URL = "http://localhost:8000", Paymentez.SERVER_DEV_URL = "https://ccapi-dev.paymentez.com", Paymentez.SERVER_STG_URL = "https://ccapi-stg.paymentez.com", Paymentez.SERVER_QA_URL = "https://ccapi-qa.paymentez.com", Paymentez.SERVER_PROD_URL = "https://ccapi.paymentez.com", Paymentez.uuidv4 = function() {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = 16 * Math.random() | 0;
            return ("x" == c ? r : 3 & r | 8).toString(16)
        })
    }, Paymentez.getSessionId = function() {
        return Paymentez.uuidv4()
    }, Paymentez.getUniqToken = function(auth_timestamp, paymentez_client_app_key) {
        var uniq_token_string = paymentez_client_app_key + auth_timestamp;
        return Paymentez.getHash(uniq_token_string)
    }, Paymentez.getAuthToken = function(paymentez_client_app_code, app_client_key) {
        var d = new Date,
            n = d.getTime(),
            auth_timestamp = "" + n,
            string_auth_token = paymentez_client_app_code + ";" + auth_timestamp + ";" + Paymentez.getUniqToken(auth_timestamp, app_client_key);
        return btoa(string_auth_token)
    }, Paymentez.getHash = function(message) {
        var sha256 = new jsSHA("SHA-256", "TEXT");
        return sha256.update(message), sha256.getHash("HEX")
    }, Paymentez.getServerURL = function() {
        Paymentez.SERVER_STG_URL;
        return "" === Paymentez.ENV_MODE ? Paymentez.TEST_MODE ? Paymentez.SERVER_STG_URL : Paymentez.SERVER_PROD_URL : "dev" === Paymentez.ENV_MODE ? Paymentez.SERVER_DEV_URL : "stg" === Paymentez.ENV_MODE ? Paymentez.SERVER_STG_URL : "prod" === Paymentez.ENV_MODE ? Paymentez.SERVER_PROD_URL : "prod-qa" === Paymentez.ENV_MODE ? Paymentez.SERVER_QA_URL : Paymentez.SERVER_LOCAL_URL
    }, Paymentez.createToken = function(createTokenRequest, successCallback, erroCallback) {
        var SERVER_URL = this.getServerURL(),
            xmlhttp = new XMLHttpRequest;
        xmlhttp.open("POST", SERVER_URL + "/v2/card/add", !0), xmlhttp.setRequestHeader("Content-Type", "application/json"), xmlhttp.setRequestHeader("Auth-Token", Paymentez.getAuthToken(Paymentez.PAYMENTEZ_CLIENT_APP_CODE, Paymentez.PAYMENTEZ_CLIENT_APP_KEY)), xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) try {
                var objResponse = JSON.parse(xmlhttp.responseText);
                200 == xmlhttp.status ? successCallback(objResponse) : erroCallback(400 == xmlhttp.status ? objResponse : objResponse)
            } catch (e) {
                var server_error = {
                    error: {
                        type: "Server Error",
                        help: "Server Error",
                        description: "Server Error"
                    }
                };
                erroCallback(server_error)
            }
        }, xmlhttp.send(JSON.stringify(createTokenRequest))
    }, Paymentez.dataCollector = function(session_id) {
        "" === Paymentez.ENV_MODE ? Paymentez.TEST_MODE ? Paymentez.KOUNT_ENVIRONMENT = Paymentez.KOUN_TEST_ENVIRONMENT : Paymentez.KOUNT_ENVIRONMENT = Paymentez.KOUN_PROD_ENVIRONMENT : "prod" === Paymentez.ENV_MODE ? Paymentez.KOUNT_ENVIRONMENT = Paymentez.KOUN_PROD_ENVIRONMENT : Paymentez.KOUNT_ENVIRONMENT = Paymentez.KOUN_TEST_ENVIRONMENT;
        var body, iframe, image;
        if ("undefined" == typeof document || void 0 === document.body || !document.body || "interactive" !== document.readyState && "complete" !== document.readyState) setTimeout(Paymentez.dataCollector, 150, session_id);
        else {
            body = document.getElementsByTagName("body")[0], iframe = document.createElement("iframe"), iframe.setAttribute("id", "riskIframe"), iframe.setAttribute("height", "1"), iframe.setAttribute("scrolling", "no"), iframe.setAttribute("frameborder", "0"), iframe.setAttribute("width", "1"), iframe.setAttribute("src", Paymentez.KOUNT_ENVIRONMENT + "logo.htm?m=" + Paymentez.MERCHANT_ID + "&s=" + session_id), image = document.createElement("img"), image.setAttribute("height", "1"), image.setAttribute("width", "1"), image.setAttribute("src", Paymentez.KOUNT_ENVIRONMENT + "logo.gif?m=" + Paymentez.MERCHANT_ID + "&s=" + session_id);
            try {
                iframe.appendChild(image)
            } catch (_error) {
                _error
            }
            body.appendChild(iframe)
        }
    }, Paymentez.setEnvironment = function(test_mode, paymentez_client_app_code, paymentez_client_app_key) {
        Paymentez.TEST_MODE = test_mode, Paymentez.PAYMENTEZ_CLIENT_APP_CODE = paymentez_client_app_code, Paymentez.PAYMENTEZ_CLIENT_APP_KEY = paymentez_client_app_key
    }, Paymentez.init = function(env_mode, paymentez_client_app_code, paymentez_client_app_key) {
        Paymentez.ENV_MODE = env_mode, Paymentez.PAYMENTEZ_CLIENT_APP_CODE = paymentez_client_app_code, Paymentez.PAYMENTEZ_CLIENT_APP_KEY = paymentez_client_app_key
    }, Paymentez.addCard = function(uid, email, card, success_callback, failure_callback) {
        var session_id = Paymentez.getSessionId();
        Paymentez.dataCollector(session_id);
        var params = {
            session_id: session_id,
            user: {
                id: uid,
                email: email,
                fiscal_number: $(".fiscal-number").val()
            }
        };
        params.card = card.card, Paymentez.createToken(params, success_callback, failure_callback)
    }, Paymentez.isCheckout = function() {
        return "" == this.ENV_MODE
    }, Paymentez.getBinInformation = function(number_bin, form, successCallback, erroCallback) {
        var xmlhttp = new XMLHttpRequest;
        if (this.isCheckout()) {
            var reference = $("#reference").val(),
                url_bin = "/v2/card_bin/intra/" + number_bin + "/?reference=" + reference;
            xmlhttp.open("GET", url_bin, !0)
        } else {
            var SERVER_URL = this.getServerURL(),
                url_bin = SERVER_URL + "/v2/card_bin/" + number_bin;
            xmlhttp.open("GET", url_bin, !0), xmlhttp.setRequestHeader("Auth-Token", this.getAuthToken(this.PAYMENTEZ_CLIENT_APP_CODE, this.PAYMENTEZ_CLIENT_APP_KEY))
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) try {
                var objResponse = JSON.parse(xmlhttp.responseText);
                200 == xmlhttp.status ? successCallback(objResponse, form) : erroCallback(400 == xmlhttp.status ? objResponse : objResponse)
            } catch (e) {
                var server_error = {
                    error: {
                        type: "Server Error",
                        help: "Server Error",
                        description: "Server Error"
                    }
                };
                erroCallback(server_error)
            }
        }, xmlhttp.send()
    },
    function(I) {
        function w(c, a, d) {
            var f, n, k, e, h, q, y, p, u, l = 0,
                b = [],
                g = 0,
                m = !1,
                t = [],
                r = [],
                z = !1;
            if (d = d || {}, f = d.encoding || "UTF8", (u = d.numRounds || 1) !== parseInt(u, 10) || 1 > u) throw Error("numRounds must a integer >= 1");
            if (0 !== c.lastIndexOf("SHA-", 0)) throw Error("Chosen SHA variant is not supported");
            if (q = function(b, a) {
                    return A(b, a, c)
                }, y = function(b, a, l, f) {
                    var g, e;
                    if ("SHA-224" !== c && "SHA-256" !== c) throw Error("Unexpected error in SHA-2 implementation");
                    for (g = 15 + (a + 65 >>> 9 << 4), e = 16; b.length <= g;) b.push(0);
                    for (b[a >>> 5] |= 128 << 24 - a % 32, a += l, b[g] = 4294967295 & a, b[g - 1] = a / 4294967296 | 0, l = b.length, a = 0; a < l; a += e) f = A(b.slice(a, a + e), f, c);
                    if ("SHA-224" === c) b = [f[0], f[1], f[2], f[3], f[4], f[5], f[6]];
                    else {
                        if ("SHA-256" !== c) throw Error("Unexpected error in SHA-2 implementation");
                        b = f
                    }
                    return b
                }, p = function(b) {
                    return b.slice()
                }, "SHA-224" === c) h = 512, e = 224;
            else {
                if ("SHA-256" !== c) throw Error("Chosen SHA variant is not supported");
                h = 512, e = 256
            }
            k = B(a, f), n = x(c), this.setHMACKey = function(b, a, g) {
                var e;
                if (!0 === m) throw Error("HMAC key already set");
                if (!0 === z) throw Error("Cannot set HMAC key after calling update");
                if (f = (g || {}).encoding || "UTF8", a = B(a, f)(b), b = a.binLen, a = a.value, e = h >>> 3, g = e / 4 - 1, e < b / 8) {
                    for (a = y(a, b, 0, x(c)); a.length <= g;) a.push(0);
                    a[g] &= 4294967040
                } else if (e > b / 8) {
                    for (; a.length <= g;) a.push(0);
                    a[g] &= 4294967040
                }
                for (b = 0; b <= g; b += 1) t[b] = 909522486 ^ a[b], r[b] = 1549556828 ^ a[b];
                n = q(t, n), l = h, m = !0
            }, this.update = function(a) {
                var c, f, e, d = 0,
                    p = h >>> 5;
                for (c = k(a, b, g), a = c.binLen, f = c.value, c = a >>> 5, e = 0; e < c; e += p) d + h <= a && (n = q(f.slice(e, e + p), n), d += h);
                l += d, b = f.slice(d >>> 5), g = a % h, z = !0
            }, this.getHash = function(a, f) {
                var d, h, k, q;
                if (!0 === m) throw Error("Cannot call getHash after setting HMAC key");
                switch (k = C(f), a) {
                    case "HEX":
                        d = function(a) {
                            return D(a, e, k)
                        };
                        break;
                    case "B64":
                        d = function(a) {
                            return E(a, e, k)
                        };
                        break;
                    case "BYTES":
                        d = function(a) {
                            return F(a, e)
                        };
                        break;
                    case "ARRAYBUFFER":
                        try {
                            h = new ArrayBuffer(0)
                        } catch (v) {
                            throw Error("ARRAYBUFFER not supported by this environment")
                        }
                        d = function(a) {
                            return G(a, e)
                        };
                        break;
                    default:
                        throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER")
                }
                for (q = y(b.slice(), g, l, p(n)), h = 1; h < u; h += 1) q = y(q, e, 0, x(c));
                return d(q)
            }, this.getHMAC = function(a, f) {
                var d, k, t, u;
                if (!1 === m) throw Error("Cannot call getHMAC without first setting HMAC key");
                switch (t = C(f), a) {
                    case "HEX":
                        d = function(a) {
                            return D(a, e, t)
                        };
                        break;
                    case "B64":
                        d = function(a) {
                            return E(a, e, t)
                        };
                        break;
                    case "BYTES":
                        d = function(a) {
                            return F(a, e)
                        };
                        break;
                    case "ARRAYBUFFER":
                        try {
                            d = new ArrayBuffer(0)
                        } catch (v) {
                            throw Error("ARRAYBUFFER not supported by this environment")
                        }
                        d = function(a) {
                            return G(a, e)
                        };
                        break;
                    default:
                        throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER")
                }
                return k = y(b.slice(), g, l, p(n)), u = q(r, x(c)), u = y(k, e, h, u), d(u)
            }
        }

        function m() {}

        function D(c, a, d) {
            var l = "";
            a /= 8;
            var b, g;
            for (b = 0; b < a; b += 1) g = c[b >>> 2] >>> 8 * (3 + b % 4 * -1), l += "0123456789abcdef".charAt(g >>> 4 & 15) + "0123456789abcdef".charAt(15 & g);
            return d.outputUpper ? l.toUpperCase() : l
        }

        function E(c, a, d) {
            var g, f, n, l = "",
                b = a / 8;
            for (g = 0; g < b; g += 3)
                for (f = g + 1 < b ? c[g + 1 >>> 2] : 0, n = g + 2 < b ? c[g + 2 >>> 2] : 0, n = (c[g >>> 2] >>> 8 * (3 + g % 4 * -1) & 255) << 16 | (f >>> 8 * (3 + (g + 1) % 4 * -1) & 255) << 8 | n >>> 8 * (3 + (g + 2) % 4 * -1) & 255, f = 0; 4 > f; f += 1) l += 8 * g + 6 * f <= a ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >>> 6 * (3 - f) & 63) : d.b64Pad;
            return l
        }

        function F(c, a) {
            var b, g, d = "",
                l = a / 8;
            for (b = 0; b < l; b += 1) g = c[b >>> 2] >>> 8 * (3 + b % 4 * -1) & 255, d += String.fromCharCode(g);
            return d
        }

        function G(c, a) {
            var l, g, d = a / 8,
                b = new ArrayBuffer(d);
            for (g = new Uint8Array(b), l = 0; l < d; l += 1) g[l] = c[l >>> 2] >>> 8 * (3 + l % 4 * -1) & 255;
            return b
        }

        function C(c) {
            var a = {
                outputUpper: !1,
                b64Pad: "=",
                shakeLen: -1
            };
            if (c = c || {}, a.outputUpper = c.outputUpper || !1, !0 === c.hasOwnProperty("b64Pad") && (a.b64Pad = c.b64Pad), "boolean" != typeof a.outputUpper) throw Error("Invalid outputUpper formatting option");
            if ("string" != typeof a.b64Pad) throw Error("Invalid b64Pad formatting option");
            return a
        }

        function B(c, a) {
            var d;
            switch (a) {
                case "UTF8":
                case "UTF16BE":
                case "UTF16LE":
                    break;
                default:
                    throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")
            }
            switch (c) {
                case "HEX":
                    d = function(a, b, c) {
                        var d, k, e, h, q, f = a.length;
                        if (0 != f % 2) throw Error("String of HEX type must be in byte increments");
                        for (b = b || [0], c = c || 0, q = c >>> 3, d = 0; d < f; d += 2) {
                            if (k = parseInt(a.substr(d, 2), 16), isNaN(k)) throw Error("String of HEX type contains invalid characters");
                            for (h = (d >>> 1) + q, e = h >>> 2; b.length <= e;) b.push(0);
                            b[e] |= k << 8 * (3 + h % 4 * -1)
                        }
                        return {
                            value: b,
                            binLen: 4 * f + c
                        }
                    };
                    break;
                case "TEXT":
                    d = function(c, b, d) {
                        var f, n, e, h, q, m, p, r, k = 0;
                        if (b = b || [0], d = d || 0, q = d >>> 3, "UTF8" === a)
                            for (r = 3, e = 0; e < c.length; e += 1)
                                for (f = c.charCodeAt(e), n = [], 128 > f ? n.push(f) : 2048 > f ? (n.push(192 | f >>> 6), n.push(128 | 63 & f)) : 55296 > f || 57344 <= f ? n.push(224 | f >>> 12, 128 | f >>> 6 & 63, 128 | 63 & f) : (e += 1, f = 65536 + ((1023 & f) << 10 | 1023 & c.charCodeAt(e)), n.push(240 | f >>> 18, 128 | f >>> 12 & 63, 128 | f >>> 6 & 63, 128 | 63 & f)), h = 0; h < n.length; h += 1) {
                                    for (p = k + q, m = p >>> 2; b.length <= m;) b.push(0);
                                    b[m] |= n[h] << 8 * (r + p % 4 * -1), k += 1
                                } else if ("UTF16BE" === a || "UTF16LE" === a)
                                    for (r = 2, n = "UTF16LE" === a && !0 || "UTF16LE" !== a && !1, e = 0; e < c.length; e += 1) {
                                        for (f = c.charCodeAt(e), !0 === n && (h = 255 & f, f = h << 8 | f >>> 8), p = k + q, m = p >>> 2; b.length <= m;) b.push(0);
                                        b[m] |= f << 8 * (r + p % 4 * -1), k += 2
                                    }
                        return {
                            value: b,
                            binLen: 8 * k + d
                        }
                    };
                    break;
                case "B64":
                    d = function(a, b, c) {
                        var d, k, e, h, q, m, p, f = 0;
                        if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
                        if (k = a.indexOf("="), a = a.replace(/\=/g, ""), -1 !== k && k < a.length) throw Error("Invalid '=' found in base-64 string");
                        for (b = b || [0], c = c || 0, m = c >>> 3, k = 0; k < a.length; k += 4) {
                            for (q = a.substr(k, 4), e = h = 0; e < q.length; e += 1) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(q[e]), h |= d << 18 - 6 * e;
                            for (e = 0; e < q.length - 1; e += 1) {
                                for (p = f + m, d = p >>> 2; b.length <= d;) b.push(0);
                                b[d] |= (h >>> 16 - 8 * e & 255) << 8 * (3 + p % 4 * -1), f += 1
                            }
                        }
                        return {
                            value: b,
                            binLen: 8 * f + c
                        }
                    };
                    break;
                case "BYTES":
                    d = function(a, b, c) {
                        var d, n, k, e, h;
                        for (b = b || [0], c = c || 0, k = c >>> 3, n = 0; n < a.length; n += 1) d = a.charCodeAt(n), h = n + k, e = h >>> 2, b.length <= e && b.push(0), b[e] |= d << 8 * (3 + h % 4 * -1);
                        return {
                            value: b,
                            binLen: 8 * a.length + c
                        }
                    };
                    break;
                case "ARRAYBUFFER":
                    try {
                        d = new ArrayBuffer(0)
                    } catch (l) {
                        throw Error("ARRAYBUFFER not supported by this environment")
                    }
                    d = function(a, b, c) {
                        var d, n, k, e, h;
                        for (b = b || [0], c = c || 0, n = c >>> 3, h = new Uint8Array(a), d = 0; d < a.byteLength; d += 1) e = d + n, k = e >>> 2, b.length <= k && b.push(0), b[k] |= h[d] << 8 * (3 + e % 4 * -1);
                        return {
                            value: b,
                            binLen: 8 * a.byteLength + c
                        }
                    };
                    break;
                default:
                    throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER")
            }
            return d
        }

        function r(c, a) {
            return c >>> a | c << 32 - a
        }

        function J(c, a, d) {
            return c & a ^ ~c & d
        }

        function K(c, a, d) {
            return c & a ^ c & d ^ a & d
        }

        function L(c) {
            return r(c, 2) ^ r(c, 13) ^ r(c, 22)
        }

        function M(c) {
            return r(c, 6) ^ r(c, 11) ^ r(c, 25)
        }

        function N(c) {
            return r(c, 7) ^ r(c, 18) ^ c >>> 3
        }

        function O(c) {
            return r(c, 17) ^ r(c, 19) ^ c >>> 10
        }

        function P(c, a) {
            var d = (65535 & c) + (65535 & a);
            return ((c >>> 16) + (a >>> 16) + (d >>> 16) & 65535) << 16 | 65535 & d
        }

        function Q(c, a, d, l) {
            var b = (65535 & c) + (65535 & a) + (65535 & d) + (65535 & l);
            return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>> 16) & 65535) << 16 | 65535 & b
        }

        function R(c, a, d, l, b) {
            var g = (65535 & c) + (65535 & a) + (65535 & d) + (65535 & l) + (65535 & b);
            return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>> 16) + (g >>> 16) & 65535) << 16 | 65535 & g
        }

        function x(c) {
            var d, a = [];
            if (0 !== c.lastIndexOf("SHA-", 0)) throw Error("No SHA variants supported");
            switch (a = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], d = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], c) {
                case "SHA-224":
                    break;
                case "SHA-256":
                    a = d;
                    break;
                case "SHA-384":
                case "SHA-512":
                    a = [new m, new m, new m, new m, new m, new m, new m, new m];
                    break;
                default:
                    throw Error("Unknown SHA variant")
            }
            return a
        }

        function A(c, a, d) {
            var l, b, g, f, n, k, e, h, m, r, p, w, t, x, u, z, A, B, C, D, E, F, G, v = [];
            if ("SHA-224" !== d && "SHA-256" !== d) throw Error("Unexpected error in SHA-2 implementation");
            for (r = 64, w = 1, F = Number, t = P, x = Q, u = R, z = N, A = O, B = L, C = M, E = K, D = J, G = H, d = a[0], l = a[1], b = a[2], g = a[3], f = a[4], n = a[5], k = a[6], e = a[7], p = 0; p < r; p += 1) 16 > p ? (m = p * w, h = c.length <= m ? 0 : c[m], m = c.length <= m + 1 ? 0 : c[m + 1], v[p] = new F(h, m)) : v[p] = x(A(v[p - 2]), v[p - 7], z(v[p - 15]), v[p - 16]), h = u(e, C(f), D(f, n, k), G[p], v[p]), m = t(B(d), E(d, l, b)), e = k, k = n, n = f, f = t(g, h), g = b, b = l, l = d, d = t(h, m);
            return a[0] = t(d, a[0]), a[1] = t(l, a[1]), a[2] = t(b, a[2]), a[3] = t(g, a[3]), a[4] = t(f, a[4]), a[5] = t(n, a[5]), a[6] = t(k, a[6]), a[7] = t(e, a[7]), a
        }
        var H;
        H = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], "function" == typeof define && define.amd ? define(function() {
            return w
        }) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (module.exports = w), exports = w) : I.jsSHA = w
    }(this);