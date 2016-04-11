(function navigation () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.navigation', dependencies)
		.service('navigation.list', [
			'sitemap',
			function list (sitemap) {
				var scope,
					attrs;

				this.get = function () {
					return scope.list;
				};

				this.set = function () {
					scope.list = sitemap.get(attrs.list);
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;
				};
			}
		])
		.service('navigation.current', [
			'$state',
			'navigation.list',
			function current (state, list) {
				var scope;

				function set (list, index) {
					scope.current = list;

					if (scope.current.index !== undefined) {
						return;
					}

					scope.current.index = index;
				}

				this.check = function () {
					var lists = list.get();

					Object.keys(lists).forEach(function checkList (name, index) {
						if (lists[name].route !== state.current.name) {
							return;
						}
						
						set(lists[name], index);
					});
				};

				this.assign = function (scopeRef, attrs) {
					scope = scopeRef;

					scope.$on('$stateChangeSuccess', this.check);
				};
			}
		])
		.service('navigation.vertical', [
			function vertical () {
				var scope,
					attrs;

				this.set = function () {
					scope.vertical = true;
				};

				this.unset = function () {
					delete scope.vertical;
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '' ) + 'navigation.set.vertical', this.set);
					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '' ) + 'navigation.unset.vertical', this.unset);
				};
			}
		])
		.directive('navigation', [
			function directive (root, timeout, state, sitemap) {
				return {
					restrict : 'E',
					replace : true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/navigation/navigation.html',
					controller : 'navigation.controler'
				};
			}
		])
		.controller('navigation.controler', [
			'$scope',
			'$attrs',
			'navigation.list',
			'navigation.current',
			'navigation.vertical',
			function controller (scope, attrs, list, current, vertical) {
				list.assign(scope, attrs);
				current.assign(scope);
				vertical.assign(scope, attrs);

				list.set();
				current.check();
			}
		]);
}());
