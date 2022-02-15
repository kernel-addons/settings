import Events from "./events";
import {Logger} from "./logger";

const fs = SettingsNative.requireModule("fs");
const path = SettingsNative.requireModule("path");

export namespace DevServer {
    export let ws: WebSocket = null;
    export let expectedClose = false;

    const tryJSON = function (json: string) {
        try {
            return JSON.parse(json);
        } catch (error) {
            return false;
        }
    };

    export function close(): void {
        if (!ws) return;

        Logger.log("DevServer", "Closing WebSocket");
        DevServer.ws = ws = null;
    };

    export function initialize(): void {
        const win = window as any;
        
        if (win.KernelDevServer && win.KernelDevServer.ws != null) {
            Logger.log("DevServer", "Taking over socket");
            ws = DevServer.ws = win.KernelDevServer.ws;
        } else {
            Logger.log("DevServer", "Loading development server...");
            ws = DevServer.ws = new WebSocket("ws://localhost:5656");
        }

        win.KernelDevServer = DevServer;
        ws.onmessage = handleMessage;
        ws.onerror = (error) => {
            Logger.error("DevServer", "Fatal error:", error);
        }
        ws.onclose = () => {
            DevServer.ws = ws = null;
            if (!expectedClose) Logger.error("DevServer", "Connection closed...");
        };
    };

    export async function reloadCore(): Promise<void> {
        Logger.log("DevServer", "Reloading core...");

        Events.dispatchEvent(new Event("reload-core"));

        const content = fs.readFile(path.resolve(fs.current, "renderer.js"), "utf8" as any);
        const script = document.head.appendChild(Object.assign(document.createElement("script"), {
            type: "module",
            textContent: content + ";__webpack_exports__Core.start();",
            onload: () => script.remove()
        }));
    };

    export function reloadStyles(): void {
        Events.dispatchEvent(new Event("reload-css"));
    };

    export function reload(type: "all" | "core" | "styles"): void {
        switch (type) {
            case "core": {
                reloadCore();
            } break;
            case "styles": {
                reloadStyles();
            } break;
        }
    };

    export const handleMessage = ({data}) => {
        const message = tryJSON(data);
        if (!message) return Logger.error("DevServer", "Unable to parse message:", data);

        switch (message.operation) {
            case "HELLO": {
                send("HELLO", {
                    client: `Discord->${(window as any).DiscordNative.app.getReleaseChannel()}`
                });

                Logger.log("DevServer", "WS Connected");
            } break;

            case "RELOAD_STYLES": {
                reloadStyles();
            } break;

            case "RELOAD_CORE": {
                reloadCore();
            } break;

            default: {
                Logger.log("DevServer", "Unknown operation:", message.operation);
            }
        }
    };

    export function send(operation: "HELLO" | "CLOSE", data: any): void {
        if (!ws) throw "Tried sending message without connection established";

        ws.send(JSON.stringify({
            operation: operation,
            data: data
        }));
    };
}