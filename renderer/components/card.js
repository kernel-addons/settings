import Components from "./index.js";

export function Icon({name, ...props}) {
    const Component = Components.get(name);
    if (!Components) return null;

    return React.createElement(Component, props);
};

export function ToolButton({label, icon, onClick, danger = false}) {
    const Button = Components.byProps("DropdownSizes");

    return React.createElement(Components.get("Tooltip"), {
        text: label,
        position: "top"
    }, props => React.createElement(Button, {
        ...props,
        className: "kernel-toolbutton",
        look: Button.Looks.BLANK,
        size: Button.Sizes.NONE,
        onClick: onClick
    }, React.createElement(Icon, {name: icon, color: danger ? "#ed4245" : void 0})));
};

export function ButtonWrapper({value, onChange, disabled}) {
    const [isChecked, setChecked] = React.useState(value);

    return React.createElement(Components.get("Switch"), {
        checked: isChecked,
        disabled,
        onChange: () => {
            onChange(!isChecked);
            setChecked(!isChecked);
        }
    });
};

export function openItem(_path) {
    if (_path.endsWith(".asar")) return window.KernelSettings.showItemInFolder(_path);

    window.KernelSettings.openPath(_path);
};

export default function KernelCard({pkg}) {
    return React.createElement("div", {
        className: "kernel-card",
        key: pkg.id,
        children: [
            React.createElement("div", {
                className: "kernel-card-tools",
                children: [
                     React.createElement(ToolButton, {
                        label: "Open Path",
                        icon: "Folder",
                        onClick: () => {
                            openItem(pkg.path);
                        }
                    }),
                    React.createElement(ToolButton, {
                        label: "Delete",
                        icon: "Trash",
                        danger: true,
                        onClick: () => window.KernelSettings.trashItem(pkg.path)
                    })
                ]
            }),
            React.createElement("div", {
                className: "kernel-card-header",
                children: React.createElement("div", {className: "kernel-card-name", }, pkg.name)
            }),
            pkg.description && React.createElement("div", {
                className: "kernel-card-desc",
            }, React.createElement(Components.get("Markdown"), null, pkg.description)),
            React.createElement("div", {
                className: "kernel-footer",
                children: React.createElement(ButtonWrapper, {
                    value: pkg.enabled,
                    disabled: pkg.id === "kernel-settings",
                    onChange: value => {
                        if (pkg.id === "kernel-settings") return;

                        if (!value) kernel.packages.stopPackage(pkg.id);
                        else kernel.packages.startPackage(pkg.id);
                    }
                })
            })
        ]
    });
}