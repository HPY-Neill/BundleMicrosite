// // delay css animation
// let animate = document.querySelector('.animate-this');

// setTimeout(addAnimation, 2000);

// function addAnimation() {
//   animate.className = 'animated-text';
// }

$(document).ready(function(){   
  // show hide navigation
  $('.hamburger-icon').on('click', function() {
    $("nav ul#navigation").toggleClass('open');
    $("body").toggleClass('nav-open');
    $(this).toggleClass('open');

    $("nav ul#navigation li span").removeClass('down');
  });
  

  $('ul#navigation li span').on('click', function() {
    $(this).toggleClass('down');
  });
  
});




// // phone formatting
function phone_formatting(ele,restore) {
  var new_number,
      selection_start = ele.selectionStart,
      selection_end = ele.selectionEnd,
      number = ele.value.replace(/\D/g,'');

  // automatically add dashes
  if (number.length > 2) {
    // matches: 123 || 123-4 || 123-45
    new_number = number.substring(0,3) + '-';
    if (number.length === 4 || number.length === 5) {
      // matches: 123-4 || 123-45
      new_number += number.substr(3);
    }
    else if (number.length > 5) {
      // matches: 123-456 || 123-456-7 || 123-456-789
      new_number += number.substring(3,6) + '-';
    }
    if (number.length > 6) {
      // matches: 123-456-7 || 123-456-789 || 123-456-7890
      new_number += number.substring(6);
    }
  }
  else {
    new_number = number;
  }

  ele.value =  (new_number.length > 12) ? new_number.substring(0,12) : new_number;

  document.getElementById('msg').innerHTML='<p>Selection is: ' + selection_end + ' and length is: ' + new_number.length + '</p>';

  if (new_number.slice(-1) === '-' && restore === false
      && (new_number.length === 8 && selection_end === 7)
          || (new_number.length === 4 && selection_end === 3)) {
      selection_start = new_number.length;
      selection_end = new_number.length;
  }
  else if (restore === 'revert') {
    selection_start--;
    selection_end--;
  }
  ele.setSelectionRange(selection_start, selection_end);

}

function phone_number_check(field,e) {
  var key_code = e.keyCode,
      key_string = String.fromCharCode(key_code),
      press_delete = false,
      dash_key = 189,
      delete_key = [8,46],
      direction_key = [33,34,35,36,37,38,39,40],
      selection_end = field.selectionEnd;

  // delete key was pressed
  if (delete_key.indexOf(key_code) > -1) {
    press_delete = true;
  }

  // only force formatting is a number or delete key was pressed
  if (key_string.match(/^\d+$/) || press_delete) {
    phone_formatting(field,press_delete);
  }
  // do nothing for direction keys, keep their default actions
  else if(direction_key.indexOf(key_code) > -1) {
    // do nothing
  }
  else if(dash_key === key_code) {
    if (selection_end === field.value.length) {
      field.value = field.value.slice(0,-1)
    }
    else {
      field.value = field.value.substring(0,(selection_end - 1)) + field.value.substr(selection_end)
      field.selectionEnd = selection_end - 1;
    }
  }
  // all other non numerical key presses, remove their value
  else {
    e.preventDefault();
    phone_formatting(field,'revert');
  }

}

document.getElementById('phone').onkeyup = function(e) {
  phone_number_check(this,e);
}







$(window).scroll(function(e){
  parallax(); 
});

// PARALLAX FUNCTION
function parallax(){
  var scrolled = $(window).scrollTop();
  
  // body background
  $('.hpy_modular').css('background-position',"50% " + (0-(scrolled*.18))+'px');
  

  if (document.documentElement.clientWidth > 780) {
    // phones
    $('.parallax-1').css('top',(0-(scrolled*.15))+'px');
    $('.parallax-2').css('top',(0+(scrolled*.09))+'px');
    $('.parallax-3').css('top',(0+(scrolled*.06))+'px');
    $('.parallax-4').css('top',(0+(scrolled*.05))+'px');
    $('.parallax-5').css('top',(0+(scrolled*.08))+'px');
  }

};




$(document).ready(function(){   

  $('.hero').css('opacity', '1');
  
      
  // slider
  $('.slide-in-left').on('click', function() {
    $(".slide-right").removeClass('open');
    $(".slide-left").addClass('open');
  });
  
  $('.slide-in-right').on('click', function() {
    $(".slide-left").removeClass('open');
    $(".slide-right").addClass('open');
  });
  
  $('.slide-close').on('click', function() {
    $(".slide-right").fadeOut(400).removeClass('open').fadeIn(450);
    $(".slide-left").fadeOut(400).removeClass('open').fadeIn(450);
  });   
  
  
  // decision matrix    
  $(".menu-selection_alpha > li").click(function(){ 
    $(this).parent('.menu-selection_alpha').addClass('hide-me');
    $(this).children(".menu-selection_beta").addClass('open');
    $('.menu-selection_alpha').removeClass('fadeInLeft');
    
    $('.start-over span').addClass('show-me fadeInRightSmall');
  });
  
  $(".menu-selection_beta > li").click(function(){
    $(this).parent('.menu-selection_beta').addClass('hide-me');
    $(this).children(".menu-selection_gamma").addClass('open');
  });
  
    $(".menu-selection_beta > li.short-step").click(function(){
      $('.matrix').addClass('fully');
      $(this).parent('.menu-selection_beta').addClass('hide-me');
      $(this).children('.menu-selection_gamma').addClass('hide-me');
      $(this).children(".menu-selection_delta").addClass('open');
      $('.decision-matrix').addClass('step-4')
    });
  
  $(".menu-selection_gamma > li").click(function(){ 
    $('.matrix').addClass('fully');
    $(this).parent('.menu-selection_gamma').addClass('hide-me');
    $(this).children(".menu-selection_delta").addClass('open');
    $('.decision-matrix').addClass('step-4')
  });
  
  
  $(".start-over").click(function(){  
    $('.menu-selection_alpha').addClass('open fadeInLeft');
    $('.menu-selection_alpha').removeClass('hide-me');
    $(".menu-selection_beta").removeClass('open');
    $(".menu-selection_delta").removeClass('open');
    $(".menu-selection_gamma").removeClass('open');
    $('.matrix').removeClass('fully');
    $('.start-over span').removeClass('show-me fadeInRightSmall');
    $('.decision-matrix').removeClass('step-4');
  });
  
  
  $(".matrix-selections").html("<div class='hpy_grid'><div class='col-4 col-sm-6 card-m5000 card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/move-5000.jpg'></p><h3><strong>Move/5000</strong></h3><ul class='checkmark'><li>Versatile and portable</li><li>Process transactions 4X faster</li><li>Accept PIN debit</li><li>Fraud protection</li></ul><p class='text-center'><a href='/terminals' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-d3500 card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/desk-3500.jpg'></p><h3><strong>Desk/3500</strong></h3><ul class='checkmark'><li>Seamless payment experience</li><li>Fraud protection</li><li>Future-proof</li><li>Improve checkout process</li></ul><p class='text-center'><a href='/terminals/' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-restaurant card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/restaruant.jpg'></p><h3><strong>Heartland Restaurant</strong></h3><ul class='checkmark'><li>Manage business from anywhere</li><li>Turn tables faster</li><li>Automate your restaurant</li><li>Data in every dish</li><li>Stay engaged with customers</li></ul><p class='text-center'><a href='/restaurant' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-register card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/register.jpg'></p><h3><strong>Heartland Register</strong></h3><ul class='checkmark'><li>Better checkout experience</li><li>Reduce employee overtime</li><li>Eliminate inventory shortages</li><li>Simplify accounting</li></ul><p class='text-center'><a href='/register' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-mobilepay card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/mobile-pay.jpg'></p><h3><strong>Heartland Mobile Pay</strong></h3><ul class='checkmark'><li>Never miss a sale</li><li>Go where customers are</li><li>Capture customer trends</li></ul><p class='text-center'><a href='/mobile-payments' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-retail card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/retail.jpg?v=80085'></p><h3><strong>Heartland Retail</strong></h3><ul class='checkmark'><li>Delight customers</li><li>Use data to drive decisions</li><li>Streamline operations</li><li>Boost productivity</li></ul><p class='text-center'><a href='/retail' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-terminal card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/terminal-plus.jpg'></p><h3><strong>Terminal+</strong></h3><ul class='checkmark'><li>Simplify checkout experience</li><li>Intuitive sales tax</li><li>Eliminate inventory shortages</li><li>Fraud protection</li></ul><p class='text-center'><a href='/terminal/' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-a920 card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/a920.jpg'></p><h3><strong>A920</strong></h3><ul class='checkmark'><li>Better customer experience</li><li>Built-in touchscreen,scanner and receipt printer</li><li>Wifi enabled</li><li>Accepts all the ways customers pay</li></ul><p class='text-center'><a href='/terminals/' class='link-arrow link-arrow_red'>Learn More</a></p></div><div class='col-4 col-sm-6 card-hfsp card'><p class='text-center'><img src='https://prod-heartland.azureedge.net/-/media/heartland/decisionmatrix/hfsp.jpg'></p><h3><strong>Heartland for Service Professionals</strong></h3><ul class='checkmark'><li>Streamline work order management</li><li>Build your brand</li><li>Automate manual processes</li><li>Get paid faster</li></ul><p class='text-center'><a href='https://heartlandforserviceprofessionals.com' class='link-arrow link-arrow_red'>Learn More</a></p></div></div>");
});






// MODAL AUTO PLAY ON OPEN
modals.init({
  modalActiveClass: 'active',
  modalBGClass: 'modal-bg',
  
  callbackOpen: function ( toggle, modal ) {
    autoplayVideo(modal);
  },
  callbackClose: function ( toggle, modal ) {
    stopVideo(modal);
  }
});

var autoplayVideo = function (modal) {
  var video = modal.querySelector('iframe[src*="www.youtube.com"], video');
  if (!video) return;
  if (video.tagName.toLowerCase() === 'video') {
    video.play();
    return;
  }
  video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';
};

var stopVideo = function (modal) {
  var video = modal.querySelector('iframe[src*="www.youtube.com"], video');
  if (!video) return;
  if (video.tagName.toLowerCase() === 'video') {
    video.pause();
    return;
  }
  video.src = video.src.replace('&autoplay=1', '').replace('?autoplay=1', '');
};






// SCROLL ACTIONS
$(function() {

  var $window           = $(window),
      win_height_padded = $window.height() * .7,
      isTouch           = Modernizr.touch;

  if (isTouch) { $('.revealOnScroll').addClass('animated'); }

  $window.on('scroll', revealOnScroll);

  function revealOnScroll() {
    var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * .7;

    // Shown
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;

      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('animated ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('animated ' + $this.data('animation'));
        }
      }
    });
    
   // Hidden...
   //$(".revealOnScroll.animated").each(function (index) {
   //   var $this     = $(this),
   //       offsetTop = $this.offset().top;
   //   if (scrolled + win_height_padded < offsetTop) {
   //     $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
   //   }
   // });
  }

  revealOnScroll();
});





/*! ResponsiveSlides.js v1.55
 * http://responsiveslides.com
*/

/*! http://responsiveslides.com v1.55 by @viljamis */
(function(c,K,C){c.fn.responsiveSlides=function(m){var a=c.extend({auto:!0,speed:500,timeout:4E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!0,prevText:"Previous",nextText:"Next",maxwidth:"",navContainer:"",manualControls:"",namespace:"rslides",before:c.noop,after:c.noop},m);return this.each(function(){C++;var f=c(this),u,t,v,n,q,r,p=0,e=f.children(),D=e.length,h=parseFloat(a.speed),E=parseFloat(a.timeout),w=parseFloat(a.maxwidth),g=a.namespace,d=g+C,F=g+"_nav "+d+"_nav",x=g+"_here",k=d+"_on",
y=d+"_s",l=c("<ul class='"+g+"_tabs "+d+"_tabs' />"),z={"float":"left",position:"relative",opacity:1,zIndex:2},A={"float":"none",position:"absolute",opacity:0,zIndex:1},G=function(){var b=(document.body||document.documentElement).style,a="transition";if("string"===typeof b[a])return!0;u=["Moz","Webkit","Khtml","O","ms"];var a=a.charAt(0).toUpperCase()+a.substr(1),c;for(c=0;c<u.length;c++)if("string"===typeof b[u[c]+a])return!0;return!1}(),B=function(b){a.before(b);G?(e.removeClass(k).css(A).eq(b).addClass(k).css(z),
p=b,setTimeout(function(){a.after(b)},h)):e.stop().fadeOut(h,function(){c(this).removeClass(k).css(A).css("opacity",1)}).eq(b).fadeIn(h,function(){c(this).addClass(k).css(z);a.after(b);p=b})};a.random&&(e.sort(function(){return Math.round(Math.random())-.5}),f.empty().append(e));e.each(function(a){this.id=y+a});f.addClass(g+" "+d);m&&m.maxwidth&&f.css("max-width",w);e.hide().css(A).eq(0).addClass(k).css(z).show();G&&e.show().css({"-webkit-transition":"opacity "+h+"ms ease-in-out","-moz-transition":"opacity "+
h+"ms ease-in-out","-o-transition":"opacity "+h+"ms ease-in-out",transition:"opacity "+h+"ms ease-in-out"});if(1<e.length){if(E<h+100)return;if(a.pager&&!a.manualControls){var H=[];e.each(function(a){a+=1;H+="<li><a href='#' class='"+y+a+"'>"+a+"</a></li>"});l.append(H);m.navContainer?c(a.navContainer).append(l):f.after(l)}a.manualControls&&(l=c(a.manualControls),l.addClass(g+"_tabs "+d+"_tabs"));(a.pager||a.manualControls)&&l.find("li").each(function(a){c(this).addClass(y+(a+1))});if(a.pager||a.manualControls)r=
l.find("a"),t=function(a){r.closest("li").removeClass(x).eq(a).addClass(x)};a.auto&&(v=function(){q=setInterval(function(){e.stop(!0,!0);var b=p+1<D?p+1:0;(a.pager||a.manualControls)&&t(b);B(b)},E)},v());n=function(){a.auto&&(clearInterval(q),v())};a.pause&&f.hover(function(){clearInterval(q)},function(){n()});if(a.pager||a.manualControls)r.bind("click",function(b){b.preventDefault();a.pauseControls||n();b=r.index(this);p===b||c("."+k).queue("fx").length||(t(b),B(b))}).eq(0).closest("li").addClass(x),
a.pauseControls&&r.hover(function(){clearInterval(q)},function(){n()});if(a.nav){g="<a href='#' class='"+F+" prev'>"+a.prevText+"</a><a href='#' class='"+F+" next'>"+a.nextText+"</a>";m.navContainer?c(a.navContainer).append(g):f.after(g);var d=c("."+d+"_nav"),I=d.filter(".prev");d.bind("click",function(b){b.preventDefault();b=c("."+k);if(!b.queue("fx").length){var d=e.index(b);b=d-1;d=d+1<D?p+1:0;B(c(this)[0]===I[0]?b:d);(a.pager||a.manualControls)&&t(c(this)[0]===I[0]?b:d);a.pauseControls||n()}});
a.pauseControls&&d.hover(function(){clearInterval(q)},function(){n()})}}if("undefined"===typeof document.body.style.maxWidth&&m.maxwidth){var J=function(){f.css("width","100%");f.width()>w&&f.css("width",w)};J();c(K).bind("resize",function(){J()})}})}})(jQuery,this,0);



