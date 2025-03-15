import axios from "axios";
import Contest from "../src/models/Contest";
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

const fetchLeetCodeContest = async () => {
    try{
      const response  = await axios.get("https://kontests.net/api/v1/leetcode");
      const contests = response.data;
      return contests.map((c) => ({
        platform: "LeetCode",
        name: c.name,
        url: c.url,
        startTime: new Date(c.start_time),
        endTime: new Date(c.end_time),
        duration: c.duration / 60, // Convert seconds to minutes
        status: "Upcoming",
      }));
    }
    catch(err){
        console.error("Error getting contest from LeetCode Contest:",err);
        return [];
    }
};


//From CodeChef Fetching Contest

const fetchCodeChefContests = async () => {
    try {
      const response = await axios.get("https://kontests.net/api/v1/code_chef");
      const contests = response.data;
  
      return contests.map((c) => ({
        platform: "CodeChef",
        name: c.name,
        url: c.url,
        startTime: new Date(c.start_time),
        endTime: new Date(c.end_time),
        duration: c.duration / 60, // Convert seconds to minutes
        status: "Upcoming",
      }));
    } catch (error) {
      console.error("Error fetching CodeChef contests:", error);
      return [];
    }
  };

// Save to DB 

const saveContestsToDB = async (contests) => {
    try{
        const codeforcesContests = await fetchCodeChefContests();
        const leetCodeContests = await fetchLeetCodeContest();
        const codechefContests = await fetchCodeChefContests();

        const allContests = [...codeforcesContests, ...leetCodeContests, ...codechefContests];

        await Contest.deleteMany();
        await Contest.insertMany(allContests);
        console.log("Contests Saved to DB");
    }catch(err){
        console.error("Error saving contests to DB:",err);
    }
};
export default saveContestsToDB;    