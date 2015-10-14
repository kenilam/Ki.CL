(function throbber () {
	'use strict';

	var controller = [
		'$scope',
		'$timeout',
		function controller (scope, timeout) {
			scope.throbber = {};
			scope.throbber.timer = {};
			scope.throbber.control = {};
			
			scope.throbber.control.show = function (event, data) {
				scope.throbber.show = true;
			};

			scope.throbber.control.hide = function (event, data) {
				delete scope.throbber.show;
			};
		}
	];

	function link (scope, elm, attr) {
		scope.$on(attr.emitFrom + '.throbber.show', scope.throbber.control.show);
		scope.$on(attr.emitFrom + '.throbber.hide', scope.throbber.control.hide);

		scope.throbber.show = Boolean(attr.showOnDefault === 'true');
	}

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : true,
			templateUrl : 'app/component/throbber/throbber.html',
			link : link,
			controller : controller
		};
	}

	angular.module('component.throbber', [])
		.directive('throbber', [
			directive
		]);
}());
