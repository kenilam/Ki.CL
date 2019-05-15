import data from "$resources/data.json";
import * as IResources from "$resources/spec";
import {Engine} from '@Component/WebGL';
import {CharacterRanges, CSSUnits, RandomNumber} from '@Helper';
import * as ISlogan from "./spec";
import Style from './Style';

const {
  view: {
    home: {
      component: {
        background: {
          content: {
            slogan
          }
        }
      }
    }
  }
}: IResources.Data = data;

class Slogan extends Engine.Container {
  private content;
  
  private readonly randomLetter = CharacterRanges();
  
  private styles() {
    const props: ISlogan.Style = {};
    
    Object.keys(Style).forEach(
      name => {
        props[name] = CSSUnits(Style[name]);
      }
    );
    
    return props;
  }
  
  private tickSlogan(complete): string {
    return Array.from(new Array(slogan.length)).map(
      (value, index) =>
        complete || !/[A-Za-z0-9]/g.test(slogan[index])
          ? slogan[index]
          : this.randomLetter[RandomNumber({end: this.randomLetter.length - 1})]
    ).join('');
  }
  
  public update({alpha = 1, height, width, x, y}: ISlogan.UpdateProps) {
    this.content = new Engine.Text(this.tickSlogan(alpha >= 1).toUpperCase(), this.styles());
    this.removeChildren(0);
    this.addChild(this.content);
    
    this.scale.x = 2 - alpha;
    this.scale.y = 2 - alpha;
    this.alpha = alpha;
    this.x = x + width / 2 - this.width / 2;
    this.y = y + height / 2 - this.height / 2;
  }
}

export default Slogan;
