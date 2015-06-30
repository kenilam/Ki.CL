(function () {
	'use strict';

	function setParent (map) {
		var mapArray = map.split('.'),
			currentNode = sitemap,
			i = 0;

		do {
			if (!currentNode[mapArray[i]]) {
				currentNode[mapArray[i]] = {};
			}

			currentNode = currentNode[mapArray[i]].children = {};

			i ++;
		} while (i < mapArray.length);

		return currentNode;
	}

	function findParent (map) {
		var mapArray = map.split('.'),
			i = 0,
			currentNode = sitemap;

		do {
			if (!currentNode[mapArray[i]] || !currentNode[mapArray[i]].children) {
				currentNode = undefined;

				return;
			}

			currentNode = currentNode[mapArray[i]].children;

			i ++;
		} while (i < mapArray.length);

		return currentNode;
	}
	
	function factory () {
		var sitemap = {},
			current = sitemap;

		return {
			current : function (id, map) {
				var parent = sitemap;

				if (arguments.length <= 0) {
					return current;
				}

				if (id && map && map !== 'root') {
					parent = findParent(map);
				}

				current = parent[id];

				return current;
			},
			add : function (id, prop, map) {
				var parent = sitemap;

				if (map) {
					parent = setParent(map);
				}

				parent[id] = prop;

				return parent[id];
			},
			get : function (id, map) {
				var parent = sitemap;

				if (!id || id === 'root') {
					return parent;
				}

				if (map) {
					parent = setParent(map);
				}

				if (!parent.children) {
					return undefined;
				}

				return parent.children[id];
			}
		};
	}

	angular.module('factory.sitemap', [])
		.service('sitemap', factory);
}());
