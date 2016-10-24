'use strict';

import {
	Data,
	Project,
	Projects,
	Resource
} from './component/component';

class Behance extends Resource {
	constructor () {
		super();
		
		this.data = new Data();
	}
}

export default Behance;

export {
	Data,
	Project,
	Projects,
	Resource
};