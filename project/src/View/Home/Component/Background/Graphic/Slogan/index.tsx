import data from "$resources/data.json";
import * as IResources from "$resources/spec";
import {Engine} from '@Component/WebGL';
import * as ISlogan from "./spec";

import Style from './Style';

const {description}: IResources.Data = data;

class Slogan extends Engine.Container {
  private readonly content = new Engine.Text(description.toUpperCase(), Style);
  
  private radius = 300;
  private maxRopePoints = 100;
  private step = Math.PI / this.maxRopePoints;
  
  private ropePoints = (this.maxRopePoints - Math.round(
    this.content.texture.width / (this.radius * Math.PI)
  ) * this.maxRopePoints) / 2;
  
  private points = Array.from(new Array(this.maxRopePoints - this.ropePoints)).map(
    (value, index) => new Engine.Point(
      this.radius * Math.cos( this.step * index ),
      this.radius * Math.sin( this.step * index )
    )
  );
  
  private rope = new Engine.SimpleRope(this.content.texture, this.points);
  
  constructor() {
    super();
  }
  
  public update({x, y, width, height}: ISlogan.UpdateProps) {
    // const radius = (height > width ? width : height) / 4;
    
    const app = new Engine.Application();
  
    const bounds = this.getLocalBounds();
    const matrix = new Engine.Matrix();
  
    const renderTexture = Engine.RenderTexture.create( {
      height: bounds.height,
      width: bounds.width
    } );
  
    matrix.tx = -bounds.x;
    matrix.ty = -bounds.y;
  
    this.addChild(this.rope);
    
    app.renderer.render(this, renderTexture, true, matrix, true);
  
    const sprite = Engine.Sprite.from(renderTexture);
    sprite.position.set(50, 100);
    this.addChild(sprite);
    
    this.x = x + width / 2 - this.width / 2;
    this.y = y + height / 2 - this.height / 2;
  }
}

export default Slogan;
