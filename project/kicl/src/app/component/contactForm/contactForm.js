(function contactForm () {
	'use strict';

	var controller = [
			'$scope',
			function (scope) {
				
			}
		];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/contactForm/contactForm.html',
			controller : controller
		};
	}
	
	angular.module('component.contactForm', [])
		.directive('contactForm', [
			directive
		]);
}());
