export type DateInput = string | Date | number | null | undefined;

export function getDaysLeft(targetDate: DateInput): number | null {
    if (!targetDate) return null;

    const date =
        targetDate instanceof Date
            ? targetDate
            : new Date(targetDate);

    if (isNaN(date.getTime())) return null;

    const today = new Date();

    // Normalize to midnight (prevents timezone bugs)
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffMs = date.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export const capitalizeFirst = (str?: string | null) =>
    str ? str[0].toUpperCase() + str.slice(1) : "";

