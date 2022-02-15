export function Show({when, children, fallback = null}: {when: boolean, children: any, fallback?: any}) {
    return when ? children : fallback;
};

export function Switch({children, default: def = null}) {
    return children.find((child: any) => child?.props?.when) ?? def;
};

export function Match({when, children}: {when: boolean, children: any}) {
    return children;
};

export function For<T>({each, children}: {each: T[], children: (item: T, index: number) => any}) {
    const result = [];

    for (let i = 0; i < each.length; i++) {
        result.push(children(each[i], i));
    }

    return <>{result}</>;
};