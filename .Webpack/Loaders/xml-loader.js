import XML2JSON from '!/Utilities/XML2JSON';

function loader () {
	this.cacheable && this.cacheable();

	return JSON.stringify( XML2JSON.stringify(this.resourcePath) );
}

export default loader;
