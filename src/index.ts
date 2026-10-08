
import OpenAI from 'openai';
import 'dotenv/config'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

 const prompt = process.argv
 console.log(prompt)

async function main() {
  const completion = await client.chat.completions.create({
    model: "nvidia/nemotron-3-ultra-550b-a55b",
    messages: [
      {
        role: "user",
        content: "Are you good ?"
      }
    ],
    temperature: 1,
    top_p: 0.95,
    max_tokens: 16384,
    stream: true
  });

  // console.log(completion.message)
  for await (const chunk of completion) {
    const delta = chunk.choices[0]?.delta as any;

    if (delta?.reasoning_content) {
      process.stdout.write(delta.reasoning_content);
    }

    if (delta?.content) {
      process.stdout.write(delta.content);
    }
  }
}

main();