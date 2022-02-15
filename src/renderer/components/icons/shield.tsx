const Verified = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor" />
    </svg>
);

const Warning = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" {...props}>
        <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
        <g>
            <path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M13,16h-2v-2h2V16z M13,12h-2V7h2V12z" fill="currentColor" />
        </g>
    </svg>
);

enum Types {
    VERIFIED = "VERIFIED",
    WARNING = "WARNING"
};

type FC<S, P = {}> = React.FC<P> & S;

const Shield: FC<{Types?: typeof Types}, {type: keyof typeof Types} & React.SVGAttributes<any>> = ({type, ...props}) => {
    switch (type) {
        case Types.VERIFIED: return <Verified {...props} />;
        case Types.WARNING: return <Warning {...props} />;

        default: return null;
    }
};

Shield.Types = Types;

export default Shield;