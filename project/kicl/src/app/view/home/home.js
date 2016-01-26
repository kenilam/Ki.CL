(function home () {
	'use strict';
	
	var ref = {},
		state = {
			name: 'home',
			url: '/home',
			resolve : {
				resource : ['async', 'viewHomeResource', function resource (async, viewHomeResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewHomeResource }).get().$promise;
					}

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/home/home.html',
					controller: 'view.home.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/home/home.json'
		},
		controller = [
			'$rootScope',
			'$scope',
			'$timeout',
			'$element',
			'mediaquery',
			'resource',
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, timeout, element, mediaquery, resource, sitemap, statechange, tween) {
				var background,
					logo,
					h2,
					nav;

				function behanceUserAboutData (event, data) {
					scope.$broadcast('behance.user.about.throbber.hide');
				}

				function destroy () {
					root.$broadcast('globalHeader.show');

					timeout.cancel(scope.timer.onEnter);
				}

				function whenEnter (fromState) {
					logo = element.children('.logo');
					h2 = element.children('h2');
					nav = element.children('.navigation');

					tween.killTweensOf([logo, h2, nav]);
					tween.set([logo, h2, nav], { opacity: 0, delay : fromState.name ? 0.2 : 1 });
					tween.to([logo, h2, nav], 1, { opacity: 1, delay : fromState.name ? 0.2 : 1 });
				}

				function onEnter (toState, fromState) {
					if (mediaquery().largemobile) {
						tween.killTweensOf(element);
						tween.set(element, { opacity : 0 });
						tween.to(element, 1, { opacity : 1, delay : fromState.name ? 0.2 : 1 });

						return;
					}

					background = element.children('.background');

					tween.killTweensOf(element);
					tween.set(element, { scale : 2, opacity : 0 });
					tween.to(element, 1, { scale : 1, opacity : 1, delay : fromState.name ? 0.2 : 1 });

					tween.killTweensOf(background);
					tween.set(background, { rotation : 90 });
					tween.to(background, 1, { rotation : 0, ease : Back.easeInOut, delay : fromState.name ? 0.2 : 1 });

					timeout.cancel(scope.timer.onEnter);
					scope.timer.onEnter = timeout(function () {
						whenEnter(fromState);
					}, 0);
				}

				function onExit () {
					if (!mediaquery().largemobile) {
						tween.killTweensOf(element);
						tween.to(element, 1, { scale : 0.2, rotation : -180, opacity : 0 });
					}
				}
				
				scope.name = resource.name;
				scope.timer = {};
				scope.content = resource.content;

				scope.$on('behance.user.about.data', behanceUserAboutData);
				scope.$on('$destroy', destroy);

				root.$broadcast('globalHeader.hide');
				
				sitemap.current('home', 'root');
				
				statechange(scope, { name : 'home' }).when({ onEnter : onEnter, onExit : onExit });
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'sitemap',
			function run (sitemap) {
				sitemap.add('home', {name: 'home', route: 'home()'});
			}
		];

	angular
		.module('view.home', [])
		.constant('viewHomeResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.home.controller', controller);
}());
