angular.module("kicl").run(['$templateCache', function(a) { a.put('app/view/experiments/experiment/smoke/smoke.html', '<!-- <h1>{{name}}</h1> -->\n' +
    '<canvas ng-controller="view.experiments.smoke.controller" ng-class="{\n' +
    '		&quot;isLoading&quot; : loading\n' +
    '	}"></canvas>');
	a.put('app/view/experiments/experiment/cube/cube.html', '<!-- <h1>{{name}}</h1> -->\n' +
    '<div ng-controller="view.experiments.cube.controller"></div>');
	a.put('api/behance/component/user/stats/stats.html', '<ul data-api="behance.user.stats">\n' +
    '	<li ng-repeat="(name, value) in stats.content">\n' +
    '		{{value.title}}: {{stats[name]}}\n' +
    '	</li>\n' +
    '</ul>');
	a.put('api/behance/component/user/info/info.html', '<section data-api="behance.user.info" class="vcard">\n' +
    '	<p class="fn n">\n' +
    '		<span class="given-name">{{info.first_name}}</span>,\n' +
    '		<span class="family-name">{{info.last_name}}</span>\n' +
    '	</p>\n' +
    '	<p class="adr">\n' +
    '		<span class="locality">{{info.city}}</span>,\n' +
    '		<span class="region">{{info.state}}</span>,\n' +
    '		<span class="country-name">{{info.country}}</span>\n' +
    '	</p>\n' +
    '</section>');
	a.put('api/behance/component/user/avatar/avatar.html', '<figure data-api="behance.user.avatar">\n' +
    '	<img ng-src="{{avatar.image}}">\n' +
    '</figure>');
	a.put('api/behance/component/user/about/about.html', '<section data-api="behance.user.about">\n' +
    '	<p ng-repeat="paragraph in about.paragraph">{{paragraph}}</p>\n' +
    '</section>');
	a.put('api/behance/component/project/slideshow/slideshow.html', '<div ng-attr-title="{{name}}" data-api="behance.project.slideshow" ng-show="show">\n' +
    '	<div class="wrapper">\n' +
    '		<h1>{{name}}</h1>\n' +
    '		<div class="swiper">\n' +
    '			<ul>\n' +
    '				<li ng-repeat="module in modules track by $index" ng-if="module.type === \'image\'" ng-class="{\n' +
    '						\'isCurrent\' : module.id === current.id\n' +
    '					}">\n' +
    '					<img ng-src="{{module.src}}">\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '		</div>\n' +
    '		<div class="pagination">\n' +
    '			<button ng-repeat="module in modules track by $index" ng-attr-title="{{$index + 1}}" ng-class="{\n' +
    '					\'isCurrent\' : module.id === current.id\n' +
    '				}" ng-click="setCurrent(module)"><i class="fa fa-circle" ng-class="{\n' +
    '					\'fa-circle\' : module.id === current.id,\n' +
    '					\'fa-circle-thin\' : module.id !== current.id\n' +
    '				}"></i>{{$index}}</button>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '	<button class="close" ng-click="close()" ng-attr-title="{{resource.content.close.message}}">\n' +
    '		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">\n' +
    '			<line fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="21.4" y1="42.6" x2="42.6" y2="21.4"></line>\n' +
    '			<line fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="21.4" y1="21.4" x2="42.6" y2="42.6"></line>\n' +
    '		</svg>\n' +
    '\n' +
    '		<span>{{projectSlideshow.resource.content.close.message}}</span>\n' +
    '	</button>\n' +
    '</div>');
	a.put('app/view/projects/project/project.html', '<throbber emit-from="view.projects.project" show-on-default="true"></throbber>\n' +
    '<behance-project ng-show="projectLoaded"></behance-project>');
	a.put('api/behance/component/user/user.html', '<section data-api="behance.user">\n' +
    '	<behance-user-avatar></behance-user-avatar>\n' +
    '	<behance-user-info></behance-user-info>\n' +
    '	<behance-user-about></behance-user-about>\n' +
    '	<!-- <behance-user-stats></behance-user-stats> -->\n' +
    '</section>');
	a.put('api/behance/component/projects/projects.html', '<ul data-api="behance.projects">\n' +
    '	<li tabindex="-1" ng-repeat="project in projects track by $index" ng-attr-data-project-id="{{project.id}}" ng-focus="control.focus(project)" ui-sref="{{project.route}}" ng-class="{\n' +
    '			\'isCurrent\' : $index === currentIndex,\n' +
    '			\'isPrev\' : $index === currentIndex- 1,\n' +
    '			\'isNext\' : $index === currentIndex + 1,\n' +
    '			\'isElse\' : $index < currentIndex - 1 || $index > currentIndex + 1,\n' +
    '		}">\n' +
    '		<figure ng-click="control.click($index)">\n' +
    '			<a ng-attr-title="go to: {{project.name}}" ng-class="{\n' +
    '					hasBackgroundImage : $parent.projectsUseBackground\n' +
    '				}" ng-focus="control.focus(project)" ng-style="{\n' +
    '					backgroundImage : $parent.projectsUseBackground ? \'url(\' + project.covers + \')\' : null\n' +
    '				}" ui-sref="{{project.route}}">\n' +
    '				<img ng-src="{{project.covers}}" alt="{{project.name}}">\n' +
    '			</a>\n' +
    '			<figcaption>\n' +
    '				<p class="title">{{project.name}}</p>\n' +
    '				<p class="published_on">{{resource.content.label.published_on}} <time datetime="{{project.published_on_datetime}}">{{project.published_on}}</time></p>\n' +
    '				<p class="see_more">{{resource.content.label.see_more}}</p>\n' +
    '			</figcaption>\n' +
    '		</figure>\n' +
    '	</li>\n' +
    '</ul>');
	a.put('api/behance/component/project/project.html', '<article data-api="behance.project" role="article">\n' +
    '	<header>\n' +
    '		<h1>{{project.name}}</h1>\n' +
    '		<p>{{resource.config.content.label.published_on}} <time datetime="{{project.published_on_datetime}}">{{project.published_on}}</time></p>\n' +
    '\n' +
    '		<!-- <ul class="fields" aria-label="{{resource.content.fields.label}}" role="list">\n' +
    '			<li role="listitem" ng-repeat="field in project.fields track by $index">{{field}}</li>\n' +
    '		</ul> -->\n' +
    '	</header>\n' +
    '\n' +
    '	<div>\n' +
    '		<p ng-repeat-start="module in project.modules track by $index" ng-if="module.type === \'text\' && module.text_plain !== \'\'" ng-class="{\n' +
    '				\'isTitle\' : module.text.indexOf(\'class=&quot;title&quot;\') > -1\n' +
    '			}" ng-style="{\n' +
    '				\'text-align\' : module.alignment\n' +
    '			}" ng-bind-html="module.text_plain"></p>\n' +
    '		<p class="isImage" ng-repeat-end="" ng-if="module.type === \'image\'" ng-click="control.showSlideshow(module)" ng-style="{\n' +
    '				\'background-image\' : \'url(\' + module.src + \')\'\n' +
    '			}" ng-attr-title="{{resource.content.image.message}}"><img ng-src="{{module.src}}"><span>{{resource.content.image.message}}</span></p>\n' +
    '	</div>\n' +
    '\n' +
    '	<!-- <aside>\n' +
    '		<ul class="stats" aria-label="{{resource.content.stats.label}}" role="list">\n' +
    '			<li role="listitem" ng-repeat="(key, stat) in project.stats track by $index"><span>{{stat}}</span><span>{{key}}</span></li>\n' +
    '		</ul>\n' +
    '		<ul class="tags" aria-label="{{resource.content.tags.label}}" role="list">\n' +
    '			<li role="listitem" ng-repeat="tag in project.tags track by $index">{{tag}}</li>\n' +
    '		</ul>\n' +
    '	</aside> -->\n' +
    '\n' +
    '	<footer>\n' +
    '		<ul class="tool">\n' +
    '			<li class="link">\n' +
    '				<a target="_blank" ng-href="{{project.url}}" ng-attr-title="{{resource.content.link.message}}"><i class="fa fa-external-link"></i><span>{{resource.content.link.message}}</span></a>\n' +
    '			</li>\n' +
    '		</ul>\n' +
    '	</footer>\n' +
    '</article>');
	a.put('api/behance/component/experience/experience.html', '<ul data-api="behance.experience">\n' +
    '	<li ng-repeat="list in experience track by $index">\n' +
    '		<h1>{{list.position}}</h1>\n' +
    '		<p class="organization">{{list.organization}}</p>\n' +
    '		<p class="location">{{list.location}}</p>\n' +
    '		<p class="period"><time>{{list.start_date}} ~ {{list.end_date || resource.start_date.toPresent}}</time></p>\n' +
    '	</li>\n' +
    '</ul>');
	a.put('app/component/customForm/dialog/dialog.html', '<div class="customFormDialog" ng-show="resource && show">\n' +
    '	<div class="wrapper">\n' +
    '		<div class="success" ng-if="success">\n' +
    '			<h1>{{resource.success.title}}</h1>\n' +
    '			<p ng-repeat="message in resource.success.message track by $index">{{message}}</p>\n' +
    '			<h2>{{resource.success.report.title}}</h2>\n' +
    '			<ul class="report">\n' +
    '				<li ng-repeat="(name, value) in model track by $index" ng-attr-data-report-name="{{name}}">\n' +
    '					<h3>{{name}}</h3>\n' +
    '					<p>{{value}}</p>\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '		</div>\n' +
    '\n' +
    '		<div class="error" ng-if="error">\n' +
    '			<h1>{{resource.error.title}}</h1>\n' +
    '			<p ng-repeat="message in resource.error.message track by $index">{{message}}</p>\n' +
    '			<h2>{{resource.error.report.title}}</h2>\n' +
    '			<ul class="report">\n' +
    '				<li data-report-name="status">\n' +
    '					<h3>{{resource.error.report.status.title}}</h3>\n' +
    '					<p>{{error.status}}</p>\n' +
    '				</li>\n' +
    '				<li data-report-name="message">\n' +
    '					<h3>{{resource.error.report.message.title}}</h3>\n' +
    '					<p>{{error.messages}}</p>\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '\n' +
    '	<button class="close" ng-click="close()" ng-attr-title="{{resource.button.close.message}}">\n' +
    '		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">\n' +
    '			<line fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="21.4" y1="42.6" x2="42.6" y2="21.4"></line>\n' +
    '			<line fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="21.4" y1="21.4" x2="42.6" y2="42.6"></line>\n' +
    '		</svg>\n' +
    '\n' +
    '		<span>{{resource.button.close.message}}</span>\n' +
    '	</button>\n' +
    '</div>');
	a.put('app/view/projects/projects.html', '<section ui-view="project"></section>\n' +
    '\n' +
    '<nav class="swiper-container" ng-style="{\n' +
    '		height : style.behanceProjects.height + &quot;px&quot;\n' +
    '	}" ng-class="{\n' +
    '		&quot;isSwiping&quot; : isSwiping\n' +
    '	}">\n' +
    '	<behance-projects data-projects-route="projects" data-projects-use-background="true" class="swiper-wrapper"></behance-projects>\n' +
    '	<span class="background"></span>\n' +
    '</nav>');
	a.put('app/view/home/home.html', '<logo></logo>\n' +
    '\n' +
    '<navigation class="isVertical" data-list-at-root="true" data-list="root"></navigation>\n' +
    '\n' +
    '<span class="overground"></span>');
	a.put('app/view/experiments/experiments.html', '<h1>{{name}}</h1>\n' +
    '<p>{{content.message}}</p>\n' +
    '\n' +
    '<section ui-view="experiment" ng-attr-data-route="{{route}}" ng-attr-data-name="{{name}}"></section>\n' +
    '\n' +
    '<nav role="navigation">\n' +
    '	<ul>\n' +
    '		<li ng-repeat="(name, property) in experiments track by $index" ui-sref="{{property.route}}" ng-class="{\n' +
    '				&quot;isCurrent&quot; : name === current\n' +
    '			}">\n' +
    '			<a ui-sref="{{property.route}}">{{property.name}}</a>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</nav>');
	a.put('app/view/about/about.html', '<behance-user></behance-user>\n' +
    '\n' +
    '<h1>{{content.me.experience.title}}</h1>\n' +
    '<behance-experience></behance-experience>\n' +
    '\n' +
    '<h1>{{content.site.title}}</h1>\n' +
    '<h2>{{content.site.tool.title}}</h2>\n' +
    '<ul class="aboutSite">\n' +
    '	<li ng-repeat="tool in content.site.tool.list track by $index" ng-attr-class="{{tool.class}}">\n' +
    '		<figure>\n' +
    '			<a ng-href="{{tool.link}}"><img ng-src="{{tool.image}}"></a>\n' +
    '			<figcaption>\n' +
    '				<blockquote ng-attr-cite="{{tool.quote.link}}">\n' +
    '					<p ng-repeat="message in tool.message track by $index">{{message}}</p>\n' +
    '					<footer>\n' +
    '						<cite>\n' +
    '							<a ng-href="{{tool.quote.link}}" target="_blank">{{tool.quote.name}}</a>\n' +
    '						</cite>\n' +
    '					</footer>\n' +
    '				</blockquote>\n' +
    '			</figcaption>\n' +
    '		</figure>\n' +
    '	</li>\n' +
    '</ul>\n' +
    '\n' +
    '<span class="overground"></span>');
	a.put('app/view/contact/contact.html', '<h1>{{content.title}}</h1>\n' +
    '\n' +
    '<p class="message">{{content.message}}</p>\n' +
    '\n' +
    '<custom-form data-emit-from="view.contact"></custom-form>\n' +
    '\n' +
    '<span class="overground"></span>');
	a.put('app/component/logo/logo.html', '<h1 class="logo">\n' +
    '	<a ui-sref="home"><span>{{logo.name}}</span></a>\n' +
    '</h1>');
	a.put('app/component/webGL/webGL.html', '');
	a.put('app/component/throbber/throbber.html', '<span class="throbber" ng-if="show">\n' +
    '	<i class="fa fa-spin fa-cog"></i>\n' +
    '	<span>loading</span>\n' +
    '</span>');
	a.put('app/component/navigation/navigation.html', '<nav class="navigation" role="navigation" ng-class="{\n' +
    '		\'isVertical\' : vertical\n' +
    '	}">\n' +
    '	<ul role="navigation">\n' +
    '		<li ng-repeat="(name, property) in list track by $index" ng-class="{\'isCurrent\' : $index === current.index}" ng-attr-data-list-name="{{name}}">\n' +
    '			<a ui-sref="{{property.route}}">{{property.name}}</a>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</nav>');
	a.put('app/component/hamburgerButton/hamburgerButton.html', '<button class="hamburgerButton" ng-class="{\n' +
    '		\'isCross\' : closed\n' +
    '	}" ng-click="control.click()" ng-attr-title="{{ closed ? resource.collapse.message : resource.expand.message }}">\n' +
    '	<span>{{ closed ? resource.collapse.message : resource.expand.message }}</span>\n' +
    '	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">\n' +
    '		<g>\n' +
    '			<line class="top" fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="17" y1="22.4" x2="47" y2="22.4"></line>\n' +
    '\n' +
    '			<line class="cross-left" fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="17" y1="32" x2="47" y2="32"></line>\n' +
    '\n' +
    '			<line class="cross-right" fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="17" y1="32" x2="47" y2="32"></line>\n' +
    '\n' +
    '			<line class="bottom" fill="none" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="17" y1="41.6" x2="47" y2="41.6"></line>\n' +
    '		</g>\n' +
    '	</svg>\n' +
    '</button>');
	a.put('app/component/globalHeader/globalHeader.html', '<header class="globalHeader" ng-if="show" ng-class="{\n' +
    '		&quot;isScrolled&quot; : scrolled\n' +
    '	}">\n' +
    '	<logo></logo>\n' +
    '	<hamburger-button data-emit-to="globalHeader.navigation" data-emit-from="globalHeader.navigation" close-on-default="true"></hamburger-button>\n' +
    '	<navigation data-emit-from="globalHeader" data-list="root" ng-show="!navigation.closed"></navigation>\n' +
    '</header>');
	a.put('app/component/globalFooter/globalFooter.html', '<footer class="globalFooter">\n' +
    '	<copyright></copyright>\n' +
    '</footer>');
	a.put('app/component/copyright/copyright.html', '<p class="copyright">{{resource.message}}</p>');
	a.put('app/component/customForm/customForm.html', '<form novalidate="" class="customForm {{form.name}}" method="post" name="{{form.name}}" ng-show="form" ng-submit="submit()" ng-class="{\n' +
    '		&quot;isLoading&quot; : loading\n' +
    '	}">\n' +
    '	<p>{{message}}</p>\n' +
    '	<input name="userid" id="userid" class="hiddenInput" type="text" placeholder="UserID" ng-model="model.userid">\n' +
    '	<ul>\n' +
    '		<li ng-repeat="field in form.field track by $index" ng-class="{\n' +
    '				&quot;hasError&quot; : $parent.$$childHead[form.name][field.name].$invalid,\n' +
    '				&quot;forTextarea&quot; : field.type === &quot;textarea&quot;\n' +
    '			}" ng-switch="field.type">\n' +
    '			<label ng-attr-for="{{field.name}}" ng-if="field.type !== &quot;radio&quot;">{{field.label}}</label>\n' +
    '			<input tabindex="1" ng-disabled="request" ng-model="model[field.name]" ng-attr-id="{{field.name}}" ng-attr-name="{{field.name}}" ng-attr-type="{{field.type}}" ng-attr-placeholder="{{field.placeholder}}" ng-required="field.required" ng-minlength="field.minLength" ng-maxlength="field.maxLength" ng-switch-when="text">\n' +
    '			<input tabindex="1" ng-disabled="request" ng-model="model[field.name]" ng-attr-id="{{field.name}}" ng-attr-name="{{field.name}}" ng-attr-type="{{field.type}}" ng-attr-placeholder="{{field.placeholder}}" ng-required="field.required" ng-minlength="field.minLength" ng-maxlength="field.maxLength" ng-switch-when="email">\n' +
    '			<textarea tabindex="1" ng-disabled="request" ng-model="model[field.name]" ng-attr-id="{{field.name}}" ng-attr-name="{{field.name}}" ng-attr-type="{{field.type}}" ng-attr-placeholder="{{field.placeholder}}" ng-minlength="field.minLength" ng-maxlength="field.maxLength" ng-required="field.required" ng-switch-when="textarea" ng-class="{\n' +
    '					&quot;hasChar&quot; : $parent.$$childHead[form.name][field.name].$viewValue\n' +
    '				}"></textarea>\n' +
    '			<fieldset ng-switch-when="radio">\n' +
    '				<legend>\n' +
    '					<span>{{field.label}}</span>\n' +
    '				</legend>\n' +
    '				<ul>\n' +
    '					<li ng-repeat="set in field.set track by $index">\n' +
    '						<label ng-attr-for="{{set.name}}" ng-class="{\n' +
    '								&quot;forRadio&quot; : field.type === &quot;radio&quot;\n' +
    '							}">{{set.label}}</label>\n' +
    '						<input tabindex="1" ng-disabled="request" ng-model="model[field.name]" ng-attr-id="{{set.name}}" ng-attr-name="{{field.name}}" ng-attr-value="{{set.value}}" ng-attr-type="{{field.type}}">\n' +
    '					</li>\n' +
    '				</ul>\n' +
    '			</fieldset>\n' +
    '			<span class="required" ng-if="field.required" ng-class="{\n' +
    '					&quot;isValid&quot; : $parent.$$childHead[form.name][field.name].$valid\n' +
    '				}"><i class="fa" ng-class="{\n' +
    '					&quot;fa-exclamation-circle&quot; : $parent.$$childHead[form.name][field.name].$invalid,\n' +
    '					&quot;fa-check&quot; : $parent.$$childHead[form.name][field.name].$valid\n' +
    '				}"></i><span>{{message.required}}</span></span>\n' +
    '			<p class="charCount" ng-class="{\n' +
    '					&quot;isValid&quot; : $parent.$$childHead[form.name][field.name].$valid,\n' +
    '					&quot;isOver&quot; : $parent.$$childHead[form.name][field.name].$viewValue.length > field.maxLength\n' +
    '				}" ng-if="field.type === &quot;textarea&quot; && $parent.$$childHead[form.name][field.name].$viewValue">{{$parent.$$childHead[form.name][field.name].$viewValue.length}} / {{field.maxLength}}</p>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '	<button type="submit" tabindex="1" ng-disabled="$parent.$$childHead[form.name].$invalid || request" ng-class="{\n' +
    '			&quot;isLoading&quot; : request\n' +
    '		}"><i class="fa" ng-class="{\n' +
    '			&quot;fa-times&quot; : $parent.$$childHead[form.name].$invalid,\n' +
    '			&quot;fa-paper-plane-o&quot; : !request && !$parent.$$childHead[form.name].$invalid,\n' +
    '			&quot;fa-spin fa-circle-o-notch&quot; : request\n' +
    '		}"></i>{{request ? form.button.loading.name : form.button.submit.name}}</button>\n' +
    '	<button type="reset" tabindex="1" ng-disabled="request" ng-class="{\n' +
    '			&quot;isLoading&quot; : request\n' +
    '		}" ng-click="reset($event)"><i class="fa" ng-class="{\n' +
    '			&quot;fa-times&quot; : request,\n' +
    '			&quot;fa-undo&quot; : !request\n' +
    '		}"></i>{{form.button.reset.name}}</button>\n' +
    '</form>');
	a.put('app/component/cursor/cursor.html', '<div class="cursor">\n' +
    '	<span class="message" ng-if="cursor.status.showMessage">{{resource.message}}</span>\n' +
    '	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 64 64" style="enable-background:new 0 0 64 64" xml:space="preserve">\n' +
    '		<path class="frame" d="M32.223,3c7.746,0,15.029,3.017,20.506,8.494S61.223,24.254,61.223,32s-3.017,15.029-8.494,20.506\n' +
    '			S39.969,61,32.223,61c-15.991,0-29-13.009-29-29C3.223,16.009,16.232,3,32.223,3 M32.223,0c-17.673,0-32,14.327-32,32\n' +
    '			s14.327,32,32,32s32-14.327,32-32S49.896,0,32.223,0L32.223,0z"></path>\n' +
    '		<path class="arrow" d="M31.104,19.188c0.512,0,1.023,0.195,1.414,0.586L43.33,30.586c0.781,0.781,0.781,2.047,0,2.828\n' +
    '		L32.518,44.226c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828L39.088,32l-9.397-9.397\n' +
    '		c-0.781-0.781-0.781-2.047,0-2.828C30.081,19.384,30.593,19.188,31.104,19.188z"></path>\n' +
    '	</svg>\n' +
    '</div>');
	 }]);