'use strict';

const Route = ReactRouter.Route;

const HomeComponent = () => (
	{template}
);

class Home {
	constructor () {
		return <Route path='home' component={HomeComponent} />;
	}
}

export default new Home();

export {HomeComponent as Component};