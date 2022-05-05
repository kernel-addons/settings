import CP from "child_process";

export namespace ChildProcess {
    export function exec(cmd: string, options: {cwd?: string}, callback: (error: Error | null, stdout: string, stderr: string) => void) {
        const instance = CP.exec(cmd, options, callback);

        return {
            ...instance,
            kill(sig: number) {return instance.kill(sig);}
        };
    }
}