import os from 'os';
import path from "path";
import { green } from "picocolors";
import { copy, exists, writeFile } from 'fs-extra';
import { install } from '../../utils/install';
import { Configuration } from '../../types/project';
import { exitProccess } from '../../utils/exit';

export const createProject = async ({
    projectName,
    projectPath,
    templatePath,
    mode
}: Configuration) => {
    if (!(await exists(templatePath)))
        exitProccess(1, ["Template doesn't exist."]);

    // Template generation
    await copy(templatePath, projectPath);

    // Creating a package.json
    const packageJson = {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
            start: 'kiwui-scripts start',
            build: 'kiwui-scripts build'
        },
    }

    await writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2) + os.EOL
    );

    // Dependencies installation
    const dependencies = [ // TODO: Packages instead of paths, special functions for questions "askMode"
        '../kiwui',
        '../kiwui-dom',
        '../kiwui-scripts',

        // TODO: remove these
        '../kiwui-reconciler',
        '../kiwui-babel-plugin'
    ];

    console.log('Installing dependencies :\n');
    for (const dependency of dependencies)
        console.log(`- ${green(dependency)}`);

    logEmptySpace();
    await install(dependencies, false);

    // Dev dependencies installation
    if (mode !== 'typescript') return;
    const devDependencies = [
        'typescript',
        '@types/node'
    ]

    console.log('\nInstalling devDependencies :\n');
    for (const dependency of devDependencies)
        console.log(`- ${green(dependency)}`);

    logEmptySpace();
    await install(devDependencies, true);
}

const logEmptySpace = () => console.log();