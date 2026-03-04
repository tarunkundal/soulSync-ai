import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";

export interface AdminNotificationPayload {
    type: "JOB_FAILURE" | "BATCH_FAILURE" | "SYSTEM_ERROR" | "DLQ_ALERT";
    title: string;
    message: string;
    details?: Record<string, any>;
    severity: "INFO" | "WARNING" | "CRITICAL";
}

/**
 * Get admin users from the database
 * Adjust the filters based on your actual User model structure
 */
async function getAdminUsers() {
    try {
        // Modify this query based on how you identify admins in your User model
        // Examples: role === "ADMIN", isAdmin === true, email ends with "@admin.soulsync.com", etc.
        const admins = await prismaClient.user.findMany({
            where: {
                // Add your admin identification logic here
                // For example:
                // OR: [
                //   { fullName: { contains: "admin", mode: "insensitive" } },
                //   { role: "ADMIN" },
                // ]
            },
            select: {
                id: true,
                fullName: true,
                whatsappNumber: true,
            },
        });

        return admins;
    } catch (error) {
        console.error("[AdminNotifier] Error fetching admin users:", error);
        return [];
    }
}

/**
 * Format notification message with emoji and styling
 */
function formatNotificationMessage(payload: AdminNotificationPayload): string {
    const severityEmoji = {
        INFO: "ℹ️",
        WARNING: "⚠️",
        CRITICAL: "🚨",
    };

    let message = `${severityEmoji[payload.severity]} *${payload.title}*\n\n`;
    message += `${payload.message}\n`;

    if (payload.details && Object.keys(payload.details).length > 0) {
        message += `\n_Details:_\n`;
        Object.entries(payload.details).forEach(([key, value]) => {
            const formattedKey = key.replace(/([A-Z])/g, " $1").trim();
            message += `• ${formattedKey}: ${value}\n`;
        });
    }

    message += `\nTimestamp: ${new Date().toISOString()}`;

    return message;
}

/**
 * Send notification to all admin users via WhatsApp
 */
export async function notifyAdmins(
    payload: AdminNotificationPayload
): Promise<{ success: number; failed: number }> {
    try {
        const admins = await getAdminUsers();

        if (admins.length === 0) {
            console.log(
                "[AdminNotifier] No admin users found to notify. Storing notification in logs."
            );
            console.log("[AdminNotifier]", JSON.stringify(payload, null, 2));
            return { success: 0, failed: 0 };
        }

        const formattedMessage = formatNotificationMessage(payload);
        let successCount = 0;
        let failedCount = 0;

        for (const admin of admins) {
            try {
                if (!admin.whatsappNumber) {
                    console.warn(
                        `[AdminNotifier] Admin ${admin.fullName} has no WhatsApp number`
                    );
                    failedCount++;
                    continue;
                }

                await sendWhatsAppMessage(admin.whatsappNumber, formattedMessage);
                successCount++;

                console.log(
                    `[AdminNotifier] Notification sent to ${admin.fullName} (${admin.whatsappNumber})`
                );
            } catch (error) {
                failedCount++;
                console.error(
                    `[AdminNotifier] Error sending notification to ${admin.fullName}:`,
                    error
                );
            }
        }

        console.log(
            `[AdminNotifier] Notification campaign complete: ${successCount} sent, ${failedCount} failed`
        );

        return { success: successCount, failed: failedCount };
    } catch (error) {
        console.error("[AdminNotifier] Error in notifyAdmins:", error);
        return { success: 0, failed: 0 };
    }
}

/**
 * Notify admins about a job failure
 */
export async function notifyJobFailure(
    jobId: string,
    jobType: string,
    error: string,
    attempts: number
) {
    return notifyAdmins({
        type: "JOB_FAILURE",
        title: "Message Job Failed (Permanent)",
        message: `A ${jobType} job has failed after ${attempts} attempts and moved to DLQ.`,
        details: {
            jobId,
            jobType,
            error: error.substring(0, 100),
        },
        severity: "WARNING",
    });
}

/**
 * Notify admins about batch failures
 */
export async function notifyBatchFailure(
    totalJobs: number,
    failedJobs: number,
    failureDetails: string[]
) {
    return notifyAdmins({
        type: "BATCH_FAILURE",
        title: "Batch Processing Completed with Failures",
        message: `Out of ${totalJobs} jobs, ${failedJobs} failed and were moved to DLQ.`,
        details: {
            totalJobs,
            failedJobs,
            successfulJobs: totalJobs - failedJobs,
            failureRate: `${((failedJobs / totalJobs) * 100).toFixed(2)}%`,
            sampleErrors: failureDetails.slice(0, 3),
        },
        severity: failedJobs > totalJobs * 0.5 ? "CRITICAL" : "WARNING",
    });
}

/**
 * Notify admins about system errors
 */
export async function notifySystemError(error: Error | string) {
    return notifyAdmins({
        type: "SYSTEM_ERROR",
        title: "System Error in Queue Processing",
        message: "An unexpected error occurred in the queue system.",
        details: {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack?.substring(0, 200) : undefined,
        },
        severity: "CRITICAL",
    });
}

/**
 * Notify admins about DLQ status
 */
export async function notifyDLQAlert(
    dlqCount: number,
    recentErrors: Array<{ jobType: string; error: string }>
) {
    return notifyAdmins({
        type: "DLQ_ALERT",
        title: "Dead Letter Queue Alert",
        message: `There are currently ${dlqCount} jobs in the DLQ that require manual review.`,
        details: {
            dlqCount,
            recentErrorTypes: [...new Set(recentErrors.map((e) => e.jobType))].join(
                ", "
            ),
            sampleErrors: recentErrors.slice(0, 2).map((e) => e.error),
        },
        severity: dlqCount > 100 ? "CRITICAL" : "WARNING",
    });
}
