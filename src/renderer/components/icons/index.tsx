import Trash from './trash';
import Folder from './folder';
import Shield from './shield';
import UpdateAvailable from './update_available';

export const Icons = {
    Trash,
    Folder,
    Shield,
    UpdateAvailable,
};

export default function Icon({
    name,
    ...props
}: {
    name: keyof typeof Icons;
    size?: string | number;
    className?: string;
}) {
    const IconComponent = Icons[name];
    const extraProps: any = {};

    if (!IconComponent) {
        return null;
    }
    if (props.size) {
        extraProps.width = extraProps.height = props.size;
    }

    return <IconComponent {...props} {...extraProps} />;
}
