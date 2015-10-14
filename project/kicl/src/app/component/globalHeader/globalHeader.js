(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		function controller (root, scope, element) {
			var callback = {
					eachData : function (value, name) {
						scope.globalHeader[name] = value;
					},
					data : function (event, data) {
						_.each(data, callback.eachData);
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
					},
					get : {
						height : function () {
							return element.outerHeight();
						}
					}
				},
				broadcast = {
					height : function (height) {
						root.$broadcast('globalHeader.height', height);
					}
				};

			scope.globalHeader = {};
			scope.globalHeader.status = {};
			scope.globalHeader.status.expanded = true;

			scope.globalHeader.control = control;

			scope.$on('globalHeader.data', callback.data);
			scope.$on('globalHeader.expand', callback.expand);
			scope.$on('globalHeader.collapse', callback.collapse);

			scope.$watch(control.get.height, broadcast.height);
		}
	];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalHeader/globalHeader.html',
			controller : controller
		};
	}

	angular.module('component.globalHeader', [])
		.directive('globalHeader', [
			directive
		]);
}());
