# Kernel Settings
> Simple settings module for kernel with an API out of the box.
## Interface
```ts
interface SettingsSection {
    section: "DIVIDER" | "CUSTOM" | string;
    element?(): React.ReactElement;
    label?: string;
    id?: string;
    className?: string;
} 

interface SectionOptions {
    render(): React.ReactElement;
    className?: string;
}

interface KernelSettings {
    /**
     * Registers a tab in the settings section below "Kernel"
     * @param name Represents the name of the tab, will also be the label.
     * @param render Render/Options for the tab. See {@link SettingsOptions}
     */
    register(name: string, render: (() => React.ReactElement) | SectionOptions): () => boolean;
    /**
     * Represents all registered panels.
     */
    panels: SettingsSection[];
    private initialize(): void;
}
```
## Usage
```ts
KernelSettings.register("MyAwesomeTab", () => <p>Hi :p</p>);
// or
KernelSettings.register("MyAwesomeTab", {
    render: () => <p>Hi :p</p>,
    className: "my-className-will-be-visible-in-dom"
});
```