'use strict';

import View from './view/view';

const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;

class App {
	constructor () {
		ReactDOM.render((
			<Router history={hashHistory}>
				{View}
			</Router>
		), document.querySelector('[app-root]'));
		
		ElementQueries.listen();
	}
}

export default new App();