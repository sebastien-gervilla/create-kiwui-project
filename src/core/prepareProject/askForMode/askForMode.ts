import prompts from "prompts";
import { blue } from "picocolors";
import { exitProccess } from "../../../utils/exit";

export const askForMode = async () => {
    return prompts(
        {
            type: 'toggle',
            name: 'typescript',
            message: `Would you like to use ${blue('TypeScript')} ?`,
            initial: true,
            active: 'Yes',
            inactive: 'No',
        },
        {
            // User inputs Ctrl+C or Ctrl+D to exit the prompt.
            // We should close the process and not write to the file system.
            onCancel: () => exitProccess(1, ['Exiting.'])
        }
    );
}