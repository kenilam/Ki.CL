(function component () {
	'use strict';

	var dependencies = [
		'component.copyright',
		'component.customForm',
		'component.cursor',
		'component.hamburgerButton',
		'component.globalFooter',
		'component.globalHeader',
		'component.logo',
		'component.navigation',
		'component.throbber'
	];

	angular
		.module('component', dependencies);
}());