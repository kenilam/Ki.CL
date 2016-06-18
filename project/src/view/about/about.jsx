'use strict';

import Index from './index/index';
import Me from './me/me';

import {Navigation} from '@/component/component';

const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;
const Route = ReactRouter.Route;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const cloneElement = React.cloneElement;

const AboutComponent = ({ children, location }) => (
	{template}
)

class About {
	constructor () {
		return <Route path='about' component={AboutComponent}>
			<IndexRedirect to='index' />
			{Index}
			{Me}
		</Route>;
	}
}

export default new About();

export {AboutComponent as Component};