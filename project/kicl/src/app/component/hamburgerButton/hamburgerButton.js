(function hamburgerButton () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.hamburgerButton', dependencies)
		.service('component.hamburgerButton.render', [
			'$rootScope',
			function (root) {
				var scope,
					attrs,
					eventName;

				this.open = function (event, prop) {
					scope.closed = false;

					if (prop && prop.doNotBroadcast) {
						return;
					}

					root.$broadcast(eventName + 'render.open');
				};

				this.close = function (event, prop) {
					scope.closed = true;
					
					if (prop && prop.doNotBroadcast) {
						return;
					}

					root.$broadcast(eventName + 'render.close');
				};

				this.troggle = function (event, prop) {
					if (scope.closed) {
						this.open(event, prop);

						return;
					}

					this.close(event, prop);
				}.bind(this);

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
					eventName = (attrs.emitTo ? attrs.emitFrom + '.' : '') + 'hamburgerButton.';

					scope.$on(eventName + 'open', this.open);
					scope.$on(eventName + 'close', this.close);
					scope.$on(eventName + 'toggle', this.troggle);

					if (attrs.closeOnDefault === 'close') {
						this.close();

						return;
					}

					this.open();
				};
			}
		])
		.service('component.hamburgerButton.resource', [
			function () {
				var scope;

				function hasResource (event, resource) {
					scope.resource = resource;
				}
				
				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.$on('kicl.component.hamburgerButton.resource', hasResource);
				};
			}
		])
		.directive('hamburgerButton', [
			function directive (root, sitemap, render) {
				return {
					restrict : 'E',
					replace : true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/hamburgerButton/hamburgerButton.html',
					controller : 'component.hamburgerButton.controller'
				};
			}
		])
		.controller('component.hamburgerButton.controller', [
			'$scope',
			'$attrs',
			'component.hamburgerButton.render',
			'component.hamburgerButton.resource',
			function controller (scope, attrs, render, resource) {
				render.assign(scope, attrs);
				resource.assign(scope);

				scope.control = {};
				scope.control.click = render.troggle;
			}
		]);
}());
