 var CD = {
              PLAYCOUNT : 0
            };
var ANDROID_URL = 'https://dust.to/25zgTmW';
var IOS_URL = 'https://dust.to/1UXkmbb';

var MESSAGE = {
  ERROR: {
    DEFAULT: 'There was an error with your message!',
    INVALID_PHONE: 'Please enter a valid phone number!'
  },
  URL: {
    STAGING: 'https://stage-api.bodh.me'
  }
}

function isValidPhoneNumber(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
}

(function($){

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

$.ajaxSetup({
headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
}
});

// Fun starts here
function doCall(url, options) {
  if (!options.noauth) {
    options.headers = options.headers || {};
  }
  return fetch(url, options).then(response => response.json());
}

function doPostCall(url, options) {
  let callOptions = {
    method: 'POST'
  }
  if (options.type === 'json') {
    callOptions.headers = {
      'Content-Type': 'application/json'
    }
    callOptions.body = JSON.stringify(options.body)
  } else {
    callOptions.body = options.body
  }
  return doCall(url, callOptions)
}

$('#send-to-phone').on('submit', function(e){
  e.preventDefault();
  var self    = $(this),
      action  = self.attr('action'),
      phone_number = $('#phone-input').val().replace(/-/g,'');

  var current = $('.dropdown-button .text').html(),
      countrycode = parseInt(current.match(/(\d+)/g));


  if(!isValidPhoneNumber(phone_number) && countrycode === 1) {
    $('.download').addClass('fail').removeClass('success');
    $('.phone-result.error .msg').html(MESSAGE.ERROR.INVALID_PHONE);
    return;
  }

  if(countrycode !== 1 && phone_number.length === 0) {
    $('.download').addClass('fail').removeClass('success');
    $('.phone-result.error .msg').html(MESSAGE.ERROR.INVALID_PHONE);
    return;
  }

  phone_number = countrycode + phone_number;

  var url = MESSAGE.URL.STAGING + "/message/request";
  var info = {
    "phone": phone_number,
    "Validity": true
  }

  var options = {
    body: info,
    type: 'json'
  }

  doPostCall(url, options)
    .then((response) => {
      $('.download').addClass('success').removeClass('fail');
    })
    .catch(err => {
      $('.download').addClass('fail').removeClass('success');
      $('.phone-result.error .msg').html(MESSAGE.ERROR.DEFAULT);
      console.log(err);
  })

  // var jqxhr = $.post(action,{number : phone_number})
  //   .done(function(data) {
  //     if(data.messages[0].status == 0){
  //       //we got a success
  //       //486ff53e9d374a7a50fbd484ce1cf242
  //       $('.download').addClass('success').removeClass('fail');
  //     }
  //   })
  //   .fail(function(e) {
  //     $('.download').addClass('fail').removeClass('success');
  //     $('.phone-result.error .msg').html(MESSAGE.ERROR.DEFAULT);
  // });

});


function checkPhoneLinks(){
  if( isMobile.any() ) {
    $('.download-now').show();
    $('.storebutton').hide();
  } else {
    $('.download-now').hide();
    $('.storebutton').show();
  }

  if( isMobile.Android() ) {
    $('a.download-now').attr('href', ANDROID_URL);
  } else {
    $('a.download-now').attr('href', IOS_URL);
  }
}

function checkPlayButton() {
  if( isMobile.Android() ) {
    $('.play-button').show();
    $('.play-button').on('click', function(e){
      var video = document.getElementById('main-video');
      video.play();
      $(this).hide();
    });
  }
}

$(document).ready(function() {

  //set initial
  if( $('.dropdown-menu li.selected').length){
    $(".dropdown-button").html( $('.dropdown-menu li.selected').html() );
  }

  $(".dropdown-button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".dropdown-menu");
    $menu.toggleClass("show-menu");
    $menu.children("li").click(function() {
      $menu.removeClass("show-menu");
      $button.html($(this).html());
    });
  });

  checkPhoneLinks();

  checkPlayButton();

  $('.scroll-down').on('click', function(e) {
    $('html, body').animate({
        scrollTop: $("#features").offset().top
    }, 1000);
  })

});

$(window).on('resize', checkPhoneLinks)

})(jQuery);


$(window).on('scroll', function(e) {
  if( $('#main-video:in-viewport').length > 0 && CD.PLAYCOUNT === 0) {
    CD.PLAYCOUNT = 1;
    var video = document.getElementById('main-video');
    video.play();
  }
  else if( $('#main-video:in-viewport').length > 0) {
    // 486ff53e9d374a7a50fbd484ce1cf242
    $('.scroll-down').fadeOut();
  }
  else if( $('#main-video:in-viewport').length == 0){
    $('.scroll-down').fadeIn();
  }

});
