(function throbber () {
	'use strict';

	angular.module('component.throbber', [])
		.directive('throbber', [
			function directive () {
				return {
					restrict : 'E',
					replace : true,
					scope : true,
					templateUrl : 'app/component/throbber/throbber.html',
					controller : 'component.throbber.controller'
				};
			}
		])
		.service('component.throbber.render', [
			function render () {
				var scope,
					attr;

				this.show = function () {
					scope.show = true;
				};

				this.hide = function () {
					delete scope.show;
				};

				this.assign = function (scopeRef, attrRef) {
					scope = scopeRef;
					attr = attrRef;
					
					scope.show = Boolean(attr.showOnDefault === 'true');

					scope.$on(attr.emitFrom + '.throbber.show', this.show);
					scope.$on(attr.emitFrom + '.throbber.hide', this.hide);
				};
			}
		])
		.controller('component.throbber.controller', [
			'$scope',
			'$attrs',
			'component.throbber.render',
			function controller (scope, attrs, render) {
				render.assign(scope, attrs);
			}
		]);
}());
