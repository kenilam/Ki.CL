'use strict';

import {
	Resource
} from '@/helper/helper';

class BehanceResource extends Resource {
	constructor () {
		super();

		this.name = 'api.behance';
		this.url = 'api/behance/data/resource.json';
	}
}

export default BehanceResource;