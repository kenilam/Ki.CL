'use strict';

class IsEmpty {
    constructor () {
        return (variables) => {
            if (typeof variables === 'object') {
                return IsEmpty.checkObject(variables);
            }
        }
    }

    static object (variables) {
        if (!variables) {
            return false;
        }

        return Object.keys(variables).some(
            name => variables.hasOwnProperty(name) === true
        );
    }
}

export default IsEmpty;