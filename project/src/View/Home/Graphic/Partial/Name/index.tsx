import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import {Text} from '@View/Home/Graphic/Partial/Common';
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
}: IResources.Data = data;

class Name extends Text {
  constructor() {
    super({style, text, tick: false, zoom: false});
  }
}

export default Name;
