import {contextBridge} from "electron";
import SettingsNative from "./native";

if ((process as any).contextIsolated) {
    contextBridge.exposeInMainWorld("SettingsNative", SettingsNative);
} else {
    Object.assign(window, {SettingsNative});
}