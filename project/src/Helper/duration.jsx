import transitionDuration from 'get-transition-duration';

import style from 'Component/CSSTransition/style.scss';

const duration = node => {
    const parent = node && node.parentNode;
    const nodes = Array.from(parent.querySelectorAll(`.${style.className}`));

    if (!parent || node.length === 0) {
        return 0;
    }

    return Math.max(...nodes.map(n => transitionDuration(n, true)));
};

export default duration;
