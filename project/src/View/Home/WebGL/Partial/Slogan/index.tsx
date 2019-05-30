import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import { Text } from '@View/Home/WebGL/Common';
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
}: IResources.Data = data;

class Slogan extends Text {
  constructor() {
    super( { style, text } );
  }
}

export default Slogan;
