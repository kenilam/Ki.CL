(function globalFooter () {

	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.globalFooter', dependencies)

		.service('component.globalFooter.height', [
			function globalFooterHeight () {
				var elm;

				function get () {
					return elm.outerHeight();
				}

				function set (height) {
					scope.emit('globalFooter.height', height);
				}

				this.assign = function (scope, elmRef) {
					elm = elmRef;

					scope.$watch(get, set);
				};
			}
		])

		.directive('globalFooter', [
			function directive (root, timeout, state, sitemap) {
				return {
					restrict : 'E',
					replace : true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/globalFooter/globalFooter.html',
					controller : 'component.globalFooter.controler'
				};
			}
		])

		.controller('component.globalFooter.controler', [
			'$scope',
			'$element',
			'component.globalFooter.height',
			function controller (scope, element, height) {
				function init () {
					height.asisgn(element);
				}
			}
		]);
}());