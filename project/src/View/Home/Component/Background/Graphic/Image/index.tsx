import data from "$resources/data.json";
import * as IResources from "$resources/spec";
import {Engine} from '@Component/WebGL';
import * as IImage from './spec';

const {view: {home: {component: {background: {content: {image: index}}}}}}: IResources.Data = data;

class Image extends Engine.TilingSprite {
  private static texture = Engine.Texture.from(index);
  public name = 'image';
  
  constructor() {
    super(Image.texture, window.innerWidth, window.innerHeight);
  }
  
  public update({height, width, x, y}: IImage.UpdateProps) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}

export default Image;
