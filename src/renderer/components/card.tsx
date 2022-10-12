import "./card.scss";
import DiscordComponents from "./discord";
import Icon from "./icons";

const kernel: any = (window as any).kernel;
const Electron = SettingsNative.requireModule("electron");

export function ToolButton({ label, icon, onClick, danger = false }) {
  const { Tooltips, Button } = DiscordComponents;

  return (
    <Tooltips text={label} position="top">
      {(props) => (
        <Button
          {...props}
          className="kernel-toolbutton"
          look={Button.Looks.BLANK}
          size={Button.Sizes.NONE}
          onClick={onClick}
        >
          <Icon size="20" name={icon} color={danger ? "#ed4245" : undefined} />
        </Button>
      )}
    </Tooltips>
  );
}

export function SwitchWrapper({ value, onChange, disabled }) {
  const { Switch } = DiscordComponents;
  const [isChecked, setChecked] = React.useState(value);

  return (
    <Switch
      checked={isChecked}
      disabled={disabled}
      value={value}
      onChange={React.useCallback(() => {
        if (disabled) return;

        onChange(!isChecked);
        setChecked((value: boolean) => !value);
      }, [onChange, isChecked])}
    />
  );
}

export function openItem(path: string) {
  if (path.endsWith(".asar")) return Electron.showItemInFolder(path);

  Electron.openPath(path);
}

export default function KernelCard({ pkg }) {
  const { Markdown, Text } = DiscordComponents;

  return (
    <div className="kernel-card">
      <div className="kernel-card-tools">
        <ToolButton
          label="Open Path"
          icon="Folder"
          onClick={() => openItem(pkg.path)}
        />
        <ToolButton
          danger
          label="Delete"
          icon="Trash"
          onClick={() => Electron.trashItem(pkg.path)}
        />
      </div>
      <div className="kernel-card-header">
        <Text className="kernel-card-name">{pkg.name}</Text>
      </div>
      {pkg.description != null && (
        <Text className="kernel-card-desc">
          <Markdown>{pkg.description}</Markdown>
        </Text>
      )}
      <div className="kernel-footer">
        <SwitchWrapper
          value={pkg.enabled}
          enabled={pkg.enabled}
          disabled={pkg.id === "kernel-settings"}
          onChange={(value: boolean) => {
            if (!value) kernel.packages.stopPackage(pkg.id);
            else kernel.packages.startPackage(pkg.id);
          }}
        />
      </div>
    </div>
  );
}
