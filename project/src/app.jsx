'use strict';

import { Resource } from '@/component/component';

import View from './view/view';

const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;

class App extends Resource {
	constructor () {
		super();

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

		this.resource = resource;
	}
}

Object.defineProperty(window, 'kicl', {
	value : {},
	configurable : true
});

export default new App();