import { deadLetterQueue, messageGenerationQueue, messageSendingQueue } from "./index.js";

export interface QueueMetrics {
    generation: {
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
    };
    sending: {
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
    };
    dlq: {
        total: number;
    };
}

export async function getQueueMetrics(): Promise<QueueMetrics> {
    const [
        genWaiting,
        genActive,
        genCompleted,
        genFailed,
        genDelayed,
        sendWaiting,
        sendActive,
        sendCompleted,
        sendFailed,
        sendDelayed,
        dlqTotal,
    ] = await Promise.all([
        messageGenerationQueue.getWaitingCount(),
        messageGenerationQueue.getActiveCount(),
        messageGenerationQueue.getCompletedCount(),
        messageGenerationQueue.getFailedCount(),
        messageGenerationQueue.getDelayedCount(),
        messageSendingQueue.getWaitingCount(),
        messageSendingQueue.getActiveCount(),
        messageSendingQueue.getCompletedCount(),
        messageSendingQueue.getFailedCount(),
        messageSendingQueue.getDelayedCount(),
        deadLetterQueue.count(),
    ]);

    return {
        generation: {
            waiting: genWaiting,
            active: genActive,
            completed: genCompleted,
            failed: genFailed,
            delayed: genDelayed,
        },
        sending: {
            waiting: sendWaiting,
            active: sendActive,
            completed: sendCompleted,
            failed: sendFailed,
            delayed: sendDelayed,
        },
        dlq: {
            total: dlqTotal,
        },
    };
}

export async function getDLQJobs(limit: number = 50) {
    try {
        const jobs = await deadLetterQueue.getJobs(["failed"], 0, limit);
        return jobs.map((job) => ({
            id: job.id,
            data: job.data,
            failedReason: job.failedReason,
            attempts: job.attemptsMade,
            stacktrace: job.stacktrace,
            timestamp: new Date(job.processedOn || 0),
        }));
    } catch (error) {
        console.error("[Metrics] Error fetching DLQ jobs:", error);
        return [];
    }
}
