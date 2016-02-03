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
			function controller (root, scope, timeout, element, mediaquery, resource, sitemap, stateChange, tween) {
				var background,
					logo,
					h2,
					nav;

				function whenEnter (fromState) {
					logo = element.children('.logo');
					h2 = element.children('h2');
					nav = element.children('.navigation');

					tween.killTweensOf([logo, h2, nav]);
					tween.set([logo, h2, nav], { opacity: 0, delay : fromState.name ? 0.2 : 1 });
					tween.to([logo, h2, nav], 1, { opacity: 1, delay : fromState.name ? 0.2 : 1 });
				}

				function onEnter (toState, fromState) {
					background = element.children('.background');
					
					tween.killTweensOf(element);

					if (mediaquery().largemobile) {
						tween.set(element, { opacity : 0 });
						tween.to(element, 1, { opacity : 1, delay : fromState.name ? 1 : 0.5 });

						return;
					}

					tween.set(element, { scale : 2, opacity : 0 });
					tween.to(element, 1, { scale : 1, opacity : 1, delay : fromState.name ? 1 : 0.5, onComplete : function () {
						whenEnter(fromState);
					} });

					tween.killTweensOf(background);
					tween.set(background, { rotation : 90 });
					tween.to(background, 1, { rotation : 0, ease : Back.easeInOut, delay : fromState.name ? 1 : 0.5 });
				}

				function destroy () {
					var prop = {
						scale : 0.2,
						rotation : -180,
						opacity : 0
					};

					_.forEach(scope.timer, function (timer, name) {
						timeout.cancel(scope.timer[name]);
					});

					root.$broadcast('globalHeader.show');

					if (mediaquery().largemobile) {
						delete prop.scale;
						delete prop.rotation;
					}

					tween.killTweensOf(element);
					tween.to(element, 1, prop);
				}
				
				scope.name = resource.name;
				scope.timer = {};
				scope.content = resource.content;

				root.$broadcast('globalHeader.hide');

				sitemap.current('home', 'root');
				
				stateChange(scope, { name : 'home' }).when({ onEnter : onEnter, onExit : destroy });
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
