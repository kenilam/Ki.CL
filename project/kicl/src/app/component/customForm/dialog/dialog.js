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

					if (scope.model.message) {
						// scope.model.message = scope.model.message.split('\n').filter(function (pg) { return pg !== ''; });
					}

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
		.service('component.customForm.dialog.data', [
			function customFormData () {
				var scope,
					attrs;

				this.onData = function (event, data) {
					scope.resource = data;
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
					
					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.dialog.data', this.onData);
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
			'component.customForm.dialog.data',
			'component.customForm.dialog.event',
			function controller (scope, attrs, dialogData, dialogEvent) {
				dialogData.assign(scope, attrs);
				dialogEvent.assign(scope, attrs);
			}
		]);
}());
