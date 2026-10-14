import type { Message, StreamEvent } from "./types/messages.js"

export interface Provider {
     stream(messages: Message[]):AsyncGenerator<StreamEvent>
}