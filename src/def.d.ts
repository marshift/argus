declare module argus {
    interface ArgusContext {
        argv: string[];
        consumePositionalArg: () => string;
        hasOptionalArg: (condition: RegExp) => boolean;
        getOptionalArg: (condition: RegExp) => string | undefined;
    }

    const getPositionalArg: typeof import(".").getPositionalArg;
    const hasOptionalArg: typeof import(".").hasOptionalArg;
    const getOptionalArg: typeof import(".").getPositionalArg;
    const createContext: typeof import(".").createContext;
}
