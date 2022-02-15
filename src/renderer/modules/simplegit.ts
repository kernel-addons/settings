const period = "@@@===@@@";
const commitFields = ["hash", "hash_short", "author", "date", "message"];
const hashFields = ["short", "full"];

const runJS = SettingsNative.requireModule("run");

export type Commit = {
    hash?: string,
    hash_short?: string;
    author?: string;
    date?: string;
    message?: string;
};

export default class Git {
    static executeCmd(cmd: string, cwd?: string): Promise<string> {
        return runJS(`new Promise((resolve, reject) => {
            require("child_process").exec(${JSON.stringify(cmd)}, {
                cwd: ${JSON.stringify(cwd)}
            }, (error, res) => {
                if (error) return reject(error);
                
                resolve(res);
            });
        })`);
    }

    static async isInstalled(): Promise<boolean> {
        try {
            await this.executeCmd("git --version");
            return true;
        } catch {
            return false;
        }
    }

    static async isRepo(cwd: string): Promise<boolean> {
        try {
            const result = await this.executeCmd("git rev-parse --is-inside-work-tree", cwd);
            
            return result === "true";
        } catch {
            return false;
        }
    }

    static async getBranchName(cwd: string): Promise<string> {
        try {
            const result = await this.executeCmd("git branch -a", cwd);
            if (!result) return null;

            return result.slice(2, result.indexOf("\n"));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getLatestCommit(cwd: string, target: string = "master"): Promise<{short?: string, full?: string, hasError?: boolean}> {
        try {
            return this.parsePeriods(hashFields, await this.executeCmd(`git log -1 ${target} --pretty=format:"%h${period}%H"`, cwd));
        } catch (error) {
            console.error(error);
            return {hasError: true};
        }
    }

    static async getDiff(cwd: string, target: string = "master"): Promise<Commit[]> {
        try {
            const result = await this.executeCmd(`git log ${target}..origin/${target} --pretty=format:"%H${period}%h${period}%an${period}%ar${period}%s"`, cwd);
            if (!result) return [];
            return result.split("\n").map(p => this.parsePeriods(commitFields, p));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static parsePeriods(fields: string[], out: string) {
        return Object.fromEntries(out.split(period).map((c, i) => [fields[i], c]));
    }
}