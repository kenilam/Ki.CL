const pathByIndex = ({ pathname }, index) => pathname.split('/')[ index ] || 'root';

export { pathByIndex };
