'use strict';

class Unwrap {
    static parent (element) {
        const contents = document.createDocumentFragment();

        Array.from(element.childNodes).forEach(
            node => contents.appendChild(node)
        );

        element.parentNode.replaceChild(contents, element);
    }
}

export default Unwrap;