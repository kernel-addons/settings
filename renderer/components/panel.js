import KernelCard from "./card.js";

export default function KernelPanel() {
    return React.createElement("div", {
        className: "kernel-panel",
        children: [
            React.createElement("div", {
                className: "kernel-title"
            }, "Packages"),
            React.createElement("div", {
                className: "kernel-card-scroller",
                children: Object.values(kernel.packages.getPackages()).map(pkg => React.createElement(KernelCard, {key: pkg.id, pkg}))
            })
        ]
    });
}