const debounce = time => new Promise( resolve => window.setTimeout(resolve, time) );

export default debounce;
