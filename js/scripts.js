


// phone formatting
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







// $(window).scroll(function(e){
//   parallax();	
// });

// // PARALLAX FUNCTION
// function parallax(){
//   var scrolled = $(window).scrollTop();
	
// 	// body background
// 	$('.hpy_modular').css('background-position',"50% " + (0-(scrolled*.18))+'px');
	

// 	if (document.documentElement.clientWidth > 780) {
// 		// phones
// 		$('.parallax-1').css('top',(0-(scrolled*.15))+'px');
// 		$('.parallax-2').css('top',(0+(scrolled*.09))+'px');
// 		$('.parallax-3').css('top',(0+(scrolled*.06))+'px');
// 		$('.parallax-4').css('top',(0+(scrolled*.05))+'px');
// 		$('.parallax-5').css('top',(0+(scrolled*.08))+'px');
// 	}

// };






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
      win_height_padded = $window.height() * 1,
      isTouch           = Modernizr.touch;

  if (isTouch) { $('.revealOnScroll').addClass('animated'); }

  $window.on('scroll', revealOnScroll);

  function revealOnScroll() {
    var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * 1;

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

