// argus - marsh's tiny argument parsing library
// initially ported to TS for use in spectrum
// updated once more for NPM publishing

import type { ArgusContext } from "@marshift/argus";

/**
 * 
 * @param argv The arguments to parse
 * @param position The position to look up
 * @param required Whether this argument is required, default true
 * @returns The value of the positional argument
 * 
 * NOTE: This function filters out flags, be careful
 */
export function getPositionalArg(argv: string[], position: number, required = true) {
    const argvWithoutFlags = argv.filter((a) => !a.startsWith("-"));
    const value = argvWithoutFlags[position];
    if (!value && required) throw new Error(`Missing argument at position ${position}`);

    return value;
}

/**
 * 
 * @param argv The arguments to parse
 * @param condition The expression to match the optional argument, e.g. `/--optional|-o/`
 * @returns Whether the given argument has been specified
 */
export const hasOptionalArg = (argv: string[], condition: RegExp) => argv.some(i => condition.test(i));

/**
 * 
 * @param argv The arguments to parse
 * @param condition The expression to match the optional argument, e.g. `/--optional|-o/`
 * @returns The value of the given argument
 */
export function getOptionalArg(argv: string[], condition: RegExp) {
    const argIdx = argv.findIndex(i => condition.test(i));
    if (argIdx === -1) return;

    const splitArg = argv[argIdx].split("=").slice(0, 2);
    if (splitArg.length === 1) throw new Error(`No value passed to argument ${argv[argIdx]}`);

    return splitArg[1];
}

/**
 * 
 * @param argv The arguments to parse 
 * @returns A "scoped" variant of the library's functions
 */
export function createContext(argv: string[]): ArgusContext {
    let _posArgIdx = 0;
    
    return {
        argv,
        getPositionalArg: (position) => getPositionalArg(argv, position),
        consumePositionalArg: () => {
            const value = getPositionalArg(argv, _posArgIdx);
            
            _posArgIdx++;
            return value;
        },
        hasOptionalArg: (condition) => hasOptionalArg(argv, condition),
        getOptionalArg: (condition) => getOptionalArg(argv, condition),
    }
}
