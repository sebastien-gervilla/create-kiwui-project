export interface Configuration {
    projectName: string
    projectPath: string
    templatePath: string
    mode: Mode
}

export interface Options {
    template: string
    typescript: boolean
    javascript: boolean
}

export type Mode = 'typescript' | 'javascript';
export type Template = (typeof templates)[number];

export const templates = [
    'default', 
    'advanced'
] as const;