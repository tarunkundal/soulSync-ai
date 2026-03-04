import Queue from "bull";
import { type MessageGenerationJobData, type MessageSendingJobData } from "./types.js";

// Redis connection config (passed to Bull)
const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  db: parseInt(process.env.REDIS_DB || "0", 10),
};

// Initialize queues
export const messageGenerationQueue = new Queue<MessageGenerationJobData>(
  "message:generation",
  {
    redis: redisConfig,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

export const messageSendingQueue = new Queue<MessageSendingJobData>(
  "message:sending",
  {
    redis: redisConfig,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

// Dead Letter Queue for failed jobs
export const deadLetterQueue = new Queue("message:dlq", {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: false,
  },
});

// Queue event listeners
messageGenerationQueue.on("failed", (job, err) => {
  console.error(`Message generation job ${job.id} failed:`, err.message);
});

messageSendingQueue.on("failed", (job, err) => {
  console.error(`Message sending job ${job.id} failed:`, err.message);
});

messageGenerationQueue.on("completed", (job) => {
  console.log(`Message generation job ${job.id} completed`);
});

messageSendingQueue.on("completed", (job) => {
  console.log(`Message sending job ${job.id} completed`);
});

// Graceful shutdown
export async function closeQueues() {
  await messageGenerationQueue.close();
  await messageSendingQueue.close();
  await deadLetterQueue.close();
}
