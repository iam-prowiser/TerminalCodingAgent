
import type { Tool } from "../types/messages.js";
import readFileTool from "./readFile.js";


const toolRegistry = new Map<string, Tool>();


toolRegistry.set("read_file", readFileTool);

export default function getTool(toolName: string) {
    return toolRegistry.get(toolName);
}
