export const exitProccess = (code: number, messages?: any[]) => {
    if (messages?.length)
        for (const message of messages)
            console.log(message);
    process.exit(code);
}