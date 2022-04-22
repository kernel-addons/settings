var __webpack_modules__={935:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "u": () => (/* reexport */ Electron),\n  "Fs": () => (/* reexport */ Fs)\n});\n\n// EXTERNAL MODULE: external "electron"\nvar external_electron_ = __webpack_require__(496);\n;// CONCATENATED MODULE: ./src/preload/api/electron.ts\nvar Electron;(function(Electron1){function openPath(path){try{external_electron_.shell.openPath(path)}catch(error){console.error("[KernelSettings:Native]: Fatal error:",error)}}Electron1.openPath=openPath;function showItemInFolder(path){try{external_electron_.shell.showItemInFolder(path)}catch(error){console.error("[KernelSettings:Native]: Fatal error:",error)}}Electron1.showItemInFolder=showItemInFolder;function trashItem(path){try{external_electron_.shell.trashItem(path)}catch(error){console.error("[KernelSettings:Native]: Fatal error:",error)}}Electron1.trashItem=trashItem})(Electron||(Electron={}))\n;// CONCATENATED MODULE: external "fs"\nconst external_fs_namespaceObject = require("fs");\nvar external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);\n;// CONCATENATED MODULE: ./src/preload/api/fs.ts\nvar Fs;(function(Fs1){var current=Fs1.current=__dirname;function exists(path){return external_fs_default().existsSync(path)}Fs1.exists=exists;function isFile(path){return exists(path)&&external_fs_default().statSync(path).isFile()}Fs1.isFile=isFile;function readFile(path,options){return external_fs_default().readFileSync(path,options)}Fs1.readFile=readFile;function readDir(path,options){return external_fs_default().readdirSync(path,options)}Fs1.readDir=readDir;function writeFile(path,data,options){return external_fs_default().writeFileSync(path,data,options)}Fs1.writeFile=writeFile;function createDir(path,options){return external_fs_default().mkdirSync(path,options)}Fs1.createDir=createDir;function stats1(path){const stats=external_fs_default().statSync(path);const cloned={};for(const prop in stats){cloned[prop]=typeof stats[prop]==="function"?stats[prop].bind(stats):stats[prop]}return cloned}Fs1.stats=stats1})(Fs||(Fs={}))\n;// CONCATENATED MODULE: ./src/preload/api/index.ts\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8va2VybmVsLXNldHRpbmdzLy4vc3JjL3ByZWxvYWQvYXBpL2VsZWN0cm9uLnRzPzU0ZDIiLCJ3ZWJwYWNrOi8va2VybmVsLXNldHRpbmdzL2V4dGVybmFsIGNvbW1vbmpzIFwiZnNcIj81MGYyIiwid2VicGFjazovL2tlcm5lbC1zZXR0aW5ncy8uL3NyYy9wcmVsb2FkL2FwaS9mcy50cz8zNTdiIiwid2VicGFjazovL2tlcm5lbC1zZXR0aW5ncy8uL3NyYy9wcmVsb2FkL2FwaS9pbmRleC50cz8xMjQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2hlbGx9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEVsZWN0cm9uIHtcbiAgICBleHBvcnQgZnVuY3Rpb24gb3BlblBhdGgocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzaGVsbC5vcGVuUGF0aChwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbS2VybmVsU2V0dGluZ3M6TmF0aXZlXTogRmF0YWwgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNob3dJdGVtSW5Gb2xkZXIocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzaGVsbC5zaG93SXRlbUluRm9sZGVyKHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltLZXJuZWxTZXR0aW5nczpOYXRpdmVdOiBGYXRhbCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBleHBvcnQgZnVuY3Rpb24gdHJhc2hJdGVtKHBhdGg6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2hlbGwudHJhc2hJdGVtKHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltLZXJuZWxTZXR0aW5nczpOYXRpdmVdOiBGYXRhbCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufSIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwiZnNcIik7IiwiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEZzIHtcbiAgICBleHBvcnQgY29uc3QgY3VycmVudDogc3RyaW5nID0gX19kaXJuYW1lO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGV4aXN0cyhwYXRoOiBmcy5QYXRoTGlrZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhwYXRoKTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZShwYXRoOiBmcy5QYXRoTGlrZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZXhpc3RzKHBhdGgpICYmIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICAgIH07XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVhZEZpbGUocGF0aDogZnMuUGF0aE9yRmlsZURlc2NyaXB0b3IsIG9wdGlvbnM/OiB7ZW5jb2Rpbmc/OiBudWxsLCBmbGFnPzogc3RyaW5nfSB8IEJ1ZmZlckVuY29kaW5nKTogc3RyaW5nIHwgVWludDhBcnJheSB7XG4gICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocGF0aCwgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWFkRGlyKHBhdGg6IGZzLlBhdGhMaWtlLCBvcHRpb25zPzogQnVmZmVyRW5jb2RpbmcgfCB7ZW5jb2Rpbmc/OiBCdWZmZXJFbmNvZGluZywgd2l0aEZpbGVUeXBlcz86IGJvb2xlYW59KTogc3RyaW5nW10gfCBmcy5EaXJlbnRbXSB7XG4gICAgICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhwYXRoLCBvcHRpb25zIGFzIGFueSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB3cml0ZUZpbGUocGF0aDogZnMuUGF0aExpa2UsIGRhdGE6IHN0cmluZyB8IE5vZGVKUy5BcnJheUJ1ZmZlclZpZXcsIG9wdGlvbnM/OiBmcy5Xcml0ZUZpbGVPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHJldHVybiBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIGRhdGEsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlyKHBhdGg6IGZzLlBhdGhMaWtlLCBvcHRpb25zPzogZnMuTWFrZURpcmVjdG9yeU9wdGlvbnMgJiB7cmVjdXJzaXZlOiBib29sZWFufSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmcy5ta2RpclN5bmMocGF0aCwgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBzdGF0cyhwYXRoOiBmcy5QYXRoTGlrZSk6IGZzLlN0YXRzIHtcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoKTtcbiAgICAgICAgY29uc3QgY2xvbmVkID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHN0YXRzKSB7XG4gICAgICAgICAgICBjbG9uZWRbcHJvcF0gPSB0eXBlb2Ygc3RhdHNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIiA/IHN0YXRzW3Byb3BdLmJpbmQoc3RhdHMpIDogc3RhdHNbcHJvcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xvbmVkIGFzIHVua25vd24gYXMgZnMuU3RhdHM7XG4gICAgfTtcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9lbGVjdHJvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vZnNcIjsiXSwibmFtZXMiOlsic2hlbGwiLCJvcGVuUGF0aCIsInBhdGgiLCJlcnJvciIsImNvbnNvbGUiLCJzaG93SXRlbUluRm9sZGVyIiwidHJhc2hJdGVtIiwiRWxlY3Ryb24iLCJmcyIsImN1cnJlbnQiLCJfX2Rpcm5hbWUiLCJleGlzdHMiLCJleGlzdHNTeW5jIiwiaXNGaWxlIiwic3RhdFN5bmMiLCJyZWFkRmlsZSIsIm9wdGlvbnMiLCJyZWFkRmlsZVN5bmMiLCJyZWFkRGlyIiwicmVhZGRpclN5bmMiLCJ3cml0ZUZpbGUiLCJkYXRhIiwid3JpdGVGaWxlU3luYyIsImNyZWF0ZURpciIsIm1rZGlyU3luYyIsInN0YXRzIiwiY2xvbmVkIiwicHJvcCIsImJpbmQiLCJGcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///935\n')},950:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(496);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(469);\nif(process.contextIsolated){electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld("SettingsNative",_native__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)}Object.assign(window,{SettingsNative: _native__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTUwLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFHQSxFQUFFLENBQUdFLE9BQU8sQ0FBU0MsZUFBZSxDQUFFLENBQUMscUVBQ0osQ0FBQyxDQUFnQixnQkFBRUYsd0RBQWMsQ0FDcEUsQ0FBQyxNQUVLLENBQUNLLE1BQU0sQ0FBQ0MsTUFBTSxDQUFFLENBQUNOLGNBQWMsMkRBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZXJuZWwtc2V0dGluZ3MvLi9zcmMvcHJlbG9hZC9pbmRleC50cz8yZWVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29udGV4dEJyaWRnZX0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgU2V0dGluZ3NOYXRpdmUgZnJvbSBcIi4vbmF0aXZlXCI7XG5cbmlmICgocHJvY2VzcyBhcyBhbnkpLmNvbnRleHRJc29sYXRlZCkge1xuICAgIGNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoXCJTZXR0aW5nc05hdGl2ZVwiLCBTZXR0aW5nc05hdGl2ZSk7XG59XG5cbk9iamVjdC5hc3NpZ24od2luZG93LCB7U2V0dGluZ3NOYXRpdmV9KTsiXSwibmFtZXMiOlsiY29udGV4dEJyaWRnZSIsIlNldHRpbmdzTmF0aXZlIiwicHJvY2VzcyIsImNvbnRleHRJc29sYXRlZCIsImV4cG9zZUluTWFpbldvcmxkIiwiT2JqZWN0IiwiYXNzaWduIiwid2luZG93Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///950\n')},145:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* unused harmony export events */\nconst events={};const IPC={on(event,callback){if(!events[event])events[event]=new Set();return events[event].add(callback),IPC.off.bind(null,event,callback)},off(event,callback){if(!events[event])return;events[event].delete(callback)},once(event,callback){const unsubscribe=IPC.on(event,(...args)=>{unsubscribe();return callback(...args)})},dispatch(event,...args){if(!events[event])return;for(const callback of events[event]){try{callback(...args)}catch(error){console.error(error)}}}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IPC);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQ1LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxLQUFLLENBQUNBLE1BQU0sQ0FBd0MsQ0FBQyxDQUFDLENBQzdELEtBQUssQ0FBQ0MsR0FBRyxDQUFHLENBQUMsRUFDUCxDQUFrQkUsS0FBYSxDQUFFQyxRQUFXLENBQUUsQ0FBQyxFQUMzQyxFQUFHSixNQUFNLENBQUNHLEtBQUssRUFBR0gsTUFBTSxDQUFDRyxLQUFLLEVBQUksR0FBRyxDQUFDRSxHQUFHLEdBRTNDLE1BQU0sQ0FBQ0wsTUFBTSxDQUFDRyxLQUFLLEVBQUVHLEdBQUcsQ0FBQ0YsUUFBUSxFQUE2QkgsR0FBRyxDQUFDTSxHQUFHLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUVMLEtBQUssQ0FBRUMsUUFBUSxDQUNwRyxDQUFDLENBQ0RHLEdBQUcsQ0FBa0JKLEtBQWEsQ0FBRUMsUUFBVyxDQUFFLENBQUMsRUFDNUMsRUFBR0osTUFBTSxDQUFDRyxLQUFLLEVBQUcsTUFBTSxDQUUxQkgsTUFBTSxDQUFDRyxLQUFLLEVBQUVNLE1BQU0sQ0FBQ0wsUUFBUSxDQUNqQyxDQUFDLENBQ0RNLElBQUksQ0FBa0JQLEtBQVUsQ0FBRUMsUUFBVyxDQUFFLENBQUMsS0FDdkMsQ0FBQ08sV0FBVyxDQUFHVixHQUFHLENBQUNDLEVBQUUsQ0FBQ0MsS0FBSyxLQUFNUyxJQUFJLEdBQUssQ0FBQyxXQUNqQyxHQUNYLE1BQU0sQ0FBRVIsUUFBUSxJQUFvQ1EsSUFBSSxDQUM1RCxDQUFDLENBQ0wsQ0FBQyxDQUNEQyxRQUFRLENBQUNWLEtBQWEsSUFBS1MsSUFBSSxDQUFTLENBQUMsRUFDbkMsRUFBR1osTUFBTSxDQUFDRyxLQUFLLEVBQUcsTUFBTSxDQUUxQixHQUFHLENBQUUsS0FBSyxDQUFDQyxRQUFRLElBQUlKLE1BQU0sQ0FBQ0csS0FBSyxFQUFHLENBQUMsR0FDaEMsQ0FBRUMsUUFBUSxJQUFJUSxJQUFJLENBQUUsQ0FBQyxLQUNuQixDQUFFRSxLQUFLLENBQUUsQ0FBQ0MsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBRSxDQUFDLENBQ3hDLENBQ0osQ0FDSixDQUVELGlFQUFlYiIsInNvdXJjZXMiOlsid2VicGFjazovL2tlcm5lbC1zZXR0aW5ncy8uL3NyYy9wcmVsb2FkL2lwYy50cz82ZmUyIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgSVBDQ2FsbGJhY2sgPSAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5cbmV4cG9ydCBjb25zdCBldmVudHM6IHtbZXZlbnQ6IHN0cmluZ106IFNldDxJUENDYWxsYmFjaz59ID0ge307XG5jb25zdCBJUEMgPSB7XG4gICAgb248VCA9IElQQ0NhbGxiYWNrPihldmVudDogc3RyaW5nLCBjYWxsYmFjazogVCkge1xuICAgICAgICBpZiAoIWV2ZW50c1tldmVudF0pIGV2ZW50c1tldmVudF0gPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudF0uYWRkKGNhbGxiYWNrIGFzIHVua25vd24gYXMgSVBDQ2FsbGJhY2spLCBJUEMub2ZmLmJpbmQobnVsbCwgZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9mZjxUID0gSVBDQ2FsbGJhY2s+KGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBUKSB7XG4gICAgICAgIGlmICghZXZlbnRzW2V2ZW50XSkgcmV0dXJuO1xuXG4gICAgICAgIGV2ZW50c1tldmVudF0uZGVsZXRlKGNhbGxiYWNrIGFzIHVua25vd24gYXMgSVBDQ2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25jZTxUID0gSVBDQ2FsbGJhY2s+KGV2ZW50OiBhbnksIGNhbGxiYWNrOiBUKSB7XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gSVBDLm9uKGV2ZW50LCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiAoY2FsbGJhY2sgYXMgdW5rbm93biBhcyBDYWxsYWJsZUZ1bmN0aW9uKSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkaXNwYXRjaChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoIWV2ZW50c1tldmVudF0pIHJldHVybjtcblxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIHRyeSB7Y2FsbGJhY2soLi4uYXJncyk7fVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7Y29uc29sZS5lcnJvcihlcnJvcik7fVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSVBDOyJdLCJuYW1lcyI6WyJldmVudHMiLCJJUEMiLCJvbiIsImV2ZW50IiwiY2FsbGJhY2siLCJTZXQiLCJhZGQiLCJvZmYiLCJiaW5kIiwiZGVsZXRlIiwib25jZSIsInVuc3Vic2NyaWJlIiwiYXJncyIsImRpc3BhdGNoIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///145\n')},469:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(935);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(423);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\nconst SettingsNative={modules:["ipc","electron","fs","path","run"],requireModule(module){switch(module){case"ipc":return _ipc__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z;case"electron":return _api__WEBPACK_IMPORTED_MODULE_1__/* .Electron */ .u;case"fs":return _api__WEBPACK_IMPORTED_MODULE_1__.Fs;case"path":return (path__WEBPACK_IMPORTED_MODULE_2___default());case"run":return js=>eval(js);default:throw new Error(`Cannot find module "${module}"`)}}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsNative);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDY5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFhQSxLQUFLLENBQUNJLGNBQWMsQ0FBRyxDQUFDLE9BQ2IsQ0FBRSxDQUFDLENBQUssS0FBRSxDQUFVLFVBQUUsQ0FBSSxJQUFFLENBQU0sTUFBRSxDQUFLLEtBQUMsQ0FDakRFLGFBQWEsQ0FBNkJDLE1BQVMsQ0FBbUIsQ0FBQyxNQUM3RCxDQUFFQSxNQUFNLEVBQ1YsSUFBSSxDQUFNLEtBQUUsTUFBTSxDQUFDUCxxREFBRyxDQUN0QixJQUFJLENBQVcsVUFBRSxNQUFNLENBQUNDLG1EQUFRLENBQ2hDLElBQUksQ0FBSyxJQUFFLE1BQU0sQ0FBQ0Msb0NBQUUsQ0FDcEIsSUFBSSxDQUFPLE1BQUUsTUFBTSxDQUFDQyw2Q0FBSSxDQUN4QixJQUFJLENBQU0sS0FBRSxNQUFNLENBQUdLLEVBQVUsRUFBS0MsSUFBSSxDQUFDRCxFQUFFLFVBRWxDLEtBQUssQ0FBQyxHQUFHLENBQUNFLEtBQUssRUFBRSxvQkFBb0IsRUFBRUgsTUFBTSxDQUFDLENBQUMsR0FFaEUsQ0FBQyxDQUNKLENBRUQsaUVBQWVIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2VybmVsLXNldHRpbmdzLy4vc3JjL3ByZWxvYWQvbmF0aXZlLnRzPzljNzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElQQyBmcm9tIFwiLi9pcGNcIjtcbmltcG9ydCB7RWxlY3Ryb24sIEZzfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCB0eXBlIE5hdGl2ZU1vZHVsZU5hbWUgPSBcImlwY1wiIHwgXCJlbGVjdHJvblwiIHwgXCJmc1wiIHwgXCJwYXRoXCIgfCBcInJ1blwiO1xuXG5leHBvcnQgdHlwZSBOYXRpdmVNb2R1bGU8VD4gPVxuICAgIFQgZXh0ZW5kcyBcImlwY1wiID8gdHlwZW9mIElQQyA6XG4gICAgVCBleHRlbmRzIFwiZWxlY3Ryb25cIiA/IHR5cGVvZiBFbGVjdHJvbiA6XG4gICAgVCBleHRlbmRzIFwiZnNcIiA/IHR5cGVvZiBGcyA6XG4gICAgVCBleHRlbmRzIFwicGF0aFwiID8gdHlwZW9mIHBhdGggOlxuICAgIFQgZXh0ZW5kcyBcInJ1blwiID8gdHlwZW9mIGV2YWwgOiBuZXZlcjtcblxuY29uc3QgU2V0dGluZ3NOYXRpdmUgPSB7XG4gICAgbW9kdWxlczogW1wiaXBjXCIsIFwiZWxlY3Ryb25cIiwgXCJmc1wiLCBcInBhdGhcIiwgXCJydW5cIl0sXG4gICAgcmVxdWlyZU1vZHVsZTxUIGV4dGVuZHMgTmF0aXZlTW9kdWxlTmFtZT4obW9kdWxlOiBUKTogTmF0aXZlTW9kdWxlPFQ+IHtcbiAgICAgICAgc3dpdGNoIChtb2R1bGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpcGNcIjogcmV0dXJuIElQQyBhcyBOYXRpdmVNb2R1bGU8dHlwZW9mIElQQz47XG4gICAgICAgICAgICBjYXNlIFwiZWxlY3Ryb25cIjogcmV0dXJuIEVsZWN0cm9uIGFzIE5hdGl2ZU1vZHVsZTx0eXBlb2YgRWxlY3Ryb24+O1xuICAgICAgICAgICAgY2FzZSBcImZzXCI6IHJldHVybiBGcyBhcyBOYXRpdmVNb2R1bGU8dHlwZW9mIEZzPjtcbiAgICAgICAgICAgIGNhc2UgXCJwYXRoXCI6IHJldHVybiBwYXRoIGFzIE5hdGl2ZU1vZHVsZTx0eXBlb2YgcGF0aD47XG4gICAgICAgICAgICBjYXNlIFwicnVuXCI6IHJldHVybiAoKGpzOiBzdHJpbmcpID0+IGV2YWwoanMpKSBhcyBOYXRpdmVNb2R1bGU8KCkgPT4gYW55PjtcblxuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBtb2R1bGUgXCIke21vZHVsZX1cImApO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NOYXRpdmU7Il0sIm5hbWVzIjpbIklQQyIsIkVsZWN0cm9uIiwiRnMiLCJwYXRoIiwiU2V0dGluZ3NOYXRpdmUiLCJtb2R1bGVzIiwicmVxdWlyZU1vZHVsZSIsIm1vZHVsZSIsImpzIiwiZXZhbCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///469\n')},496:Q=>{Q.exports=require("electron")},423:Q=>{Q.exports=require("path")}},__webpack_module_cache__={};function __webpack_require__(Q){var U=__webpack_module_cache__[Q];if(void 0!==U)return U.exports;var e=__webpack_module_cache__[Q]={exports:{}};return __webpack_modules__[Q](e,e.exports,__webpack_require__),e.exports}__webpack_require__.n=Q=>{var U=Q&&Q.__esModule?()=>Q.default:()=>Q;return __webpack_require__.d(U,{a:U}),U},__webpack_require__.d=(Q,U)=>{for(var e in U)__webpack_require__.o(U,e)&&!__webpack_require__.o(Q,e)&&Object.defineProperty(Q,e,{enumerable:!0,get:U[e]})},__webpack_require__.o=(Q,U)=>Object.prototype.hasOwnProperty.call(Q,U),__webpack_require__.r=Q=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(Q,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(Q,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(950),__webpack_export_target__=exports;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0});