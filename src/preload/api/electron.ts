import {shell} from "electron";

export namespace Electron {
    export function openPath(path: string) {
        try {
            shell.openPath(path);
        } catch (error) {
            console.error("[KernelSettings:Native]: Fatal error:", error);
        }
    };
    
    export function showItemInFolder(path: string) {
        try {
            shell.showItemInFolder(path);
        } catch (error) {
            console.error("[KernelSettings:Native]: Fatal error:", error);
        }
    };
    
    export function trashItem(path: string) {
        try {
            shell.trashItem(path);
        } catch (error) {
            console.error("[KernelSettings:Native]: Fatal error:", error);
        }
    }
}