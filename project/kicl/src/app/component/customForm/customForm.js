(function form () {
	'use strict';
	
	angular
		.module('component.customForm', [])
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
		.service('component.customForm.control', [
			'async',
			function customFormControl (async) {
				var scope;

				this.submit = function () {
					async({
						url : scope.form.action,
						params : scope.model
					})[scope.form.method || 'post']().$promise.then(function (data) {
						console.log(data);
					});
				};

				this.reset = function () {
					scope.model = {};
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.model = {};
					scope.loading = false;
					scope.submit = this.submit;
					scope.reset = this.reset;
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
				customFormControl.assign(scope);
			}
		]);
}());
