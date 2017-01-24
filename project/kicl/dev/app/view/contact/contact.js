(function contact () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.contact', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					name : 'contact',
					url : '/contact',
					resolve : {
						resource: ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/contact/contact.json' }).get().$promise;
							}

							return ref.resource;
						}],
						'backdrop' : ['resource', 'loadimage', function backdrop (resource, loadimage) {
							if (!ref.backdrop) {
								ref.backdrop = loadimage(resource.content.backdrop.image);
							}

							return ref.backdrop;
						}]
					},
					views : {
						'section' : {
							templateUrl : 'app/view/contact/contact.html',
							controller : 'view.contact.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('contact', { name : 'contact', route : 'contact' });
			}
		])
		.service('view.contact.customForm.event', [
			'$rootScope',
			function customFormEvent (root) {
				var scope;

				function success (event, model) {
					root.$broadcast('view.contact.customForm.dialog.show.success', model);
				}

				function error (event, error) {
					root.$broadcast('view.contact.customForm.dialog.show.error', error);
				}

				function hide (event, keep) {
					scope.$broadcast('view.contact.customForm.reset', keep);
				}

				this.assign = function (scopeRef) {
					scope = scopeRef;
					
					scope.$on('view.contact.customForm.responseHandler.success', success);
					scope.$on('view.contact.customForm.responseHandler.error', error);
					scope.$on('view.contact.customForm.dialog.hide', hide);
				};
			}
		])
		.controller('view.contact.controller', [
			'$rootScope',
			'$scope',
			'$timeout',
			'$anchorScroll',
			'resource',
			'view.contact.customForm.event',
			function controller (root, scope, timeout, anchorScroll, resource, customFormEvent) {
				scope.content = resource.content;
				scope.name = resource.name;
				scope.route = resource.route;

				customFormEvent.assign(scope);

				scope.$emit('update.view.data', { name : resource.name, route : resource.route });

				root.$broadcast('globalHeader.show');

				timeout.cancel(scope.viewContactTimer);
				scope.viewContactTimer = timeout(function sendData () {
					scope.$broadcast('view.contact.customForm.data', resource.component.customForm);
					root.$broadcast('view.contact.customForm.dialog.data', resource.component.customForm.dialog);
				});

				anchorScroll();
			}
		]);
}());