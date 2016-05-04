(function navigation () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.navigation', dependencies)
		.service('component.navigation.list', [
			'sitemap',
			function list (sitemap) {
				var scope,
					attrs;

				function update (event, map) {
					scope.list = sitemap.get(map || attrs.list);
				}

				this.get = function () {
					return scope.list;
				};

				this.set = function () {
					scope.list = sitemap.get(attrs.list);
				};

				this.assign = function (scopeRef, attrsRef) {
					scope = scopeRef;
					attrs = attrsRef;

					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '' ) + 'component.navigation.update.list', update);
				};
			}
		])
		.service('component.navigation.current', [
			'$state',
			'component.navigation.list',
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
		.service('component.navigation.vertical', [
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

					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '' ) + 'component.navigation.set.vertical', this.set);
					scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '' ) + 'component.navigation.unset.vertical', this.unset);
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
					controller : 'component.navigation.controler'
				};
			}
		])
		.controller('component.navigation.controler', [
			'$scope',
			'$timeout',
			'$element',
			'$attrs',
			'component.navigation.list',
			'component.navigation.current',
			'component.navigation.vertical',
			function controller (scope, timeout, element, attrs, list, current, vertical) {
				if (attrs.initWhen) {
					scope.$on(attrs.initWhen + '.navigation.init', init);

					return;
				}

				list.assign(scope, attrs);
				current.assign(scope);
				vertical.assign(scope, attrs);

				list.set();
				current.check();
			}
		]);
}());
