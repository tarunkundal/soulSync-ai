import type { Job } from "bull";
import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";
import { type MessageSendingJobData, type SendingResult } from "./types.js";

export async function processMessageSending(
  job: Job<MessageSendingJobData>
): Promise<SendingResult> {
  const { eventId, personId, userId, phoneNumber, message, tone } = job.data;

  try {
    console.log(
      `[Message Sending] Processing job ${job.id} to send to ${phoneNumber}`
    );

    // Send WhatsApp message
    await sendWhatsAppMessage(phoneNumber, message);

    console.log(
      `[Message Sending] Successfully sent message to ${phoneNumber}`
    );

    // Store SENT message in database
    await prismaClient.messages.create({
      data: {
        content: message,
        style: tone,
        status: "SENT",
        messageLength: message.length,
        personId,
        userId,
      },
    });

    return {
      eventId,
      personId,
      userId,
      phoneNumber,
      message,
      status: "SENT",
      messageLength: message.length,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    console.error(
      `[Message Sending] Error in job ${job.id} for ${phoneNumber}:`,
      errorMessage
    );

    // Store FAILED message in database on final failure
    if (job.attemptsMade >= job.opts.attempts!) {
      try {
        await prismaClient.messages.create({
          data: {
            content: message,
            style: tone,
            status: "FAILED",
            messageLength: message.length,
            personId,
            userId,
          },
        });
      } catch (dbError) {
        console.error(
          `[Message Sending] Failed to store error record for job ${job.id}:`,
          dbError
        );
      }
    }

    throw new Error(
      `Failed to send WhatsApp message to ${phoneNumber}: ${errorMessage}`
    );
  }
}

export async function setupSendingProcessor() {
  const { messageSendingQueue } = await import("./index.js");

  messageSendingQueue.process(3, processMessageSending);

  console.log("Message sending processor started (3 concurrent jobs)");
}
