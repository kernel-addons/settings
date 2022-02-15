import type {Dirent} from "fs";

const fs = SettingsNative.requireModule("fs");
const path = SettingsNative.requireModule("path");

export namespace Storage {
    export let listeners: Set<Function> = new Set();
    export let location = "";
    export const groups: Map<string, any> = new Map();

    function tryJSON(json: string) {
        try {
            return JSON.parse(json);
        } catch (error) {
            return error;
        }
    };

    export function emit(...args: any[]) {
        const callbacks = [...listeners];

        for (let i = 0; i < callbacks.length; i++) {
            try {callbacks[i](...args);}
            catch (error) {console.error(error);}
        }
    };

    export function on(listener: Function): () => boolean {
        listeners.add(listener);

        return off.bind(listener);
    };

    export function off(listener: Function): boolean {
        return listeners.delete(listener);
    };

    export function use<T>(factory: () => T): T {
        const [state, setState] = React.useState(factory());

        React.useEffect(() => {
            const remove = on(() => {
                setState(factory());
            });

            return () => void remove();
        }, []);

        return state;
    };
 
    export function initialize(): void {
        location = Storage.location = path.resolve(fs.current, "..", "..", "..", "storage", "settings");
        if (!fs.exists(location)) {
            try {
                fs.createDir(location, {recursive: true});
            } catch (error) {
                return console.error(error);
            }
        }

        for (let files = fs.readDir(location, "utf8"), i = 0; i < files.length; i++) {
            const file = files[i] as string;
            if (!fs.stats(path.join(location, file)).isFile() || !file.endsWith(".json")) continue;
            const group = file.slice(0, file.indexOf(".json"));
            
            groups.set(group, tryJSON(fs.readFile(path.join(location, file), "utf8" as any) as string));
        }
    };

    export function get(group: string, def = null) {
        if (~group.indexOf(".")) {
            const [id, ...paths] = group.split(".");

            return paths.reduce((curr, name) => curr?.[name], groups.get(id) ?? def);
        } 

        return groups.get(group) ?? def;
    };

    export function set(group: string, data: any) {
        if (~group.indexOf(".")) {
            const [id, ...paths] = group.split(".");
            group = id;
            const prop = paths.pop();
            const stored = groups.get(id);
            
            if (stored != null) {
                const object = paths.reduce((curr, name) => curr?.[name], groups.get(id));
                if (object == null) throw new Error("Group path not found!");

                object[prop] = data;
            } else {
                const tree = paths.reduce((curr, name) => {
                    if (!curr[name]) curr[name] = {};

                    return curr[name];
                }, {});

                tree[prop] = data;
                groups.set(id, tree);
            }
        } else {
            groups.set(group, data);
        }

        fs.writeFile(path.join(Storage.location, group + ".json"), JSON.stringify(groups.get(group), null, "\t"));
        emit(group);
    };
}