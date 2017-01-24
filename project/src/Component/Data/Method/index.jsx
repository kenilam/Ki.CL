'use strict';

class Get {
    constructor (url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong on api server!');
                }


                return response.json();
            });
    }
}

export { Get }