import cron from "node-cron";
import { sendTodayEventMessages } from "../ai/sendTodayEventMessages.js";

cron.schedule("0 6 * * *", async () => {
    await sendTodayEventMessages()
},
    { timezone: "Asia/Kolkata", }
);