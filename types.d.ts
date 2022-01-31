// Stub definition
declare module "electron";

// Make react happy
declare const React: typeof import("react");

// Our globals
declare const SettingsNative: typeof import("./src/preload/native").default;
declare const KernelSettings: typeof import("./src/renderer/modules/settings").SettingsRenderer;