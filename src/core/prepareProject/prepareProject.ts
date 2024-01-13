import path from "path";
import { exitProccess } from "../../utils/exit";
import { askForMode } from "./askForMode";
import { exists } from "fs-extra";
import { isFolderEmpty } from "../../utils/isFolderEmpty";
import { Configuration, Mode, Options, templates } from "../../types/project";
import { askForTemplate } from "./askForTemplate";

export const prepareProject = async (projectPath: string, options: Options): Promise<Configuration> => {
    const workingDirectory = process.cwd();
    const root = path.resolve(workingDirectory, projectPath);
    const projectName = path.basename(root);

    // Directory verifications
    const folderExists = await exists(root)
    if (folderExists && !isFolderEmpty(root, projectName))
        exitProccess(1);

    // Getting options if not specified
    if (!options.typescript && !options.javascript)
        options.typescript = (await askForMode()).typescript;

    const mode: Mode = options.typescript ? 'typescript' : 'javascript';
    if (!isValidTemplate(options.template)) {
        console.log("\nYou didn't choose a valid template.");
        options.template = (await askForTemplate()).template;
    }

    const templatesDirectory = path.join(__dirname, '../../../templates/');
    const templatePath = path.join(templatesDirectory, options.template, mode);

    return {
        projectName,
        projectPath,
        templatePath,
        mode
    };
}

const isValidTemplate = (template: any): template is keyof (typeof templates) => templates.includes(template);