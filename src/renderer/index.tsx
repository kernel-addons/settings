// import KernelPanel from "./components/panel.js";
import {DevServer} from "@modules/devserver";
import Events from "@modules/events";
import {Storage} from "@modules/storage";
import KernelPanel from "./components/panel";
import UpdaterPanel from "./components/updates";
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

        if (__NODE_ENV__ === "DEVELOPMENT") DevServer.initialize();
        SettingsRenderer.initialize();
        registerSettings();
        Storage.initialize();

        loadStyles();
        exposeGlobals();
    };

    export function registerSettings(): void {
        let flush = [
            SettingsRenderer.register("Updates", {
                render: () => <UpdaterPanel />,
                order: 2
            }),
            SettingsRenderer.register("Packages", {
                render: () => <KernelPanel />,
                order: 1
            })
        ];

        Events.addEventListener("reload-core", () => {
            for (let i = 0; i < flush.length; i++) {
                flush[i]();
            }
        });
    };

    export function exposeGlobals(): void {
        const Dispatcher = Webpack.findByProps("dirtyDispatch");

        Object.defineProperties(window, {
            KernelSettings: {
                value: Object.freeze(SettingsRenderer),
                configurable: true,
                writable: true
            },
            KernelStorage: {
                value: Object.freeze(Storage),
                configurable: true,
                writable: true
            }
        });

        Dispatcher.dirtyDispatch({type: "KERNEL_SETTINGS_INIT"});
    }

    export function loadStyles(): void {
        const location = path.resolve(fs.current, "style.css");
        if (!fs.isFile(location)) return // TODO: Bail out
        
        const load = function () {
            const styles = fs.readFile(location, "utf8" as any);

            styleElement = document.head.appendChild(
                Object.assign(document.createElement("style"), {
                    id: "kernel-style",
                    textContent: styles
                })
            );
        };
        load();

        Events.addEventListener("reload-css", () => {
            styleElement.remove();
            load();
            Logger.log("Styles", "Reloaded.");
        });
    };

    export function stop(): void {
        Patcher.unpatchAll();
        styleElement?.remove();
    };
}