(function cube () {
	'use strict';

	THREE.Color.prototype.getHSV = function () {
		var rr, gg, bb,
			h, s,
			r = this.r,
			g = this.g,
			b = this.b,
			v = Math.max(r, g, b),
			diff = v - Math.min(r, g, b),
			diffc = function (c) {
				return (v - c) / 6 / diff + 1 / 2;
			};

		if (diff === 0) {
			h = s = 0;
		} else {
			s = diff / v;
			rr = diffc(r);
			gg = diffc(g);
			bb = diffc(b);

			if (r === v) {
				h = bb - gg;
			} else if (g === v) {
				h = (1 / 3) + rr - bb;
			} else if (b === v) {
				h = (2 / 3) + gg - rr;
			}
			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}
		return {
			h: h,
			s: s,
			v: v
		};
	};

	var dependencies = [];

	angular
		.module('view.experiments.experiment.cube', dependencies)
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('cube', { name : 'cube', route : 'experiments.experiment({ experiment : "cube" })' }, 'experiments');
			}
		])
		.service('view.experiments.cube.render', [
			'$window',
			function render (_win) {
				var win = angular.element(_win);

				var element;

				var scene = new THREE.Scene();
				
				var camera = new THREE.PerspectiveCamera(75, 1, window.innerWidth / window.innerHeight, 10000);
				
				var renderer = new THREE.WebGLRenderer({ alpha: true });
				
				var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
				
				var material = new THREE.MeshBasicMaterial({color: 0xf39943, wireframe: true});
				
				var cube = new THREE.Mesh(geometry, material);

				var animateId;

				var delay = 0;

				var zoom = 1500;

				var lastLoop = new Date();

				var changeItems = {};

				function Tween (target) {
					this.delay = 0;
					this.target = new TWEEN.Tween(target);
				}

				Tween.prototype.render = function (prop, duration) {
					if (this.delay < duration * fps()) {
						this.delay += 1;

						return;
					}

					this.target.to(prop, duration * 1000).start();

					this.delay = 0;
				};

				function randomNum (max) {
					return Math.floor(Math.random() * max);
				}

				function fps () { 
					var thisLoop = new Date();
					var rate = 1000 / (thisLoop - lastLoop);

					lastLoop = thisLoop;

					return rate;
				}
				
				function render () {
					changeItems.rotation.render({x : '+0.1', y : '+0.1', z : '-0.1'}, 1);
					changeItems.color.render({r : randomNum(256 / 100), g : randomNum(256 / 100), b : randomNum(256 / 100)}, 2);
					changeItems.camera.render({z : randomNum(zoom)}, 5);

					renderer.render(scene, camera);

					TWEEN.update();

					animateId = requestAnimationFrame(render);
				}

				geometry.dynamic = true;
				
				camera.position.z = zoom;

				changeItems.rotation = new Tween(cube.rotation);
				changeItems.color = new Tween(cube.material.color);
				changeItems.camera = new Tween(camera.position);

				this.draw = function () {
					var size = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

					renderer.setSize(size, size);

					element.append(renderer.domElement);
					
					scene.add(cube);

					render();
				};

				function resize () {
					var size = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

					renderer.setSize(size, size);
				};

				this.destroy = function () {
					win.unbind('resize', resize);

					cancelAnimationFrame(animateId);
				};

				this.assign = function (elementRef) {
					element = elementRef;

					win.bind('resize', resize);
				};
			}
		])
		.controller('view.experiments.cube.controller', [
			'$scope',
			'$element',
			'view.experiments.cube.render',
			function controller (scope, element, render) {
				render.assign(element);
				render.draw();

				scope.$on('$destroy', render.destroy);
			}
		]);
}());