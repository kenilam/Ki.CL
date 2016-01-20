'use strict';

module.exports.config = function () {
    return {
        karma : {
            files : [
                'src/lib/jquery.js',
                'src/lib/modernizr.js',
                'src/lib/html5shiv.js',
                'src/lib/html5shiv-printshiv.js',
                'src/lib/moment.js',
                'src/lib/underscore.js',

                'src/lib/angular.js',
                'src/lib/angular-animate.js',
                'src/lib/angular-aria.js',
                'src/lib/angular-route.js',
                'src/lib/angular-resource.js',
                'src/lib/angular-sanitize.js',
                'src/lib/angular-ui-router.js',

                'src/api/api.js',
                'src/api/behance/behance.js',
                'src/api/behance/factory/factory.js',
                'src/api/behance/factory/reference/reference.js',

                'src/api/behance/service/service.js',
                'src/api/behance/service/async/async.js',
                'src/api/behance/service/check/check.js',
                'src/api/behance/service/modify/modify.js',
                'src/api/behance/service/time/time.js',
                
                'src/api/behance/component/component.js',
                'src/api/behance/component/experience/experience.js',

                'src/api/behance/component/user/user.js',
                'src/api/behance/component/user/about/about.js',
                'src/api/behance/component/user/info/info.js',
                'src/api/behance/component/user/stats/stats.js',
                
                'src/api/behance/component/projects/projects.js',
                'src/api/behance/component/project/project.js',

                'src/app/component/component.js',
                'src/app/component/breadcrumb/breadcrumb.js',
                'src/app/component/copyright/copyright.js',
                'src/app/component/customForm/customForm.js',
                'src/app/component/globalHeader/globalHeader.js',
                'src/app/component/globalFooter/globalFooter.js',
                'src/app/component/logo/logo.js',
                'src/app/component/navigation/navigation.js',
                'src/app/component/throbber/throbber.js',

                'src/app/factory/factory.js',
                'src/app/factory/sitemap/sitemap.js',

                'src/app/service/service.js',
                'src/app/service/async/async.js',

                'src/app/view/view.js',
                'src/app/view/about/about.js',
                'src/app/view/contact/contact.js',
                'src/app/view/home/home.js',
                'src/app/view/projects/projects.js',
                'src/app/view/projects/project/project.js',

                'src/app/app.js',

                'src/automation/run.template.js'
            ]
        }
    }
}