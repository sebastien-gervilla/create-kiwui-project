import { Command } from "commander";

export const formatHelp = (program: Command) => {
    // There should only be one command
    const command = program.commands[0];
    if (!command) throw new Error("Command not found.");

    let commandUsage = `\nUsage: ${command.name()} ${command.usage()}\n`;

    commandUsage += '\nOptions:\n';
    for (const option of command.options) {
        commandUsage += `\n  ${option.flags}\n\n`;

        if (option.description)
            commandUsage += `\t${option.description}\n`;
    }

    return commandUsage;
}