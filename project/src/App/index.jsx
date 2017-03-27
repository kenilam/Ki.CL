'use strict';

import {
	Data,
	EventEmitter,
	Sitemap
} from '@/Component';

import Header from './Header';
import View from './View';

class App {
	constructor () {
		EventEmitter.on('data.resource.view', App.sitemapData);

		// App.render(document.querySelector('app-header'), Header);
		App.render(document.querySelector('app-view'), View);
		
		Data.resource();
	}

	static sitemapData (data) {
		Sitemap.add(
			Object
				.keys(data)
				.filter(viewName => !data[viewName].indexRoute)
				.filter(viewName => !data[viewName].disabledRoute)
				.map(
					viewName => ({
						name : data[viewName].name,
						route : data[viewName].route
					})
				)
		);
	}

	static render (target, content) {
		ReactDOM.render(content, target);
		target.parentNode.replaceChild(target.childNodes[0], target);
	}
}

export default new App();