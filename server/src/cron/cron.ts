import cron from "node-cron";
import { sendTodayEventMessages } from "../ai/sendTodayEventMessages.js";

cron.schedule("15 18 * * *", async () => {
    await sendTodayEventMessages()
},
    { timezone: "Asia/Kolkata", }
);