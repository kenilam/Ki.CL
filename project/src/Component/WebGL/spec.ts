export interface IAssetLoaderProps {
  name: string;
  url: string;
}

export type IAssetLoaderResponse = PIXI.loaders.Resource;

export interface IAssetLoader {
  assetLoader?: ({ name, url }: IAssetLoaderProps) => Promise<IAssetLoaderResponse>
}

export interface IApp extends PIXI.Application, IAssetLoader {
}

export interface IRenderProps {
  app: IApp;
}

export interface IRender {
  render(props: IRenderProps): Promise<void>;
}

export interface IProps extends IRender {
  height: number;
  width: number;
}
