
import OpenAI from "openai";
import type { Message } from "../types/messages.js";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
})


export default async function nvidiaProvider(inputPrompt: Message) {
    try {
        // console.log("The message received is: ", inputPrompt.role)
        // console.log("The actual message is: ", message.content)
        const completion = await client.chat.completions.create({
            model: 'nvidia/nemotron-3-ultra-550b-a55b',
            messages: [
                {
                    role: inputPrompt.role,
                    content: inputPrompt.content
                }
            ],
            temperature: 1,
            top_p: 0.95,
            max_tokens: 16384,
            stream: true
        })

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
