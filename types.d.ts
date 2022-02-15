// Stub definition
declare module "electron";

// Make react happy
declare const React: typeof import("react");
declare const ReactDOM: typeof import("react-dom");
declare const _: typeof import("lodash");

// Our globals
declare const SettingsNative: typeof import("./src/preload/native").default;
declare const KernelSettings: typeof import("./src/renderer/modules/settings").SettingsRenderer;

// Webpack compilation
declare const __NODE_ENV__: "DEVELOPMENT" | "PRODUCTION";