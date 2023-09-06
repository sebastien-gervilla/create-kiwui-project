import { emptyDir } from "fs-extra";
import { Options } from "../../types/project";
import { createProject } from "../createProject";
import { prepareProject } from "../prepareProject"

export const initializeProject = async (projectPath: string, options: Options) => {
    try {
        const configuration = await prepareProject(projectPath, options);
        await createProject(configuration);
    } catch (error) {
        console.log(error);
        await emptyDir(projectPath);
    }
}