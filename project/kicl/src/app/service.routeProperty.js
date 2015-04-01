(
	function init (app) {
		'use strict';

		app
			.service('routeProperty',
				[
					'config',
					function service (config) {
						return function trigger (data, returnChildren) {
							var route = _.rest(config.route.map.split('/:'));

							function property (data) {
								return _.map(data, function eachNode (node) {
									var list = {
											name : node.name
										},
										ref = {};

									if (node.link) list.link = node.link;

									if (node.route) {
										ref.state = [];
										ref.name = [];

										list.state = {};

										_.map(node.route.split('/'), function eachRoute (r, k) {
											ref.state.push(route[k]);
											ref.name.push(route[k] + ':"' + r + '"');

											list.state[route[k]] = r;
										});

										list.route = ref.state.join('.') + '({' + ref.name.join(',') + '})';
									}

									if (returnChildren && node.children && node.children.length) {
										list.children = property(node.children);
									}

									return list;
								});
							}

							return property(data);
						};
					}
				]
			);
	}
)(kicl);
