'use strict';

const Route = ReactRouter.Route;

const MeComponent = () => (
	{template}
)

class Me {
	constructor () {
		return <Route path='me' component={MeComponent} />;
	}
}

export default new Me();

export {MeComponent as Component};