import fs from 'fs';
import path from 'path';
import { green, blue } from 'picocolors'

export const isFolderEmpty = (directory: string, name: string) => {
    const conflicts = fs
        .readdirSync(directory)
        .filter((file) => !excludedFiles.includes(file))
        // Support IntelliJ IDEA-based editors
        .filter((file) => !/\.iml$/.test(file));

    if (!conflicts.length)
        return true;

    // Show help for conflicts
    console.log(`The directory ${green(name)} contains files that could conflict:\n`);

    for (const file of conflicts)
        try {
            const stats = fs.lstatSync(path.join(directory, file));
            console.log(
                stats.isDirectory()
                    ? `  ${blue(file)}/`
                    : `  ${file}`
            );
        } catch {
            console.log(`  ${file}`);
        }

    console.log('\nEither try using a new directory name, or remove the files listed above.\n');

    return false;
}

const excludedFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
    'yarnrc.yml',
    '.yarn',
]