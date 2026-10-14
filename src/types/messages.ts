import type OpenAI from "openai"

export interface Message {
    role: "user" | "system" | "assistant",
    content: string
}

export interface TextDelta {
    type: "text_delta"
    content: string
}

export interface ReasoningDelta {
    type: "reasoning_delta"
    content: string
}

export interface Done {
    type: "done"
}

export type StreamEvent = TextDelta | ReasoningDelta | Done

export type NvidiaDelta = OpenAI.ChatCompletionChunk.Choice.Delta & {
    reasoning_content?: string;
}

