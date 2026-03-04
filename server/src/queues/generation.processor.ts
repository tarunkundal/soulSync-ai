import type { Job } from "bull";
import { generateEventMessage } from "../ai/llm/generateMessage.js";
import { messageSendingQueue } from "./index.js";
import { type GeneratedMessageResult, type MessageGenerationJobData } from "./types.js";

export async function processMessageGeneration(
  job: Job<MessageGenerationJobData>
): Promise<GeneratedMessageResult> {
  try {
    const {
      eventId,
      personId,
      userId,
      senderName,
      receiverName,
      relation,
      eventType,
      tone,
      phoneNumber,
    } = job.data;

    console.log(
      `[Message Generation] Processing job ${job.id} for person ${personId}`
    );

    // Generate message using LLM
    const message = await generateEventMessage({
      senderName,
      receiverName,
      relation,
      eventType,
      tone,
    });

    console.log(
      `[Message Generation] Successfully generated message for person ${personId}`
    );

    // Create a sending job in the queue
    await messageSendingQueue.add(
      {
        eventId,
        personId,
        userId,
        phoneNumber,
        message,
        tone,
      },
      {
        jobId: `send-${eventId}-${personId}`,
        priority: 10,
      }
    );

    return {
      eventId,
      personId,
      userId,
      phoneNumber,
      message,
      tone,
    };
  } catch (error) {
    console.error(
      `[Message Generation] Error in job ${job.id}:`,
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}

export async function setupGenerationProcessor() {
  const { messageGenerationQueue } = await import("./index.js");

  messageGenerationQueue.process(1, processMessageGeneration);

  console.log("Message generation processor started");
}
