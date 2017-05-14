'use strict';

import Partial from '~/Partial';
import NewFile from '~/NewFile';

import '~/app.scss';

import '~/assets/london.whitechapel.jpg';

class App {
    constructor () {
        this.partial = new Partial();
        this.newFile = new NewFile();
    }
}

export default App;