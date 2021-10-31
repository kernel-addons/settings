import KernelPanel from "./components/panel.js";
import Logger from "./modules/logger.js";
import Patcher from "./modules/patcher.js";
import Webpack, {Events} from "./modules/webpack.js";

const SettingsSections = [
    {section: "DIVIDER"},
    {
        section: "HEADER",
        label: "Kernel",
    },
    {
        id: "kernel-settings-packages",
        section: "KernelSettings",
        label: "Packages",
        className: "kernel-settings-item",
        element: () => React.createElement(KernelPanel, {})
    }
];

export default new class KernelSettings {
    start() {Webpack.once(Events.LOADED, () => this.onStart());}
    // start() {Webpack.wait(() => this.onStart());}

    stop() {
        if (!this.styleElement) return;

        this.styleElement.remove();
        Patcher.unpatchAll();
    }

    onStart() {
        window.React = Webpack.findByProps("createElement", "useEffect");

        Logger.log("Core", "Started.");
        this.loadStyles();
        this.patchSettingsView();
    }

    loadStyles() {
        const style = window.KernelSettings.loadStyle("styles/index.css");
        if (!style) return;

        this.styleElement = document.head.appendChild(Object.assign(document.createElement("style"), {
            id: "kernel-settings-style",
            textContent: style
        }));
    }

    patchSettingsView() {
        const SettingsView = Webpack.findByDisplayName("SettingsView");

        Patcher.patch(SettingsView.prototype, "getPredicateSections", function (_, res) {
            if (!Array.isArray(res) || !res.some(e => e?.section?.toLowerCase() === "changelog") || res.some(s => s?.id === "kernel-settings")) return;

            const index = res.findIndex(s => s?.section?.toLowerCase() === "changelog") - 1;
            if (index < 0) return;

            res.splice(index, 0, ...SettingsSections);
        });
    }
}