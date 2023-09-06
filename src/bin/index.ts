#!/usr/bin/env node

import { program } from "commander";
import { green } from 'picocolors';

import { initializeProject } from "../core";
import { formatHelp } from "../utils/formatHelp";

const command = program
    .command('create-kiwui-project')
    .arguments('<project-directory>')
    .usage(`${green('<project-directory>')} [options]`)
    .option(
        '--template',
        "The project's template.",  
    )
    .option(
        '--ts, --typescript',
        'Initialize as a TypeScript project.',
    )
    .option(
        '--js, --javascript',
        'Initialize as a JavaScript project.'
    )
    .option(
        '--tw, --tailwind'
    )
    .showHelpAfterError(true)
    .action(initializeProject);

// Custom help formatter
command.helpInformation = () => formatHelp(program);

command.parse(process.argv);