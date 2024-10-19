import readline from 'readline';
export const clearConsole = () => {
    process.stdout.write('\x1Bc');
};
export const colorize = (...args) => ({
    black: `\x1b[30m${args.join(" ")}`,
    red: `\x1b[31m${args.join(" ")}`,
    green: `\x1b[32m${args.join(" ")}`,
    yellow: `\x1b[33m${args.join(" ")}`,
    blue: `\x1b[34m${args.join(" ")}`,
    magenta: `\x1b[35m${args.join(" ")}`,
    cyan: `\x1b[36m${args.join(" ")}`,
    white: `\x1b[37m${args.join(" ")}`,
    bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
});

export function promptUser(promptText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(promptText, answer => {
        rl.close();
        resolve(answer);
    }));
}