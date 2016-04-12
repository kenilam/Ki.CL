(function customFormDialog () {
	'use strict';
	
	angular
		.module('component.customForm.dialog', [])
		.service('component.customForm.dialog.control', [
			'$rootScope',
			'$window',
			function control (root, _win) {
				var scope,
					attrs,
					win = angular.element(_win),
					keyCode;

				function keyup (event) {
					if (event.keyCode !== 27) {
						return;
					}

					scope.close();

					if (!scope.$$phase) {
						scope.$apply();
					}
				}

				this.show = function () {
					scope.show = true;

					win.bind('keyup', keyup);
				};

				this.hide = function () {
					delete scope.show;

					win.unbind('keyup', keyup);

					root.$broadcast((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.dialog.hide', scope.error);
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					scope.close = this.hide;
					scope.keydown = this.keydown;
					scope.keyup = this.keyup;
				};
			}
		])
		.service('component.customForm.dialog.event', [
			'component.customForm.dialog.control',
			function event (control) {
				var scope,
					attrs;

				function success (event, model) {
					delete scope.error;

					scope.success = true;
					scope.model = model;

					control.show();
				}

				function error (event, error) {
					scope.error = error;
					
					delete scope.success;
					delete scope.model;

					control.show();

				}

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					control.assign(scope, attrs);

					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.dialog.show.success', success);
					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.dialog.show.error', error);
				};
			}
		])
		.service('component.customForm.dialog.resource', [
			function event () {
				var scope;

				function dialogResource (event, resource) {
					scope.resource = resource;
				}

				this.assign = function (scopeRef) {
					scope = scopeRef;
					
					scope.$on('kicl.component.customFormDialog.resource', dialogResource);
				};
			}
		])
		.directive('customFormDialog', [
			function directive () {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/customForm/dialog/dialog.html',
					controller : 'component.customForm.dialog.controller'
				};
			}
		])
		.controller('component.customForm.dialog.controller', [
			'$scope',
			'$attrs',
			'component.customForm.dialog.event',
			'component.customForm.dialog.resource',
			function controller (scope, attrs, event, resource) {
				event.assign(scope, attrs);
				resource.assign(scope);
			}
		]);
}());
