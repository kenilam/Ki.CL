'use strict';

describe('when init', function () {
	var root,
		scope,
		timeout,
		state,

		httpBackend,

		async,
		index,
		sitemap,

		resource,
		behanceResource,
		behanceReference,
		routeRoot = 'app/view/',
		routePath = [
			'home', 'projects', 'about', 'contact'
		];

	function loop (loopWith) {
		var i = 0;

		return function whileLoop (callback) {
			do {
				callback(i);

				i = i + 1;
			} while (i < loopWith.length);
		}
	}

	beforeEach(module('kicl'));

	beforeEach(inject(function ($injector) {
		root = $injector.get('$rootScope');
		timeout = $injector.get('$timeout');
		state = $injector.get('$state');

		httpBackend = $injector.get('$httpBackend');

		async = $injector.get('async');
		index = $injector.get('index');
		sitemap = $injector.get('sitemap');
		
		resource = $injector.get('resource');
		behanceResource = $injector.get('behanceResource'),
		behanceReference = $injector.get('behanceReference');

		httpBackend.when('GET', behanceResource).respond(
			{
				"baseUrl" : "{{baseUrl}}",
				"version" : "{{version}}",
				"userName" : "{{userName}}",
				"apiKey" : "{{apiKey}}",
				"widget" : {
					"user" : {
						"path" : "users/:userName.json",
						"content" : {
							"stats" : {
								"appreciations" : {
									"title" : "Appreciations"
								},
								"comments" : {
									"title" : "Comments"
								},
								"followers" : {
									"title" : "Followers"
								},
								"following" : {
									"title" : "Following"
								},
								"views" : {
									"title" : "Views"
								}
							}
						}
					},
					"experience" : {
						"path" : "users/:userName/work_experience.json",
						"content" : {
							"title" : "Experiences",
							"start_date" : {
								"toPresent" : "Present"
							}
						}
					},
					"projects" : {
						"path" : "users/:userName/projects.json",
						"config" : {
							"covers" : {
								"size" : "202"
							}
						},
						"content" : {
							"label" : {
								"published_on" : "Published:"
							}
						}
					},
					"project" : {
						"path" : "projects/:projectId.json",
						"content" : {
							"label" : {
								"published_on" : "Published:"
							},
							"link" : {
								"message" : "See this project in Behance"
							},
							"close" : {
								"message" : "Exit this project"
							}
						},
						"config" : {
							"covers" : {
								"size" : "202"
							},
							"module" : {
								"image" : {
									"size" : "original"
								}
							},
							"content" : {
								"label" : {
									"published_on" : "Published:"
								}
							}
						}
					}
				}
			}
		);

		httpBackend.when('GET', resource).respond(
			{
				"info" : {
					"name" : "Ki.CL",
					"title" : "A Creative Consultant"
				},

				"initial" : {
					"footer" : {
						"hide" : {
							"delay" : "2000"
						},
						"show" : {
							"message" : "Content Information"
						}
					}
				},

				"component" : {
					"globalHeader" : {
						"closeButton" : {
							"expand" : {
								"message" : "Tap to expand"
							},
							"collapse" : {
								"message" : "Tap to collapse"
							}
						}
					},
					"breadcrumb" : {
						"title" : "You are here:"
					},
					"copyright" : {
						"message" : "All rights reserve © {{year}} Keni, Lam (Ki.CL)"
					}
				}
			}
		);

		loop(routePath)(function (i) {
			var route = routeRoot + routePath[i] + '/' + routePath[i];

			httpBackend.when('GET', route + '.json').respond({});
			httpBackend.when('GET', route + '.html').respond({});

			i = i + 1;
		});
		
		scope = root.$new();
	}));

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('should fetch behanceResource', function () {
		httpBackend.expectGET(behanceResource);
		console.log(behanceReference.component)
		httpBackend.flush();
	});

	loop(routePath)(function (i) {
		var route = routePath[i];

		it('should respond to URL', function() {
			timeout.flush();
			httpBackend.flush();
			expect(state.href(route)).toBe('#!/' + route);
		});
	});
});

