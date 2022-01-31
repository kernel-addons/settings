// import KernelPanel from "./components/panel.js";
import KernelPanel from "./components/panel";
import {Logger} from "./modules/logger";
import {Patcher} from "./modules/patcher";
import {SettingsRenderer} from "./modules/settings";
import Webpack from "./modules/webpack";
// import Git from "./updater/git.js";
// import Updater from "./updater/index.js";

const fs = SettingsNative.requireModule("fs");
const path = SettingsNative.requireModule("path");

export namespace Core {
    let styleElement: Element = null;

    export async function start(): Promise<void> {
        await Webpack.whenReady;
        Logger.log("Core", "Started.");

        (window as any).React = Webpack.findByProps("createElement", "useEffect");

        SettingsRenderer.initialize();
        SettingsRenderer.register("Packages", () => (
            <KernelPanel />
        ));

        loadStyles();
        exposeGlobals();
    };

    export function exposeGlobals(): void {
        Object.defineProperties(window, {
            KernelSettings: {
                value: Object.freeze(SettingsRenderer),
                configurable: false,
                writable: false
            }
        });
    }

    export function loadStyles(): void {
        const location = path.resolve(fs.current, "style.css");
        if (!fs.isFile(location)) return // TODO: Bail out
        const styles = fs.readFile(location, "utf8" as any);

        styleElement = document.head.appendChild(
            Object.assign(document.createElement("style"), {
                id: "kernel-style",
                textContent: styles
            })
        );
    };

    export function stop(): void {
        Patcher.unpatchAll();
        styleElement?.remove();
    };
}