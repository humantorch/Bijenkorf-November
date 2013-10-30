/*jslint browser: true, devel: true */
/*global imagesLoaded, Swiper, $, $$*/

var BKF = BKF || {};

BKF.Global = (function (window, document, undefined) {

	'use strict';
    function touch() {
        return ('ontouchstart' in window) ? true : false;
    }

    var DOWN = touch() === false ? 'mousedown' : 'touchstart',
		UP = touch() === false ? 'mouseup' : 'touchend',
		self;

	self = {

        init: function() {
			/* NON-IPAD WARNING*/

			// if (navigator.userAgent.match(/iPad/i) === null) {
			// 	alert('Please view this experience on an iPad or iOS Simulator.');
			// }

			/*INITIAL SETUP*/

			document.ontouchmove = function(e){ e.preventDefault(); }; // fix for swiping going all bendy-wendy

			var flipyo = document.location.hash !== '' ? document.location.hash : '#cosmetic', // WHICH ONE SHOWS BY DEFAULT
				$flipyo = $(flipyo),
				bodyswiper,
				scenehash = document.location.hash.substr(1) === '' ? 'toys' : document.location.hash.substr(1),
				fliphash = {
					'toys'				: 0,
					'stationery'		: 1,
					'menswomensgifts'	: 2,
					'mensgifts'			: 3,
					'cosmetic'			: 4
				};


				// console.log(flipyo);

			// $('.storefront iframe').src = $flipyo.dataset.shopurl;

			// self.swipegasm();


			imagesLoaded($('.imagesloaded'), function() {
				self.contshow();
				bodyswiper.swipeTo(fliphash[scenehash],0);
			});

			bodyswiper = new Swiper(document.body,{
				mode: 'horizontal',
				speed: 500,
				slideVisibleClass: 'active',
				// loop: true,
				onSlideChangeStart: function() {
					$('.shop').classList.add('visuallyhidden');
				},
				onSlideChangeEnd: function() {
					$('.storefront iframe').src = $('.active').dataset.shopurl;
					$('.shop').classList.remove('fadeIn');
					setTimeout(function() {
						$('.shop').classList.remove('visuallyhidden');
					},500);
					[].forEach.call( $$('.light'), function(el) {
						el.classList.remove('shown');
					});
					[].forEach.call( $$('.candle'), function(el) {
						el.classList.remove('ignited');
					});
					[].forEach.call( $$('.flame'), function(el) {
						el.classList.remove('ignited');
					});
					[].forEach.call( $$('.miffie'), function(el) {
						el.classList.remove('ignited');
					});
					[].forEach.call( $$('.licht'), function(el) {
						el.classList.remove('uit');
						el.classList.add('aan');
						el.innerHTML = 'Licht aan';
					});
					$('body').scrollLeft = 0;
				}
				
			});


			/*EVENT LISTENERS*/
			$('.shop').addEventListener(UP ,function() {
				$('.storefront').classList.add('fadeIn');
				$('.storefront').classList.add('shown');
			});

			$('.closebtn').addEventListener(UP, function() {
				$('.storefront').classList.remove('fadeIn');
				setTimeout(function() {
					$('.storefront').classList.remove('shown');
				},500);
			});

			document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('section .switch') || e.target.webkitMatchesSelector('section .licht')) {
					
					// console.log(e.target.parentNode.id)

					$('#'+e.target.parentNode.id).classList.toggle('lit');
					$('#'+e.target.parentNode.id+' .light').classList.toggle('shown');

					if ((e.target.parentNode.id) === 'cosmetic') {
						if ($('#'+e.target.parentNode.id).classList.contains('lit')) {
							// beep(e.target.parentNode.dataset.audio);
							// $('#'+e.target.parentNode.id + ' audio').play();
						}
					} else {
						// beep(e.target.parentNode.dataset.audio);
						// $('#'+e.target.parentNode.id + ' audio').play();
						// if (e.target.parentNode.id.classList.hasClass('lit')) {
						// 	beep(e.target.parentNode.dataset.audio);
						// }
					}

					$('.shop span').innerHTML = $('#'+e.target.parentNode.id).dataset.buttoncopy;
					$('.shop').classList.toggle('fadeIn');

					$('#'+e.target.parentNode.id+' .licht').classList.toggle('aan');
					$('#'+e.target.parentNode.id+' .licht').classList.toggle('uit');

					if ($('#'+e.target.parentNode.id+' .licht').innerHTML === 'Licht aan') {
						$('#'+e.target.parentNode.id+' .licht').innerHTML = 'Licht uit';
					} else {
						$('#'+e.target.parentNode.id+' .licht').innerHTML = 'Licht aan';
					}

					[].forEach.call( $$('#'+e.target.parentNode.id+' .candle'), function(el) {
						el.classList.toggle('ignited');
					});
					[].forEach.call( $$('#'+e.target.parentNode.id+' .flame'), function(el) {
						el.classList.toggle('ignited');
					});
					[].forEach.call( $$('#'+e.target.parentNode.id+' .miffie'), function(el) {
						el.classList.toggle('ignited');
					});
				}
			}, false);

        },

        contshow: function() {
			setTimeout( function() {
				document.body.classList.add('loaded');
				[].forEach.call( $$('section'), function(el) {
					el.classList.remove('inactive');
					el.classList.remove('active');
				});
				$('.storefront iframe').src = $('#cosmetic').dataset.shopurl;
			},500);
        }

	};

    return self;
} (this, this.document));


