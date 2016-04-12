(function customForm () {
	'use strict';

	var dependencies = [
		'component.customForm.dialog'
	];
	
	angular
		.module('component.customForm', dependencies)
		.service('component.customForm.data', [
			function customFormData () {
				var scope,
					attrs;

				this.onData = function (event, data) {
					scope.form = data;
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
					
					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.data', this.onData);
				};
			}
		])
		.service('component.customForm.responseHandler', [
			function responseHandler () {
				var scope,
					attrs;

				function error (status, messages) {
					delete scope.success;

					scope.error = {
						status : status,
						messages : messages
					};

					scope.$emit((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.responseHandler.error', scope.error);
				}

				function success () {
					scope.success = true;

					delete scope.error;

					scope.$emit((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.responseHandler.success', scope.model);
				}

				this.onResponse = function (responses) {
					delete scope.request;

					if (responses.status !== 200) {
						error(responses.status, responses.message);

						return;
					}

					success();
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
				};
			}
		])
		.service('component.customForm.requestHandler', [
			'async',
			'component.customForm.responseHandler',
			function requestHandler (async, responseHandler) {
				var scope,
					attrs;

				this.request = function () {
					delete scope.success;
					delete scope.error;

					scope.request = true;

					async({
						url : scope.form.action,
						params : scope.model
					})[scope.form.method || 'post']().$promise.then(responseHandler.onResponse);

					scope.$emit((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.requestHandler.request');
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					responseHandler.assign(scope, attrs);
				};
			}
		])
		.service('component.customForm.control', [
			'component.customForm.requestHandler',
			function customFormControl (requestHandler) {
				var scope,
					attrs;

				function reset (event, keep) {
					if (keep) {
						return;
					}
					
					scope.model = {};
				}

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					scope.model = {};
					scope.loading = false;
					scope.submit = requestHandler.request;
					scope.reset = reset;

					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'customForm.reset', reset);

					requestHandler.assign(scope, attrs);
				};
			}
		])
		.directive('customForm', [
			function directive () {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/customForm/customForm.html',
					controller : 'component.customForm.controller'
				};
			}
		])
		.controller('component.customForm.controller', [
			'$scope',
			'$attrs',
			'component.customForm.data',
			'component.customForm.control',
			function controller (scope, attrs, customFormData, customFormControl) {
				customFormData.assign(scope, attrs);
				customFormControl.assign(scope, attrs);
			}
		]);
}());
