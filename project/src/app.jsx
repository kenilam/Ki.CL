'use strict';

import { Resource } from '@/component/component';

import View from './view/view';

const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;

class App {
	constructor () {
		new Resource(resource => {
			
			ElementQueries.listen();

			this.resource = resource;

			this.render();
		});
	}

	broadcastResource () {
		Object.keys(this.resource.component).forEach(name => {
			window.dispatchEvent(new CustomEvent('component.' + name + '.resource', {
				detail : this.resource.component[name]
			}));
		});
	}

	render () {
		ReactDOM.render((
			<Router history={hashHistory}>
				{View}
			</Router>
		), document.querySelector('[app-root]'), this.broadcastResource.bind(this));
	}
}

export default new App();