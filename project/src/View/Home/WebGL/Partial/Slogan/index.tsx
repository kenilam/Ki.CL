import resources from '$/resources';
import {Text} from '@/View/Home/WebGL/Common';
import style from './Style';

const {
  view: {
    home: {
      component: {
        graphic: {
          content: {
            slogan: text
          }
        }
      }
    }
  }
} = resources;

class Slogan extends Text {
  constructor() {
    super({style, text});
  }
}

export default Slogan;
