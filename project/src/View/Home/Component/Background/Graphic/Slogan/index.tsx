import data from "$resources/data.json";
import * as IResources from "$resources/spec";
import { Engine } from '@Component/WebGL';
import * as ISlogan from "./spec";
import Style from './Style';
import { CSSUnits } from '@Helper';

const { view: { home: {
  component: {
    background: {
      content: {
        slogan
      }
    }
  }
} } }: IResources.Data = data;

class Slogan extends Engine.Container {
  private content: Engine.Text;

  private styles() {
    const props: ISlogan.Style = {};

    Object.keys(Style).forEach(
      name => {
        props[name] = CSSUnits(Style[name]);
      }
    );

    return props;
  }

  public update({ alpha = 1, height, width, x, y }: ISlogan.UpdateProps) {
    this.content = new Engine.Text(slogan.toUpperCase(), this.styles());
    this.removeChildren(0);
    this.addChild(this.content);

    this.alpha = alpha;
    this.x = x + width / 2 - this.width / 2;
    this.y = y + height / 2 - this.height / 2;
  }
}

export default Slogan;
