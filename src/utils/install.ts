import spawn from "cross-spawn";

// TODO: Support yarn
export const install = async (dependencies: string[], saveDev: boolean): Promise<void> => {
    const args = ['install', '--save-exact'];
    args.push(saveDev ? '--save-dev' : '--save');
    args.push(...dependencies);

    return new Promise((resolve, reject) => {
        const child = spawn('npm', args, {
            stdio: ['inherit', 'ignore', 'inherit'],
            env: {
                ...process.env,
                ADBLOCK: '1',
                NODE_ENV: 'development',
                DISABLE_OPENCOLLECTIVE: '1',
            }
        });
    
        child.on('close', code => {
            if (code !== 0)
                return reject({
                    command: `npm ${args.join(' ')}`
                });

            resolve();
        });
    })
}