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
			if (navigator.userAgent.match(/iPad/i) === null) {
				alert("Please view this experience on an iPad or iOS Simulator.");
			}

			/*INITIAL SETUP*/
			// self.dust();

			imagesLoaded($('.imagesloaded'), function() {
				self.contshow();
				// $zp_vid.play();
			});

			// var bodyswiper = new Swiper(document.body,{
			// 	mode: 'horizontal',
			// 	speed: 300,
			// 	wrapperClass : 'bodyswiper',
			// 	slideClass : 'swiper-section',
			// 	slideVisibleClass : 'section-visible'
			// });

			/*EVENT LISTENERS*/

			var $bright = $('#bright'),
				$dark = $('#dark'),
				$grad = $('.lampgrad'),
				t;

			// $zp_vid.addEventListener(UP, function() {
			// 	this.pause();
			// });

			document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('nav li')) {
					var active = $('.active'),
					target = document.getElementById((e.target.dataset.trigger).toString());
					active.classList.toggle('inactive');
					active.classList.toggle('active');
					target.classList.toggle('inactive');
					target.classList.toggle('active');
				} else if (e.target.webkitMatchesSelector('section .switch')) {
					// console.log(e.target.parentNode.id);
					$('#'+e.target.parentNode.id).classList.toggle('lit');
					$('#'+e.target.parentNode.id+' .light').classList.toggle('shown');

					[].forEach.call( $$('#'+e.target.parentNode.id+' .candle'), function(el) {
						el.classList.toggle('ignited');
					});

					[].forEach.call( $$('#'+e.target.parentNode.id+' .miffie'), function(el) {
						el.classList.toggle('ignited');
					});



					// var Matchstrike = document.createElement('audio');
					// 	Matchstrike.setAttribute('src', 'media/audio/'+e.target.parentNode.dataset.audio);
					// 	Matchstrike.load();
					// 	Matchstrike.play();
				}
			}, false);

			//ZP video




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

        dust: function() {
			// DUST STUFF
			var SCREEN_WIDTH = window.innerWidth,
				SCREEN_HEIGHT = window.innerHeight,
				container,
				particle,
				camera,
				scene,
				renderer,
				mouseX = 0,
				mouseY = 0,
				particles = [],
				particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );

			particleImage.src = document.getElementById('dustparticle').getAttribute('src');



			function snowinit() {

				container = document.createElement('div');
				container.classList.add('dustbox');
				document.body.appendChild(container);

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();
				scene.add(camera);
					
				renderer = new THREE.CanvasRenderer();
				renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
				var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
					
				for (var i = 0; i < 50; i++) {

					particle = new Particle3D( material);
					particle.position.x = Math.random() * 2000 - 1000;
					particle.position.y = Math.random() * 2000 - 1000;
					particle.position.z = Math.random() * 25;
					particle.scale.x = particle.scale.y =  1;
					scene.add( particle );
					
					particles.push(particle);
				}

				container.appendChild( renderer.domElement );
				setInterval( loop, 1000 / 60 );
			}

			

			//

			function loop() {
				for(var i = 0; i<particles.length; i++) {
					var particle = particles[i];
					particle.updatePhysics();

					if(particle.position.y<-1000) {
						particle.position.y+=2000;
					}

					if(particle.position.x>1000) {
						particle.position.x-=2000;
					} else if(particle.position.x<-1000) {
						particle.position.x+=2000;
					}

					if(particle.position.z>1000) {
						particle.position.z-=2000;
					} else if(particle.position.z<-1000) {
						particle.position.z+=2000;
					}
				}

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				camera.lookAt(scene.position);

				renderer.render( scene, camera );
			}

			snowinit();
        }

	};

    return self;
} (this, this.document));



