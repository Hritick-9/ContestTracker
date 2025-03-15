import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
   platform: {
       type: String,
       enum:["Codeforces", "CodeChef", "LeetCode"],
       required: true
   },
   name: {
         type: String,
         required: true
   },
   url:{type: Strin, required: true},
   startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
   duration: {type: Number, required: true},
   status: {
       type: String,
       default: "Upcoming",
       enum: ["Upcoming", "Running", "Ended"],
       required: true
   },


});

const Contest = mongoose.model("Contest",contestSchema);
export default Contest;