'use strict';

import Partial from '~/Partial';
import NewFile from '~/NewFile';

class App {
    constructor () {
        this.partial = new Partial();
        this.newFile = new NewFile();
    }
}

export default App;