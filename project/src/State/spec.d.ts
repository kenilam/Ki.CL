declare module "redux-multi";

type IReduxDevtools = any;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: IReduxDevtools;
}
