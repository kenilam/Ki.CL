import resources from '$/resources';
import {Text} from '@/View/Home/WebGL/Common';
import style from './Style';

const {
  view: {
    home: {
      component: {
        graphic: {
          content: {
            name: text
          }
        }
      }
    }
  }
} = resources;

class Name extends Text {
  constructor() {
    super({style, text, tick: false, zoom: false});
  }
}

export default Name;
