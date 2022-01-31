type IPCCallback = (...args: any[]) => void;

export const events: {[event: string]: Set<IPCCallback>} = {};
const IPC = {
    on<T = IPCCallback>(event: string, callback: T) {
        if (!events[event]) events[event] = new Set();

        return events[event].add(callback as unknown as IPCCallback), IPC.off.bind(null, event, callback);
    },
    off<T = IPCCallback>(event: string, callback: T) {
        if (!events[event]) return;

        events[event].delete(callback as unknown as IPCCallback);
    },
    once<T = IPCCallback>(event: any, callback: T) {
        const unsubscribe = IPC.on(event, (...args) => {
            unsubscribe();
            return (callback as unknown as CallableFunction)(...args);
        });
    },
    dispatch(event: string, ...args: any[]) {
        if (!events[event]) return;

        for (const callback of events[event]) {
            try {callback(...args);}
            catch (error) {console.error(error);}
        }
    }
};

export default IPC;