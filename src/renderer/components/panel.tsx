import KernelCard from "./card";
import DiscordComponents from "./discord";
import "./panel.scss";

const kernel: any = (window as any).kernel;

export default function KernelPanel() {
    const {Forms: {FormTitle}} = DiscordComponents;

    return (
        <div className="kernel-panel">
            <FormTitle tag={FormTitle.Tags.H1}>Packages</FormTitle>
            <div className="kernel-card-scroller">
                {Object.values<any>(kernel.packages.getPackages()).map(pkg => (
                    <KernelCard pkg={pkg} key={pkg.id ?? pkg.name} />
                ))}
            </div>
        </div>
    );
}