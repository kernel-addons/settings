import {Patcher} from "./patcher.js";
import Webpack from "./webpack.js";
import type React from "react";

export namespace SettingsRenderer {
    let initialized = false;

    export type Section = {
        section: "DIVIDER" | "CUSTOM" | string;
        element?(): React.ReactElement;
        label?: string;
        id?: string;
        className?: string;
    };

    export type PanelOptions = {
        render(): React.ReactElement;
        className?: string;
    };

    export const panels: Section[] = [
        {section: "DIVIDER"},
        {section: "HEADER", label: "Kernel", id: "kernel-settings"}
    ];

    export function register(name: string, render: (() => React.ReactElement) | PanelOptions) {
        const panel = {
            section: `Kernel-${name}`,
            label: name,
            id: `kernel-settings-${name}`,
            className: `kernel-settings`,
            element: typeof render === "function" ? render : render.render
        };

        SettingsRenderer.panels.push(panel);

        return () => {
            const index = SettingsRenderer.panels.indexOf(panel);
            if (index < 0) return false;
            SettingsRenderer.panels.splice(index, 1);
            return true;
        };
    };

    export function initialize(): void {
        if (initialized) return;
        initialized = true;

        const SettingsView = Webpack.findByDisplayName("SettingsView");
    
        Patcher.patch(SettingsView.prototype, "getPredicateSections", function (_, res) {
            if (!Array.isArray(res) || !res.some(e => e?.section?.toLowerCase() === "changelog") || res.some(s => s?.id === "kernel-settings")) return;

            const index = res.findIndex(s => s?.section?.toLowerCase() === "changelog") - 1;
            if (index < 0) return;

            res.splice(index, 0, ...SettingsRenderer.panels);
        });
    };
}