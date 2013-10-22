/*jslint browser: true, devel: true */
/*global imagesLoaded, log, camera, THREE, Particle3D, $, $$*/

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

			var flipyo = document.location.hash !== '' ? document.location.hash : '#cosmetic',
				$flipyo = $(flipyo),
				$flipyoNext = $flipyo.nextElementSibling === null ? $('section:first-child') : $flipyo.nextElementSibling,
				$flipyoPrev = $flipyo.previousElementSibling === null ? $('section:last-child') : $flipyo.previousElementSibling;

			$flipyo.classList.remove('inactive');
			$flipyo.classList.add('active');

			$flipyoNext.classList.add('nextnode');
			$flipyoPrev.classList.add('prevnode');

			self.swipegasm();

			imagesLoaded($('.imagesloaded'), function() {
				self.contshow();
			});

			/*EVENT LISTENERS*/

			var $bright = $('#bright'),
				$dark = $('#dark'),
				$grad = $('.lampgrad'),
				t;


			$('.shop').addEventListener(UP ,function() {
				//self.fetchtehjsonz($('.active').dataset.shopurl, 'BKF.Global.parsetehjsonz');
				$('.storefront').classList.add('fadeIn');
			});

			$('.closebtn').addEventListener(UP, function() {
				$('.storefront').classList.remove('fadeIn');
			});

			document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('section .switch')) {
					// var Beep = document.createElement('audio');
					// Beep.setAttribute('src', 'media/audio/'+e.target.parentNode.dataset.audio);
					// Beep.load();
					// Beep.play();

					// console.log(e.target.parentNode.id);
					$('#'+e.target.parentNode.id).classList.toggle('lit');
					$('#'+e.target.parentNode.id+' .light').classList.toggle('shown');

					$('.shop span').innerHTML = $('#'+e.target.parentNode.id).dataset.buttoncopy;
					$('.shop').classList.toggle('fadeIn');

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

			




			// $bright.addEventListener(DOWN,function() {
			// 	t = setInterval(function() {
			// 		self.enbrighten($grad);
			// 	},17);
			// });

			// $bright.addEventListener(UP,function() {
			// 	clearInterval(t);
			// });

			// $dark.addEventListener(DOWN,function() {
			// 	t = setInterval(function() {
			// 		self.endarken($grad);
			// 	},17);
			// });

			// $dark.addEventListener(UP,function() {
			// 	clearInterval(t);
			// });

        },

        contshow: function() {
			document.body.classList.add('loaded');
        },

        enbrighten: function(target) {
			if(parseFloat(target.style.opacity)<=1) {
				target.style.opacity = parseFloat(target.style.opacity)+0.01;
			}
        },

        endarken: function(target) {
			if(parseFloat(target.style.opacity)>0) {
				target.style.opacity = parseFloat(target.style.opacity)-0.01;
			}
        },

        fetchtehjsonz: function(mag, callback) {
			var script = document.createElement('script');
			script.src = mag+callback;
			document.head.appendChild(script);
        },

        parsetehjsonz: function(json) {
			alert(json.Data[0].Price);
        },

        swipegasm: function() {
			// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT
			// Courtesy of PADILICIOUS.COM and MACOSXAUTOMATION.COM

			// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger

			var $swipeBox = $('#swipeBox');

			$swipeBox.addEventListener('touchstart', function() {
				touchStart(event,'swipeBox');
			}, false);

			$swipeBox.addEventListener('touchend', function() {
				touchEnd(event);
			}, false);

			$swipeBox.addEventListener('touchmove', function() {
				touchMove(event);
			}, false);

			$swipeBox.addEventListener('touchcancel', function() {
				touchCancel();
			}, false);
			// ontouchstart="touchStart(event,'swipeBox');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);"

			var triggerElementID = null, // this variable is used to identity the triggering element,
				fingerCount = 0,
				startX = 0,
				startY = 0,
				curX = 0,
				curY = 0,
				deltaX = 0,
				deltaY = 0,
				horzDiff = 0,
				vertDiff = 0,
				minLength = 72, // the shortest distance the user may swipe
				swipeLength = 0,
				swipeAngle = null,
				swipeDirection = null;

			// The 4 Touch Event Handlers

			// NOTE: the touchStart handler should also receive the ID of the triggering element
			// make sure its ID is passed in the event call placed in the element declaration, like:
			// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">
			function caluculateAngle() {
				var X = startX-curX,
					Y = curY-startY,
					r = Math.atan2(Y,X); //angle in radians (Cartesian system)

				swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
				if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
			}

			function touchCancel() {
				// reset the variables back to default values
				fingerCount = 0;
				startX = 0;
				startY = 0;
				curX = 0;
				curY = 0;
				deltaX = 0;
				deltaY = 0;
				horzDiff = 0;
				vertDiff = 0;
				swipeLength = 0;
				swipeAngle = null;
				swipeDirection = null;
				triggerElementID = null;
			}

			function touchStart(event,passedName) {
				// disable the standard ability to select the touched object
				event.preventDefault();
				// get the total number of fingers touching the screen
				fingerCount = event.touches.length;
				// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
				// check that only one finger was used
				if ( fingerCount === 1 ) {
					// get the coordinates of the touch
					startX = event.touches[0].pageX;
					startY = event.touches[0].pageY;
					// store the triggering element ID
					triggerElementID = passedName;
				} else {
					// more than one finger touched so cancel
					touchCancel(event);
				}
			}

			function touchMove(event) {
				event.preventDefault();
				if ( event.touches.length === 1 ) {
					curX = event.touches[0].pageX;
					curY = event.touches[0].pageY;
					// console.log(curX);

					swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));

					// console.log(swipeLength);

					if (swipeLength > 75 && swipeLength < 200) {
						caluculateAngle();
						determineSwipeDirection();
						processingRoutine();
						touchCancel(event); // reset the variables
					}
				} else {
					touchCancel(event);
				}
			}

			function processingRoutine() {
				var curNode = $('.active'),
					nextNode, prevNode,
					nextNextNode, prevPrevNode,
					$storefront = $('.storefront iframe'),
					shopurl;

				nextNode = curNode.nextElementSibling === null ? $('section:first-child') : curNode.nextElementSibling;
				prevNode = curNode.previousElementSibling === null ? $('section:last-child') : curNode.previousElementSibling;

				// yeah, I know. This is stupid but I'm stupid and in a rush and STOP LOOKING AT ME.
				nextNextNode = nextNode.nextElementSibling === null ? $('section:first-child') : nextNode.nextElementSibling;
				prevPrevNode = prevNode.previousElementSibling === null ? $('section:last-child') : prevNode.previousElementSibling;

				function clear() {
					curNode.classList.add('inactive');
					curNode.classList.remove('active');
					
					$('.shop').classList.remove('fadeIn');
					$('.shop').classList.add('visuallyhidden');
					setTimeout(function() {
						$('.shop').classList.remove('fadeIn');
					},500);

					setTimeout(function() {
						$('.shop').classList.remove('visuallyhidden');
					},1000);

					if ($('.shown') !== null) {
						$('.shown').classList.remove('shown');
					}

					$('.storefront').classList.remove('fadeIn');

					[].forEach.call( $$('.candle'), function(el) {
						el.classList.remove('ignited');
					});
					[].forEach.call( $$('.flame'), function(el) {
						el.classList.remove('ignited');
					});
					[].forEach.call( $$('.miffie'), function(el) {
						el.classList.remove('ignited');
					});
				}
				
				// console.log(swipeDirection);

				if ( swipeDirection === 'left' ) {
					clear();


					curNode.classList.add('prevnode');
					nextNode.classList.remove('nextnode');
					nextNode.classList.toggle('inactive');
					nextNode.classList.toggle('active');

					nextNextNode.classList.remove('prevnode');
					nextNextNode.classList.add('nextnode');

					shopurl = $('.active').dataset.shopurl;
					$storefront.src = shopurl;

				} else if ( swipeDirection === 'right' ) {
					clear();

					curNode.classList.add('nextnode');
					prevNode.classList.remove('prevnode');
					prevNode.classList.toggle('inactive');
					prevNode.classList.toggle('active');

					prevPrevNode.classList.remove('nextnode');
					prevPrevNode.classList.add('prevnode');

					shopurl = $('.active').dataset.shopurl;
					$storefront.src = shopurl;
				}
			}

			function determineSwipeDirection() {
				if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
					swipeDirection = 'left';
				} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
					swipeDirection = 'left';
				} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
					swipeDirection = 'right';
				} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
					swipeDirection = 'down';
				} else {
					swipeDirection = 'up';
				}
			}

			function touchEnd(event) {
				event.preventDefault();
				// check to see if more than one finger was used and that there is an ending coordinate
				if ( fingerCount === 1 && curX !== 0 ) {
					// use the Distance Formula to determine the length of the swipe
					swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
					// if the user swiped more than the minimum length, perform the appropriate action
					if ( swipeLength >= minLength ) {
						// caluculateAngle();
						// determineSwipeDirection();
						// processingRoutine();
						// touchCancel(event); // reset the variables
					} else {
						touchCancel(event);
					}
				} else {
					touchCancel(event);
				}
			}
        }

	};

    return self;
} (this, this.document));











