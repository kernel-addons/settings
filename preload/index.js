const electron = require("electron");
const fs = require("fs");
const path = require("path");

function loadStyle(_path) {
    const finalPath = path.join(__dirname, "..", _path);
    if (!fs.existsSync(finalPath)) return;

    return fs.readFileSync(finalPath, "utf8");
};

function openPath(_path) {
    try {
        electron.shell.openPath(_path);
    } catch (error) {
        console.error("[KernelSettings:Native]: Fatal error:", error);
    }
};

function showItemInFolder(_path) {
    try {
        electron.shell.showItemInFolder(_path);
    } catch (error) {
        console.error("[KernelSettings:Native]: Fatal error:", error);
    }
};

function trashItem(_path) {
    try {
        electron.shell.trashItem(_path);
    } catch (error) {
        console.error("[KernelSettings:Native]: Fatal error:", error);
    }
}

electron.contextBridge.exposeInMainWorld("KernelSettings", {
    loadStyle,
    openPath,
    showItemInFolder,
    trashItem
});