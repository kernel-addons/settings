const handler = (cmd, cwd) => new Promise((resolve, reject) => {
    require("child_process").exec(cmd, {cwd}, (error, stdout) => {
        if (error) return reject(error);

        resolve(stdout);
    });
});

const runCommand = SettingsNative.requireModule("run")(handler.toString());

export default class Git {
    static async executeCmd(cmd, cwd) {
        return runCommand(cmd, cwd);
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