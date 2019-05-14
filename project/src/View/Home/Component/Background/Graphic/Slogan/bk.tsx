import data from "$resources/data.json";
import * as IResources from "$resources/spec";
import {Engine, Geometry} from '@Component/WebGL';
import * as ISlogan from "./spec";

import Style from './Style';

const {description}: IResources.Data = data;

class Slogan extends Engine.Container {
  private readonly content = new Engine.Text(description.toUpperCase(), Style);
  
  private readonly maxRopePoints = 360;
  private readonly step = Math.PI / this.maxRopePoints;
  
  private text;
  
  constructor() {
    super();
  }
  
  public update({x, y, width, height}: ISlogan.UpdateProps) {
    const radius = (height > width ? width : height) / 4;
    
    const circle = Geometry.circle({
      x: x + width / 2 - this.width / 2,
      y: y + height / 2 - this.height / 2,
      radius
    });
  
    circle.length = circle.length / 2;
  
    for (let key in description) {
      console.log(description[key]);
    }
    
    console.log(circle);
    
    if (radius <= 0) {
      return;
    }
    
    const ropePoints = Math.round(this.maxRopePoints - Math.round(
      (this.content.getBounds().width / (radius * Math.PI)
      ) * this.maxRopePoints ) / 2);
  
    const points = Array.from(
      new Array(this.maxRopePoints - ropePoints)
    ).map((value, index) => new Engine.Point(
      radius * Math.cos( this.step * index ),
      radius * Math.sin( this.step * index )
    ));
  
    this.text = new Engine.SimpleRope( this.content.texture, points );
    
    this.removeChildren(0);
  
    this.addChild(this.text);
    
    this.x = x + width / 2 - this.width / 2;
    this.y = y + height / 2 - this.height / 2;
  }
}

export default Slogan;
