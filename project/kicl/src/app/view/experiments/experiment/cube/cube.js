(function cube () {
	'use strict';

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
			'fps',
			function render (_win, fps) {
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

				var changeItems = {};

				function Tween (target) {
					this.delay = 0;
					this.target = new TWEEN.Tween(target);
				}

				Tween.prototype.render = function (prop, duration) {
					var frames = fps.get();

					if (this.delay <= duration * frames) {
						this.delay += 1;

						return;
					}

					this.target.to(prop, duration * 1000).start();

					this.delay = 0;
				};

				function randomNum (max) {
					return Math.floor(Math.random() * max);
				}
				
				function render () {
					changeItems.rotation.render({x : '+0.01', y : '+0.01', z : '-0.01'}, 0.1);
					changeItems.color.render({r : randomNum(256 / 100), g : randomNum(256 / 100), b : randomNum(256 / 100)}, 3);
					changeItems.camera.render({z : randomNum(zoom)}, 10);

					renderer.render(scene, camera);

					TWEEN.update();

					animateId = requestAnimationFrame(render);
				}

				geometry.dynamic = true;
				
				camera.position.z = zoom;

				changeItems.rotation = new Tween(cube.rotation);
				changeItems.color = new Tween(cube.material.color);
				changeItems.camera = new Tween(camera.position);

				function setSize () {
					var size = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

					renderer.setSize(size, size);
				}

				function resize () {
					setSize();
				}

				this.draw = function () {
					setSize();

					element.append(renderer.domElement);
					
					scene.add(cube);

					render();
				};

				this.destroy = function () {
					win.unbind('resize', resize);

					fps.destroy();

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