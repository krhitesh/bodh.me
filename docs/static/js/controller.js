function check(){
    if (document.getElementById('terms').checked) 
    {
        $("#send").removeAttr("disabled");
        $("#send").removeClass("disabled");
    } else {
        $("#send").attr("disabled", "true");
        $("#send").addClass("disabled");
    }
};

function off(){
    if ($(".error").css("display") == "block") {
        $( ".error" ).delay( 3000 ).css("display", "none");
    }
    if ($(".success").css("display") == "block") {
        $( ".success" ).delay( 3000 ).css("display", "none");
    }
};