'use strict';

import View from './view/view';

const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;

class App {
	constructor () {
		this.router();
	}

	router () {
		ReactDOM.render((
			<Router history={hashHistory}>
				{View}
			</Router>
		), document.querySelector('[app-root]'));
	}
}

export default new App();