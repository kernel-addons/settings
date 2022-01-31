export default function memoize<T = any>(object: T): {[key in keyof T]: any} {
    const keys = Object.keys(object);
    const clone = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (!descriptor || !descriptor.get) {
            clone[key] = object[key];
            continue;
        }

        const getter = descriptor.get;
        let value = undefined;
        Object.defineProperty(clone, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value !== undefined ? value : (value = getter());
            }
        });
    }

    return clone as any;
};