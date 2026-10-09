
import OpenAI from 'openai';
import 'dotenv/config'
import { parseArgs } from 'node:util';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

const { values } = parseArgs({
  options: {
    prompt: { type: "string", short: "p"},
    model: { type: "string", default: "nvidia/nemotron-3-ultra-550b-a55b" }
  }
})

if (!values.prompt) {
  throw new Error("No Prompt is Present");
}

const prompt = values.prompt;

async function main() {
  try {
    const completion = await client.chat.completions.create({
      model: values.model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 16384,
      stream: true
    });

    
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta as any;

      if (delta?.reasoning_content) {
        process.stdout.write(delta.reasoning_content);
      }

      if (delta?.content) {
        process.stdout.write(delta.content);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}


main();


