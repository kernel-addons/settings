export namespace Logger {
    type Types = "log" | "warn" | "error" | "info";

    function parseType(type: Types): string {
        switch (type) {
            case "error":
            case "info":
            case "error":
                return type;
            default: return "log";
        }
    }

    function logMessage(type: Types, module: String, ...message: any[]): void {
        console[parseType(type)](`%c[KernelSettings]%c %c[${module}]%c`, "color: #A8D46B; font-weight: 700;", "", "color: #A8D46B", "", ...message);
    }

    export function log(module, ...message) {logMessage("log", module, ...message);}
    export function info(module, ...message) {logMessage("info", module, ...message);}
    export function warn(module, ...message) {logMessage("warn", module, ...message);}
    export function error(module, ...message) {logMessage("error", module, ...message);}
}