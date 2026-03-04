import {
    notifyBatchFailure,
    notifyDLQAlert,
    notifyJobFailure,
} from "./admin-notifier.js";
import {
    deadLetterQueue,
    messageGenerationQueue,
    messageSendingQueue,
} from "./index.js";
import { type DLQEntry } from "./types.js";

export async function moveToDLQ(
    jobType: "MESSAGE_GENERATION" | "MESSAGE_SENDING",
    jobData: any,
    error: string,
    attempts: number,
    result?: any
) {
    const dlqEntry: DLQEntry = {
        jobId: `dlq-${Date.now()}-${Math.random()}`,
        jobType,
        data: jobData,
        error,
        attempts,
        timestamp: new Date(),
        result,
    };

    try {
        await deadLetterQueue.add(dlqEntry, {
            attempts: 1,
            removeOnComplete: false,
        });

        console.log(`[DLQ] Moved job to dead letter queue: ${dlqEntry.jobId}`);

        // Store in database for persistence
        await storeDLQEntryInDatabase(dlqEntry);

        // Notify admin immediately for CRITICAL failures
        await notifyJobFailure(
            dlqEntry.jobId,
            jobType,
            error,
            attempts
        );
    } catch (err) {
        console.error("[DLQ] Error moving job to DLQ:", err);
    }
}

async function storeDLQEntryInDatabase(dlqEntry: DLQEntry) {
    try {
        // You might want to create a DLQ table in your Prisma schema
        // For now, we'll log it
        console.log(
            "[DLQ] Entry created:",
            JSON.stringify(dlqEntry, null, 2)
        );

        // If you have a DLQ model in your Prisma schema, uncomment below:
        // await prismaClient.dlqEntry.create({
        //   data: {
        //     jobId: dlqEntry.jobId,
        //     jobType: dlqEntry.jobType,
        //     data: dlqEntry.data as any,
        //     error: dlqEntry.error,
        //     attempts: dlqEntry.attempts,
        //     result: dlqEntry.result as any,
        //   },
        // });
    } catch (err) {
        console.error("[DLQ] Error storing DLQ entry in database:", err);
    }
}

export async function setupDLQHandlers() {
    let generationFailures: Array<{ jobType: string; error: string }> = [];
    let sendingFailures: Array<{ jobType: string; error: string }> = [];

    // Listen to failed jobs from generation queue
    messageGenerationQueue.on("failed", async (job, err) => {
        console.log(`[DLQ Handler] Generation job ${job.id} failed permanently`);

        generationFailures.push({
            jobType: "MESSAGE_GENERATION",
            error: err.message,
        });

        if (job.attemptsMade >= job.opts.attempts!) {
            await moveToDLQ(
                "MESSAGE_GENERATION",
                job.data,
                err.message,
                job.attemptsMade
            );
        }
    });

    // Listen to failed jobs from sending queue
    messageSendingQueue.on("failed", async (job, err) => {
        console.log(`[DLQ Handler] Sending job ${job.id} failed permanently`);

        sendingFailures.push({
            jobType: "MESSAGE_SENDING",
            error: err.message,
        });

        if (job.attemptsMade >= job.opts.attempts!) {
            await moveToDLQ(
                "MESSAGE_SENDING",
                job.data,
                err.message,
                job.attemptsMade
            );
        }
    });

    // Track completed jobs for batch metrics
    let totalJobsToday = 0;
    let completedJobsToday = 0;
    let failedJobsToday = 0;
    let lastCheckTime = Date.now();

    messageGenerationQueue.on("completed", () => {
        completedJobsToday++;
    });

    messageSendingQueue.on("completed", () => {
        completedJobsToday++;
    });

    // Periodic monitoring and batch notifications
    const monitoringInterval = setInterval(async () => {
        try {
            const genWaiting = await messageGenerationQueue.getWaitingCount();
            const sendWaiting = await messageSendingQueue.getWaitingCount();
            const dlqJobs = await deadLetterQueue.count();

            console.log(
                `[DLQ Monitor] Status - Generation Queue: ${genWaiting} waiting, Sending Queue: ${sendWaiting} waiting, DLQ: ${dlqJobs} items`
            );

            // Alert if DLQ is growing
            if (dlqJobs > 50) {
                await notifyDLQAlert(dlqJobs, [
                    ...(generationFailures.slice(0, 2) || []),
                    ...(sendingFailures.slice(0, 2) || []),
                ]);
            }

            // Batch notification every 30 minutes or if high failure rate
            const timeSinceLastCheck = Date.now() - lastCheckTime;
            const totalAttempted = generationFailures.length + sendingFailures.length;

            if (
                timeSinceLastCheck >
                30 * 60 * 1000 ||
                (totalAttempted > 10 &&
                    failedJobsToday / (totalAttempted || 1) > 0.1)
            ) {
                if (failedJobsToday > 0) {
                    await notifyBatchFailure(
                        totalAttempted,
                        failedJobsToday,
                        [
                            ...(generationFailures.slice(0, 3) || []),
                            ...(sendingFailures.slice(0, 3) || []),
                        ].map((f) => f.error)
                    );
                }

                // Reset counters
                generationFailures = [];
                sendingFailures = [];
                completedJobsToday = 0;
                failedJobsToday = 0;
                lastCheckTime = Date.now();
            }
        } catch (error) {
            console.error("[DLQ Monitor] Error in periodic check:", error);
        }
    }, 5 * 60 * 1000); // Check every 5 minutes

    console.log("DLQ handlers setup complete");

    // Return interval ID for cleanup if needed
    return monitoringInterval;
}
