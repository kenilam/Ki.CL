'use strict';

import { Resource } from '@/helper/helper';

class appResource extends Resource {
	constructor () {
		super();

		this.name = '';
		this.url = 'data/resource.json';
	}
}

export default appResource;