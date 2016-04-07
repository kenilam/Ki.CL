(function scroll () {
	'use strict';

	angular.module('service.scroll', [])
		.service('scroll', [
			'$window',
			function scroll (_win) {
				var scope,
					win = angular.element(_win);

				this.onScroll = function (callback) {
					function whenGet (w) {
						var d;
						// Use the specified window or the current window if no argument 
						w = w || window;

						// This works for all browsers except IE versions 8 and before
						if (w.pageXOffset !== null) return {
							x: w.pageXOffset,
							y: w.pageYOffset
						};

						// For IE (or any browser) in Standards mode
						d = w.document;
						
						if (document.compatMode === "CSS1Compat") {
							return {
								x: d.documentElement.scrollLeft,
								y: d.documentElement.scrollTop
							};
						}

						// For browsers in Quirks mode
						return {
							x: d.body.scrollLeft,
							y: d.body.scrollTop
						};
					}

					function whenScroll () {
						callback(whenGet());
					}

					if (!callback) {
						return;
					}

					return whenScroll;
				};

				this.unbind = function () {
					win.off('scroll');
				};

				this.init = function (callback) {
					win.on('scroll', this.onScroll(callback));
				};
			}
		]);
}());
