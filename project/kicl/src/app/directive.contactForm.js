(
	function init (app) {
		'use strict';

		app
			.service('contactForm_link',
				[
					'$rootScope', '$timeout', 'async', 'config',
					function link (root, timeout, async, config) {
						return function trigger (scope, elm) {
							var callback = {
									post : function () {
										timeout(control.isLoading, 500);
									},
									error : function () {
										control.hasError(true);

										timeout(control.isLoading, 500);
									}
								},
								control = {
									hasError : function (status) {
										if (!status) {
											delete scope.contactForm.error;

											return;
										}

										scope.contactForm.error = true;
									},
									isLoading : function (status) {
										if (!status) {
											delete scope.contactForm.loading;

											return;
										}

										scope.contactForm.loading = true;
									},
									setFocus : function () {
										elm.find('[name=' + scope.contactForm.field[0].name + ']').focus();
									},
									validate : function () {
										scope.contactForm.invalid.count = 0;

										function eachField (field) {
											if (!scope.contactForm.model[field.name] && field.required && field.invalid) {
												scope.contactForm.invalid[field.name] = field.invalid.message;
												scope.contactForm.invalid.count = scope.contactForm.invalid.count + 1;
											} else {
												delete scope.contactForm.invalid[field.name];
											}
										}

										_.each(scope.contactForm.field, eachField);

										return !Boolean(scope.contactForm.invalid.count);
									},
									submit : function (model) {
										if (control.validate()) {
											control.isLoading(true);
											async({url: scope.contactForm.action }).post().$promise.then(callback.post, callback.error);
										}
									},
									reset : function (event) {
										if (event) {
											event.preventDefault();
										}

										scope.contactForm.model = {};

										angular.forEach(scope.contactForm.field, eachField);
									}
								};

							function eachField (field) {
								if (field.type === 'radio') {
									scope.contactForm.model[field.name] = field.set[0].value;
								}
							}

							root.resource.$promise.then(function promise (resource) {
								scope.contactForm = resource.component.contactForm;

								scope.contactForm.invalid = {};
								scope.contactForm.control = control;
								scope.contactForm.timer = timeout(control.setFocus, 100);

								control.reset();
							});
						};
					}
				]
			)
			.directive('contactForm',
				[
					'contactForm_link',
					function directive (link) {
						return {
							restrict: 'AE',
							replace: true,
							templateUrl: 'partial/contactForm.html',
							link : link
						};
					}
				]
			);
	}
)(kicl);
