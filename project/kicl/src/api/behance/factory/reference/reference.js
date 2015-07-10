(function reference () {
	'use strict';

	var factory = [
		'$rootScope', 'behanceAsync',
		function (root, async) {
			var resource = {},
				api = {},
				component = {},

				callback = {
					resource : function (data) {
						resource.data = data;

						setComponent(data);

						root.$on('$stateChangeSuccess', stateChangeSuccess(data));
					},
					api : function (callback) {
						return function (data) {
							callback(data);
						};
					}
				};

			function eachComponent (widget, name) {
				component[name] = {};

				if (widget.content) {
					component[name].content = widget.content;
				}
			}

			function setComponent (data) {
				_.each(data.widget, eachComponent);
			}

			function replaceExp (string, exp) {
				function eachExp (replaceTo, name) {
					var replaceFrom = new RegExp(':' + name, 'g');

					string = string.replace(replaceFrom, replaceTo);
				}

				_.each(exp, eachExp);

				return string;
			}

			function eachWidget(data, projectId) {
				function eachParams (param, name) {
					return [
						name,
						replaceExp(
							param, {
								'userName' : data.userName,
								'projectId' : projectId
							}
						)
					];
				}

				function makeWidget (config, name) {
					api[name] = async(data.baseUrl + '/' + data.version, data.apiKey)
						(
							{
								path : replaceExp(
									config.path, {
										'userName' : data.userName,
										'projectId' : projectId
									}
								),
								params : _.object(
									_.map(config.params, eachParams)
								)
							}
						).jsonp;
				}

				return makeWidget;
			}

			function stateChangeSuccess(data) {
				function whenStateChange (event, toState, toParams, fromState, fromParams) {
					var projectId = toParams.project;

					_.each(data.widget, eachWidget(data, projectId));
				}

				return whenStateChange;
			}

			return {
				component : component,
				api : api,
				resource : resource,
				callback : callback
			};
		}
	];

	angular
		.module('behance.factory.reference', [])
		.factory('behanceReference', factory);
}());
