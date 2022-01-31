export default class Git {
    static async executeCmd(cmd, cwd) {
        return new Promise((resolve, reject) => {
            const id = "GIT_CMD_" + Math.random().toString(36).slice(2);
            KernelSettingsIPC.on(id, (error, res) => {
                if (error) reject(error);
                else resolve(res);
            });

            KernelSettings.executeJS(`void require("child_process").exec(${JSON.stringify(cmd)}, {
                cwd: ${JSON.stringify(cwd)}
            }, (error, res) => {
                KernelSettingsIPC.dispatch(${JSON.stringify(id)}, error, res);
                delete KernelSettingsIPCEvents[${JSON.stringify(id)}];
            })`);
        });
    }

    static async hasGitInstalled() {
        try {
            await this.executeCmd("git --version");
            return true;
        } catch {return false;}
    }

    static async isGitRepo(cwd) {
        try {
            const result = await this.executeCmd("git rev-parse --is-inside-work-tree", cwd);
            
            return result === "true";
        } catch {
            return false;
        }
    }

    static async getBranchName(cwd) {
        try {
            const result = await this.executeCmd("git branch -a", cwd);
            if (!result) return null;

            return result.slice(2, result.indexOf("\n"));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getDiff(cwd) {
        try {
            const branch = await this.getBranchName(cwd);
            if (!branch) throw "Unknown branch";

            return this.executeCmd(`git log master..origin/master --pretty=format:"%h - %an, %ar : %s"`, cwd);
        } catch (error) {
            console.error(error);
            return {hasError: true};
        }
    }
}