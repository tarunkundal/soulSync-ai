import cron from "node-cron";
import { sendTodayEventMessages } from "../ai/sendTodayEventMessages.js";

cron.schedule("26 16 * * *", async () => {
    await sendTodayEventMessages()
},
    { timezone: "Asia/Kolkata", }
);