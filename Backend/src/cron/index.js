import schedule from 'node-cron';
import updateContests from './contestCronJob.js';


console.log("✅ Cron job file loaded.");

schedule.schedule("* * * * *", async () => {
    console.log("🔄 Running scheduled contest fetch...");
    await updateContests();
    console.log("✅ Contest Scraper Completed!");
});


export default schedule;