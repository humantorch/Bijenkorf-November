/*jslint browser: true, devel: true */
/*global imagesLoaded, log*/

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

			// snowFall.snow(document.body, {minSize: 10, maxSize:10, round:true, shadow:false,minSpeed:0.5, maxSpeed:1, flakeCount:10, flakeColor: 'rgba(255,255,255,'+parseFloat( Math.random().toFixed(1) )+')'}
			// );

			imagesLoaded(document.body, function() {
				self.contshow();
			});

			/*EVENT LISTENERS*/

			var $bright = document.querySelector('#bright'),
				$dark = document.querySelector('#dark'),
				$grad = document.querySelector('.lampgrad'),
				t;

			document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('nav li')) {
					var active = document.querySelector('.active'),
					target = document.getElementById((e.target.dataset.trigger).toString());
					active.classList.toggle('inactive');
					active.classList.toggle('active');
					target.classList.toggle('inactive');
					target.classList.toggle('active');
				} else if (e.target.nodeName === 'SECTION') {

					document.querySelector('#'+e.target.id+' .light').classList.toggle('shown');
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
        }

	};

    return self;
} (this, this.document));