import { IAssetLoaderProps, IApp, IProps, IRenderProps, } from './spec';
import React, { PureComponent, RefObject, createRef } from 'react';
import Style from './Style';

const OPTIONS = {
  autoResize: true,
  resolution: window.devicePixelRatio,
  transparent: true
}

class WebGL extends PureComponent<IProps> {
  private renderTimeout: any;

  private app: IApp;

  private loader = new PIXI.loaders.Loader();

  private ref: RefObject<HTMLDivElement> = createRef();

  private async assetLoader({ name, url }: IAssetLoaderProps) {
    if (this.loader.resources[name]) {
      return this.loader.resources[name];
    }

    const { resources } = await this.loader.add(name, url);

    return resources[name];
  }

  private init() {
    const { ref: { current }, props: { render } } = this;

    this.app = new PIXI.Application(OPTIONS) as IApp;
    this.app.assetLoader = this.assetLoader;

    current.appendChild(this.app.view);

    render({ app: this.app });
  }

  public componentDidUpdate({ height, width }: IProps) {
    this.app.renderer.resize(width, height);
  }

  public componentDidMount() {
    this.init();
  }

  public componentWillUnmount() {
    window.clearTimeout(this.renderTimeout);
  }

  public render() {
    return (
      <div className={Style.webGL} ref={this.ref} />
    );
  }
}

const app: IApp = new PIXI.Application(OPTIONS);
const ref: RefObject<HTMLDivElement> = createRef();

const WebGL = () => (
  <div className={Style.webGL} ref={ref} />
);

export { IRenderProps }
export default WebGL;
