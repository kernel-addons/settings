export default class Patcher {
    static _patches = new Set();

    static patch(module, func, callback, before = false) {
        const original = module[func];
        const unpatch = () => {module[func] = original;};

        module[func] = function () {
            if (before) {
                try {
                    Reflect.apply(callback, this, arguments);
                } catch (error) {
                    console.error("[Kernel:patcher] Error during before patch:", error);
                }
            }

            const returnValue = Reflect.apply(original, this, arguments);
            if (before) return returnValue;

            try {
                const tempRet = Reflect.apply(callback, this, [arguments, returnValue]);
                if (tempRet != null) returnValue = tempRet;
            } catch (error) {
                console.error("[Kernel:patcher] Error during patch:", error);
            }

            return returnValue;
        };

        this._patches.add(unpatch);

        return unpatch;
    }

    static unpatchAll() {
        for (const unpatch of this._patches) unpatch();
    }
}