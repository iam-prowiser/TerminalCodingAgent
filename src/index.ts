
import 'dotenv/config'
import { parseArgs } from 'node:util';
import type { Message } from './types/messages.js';
import nvidiaProvider from './Providers/nvidia.js';

const { values } = parseArgs({
  options: {
    prompt: { type: "string", short: "p" },
    model: { type: "string", default: "nvidia/nemotron-3-ultra-550b-a55b" }
  }
})

if (!values.prompt) {
  throw new Error("No Prompt is Present");
}


const prompt = values.prompt;

const finalMessage: Message = {
  role: "user",
  content: prompt
}

for await (const events of nvidiaProvider(finalMessage)) {
  if (events.type === "reasoning_delta") {
    process.stdout.write(events.content)
  }
  if (events.type === "text_delta") {
    process.stdout.write(events.content)
  }
}