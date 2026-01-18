import { prismaClient } from "../lib/db.js";

export async function getAllEvents() {
    return prismaClient.important_Dates.findMany({
        include: {
            people: {
                include: {
                    user: true,
                    messages: true,
                },
            },
        },
    });
}

function isSameMonthAndDay(date: Date, today: Date) {
    return (
        date.getUTCDate() === today.getUTCDate() &&
        date.getUTCMonth() === today.getUTCMonth()
    );
}


export function filterTodayUnsentEvents(events: any[]) {
    const today = new Date();
    const currentYear = today.getUTCFullYear();

    return events.filter(event => {
        const eventDate = new Date(event.dateValue);

        // ✅ Match only today's month/day
        if (!isSameMonthAndDay(eventDate, today)) {
            return false;
        }

        const messages = event.people.messages ?? [];

        const alreadySentThisYear = messages.some(
            (msg: { sentAt: Date; status: string }) =>
                new Date(msg.sentAt).getUTCFullYear() === currentYear &&
                msg.status === "SENT"
        );

        return !alreadySentThisYear;
    });
}

export async function getTodayPendingEvents() {
    const allEvents = await getAllEvents();
    const pendingEvents = filterTodayUnsentEvents(allEvents);

    // console.log(
    //     "Events to send today:",
    //     pendingEvents,
    //     pendingEvents.length,
    //     "out of",
    //     allEvents.length
    // );

    return pendingEvents;
}
