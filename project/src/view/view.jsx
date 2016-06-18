'use strict';

import {State} from '@/helper/helper';
import {Logo, Navigation, Preloader} from '@/component/component';

import About from './about/about';
import Home from './home/home';

const IndexRedirect = ReactRouter.IndexRedirect;
const Route = ReactRouter.Route;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const cloneElement = React.cloneElement;

const ViewComponent = ({ children, location }) => (
	{template}
);

class View {
	constructor () {
		return <Route path='/' component={ViewComponent} onEnter={State.stateEnter} onChange={State.stateChange} onLeave={State.stateLeave}>
			<IndexRedirect to='home' />
			{Home}
			{About}
		</Route>;
	}
}

export default new View();

