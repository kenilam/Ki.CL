import {History, UnregisterCallback} from "history";
import LocationListener = History.LocationListener;

export interface IHandler extends LocationListener {
}

export interface IRemoveListener extends UnregisterCallback {
}
