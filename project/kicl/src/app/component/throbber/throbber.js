(function throbber () {
	'use strict';

	var link = function (scope, elm, attr) {
		function show (event, data) {
			scope.throbber.show = true;
		}

		function hide (event, data) {
			scope.throbber.show = false;
		}

		scope.throbber = {};
		scope.throbber.show = true;
		scope.throbber.emitFrom = attr.emitFrom;

		scope.$on(attr.emitFrom + '.throbber.show', show);
		scope.$on(attr.emitFrom + '.throbber.hide', hide);
	};

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/throbber/throbber.html',
			link : link
		};
	}

	angular.module('component.throbber', [])
		.directive('throbber', [
			directive
		]);
}());
