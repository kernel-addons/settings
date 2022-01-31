import SettingsRenderer from "../modules/settings.js";

export default class Updater {
    static initialize() {
        SettingsRenderer.registerPanel("Updater", () => null);
    }
}