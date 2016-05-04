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
			function render () {
				var element;

				var scene = new THREE.Scene();
				
				var camera = new THREE.PerspectiveCamera(75, 1, window.innerHeight / window.innerWidth, 10000);
				
				var renderer = new THREE.WebGLRenderer({ alpha: true });
				
				var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
				
				var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
				
				var cube = new THREE.Mesh(geometry, material);

				var animateId;
				
				function render() {
					animateId = requestAnimationFrame(render);
					
					cube.rotation.x += 0.01;
					cube.rotation.y += 0.01;

					renderer.render(scene, camera);
				}
				
				camera.position.z = 1000;

				this.draw = function () {
					renderer.setSize(window.innerHeight, window.innerHeight);
					
					element[0].appendChild(renderer.domElement);
					
					scene.add(cube);

					render();
				};

				this.destroy = function () {
					cancelAnimationFrame(animateId);
				};

				this.assign = function (elementRef) {
					element = elementRef;
				};
			}
		])
		.controller('view.experiments.cube.controller', [
			'$rootScope',
			'$scope',
			'$element',
			'view.experiments.cube.render',
			function controller (root, scope, element, render) {
				render.assign(element);
				render.draw();

				scope.$on('$destroy', render.destroy);
			}
		]);
}());