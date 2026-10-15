
import readFileTool from "./readFile.js";


const toolRegistry = new Map<string, object>();


toolRegistry.set("read_file", readFileTool);

export default function getTool(toolName: string){
    return toolRegistry.get(toolName);
}
