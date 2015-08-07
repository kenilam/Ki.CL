(function globalHeader () {
	'use strict';

	function link (scope) {
		var callback = {
				data : function (event, data) {
					function eachData (value, name) {
						scope.globalHeader[name] = value;
					}

					_.each(data, eachData);
				},
				expand : function () {
					scope.globalHeader.status.expanded = true;
				},
				collapse : function () {
					delete scope.globalHeader.status.expanded;
				}
			},
			control = {
				troggle : function () {
					scope.globalHeader.status.expanded = !scope.globalHeader.status.expanded;
				}
			};

		scope.globalHeader = {};
		scope.globalHeader.status = {};

		scope.globalHeader.control = control;

		scope.$on('globalHeader.data', callback.data);
		scope.$on('globalHeader.expand', callback.expand);
		scope.$on('globalHeader.collapse', callback.collapse);
	}

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalHeader/globalHeader.html',
			link : link
		};
	}

	angular.module('component.globalHeader', [])
		.directive('globalHeader', [
			directive
		]);
}());
