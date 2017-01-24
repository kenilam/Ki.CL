'use strict';

import { EventEmitter } from '@/Component';

import { Get } from '../Method';

class Resource {
    constructor () {
        this.eventPrefix = 'data.resource';
        this.url = 'data/resource.json';

        return () => this.request().then(this.response.bind(this));
    }

    emitter (resource) {
        Object.keys(resource).forEach(
            name => {
                const eventName = `${this.eventPrefix}.${name}`;
                const eventData = resource[name];

                if (typeof eventData === 'string') {
                    return EventEmitter.emit(eventName, eventData);
                }

                Object.keys(eventData).forEach(
                    type => EventEmitter.emit(`${eventName}.${type}`, eventData[type])
                );

                EventEmitter.emit(eventName, eventData);
            }
        );
    }

    response (resource) {
        if (!this.cache) {
            this.cache = resource;
        }

        this.emitter(this.cache);

        return resource;
    }

    request () {
        return (
            this.cache ? new Promise(resolve => resolve(this.cache)) : new Get(this.url)
        );
    }
}

export default new Resource();