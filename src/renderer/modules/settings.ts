import {Patcher} from "./patcher";
import Webpack from "./webpack";
import Events from "./events";

const win = window as any;

export namespace SettingsRenderer {
    let initialized = false;

    export type Section = {
        section: "DIVIDER" | "CUSTOM" | string;
        element?(): React.ReactElement;
        label?: string;
        id?: string;
        className?: string;
        icon?: React.ReactElement | string;
        color?: string;
        onClick?: Function;
        newIndicator?: boolean;
        badgeCount?: number;
        order?: number;
    };
    
    export type PanelOptions = {
        render(): React.ReactElement;
        className?: string;
        order?: number;
    };

    export const panels: Section[] = win["__kernel_settings_cache__"] ?? [
        {section: "DIVIDER"},
        {section: "HEADER", label: "Kernel", id: "kernel-settings"}
    ];

    export function register(name: string, render: (() => React.ReactElement) | PanelOptions) {
        const panel = {
            section: `Kernel-${name}`,
            label: name,
            id: `kernel-settings-${name}`,
            className: `kernel-settings`,
            element: typeof render === "function" ? render : render.render,
            ...(typeof render === "object" ? render : {})
        };

        SettingsRenderer.panels.push(panel);
        SettingsRenderer.panels.sort((a, b) => a.order - b.order);

        return () => {
            const index = SettingsRenderer.panels.indexOf(panel);
            if (index < 0) return false;
            SettingsRenderer.panels.splice(index, 1);
            return true;
        };
    };

    export async function initialize(): Promise<void> {
        if (initialized) return;
        initialized = true;

        const SettingsView = await Webpack.findLazy(Webpack.Filters.byPrototype("getPredicateSections"));
    
        if (!win["__kernel_settings_cache__"]) Patcher.patch(SettingsView.prototype, "getPredicateSections", function (_, res) {
            if (!Array.isArray(res) || !res.some(e => e?.section?.toLowerCase() === "changelog") || res.some(s => s?.id === "kernel-settings")) return;

            const index = res.findIndex(s => s?.section?.toLowerCase() === "changelog") - 1;
            if (index < 0) return;

            res.splice(index, 0, ...SettingsRenderer.panels);
        });

        Events.addEventListener("reload-core", () => {
            win["__kernel_settings_cache__"] = panels;
        });
    };
}
