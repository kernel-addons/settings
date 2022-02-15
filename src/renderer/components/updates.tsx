import DiscordModules from "@modules/discord";
import {Logger} from "@modules/logger";
import makeLazy from "@modules/makelazy";
import Git, {Commit} from "@modules/simplegit";
import {Storage} from "@modules/storage";
import DiscordComponents from "./discord";
import Shield from "./icons/shield";
import UpdateAvailable from "./icons/update_available";
import {Match, Switch, Show, For} from "./primitives";
import "./updates.scss";

const fs = SettingsNative.requireModule("fs");

function useGitCommand<T>(factory: () => null | Promise<T>, deps?: any[]): {loaded: boolean, result: T, fetch(): void} {
    const [state, setState] = React.useState({loaded: false, result: null});

    const handleFetch = () => {
        Promise.resolve(factory()).then(result => {
            setState({
                loaded: typeof result === "boolean" ? true : !!result,
                result: result
            });
        }).catch(console.error);
    };

    React.useEffect(handleFetch, deps ?? []);

    return {
        ...state,
        fetch() {
            setState({loaded: false, result: null});
            handleFetch();
        }
    };
}

export const LoadingSpinner = () => {
    const {Spinner} = DiscordComponents;

    return (
        <Spinner type={Spinner.Type.LOW_MOTION} className="ksu-spinner" />
    );
};

export const CurrentBranch = makeLazy(async ({gitLoaded}) => {
    if (!gitLoaded) return null;

    const {Link} = DiscordComponents;

    const branch = await Git.getBranchName(fs.current);

    return (
        <Link href={`https://github.com/strencher-kernel/settings/tree/${branch}`}>{branch}</Link>
    );
}, LoadingSpinner);

export const CurrentCommitHash = makeLazy(async ({gitLoaded}) => {
    if (!gitLoaded) return null;

    const {Text, Link} = DiscordComponents;
    const hash: any = await Git.getLatestCommit(fs.current, await Git.getBranchName(fs.current));

    if (hash.hasError) return (
        <Text color={Text.Colors.RED}>error</Text>
    );

    return (
        <Link href={`https://github.com/strencher-kernel/settings/tree/${hash.full}`}>{hash.short}</Link>
    );
}, LoadingSpinner);

let needsReload = false;
export default function UpdaterPanel() {
    const {Moment} = DiscordModules;
    const [errorMessage, setError] = React.useState(null);
    const {Link, Button, Text, Flex, Forms: {FormTitle, FormNotice, FormDivider, FormItem}, Spinner} = DiscordComponents;
    const git = useGitCommand<boolean>(() => Git.isInstalled());
    const updates = useGitCommand<Commit[]>(async () => {
        if (!git.loaded || !git.result) return [];

        return Git.getDiff(fs.current);
    }, [git.loaded]);
    const lastUpdate = Moment(Storage.use(() => Storage.get("updater.lastFetch", new Date())));
    
    return (
        <div className="kernel-panel">
            <FormTitle tag={FormTitle.Tags.H1}>Updates</FormTitle>
            <Show when={git.loaded} fallback={<Spinner type={Spinner.Type.WANDERING_CUBES} />}>
                <Show when={!git.result}>
                    <FormNotice
                        type={FormNotice.Types.DANGER}
                        className="ks-marginBottom20"
                        title="Git installation not found!"
                        imageData={{src: "/assets/6e97f6643e7df29b26571d96430e92f4.svg", width: 60, height: 60}}
                        body={<span>Currently KernelSettings relies on your local git installation. Please install git to use this updater.</span>}
                    />
                </Show>
                <Show when={errorMessage != null}>
                    <FormNotice
                        type={FormNotice.Types.DANGER}
                        className="ks-marginBottom20"
                        title="Error occurred"
                        imageData={{src: "/assets/6e97f6643e7df29b26571d96430e92f4.svg", width: 60, height: 60}}
                        body={<span>{errorMessage}</span>}
                    />
                </Show>
                <Show when={errorMessage == null && needsReload}>
                    <FormNotice
                        type={FormNotice.Types.WARNING}
                        className="ks-marginBottom20"
                        title="Reload required"
                        imageData={{src: "/assets/6e97f6643e7df29b26571d96430e92f4.svg", width: 60, height: 60}}
                        body={<span>Client reload is required in order to make changes take affect.</span>}
                    />
                </Show>
                <Show when={git.result}>
                    <Flex className="ksu-card" direction={Flex.Direction.VERTICAL}>
                        <Flex justify={Flex.Justify.BETWEEN} align={Flex.Align.CENTER}>
                            <Flex className="ksu-shield-container" direction={Flex.Direction.HORIZONTAL} align={Flex.Align.START} justify={Flex.Justify.CENTER}>
                                <Show
                                    when={updates.loaded}
                                    fallback={(
                                        <UpdateAvailable
                                            width="70"
                                            height="70"
                                            className="ks-update-available ksu-shield"
                                        />
                                    )}
                                >
                                    <Shield
                                        type={updates.result?.length > 0 ? Shield.Types.WARNING : Shield.Types.VERIFIED}
                                        width="70"
                                        height="70"
                                        className={`ksu-shield ${updates.result?.length > 0 ? "ksu-shield-warn" : "ksu-shield-ok"}`}
                                    />
                                </Show>
                                <Flex.Child>
                                    <Text size={Text.Sizes.SIZE_24} color={Text.Colors.HEADER_PRIMARY}>
                                        <Switch default="Everything is up to date!">
                                            <Match when={!updates.loaded}>
                                                Loading...
                                            </Match>
                                            <Match when={updates.result?.length > 0}>
                                                Something needs to be updated!
                                            </Match>
                                        </Switch>
                                    </Text>
                                    <Text size={Text.Sizes.SIZE_14} color={Text.Colors.HEADER_SECONDARY}>
                                        Last Checked: {lastUpdate.calendar()}
                                    </Text>
                                </Flex.Child>
                            </Flex>
                            <div className="ksu-git-info">
                                <Text className="ksu-git-info-item">Branch: <CurrentBranch gitLoaded={!!git.result} /></Text>
                                <Text className="ksu-git-info-item">Commit: <CurrentCommitHash gitLoaded={!!git.result} /></Text>
                            </div>
                        </Flex>
                        <FormDivider className="ksu-divider" />
                        <Flex direction={Flex.Direction.HORIZONTAL}>
                            <Button
                                disabled={!updates.loaded}
                                color={Button.Colors.BRAND}
                                size={Button.Sizes.SMALL}
                                className="ksu-button"
                                onClick={() => {
                                    updates.fetch();
                                    Storage.set("updater.lastFetch", new Date());
                                }}
                            >Check for Updates</Button>
                            <Show when={updates.result?.length > 0}>
                                <Button
                                    disabled={!updates.loaded}
                                    color={Button.Colors.YELLOW}
                                    size={Button.Sizes.SMALL}
                                    className="ksu-button"
                                    onClick={() => {
                                        Git.executeCmd("git pull", fs.current)
                                            .then(() => {
                                                needsReload = true;
                                                updates.fetch();
                                            })
                                            .catch(error => {
                                                Logger.error("Updater", "Failed to update!", error);
                                                setError("Error occurred while updating kernel settings. Check your console (Ctrl/Cmd + Shift + I) and report any errors.");
                                            });
                                    }}
                                >Update</Button>
                            </Show>
                            <Show when={needsReload}>
                                <Button
                                    color={Button.Colors.GREEN}
                                    size={Button.Sizes.SMALL}
                                    className="ksu-button ksu-reload-button"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >Reload <UpdateAvailable /></Button>
                            </Show>
                        </Flex>
                        <Show when={updates.result?.length > 0}>
                            <FormDivider className="ksu-divider" />
                            <FormItem title="Recent Commits" tag="h5">
                                <For each={updates.result}>
                                    {(commit, index) => (
                                        <div className="ksu-commit" key={index}>
                                            <span className="ksu-commit-hash">
                                                <Link href={`https://github.com/strencher-kernel/settings/commit/${commit.hash}`}>{commit.hash_short}</Link>
                                            </span>
                                            <span className="ksu-commit-name">{commit.message}</span>
                                            <span className="ksu-commit-author-label"> by </span>
                                            <span className="ksu-commit-author">
                                                <img className="ksu-commit-author-avatar" src={`https://github.com/${commit.author}.png?size=20`} />
                                                <span className="ksu-commit-author-name">{commit.author}</span>
                                            </span>
                                        </div>
                                    )}
                                </For>
                            </FormItem>
                        </Show>
                    </Flex>
                </Show>
            </Show>
        </div>
    );
}