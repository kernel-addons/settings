import fs from "fs";

export namespace Fs {
    export const current: string = __dirname;

    export function exists(path: fs.PathLike): boolean {
        return fs.existsSync(path);
    };

    export function isFile(path: fs.PathLike): boolean {
        return exists(path) && fs.statSync(path).isFile();
    };

    export function readFile(path: fs.PathOrFileDescriptor, options?: {encoding?: null, flag?: string}): string | Uint8Array {
        return fs.readFileSync(path, options);
    };
}