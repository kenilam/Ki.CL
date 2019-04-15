import { IProps, IAssetLoaderProps, IApp } from './spec';
import React, { PureComponent, RefObject, createRef } from 'react';
import { boundMethod } from 'autobind-decorator';

const { devicePixelRatio } = window;

const OPTIONS = {
  autoResize: true,
  resolution: devicePixelRatio,
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

  @boundMethod
  private resizeHandler() {
    const { height, width } = this.props;

    this.app.renderer.resize(width, height);
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.init();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    window.clearTimeout(this.renderTimeout);
  }

  public render() {
    return (
      <div className='webgl' ref={this.ref} />
    );
  }
}

export default WebGL;
