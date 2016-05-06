(function fps () {
	'use strict';

	angular.module('service.fps', [])
		.service('fps', [
			function fps () {
				function GetFrames () {
					var frames = 0;
					var previousFrameTime = 0;
					var timer;

					function calculator (frameTime) {
						var self = this;

						frames = Math.floor(1000 / (frameTime - previousFrameTime));
						previousFrameTime = frameTime;
						timer = requestAnimationFrame(calculator);

						console.log(frames);
					}

					function get () {
						if (!timer) {
							calculator();
						}

						return frames;
					}

					function destroy () {
						cancelAnimationFrame(timer);
					}

					return {
						get : get,
						destroy : destroy
					}
				}

				return new GetFrames();
			}
		]);
}());

