/*jslint browser: true, devel: true */
/*global imagesLoaded*/

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
			/*INITIAL SETUP*/

			imagesLoaded(document.body, function() {
				self.contshow();
			});


			/*EVENT LISTENERS*/

			var $bright = document.querySelector('#bright'),
				$dark = document.querySelector('#dark'),
				$grad = document.querySelector('.grad'),
				t;


			// Best to swap these to 'touchstart' and 'touchend' for production, but for now it's easier to test on a desktop set up like this

			$bright.addEventListener(DOWN,function() {
				t = setInterval(function() {
					self.enbrighten($grad);
				},17);
			});

			$bright.addEventListener(UP,function() {
				clearInterval(t);
			});

			$dark.addEventListener(DOWN,function() {
				t = setInterval(function() {
					self.endarken($grad);
				},17);
			});

			$dark.addEventListener(UP,function() {
				clearInterval(t);
			});

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
        }

	};

    return self;
} (this, this.document));