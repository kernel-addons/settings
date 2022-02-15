import fs from "fs";

export namespace Fs {
    export const current: string = __dirname;

    export function exists(path: fs.PathLike): boolean {
        return fs.existsSync(path);
    };

    export function isFile(path: fs.PathLike): boolean {
        return exists(path) && fs.statSync(path).isFile();
    };

    export function readFile(path: fs.PathOrFileDescriptor, options?: {encoding?: null, flag?: string} | BufferEncoding): string | Uint8Array {
        return fs.readFileSync(path, options);
    };

    export function readDir(path: fs.PathLike, options?: BufferEncoding | {encoding?: BufferEncoding, withFileTypes?: boolean}): string[] | fs.Dirent[] {
        return fs.readdirSync(path, options as any);
    };

    export function writeFile(path: fs.PathLike, data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions): void {
        return fs.writeFileSync(path, data, options);
    };

    export function createDir(path: fs.PathLike, options?: fs.MakeDirectoryOptions & {recursive: boolean}): string {
        return fs.mkdirSync(path, options);
    };

    export function stats(path: fs.PathLike): fs.Stats {
        const stats = fs.statSync(path);
        const cloned = {};

        for (const prop in stats) {
            cloned[prop] = typeof stats[prop] === "function" ? stats[prop].bind(stats) : stats[prop];
        }

        return cloned as unknown as fs.Stats;
    };
}