export default function makeLazy<P = any>(factory: (props: P) => Promise<any>, fallback: React.FunctionComponent<{}>) {
    return function LazyComponent(props: P) {
        const [state, setState] = React.useState({resolved: false, value: void 0});

        React.useEffect(() => {
            if (state.resolved) return;

            factory(props).then((value) => {
                setState({value, resolved: true});
            });
        }, [state]);

        return state.resolved ? state.value : React.createElement(fallback, props);
    };
}