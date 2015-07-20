'use strict'

global.appRoot = require('path').resolve(__dirname);

var bower = require('./gulptask/bower').bower(),

	kicl = require('./project/kicl/gulpfile').kicl();

require('./gulptask/list').list();