import 'dotenv/config';
import { parseArgs } from 'node:util';
import type { Message } from './types/messages.js';
import NvidiaProvider from './Providers/nvidia.js';

const { values } = parseArgs({
    options: {
        prompt: {
            type: "string",
            short: "p"
        },
        model: {
            type: "string",
            default: "nvidia/nemotron-3-ultra-550b-a55b"
        }
    }
});

if (!values.prompt) {
    throw new Error("No Prompt is Present");
}

const prompt = values.prompt;

const messages: Message[] = [
    {
        role: "user",
        content: prompt
    }
];

const provider = new NvidiaProvider();

for await (const event of provider.stream(messages)) {
    if (event.type === "reasoning_delta") {
        process.stdout.write(event.content);
    }

    if (event.type === "text_delta") {
        process.stdout.write(event.content);
    }
}