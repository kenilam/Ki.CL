'use strict';

class Async {
    constructor () {
        this.get = this.method('Get');

        this.data = {};
    }

    method (type) {
        if (!type) {
            throw new Error('method type is required when creating a fetch method');
        }

        return (url, fresh) => {
            if (!url) {
                throw new Error('url is required when fetching data');
            }

            if (this.data[url] && !fresh) {
                return Promise.resolve(this.data[url].json());
            }

            return fetch(url, {
                method: type,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong with the api server!');
                }

                this.data[url] = response;

                return response.json();
            });
        };
    }
}

export default new Async();