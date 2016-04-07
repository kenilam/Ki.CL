(function component () {
	'use strict';

	var dependencies = [
		'component.customForm',
		'component.cursor',
		'component.hamburgerButton',
		'component.globalHeader',
		'component.logo',
		'component.navigation',
		'component.throbber'
	];

	angular
		.module('component', dependencies);
}());