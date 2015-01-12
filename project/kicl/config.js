'use strict';

module.exports.config = function () {
    return {
        data : {
            resource : 'api/behance/data/resource.json'
        },
        karma : {
            files : [
                'src/lib/jquery.js',
                'src/lib/modernizr.js',
                'src/lib/html5shiv.js',
                'src/lib/moment.js',
                'src/lib/underscore.js',

                'src/lib/greensock/jquery.gsap.js',
                'src/lib/greensock/TweenMax.js',
                'src/lib/greensock/easing/EasePack.js',

                'src/lib/angular.js',
                'src/lib/angular-mocks.js',
                'src/lib/angular-animate.js',
                'src/lib/angular-route.js',
                'src/lib/angular-resource.js',
                'src/lib/angular-sanitize.js',
                'src/lib/angular-ui-router.js',

                'src/app/module.js',
                'src/app/run.js',
                'src/app/config.js',

                'src/app/service.async.js',
                'src/app/service.routeProperty.js',
                'src/app/service.tween.js',

                'src/app/directive.loader.js',
                'src/app/directive.logo.js',
                'src/app/directive.navigation.js',
                'src/app/directive.breadcrumb.js',
                'src/app/directive.sitemap.js',
                'src/app/directive.socialNetwork.js',

                'src/app/controller.head.js',
                'src/app/controller.body.js',
                'src/app/controller.header.js',
                'src/app/controller.footer.js',

                'src/automation/run.template.js',

                'src/api/behance/app/module.js',
                'src/api/behance/app/run.js',
                'src/api/behance/app/service.async.js',
                'src/api/behance/app/directive.intro.js',
                'src/api/behance/app/directive.profile.js',
                'src/api/behance/app/directive.projects.js',
                'src/api/behance/app/directive.project.js'
            ]
        }
    }
}