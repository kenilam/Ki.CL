(
	function (app) {
		'use strict';

		app
			.run(
				[
					'$rootScope', '$state', '$stateParams', '$resource', 'behance', 'behance.async',
					function(root, state, stateParams, resource, behance, async) {
						function replaceExp (string, exp) {
							var replacedString;

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
								root.api.behance[name] = async(data.baseUrl + '/' + data.version, data.apiKey)
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
								var projectId = _.last(_.toArray(toParams));

								_.each(data.widget, eachWidget(data, _.last(_.toArray(toParams))));
							}

							return whenStateChange;
						}

						function resurceReady (data) {
							root.$on('$stateChangeSuccess', stateChangeSuccess(data));
						}

						if (!root.api) {
							root.api = {};
						}

						root.api.behance = {
							resource : resource(behance.data.resource).get()
						};

						root.api.behance.resource.$promise.then(resurceReady);
					}
				]
			);
	}
)(behance);
