import {contextBridge} from "electron";
import SettingsNative from "./native";

if ((process as any).contextIsolated) {
    contextBridge.exposeInMainWorld("SettingsNative", SettingsNative);
}

Object.assign(window, {SettingsNative});