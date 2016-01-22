(function experience () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$window', '$element', '$timeout', 'behanceReference', 'behanceModify', 'mediaquery',
			function controller (root, scope, win, element, timeout, reference, modify, mediaquery) {
				var loader = {},
					control = {
						get : {
							experience : function () {
								var then = function (data) {
									loader.resolved = data.$resolved;

									callback.data(data);
								};

								if (!loader.promise) {
									loader.promise = reference.api.experience().$promise;
								}

								loader.promise.then(then);
							}
						},
						set : {
							nameHeight : function (list) {
								function getNameHeight (li) {
									return angular.element(li).outerHeight();
								}

								function setHeight () {
									list.css({ height : 'auto' });

									if (!mediaquery().mobile) {
										list.css({
											height : Math.max.apply(null, Array.from(list).map(getNameHeight))
										});
									}
								}

								return setHeight;
							}
						}
					},
					callback = {
						data : function (data) {
							reference.component.experience.resolved = data.$resolved;
							
							scope.experience.list = _.map(data.work_experience, modify.experience);

							root.$broadcast('behance.experience.data', scope.experience);

							timeout.cancel(scope.experience.timer);
							scope.experience.timer = timeout(init, 0);
						},
						resize : function () {
							control.set.nameHeight(element.children('li'));
						},
						destroy : function () {
							timeout.cancel(scope.experience.timer);
						}
					};

				function init () {
					scope.experience.control.set.nameHeight = control.set.nameHeight(element.find('li:not(:first-child) h1'));
					angular.element(win).bind('resize', scope.experience.control.set.nameHeight);

					scope.experience.control.set.nameHeight();
				}

				scope.experience = {};

				scope.experience.timer = {};

				scope.experience.control = {};
				scope.experience.control.set = {};
				
				scope.experience.content = reference.resource.data.widget.experience.content;

				scope.$on('$destroy', callback.destroy);

				control.get.experience();
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/experience/experience.html',
			controller : controller
		};
	}

	angular.module('behance.component.experience', [])
		.directive('behanceExperience', [
			'async',
			directive
		]);
}());
