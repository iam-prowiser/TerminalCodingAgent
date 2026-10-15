import fs from 'fs/promises'

import type { Tool } from "../types/messages.js";
import { read } from 'fs';

const readFileTool: Tool<string, string> = {
    name: 'read_file',
    description: 'This tool reads the content of the file',
    inputRequirements: "Input required is a file path where the concerned file is located",
    executionFunction: async (input) => {
        if(!input){
            throw new Error("File not found");
        }
        const fileContent = await fs.readFile(input, 'utf-8');
        console.log(fileContent)
        return fileContent;
    }
}

export default readFileTool
