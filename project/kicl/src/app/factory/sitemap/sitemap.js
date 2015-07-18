(function sitemap () {
	'use strict';
	
	var cache = {},
		current = cache;

	function setParent (map) {
		var mapArray = map.split('.'),
			currentNode = cache,
			i = 0;

		do {
			if (!currentNode[mapArray[i]]) {
				currentNode[mapArray[i]] = {};
			}

			if (!currentNode[mapArray[i]].children) {
				currentNode[mapArray[i]].children = {};
			}

			currentNode = currentNode[mapArray[i]];

			i ++;
		} while (i < mapArray.length);

		return currentNode;
	}

	function findParent (map) {
		var mapArray = map.split('.'),
			currentNode = cache,
			i = 0;

		do {
			if (!currentNode[mapArray[i]]) {
				currentNode = undefined;

				return;
			}

			currentNode = currentNode[mapArray[i]].children || currentNode[mapArray[i]];
			
			i ++;
		} while (i < mapArray.length);

		return currentNode;
	}
	
	function factory (root) {
		return {
			current : function (id, map) {
				var parent = cache;

				if (arguments.length <= 0) {
					return current;
				}

				if (map && map !== 'root') {
					parent = findParent(map);
				}

				if (parent.children) {
					parent = parent.children;
				}

				if (id) {
					current = parent[id];
				}

				root.$broadcast('sitemap.current.updated', current);

				return current;
			},
			add : function (id, prop, map) {
				var parent = cache;

				if (map) {
					parent = setParent(map);
				}

				(parent.children || parent)[id] = prop;

				(parent.children || parent)[id].parent = parent;

				if (!parent.children) {
					parent[id].root = true;
				}

				return parent[id];
			},
			get : function (id, map) {
				var parent = cache;

				if (!id || id === 'root') {
					return parent;
				}

				if (map) {
					parent = findParent(map);
				}

				if (!parent.children) {
					return undefined;
				}

				return parent.children[id];
			}
		};
	}

	angular.module('factory.sitemap', [])
		.service('sitemap', ['$rootScope', factory]);
}());
