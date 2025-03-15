import saveContestsToDB from "../../utils/contestScraper.js";

const updateContests = async () => {
  try{
    console.log("Updating contests...");
    await saveContestsToDB();  
    console.log("Contests Updated");
  }
    catch(err){
        console.error("Error updating contests:",err);
    }

};

export default updateContests;
