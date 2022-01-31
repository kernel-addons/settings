export namespace Patcher {
    const patches = new Set<Function>();

    type PatcherCallback = (thisObject: any, methodArguments: IArguments, returnValue?: any) => any;

    export function patch(module: any, func: string, callback: PatcherCallback, before = false) {
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

            let returnValue = Reflect.apply(original, this, arguments);
            if (before) return returnValue;

            try {
                const tempRet = Reflect.apply(callback, this, [arguments, returnValue]);
                if (tempRet != null) returnValue = tempRet;
            } catch (error) {
                console.error("[Kernel:patcher] Error during patch:", error);
            }

            return returnValue;
        };
        Object.assign(module[func], original, {
            toString() {return original.toString()}
        });

        patches.add(unpatch);

        return unpatch;
    };

    export function unpatchAll() {
        for (const unpatch of patches) unpatch();
    };
}