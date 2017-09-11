var verifyCallback = function(response) {
    if(response == "" || response == undefined || response.length == 0){
        // Do something
    } else {
        $("#send").removeAttr("disabled");
        $("#send").removeClass("disabled");
    }
};
var onloadCallback = function() {
  grecaptcha.render("recaptcha", {"sitekey": "6LfTETAUAAAAAJOkhn9ZfsTEFQIUFrB8y2R3uNOs", "theme": "light", "callback" : verifyCallback});
};