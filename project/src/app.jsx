'use strict';

import { Resource } from '@/component/component';

import Behance from '@/api/behance/behance';

import View from './view/view';

const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;

class App extends Resource {
	constructor () {
		super();

		this.behance = new Behance();
		this.behance.load();

		ReactDOM.render(
			(
				<Router history={hashHistory}>
					{View}
				</Router>
			),
			document.querySelector('[app-root]'),
			this.load.bind(this)
		);
	}

	callback (resource) {
		ElementQueries.listen();

		setTimeout(
			() => window.dispatchEvent(new CustomEvent(
				'app.resource',
				{
					detail: resource
				}
			)),
			500
		);
	}
}

Object.defineProperty(window, 'kicl', {
	value : {},
	configurable : true
});

export default new App();