import {PIXI} from '@Component/WebGL';
import {CharacterRanges, RandomNumber} from '@Helper';
import {CSSUnitGroup} from '@Helper/CSSUnit';
import * as IText from './spec';

const RANDOM_TEXT = CharacterRanges();
const TICKER_LETTER_RANGE: RegExp = /[A-Za-z0-9]/g;

class Text extends PIXI.Container {
  private content: PIXI.Text;
  private readonly style: IText.Style;
  private readonly text: IText.Text;
  private readonly tick: IText.Tick;
  private readonly zoom: IText.Zoom;
  
  constructor({style, text, tick = true, zoom = true}: IText.Props) {
    super();
    
    this.alpha = 0;
    this.style = style;
    this.text = text;
    this.tick = tick;
    this.zoom = zoom;
  }
  
  public update({
    alpha = 0,
    height = 0,
    width = 0,
    x = 0,
    y = 0
  }: IText.UpdateProps = {}) {
    const styles = CSSUnitGroup(this.style);
    
    const {xGutter, yGutter} = styles;
    
    this.alpha = alpha;
    
    this.content = new PIXI.Text(
      this.tick
        ? this.ticker(alpha >= 1)
        : this.text,
      styles
    );
    
    if (this.zoom) {
      this.scale.x = 2 - alpha;
      this.scale.y = 2 - alpha;
    }
    
    this.x = x + width / 2 - this.width / 2 + (xGutter ? xGutter : 0);
    this.y = y + height / 2 - this.height / 2 + (yGutter ? yGutter : 0);
    
    this.removeChildren(0);
    this.addChild(this.content);
  }
  
  private ticker(complete: boolean): string {
    return Array.from(new Array(this.text.length)).map(
      (value, index) => !value && complete || !TICKER_LETTER_RANGE.test(this.text[index])
        ? this.text[index]
        : RANDOM_TEXT[RandomNumber({end: RANDOM_TEXT.length - 1})]
    ).join('');
  }
}

export default Text;
