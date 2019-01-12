import moment from 'moment';
import PixiPlugin from 'gsap/PixiPlugin';

import { routes, miscellaneous } from 'content/resources';

import cssUnit from './cssUnit';
import windowSize from './windowSize';

const { parseColor } = PixiPlugin;

const home = routes.home.name.toLowerCase();

const { months } = miscellaneous;

class Helper {
  static capitalize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  }

  static isEmpty(obj) {
    let condition = false;
    const type = typeof obj;

    switch (type) {
      case 'object':
        condition =
          Object.keys(obj).length === 0 && obj.constructor === Object;
        break;

      default:
        condition = true;
        break;
    }

    return condition;
  }

  static pathnameToRoutes(pathname) {
    return pathname.substr(1).replace(/\//g, '.') || home;
  }

  static parseColor(hex) {
    return parseColor(hex, 'number');
  }

  static randomNumberByRange(max = 100, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static get randomId() {
    return `${new Date().getTime()}_${Math.random() *
      1000}_${new Date().getMilliseconds()}_${Math.random() * 1000}`;
  }

  static cssUnit = cssUnit;

  static get windowSize() {
    return windowSize();
  }

  static monthNameOf (index) {
    return months[index] || index;
  }

  static ordinalSuffixOf(number) {
    const tenth = number % 10;
    const hundredth = number % 100;

    let suffix = 'th';

    if (tenth === 1 && hundredth !== 11) {
      suffix = 'st';
    }

    if (tenth === 2 && hundredth !== 12) {
      suffix = 'nd';
    }

    if (tenth === 3 && hundredth !== 13) {
      suffix = 'rd';
    }
    
    return `${number}${suffix}`;
  }

  static toDate (timestamp, format = 'DD MMMM, YYYY') {
    return moment(timestamp * 1000).format(format);
  }

  static agesAgo (timestamp) {
    return moment(timestamp * 1000).fromNow();
  }
}

export default Helper;
