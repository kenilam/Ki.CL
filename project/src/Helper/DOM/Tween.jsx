'use strict';

import { TweenLite, EasingPack } from 'gsap';

import ColorPropsPlugin from "gsap/ColorPropsPlugin";

import { Utility } from '~/Helper';

class Tween extends TweenLite {
    static Ease = Back.easeInOut;

    static to (element, props, duration) {
    	return TweenLite.to(element,
            typeof duration === 'number' ? duration : 0,
            Object.assign({ useFrames : true, ease : Tween.Ease }, props)
        );
    }
}

export default Tween;