import axios from "axios";
import Contest from "../src/models/Contest.js";
import utc from "dayjs/plugin/utc.js";
import puppeteer from "puppeteer";
import { load } from "cheerio";
import dayjs from "dayjs"; 

import timezone from "dayjs/plugin/timezone.js";

import moment from "moment";
//From codeforces Fetching Contest
const fetchCodeforcesContest = async () => {
    try{
        const response  = await axios.get("https://codeforces.com/api/contest.list");
        const contests = response.data.result;
        return contests.filter((contest) => contest.phase === "BEFORE").
        map((contest) => ({
            platform: "Codeforces",
            name: contest.name,
            url: `https://codeforces.com/contest/${contest.id}`,
            startTime: new Date(contest.startTimeSeconds * 1000),
            endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
            duration: contest.durationSeconds/60,
            status:"Upcoming",
        }));
    }catch(err){
        console.error("Error getting contest from Codeforces Contest:",err);
        return [];
    }
};

//From LeetCode Fetching Contest


dayjs.extend(utc);
dayjs.extend(timezone);

// ✅ Correct function placement (Outside Puppeteer context)
const parseLeetCodeDate = (dateString) => {
    if (!dateString || dateString === "N/A") return null;

    // Example: "Sunday 8:00 AM GMT+5:30"
    const match = dateString.match(/(\w+) (\d{1,2}):(\d{2}) (\w{2}) GMT([+-]\d{1,2}):(\d{2})/);
    if (!match) return null;

    const [, , hours, minutes, period] = match;

    let hour24 = parseInt(hours, 10);
    if (period === "PM" && hour24 !== 12) hour24 += 12;
    if (period === "AM" && hour24 === 12) hour24 = 0;

    return dayjs()
        .tz("Asia/Kolkata")
        .hour(hour24)
        .minute(parseInt(minutes, 10))
        .second(0)
        .toDate();
};

const fetchLeetCodeContests = async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Mimic a real browser to avoid detection
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    try {
        // Navigate to the LeetCode contests page
        await page.goto("https://leetcode.com/contest/", { waitUntil: "domcontentloaded" });

        // Wait for the swiper-wrapper to load
        await page.waitForSelector(".swiper-wrapper");

        // Extract contest data
        let contests = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".swiper-wrapper .swiper-slide")).map(card => {
                const href = card.querySelector("a")?.getAttribute("href") || "";
                if(card.querySelector(".text-label-2, .dark\\:text-dark-label-2")){
                return {
                    name: card.querySelector(".flex .items-center .truncate")?.innerText.trim() || href.replace("/contest/", ""),
                    url: "https://leetcode.com" + href,
                    start_time_text : card.querySelector(".text-label-2, .dark\\:text-dark-label-2")?.innerText.trim(),

                    platform: "LeetCode",
                    duration: 120,
                };}
                return null;
            });
        });
        contests = contests.filter(c => c!==null);
        
        const upcomingContests = contests
            .map(contest => {
                const parsedDate = parseLeetCodeDate(contest.start_time_text);
                console.log("date",typeof(parsedDate));
                return {
                    ...contest,
                    startTime: parsedDate ? parsedDate.toISOString() : null, // ISO format
                };
            })

       
        return upcomingContests;
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error);
        return [];
    } finally {
        await browser.close();
    }
};



// Call the function to test





//for codechef

const fetchCodeChefContests = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the CodeChef contests page
        await page.goto('https://www.codechef.com/contests', { waitUntil: 'networkidle2',timeout:60000 });
         
        await page.waitForSelector("#root",{timeout:60000});
         
        // Wait for the contest tables to load
       
        

        // Extract contest data
        const contests = await page.evaluate(() => {
            console.log("inside evaluate");
            const upcomingSection = Array.from(document.querySelectorAll("._dataTable__container_7s2sw_417")).find(section=>
                section.innerText.includes("START"));
                console.log("upcomingSection",upcomingSection);
            if(!upcomingSection) return [];
            return Array.from(upcomingSection.querySelectorAll("tr")).map(row => {
                const columns = row.querySelectorAll("td");
                if (columns.length < 4) return null; // Ensure it's a valid row

                return {
                    platform: "CodeChef",
                    name: columns[0]?.innerText.trim(),
                    url: "https://www.codechef.com" + (columns[0]?.querySelector("a")?.getAttribute("href") || ""),
                    startTime: new Date(columns[1]?.innerText.trim()).toISOString(),
                    endTime: new Date(columns[2]?.innerText.trim()).toISOString(),
                    duration: null, // You may need to calculate this separately
                };
            }).filter(contest => contest !== null);
        });
        

        console.log('CodeChef Contests:', contests);
        return contests;
    } catch (error) {
        console.error('Error fetching CodeChef contests:', error);
        return [];
    } finally {
        await browser.close();
    }
};

// Save to DB 

const saveContestsToDB = async (contests) => {
    try{
        const codeforcesContests = await fetchCodeforcesContest();
        const leetCodeContests = await fetchLeetCodeContests();
        const codechefContests = await fetchCodeChefContests();
        
        const allContests = [...codeforcesContests, ...leetCodeContests,...codechefContests];

        await Contest.deleteMany({});
        await Contest.insertMany(allContests);
        console.log("Contests Saved to DB");
    }catch(err){
        console.error("Error saving contests to DB:",err);
    }
};
export default saveContestsToDB;    