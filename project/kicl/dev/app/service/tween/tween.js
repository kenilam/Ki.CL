(function tween () {
	'use strict';

	var deafultValues = {
			ease : Expo.easeOut
		};

	angular.module('service.tween', [])
		.service('tween', [
			function tween () {
				this.killTweensOf = TweenMax.killTweensOf;
				this.set = TweenMax.set;

				this.to = function (element, duration, prop) {
					if (!prop.ease) {
						prop.ease = deafultValues.ease;
					}

					TweenMax.to(element, duration, prop);
				};
			}
		]);
}());
