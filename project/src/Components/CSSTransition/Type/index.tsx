import Fade, { className as FadeClassName, type as FadeType } from "./Fade";

import SlideDown, {
  className as SlideDownClassName,
  type as SlideDownType,
} from "./SlideDown";

import SlideFromLeft, {
  className as SlideFromLeftClassName,
  type as SlideFromLeftType,
} from "./SlideFromLeft";

import SlideFromRight, {
  className as SlideFromRightClassName,
  type as SlideFromRightType,
} from "./SlideFromRight";

import SlideUp, {
  className as SlideUpClassName,
  type as SlideUpType,
} from "./SlideUp";

import ZoomIn, {
  className as ZoomInClassName,
  type as ZoomInType,
} from "./ZoomIn";

import ZoomOut, {
  className as ZoomOutClassName,
  type as ZoomOutType,
} from "./ZoomOut";

import Spec from "./spec";

const classNames: Spec.ClassNames = {
  Fade: FadeClassName,
  SlideDown: SlideDownClassName,
  SlideUp: SlideUpClassName,
  SlideFromLeft: SlideFromLeftClassName,
  SlideFromRight: SlideFromRightClassName,
  ZoomIn: ZoomInClassName,
  ZoomOut: ZoomOutClassName,
};

const types: Spec.Types = {
  Fade: FadeType,
  SlideDown: SlideDownType,
  SlideUp: SlideUpType,
  SlideFromLeft: SlideFromLeftType,
  SlideFromRight: SlideFromRightType,
  ZoomIn: ZoomInType,
  ZoomOut: ZoomOutType,
};

export {
  classNames,
  types,
  Fade,
  SlideDown,
  SlideFromLeft,
  SlideFromRight,
  SlideUp,
  ZoomIn,
  ZoomOut,
};
