'use strict';

const Route = ReactRouter.Route;

const IndexComponent = () => (
	{template}
)

class Index {
	constructor () {
		return <Route path='index' component={IndexComponent} />;
	}
}

export default new Index();

export {IndexComponent as Component};