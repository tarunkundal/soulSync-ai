import cron from "node-cron";
import { sendTodayEventMessages } from "../ai/sendTodayEventMessages.js";

cron.schedule("0 6 * * *", async () => {
    console.log("Running 6AM reminder job");

    await sendTodayEventMessages();
});