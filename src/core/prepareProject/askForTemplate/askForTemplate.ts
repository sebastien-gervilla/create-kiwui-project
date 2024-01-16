import prompts from "prompts";
import { exitProccess } from "../../../utils/exit";
import { Template } from "../../../types/project";

export const askForTemplate = () => {
    return prompts(
        {
            type: 'select',
            name: 'template',
            message: `What template would you like to use ?`,
            choices: templates,
            initial: 0,
        },
        {
            // User inputs Ctrl+C or Ctrl+D to exit the prompt.
            // We should close the process and not write to the file system.
            onCancel: () => exitProccess(1, ['Exiting.'])
        }
    );
}

const templates: { title: Template, value: Template }[] = [
    {
        title: 'default',
        value: 'default'
    },
    {
        title: 'advanced',
        value: 'advanced'
    }
]